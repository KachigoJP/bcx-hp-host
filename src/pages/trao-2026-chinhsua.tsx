import React, { Fragment } from "react";

const SHIRT_SIZES = ["S", "M", "L"];
const SHIRT_COLORS = [
  { value: "black", label: "Đen",   hex: "#212121" },
  { value: "white", label: "Trắng", hex: "#f5f5f5", border: "#bdbdbd" },
  { value: "blue",  label: "Xanh",  hex: "#1565c0" },
];
const CABIN_NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

function fmtYen(n: number | string) {
  return Number(n).toLocaleString("ja-JP") + " ¥";
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ParticipantData = {
  rowIndex: number;
  name: string;
  shirt_size: string;
  shirt_color: string;
  cabin: string;
  relation?: string;
  age?: string;
  gender?: string;
};

type Profile = {
  code: string;
  name: string;
  email: string;
  gender: string;
  age: string;
  facebook: string;
  phone: string;
  emergency_phone: string;
  emergency_relation: string;
  address: string;
  blood_type: string;
  reg_type: string;
  num_person: string;
  transport: string;
  bus_departure: string;
  fee_event: string;
  fee_bus: string;
  fee_total: string;
  products: string;
  fee_product: string;
  food_allergy: string;
  volunteer: string;
  volunteer_teams: string;
  note: string;
  status: string;
  created_at: string;
  receipt: string;
};

type LookupResult = {
  profile: Profile;
  representative: ParticipantData;
  members: ParticipantData[];
};

// ─── Small components ─────────────────────────────────────────────────────────

const InfoRow: React.FC<{ label: string; value?: string; hide?: boolean }> = ({ label, value, hide }) => {
  if (hide || !value) return null;
  return (
    <tr>
      <td style={{ padding: "7px 0", color: "#777", width: "42%", fontSize: 13 }}>{label}</td>
      <td style={{ padding: "7px 0", fontWeight: 500, fontSize: 13 }}>{value}</td>
    </tr>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h5 style={{ color: "#2e7d32", borderBottom: "2px solid #e8f5e9", paddingBottom: 8, marginTop: 24, marginBottom: 16 }}>
    {children}
  </h5>
);

const ToggleChip: React.FC<{
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ selected, onClick, children, style }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      cursor: "pointer",
      border: `2px solid ${selected ? "#4caf50" : "#dee2e6"}`,
      borderRadius: 6,
      padding: "4px 14px",
      backgroundColor: selected ? "#e8f5e9" : "#fff",
      fontWeight: selected ? 700 : 400,
      fontSize: 13,
      transition: "all 0.15s",
      ...style,
    }}
  >
    {children}
  </button>
);

// ─── Edit card (shirt + cabin) ────────────────────────────────────────────────

