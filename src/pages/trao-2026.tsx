import React, { Fragment } from "react";
import Image from "next/image";

/* ── CSS animations ──────────────────────────────────────────────────────────── */
/* ── Cấu hình từng đèn trời ────────────────────────────────────────────────── */
const SKY_LANTERNS = [
  { left: "6%", delay: "0s", dur: "7s", size: 32, rotate: -4 },
  { left: "16%", delay: "1.4s", dur: "9s", size: 24, rotate: 3 },
  { left: "27%", delay: "0.6s", dur: "8s", size: 28, rotate: -2 },
  { left: "38%", delay: "2.8s", dur: "6.5s", size: 36, rotate: 5 },
  { left: "50%", delay: "0.2s", dur: "10s", size: 22, rotate: -3 },
  { left: "61%", delay: "1.9s", dur: "7.5s", size: 30, rotate: 4 },
  { left: "72%", delay: "3.5s", dur: "8.5s", size: 26, rotate: -5 },
  { left: "82%", delay: "1.1s", dur: "9.5s", size: 20, rotate: 2 },
  { left: "91%", delay: "2.3s", dur: "7s", size: 34, rotate: -4 },
];

const STARS_BG = [
  { left: "4%", top: "18%", size: 8 },
  { left: "11%", top: "42%", size: 6 },
  { left: "19%", top: "8%", size: 10 },
  { left: "28%", top: "55%", size: 7 },
  { left: "35%", top: "22%", size: 9 },
  { left: "44%", top: "70%", size: 6 },
  { left: "52%", top: "13%", size: 8 },
  { left: "60%", top: "48%", size: 7 },
  { left: "68%", top: "30%", size: 10 },
  { left: "76%", top: "62%", size: 6 },
  { left: "84%", top: "15%", size: 9 },
  { left: "92%", top: "40%", size: 7 },
];

const midAutumnStyles = `
  @keyframes denSway {
    0%, 100% { transform: rotate(-7deg); }
    50%       { transform: rotate(7deg); }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.25; transform: scale(0.65); }
  }
  @keyframes moonGlow {
    0%, 100% { box-shadow: 0 0 24px 8px rgba(255,213,79,.45), 0 0 60px 20px rgba(255,183,0,.15); }
    50%       { box-shadow: 0 0 44px 18px rgba(255,213,79,.75), 0 0 90px 32px rgba(255,183,0,.30); }
  }
  @keyframes floatBounce {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-9px); }
    100% { transform: translateY(0px); }
  }
  @keyframes banhGlow {
    0%, 100% { filter: drop-shadow(0 0 3px rgba(230,81,0,.4)); }
    50%       { filter: drop-shadow(0 0 9px rgba(230,81,0,.8)); }
  }
  .den-sway  { animation: denSway 3.2s ease-in-out infinite; display: inline-block; transform-origin: top center; }
  .den-sway2 { animation: denSway 4.5s ease-in-out infinite reverse; display: inline-block; transform-origin: top center; }
  .star-twinkle  { animation: starTwinkle 1.9s ease-in-out infinite; display: inline-block; }
  .star-twinkle2 { animation: starTwinkle 2.6s ease-in-out infinite 0.7s; display: inline-block; }
  .star-twinkle3 { animation: starTwinkle 2.2s ease-in-out infinite 1.3s; display: inline-block; }
  .moon-glow  { animation: moonGlow 3.5s ease-in-out infinite; }
  .float-moon { animation: floatBounce 4s ease-in-out infinite; display: inline-block; }
  .banh-glow  { animation: banhGlow 2.5s ease-in-out infinite; display: inline-block; }

  @keyframes riseLantern {
    0%   { transform: translateY(0px) rotate(var(--r,-3deg));  opacity: 0; }
    8%   { opacity: 0.9; }
    88%  { opacity: 0.75; }
    100% { transform: translateY(-340px) rotate(calc(var(--r,-3deg) * -1)); opacity: 0; }
  }
  @keyframes sway {
    0%, 100% { margin-left: 0; }
    50%       { margin-left: 12px; }
  }
  .sky-lantern {
    position: absolute;
    bottom: 0;
    animation: riseLantern var(--dur,8s) ease-in var(--delay,0s) infinite;
    filter: drop-shadow(0 0 8px rgba(255,180,0,.7));
  }
  .sky-star { animation: starTwinkle var(--ts,2s) ease-in-out var(--td,0s) infinite; }
`;

