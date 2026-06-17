import nodemailer from "nodemailer";

function fmtYen(n: number | string) {
  return Number(n).toLocaleString("ja-JP") + " ¥";
}

export type EmailData = {
  name: string;
  email: string;
  code: string;
  password: string;
  payment_timing: "now" | "later";
  transport: string;
  bus_departure: string;
  reg_type: string;
  count_adult: number;
  count_child: number;
  count_free: number;
  fee_event: number;
  fee_bus: number;
  fee_total: number;
  products: string;
  fee_product: number;
  donation: number;
  food_allergy: string;
  volunteer: string;
  volunteer_teams: string[];
  note: string;
  representative: {
    name: string;
    shirt_size: string;
    shirt_color: string;
    cabin: string;
  };
  members: Array<{
    name: string;
    shirt_size: string;
    shirt_color: string;
    cabin: string;
  }>;
};

function colorLabel(v: string) {
  return v === "white"
    ? "Trắng"
    : v === "green"
      ? "Xanh lá"
      : v === "yellow"
        ? "Vàng chanh"
        : v || "-";
}

function buildHtml(d: EmailData): string {
  const grandTotal = d.fee_total + d.fee_product + d.donation;
  const needPayLater = d.payment_timing === "later" && grandTotal > 0;
  const allParticipants = [
    {
      ...d.representative,
      role: d.reg_type === "Cá nhân" ? "Cá nhân" : "Đại diện",
    },
    ...d.members.map((m) => ({ ...m, role: "Thành viên" })),
  ];

  const rows = allParticipants
    .map(
      (p) => `<tr>
        <td style="padding:8px;border:1px solid #e0e0e0">${p.name}</td>
        <td style="padding:8px;border:1px solid #e0e0e0;text-align:center">${p.role}</td>
        <td style="padding:8px;border:1px solid #e0e0e0;text-align:center">${p.shirt_size || "-"}</td>
        <td style="padding:8px;border:1px solid #e0e0e0;text-align:center">${colorLabel(p.shirt_color)}</td>
        <td style="padding:8px;border:1px solid #e0e0e0;text-align:center">${p.cabin || "-"}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">

  <div style="background:#1b5e20;padding:28px 24px;text-align:center">
    <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px">BÀN CHÂN XANH</h1>
    <p style="color:#a5d6a7;margin:6px 0 0;font-size:14px">TRAO 2026 - Xác nhận đăng ký</p>
  </div>

  <div style="padding:28px 24px">
    <p style="font-size:16px;margin-top:0">Xin chào <strong>${d.name}</strong>,</p>
    <p style="color:#555;line-height:1.6">
      Ban tổ chức <strong>Bàn Chân Xanh</strong> đã nhận được thông tin đăng ký tham gia sự kiện
      <strong>TRAO 2026</strong> của bạn. Cảm ơn bạn đã đăng ký!
    </p>

    <!-- Mã đăng ký -->
    <div style="background:#f0f7f0;border:2px dashed #4caf50;border-radius:8px;padding:20px;margin:20px 0;text-align:center">
      <p style="margin:0 0 4px;color:#555;font-size:13px;text-transform:uppercase;letter-spacing:1px">Mã đăng ký của bạn</p>
      <p style="margin:0;font-size:32px;font-weight:900;color:#1b5e20;letter-spacing:4px">${d.code}</p>
      <p style="margin:8px 0 0;color:#777;font-size:13px">Mật khẩu: <strong style="letter-spacing:3px">${d.password}</strong></p>
      <p style="margin:8px 0 0;color:#555;font-size:12px">
        Mã đăng ký và mật khẩu dùng để đăng nhập khi tra cứu và chỉnh sửa thông tin
      </p>
      <p style="margin:12px 0 0;font-size:13px;color:#555">
        Trạng thái đăng ký hiện tại:
        <span style="font-weight:700;color:${needPayLater ? "#e65100" : "#2e7d32"}">
          ${needPayLater ? "Chưa chuyển khoản" : "Chờ xác nhận"}
        </span>
      </p>
    </div>

    <!-- Đăng ký -->
    <h3 style="color:#2e7d32;border-bottom:2px solid #e8f5e9;padding-bottom:8px">Thông tin đăng ký</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
      <tr><td style="padding:7px 0;color:#777;width:40%">Hình thức</td><td style="padding:7px 0;font-weight:600">${d.reg_type}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:7px 4px;color:#777">Phương tiện</td><td style="padding:7px 4px;font-weight:600">${d.transport}${d.bus_departure ? ` (${d.bus_departure})` : ""}</td></tr>
      ${d.food_allergy ? `<tr><td style="padding:7px 0;color:#777">Dị ứng thực phẩm</td><td style="padding:7px 0">${d.food_allergy}</td></tr>` : ""}
      ${d.volunteer === "Có" ? `<tr style="background:#f9f9f9"><td style="padding:7px 4px;color:#777">Cộng tác viên</td><td style="padding:7px 4px">${d.volunteer_teams.join(", ") || "Có"}</td></tr>` : ""}
      ${d.note ? `<tr><td style="padding:7px 0;color:#777">Ghi chú</td><td style="padding:7px 0;color:#555">${d.note}</td></tr>` : ""}
    </table>

    <!-- Áo & Cabin -->
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
      <tbody>${rows}</tbody>
    </table>

    <!-- Chi phí -->
    <h3 style="color:#2e7d32;border-bottom:2px solid #e8f5e9;padding-bottom:8px">Tổng phí</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
      ${d.count_adult > 0 ? `<tr><td style="padding:7px 0;color:#777">Người lớn / Trẻ trên 12 tuổi (${d.count_adult} người × 16,500 ¥)</td><td style="padding:7px 0;text-align:right">${fmtYen(d.count_adult * 16500)}</td></tr>` : ""}
      ${d.count_child > 0 ? `<tr style="background:#f9f9f9"><td style="padding:7px 4px;color:#777">Trẻ em 6–12 tuổi (${d.count_child} người × 8,000 ¥)</td><td style="padding:7px 4px;text-align:right">${fmtYen(d.count_child * 8000)}</td></tr>` : ""}
      ${d.count_free > 0 ? `<tr><td style="padding:7px 0;color:#777">Người khuyết tật / Trẻ dưới 6 tuổi (${d.count_free} người)</td><td style="padding:7px 0;text-align:right;color:#2e7d32;font-weight:600">Miễn phí</td></tr>` : ""}
      ${d.fee_bus > 0 ? `<tr style="background:#f9f9f9"><td style="padding:7px 4px;color:#777">Phí xe bus${d.bus_departure ? ` từ ${d.bus_departure}` : ""} (${d.count_adult + d.count_child + d.count_free} người × ${fmtYen(d.fee_bus / (d.count_adult + d.count_child + d.count_free))})</td><td style="padding:7px 4px;text-align:right">${fmtYen(d.fee_bus)}</td></tr>` : ""}
      ${d.fee_product > 0 ? `<tr><td style="padding:7px 0;color:#777">Sản phẩm (${d.products})</td><td style="padding:7px 0;text-align:right">${fmtYen(d.fee_product)}</td></tr>` : ""}
      ${d.donation > 0 ? `<tr style="background:#fff8e1"><td style="padding:7px 4px;color:#e65100">❤️ Quyên góp thiện nguyện</td><td style="padding:7px 4px;text-align:right;color:#e65100;font-weight:600">${fmtYen(d.donation)}</td></tr>` : ""}
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
      <p style="margin:4px 0;font-size:14px"><strong>Ngân hàng:</strong> 住信ＳＢＩネット銀行(0038) スミシン SBI 銀行 (Sumishin SBI netbank)</p>
      <p style="margin:4px 0;font-size:14px"><strong>Số tài khoản:</strong> バナナ支店(107) / 口座番号 普通　7615757</p>
      <p style="margin:4px 0;font-size:14px"><strong>Tên tài khoản:</strong> ＴＲＡＮ　ＶＡＮ　ＧＩＡＮＧ（トラン　ヴアンジヤン）</p>
      <p style="margin:4px 0;font-size:14px"><strong>Nội dung CK:</strong>
        <span style="background:#fff3e0;color:#e65100;font-weight:700;padding:2px 8px;border-radius:4px;font-size:15px;letter-spacing:1px">
          TRAO2026-${d.code}
        </span>
      </p>
      <p style="margin:10px 0 0;font-size:12px;color:#e65100">⚠️ Nhập đúng nội dung chuyển khoản ở trên - KHÔNG dùng họ tên - để ban tổ chức xác nhận nhanh chóng.</p>
    </div>
    `
        : ""
    }

    <!-- Trạng thái chuyển khoản -->
    ${
      needPayLater
        ? `
    <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin-bottom:20px">
      <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#e65100">⏳ Bạn chưa chuyển khoản - vui lòng hoàn tất trong 24 giờ</p>
      <p style="margin:0 0 12px;font-size:13px;color:#555;line-height:1.7">
        Đăng ký của bạn đang ở trạng thái <strong>Chưa chuyển khoản</strong>. Vui lòng chuyển khoản theo thông tin trên và upload ảnh xác nhận trong vòng 24 giờ - sau đó đăng ký sẽ tự động hết hạn.
      </p>
      <p style="margin:0 0 12px;font-size:13px;color:#555;line-height:1.7">
        Để upload ảnh chuyển khoản, chỉnh sửa size áo và chỗ ngủ, truy cập trang tra cứu bằng mã và mật khẩu bên dưới:
      </p>
      <div style="background:#f0f7f0;border:1px solid #c8e6c9;border-radius:6px;padding:12px;text-align:center;margin-bottom:12px">
        <p style="margin:0 0 4px;font-size:13px;color:#555">Mã đăng ký: <strong style="font-size:18px;color:#1b5e20;letter-spacing:2px">${d.code}</strong></p>
        <p style="margin:0;font-size:13px;color:#555">Mật khẩu: <strong style="font-size:16px;letter-spacing:2px">${d.password}</strong></p>
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
        <p style="margin:0 0 4px;font-size:13px;color:#555">Mã đăng ký: <strong style="font-size:18px;color:#1b5e20;letter-spacing:2px">${d.code}</strong></p>
        <p style="margin:0;font-size:13px;color:#555">Mật khẩu: <strong style="font-size:16px;letter-spacing:2px">${d.password}</strong></p>
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
      Thắc mắc liên hệ ban tổ chức:<br>
      💬 Fanpage: <a href="https://www.facebook.com/banchanxanhjp" style="color:#2e7d32">Bàn Chân Xanh</a>
    </p>
  </div>

  <div style="background:#f5f5f5;padding:16px 24px;text-align:center;border-top:1px solid #e0e0e0">
    <p style="margin:0;color:#999;font-size:12px">
      © 2026 Bàn Chân Xanh · Email này được gửi tự động sau khi đăng ký thành công.
    </p>
  </div>
</div>
</body>
</html>`;
}

export async function sendRegistrationEmail(data: EmailData): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL!,
      pass: process.env.GMAIL_APP_PASSWORD!,
    },
  });

  await transporter.sendMail({
    from: `"Bàn Chân Xanh - TRAO 2026" <${process.env.GOOGLE_EMAIL}>`,
    to: data.email,
    subject: `[TRAO 2026] Xác nhận đăng ký - Mã ${data.code}`,
    html: buildHtml(data),
  });
}
