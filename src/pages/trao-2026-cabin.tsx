import React, { Fragment } from "react";
import Image from "next/image";
import type { CabinInfo } from "../components/trao2026/types";

const CabinPage: React.FC = () => {
  const [cabins, setCabins] = React.useState<CabinInfo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch("/api/trao-2026-cabins")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setCabins(data.cabins);
        else setError("Không thể tải danh sách cabin.");
      })
      .catch(() => setError("Không thể tải danh sách cabin."))
      .finally(() => setLoading(false));
  }, []);

  // Nhóm cabin, giữ thứ tự xuất hiện
  const groups: { name: string; cabins: CabinInfo[] }[] = [];
  const groupIndex: Record<string, number> = {};
  for (const cabin of cabins) {
    if (groupIndex[cabin.group] === undefined) {
      groupIndex[cabin.group] = groups.length;
      groups.push({ name: cabin.group, cabins: [] });
    }
    groups[groupIndex[cabin.group]].cabins.push(cabin);
  }

  const totalCapacity = cabins.reduce((s, c) => s + c.capacity, 0);

  return (
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
            <h2 className="mt-1">TRAO 2026 - Danh Sách Cabin Bãi Trại</h2>
            <p className="text-muted">
              Thông tin sức chứa và số người đã đăng ký theo từng cabin. Cập
              nhật theo thời gian thực.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Sơ đồ bãi trại */}
              <div
                className="rounded mb-4 overflow-hidden"
                style={{ border: "1px solid #a5d6a7" }}
              >
                <Image
                  src="/assets/images/trao-2026/trao-2026-map.png"
                  alt="Sơ đồ bãi trại TRAO 2026"
                  width={1200}
                  height={800}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              {/* Tổng quan */}
              {!loading && !error && (
                <div className="row g-3 mb-4 justify-content-center">
                  <div className="col-6 col-md-4">
                    <div
                      className="p-3 rounded text-center"
                      style={{
                        backgroundColor: "#e8f5e9",
                        border: "1px solid #a5d6a7",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#2e7d32",
                        }}
                      >
                        {cabins.length}
                      </div>
                      <div style={{ fontSize: 13, color: "#555" }}>
                        Tổng số cabin
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div
                      className="p-3 rounded text-center"
                      style={{
                        backgroundColor: "#e8f5e9",
                        border: "1px solid #a5d6a7",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#2e7d32",
                        }}
                      >
                        {totalCapacity}
                      </div>
                      <div style={{ fontSize: 13, color: "#555" }}>
                        Tổng sức chứa
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading / Error */}
              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-success mb-2" />
                  <p className="text-muted">Đang tải danh sách cabin...</p>
                </div>
              )}
              {error && <div className="alert alert-warning">{error}</div>}

              {/* Danh sách cabin theo nhóm */}
              {!loading &&
                !error &&
                groups.map((group) => {
                  return (
                    <div key={group.name} className="mb-4">
                      <h5 className="fw-bold mb-2" style={{ color: "#1b5e20" }}>
                        🏠 {group.name}
                      </h5>

                      <div className="row g-2">
                        {group.cabins.map((cabin) => {
                          const full = !cabin.available;
                          const remaining = cabin.capacity - cabin.registered;
                          const lowAvailability =
                            !full && remaining < cabin.capacity / 2;
                          return (
                            <div
                              key={cabin.number}
                              className="col-6 col-md-4 col-lg-3"
                            >
                              <div
                                className="p-2 rounded d-flex align-items-center justify-content-between"
                                style={{
                                  border: `1.5px solid ${full ? "#ef9a9a" : "#a5d6a7"}`,
                                  backgroundColor: full ? "#ffebee" : "#f0f7f0",
                                  minHeight: 44,
                                }}
                              >
                                <div>
                                  <div
                                    className="fw-bold"
                                    style={{
                                      fontSize: 15,
                                      color: full ? "#c62828" : "#1b5e20",
                                    }}
                                  >
                                    {cabin.fullName}
                                  </div>
                                  {cabin.note && (
                                    <div
                                      style={{
                                        fontSize: 11,
                                        color: "#777",
                                        fontWeight: 400,
                                        marginTop: 1,
                                      }}
                                    >
                                      {cabin.note}
                                    </div>
                                  )}
                                </div>
                                {full ? (
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 40 40"
                                    style={{ display: "block", flexShrink: 0 }}
                                  >
                                    <title>Đầy</title>
                                    <line
                                      x1="8"
                                      y1="8"
                                      x2="32"
                                      y2="32"
                                      stroke="#c62828"
                                      strokeWidth="5"
                                      strokeLinecap="round"
                                    />
                                    <line
                                      x1="32"
                                      y1="8"
                                      x2="8"
                                      y2="32"
                                      stroke="#c62828"
                                      strokeWidth="5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                ) : lowAvailability ? (
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 40 40"
                                    style={{ display: "block", flexShrink: 0 }}
                                  >
                                    <title>Sắp đầy</title>
                                    <path
                                      d="M17.2,9.3 Q20,4 22.8,9.3 L33.2,28.7 Q36,34 30,34 L10,34 Q4,34 6.8,28.7 Z"
                                      fill="#FFE082"
                                      stroke="#EF6C00"
                                      strokeWidth="2.5"
                                      strokeLinejoin="round"
                                    />
                                    <rect
                                      x="18.5"
                                      y="13.5"
                                      width="3"
                                      height="11.5"
                                      rx="1.5"
                                      fill="#E65100"
                                    />
                                    <circle
                                      cx="20"
                                      cy="30"
                                      r="2"
                                      fill="#E65100"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 40 40"
                                    style={{ display: "block", flexShrink: 0 }}
                                  >
                                    <title>Còn nhiều chỗ</title>
                                    <circle
                                      cx="20"
                                      cy="20"
                                      r="17"
                                      fill="#F1F8E9"
                                      stroke="#AED581"
                                      strokeWidth="1.5"
                                      strokeDasharray="4 2"
                                    />
                                    <polyline
                                      points="11,20 17,27 29,13"
                                      fill="none"
                                      stroke="#558B2F"
                                      strokeWidth="3.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

              {/* Chú thích màu */}
              {!loading && !error && (
                <div
                  className="d-flex flex-wrap gap-3 mb-4"
                  style={{ fontSize: 13, color: "#555" }}
                >
                  <span className="d-flex align-items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 40 40"
                      style={{ display: "block" }}
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="17"
                        fill="#F1F8E9"
                        stroke="#AED581"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <polyline
                        points="11,20 17,27 29,13"
                        fill="none"
                        stroke="#558B2F"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Còn nhiều chỗ (≥ 50% sức chứa)
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 40 40"
                      style={{ display: "block" }}
                    >
                      <path
                        d="M17.2,9.3 Q20,4 22.8,9.3 L33.2,28.7 Q36,34 30,34 L10,34 Q4,34 6.8,28.7 Z"
                        fill="#FFE082"
                        stroke="#EF6C00"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="18.5"
                        y="13.5"
                        width="3"
                        height="11.5"
                        rx="1.5"
                        fill="#E65100"
                      />
                      <circle cx="20" cy="30" r="2" fill="#E65100" />
                    </svg>
                    Sắp đầy (&lt; 50% sức chứa)
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 40 40"
                      style={{ display: "block" }}
                    >
                      <line
                        x1="8"
                        y1="8"
                        x2="32"
                        y2="32"
                        stroke="#c62828"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="32"
                        y1="8"
                        x2="8"
                        y2="32"
                        stroke="#c62828"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Đầy
                  </span>
                </div>
              )}

              {/* Lưu ý */}
              <div
                className="p-3 rounded mb-4"
                style={{
                  backgroundColor: "#fff8e1",
                  border: "1px solid #ffe082",
                  fontSize: 14,
                }}
              >
                <h6 className="fw-bold mb-2">⚠️ Lưu ý khi chọn cabin</h6>
                <ul className="mb-0" style={{ lineHeight: 2 }}>
                  <li>Nhiều người cùng nhóm nên chọn cùng cabin</li>
                  <li>
                    Cabin được đăng ký theo thứ tự, ai đăng ký trước được chọn
                    trước
                  </li>
                  <li>Ban tổ chức có thể điều phối lại nếu cần thiết</li>
                  <li>
                    Số liệu cập nhật theo thời gian thực từ danh sách đăng ký
                  </li>
                </ul>
              </div>

              <p className="text-muted text-center" style={{ fontSize: 12 }}>
                Liên hệ:{" "}
                <a
                  href="https://www.facebook.com/banchanxanhjp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fanpage Bàn Chân Xanh
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CabinPage;
