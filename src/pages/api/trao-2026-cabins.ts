import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import type { CabinInfo } from "../../components/trao2026/types";

// Sheet "Danh sách cabin":
//   A = Số TT (1-34, sequential)
//   B = Nhóm (Nhà chú Cuội / Nhà gốc đa / Nhà chị Hằng)
//   C = Thứ tự trong nhóm (1, 2, 3...)
//   D = Tên đầy đủ (= B + C, e.g. "Nhà chú Cuội 1")
//   E = Sức chứa (số người có thể ở)
//   F = Số người đã đăng ký (được cập nhật bởi register API)
const CABIN_SHEET = "Danh sách cabin";

// Main sheet: cột AF (index 31, 0-based) chứa cabin dạng "Cabin X" (X = cột A)
const MAIN_CABIN_COL = "AF";

export function getAuth() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

// ─── Helper: đọc cabin list + đếm từ main sheet ──────────────────────────────

export async function fetchCabins(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string,
): Promise<CabinInfo[]> {
  const [cabinRes, mainRes] = await Promise.all([
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${CABIN_SHEET}!A2:E`,
    }),
    sheets.spreadsheets.values
      .get({
        spreadsheetId: sheetId,
        range: `${MAIN_CABIN_COL}2:${MAIN_CABIN_COL}`,
      })
      .catch(() => ({ data: { values: [] as string[][] } })),
  ]);

  const cabinRows = cabinRes.data.values ?? [];
  const mainCabinValues = (mainRes.data.values ?? []).flat();

  // Đọc tên nhà chòi từ cabin sheet trước để build map fullName → number
  const fullNameToNumber: Record<string, number> = {};
  for (const row of cabinRows) {
    const number = Number(String(row[0] ?? "").replace(/\D/g, ""));
    const fullName = String(row[3] ?? "").trim();
    if (number > 0 && fullName) fullNameToNumber[fullName] = number;
  }

  // Đếm số người đã đăng ký theo tên nhà chòi (cột AF lưu fullName)
  // Tương thích ngược: vẫn nhận dạng format cũ "Cabin X" nếu còn trong sheet
  const registeredCount: Record<number, number> = {};
  for (const val of mainCabinValues) {
    const v = String(val).trim();
    if (!v) continue;
    // Format mới: tên nhà chòi trực tiếp (vd: "Nhà chú Cuội 2")
    if (fullNameToNumber[v] !== undefined) {
      const n = fullNameToNumber[v];
      registeredCount[n] = (registeredCount[n] ?? 0) + 1;
    } else {
      // Format cũ: "Cabin X" — tương thích ngược
      const match = v.match(/^Cabin\s+(\d+)$/i);
      if (match) {
        const n = Number(match[1]);
        registeredCount[n] = (registeredCount[n] ?? 0) + 1;
      }
    }
  }

  const cabins: CabinInfo[] = cabinRows
    .map((row) => {
      const number = Number(String(row[0] ?? "").replace(/\D/g, ""));
      const group = String(row[1] ?? "").trim() || "Khác";
      const groupOrder = Number(row[2]) || 0;
      const fullName = String(row[3] ?? "").trim() || `${group} ${groupOrder}`;
      const capacity = Number(row[4]) || 0;
      const registered = registeredCount[number] ?? 0;
      return {
        number,
        group,
        groupOrder,
        fullName,
        capacity,
        registered,
        available: registered < capacity,
      };
    })
    .filter((c) => c.number > 0 && c.capacity > 0)
    .sort((a, b) => a.number - b.number);

  return cabins;
}

// ─── Helper: cập nhật cột F (số đã đăng ký) trong "Danh sách cabin" ──────────

export async function updateCabinCounts(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string,
): Promise<void> {
  // Đọc lại toàn bộ để tính chính xác (tránh race condition cộng dồn sai)
  const [cabinRes, mainRes] = await Promise.all([
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${CABIN_SHEET}!A2:D`, // đọc thêm cột D (fullName) để map
    }),
    sheets.spreadsheets.values
      .get({
        spreadsheetId: sheetId,
        range: `${MAIN_CABIN_COL}2:${MAIN_CABIN_COL}`,
      })
      .catch(() => ({ data: { values: [] as string[][] } })),
  ]);

  const cabinRows = cabinRes.data.values ?? [];
  const cabinNumbers = cabinRows.map(([v]) =>
    Number(String(v ?? "").replace(/\D/g, "")),
  );
  const mainCabinValues = (mainRes.data.values ?? []).flat();

  // Build fullName → number map để đếm theo tên nhà chòi
  const fullNameToNumber: Record<string, number> = {};
  for (const row of cabinRows) {
    const number = Number(String(row[0] ?? "").replace(/\D/g, ""));
    const fullName = String(row[3] ?? "").trim();
    if (number > 0 && fullName) fullNameToNumber[fullName] = number;
  }

  // Đếm từ main sheet — hỗ trợ cả format mới (tên nhà chòi) và cũ ("Cabin X")
  const registeredCount: Record<number, number> = {};
  for (const val of mainCabinValues) {
    const v = String(val).trim();
    if (!v) continue;
    if (fullNameToNumber[v] !== undefined) {
      const n = fullNameToNumber[v];
      registeredCount[n] = (registeredCount[n] ?? 0) + 1;
    } else {
      const match = v.match(/^Cabin\s+(\d+)$/i);
      if (match) {
        const n = Number(match[1]);
        registeredCount[n] = (registeredCount[n] ?? 0) + 1;
      }
    }
  }

  if (cabinNumbers.length === 0) return;

  // Ghi cột F (cột thứ 6) theo từng dòng
  const countValues = cabinNumbers.map((n) => [registeredCount[n] ?? 0]);
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${CABIN_SHEET}!F2:F${cabinNumbers.length + 1}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: countValues },
  });
}

// ─── API Handler ──────────────────────────────────────────────────────────────

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const sheetId = process.env.GOOGLE_SHEET_ID!;

    const cabins = await fetchCabins(sheets, sheetId);
    res.status(200).json({ ok: true, cabins });
  } catch (err) {
    console.error("Cabins API error:", err);
    res
      .status(500)
      .json({ ok: false, error: "Không thể tải danh sách cabin." });
  }
}
