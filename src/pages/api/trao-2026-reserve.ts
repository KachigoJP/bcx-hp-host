import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { Logger } from "../../lib/logger";
import { getAuth } from "./utils";

// ─── Sheets dùng chung trong cùng 1 Spreadsheet ──────────────────────────────
//   Sheet1 (main): dữ liệu đăng ký hoàn chỉnh
//   Reservations : code | password | created_at | status
const MAIN_RANGE = "A2:A"; // cột mã trong sheet chính
const RES_SHEET = "Reservations"; // tên tab reservations

// Đọc tất cả mã đã tồn tại (main + reservations) để tránh trùng
async function fetchAllCodes(
  sheets: ReturnType<typeof google.sheets>,
): Promise<Set<string>> {
  const codes = new Set<string>();

  const [mainRes, resRes] = await Promise.all([
    sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: MAIN_RANGE,
      })
      .catch(() => ({ data: { values: [] } })),
    sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `${RES_SHEET}!A2:A`,
      })
      .catch(() => ({ data: { values: [] } })),
  ]);

  (mainRes.data.values ?? []).forEach(([c]) => c && codes.add(c));
  (resRes.data.values ?? []).forEach(([c]) => c && codes.add(c));
  return codes;
}

// Đảm bảo sheet Reservations tồn tại với header
async function ensureReservationsSheet(
  sheets: ReturnType<typeof google.sheets>,
) {
  // Đọc thử — nếu đọc được thì sheet đã tồn tại, không cần làm gì
  try {
    await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `${RES_SHEET}!A1`,
    });
    return; // Sheet đã tồn tại
  } catch (readErr: unknown) {
    // Chỉ tạo mới nếu lỗi là "sheet không tồn tại" (status 400, không phải lỗi OAuth/mạng)
    const msg = readErr instanceof Error ? readErr.message : String(readErr);
    const isSheetNotFound =
      msg.includes("Unable to parse range") ||
      msg.includes("400") ||
      msg.includes("not found") ||
      msg.includes("badRequest");
    if (!isSheetNotFound) throw readErr; // Re-throw lỗi OAuth / mạng
  }

  // Tạo sheet mới — bỏ qua nếu đã tồn tại (race condition)
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      requestBody: {
        requests: [{ addSheet: { properties: { title: RES_SHEET } } }],
      },
    });
  } catch (createErr: unknown) {
    // Sheet đã được tạo bởi request song song → bỏ qua
    const msg =
      createErr instanceof Error ? createErr.message : String(createErr);
    if (!msg.includes("already exists") && !msg.includes("alreadyExists")) {
      throw createErr;
    }
  }

  // Viết header
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `${RES_SHEET}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["Mã đăng ký", "Mật khẩu", "Thời gian", "Trạng thái"]],
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const log = new Logger();
  log.info("reserve/start", "Bắt đầu tạo mã đăng ký");

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    // Đọc mã hiện có (2 sheets song song)
    log.startStep();
    const existingCodes = await fetchAllCodes(sheets);
    log.info("reserve/fetch-codes", "Đọc mã hiện có hoàn tất", {
      durationMs: log.elapsed(),
      existingCount: existingCodes.size,
    });

    // Sinh code duy nhất
    let code = "";
    for (let i = 0; i < 1000; i++) {
      const candidate = `BCX${Math.floor(100000 + Math.random() * 900000)}`;
      if (!existingCodes.has(candidate)) {
        code = candidate;
        break;
      }
    }
    if (!code) throw new Error("Không thể sinh mã duy nhất.");

    const password = String(Math.floor(100000 + Math.random() * 900000));
    const nowStr = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Tokyo",
    });

    // Append vào Reservations
    log.startStep();
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `${RES_SHEET}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[code, password, nowStr, "pending"]] },
      });
    } catch (appendErr: unknown) {
      const msg =
        appendErr instanceof Error ? appendErr.message : String(appendErr);
      const isSheetMissing =
        msg.includes("Unable to parse range") ||
        msg.includes("badRequest") ||
        msg.includes("not found");
      if (!isSheetMissing) throw appendErr;

      // Sheet chưa tồn tại — tạo mới rồi thử lại
      log.warn(
        "reserve/create-sheet",
        "Sheet Reservations chưa tồn tại, đang tạo mới",
      );
      await ensureReservationsSheet(sheets);
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `${RES_SHEET}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[code, password, nowStr, "pending"]] },
      });
    }
    log.info("reserve/append", "Ghi mã vào Reservations sheet thành công", {
      durationMs: log.elapsed(),
      code,
    });

    log.info("reserve/done", "Tạo mã đăng ký thành công", { code });
    return res.status(200).json({ ok: true, code, password });
  } catch (err) {
    log.error("reserve/error", "Tạo mã đăng ký thất bại", err);
    res
      .status(500)
      .json({ ok: false, error: "Không thể tạo mã. Vui lòng thử lại." });
  }
}