/* ── Đèn Ông Sao SVG ─────────────────────────────────────────────────────────
   Đèn ngôi sao 5 cánh truyền thống của Trung Thu Việt Nam
   Star polygon: outer r=14 at (16,16), inner r=6
   Points (outer/inner alternating, start top):
     Outer: 16,2  29,12  24,27  8,27  3,12
     Inner: 20,11  22,18  16,22  10,18  12,11
*/
const DenOngSao: React.FC<{
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}> = ({ size = 32, style, className }) => (
  <svg
    width={size}
    height={Math.round(size * 1.42)}
    viewBox="0 0 32 46"
    style={{ display: "inline-block", verticalAlign: "middle", ...style }}
    className={className}
    aria-label="Đèn ông sao"
  >
    {/* Hào quang sau ngôi sao */}
    <polygon
      points="16,2 20,11 29,12 22,18 24,27 16,22 8,27 10,18 3,12 12,11"
      fill="#ffe082"
      opacity="0.55"
      style={{ filter: "blur(2.5px)" }}
    />
    {/* Thân ngôi sao — vàng cam, viền đỏ (màu cờ VN) */}
    <polygon
      points="16,2 20,11 29,12 22,18 24,27 16,22 8,27 10,18 3,12 12,11"
      fill="#f9a825"
      stroke="#c62828"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    {/* Ánh nến bên trong */}
    <circle cx="16" cy="15" r="4.5" fill="#fff176" opacity="0.9" />
    {/* Cán (que cầm) */}
    <line
      x1="16"
      y1="27"
      x2="16"
      y2="44"
      stroke="#5d4037"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Sợi dây trên đỉnh */}
    <line
      x1="16"
      y1="2"
      x2="16"
      y2="-2"
      stroke="#5d4037"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Đèn Trời SVG ────────────────────────────────────────────────────────────
   Đèn trời (sky lantern) hình bầu dục với ngọn lửa bên dưới
