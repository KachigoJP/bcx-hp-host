import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export const config = { api: { bodyParser: { sizeLimit: "1mb" } } };

function fmtYen(n: number | string) {
  return Number(n).toLocaleString("ja-JP") + " ¥";
}

function buildHtml(data: {
  name: string;
  code: string;
  password: string;
  email: string;
  transport: string;
  bus_departure: string;
  reg_type: string;
  members: Array<{
    name: string;
    shirt_size: string;
    shirt_color: string;
    cabin: string;
  }>;
  representative: {
    name: string;
    shirt_size: string;
    shirt_color: string;
    cabin: string;
  };
  fee_event: number;
  fee_bus: number;
  fee_total: number;
  products: string;
  fee_product: number;
  donation?: number;
  payment_timing?: string;
  food_allergy: string;
  volunteer: string;
  volunteer_teams: string[];
  note: string;
}): string {
  const donation = Number(data.donation) || 0;
  const grandTotal = data.fee_total + data.fee_product + donation;
  const needPayLater = data.payment_timing === "later" && grandTotal > 0;
  const allParticipants = [
    {
      ...data.representative,
      role: data.reg_type === "Cá nhân" ? "Cá nhân" : "Đại diện",
    },
    ...data.members.map((m) => ({ ...m, role: "Thành viên" })),
  ];

  const participantRows = allParticipants
    .map(
      (p) => `
      <tr>
        <td style="padding:8px;border:1px solid #e0e0e0">${p.name}</td>
        <td style="padding:8px;border:1px solid #e0e0e0;text-align:center">${p.role}</td>
        <td style="padding:8px;border:1px solid #e0e0e0;text-align:center">${p.shirt_size || "—"}</td>
        <td style="padding:8px;border:1px solid #e0e0e0;text-align:center">${p.shirt_color === "white" ? "Trắng" : p.shirt_color === "green" ? "Xanh lá" : p.shirt_color === "yellow" ? "Vàng chanh" : p.shirt_color || "—"}</td>
        <td style="padding:8px;border:1px solid #e0e0e0;text-align:center">${p.cabin || "—"}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">

  <!-- Header -->
  <div style="background:#1b5e20;padding:28px 24px;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px">BÀN CHÂN XANH</h1>
    <p style="color:#a5d6a7;margin:6px 0 0;font-size:14px">TRAO 2026 — Xác nhận đăng ký</p>
  </div>

  <!-- Body -->
  <div style="padding:28px 24px">
    <p style="font-size:16px;margin-top:0">Xin chào <strong>${data.name}</strong>,</p>
    <p style="color:#555;line-height:1.6">
      Ban tổ chức <strong>Bàn Chân Xanh</strong> đã nhận được thông tin đăng ký tham gia sự kiện <strong>TRAO 2026</strong> của bạn.
      Cảm ơn bạn đã đăng ký! Chúng mình rất vui được gặp bạn tại sự kiện.
    </p>

    <!-- Mã đăng ký -->
    <div style="background:#f0f7f0;border:2px dashed #4caf50;border-radius:8px;padding:20px;margin:20px 0;text-align:center">
      <p style="margin:0 0 4px;color:#555;font-size:13px;text-transform:uppercase;letter-spacing:1px">Mã đăng ký của bạn</p>
      <p style="margin:0;font-size:32px;font-weight:900;color:#1b5e20;letter-spacing:4px">${data.code}</p>
      <p style="margin:8px 0 0;color:#777;font-size:13px">Mật khẩu: <strong style="letter-spacing:3px">${data.password}</strong></p>
      <p style="margin:8px 0 0;color:#e65100;font-size:12px">
        Mã đăng ký và mật khẩu dùng để đăng nhập khi tra cứu và chỉnh sửa thông tin.
      </p>
      <p style="margin:12px 0 0;font-size:13px;color:#555">
        Trạng thái đăng ký hiện tại:
        <span style="font-weight:700;color:${needPayLater ? "#e65100" : "#2e7d32"}">
          ${needPayLater ? "Chưa chuyển khoản" : "Chờ xác nhận"}
        </span>
      </p>
    </div>

    <!-- Thông tin đăng ký -->
    <h3 style="color:#2e7d32;border-bottom:2px solid #e8f5e9;padding-bottom:8px">Thông tin đăng ký</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
      <tr><td style="padding:8px 0;color:#777;width:40%">Hình thức</td><td style="padding:8px 0;font-weight:600">${data.reg_type}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#777">Phương tiện</td><td style="padding:8px 4px;font-weight:600">${data.transport}${data.bus_departure ? ` (${data.bus_departure})` : ""}</td></tr>
      ${data.food_allergy ? `<tr><td style="padding:8px 0;color:#777">Dị ứng thực phẩm</td><td style="padding:8px 0">${data.food_allergy}</td></tr>` : ""}
      ${data.volunteer === "Có" ? `<tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#777">Cộng tác viên</td><td style="padding:8px 4px">${data.volunteer_teams.join(", ") || "Có"}</td></tr>` : ""}
      ${data.note ? `<tr><td style="padding:8px 0;color:#777">Ghi chú</td><td style="padding:8px 0;color:#555">${data.note}</td></tr>` : ""}
    </table>

    <!-- Bảng áo & cabin -->
    <h3 style="color:#2e7d32;border-bottom:2px solid #e8f5e9;padding-bottom:8px">Áo & Chỗ ngủ</h3>
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px">
      <thead>
        <tr style="background:#e8f5e9">
          <th style="padding:8px;border:1px solid #e0e0e0;text-align:left">Họ tên</th>
          <th style="padding:8px;border:1px solid #e0e0e0">Vai trò</th>
          <th style="padding:8px;border:1px solid #e0e0e0">Size áo</th>
          <th style="padding:8px;border:1px solid #e0e0e0">Màu áo</th>
          <th style="padding:8px;border:1px solid #e0e0e0">Cabin</th>
        </tr>
      </thead>
      <tbody>${participantRows}</tbody>
    </table>

    <!-- Chi phí -->
    <h3 style="color:#2e7d32;border-bottom:2px solid #e8f5e9;padding-bottom:8px">Tổng phí</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
      <tr><td style="padding:8px 0;color:#777">Phí sự kiện</td><td style="padding:8px 0;text-align:right">${fmtYen(data.fee_event)}</td></tr>
      ${data.fee_bus > 0 ? `<tr style="background:#f9f9f9"><td style="padding:8px 4px;color:#777">Phí xe bus${data.bus_departure ? ` từ ${data.bus_departure}` : ""}</td><td style="padding:8px 4px;text-align:right">${fmtYen(data.fee_bus)}</td></tr>` : ""}
      ${data.fee_product > 0 ? `<tr><td style="padding:8px 0;color:#777">Sản phẩm (${data.products})</td><td style="padding:8px 0;text-align:right">${fmtYen(data.fee_product)}</td></tr>` : ""}
      <tr style="border-top:2px solid #4caf50">
        <td style="padding:10px 0;font-weight:700;font-size:16px">Tổng cộng</td>
        <td style="padding:10px 0;text-align:right;font-weight:700;font-size:18px;color:#1b5e20">${fmtYen(grandTotal)}</td>
      </tr>
    </table>

    <!-- Thông tin chuyển khoản — chỉ hiện khi chuyển khoản sau -->
    ${
      needPayLater
        ? `
    <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin-bottom:20px">
      <h4 style="margin:0 0 12px;color:#e65100">💳 Thông tin chuyển khoản</h4>
      <ul style="margin:0;padding-left:18px;line-height:2;font-size:14px">
        <li><strong>Ngân hàng:</strong> 住信ＳＢＩネット銀行(0038) スミシン SBI 銀行 (Sumishin SBI netbank)</li>
        <li><strong>Số tài khoản:</strong> バナナ支店(107) / 口座番号 普通　7615757</li>
        <li><strong>Tên tài khoản:</strong> ＴＲＡＮ　ＶＡＮ　ＧＩＡＮＧ（トラン　ヴアンジヤン）</li>
        <li><strong>Nội dung CK:</strong>
          <span style="background:#fff3e0;color:#e65100;font-weight:700;padding:2px 8px;border-radius:4px;font-size:15px;letter-spacing:1px">
            TRAO2026-${data.code}
          </span>
        </li>
      </ul>
      <p style="margin:10px 0 0;font-size:12px;color:#e65100">
        ⚠️ Vui lòng nhập đúng nội dung chuyển khoản ở trên, KHÔNG dùng họ tên, để ban tổ chức xác nhận nhanh chóng.
      </p>
    </div>
    `
        : ""
    }

    <!-- Trạng thái chuyển khoản -->
    ${
      needPayLater
        ? `
    <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin-bottom:20px">
      <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#e65100">⏳ Bạn chưa chuyển khoản — vui lòng hoàn tất trong 24 giờ</p>
      <p style="margin:0 0 12px;font-size:13px;color:#555;line-height:1.7">
        Đăng ký của bạn đang ở trạng thái <strong>Chưa chuyển khoản</strong>. Vui lòng chuyển khoản theo thông tin trên và upload ảnh xác nhận trong vòng 24 giờ — sau đó đăng ký sẽ tự động hết hạn.
      </p>
      <p style="margin:0 0 12px;font-size:13px;color:#555;line-height:1.7">
        Để upload ảnh chuyển khoản, chỉnh sửa size áo và chỗ ngủ, truy cập trang tra cứu bằng mã và mật khẩu bên dưới:
      </p>
      <div style="background:#f0f7f0;border:1px solid #c8e6c9;border-radius:6px;padding:12px;text-align:center;margin-bottom:12px">
        <p style="margin:0 0 4px;font-size:13px;color:#555">Mã đăng ký: <strong style="font-size:18px;color:#1b5e20;letter-spacing:2px">${data.code}</strong></p>
        <p style="margin:0;font-size:13px;color:#555">Mật khẩu: <strong style="font-size:16px;letter-spacing:2px">${data.password}</strong></p>
      </div>
      <div style="text-align:center">
        <a href="https://banchanxanh.com/trao-2026-tra-cuu"
           style="display:inline-block;background:#e65100;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px">
          Hoàn tất chuyển khoản →
        </a>
      </div>
    </div>
    `
        : `
    <div style="background:#e8f5e9;border:1px solid #a5d6a7;border-radius:8px;padding:16px;margin-bottom:20px">
      <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#2e7d32">✅ Chuyển khoản đã được ghi nhận!</p>
      <p style="margin:0 0 12px;font-size:13px;color:#555;line-height:1.7">
        Muốn chỉnh sửa size áo hoặc chỗ ngủ? Dùng mã và mật khẩu để truy cập trang tra cứu:
      </p>
      <div style="background:#f0f7f0;border:1px solid #c8e6c9;border-radius:6px;padding:12px;text-align:center;margin-bottom:12px">
        <p style="margin:0 0 4px;font-size:13px;color:#555">Mã đăng ký: <strong style="font-size:18px;color:#1b5e20;letter-spacing:2px">${data.code}</strong></p>
        <p style="margin:0;font-size:13px;color:#555">Mật khẩu: <strong style="font-size:16px;letter-spacing:2px">${data.password}</strong></p>
      </div>
      <div style="text-align:center">
        <a href="https://banchanxanh.com/trao-2026-tra-cuu"
           style="display:inline-block;background:#2e7d32;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px">
          Chỉnh sửa áo và chỗ ngủ →
        </a>
      </div>
    </div>
    `
    }

    <!-- Thông tin chi tiết -->
    <div style="text-align:center;margin:16px 0">
      <a href="https://banchanxanh.com/trao-2026"
         style="display:inline-block;background:#e8f5e9;color:#1b5e20;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid #a5d6a7">
        Thông tin chi tiết về TRAO 2026
      </a>
    </div>

    <p style="color:#777;font-size:13px;line-height:1.6">
      Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ ban tổ chức:<br>
      💬 Fanpage: <a href="https://www.facebook.com/banchanxanhjp" style="color:#2e7d32">Bàn Chân Xanh</a>
    </p>
  </div>

  <!-- Footer -->
  <div style="background:#f5f5f5;padding:16px 24px;text-align:center;border-top:1px solid #e0e0e0">
    <p style="margin:0;color:#999;font-size:12px">
      © 2026 Bàn Chân Xanh · Email này được gửi tự động sau khi đăng ký thành công.
    </p>
  </div>
</div>
</body>
</html>`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const body = req.body;
  if (!body?.email || !body?.name) return res.status(400).json({ ok: false });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_EMAIL!,
        pass: process.env.GMAIL_APP_PASSWORD!,
      },
    });

    await transporter.sendMail({
      from: `"Bàn Chân Xanh - TRAO 2026" <${process.env.GOOGLE_EMAIL}>`,
      to: body.email,
      subject: `[TRAO 2026] Xác nhận đăng ký — Mã ${body.code}`,
      html: buildHtml(body),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Send mail error:", err);
    // Không throw để không làm hỏng flow đăng ký
    res.status(200).json({
      ok: false,
      warning: "Gửi email thất bại, đăng ký vẫn thành công.",
    });
  }
}
