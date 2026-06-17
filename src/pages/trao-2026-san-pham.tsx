import React, { Fragment } from "react";
import Image from "next/image";

const PRODUCTS = [
  {
    key: "khan_ran",
    label: "Khăn Rằn",
    price: 800,
    img: "/assets/images/trao-2026/trao-2026-san-pham-khan-ran.png",
    desc: "Khăn rằn truyền thống Nam Bộ, họa tiết ca-rô đặc trưng đen trắng có thêu logo Bàn Chân Xanh. Chất liệu cotton mềm mại, thấm hút tốt, đa năng, có thể dùng làm khăn quàng cổ, bandana, che nắng và thấm mồ hôi khi leo núi hoặc phụ kiện thời trang hàng ngày.",
    detail: [
      "Chất liệu: Cotton 100%",
      "Kích thước: 80 × 80 cm",
      "Màu sắc: Đen trắng ca-rô truyền thống",
    ],
    note: "😄 Mẹo nhỏ: Đeo khăn rằn khi leo núi giúp đồng đội nhận ra bạn từ xa - kể cả khi bạn đang thở dốc và không còn sức vẫy tay!",
  },
  {
    key: "khan_tho_cam",
    label: "Khăn Thổ Cẩm",
    price: 1300,
    img: "/assets/images/trao-2026/trao-2026-san-pham-khan-tho-cam.jpg",
    desc: "Khăn thổ cẩm dệt tay thủ công, hoa văn truyền thống của đồng bào dân tộc thiểu số Việt Nam có thêu chữ Bàn Chân Xanh. Mỗi chiếc khăn là một tác phẩm thủ công độc đáo, mang đậm bản sắc văn hóa.",
    detail: [
      "Chất liệu: Sợi tơ tằm & cotton",
      "Dệt tay thủ công",
      "Hoa văn: Thổ cẩm truyền thống",
    ],
  },
  {
    key: "tui_to_te",
    label: "Túi Tò Te",
    price: 1200,
    img: "/assets/images/trao-2026/trao-2026-san-pham-tui-vai.png",
    desc: "Túi vải canvas kèm logo của Bàn Chân Xanh. Thiết kế tiện dụng, bền đẹp - phù hợp đi chợ, đi học, đi cà phê hàng ngày và dã ngoại. Vừa thời trang vừa thân thiện môi trường. Có kèm ngăn nhỏ để bỏ những món đồ dễ trầy xước hoặc đồ nhỏ khó tìm.",
    detail: [
      "Chất liệu: Canvas cotton dày dặn",
      "Kích thước: 36 × 40 cm, quai túi 60 cm",
    ],
    workshop:
      "🎨 Workshop vẽ túi bằng màu Acrylic: Bạn sẽ được tự tay vẽ lên chiếc túi của mình bằng màu acrylic ngay tại sự kiện! Không cần kinh nghiệm - chỉ cần sự sáng tạo và tình yêu nghệ thuật.",
  },
];

function fmtYen(n: number) {
  return n.toLocaleString("ja-JP") + " ¥";
}

const SanPhamPage: React.FC = () => (
  <Fragment>
    <section className="wpo-about-section-s2 section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <span
            style={{
              color: "#4caf50",
              fontWeight: 600,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Bàn Chân Xanh
          </span>
          <h2 className="mt-1">TRAO 2026 — Sản phẩm gây quỹ</h2>
          <p className="text-muted" style={{ maxWidth: 600, margin: "0 auto" }}>
            Mỗi sản phẩm bạn mua là một đóng góp thiết thực cho quỹ thiện nguyện
            của Bàn Chân Xanh — hỗ trợ trẻ em vùng khó khăn và các hoạt động
            cộng đồng tại Việt Nam.
          </p>
        </div>

        <div className="row g-4 justify-content-center mb-5">
          {PRODUCTS.map((p) => (
            <div className="col-12 col-md-4" key={p.key}>
              <div
                className="h-100 rounded-3 overflow-hidden"
                style={{
                  border: "1px solid #a5d6a7",
                  boxShadow: "0 2px 8px rgba(0,0,0,.07)",
                }}
              >
                <div
                  style={{ position: "relative", backgroundColor: "#f9f9f9" }}
                >
                  <Image
                    src={p.img}
                    alt={p.label}
                    width={480}
                    height={480}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <div className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="fw-bold mb-0" style={{ color: "#1b5e20" }}>
                      {p.label}
                    </h5>
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: 18,
                        color: "#e65100",
                        backgroundColor: "#fff3e0",
                        border: "1px solid #ffcc80",
                        borderRadius: 6,
                        padding: "2px 10px",
                      }}
                    >
                      {fmtYen(p.price)}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
                    {p.desc}
                  </p>
                  <ul
                    className="mb-0 ps-3"
                    style={{ fontSize: 13, color: "#777", lineHeight: 2 }}
                  >
                    {p.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  {"note" in p && p.note && (
                    <div
                      className="mt-3 p-3 rounded-2"
                      style={{
                        backgroundColor: "#e8f5e9",
                        border: "1px solid #a5d6a7",
                        fontSize: 13,
                        color: "#2e7d32",
                        lineHeight: 1.8,
                      }}
                    >
                      {p.note}
                    </div>
                  )}
                  {"workshop" in p && p.workshop && (
                    <div
                      className="mt-3 p-3 rounded-2"
                      style={{
                        backgroundColor: "#f3e5f5",
                        border: "1px solid #ce93d8",
                        fontSize: 13,
                        color: "#4a148c",
                        lineHeight: 1.8,
                      }}
                    >
                      {p.workshop}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ghi chú */}
        <div
          className="rounded-3 p-4 mb-4"
          style={{
            backgroundColor: "#fff8e1",
            border: "1px solid #ffe082",
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          <h6 className="fw-bold mb-2">📦 Cách đặt mua</h6>
          <ul
            className="mb-0"
            style={{ fontSize: 14, color: "#555", lineHeight: 2 }}
          >
            <li>
              Đặt trước khi tham gia bằng cách chọn số lượng trong{" "}
              <a
                href="/trao-2026-form-dang-ky"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2e7d32", fontWeight: 600 }}
              >
                form đăng ký TRAO 2026
              </a>
            </li>
            <li>
              Phí sản phẩm được cộng chung vào tổng phí và chuyển khoản một lần
            </li>
            <li>Sản phẩm sẽ được phát tại địa điểm tổ chức vào ngày sự kiện</li>
          </ul>
        </div>

        <div className="text-center">
          <a
            href="/trao-2026-form-dang-ky"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg px-5"
            style={{
              backgroundColor: "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Đăng ký & đặt sản phẩm →
          </a>
        </div>
      </div>
    </section>
  </Fragment>
);

export default SanPhamPage;