*/
const DenTroi: React.FC<{ size?: number; warm?: boolean }> = ({
  size = 28,
  warm = true,
}) => {
  const h = Math.round(size * 1.6);
  const cx = size / 2;
  const rx = size / 2 - 1;
  const bodyH = Math.round(size * 0.95);
  const cy = bodyH / 2 + 2;
  const ry = bodyH / 2;
  const flameY = cy + ry;
  const flameH = Math.round(size * 0.28);
  const color1 = warm ? "#ff8f00" : "#ffa726";
  const color2 = warm ? "#ffe082" : "#fff9c4";
  return (
    <svg
      width={size}
      height={h}
      viewBox={`0 0 ${size} ${h}`}
      style={{ display: "block" }}
    >
      {/* Hào quang */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="#ffb300"
        opacity="0.25"
        style={{ filter: "blur(3px)" }}
      />
      {/* Thân đèn — hình bầu dục */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color1} opacity="0.92" />
      {/* Nan ngang + dọc */}
      <line
        x1={cx - rx + 2}
        y1={cy}
        x2={cx + rx - 2}
        y2={cy}
        stroke="#e65100"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <line
        x1={cx}
        y1={cy - ry + 3}
        x2={cx}
        y2={cy + ry - 3}
        stroke="#e65100"
        strokeWidth="0.7"
        opacity="0.55"
      />
      {/* Miệng dưới */}
      <ellipse
        cx={cx}
        cy={cy + ry - 1}
        rx={Math.round(rx * 0.45)}
        ry={Math.round(ry * 0.14)}
        fill="none"
        stroke="#bf360c"
        strokeWidth="1"
      />
      {/* Ngọn lửa */}
      <ellipse
        cx={cx}
        cy={flameY + flameH * 0.5}
        rx={Math.round(size * 0.14)}
        ry={flameH * 0.6}
        fill="#ffee58"
        opacity="0.95"
      />
      <ellipse
        cx={cx}
        cy={flameY + flameH * 0.45}
        rx={Math.round(size * 0.07)}
        ry={flameH * 0.4}
        fill={color2}
        opacity="0.9"
      />
      {/* Dây treo */}
      <line
        x1={cx - 4}
        y1={cy - ry + 1}
        x2={cx - 4}
        y2={cy - ry - 4}
        stroke="#8d6e63"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <line
        x1={cx + 4}
        y1={cy - ry + 1}
        x2={cx + 4}
        y2={cy - ry - 4}
        stroke="#8d6e63"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
};

/* ── Accordion ───────────────────────────────────────────────────────────────── */
const AccordionItem: React.FC<{
  title: string;
  emoji: string;
  danger?: boolean;
  children: React.ReactNode;
}> = ({ title, emoji, danger, children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="rounded mb-3 overflow-hidden"
      style={{ border: `1px solid ${danger ? "#ffcdd2" : "#a5d6a7"}` }}
    >
      <button
        type="button"
        className="w-100 d-flex align-items-center justify-content-between px-4 py-3"
        onClick={() => setOpen((v) => !v)}
        style={{
          background: danger ? "#fff8f8" : "#f0f7f0",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 15,
          color: danger ? "#c62828" : "#1b5e20",
          textAlign: "left",
        }}
      >
        <span>
          {emoji} {title}
        </span>
        <span style={{ fontSize: 18, lineHeight: 1 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="p-3" style={{ backgroundColor: "#fff" }}>
          {children}
        </div>
      )}
    </div>
  );
};

/* ── InfoBadge ───────────────────────────────────────────────────────────────── */
const InfoBadge: React.FC<{
  icon: string;
  label: string;
  value: React.ReactNode;
}> = ({ icon, label, value }) => (
  <div
    className="d-flex align-items-start gap-3 p-3 rounded"
    style={{ backgroundColor: "#f0f7f0", border: "1px solid #c8e6c9" }}
  >
    <div
      style={{ fontSize: 24, lineHeight: 1, minWidth: 32, textAlign: "center" }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#1b5e20" }}>
        {value}
      </div>
    </div>
  </div>
);

/* ── Page ────────────────────────────────────────────────────────────────────── */
const Trao2026Page: React.FC = () => {
  return (
    <Fragment>
      <style>{midAutumnStyles}</style>

      {/* ── Banner Trung Thu ─────────────────────────────────────────── */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#7b1fa2 0%,#b71c1c 25%,#e65100 55%,#f57f17 75%,#e65100 90%,#b71c1c 100%)",
          padding: "10px 16px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ngôi sao nhỏ nhấp nháy nền */}
        {[
          ["8%", 4],
          ["20%", 6],
          ["38%", 3],
          ["60%", 7],
          ["78%", 4],
          ["92%", 6],
        ].map(([left, top], i) => (
          <span
            key={i}
            className={i % 2 === 0 ? "star-twinkle" : "star-twinkle2"}
            style={{
              position: "absolute",
              top: Number(top),
              left: String(left),
              fontSize: 8,
              color: "#ffe082",
              lineHeight: 1,
            }}
          >
            ✦
          </span>
        ))}
        <DenOngSao size={22} className="den-sway" style={{ marginRight: 10 }} />
        <span
          style={{
            color: "#ffe082",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          ✦ TRAO 2026 · Đêm Hội Trung Thu ✦
        </span>
        <DenOngSao size={22} className="den-sway2" style={{ marginLeft: 10 }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#f0f7f0",
          borderBottom: "1px solid #c8e6c9",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-4">
            {/* Ảnh */}
            <div className="col-lg-5 col-md-6 col-12 text-center">
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  maxWidth: 420,
                  width: "100%",
                }}
              >
                {/* Đèn ông sao trái */}
                <DenOngSao
                  size={38}
                  className="den-sway"
                  style={{ position: "absolute", top: -24, left: 8, zIndex: 2 }}
                />
                {/* Đèn ông sao phải */}
                <DenOngSao
                  size={30}
                  className="den-sway2"
                  style={{
                    position: "absolute",
                    top: 20,
                    right: -16,
                    zIndex: 2,
                  }}
                />
                {/* Mặt trăng — Chị Hằng & Chú Cuội trên cung trăng */}
                <span
                  className="float-moon"
                  style={{
                    position: "absolute",
                    top: -26,
                    right: 18,
                    zIndex: 2,
                    fontSize: 38,
                    lineHeight: 1,
                  }}
                >
                  🌕
                </span>
                {/* Bánh trung thu */}
                <span
                  className="banh-glow"
                  style={{
                    position: "absolute",
                    bottom: 50,
                    left: -16,
                    fontSize: 34,
                    zIndex: 2,
                  }}
                >
                  🥮
                </span>
                {/* Ngôi sao nhỏ */}
                <span
                  className="star-twinkle"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: "48%",
                    fontSize: 14,
                    color: "#f57f17",
                    zIndex: 2,
                  }}
                >
                  ✦
                </span>

                <div
                  className="rounded-4 overflow-hidden shadow moon-glow"
                  style={{ border: "3px solid #ffcc02" }}
                >
                  <Image
                    src="/assets/images/trao-2026/trao-2026-poster.png"
                    width={420}
                    height={520}
                    alt="TRAO 2026"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* Nội dung */}
            <div className="col-lg-7 col-md-6 col-12">
              <span
                style={{
                  color: "#4caf50",
                  fontWeight: 600,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                }}
              >
                Bàn Chân Xanh
              </span>

              <h1
                className="mt-1 mb-2 fw-bold"
                style={{ color: "#1b5e20", fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                TRAO 2026
              </h1>

              <p
                className="fw-semibold mb-2"
                style={{ color: "#2e7d32", fontSize: 16 }}
              >
                SỰ KIỆN HỘI NGỘ LỚN NHẤT TRONG NĂM DO BÀN CHÂN XANH TỔ CHỨC
              </p>

              {/* Badge chủ đề */}
              <div
                className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill"
                style={{
                  background: "linear-gradient(90deg,#b71c1c,#e65100)",
                  color: "#fff",
                }}
              >
                <DenOngSao size={18} className="den-sway" />
                <span
                  style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}
                >
                  Chủ đề: Đêm Hội Trung Thu
                </span>
                <span
                  className="float-moon"
                  style={{ fontSize: 16, lineHeight: 1 }}
                >
                  🌕
                </span>
              </div>

              <p
                className="text-muted mb-4"
                style={{ fontSize: 14, lineHeight: 1.8 }}
              >
                Là nơi hội ngộ của những người yêu thích thể thao và thiên
                nhiên, của cả những thành viên hướng nội, hướng ngoại và đơn
                giản là những người muốn tìm kiếm sự cho đi và kết nối.
              </p>

              {/* Info badges */}
              <div className="row g-2 mb-4">
                <div className="col-12 col-sm-6">
                  <InfoBadge
                    icon="📅"
                    label="Ngày tổ chức"
                    value="22–23 tháng 8, 2026"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <InfoBadge
                    icon="📍"
                    label="Địa điểm"
                    value={
                      <a
                        href="https://maps.app.goo.gl/buEkmzw6bqzeribeA"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#2e7d32" }}
                      >
                        Kobu Camp Village →
                      </a>
                    }
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <InfoBadge
                    icon="🏕️"
                    label="Đơn vị tổ chức"
                    value="Bàn Chân Xanh"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <InfoBadge
                    icon="💬"
                    label="Liên hệ"
                    value={
                      <a
                        href="https://www.facebook.com/banchanxanhjp"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#2e7d32" }}
                      >
                        Fanpage Bàn Chân Xanh →
                      </a>
                    }
                  />
                </div>
              </div>

              {/* CTA */}
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <a
                  href="/trao-2026-form-dang-ky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg px-4"
                  style={{
                    backgroundColor: "#2e7d32",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  Đăng ký tham gia →
                </a>
                <a
                  href="/trao-2026-tra-cuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 14, color: "#2e7d32", fontWeight: 600 }}
                >
                  Tra cứu thông tin đăng ký ↗
                </a>
              </div>

              {/* ── Gây quỹ thiện nguyện ─────────────────────────────────────── */}
              <div
                className="mt-4 rounded-3 p-4"
                style={{
                  backgroundColor: "#fff8e1",
                  border: "1px solid #ffe082",
                }}
              >
                <div className="d-flex align-items-start gap-3">
                  <div
                    style={{
                      fontSize: 36,
                      lineHeight: 1,
                      minWidth: 44,
                      paddingTop: 2,
                    }}
                  >
                    ❤️
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="fw-bold mb-2" style={{ color: "#b71c1c" }}>
                      TRAO — Hoạt động gây quỹ thiện nguyện
                    </h5>
                    <p
                      className="mb-2"
                      style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}
                    >
                      TRAO không chỉ là sự kiện hội ngộ — đây còn là dịp để cộng
                      đồng <strong>Bàn Chân Xanh</strong> cùng nhau gây quỹ hỗ
                      trợ các hoạt động thiện nguyện trong năm: trao học bổng
                      cho trẻ em vùng khó khăn, xây trường, hỗ trợ đồng bào tại
                      Việt Nam.
                    </p>
                    <p
                      className="mb-3"
                      style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}
                    >
                      Một phần lệ phí tham gia sẽ được dùng cho quỹ thiện
                      nguyện. Ngoài ra, bạn có thể{" "}
                      <strong>quyên góp thêm tùy tâm</strong> ngay trong form
                      đăng ký hoặc tại sự kiện. Mọi khoản đóng góp đều được sử
                      dụng minh bạch và thông báo sau sự kiện.
                    </p>
                    <div
                      className="d-flex align-items-start gap-2 px-3 py-2 rounded-2"
                      style={{
                        backgroundColor: "#fff3e0",
                        border: "1px solid #ffcc80",
                      }}
                    >
                      <span style={{ fontSize: 16, lineHeight: 1.6 }}>🛍️</span>
                      <p
                        className="mb-0"
                        style={{
                          fontSize: 13,
                          color: "#e65100",
                          lineHeight: 1.7,
                        }}
                      >
                        Chúng mình sẽ tổ chức workshop vẽ áo, túi và bán thêm
                        các đồ gây quỹ tại sự kiện. Vui lòng mang theo{" "}
                        <strong>tiền mặt</strong> để ủng hộ nhé!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider Trung Thu ────────────────────────────────────────── */}
      <div
        style={{
          textAlign: "center",
          padding: "12px 0",
          background: "linear-gradient(90deg,#fff8f0,#fff3e0,#fff8f0)",
          borderTop: "1px solid #ffe0b2",
          borderBottom: "1px solid #ffe0b2",
          lineHeight: 1,
        }}
      >
        <span
          className="star-twinkle"
          style={{ fontSize: 11, color: "#f57f17", margin: "0 8px" }}
        >
          ✦
        </span>
        <DenOngSao
          size={22}
          className="den-sway2"
          style={{ margin: "0 4px" }}
        />
        <span
          className="star-twinkle2"
          style={{ fontSize: 10, color: "#ffb300", margin: "0 6px" }}
        >
          ★
        </span>
        <span className="banh-glow" style={{ fontSize: 28, margin: "0 4px" }}>
          🥮
        </span>
        <span
          className="star-twinkle3"
          style={{ fontSize: 10, color: "#ffb300", margin: "0 6px" }}
        >
          ★
        </span>
        <span className="float-moon" style={{ fontSize: 22, margin: "0 4px" }}>
          🌕
        </span>
        <span
          className="star-twinkle"
          style={{ fontSize: 10, color: "#ffb300", margin: "0 6px" }}
        >
          ★
        </span>
        <span className="banh-glow" style={{ fontSize: 28, margin: "0 4px" }}>
          🥮
        </span>
        <span
          className="star-twinkle2"
          style={{ fontSize: 10, color: "#ffb300", margin: "0 6px" }}
        >
          ★
        </span>
        <DenOngSao size={22} className="den-sway" style={{ margin: "0 4px" }} />
        <span
          className="star-twinkle3"
          style={{ fontSize: 11, color: "#f57f17", margin: "0 8px" }}
        >
          ✦
        </span>
      </div>

      {/* ── Thông tin & Tài liệu ─────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <span
              style={{
                color: "#4caf50",
                fontWeight: 600,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Tài liệu sự kiện
            </span>
            <h3 className="mt-1 fw-bold" style={{ color: "#1b5e20" }}>
              Thông tin chi tiết
            </h3>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <AccordionItem
                title="Nội Quy Bãi Trại (Quan Trọng)"
                emoji="📋"
                danger
              >
                <div className="text-center">
                  <Image
                    src="/assets/images/trao-2026/trao-2026-quy-tac.png"
                    width={800}
                    height={400}
                    alt="Nội quy bãi trại"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </AccordionItem>

              <AccordionItem title="Lịch Trình Sự Kiện" emoji="🗓️">
                <div className="text-center">
                  <Image
                    src="/assets/images/trao-2026/trao-2026-lich-trinh.png"
                    width={800}
                    height={400}
                    alt="Lịch trình sự kiện"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: 8,
                    }}
                  />
                </div>
              </AccordionItem>

              <AccordionItem title="Sơ Đồ Bãi Trại" emoji="🗺️">
                <div className="text-center">
                  <Image
                    src="/images/trao-2026/trao-2026-map.png"
                    width={800}
                    height={566}
                    alt="Sơ đồ bãi trại"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: 8,
                    }}
                  />
                </div>
                <p className="text-center mt-2 mb-0">
                  <a
                    href="/trao-2026-cabin"
                    target="_blank"
                    style={{ fontSize: 13, color: "#2e7d32" }}
                  >
                    🏕️ Xem chi tiết danh sách cabin & tình trạng đăng ký →
                  </a>
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      {/* ── Thả Đèn Trời ─────────────────────────────────────────────── */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #0d1b3e 0%, #1a237e 45%, #283593 75%, #1a237e 100%)",
          position: "relative",
          overflow: "hidden",
          minHeight: 320,
          paddingTop: 60,
          paddingBottom: 48,
        }}
      >
        {/* Sao đêm nền */}
        {STARS_BG.map((s, i) => (
          <span
            key={i}
            className="sky-star"
            style={{
              position: "absolute",
              left: s.left,
              top: s.top,
              fontSize: s.size,
              color: "#fff9c4",
              lineHeight: 1,
              ["--ts" as string]: `${1.5 + (i % 4) * 0.4}s`,
              ["--td" as string]: `${(i * 0.35) % 1.6}s`,
            }}
          >
            ✦
          </span>
        ))}
        {/* Trăng rằm góc phải */}
        <div
          className="float-moon"
          style={{
            position: "absolute",
            top: 18,
            right: "7%",
            fontSize: 64,
            lineHeight: 1,
            filter: "drop-shadow(0 0 18px rgba(255,236,64,.55))",
            zIndex: 2,
          }}
        >
          🌕
        </div>

        {/* Đèn trời bay lên */}
        {SKY_LANTERNS.map((l, i) => (
          <div
            key={i}
            className="sky-lantern"
            style={{
              left: l.left,
              ["--dur" as string]: l.dur,
              ["--delay" as string]: l.delay,
              ["--r" as string]: `${l.rotate}deg`,
              zIndex: 3,
            }}
          >
            <DenTroi size={l.size} warm={i % 2 === 0} />
          </div>
        ))}

        {/* Nội dung trung tâm */}
        <div className="container" style={{ position: "relative", zIndex: 4 }}>
          <div className="text-center">
            <p
              style={{
                color: "#ffe082",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              ✦ Trung Thu 2026 ✦
            </p>
            <h2
              className="fw-bold mb-3"
              style={{
                color: "#fff9c4",
                fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                textShadow: "0 2px 12px rgba(0,0,0,.5)",
              }}
            >
              Cùng nhau thả đèn trời
            </h2>
            <p
              style={{
                color: "#e3f2fd",
                fontSize: 14,
                lineHeight: 1.9,
                maxWidth: 520,
                margin: "0 auto 28px",
                textShadow: "0 1px 4px rgba(0,0,0,.4)",
              }}
            >
              Mỗi chiếc đèn trời là một ước nguyện — gửi lên bầu trời đêm Trung
              Thu cùng những người bạn đồng hành. Hãy đến với TRAO 2026 và cùng
              nhau thả đèn, ngắm trăng, và chia sẻ những khoảnh khắc đáng nhớ.
            </p>
            <a
              href="/trao-2026-form-dang-ky"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg px-5"
              style={{
                background: "linear-gradient(90deg,#ff8f00,#f57f17)",
                color: "#fff",
                border: "none",
                borderRadius: 30,
                fontWeight: 700,
                fontSize: 15,
                boxShadow: "0 4px 20px rgba(255,143,0,.45)",
              }}
            >
              Đăng ký tham gia →
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Trao2026Page;
