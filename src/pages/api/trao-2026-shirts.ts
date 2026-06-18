import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { getAuth } from "./utils";

// Đọc AB:AF để lấy STATUS(0), SHIRT_SIZE(3), SHIRT_COLOR(4) trong một request
// AB=STATUS, AC=REP_CODE, AD=ROLE, AE=SHIRT_SIZE, AF=SHIRT_COLOR

// Trả về { "white|M": 12, "green|M": 5, ... } — bỏ qua đăng ký "Hết hạn"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "AB2:AF",
    });

    const rows = result.data.values ?? [];

    const colorValue: Record<string, string> = {
      Trắng: "white",
      "Xanh lá": "green",
      "Vàng chanh": "yellow",
    };

    const counts: Record<string, number> = {};
    for (const row of rows) {
      const status = String(row[0] ?? "").trim();
      if (status === "Hết hạn") continue;
      const size = String(row[3] ?? "").trim();
      const colorRaw = String(row[4] ?? "").trim();
      if (!size || !colorRaw) continue;
      const color = colorValue[colorRaw] ?? colorRaw;
      const key = `${color}|${size}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }

    res.status(200).json({ ok: true, counts });
  } catch (err) {
    console.error("shirts error:", err);
    res.status(500).json({ ok: false });
  }
}
