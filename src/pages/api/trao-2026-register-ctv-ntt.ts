import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { Readable } from "stream";
import nodemailer from "nodemailer";
import { fetchCabins, updateCabinCounts } from "./trao-2026-cabins";
import { getAuth } from "./utils";

export const config = {
  api: { bodyParser: { sizeLimit: "15mb" } },
};

const COLOR_LABEL: Record<string, string> = {
  white: "Trắng",
  green: "Xanh lá",
  yellow: "Vàng chanh",
};

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

async function sendConfirmEmail(d: {
  name: string;
  email: string;
  code: string;
  password: string;
  role: "ctv" | "ntt";
  transport: string;
  bus_departure: string;
  event_fee: number;
  bus_fee: number;
  total: number;
  shirt_size: string;
  shirt_color: string;
  cabin: string;
  payment_timing: string;
  donation: number;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL!,
      pass: process.env.GMAIL_APP_PASSWORD!,
    },
  });

  const roleLabel =
    d.role === "ctv" ? "Cộng tác viên (CTV)" : "Nhà tài trợ (NTT)";
  const fmtYen = (n: number) => n.toLocaleString("ja-JP") + " ¥";

  const grandTotal = d.total + d.donation;
  const needPayLater = d.payment_timing === "later" && grandTotal > 0;

  const paymentNote =
    grandTotal === 0
      ? `<p style="color:#2e7d32;font-weight:700">🎉 Miễn phí — Đăng ký của bạn đã được xác nhận!</p>`
      : needPayLater
        ? `<p style="color:#e65100">⏳ Bạn đã chọn chuyển khoản sau. Vui lòng vào trang <a href="https://banchanxanh.com/trao-2026-tra-cuu" style="color:#2e7d32">Tra cứu</a> để upload ảnh chuyển khoản trong vòng 24 giờ.</p>`
        : `<p style="color:#2e7d32">✅ Đã nhận ảnh chuyển khoản — đang chờ ban tổ chức xác nhận.</p>`;

  const paymentInfoBlock = needPayLater
    ? `
    <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin:16px 0">
      <h4 style="margin:0 0 12px;color:#e65100;font-size:15px">💳 Thông tin chuyển khoản</h4>
      <ul style="margin:0;padding-left:18px;line-height:2;font-size:14px">
        <li><strong>Ngân hàng:</strong> 住信ＳＢＩネット銀行(0038) スミシン SBI 銀行 (Sumishin SBI netbank)</li>
        <li><strong>Số tài khoản:</strong> バナナ支店(107) / 口座番号 普通　7615757</li>
        <li><strong>Tên tài khoản:</strong> ＴＲＡＮ　ＶＡＮ　ＧＩＡＮＧ（トラン　ヴアンジヤン）</li>
        <li><strong>Nội dung CK:</strong> <span style="background:#fff3e0;color:#e65100;font-weight:700;padding:2px 8px;border-radius:4px;letter-spacing:1px">TRAO2026-${d.code}</span></li>
      </ul>
      <p style="margin:10px 0 0;font-size:12px;color:#e65100">⚠️ Vui lòng nhập đúng nội dung chuyển khoản ở trên — KHÔNG dùng họ tên.</p>
    </div>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">
  <div style="background:#1b5e20;padding:28px 24px;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px">BÀN CHÂN XANH</h1>
    <p style="color:#a5d6a7;margin:6px 0 0;font-size:14px">TRAO 2026 — Xác nhận đăng ký ${roleLabel}</p>
  </div>
  <div style="padding:28px 24px">
    <p style="font-size:16px;margin-top:0">Xin chào <strong>${d.name}</strong>,</p>
    <div style="background:#e8f5e9;border:2px solid #4caf50;border-radius:8px;padding:16px;margin:16px 0;text-align:center">
      <p style="margin:0 0 4px;font-size:22px">🎉</p>
      <p style="margin:0;font-size:16px;font-weight:700;color:#1b5e20">Đăng ký TRAO 2026 thành công!</p>
      <p style="margin:4px 0 0;font-size:13px;color:#555">Vai trò: <strong>${roleLabel}</strong></p>
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0">
      <tr style="background:#f5f5f5"><td style="padding:8px 12px;color:#555">Mã đăng ký</td><td style="padding:8px 12px;font-weight:700;font-size:18px;color:#1b5e20;letter-spacing:2px">${d.code}</td></tr>
      <tr><td style="padding:8px 12px;color:#555">Mật khẩu</td><td style="padding:8px 12px;font-weight:700;font-size:18px;letter-spacing:2px">${d.password}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px 12px;color:#555">Trạng thái</td><td style="padding:8px 12px;font-weight:700;color:${needPayLater ? "#e65100" : "#2e7d32"}">${needPayLater ? "Chưa chuyển khoản" : "Chờ xác nhận"}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px 12px;color:#555">Phương tiện</td><td style="padding:8px 12px">${d.transport}${d.bus_departure ? ` (${d.bus_departure})` : ""}</td></tr>
      <tr><td style="padding:8px 12px;color:#555">Size áo</td><td style="padding:8px 12px">${d.shirt_size} — ${d.shirt_color}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px 12px;color:#555">Chỗ ngủ</td><td style="padding:8px 12px">${d.cabin || "—"}</td></tr>
      <tr><td style="padding:8px 12px;color:#555">Phí sự kiện</td><td style="padding:8px 12px">${fmtYen(d.event_fee)}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px 12px;color:#555">Phí xe bus</td><td style="padding:8px 12px">${fmtYen(d.bus_fee)}</td></tr>
      <tr style="background:#e8f5e9"><td style="padding:8px 12px;color:#1b5e20;font-weight:700">Tổng phí</td><td style="padding:8px 12px;font-weight:700;color:#1b5e20">${fmtYen(d.total)}</td></tr>
      ${d.donation > 0 ? `<tr style="background:#fff8e1"><td style="padding:8px 12px;color:#e65100;font-weight:700">❤️ Quyên góp thiện nguyện</td><td style="padding:8px 12px;font-weight:700;color:#e65100">${fmtYen(d.donation)}</td></tr>` : ""}
    </table>

    ${paymentInfoBlock}

    ${
      needPayLater
        ? `
    <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin:16px 0">
      <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#e65100">⏳ Bạn chưa chuyển khoản — vui lòng hoàn tất trong 24 giờ</p>
      <p style="margin:0 0 12px;font-size:13px;color:#555;line-height:1.7">
        Đăng ký của bạn đang ở trạng thái <strong>Chưa chuyển khoản</strong>. Vui lòng chuyển khoản theo thông tin trên và upload ảnh xác nhận trong vòng 24 giờ — sau đó đăng ký sẽ tự động hết hạn.
      </p>
      <p style="margin:0 0 12px;font-size:13px;color:#555;line-height:1.7">
        Để upload ảnh chuyển khoản, chỉnh sửa size áo và chỗ ngủ, truy cập trang tra cứu bằng mã và mật khẩu bên dưới:
      </p>
      <div style="background:#f0f7f0;border:1px solid #c8e6c9;border-radius:6px;padding:12px;text-align:center;margin-bottom:12px">
        <p style="margin:0 0 4px;font-size:13px;color:#555">Mã đăng ký: <strong style="font-size:18px;color:#1b5e20;letter-spacing:2px">${d.code}</strong></p>
        <p style="margin:0;font-size:13px;color:#555">Mật khẩu: <strong style="font-size:16px;letter-spacing:2px">${d.password}</strong></p>
      </div>
      <div style="text-align:center">
        <a href="https://banchanxanh.com/trao-2026-tra-cuu" style="display:inline-block;background:#e65100;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px">
          Hoàn tất chuyển khoản →
        </a>
      </div>
    </div>
    `
        : `
    <div style="background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:16px;margin:16px 0">
      <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#2e7d32">✅ Chuyển khoản đã được ghi nhận!</p>
      <p style="margin:0 0 12px;font-size:13px;color:#555;line-height:1.7">
        Muốn chỉnh sửa size áo hoặc chỗ ngủ? Dùng mã và mật khẩu để truy cập trang tra cứu:
      </p>
      <div style="background:#f0f7f0;border:1px solid #c8e6c9;border-radius:6px;padding:12px;text-align:center;margin-bottom:12px">
        <p style="margin:0 0 4px;font-size:13px;color:#555">Mã đăng ký: <strong style="font-size:18px;color:#1b5e20;letter-spacing:2px">${d.code}</strong></p>
        <p style="margin:0;font-size:13px;color:#555">Mật khẩu: <strong style="font-size:16px;letter-spacing:2px">${d.password}</strong></p>
      </div>
      <div style="text-align:center">
        <a href="https://banchanxanh.com/trao-2026-tra-cuu" style="display:inline-block;background:#2e7d32;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px">
          Chỉnh sửa áo và chỗ ngủ →
        </a>
      </div>
    </div>
    `
    }

    <div style="text-align:center;margin:16px 0">
      <a href="https://banchanxanh.com/trao-2026" style="display:inline-block;background:#e8f5e9;color:#1b5e20;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid #a5d6a7">
        Thông tin chi tiết về TRAO 2026
      </a>
    </div>

    <p style="color:#777;font-size:13px">Thắc mắc liên hệ: 💬 <a href="https://www.facebook.com/banchanxanhjp" style="color:#2e7d32">Fanpage Bàn Chân Xanh</a></p>
  </div>
  <div style="background:#f5f5f5;padding:14px 24px;text-align:center;border-top:1px solid #e0e0e0">
    <p style="margin:0;color:#999;font-size:12px">© 2026 Bàn Chân Xanh · Email này được gửi tự động sau khi đăng ký TRAO 2026.</p>
  </div>
</div>
</body>
</html>`;

  await transporter.sendMail({
    from: `"Bàn Chân Xanh - TRAO 2026" <${process.env.GOOGLE_EMAIL}>`,
    to: d.email,
    subject: `[TRAO 2026] Xác nhận đăng ký ${roleLabel} — Mã ${d.code}`,
    html,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const body = req.body as {
      formData: Record<string, unknown>;
      receipt?: { base64: string; mimeType: string; filename: string } | null;
    };
    const { formData, receipt } = body;
    const auth = getAuth();

    const repCode = formData.code as string;
    if (!repCode) throw new Error("Thiếu mã đăng ký từ bước reserve.");

    const role = formData.role as "ctv" | "ntt";
    const participant = formData.participant as {
      shirt_size: string;
      shirt_color: string;
      stay: string;
    };

    // Map cabin number → name
    const cabinSheets = google.sheets({ version: "v4", auth });
    const cabinList = await fetchCabins(
      cabinSheets,
      process.env.GOOGLE_SHEET_ID!,
    ).catch(() => []);
    const cabinNameMap: Record<number, string> = {};
    for (const c of cabinList) cabinNameMap[c.number] = c.fullName;
    const cabinName = participant?.stay
      ? cabinNameMap[Number(participant.stay)] || participant.stay
      : "";

    // Upload receipt nếu có
    let receiptLink = "";
    if (receipt) {
      receiptLink = await uploadToDrive(
        auth,
        receipt.base64,
        receipt.mimeType,
        `${repCode}_${receipt.filename}`,
      );
    }

    const _d = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
    );
    const pad = (n: number) => String(n).padStart(2, "0");
    const now = `${pad(_d.getDate())}/${pad(_d.getMonth() + 1)}/${_d.getFullYear()} ${pad(_d.getHours())}:${pad(_d.getMinutes())}:${pad(_d.getSeconds())}`;

    const transport = formData.transport === "bus" ? "Xe bus BTC" : "Tự túc";
    const busDeparture = (formData.bus_departure as string) || "";
    const feeTotal = Number(formData.fee_total) || 0;
    const paymentTiming = formData.payment_timing as string;

    let status: string;
    if (feeTotal === 0) {
      status = "Xác nhận";
    } else if (paymentTiming === "now") {
      status = "Chờ xác nhận";
    } else {
      status = "Chưa chuyển khoản";
    }

    const roleLabel = role === "ctv" ? "CTV" : "NTT";

    const row: (string | number)[] = [
      repCode, // A  Mã đăng ký
      now, // B  Thời gian
      formData.name as string, // C  Họ tên
      formData.email as string, // D  Email
      formData.gender as string, // E  Giới tính
      Number(formData.age), // F  Tuổi
      formData.facebook as string, // G  Facebook
      formData.phone as string, // H  SĐT
      formData.emergency_phone as string, // I  SĐT khẩn cấp
      formData.emergency_relation as string, // J  Quan hệ khẩn cấp
      (formData.address as string) || "", // K  Địa chỉ
      (formData.blood_type as string) || "", // L  Nhóm máu
      roleLabel, // M  Hình thức (CTV/NTT)
      1, // N  Số người
      transport, // O  Phương tiện
      busDeparture, // P  Nơi xuất phát
      Number(formData.fee_event), // Q  Phí sự kiện
      Number(formData.fee_bus), // R  Phí xe bus
      Number(formData.donation) || 0, // S  Quyên góp
      (Number(formData.fee_event) || 0) +
        (Number(formData.fee_bus) || 0) +
        (Number(formData.product_fee) || 0) +
        (Number(formData.donation) || 0), // T  Tổng phí
      receiptLink, // U  Link ảnh CK
      (formData.food_allergy as string) || "", // V  Dị ứng
      formData.want_products === "yes"
        ? (() => {
            const p = formData.products as Record<string, number>;
            const parts: string[] = [];
            if (p?.khan_ran) parts.push(`Khăn Rằn x${p.khan_ran}`);
            if (p?.khan_tho_cam) parts.push(`Khăn Thổ Cẩm x${p.khan_tho_cam}`);
            if (p?.tui_to_te) parts.push(`Túi Tò Te x${p.tui_to_te}`);
            return parts.join(", ");
          })()
        : "Không", // W  Sản phẩm
      Number(formData.product_fee) || 0, // X  Phí sản phẩm
      formData.volunteer === "yes" ? "Có" : "Không", // Y  CTV
      formData.volunteer === "yes" && Array.isArray(formData.volunteer_teams)
        ? (formData.volunteer_teams as string[]).join(", ")
        : "", // Z  Team CTV
      (formData.note as string) || "", // AA Ghi chú
      status, // AB Trạng thái
      "", // AC Mã đại diện (trống)
      roleLabel, // AD Vai trò
      participant?.shirt_size ?? "", // AE Size áo
      COLOR_LABEL[participant?.shirt_color] ?? "", // AF Màu áo
      cabinName, // AG Cabin
      (formData.password as string) ?? "", // AH Mật khẩu
    ];

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    // Đánh dấu reservation completed
    try {
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
      }
    } catch {
      // non-critical
    }

    // Cập nhật số đã đăng ký cabin
    updateCabinCounts(cabinSheets, process.env.GOOGLE_SHEET_ID!).catch(
      () => {},
    );

    // Gửi email xác nhận
    const userEmail = formData.email as string;
    if (userEmail) {
      sendConfirmEmail({
        name: formData.name as string,
        email: userEmail,
        code: repCode,
        password: formData.password as string,
        role,
        transport,
        bus_departure: busDeparture,
        event_fee: Number(formData.fee_event),
        bus_fee: Number(formData.fee_bus),
        total: feeTotal,
        shirt_size: participant?.shirt_size ?? "",
        shirt_color: COLOR_LABEL[participant?.shirt_color] ?? "",
        cabin: cabinName,
        payment_timing: paymentTiming,
        donation: Number(formData.donation) || 0,
      }).catch((err) =>
        console.error("CTV/NTT register: gửi email thất bại", err),
      );
    }

    return res.status(200).json({ ok: true, repCode });
  } catch (err) {
    console.error("CTV/NTT register error:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Lỗi server, vui lòng thử lại." });
  }
}
