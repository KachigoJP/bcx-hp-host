import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

// ─── Sheets dùng chung trong cùng 1 Spreadsheet ──────────────────────────────
//   Sheet1 (main): dữ liệu đăng ký hoàn chỉnh
//   Reservations : code | password | created_at | status
const MAIN_RANGE = "A2:A";           // cột mã trong sheet chính
const RES_SHEET  = "Reservations";   // tên tab reservations

function getAuth() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

// Đọc tất cả mã đã tồn tại (main + reservations) để tránh trùng
async function fetchAllCodes(
  sheets: ReturnType<typeof google.sheets>,
): Promise<Set<string>> {
  const codes = new Set<string>();

  const [mainRes, resRes] = await Promise.all([
    sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: MAIN_RANGE,
    }).catch(() => ({ data: { values: [] } })),
    sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `${RES_SHEET}!A2:A`,
    }).catch(() => ({ data: { values: [] } })),
  ]);

  (mainRes.data.values ?? []).forEach(([c]) => c && codes.add(c));
  (resRes.data.values ?? []).forEach(([c]) => c && codes.add(c));
  return codes;
}

// Đảm bảo sheet Reservations tồn tại với header
async function ensureReservationsSheet(
  sheets: ReturnType<typeof google.sheets>,
) {
  // Đọc thử — nếu lỗi thì sheet chưa tồn tại, cần tạo
  try {
    await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `${RES_SHEET}!A1`,
    });
  } catch {
    // Tạo sheet mới
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      requestBody: {
        requests: [{
          addSheet: { properties: { title: RES_SHEET } },
        }],
      },
    });
    // Viết header
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `${RES_SHEET}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["Mã đăng ký", "Mật khẩu", "Thời gian", "Trạng thái"]] },
    });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const auth  = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    await ensureReservationsSheet(sheets);

    // Thử tối đa 5 lần để tránh race condition cực hiếm
    for (let attempt = 0; attempt < 5; attempt++) {
      const existingCodes = await fetchAllCodes(sheets);

      // Sinh code BCX + 6 số ngẫu nhiên
      let code = "";
      for (let i = 0; i < 1000; i++) {
        const candidate = `BCX${Math.floor(100000 + Math.random() * 900000)}`;
        if (!existingCodes.has(candidate)) { code = candidate; break; }
      }
      if (!code) continue;

      // Mật khẩu 6 chữ số
      const password = String(Math.floor(100000 + Math.random() * 900000));

      const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Tokyo" });

      // Ghi ngay vào Reservations — nếu code đã tồn tại (race condition rất hiếm)
      // thì lần append tiếp theo vẫn ghi được, chúng ta sẽ verify sau
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `${RES_SHEET}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[code, password, now, "pending"]] },
      });

      // Verify: đọc lại toàn bộ Reservations để chắc chắn code chỉ xuất hiện 1 lần
      const verify = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `${RES_SHEET}!A2:A`,
      });
      const allResCodes = (verify.data.values ?? []).map(([c]) => c);
      const count = allResCodes.filter((c) => c === code).length;

      if (count === 1) {
        // Thành công — code độc nhất
        return res.status(200).json({ ok: true, code, password });
      }

      // Race condition: code bị trùng, xóa dòng trùng cuối và thử lại
      // Tìm dòng cuối cùng có code này và xóa giá trị
      const lastRow = allResCodes.lastIndexOf(code) + 2; // +2 vì header ở row 1
      await sheets.spreadsheets.values.clear({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `${RES_SHEET}!A${lastRow}:D${lastRow}`,
      });
      // Thử lại với code mới
    }

    throw new Error("Không thể tạo mã đăng ký sau 5 lần thử.");
  } catch (err) {
    console.error("Reserve API error:", err);
    res.status(500).json({ ok: false, error: "Không thể tạo mã. Vui lòng thử lại." });
  }
}
