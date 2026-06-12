import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { getAuth } from "./utils";

// Column indices (0-based) theo header hiện tại (33 cột)
const C = {
  CODE: 0,
  NAME: 2,
  EMAIL: 3,
  GENDER: 4,
  AGE: 5,
  FACEBOOK: 6,
  PHONE: 7,
  EMERGENCY_PHONE: 8,
  EMERGENCY_REL: 9,
  ADDRESS: 10,
  BLOOD: 11,
  REG_TYPE: 12,
  NUM_PERSON: 13,
  TRANSPORT: 14,
  BUS_DEP: 15,
  FEE_EVENT: 16,
  FEE_BUS: 17,
  FEE_TOTAL: 18,
  RECEIPT: 19,
  FOOD_ALLERGY: 20,
  PRODUCTS: 21,
  FEE_PRODUCT: 22,
  VOLUNTEER: 23,
  VOLUNTEER_TEAMS: 24,
  NOTE: 25,
  STATUS: 26,
  REP_CODE: 27,
  ROLE: 28,
  SHIRT_SIZE: 29,
  SHIRT_COLOR: 30,
  CABIN: 31,
  PASSWORD: 32,
};

const COLOR_VALUE: Record<string, string> = {
  Trắng: "white",
  "Xanh lá": "green",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, password } = req.body as { code: string; password: string };
  if (!code || !password)
    return res.status(400).json({ ok: false, error: "Thiếu thông tin." });

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "A2:AG",
    });

    const rows = result.data.values ?? [];

    // Tìm dòng đại diện
    const repIdx = rows.findIndex((r) => r[C.CODE] === code);
    if (repIdx === -1)
      return res
        .status(404)
        .json({ ok: false, error: "Không tìm thấy mã đăng ký." });

    const rep = rows[repIdx];
    if ((rep[C.PASSWORD] ?? "") !== password) {
      return res.status(401).json({ ok: false, error: "Mật khẩu không đúng." });
    }

    // Tìm thành viên
    const memberRows = rows
      .map((r, i) => ({ r, i }))
      .filter(({ r }) => r[C.REP_CODE] === code)
      .map(({ r, i }) => ({
        rowIndex: i + 2,
        name: r[C.NAME] ?? "",
        shirt_size: r[C.SHIRT_SIZE] ?? "",
        shirt_color: COLOR_VALUE[r[C.SHIRT_COLOR]] ?? "",
        cabin: r[C.CABIN] ?? "",
        relation: r[C.EMERGENCY_REL] ?? "",
        age: r[C.AGE] ?? "",
        gender: r[C.GENDER] ?? "",
      }));

    return res.status(200).json({
      ok: true,
      // Thông tin tra cứu đầy đủ
      profile: {
        code,
        name: rep[C.NAME] ?? "",
        email: rep[C.EMAIL] ?? "",
        gender: rep[C.GENDER] ?? "",
        age: rep[C.AGE] ?? "",
        facebook: rep[C.FACEBOOK] ?? "",
        phone: rep[C.PHONE] ?? "",
        emergency_phone: rep[C.EMERGENCY_PHONE] ?? "",
        emergency_relation: rep[C.EMERGENCY_REL] ?? "",
        address: rep[C.ADDRESS] ?? "",
        blood_type: rep[C.BLOOD] ?? "",
        reg_type: rep[C.REG_TYPE] ?? "",
        num_person: rep[C.NUM_PERSON] ?? "",
        transport: rep[C.TRANSPORT] ?? "",
        bus_departure: rep[C.BUS_DEP] ?? "",
        fee_event: rep[C.FEE_EVENT] ?? "",
        fee_bus: rep[C.FEE_BUS] ?? "",
        fee_total: rep[C.FEE_TOTAL] ?? "",
        products: rep[C.PRODUCTS] ?? "",
        fee_product: rep[C.FEE_PRODUCT] ?? "",
        food_allergy: rep[C.FOOD_ALLERGY] ?? "",
        volunteer: rep[C.VOLUNTEER] ?? "",
        volunteer_teams: rep[C.VOLUNTEER_TEAMS] ?? "",
        note: rep[C.NOTE] ?? "",
        status: rep[C.STATUS] ?? "",
        created_at: rows[repIdx][1] ?? "",
        receipt: rep[C.RECEIPT] ?? "",
      },
      // Dữ liệu cho edit form
      representative: {
        rowIndex: repIdx + 2,
        name: rep[C.NAME] ?? "",
        shirt_size: rep[C.SHIRT_SIZE] ?? "",
        shirt_color: COLOR_VALUE[rep[C.SHIRT_COLOR]] ?? "",
        cabin: rep[C.CABIN] ?? "",
      },
      members: memberRows,
    });
  } catch (err) {
    console.error("Lookup error:", err);
    res.status(500).json({ ok: false, error: "Lỗi server, vui lòng thử lại." });
  }
}
