import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { getAuth } from "./utils";

// Cột AE(30)=SHIRT_SIZE, AF(31)=SHIRT_COLOR (0-based)
const COL_SHIRT_SIZE = "AE";
const COL_SHIRT_COLOR = "AF";

// Trả về { "white|M": 12, "green|M": 5, ... }
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const [sizeRes, colorRes] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `${COL_SHIRT_SIZE}2:${COL_SHIRT_SIZE}`,
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        range: `${COL_SHIRT_COLOR}2:${COL_SHIRT_COLOR}`,
      }),
    ]);

    const sizes = (sizeRes.data.values ?? []).flat();
    const colors = (colorRes.data.values ?? []).flat();

    const colorValue: Record<string, string> = {
      Trắng: "white",
      "Xanh lá": "green",
      "Vàng chanh": "yellow",
    };

    const counts: Record<string, number> = {};
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      const colorRaw = colors[i];
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
