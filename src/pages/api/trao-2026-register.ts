import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { Readable } from "stream";
import { sendRegistrationEmail } from "../../lib/sendRegistrationEmail";
import { fetchCabins, updateCabinCounts } from "./trao-2026-cabins";
import { Logger } from "../../lib/logger";
import { getAuth } from "./utils";

export const config = {
  api: { bodyParser: { sizeLimit: "15mb" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type MemberInput = {
  name: string;
  gender: string;
  age: string | number;
  relation: string;
};

type ParticipantExtra = {
  name: string;
  shirt_size: string;
  shirt_color: string;
  stay: string; // số cabin 1-20
};

const COLOR_LABEL: Record<string, string> = {
  white: "Trắng",
  green: "Xanh lá",
  yellow: "Vàng chanh",
};

// ─── Generate unique codes ────────────────────────────────────────────────────

function generateCodes(count: number, existing: Set<string>): string[] {
  const codes: string[] = [];
  while (codes.length < count) {
    const code = `BCX${Math.floor(100000 + Math.random() * 900000)}`;
    if (!existing.has(code) && !codes.includes(code)) {
      codes.push(code);
    }
  }
  return codes;
}

// ─── Fetch existing codes from sheet ─────────────────────────────────────────

async function fetchExistingCodes(
  auth: ReturnType<typeof getAuth>,
): Promise<Set<string>> {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "A2:A",
  });
  const codes = new Set<string>();
  (res.data.values ?? []).forEach(([code]) => {
    if (code) codes.add(code);
  });
  return codes;
}

// ─── Upload image to Google Drive ────────────────────────────────────────────

async function uploadToDrive(
  auth: ReturnType<typeof getAuth>,
  base64: string,
  mimeType: string,
  filename: string,
): Promise<string> {
  const drive = google.drive({ version: "v3", auth });
  const buffer = Buffer.from(base64, "base64");
  const stream = Readable.from(buffer);

  const file = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
    },
    media: { mimeType, body: stream },
    fields: "id,webViewLink",
  });

  await drive.permissions.create({
    fileId: file.data.id!,
    requestBody: { role: "reader", type: "anyone" },
  });

  return file.data.webViewLink ?? "";
}

// ─── Append multiple rows to Sheet ───────────────────────────────────────────

