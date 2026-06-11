import React, { Fragment } from "react";
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
  const totalRegistered = cabins.reduce((s, c) => s + c.registered, 0);

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
            <h2 className="mt-1">TRAO 2026 — Danh Sách Cabin Bãi Trại</h2>
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
                <img
                  src="/images/trao-2026/so-do-camp.png"
                  alt="Sơ đồ bãi trại TRAO 2026"
                  style={{ width: "100%", display: "block" }}
                />
              </div>

              {/* Tổng quan */}
              {!loading && !error && (
                <div className="row g-3 mb-4">
                  <div className="col-4">
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
                  <div className="col-4">
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
                  <div className="col-4">
                    <div
                      className="p-3 rounded text-center"
                      style={{
                        backgroundColor:
                          totalRegistered >= totalCapacity
                            ? "#ffebee"
                            : "#e8f5e9",
                        border: `1px solid ${totalRegistered >= totalCapacity ? "#ef9a9a" : "#a5d6a7"}`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 28,
                          fontWeight: 700,
                          color:
                            totalRegistered >= totalCapacity
                              ? "#c62828"
                              : "#2e7d32",
                        }}
                      >
                        {totalRegistered}
                      </div>
                      <div style={{ fontSize: 13, color: "#555" }}>
                        Đã đăng ký
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
                  const groupCapacity = group.cabins.reduce(
                    (s, c) => s + c.capacity,
                    0,
                  );
                  const groupRegistered = group.cabins.reduce(
                    (s, c) => s + c.registered,
                    0,
                  );
                  const groupFull = groupRegistered >= groupCapacity;

                  return (
                    <div key={group.name} className="mb-4">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h5
                          className="fw-bold mb-0"
                          style={{ color: "#1b5e20" }}
                        >
                          🏠 {group.name}
                        </h5>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: groupFull ? "#c62828" : "#2e7d32",
                            fontSize: 12,
                            padding: "5px 10px",
                          }}
                        >
                          {groupRegistered}/{groupCapacity} người
                        </span>
                      </div>

                      <div className="row g-2">
                        {group.cabins.map((cabin) => {
                          const full = !cabin.available;
                          const pct =
                            cabin.capacity > 0
                              ? Math.round(
                                  (cabin.registered / cabin.capacity) * 100,
                                )
                              : 0;
                          return (
                            <div
                              key={cabin.number}
                              className="col-6 col-md-4 col-lg-3"
                            >
                              <div
                                className="p-2 rounded"
                                style={{
                                  border: `1.5px solid ${full ? "#ef9a9a" : "#a5d6a7"}`,
                                  backgroundColor: full ? "#ffebee" : "#f0f7f0",
                                }}
                              >
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                  <span
                                    className="fw-bold"
                                    style={{
                                      fontSize: 15,
                                      color: full ? "#c62828" : "#1b5e20",
                                    }}
                                  >
                                    {cabin.fullName}
                                  </span>
                                  <span
                                    className="badge"
                                    style={{
                                      fontSize: 10,
                                      backgroundColor: full
                                        ? "#c62828"
                                        : cabin.registered > 0
                                          ? "#f57f17"
                                          : "#2e7d32",
                                    }}
                                  >
                                    {full
                                      ? "Đầy"
                                      : cabin.registered === 0
                                        ? "Trống"
                                        : "Còn chỗ"}
                                  </span>
                                </div>

                                {/* Progress bar */}
                                <div
                                  style={{
                                    height: 6,
                                    backgroundColor: "#e0e0e0",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    marginBottom: 4,
                                  }}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      width: `${pct}%`,
                                      backgroundColor: full
                                        ? "#c62828"
                                        : pct > 60
                                          ? "#f57f17"
                                          : "#4caf50",
                                      borderRadius: 3,
                                      transition: "width 0.3s",
                                    }}
                                  />
                                </div>

                                <div style={{ fontSize: 12, color: "#555" }}>
                                  {cabin.registered} / {cabin.capacity} người
                                </div>
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
                  style={{ fontSize: 13 }}
                >
                  <span>
                    <span
                      style={{
                        display: "inline-block",
                        width: 14,
                        height: 14,
                        backgroundColor: "#f0f7f0",
                        border: "1.5px solid #a5d6a7",
                        borderRadius: 3,
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Còn chỗ
                  </span>
                  <span>
                    <span
                      style={{
                        display: "inline-block",
                        width: 14,
                        height: 14,
                        backgroundColor: "#ffebee",
                        border: "1.5px solid #ef9a9a",
                        borderRadius: 3,
                        verticalAlign: "middle",
                      }}
                    />{" "}
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
