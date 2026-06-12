import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { Readable } from "stream";
import nodemailer from "nodemailer";
import { getAuth } from "./utils";

export const config = {
  api: { bodyParser: { sizeLimit: "15mb" } },
};

// Column indices (0-based) — phải khớp với trao-2026-lookup.ts
const C = {
  CODE: 0,
  NAME: 2,
  EMAIL: 3,
  STATUS: 26,
  RECEIPT: 19,
  PASSWORD: 32,
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

async function sendPaymentConfirmEmail(d: {
  name: string;
  email: string;
  code: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL!,
      pass: process.env.GMAIL_APP_PASSWORD!,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">

  <div style="background:#1b5e20;padding:28px 24px;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px">BÀN CHÂN XANH</h1>
    <p style="color:#a5d6a7;margin:6px 0 0;font-size:14px">TRAO 2026 — Xác nhận đã nhận chuyển khoản</p>
  </div>

  <div style="padding:28px 24px">
    <p style="font-size:16px;margin-top:0">Xin chào <strong>${d.name}</strong>,</p>

    <div style="background:#e8f5e9;border:2px solid #4caf50;border-radius:8px;padding:20px;margin:20px 0;text-align:center">
      <p style="margin:0 0 6px;font-size:28px">✅</p>
      <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1b5e20">
        Đã nhận ảnh chuyển khoản!
      </p>
      <p style="margin:0;font-size:14px;color:#555">
        Ban tổ chức đã nhận được ảnh chuyển khoản của bạn và đang tiến hành xác nhận.
      </p>
    </div>

    <p style="color:#555;font-size:14px;line-height:1.7">
      Mã đăng ký của bạn: <strong style="font-size:18px;color:#1b5e20;letter-spacing:2px">${d.code}</strong>
    </p>
    <p style="color:#555;font-size:14px;line-height:1.7">
      Trạng thái đăng ký hiện tại: <strong style="color:#ff8f00">Chờ xác nhận</strong>.<br>
      Ban tổ chức sẽ xác nhận và thông báo kết quả trong thời gian sớm nhất.
    </p>

    <div style="background:#e8f5e9;border-radius:8px;padding:16px;margin:20px 0;text-align:center">
      <p style="margin:0 0 8px;font-size:14px;color:#555">
        Bạn vẫn có thể chỉnh sửa <strong>size áo</strong> và <strong>chỗ ngủ</strong> tại trang tra cứu:
      </p>
      <a href="https://banchanxanh.com/trao-2026-tra-cuu"
         style="display:inline-block;background:#2e7d32;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">
        ✏️ Chỉnh sửa áo & chỗ ngủ →
      </a>
    </div>

    <p style="color:#777;font-size:13px;line-height:1.6">
      Thắc mắc liên hệ ban tổ chức:<br>
      💬 Fanpage: <a href="https://www.facebook.com/banchanxanhjp" style="color:#2e7d32">Bàn Chân Xanh</a>
    </p>
  </div>

  <div style="background:#f5f5f5;padding:16px 24px;text-align:center;border-top:1px solid #e0e0e0">
    <p style="margin:0;color:#999;font-size:12px">
      © 2026 Bàn Chân Xanh · Email này được gửi tự động sau khi upload ảnh chuyển khoản.
    </p>
  </div>
</div>
</body>
</html>`;

  await transporter.sendMail({
    from: `"Bàn Chân Xanh - TRAO 2026" <${process.env.GOOGLE_EMAIL}>`,
    to: d.email,
    subject: `[TRAO 2026] Đã nhận ảnh chuyển khoản — Mã ${d.code}`,
    html,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, password, receipt } = req.body as {
    code: string;
    password: string;
    receipt: { base64: string; mimeType: string; filename: string };
  };

  if (!code || !password || !receipt?.base64)
    return res.status(400).json({ ok: false, error: "Thiếu thông tin." });

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const sheetId = process.env.GOOGLE_SHEET_ID!;

    // Tìm dòng của mã đăng ký
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "A2:AG",
    });
    const rows = result.data.values ?? [];
    const rowIdx = rows.findIndex((r) => r[C.CODE] === code);

    if (rowIdx === -1)
      return res
        .status(404)
        .json({ ok: false, error: "Không tìm thấy mã đăng ký." });

    const row = rows[rowIdx];

    if ((row[C.PASSWORD] ?? "") !== password)
      return res.status(401).json({ ok: false, error: "Mật khẩu không đúng." });

    if ((row[C.STATUS] ?? "") !== "Chưa chuyển khoản")
      return res.status(400).json({
        ok: false,
        error: "Đăng ký không ở trạng thái chờ chuyển khoản.",
      });

    // Upload ảnh lên Drive
    const receiptLink = await uploadToDrive(
      auth,
      receipt.base64,
      receipt.mimeType,
      `${code}_${receipt.filename}`,
    );

    // Cập nhật cột RECEIPT và STATUS trong sheet (1-based: rowIdx+2)
    const sheetRow = rowIdx + 2;
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            range: `T${sheetRow}`, // cột T = index 19 = RECEIPT
            values: [[receiptLink]],
          },
          {
            range: `AA${sheetRow}`, // cột AA = index 26 = STATUS
            values: [["Chờ xác nhận"]],
          },
        ],
      },
    });

    // Gửi email xác nhận (fire-and-forget)
    const userName = String(row[C.NAME] ?? "");
    const userEmail = String(row[C.EMAIL] ?? "");
    if (userEmail) {
      sendPaymentConfirmEmail({ name: userName, email: userEmail, code }).catch(
        (err) => console.error("Upload-receipt: gửi email thất bại", err),
      );
    }

    return res.status(200).json({ ok: true, receiptLink });
  } catch (err) {
    console.error("Upload receipt error:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Lỗi server, vui lòng thử lại." });
  }
}
