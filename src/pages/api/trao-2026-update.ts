import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { getAuth } from "./utils";

type ParticipantUpdate = {
  rowIndex: number; // 1-based row number in sheet
  shirt_size: string;
  shirt_color: string;
  cabin: string;
};

const COLOR_LABEL: Record<string, string> = {
  white: "Trắng",
  green: "Xanh lá",
  yellow: "Vàng chanh",
};

// Cập nhật cột AE:AG (Size áo, Màu áo, Cabin) cho một dòng cụ thể
async function updateRow(
  sheets: ReturnType<typeof google.sheets>,
  rowIndex: number,
  shirt_size: string,
  shirt_color: string,
  cabin: string,
) {
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `AE${rowIndex}:AG${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [shirt_size, COLOR_LABEL[shirt_color] ?? shirt_color, cabin || ""],
      ],
    },
  });
}

function nowJst(): string {
  return new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, password, participants } = req.body as {
    code: string;
    password: string;
    participants: ParticipantUpdate[];
  };

  if (!code || !password || !participants?.length) {
    return res.status(400).json({ ok: false, error: "Thiếu thông tin." });
  }

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    // Verify mật khẩu trước khi cho sửa
    const verify = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: "A2:AH",
    });
    const rows = verify.data.values ?? [];
    const repRow = rows.find((r) => r[0] === code);
    if (!repRow) {
      return res
        .status(404)
        .json({ ok: false, error: "Không tìm thấy mã đăng ký." });
    }
    if (repRow[33] !== password) {
      return res.status(401).json({ ok: false, error: "Mật khẩu không đúng." });
    }

    // Cập nhật từng người song song
    await Promise.all(
      participants.map((p) =>
        updateRow(sheets, p.rowIndex, p.shirt_size, p.shirt_color, p.cabin),
      ),
    );

    // Ghi trạng thái + thời gian chỉnh sửa áo/cabin vào AL:AM của dòng đại diện
    const repRowIndex = rows.findIndex((r) => r[0] === code) + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `AL${repRowIndex}:AM${repRowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [["Đã cập nhật", nowJst()]] },
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ ok: false, error: "Lỗi server, vui lòng thử lại." });
  }
}
