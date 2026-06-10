import React, { Fragment } from "react";

// Layout giả định 4 hàng × 5 cabin — thay bằng sơ đồ thật sau
const GRID_ROWS = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

const CabinPage: React.FC = () => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <Fragment>
      <section className="wpo-about-section-s2 section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ color: "#4caf50", fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>
              Bàn Chân Xanh
            </span>
            <h2 className="mt-1">TRAO 2026 — Sơ Đồ Cabin Bãi Trại</h2>
            <p className="text-muted">
              Vị trí các cabin tại bãi trại. Vui lòng tham khảo trước khi chọn chỗ ngủ.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">

              {/* Placeholder ảnh sơ đồ thật */}
              <div
                className="rounded mb-4 d-flex align-items-center justify-content-center"
                style={{
                  height: 260,
                  backgroundColor: "#f0f7f0",
                  border: "2px dashed #a5d6a7",
                  flexDirection: "column",
                  gap: 10,
                  color: "#888",
                }}
              >
                <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
                  <rect x="5" y="5" width="90" height="90" rx="6" stroke="#4caf50" strokeWidth="2" fill="#e8f5e9" />
                  <path d="M5 40 Q50 15 95 40" stroke="#4caf50" strokeWidth="2" fill="none" />
                  <rect x="15" y="50" width="18" height="14" rx="2" fill="#a5d6a7" />
                  <rect x="41" y="50" width="18" height="14" rx="2" fill="#a5d6a7" />
                  <rect x="67" y="50" width="18" height="14" rx="2" fill="#a5d6a7" />
                  <rect x="15" y="70" width="18" height="14" rx="2" fill="#81c784" />
                  <rect x="41" y="70" width="18" height="14" rx="2" fill="#81c784" />
                  <rect x="67" y="70" width="18" height="14" rx="2" fill="#81c784" />
                </svg>
                <span style={{ fontSize: 13, textAlign: "center", padding: "0 24px" }}>
                  [Ảnh sơ đồ bãi trại thật sẽ được cập nhật tại đây]
                </span>
              </div>

              {/* Interactive cabin grid */}
              <h5 className="fw-bold mb-3">Sơ đồ cabin (minh hoạ)</h5>

              {/* Lối vào */}
              <div className="text-center mb-2">
                <span
                  className="badge"
                  style={{ backgroundColor: "#ff8f00", fontSize: 13, padding: "6px 20px" }}
                >
                  🚪 Lối vào bãi trại
                </span>
              </div>

              <div
                className="p-3 rounded mb-4"
                style={{ backgroundColor: "#fafafa", border: "1px solid #dee2e6" }}
              >
                {/* Khu vực chung giữa */}
                <div className="text-center mb-3">
                  <div
                    className="d-inline-block rounded px-4 py-2"
                    style={{ backgroundColor: "#e8f5e9", border: "1px dashed #4caf50", fontSize: 13, color: "#2e7d32" }}
                  >
                    🏕️ Khu vực sinh hoạt chung / Bếp / Lửa trại
                  </div>
                </div>

                {GRID_ROWS.map((row, ri) => (
                  <div key={ri} className="d-flex justify-content-center gap-2 mb-2">
                    {row.map((n) => (
                      <div
                        key={n}
                        onMouseEnter={() => setHovered(n)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 8,
                          backgroundColor: hovered === n ? "#2e7d32" : "#c8e6c9",
                          border: "2px solid #4caf50",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "default",
                          transition: "all 0.15s",
                          color: hovered === n ? "#fff" : "#1b5e20",
                        }}
                      >
                        <span style={{ fontSize: 10, opacity: 0.8 }}>Cabin</span>
                        <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{n}</span>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="d-flex justify-content-center gap-3 mt-3" style={{ fontSize: 12, color: "#888" }}>
                  <span>⬆️ Hướng Bắc</span>
                  <span>🌲 Rừng thông</span>
                  <span>🏞️ Suối</span>
                </div>
              </div>

              {/* Chú thích */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="p-3 rounded h-100" style={{ backgroundColor: "#f0f7f0", border: "1px solid #a5d6a7" }}>
                    <h6 className="fw-bold mb-2">Thông tin cabin</h6>
                    <ul className="mb-0" style={{ fontSize: 14, lineHeight: 2 }}>
                      <li>Mỗi cabin có sức chứa tối đa <strong>4 người</strong></li>
                      <li>Có giường tầng và chăn gối cơ bản</li>
                      <li>Cabin 1–10: gần khu vực chung</li>
                      <li>Cabin 11–20: gần suối, yên tĩnh hơn</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded h-100" style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082" }}>
                    <h6 className="fw-bold mb-2">Lưu ý khi chọn cabin</h6>
                    <ul className="mb-0" style={{ fontSize: 14, lineHeight: 2 }}>
                      <li>Nhiều người cùng nhóm nên chọn cabin số liên tiếp</li>
                      <li>Cabin được phân theo thứ tự đăng ký</li>
                      <li>Ban tổ chức có thể điều phối lại nếu cần</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-muted text-center" style={{ fontSize: 12 }}>
                Sơ đồ này mang tính minh hoạ. Sơ đồ chính thức sẽ được cập nhật trước sự kiện.<br />
                Liên hệ: <a href="https://www.facebook.com/banchanxanhjp" target="_blank" rel="noopener noreferrer">Fanpage Bàn Chân Xanh</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CabinPage;