async function appendRows(
  auth: ReturnType<typeof getAuth>,
  rows: (string | number)[][],
) {
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const log = new Logger();

  try {
    const body = req.body as {
      formData: Record<string, unknown>;
      receipt?: { base64: string; mimeType: string; filename: string } | null;
    };

    const { formData, receipt } = body;
    const auth = getAuth();

    const members = (formData.members as MemberInput[]) ?? [];
    const participants = (formData.participants as ParticipantExtra[]) ?? [];
    const repCode = formData.code as string;
    if (!repCode) throw new Error("Thiếu mã đăng ký từ bước reserve.");

    log.info("register/start", "Bắt đầu xử lý đăng ký", {
      code: repCode,
      name: formData.name,
      email: formData.email,
      register_type: formData.register_type,
      num_person: formData.num_person,
      transport: formData.transport,
      bus_departure: formData.bus_departure || null,
      fee_total: formData.fee_total,
      memberCount: members.length,
      hasReceipt: !!receipt,
    });

    // Lấy danh sách cabin để map số cabin → tên nhà chòi
    const cabinSheets = google.sheets({ version: "v4", auth });
    const cabinList = await fetchCabins(
      cabinSheets,
      process.env.GOOGLE_SHEET_ID!,
    ).catch(() => []);
    const cabinNameMap: Record<number, string> = {};
    for (const c of cabinList) cabinNameMap[c.number] = c.fullName;

    // Lấy danh sách mã đã tồn tại để tránh trùng khi sinh mã thành viên
    log.startStep();
    const existingCodes = await fetchExistingCodes(auth);
    existingCodes.add(repCode);
    const memberCodes =
      members.length > 0 ? generateCodes(members.length, existingCodes) : [];
    log.info("register/codes", "Sinh mã thành viên hoàn tất", {
      durationMs: log.elapsed(),
      memberCodes,
    });

    // Upload ảnh chuyển khoản
    let receiptLink = "";
    if (receipt) {
      log.startStep();
      receiptLink = await uploadToDrive(
        auth,
        receipt.base64,
        receipt.mimeType,
        `${repCode}_${receipt.filename}`,
      );
      log.info(
        "register/upload-receipt",
        "Upload ảnh chuyển khoản thành công",
        {
          durationMs: log.elapsed(),
          receiptLink,
        },
      );
    } else {
      log.warn("register/upload-receipt", "Không có ảnh chuyển khoản");
    }

    const _d = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
    );
    const pad = (n: number) => String(n).padStart(2, "0");
    const now = `${pad(_d.getDate())}/${pad(_d.getMonth() + 1)}/${_d.getFullYear()} ${pad(_d.getHours())}:${pad(_d.getMinutes())}:${pad(_d.getSeconds())}`;
    const transport = formData.transport === "bus" ? "Xe bus BTC" : "Tự túc";
    const busDeparture = (formData.bus_departure as string) || "";

    // ── Dòng đại diện ──────────────────────────────────────────────────────────
    const repRow: (string | number)[] = [
      repCode, // Mã đăng ký
      now, // Thời gian
      formData.name as string, // Họ tên
      formData.email as string, // Email
      formData.gender as string, // Giới tính
      Number(formData.age), // Tuổi
      formData.facebook as string, // Facebook
      formData.phone as string, // SĐT
      formData.emergency_phone as string, // SĐT khẩn cấp
      formData.emergency_relation as string, // Quan hệ khẩn cấp
      (formData.address as string) || "", // Địa chỉ
      (formData.blood_type as string) || "", // Nhóm máu
      formData.register_type === "individual" ? "Cá nhân" : "Nhóm/Gia đình", // Hình thức
      Number(formData.num_person), // Số người
      transport, // Phương tiện
      busDeparture, // Nơi xuất phát
      Number(formData.fee_event), // Phí sự kiện
      Number(formData.fee_bus), // Phí xe bus
      Number(formData.donation) || 0, // Quyên góp (S)
      Number(formData.fee_total), // Tổng phí
      receiptLink, // Link ảnh CK
      (formData.food_allergy as string) || "", // Dị ứng
      formData.want_products === "yes"
        ? (() => {
            const p = formData.products as Record<string, number>;
            const parts: string[] = [];
            if (p?.khan_ran) parts.push(`Khăn Rằn x${p.khan_ran}`);
            if (p?.khan_tho_cam) parts.push(`Khăn Thổ Cẩm x${p.khan_tho_cam}`);
            if (p?.tui_to_te) parts.push(`Túi Tò Te x${p.tui_to_te}`);
            return parts.join(", ");
          })()
        : "Không", // Sản phẩm
      Number(formData.product_fee) || 0, // Phí sản phẩm
      formData.volunteer === "yes" ? "Có" : "Không", // CTV
      formData.volunteer === "yes" && Array.isArray(formData.volunteer_teams)
        ? (formData.volunteer_teams as string[]).join(", ")
        : "", // Team CTV
      (formData.note as string) || "", // Ghi chú
      formData.payment_timing === "later"
        ? "Chưa chuyển khoản"
        : "Chờ xác nhận", // Trạng thái
      "", // Mã đại diện (để trống vì là đại diện)
      formData.register_type === "individual" ? "Cá nhân" : "Đại diện", // Vai trò
      participants[0]?.shirt_size ?? "", // Size áo
      COLOR_LABEL[participants[0]?.shirt_color] ?? "", // Màu áo
      participants[0]?.stay
        ? cabinNameMap[Number(participants[0].stay)] || participants[0].stay
        : "", // Cabin
      (formData.password as string) ?? "", // Mật khẩu
      Number(formData.count_adult ?? 0), // Số người lớn
      Number(formData.count_child ?? 0), // Số trẻ em 6-12
      Number(formData.count_free ?? 0), // Số miễn phí
    ];

    // ── Dòng từng thành viên ───────────────────────────────────────────────────
    const memberRows: (string | number)[][] = members.map((m, i) => [
      memberCodes[i], // [0]  Mã đăng ký riêng
      now, // [1]  Thời gian
      m.name, // [2]  Họ tên
      "", // [3]  Email
      m.gender, // [4]  Giới tính
      Number(m.age), // [5]  Tuổi
      "", // [6]  Facebook
      "", // [7]  SĐT
      "", // [8]  SĐT khẩn cấp
      m.relation, // [9]  Quan hệ với đại diện
      "", // [10] Địa chỉ
      "", // [11] Nhóm máu
      "Thành viên nhóm", // [12] Hình thức
      "", // [13] Số người
      transport, // [14] Phương tiện
      busDeparture, // [15] Nơi xuất phát
      "", // [16] Phí sự kiện
      "", // [17] Phí xe bus
      "", // [18] Quyên góp (trống — chỉ đại diện ghi)
      "", // [19] Tổng phí
      "", // [20] Link ảnh CK
      "", // [21] Dị ứng thực phẩm
      "", // [22] Sản phẩm đặt mua
      "", // [23] Phí sản phẩm (¥)
      "", // [24] Cộng tác viên
      "", // [25] Team CTV
      "", // [26] Ghi chú
      "Chờ xác nhận", // [27] Trạng thái
      repCode, // [28] Mã đại diện ← trỏ về người đăng ký
      "Thành viên", // [29] Vai trò
      participants[i + 1]?.shirt_size ?? "", // [30] Size áo
      COLOR_LABEL[participants[i + 1]?.shirt_color] ?? "", // [31] Màu áo
      participants[i + 1]?.stay
        ? cabinNameMap[Number(participants[i + 1].stay)] ||
          participants[i + 1].stay
        : "", // [32] Cabin
      "", // [33] Mật khẩu (trống — chỉ đại diện có mật khẩu)
    ]);

    log.startStep();
    await appendRows(auth, [repRow, ...memberRows]);
    log.info(
      "register/write-sheet",
      "Ghi dữ liệu vào Google Sheets thành công",
      {
        durationMs: log.elapsed(),
        code: repCode,
        memberCodes,
        totalRows: 1 + memberRows.length,
      },
    );

    // Đánh dấu reservation là completed
    try {
      const sheets = google.sheets({ version: "v4", auth });
      const resData = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: "Reservations!A2:A",
      });
      const resRows = resData.data.values ?? [];
      const resRowIdx = resRows.findIndex(([c]) => c === repCode);
      if (resRowIdx !== -1) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: process.env.GOOGLE_SHEET_ID!,
          range: `Reservations!D${resRowIdx + 2}`,
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [["completed"]] },
        });
        log.info(
          "register/update-reservation",
          "Cập nhật trạng thái Reservations → completed",
          { code: repCode },
        );
      } else {
        log.warn(
          "register/update-reservation",
          "Không tìm thấy mã trong Reservations sheet",
          { code: repCode },
        );
      }
    } catch (resErr) {
      log.error(
        "register/update-reservation",
        "Không thể cập nhật Reservations (không ảnh hưởng đăng ký)",
        resErr,
      );
    }

    // Cập nhật cột F "Số đã đăng ký" trong sheet "Danh sách cabin" (fire-and-forget)
    updateCabinCounts(cabinSheets, process.env.GOOGLE_SHEET_ID!).catch(
      (err: unknown) =>
        log.error(
          "register/cabin-count",
          "Không thể cập nhật số đã đăng ký cabin",
          err,
        ),
    );

    // Gửi email xác nhận (fire-and-forget — không chặn response)
    if (formData.email) {
      log.info("register/email-start", "Bắt đầu gửi email xác nhận", {
        email: formData.email,
        code: repCode,
      });
      sendRegistrationEmail({
        name: String(formData.name),
        email: String(formData.email),
        code: repCode,
        password: String(formData.password),
        transport: formData.transport === "bus" ? "Xe bus BTC" : "Tự túc",
        bus_departure: String(formData.bus_departure ?? ""),
        reg_type:
          formData.register_type === "individual" ? "Cá nhân" : "Nhóm/Gia đình",
        count_adult: Number(formData.count_adult ?? 0),
        count_child: Number(formData.count_child ?? 0),
        count_free: Number(formData.count_free ?? 0),

        fee_event: Number(formData.fee_event),
        fee_bus: Number(formData.fee_bus),
        fee_total: Number(formData.fee_total),
        products: String(formData.products ?? ""),
        fee_product: Number(formData.product_fee ?? 0),
        donation: Number(formData.donation ?? 0),
        food_allergy: String(formData.food_allergy ?? ""),
        volunteer: formData.volunteer === "yes" ? "Có" : "Không",
        volunteer_teams: Array.isArray(formData.volunteer_teams)
          ? (formData.volunteer_teams as string[])
          : [],
        note: String(formData.note ?? ""),
        payment_timing: formData.payment_timing === "later" ? "later" : "now",
        representative: {
          name: String(formData.name),
          shirt_size: participants[0]?.shirt_size ?? "",
          shirt_color: participants[0]?.shirt_color ?? "",
          cabin: participants[0]?.stay
            ? cabinNameMap[Number(participants[0].stay)] || participants[0].stay
            : "",
        },
        members: members.map((m, i) => ({
          name: m.name,
          shirt_size: participants[i + 1]?.shirt_size ?? "",
          shirt_color: participants[i + 1]?.shirt_color ?? "",
          cabin: participants[i + 1]?.stay
            ? cabinNameMap[Number(participants[i + 1].stay)] ||
              participants[i + 1].stay
            : "",
        })),
      })
        .then(() =>
          log.info("register/email-done", "Gửi email xác nhận thành công", {
            email: formData.email,
            code: repCode,
          }),
        )
        .catch((err: unknown) =>
          log.error(
            "register/email-error",
            "Gửi email xác nhận thất bại",
            err,
            { email: formData.email, code: repCode },
          ),
        );
    }

    log.info("register/done", "Đăng ký hoàn tất", {
      code: repCode,
      memberCodes,
      name: formData.name,
      email: formData.email,
    });

    res.status(200).json({
      ok: true,
      repCode,
      memberCodes,
      receiptLink,
    });
  } catch (err) {
    log.error("register/error", "Xử lý đăng ký thất bại", err, {
      code: (req.body?.formData?.code as string) ?? "unknown",
    });
    res.status(500).json({ ok: false, error: "Lỗi server, vui lòng thử lại." });
  }
}