const ParticipantEditCard: React.FC<{
  data: ParticipantData;
  isRep: boolean;
  repLabel?: string;
  index: number;
  onChange: (patch: Partial<ParticipantData>) => void;
}> = ({ data, isRep, repLabel = "Đại diện", index, onChange }) => (
  <div className="rounded p-3 mb-3" style={{
    border: isRep ? "2px solid #4caf50" : "1px solid #dee2e6",
    backgroundColor: isRep ? "#f0f7f0" : "#fafafa",
  }}>
    <div className="d-flex align-items-center gap-2 mb-3">
      <strong>{data.name}</strong>
      {isRep
        ? <span className="badge" style={{ backgroundColor: "#2e7d32", fontSize: 11 }}>{repLabel}</span>
        : <span className="badge bg-secondary" style={{ fontSize: 11 }}>Thành viên {index}</span>}
    </div>
    <div className="row g-3">
      <div className="col-6 col-md-3">
        <label className="form-label fw-semibold" style={{ fontSize: 13 }}>Size áo *</label>
        <div className="d-flex gap-2 flex-wrap">
          {SHIRT_SIZES.map((s) => (
            <ToggleChip key={s} selected={data.shirt_size === s} onClick={() => onChange({ shirt_size: s })}>{s}</ToggleChip>
          ))}
        </div>
      </div>
      <div className="col-6 col-md-4">
        <label className="form-label fw-semibold" style={{ fontSize: 13 }}>Màu áo *</label>
        <div className="d-flex gap-2">
          {SHIRT_COLORS.map((c) => (
            <button key={c.value} type="button" title={c.label} onClick={() => onChange({ shirt_color: c.value })}
              style={{
                width: 34, height: 34, borderRadius: "50%", backgroundColor: c.hex,
                border: data.shirt_color === c.value ? "3px solid #4caf50" : `2px solid ${c.border ?? c.hex}`,
                outline: data.shirt_color === c.value ? "2px solid #4caf50" : "none",
                outlineOffset: 2, cursor: "pointer", transition: "all 0.15s",
              }}
            />
          ))}
        </div>
        {data.shirt_color && (
          <div style={{ fontSize: 12, marginTop: 4, color: "#555" }}>
            {SHIRT_COLORS.find((c) => c.value === data.shirt_color)?.label}
          </div>
        )}
      </div>
      <div className="col-12 col-md-5">
        <label className="form-label fw-semibold" style={{ fontSize: 13 }}>Cabin *</label>
        <div className="d-flex flex-wrap gap-1">
          {CABIN_NUMBERS.map((n) => (
            <ToggleChip key={n} selected={data.cabin === String(n)} onClick={() => onChange({ cabin: String(n) })}
              style={{ padding: "3px 10px", minWidth: 38, textAlign: "center" }}>
              {n}
            </ToggleChip>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

const ChinhSuaPage: React.FC = () => {
  const [code, setCode]         = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [logging, setLogging]   = React.useState(false);

  const [result, setResult]     = React.useState<LookupResult | null>(null);
  const [edited, setEdited]     = React.useState<ParticipantData[]>([]);
  const [saving, setSaving]     = React.useState(false);
  const [saveError, setSaveError] = React.useState("");
  const [saved, setSaved]       = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"info" | "edit">("info");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !password.trim()) {
      setLoginError("Vui lòng nhập đầy đủ mã đăng ký và mật khẩu.");
      return;
    }
    setLogging(true);
    setLoginError("");
    try {
      const res = await fetch("/api/trao-2026-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase(), password: password.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Lỗi xác thực");
      setResult(data);
      setEdited([data.representative, ...data.members]);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Lỗi xác thực.");
    } finally {
      setLogging(false);
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const p of edited) {
      if (!p.shirt_size || !p.shirt_color || !p.cabin) {
        setSaveError(`Vui lòng chọn đầy đủ size áo, màu áo và cabin cho ${p.name}.`);
        return;
      }
    }
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/trao-2026-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase(), password: password.trim(), participants: edited }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Lỗi cập nhật");
      setSaved(true);
      setSaveError("");
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Lỗi cập nhật.");
    } finally {
      setSaving(false);
    }
  };

  // ── Login form ──────────────────────────────────────────────────────────────
  if (!result) {
    return (
      <Fragment>
        <section className="wpo-about-section-s2 section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-8 col-12">
                <div className="text-center mb-4">
                  <span style={{ color: "#4caf50", fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>
                    Bàn Chân Xanh
                  </span>
                  <h2 className="mt-1">TRAO 2026</h2>
                  <p className="text-muted">Tra cứu & chỉnh sửa thông tin đăng ký</p>
                </div>
                <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #e8f5e9" }}>
                  <form onSubmit={onLogin} noValidate>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Mã đăng ký</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="BCX123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        style={{ fontFamily: "monospace", letterSpacing: 2, fontSize: 18 }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Mật khẩu (6 chữ số)</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="form-control"
                        placeholder="123456"
                        maxLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value.replace(/\D/g, ""))}
                        style={{ fontFamily: "monospace", letterSpacing: 6, fontSize: 22 }}
                      />
                    </div>
                    {loginError && <div className="alert alert-danger py-2">{loginError}</div>}
                    <button type="submit" className="btn btn-success w-100 btn-lg" disabled={logging}>
                      {logging ? <><span className="spinner-border spinner-border-sm me-2" />Đang xác thực...</> : "Xem thông tin →"}
                    </button>
                  </form>
                  <p className="text-center text-muted mt-3" style={{ fontSize: 13 }}>
                    Nếu quên mật khẩu, liên hệ:<br />
                    <a href="https://www.facebook.com/banchanxanhjp" target="_blank" rel="noopener noreferrer">Fanpage Bàn Chân Xanh</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }

  // ── Profile + Edit ──────────────────────────────────────────────────────────
  const { profile } = result;
  const grandTotal = Number(profile.fee_total) + Number(profile.fee_product);

  return (
    <Fragment>
      <section className="wpo-about-section-s2 section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">

              {/* Header */}
              <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
                <div>
                  <span style={{ color: "#4caf50", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
                    TRAO 2026
                  </span>
                  <h3 className="mb-0 mt-1">{profile.name}</h3>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: "#2e7d32", letterSpacing: 2 }}>
                      {profile.code}
                    </span>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: profile.status === "Chờ xác nhận" ? "#ff8f00" : "#2e7d32",
                        fontSize: 11,
                      }}
                    >
                      {profile.status || "Chờ xác nhận"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => { setResult(null); setSaved(false); }}
                >
                  Đăng xuất
                </button>
              </div>

              {/* Tabs */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "info" ? "active" : ""}`}
                    onClick={() => setActiveTab("info")}
                    style={{ color: activeTab === "info" ? "#2e7d32" : undefined }}
                  >
                    📋 Thông tin đăng ký
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "edit" ? "active" : ""}`}
                    onClick={() => setActiveTab("edit")}
                    style={{ color: activeTab === "edit" ? "#2e7d32" : undefined }}
                  >
                    ✏️ Chỉnh sửa áo & cabin
                  </button>
                </li>
              </ul>

              {/* ─── Tab: Thông tin ─────────────────────────────────────────── */}
              {activeTab === "info" && (
                <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #e8f5e9" }}>

                  <SectionTitle>Thông tin cá nhân</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow label="Họ tên" value={profile.name} />
                      <InfoRow label="Email" value={profile.email} />
                      <InfoRow label="Giới tính" value={profile.gender} />
                      <InfoRow label="Tuổi" value={profile.age} />
                      <InfoRow label="Số điện thoại" value={profile.phone} />
                      <InfoRow label="Link Facebook" value={profile.facebook} />
                      <InfoRow label="SĐT khẩn cấp" value={`${profile.emergency_phone} (${profile.emergency_relation})`} />
                      <InfoRow label="Địa chỉ" value={profile.address} />
                      <InfoRow label="Nhóm máu" value={profile.blood_type} />
                    </tbody>
                  </table>

                  <SectionTitle>Đăng ký & Di chuyển</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow label="Hình thức" value={profile.reg_type} />
                      <InfoRow label="Tổng số người" value={profile.num_person} />
                      <InfoRow label="Phương tiện" value={profile.transport} />
                      <InfoRow label="Nơi xuất phát" value={profile.bus_departure} />
                    </tbody>
                  </table>

                  {result.members.length > 0 && (
                    <>
                      <SectionTitle>Thành viên đi cùng</SectionTitle>
                      <div className="table-responsive">
                        <table className="table table-sm table-bordered" style={{ fontSize: 13 }}>
                          <thead style={{ backgroundColor: "#e8f5e9" }}>
                            <tr>
                              <th>Họ tên</th>
                              <th>Giới tính</th>
                              <th>Tuổi</th>
                              <th>Quan hệ</th>
                              <th>Size áo</th>
                              <th>Màu áo</th>
                              <th>Cabin</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.members.map((m, i) => (
                              <tr key={i}>
                                <td>{m.name}</td>
                                <td>{m.gender}</td>
                                <td>{m.age}</td>
                                <td>{m.relation}</td>
                                <td>{m.shirt_size || "—"}</td>
                                <td>{SHIRT_COLORS.find((c) => c.value === m.shirt_color)?.label || m.shirt_color || "—"}</td>
                                <td>{m.cabin ? `Cabin ${m.cabin}` : "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  <SectionTitle>Áo của người đại diện</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow label="Size áo" value={result.representative.shirt_size} />
                      <InfoRow label="Màu áo" value={SHIRT_COLORS.find((c) => c.value === result.representative.shirt_color)?.label} />
                      <InfoRow label="Cabin" value={result.representative.cabin ? `Cabin ${result.representative.cabin}` : undefined} />
                    </tbody>
                  </table>

                  <SectionTitle>Chi phí</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow label="Phí sự kiện" value={fmtYen(profile.fee_event)} />
                      <InfoRow label="Phí xe bus" value={Number(profile.fee_bus) > 0 ? fmtYen(profile.fee_bus) : undefined} />
                      <InfoRow label="Sản phẩm" value={profile.products || undefined} />
                      <InfoRow label="Phí sản phẩm" value={Number(profile.fee_product) > 0 ? fmtYen(profile.fee_product) : undefined} />
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between fw-bold py-2 border-top mt-1" style={{ fontSize: 16 }}>
                    <span>Tổng dự kiến</span>
                    <span className="text-success">{fmtYen(grandTotal)}</span>
                  </div>

                  <SectionTitle>Thông tin khác</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow label="Dị ứng thực phẩm" value={profile.food_allergy} />
                      <InfoRow label="Cộng tác viên" value={profile.volunteer} />
                      <InfoRow label="Team CTV" value={profile.volunteer_teams} />
                      <InfoRow label="Ghi chú" value={profile.note} />
                    </tbody>
                  </table>

                  {profile.receipt && (
                    <>
                      <SectionTitle>Chuyển khoản</SectionTitle>
                      <a href={profile.receipt} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-success">
                        🧾 Xem ảnh chuyển khoản
                      </a>
                    </>
                  )}

                  <div className="mt-4 p-3 rounded" style={{ backgroundColor: "#f0f7f0", fontSize: 13, color: "#555" }}>
                    Thời gian đăng ký: {profile.created_at}
                  </div>
                </div>
              )}

              {/* ─── Tab: Chỉnh sửa ─────────────────────────────────────────── */}
              {activeTab === "edit" && (
                <form onSubmit={onSave} noValidate>
                  <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid #e8f5e9" }}>
                    <p className="text-muted mb-4" style={{ fontSize: 13 }}>
                      Bạn có thể chỉnh sửa size áo, màu áo và cabin cho từng người tham gia.
                      Xem{" "}
                      <a href="/trao-2026-ao" target="_blank" className="text-success">bảng size & màu</a>
                      {" "}và{" "}
                      <a href="/trao-2026-cabin" target="_blank" className="text-success">sơ đồ cabin</a>.
                    </p>

                    {edited.map((p, i) => (
                      <ParticipantEditCard
                        key={p.rowIndex}
                        data={p}
                        isRep={i === 0}
                        repLabel={profile.reg_type === "Cá nhân" ? "Cá nhân" : "Đại diện"}
                        index={i}
                        onChange={(patch) =>
                          setEdited((prev) => prev.map((x, j) => (j === i ? { ...x, ...patch } : x)))
                        }
                      />
                    ))}

                    {saveError && <div className="alert alert-danger mt-3">{saveError}</div>}
                    {saved && <div className="alert alert-success mt-3">✅ Đã lưu thành công!</div>}

                    <button type="submit" className="btn btn-success btn-lg w-100 mt-3" disabled={saving}>
                      {saving ? <><span className="spinner-border spinner-border-sm me-2" />Đang lưu...</> : "Lưu thay đổi"}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ChinhSuaPage;
