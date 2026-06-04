import React, { Fragment } from "react";
import Image from "next/image";

const COLORS = [
  { value: "black", label: "Đen", hex: "#212121", textColor: "#fff" },
  { value: "white", label: "Trắng", hex: "#f5f5f5", textColor: "#212121", border: "#bdbdbd" },
  { value: "blue", label: "Xanh", hex: "#1565c0", textColor: "#fff" },
];

const SIZES = [
  { size: "S", chest: "88-92", length: "67", shoulder: "42" },
  { size: "M", chest: "92-96", length: "69", shoulder: "44" },
  { size: "L", chest: "96-102", length: "71", shoulder: "46" },
];

const ShirtPage: React.FC = () => (
  <Fragment>
    <section className="wpo-about-section-s2 section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <span style={{ color: "#4caf50", fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>
            Bàn Chân Xanh
          </span>
          <h2 className="mt-1">TRAO 2026 — Áo Sự Kiện</h2>
          <p className="text-muted">Thông tin chi tiết về size và màu áo. Vui lòng tham khảo trước khi chọn.</p>
        </div>

        {/* Màu áo */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <h4 className="fw-bold mb-4">Màu áo</h4>
            <div className="row g-4">
              {COLORS.map((c) => (
                <div className="col-md-4" key={c.value}>
                  <div className="rounded overflow-hidden shadow-sm h-100">
                    {/* Placeholder — thay bằng ảnh thật sau */}
                    <div
                      style={{
                        height: 280,
                        backgroundColor: c.hex,
                        border: c.border ? `1px solid ${c.border}` : undefined,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {/* Placeholder icon áo */}
                      <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                        <path
                          d="M20 20 L5 40 L20 45 L20 90 L80 90 L80 45 L95 40 L80 20 C75 30 65 35 50 35 C35 35 25 30 20 20Z"
                          fill={c.textColor}
                          fillOpacity="0.15"
                          stroke={c.textColor}
                          strokeOpacity="0.4"
                          strokeWidth="2"
                        />
                      </svg>
                      <span style={{ color: c.textColor, opacity: 0.6, fontSize: 13 }}>
                        [Ảnh màu {c.label} sẽ được cập nhật]
                      </span>
                    </div>
                    <div className="p-3 text-center" style={{ backgroundColor: "#fff" }}>
                      <div
                        className="d-inline-block rounded-circle mb-2"
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: c.hex,
                          border: c.border ? `1px solid ${c.border}` : "none",
                          verticalAlign: "middle",
                          marginRight: 8,
                        }}
                      />
                      <strong>{c.label}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bảng size */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <h4 className="fw-bold mb-4">Bảng size áo</h4>
            <div className="row g-4 align-items-start">
              {/* Placeholder hình đo */}
              <div className="col-md-5">
                <div
                  className="rounded d-flex align-items-center justify-content-center"
                  style={{
                    height: 320,
                    backgroundColor: "#f0f7f0",
                    border: "2px dashed #a5d6a7",
                    flexDirection: "column",
                    gap: 12,
                    color: "#888",
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <rect x="35" y="10" width="30" height="80" rx="4" stroke="#4caf50" strokeWidth="3" fill="#e8f5e9" />
                    <line x1="35" y1="30" x2="65" y2="30" stroke="#4caf50" strokeWidth="2" strokeDasharray="4 3" />
                    <line x1="35" y1="50" x2="65" y2="50" stroke="#4caf50" strokeWidth="2" strokeDasharray="4 3" />
                    <line x1="10" y1="30" x2="35" y2="30" stroke="#888" strokeWidth="1.5" markerEnd="url(#arr)" />
                    <text x="8" y="28" fontSize="10" fill="#555">Vai</text>
                    <text x="8" y="52" fontSize="10" fill="#555">Ngực</text>
                    <text x="68" y="55" fontSize="10" fill="#555">Dài</text>
                  </svg>
                  <span style={{ fontSize: 13, textAlign: "center", padding: "0 20px" }}>
                    [Hình minh hoạ cách đo sẽ được cập nhật]
                  </span>
                </div>
              </div>

              <div className="col-md-7">
                <div className="table-responsive">
                  <table className="table table-bordered text-center align-middle">
                    <thead style={{ backgroundColor: "#e8f5e9" }}>
                      <tr>
                        <th style={{ backgroundColor: "#2e7d32", color: "#fff" }}>Size</th>
                        <th>Vòng ngực (cm)</th>
                        <th>Chiều dài (cm)</th>
                        <th>Vai (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIZES.map((s) => (
                        <tr key={s.size}>
                          <td className="fw-bold" style={{ fontSize: 18, color: "#2e7d32" }}>{s.size}</td>
                          <td>{s.chest}</td>
                          <td>{s.length}</td>
                          <td>{s.shoulder}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-muted" style={{ fontSize: 13 }}>
                  * Số đo mang tính tham khảo, có thể chênh lệch ±2cm. Nếu bạn ở giữa 2 size, nên chọn size lớn hơn.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ghi chú */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="p-3 rounded"
              style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082", fontSize: 14 }}
            >
              <strong>Lưu ý:</strong>
              <ul className="mb-0 mt-2">
                <li>Áo sự kiện sẽ được phát tại địa điểm tổ chức vào ngày đầu tiên.</li>
                <li>Mỗi người tham gia nhận 1 áo, bao gồm cả trẻ em.</li>
                <li>Sau khi đăng ký, size và màu áo không thể thay đổi. Vui lòng cân nhắc kỹ.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default ShirtPage;
