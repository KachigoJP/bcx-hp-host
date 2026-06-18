import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import type { CabinInfo, CabinOccupant } from "../../components/trao2026/types";
import { formatGoogleApiError, getAuth } from "./utils";

// Sheet "Danh sách cabin":
//   A = Số TT (1-34, sequential)
//   B = Nhóm (Nhà chú Cuội / Nhà gốc đa / Nhà chị Hằng)
//   C = Thứ tự trong nhóm (1, 2, 3...)
//   D = Tên đầy đủ (= B + C, e.g. "Nhà chú Cuội 1")
//   E = Sức chứa (số người có thể ở)
//   F = Số người đã đăng ký (được cập nhật bởi register API)
//   G = Ghi chú
const CABIN_SHEET = "Danh sách cabin";

// Main sheet: cột AG (index 32, 0-based) chứa cabin dạng "Cabin X" (X = cột A)
const MAIN_CABIN_COL = "AG";

// ─── Helper: đọc cabin list + đếm từ main sheet ──────────────────────────────

export async function fetchCabins(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string,
): Promise<CabinInfo[]> {
  // Đọc main sheet: C(2)=NAME, E(4)=GENDER, F(5)=AGE, AG(32)=CABIN
  // Range A2:AG để lấy đủ các cột cần thiết
  const [cabinRes, mainRes] = await Promise.all([
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${CABIN_SHEET}!A2:G`,
    }),
    sheets.spreadsheets.values
      .get({
        spreadsheetId: sheetId,
        range: "A2:AG",
      })
      .catch(() => ({ data: { values: [] as string[][] } })),
  ]);

  const cabinRows = cabinRes.data.values ?? [];
  const mainRows = (mainRes.data.values ?? []) as string[][];

  // Đọc tên nhà chòi từ cabin sheet trước để build map fullName → number
  const fullNameToNumber: Record<string, number> = {};
  for (const row of cabinRows) {
    const number = Number(String(row[0] ?? "").replace(/\D/g, ""));
    const fullName = String(row[3] ?? "").trim();
    if (number > 0 && fullName) fullNameToNumber[fullName] = number;
  }

  // Đếm số người + gom danh sách occupants theo cabin
  const registeredCount: Record<number, number> = {};
  const occupantsMap: Record<number, CabinOccupant[]> = {};

  for (const row of mainRows) {
    const cabinVal = String(row[32] ?? "").trim(); // AG = index 32
    if (!cabinVal) continue;

    let cabinNumber: number | undefined;
    if (fullNameToNumber[cabinVal] !== undefined) {
      cabinNumber = fullNameToNumber[cabinVal];
    } else {
      const match = cabinVal.match(/^Cabin\s+(\d+)$/i);
      if (match) cabinNumber = Number(match[1]);
    }
    if (!cabinNumber) continue;

    registeredCount[cabinNumber] = (registeredCount[cabinNumber] ?? 0) + 1;

    const name = String(row[2] ?? "").trim(); // C = index 2
    const gender = String(row[4] ?? "").trim(); // E = index 4
    const age = String(row[5] ?? "").trim(); // F = index 5
    if (name) {
      if (!occupantsMap[cabinNumber]) occupantsMap[cabinNumber] = [];
      occupantsMap[cabinNumber].push({ name, gender, age });
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
      const note = String(row[6] ?? "").trim();
      return {
        number,
        group,
        groupOrder,
        fullName,
        capacity,
        registered,
        available: registered < capacity,
        note,
        occupants: occupantsMap[number] ?? [],
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
  } catch (err: unknown) {
    console.error("Cabins API error:", formatGoogleApiError(err));
    res
      .status(500)
      .json({ ok: false, error: "Không thể tải danh sách cabin." });
  }
}
