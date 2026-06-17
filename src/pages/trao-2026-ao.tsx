import React, { Fragment } from "react";
import Image from "next/image";

const COLORS = [
  {
    value: "white",
    label: "Trắng",
    hex: "#f5f5f5",
    textColor: "#212121",
    border: "#bdbdbd",
    img: "/assets/images/trao-2026/ao-trang.jpg",
    note: "Không có cỡ XS và S",
  },
  {
    value: "green",
    label: "Xanh mint",
    hex: "rgb(232, 245, 233)",
    textColor: "#1b5e20",
    border: "#a5d6a7",
    img: "/assets/images/trao-2026/ao-xanh-mint.jpg",
    note: "Không có cỡ XS và S",
  },
  {
    value: "yellow",
    label: "Vàng chanh",
    hex: "#f9f75e",
    textColor: "#5a4a00",
    border: "#d4c000",
    img: "/assets/images/trao-2026/ao-vang-chanh.jpg",
    note: "Chỉ có cỡ XS và S",
  },
];

const ShirtPage: React.FC = () => (
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
          <h2 className="mt-1">TRAO 2026 - Áo sự kiện</h2>
          <p className="text-muted">
            Thông tin chi tiết về size và màu áo. Vui lòng tham khảo trước khi
            chọn.
          </p>
        </div>

        {/* Màu áo */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <h4 className="fw-bold mb-4">Màu áo</h4>
            <div className="row g-4">
              {COLORS.map((c) => (
                <div className="col-md-4" key={c.value}>
                  <div className="rounded overflow-hidden shadow-sm h-100">
                    {c.img ? (
                      <Image
                        src={c.img}
                        alt={`Áo ${c.label}`}
                        width={400}
                        height={400}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          height: 200,
                          backgroundColor: c.hex,
                          border: `2px dashed ${c.border}`,
                          fontSize: 13,
                          color: c.textColor,
                        }}
                      >
                        [Ảnh sẽ được cập nhật]
                      </div>
                    )}
                    <div
                      className="p-3 text-center"
                      style={{ backgroundColor: "#fff" }}
                    >
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
                      {"note" in c && c.note && (
                        <div
                          className="mt-1"
                          style={{ fontSize: 12, color: "#e65100" }}
                        >
                          ⚠️ {c.note}
                        </div>
                      )}
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
            <Image
              src="/assets/images/trao-2026/trao-2026-size-ao.png"
              alt="Hướng dẫn cách đo size áo"
              width={900}
              height={600}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                marginBottom: 24,
              }}
            />
            <p className="text-muted" style={{ fontSize: 13 }}>
              * Chiều cao và cân nặng chỉ mang tính tham khảo. Nếu bạn ở giữa 2
              size, nên chọn size lớn hơn. Số đo có thể chênh lệch ±2cm.
            </p>
          </div>
        </div>

        {/* Ghi chú */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: "#fff8e1",
                border: "1px solid #ffe082",
                fontSize: 14,
              }}
            >
              <strong>Lưu ý:</strong>
              <ul className="mb-0 mt-2">
                <li>
                  Áo sự kiện sẽ được phát tại địa điểm tổ chức vào ngày đầu
                  tiên.
                </li>
                <li>
                  Size và màu áo có thể thay đổi sau khi đăng ký. Sau khi hoàn
                  tất chuyển khoản, vui lòng dùng mã đăng ký và mật khẩu để đăng
                  nhập và thay đổi lựa chọn.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default ShirtPage;
