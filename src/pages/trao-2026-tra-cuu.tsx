import React, { Fragment } from "react";
import type { CabinInfo } from "../components/trao2026/types";

const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
const SHIRT_COLORS = [
  { value: "white", label: "Trắng", hex: "#f5f5f5", border: "#bdbdbd" },
  {
    value: "green",
    label: "Xanh mint",
    hex: "rgb(232, 245, 233)",
    border: "#a5d6a7",
  },
  { value: "yellow", label: "Vàng chanh", hex: "#f9f75e", border: "#d4c000" },
];

const SHIRT_INVENTORY: Record<string, Partial<Record<string, number>>> = {
  white: { M: 45 },
  green: { M: 31 },
  yellow: {},
};

function isSizeDisabled(
  color: string,
  size: string,
  shirtCounts: Record<string, number> = {},
): boolean {
  if (
    (color === "white" || color === "green") &&
    (size === "XS" || size === "S")
  )
    return true;
  if (color === "yellow" && !["XS", "S"].includes(size)) return true;
  const limit = SHIRT_INVENTORY[color]?.[size];
  if (limit !== undefined && (shirtCounts[`${color}|${size}`] ?? 0) >= limit)
    return true;
  return false;
}

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
  donation: string;
  fee_total: string;
  count_adult: string;
  count_child: string;
  count_free: string;
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

const InfoRow: React.FC<{ label: string; value?: string; hide?: boolean }> = ({
  label,
  value,
  hide,
}) => {
  if (hide || !value) return null;
  return (
    <tr>
      <td
        style={{ padding: "7px 0", color: "#777", width: "42%", fontSize: 13 }}
      >
        {label}
      </td>
      <td style={{ padding: "7px 0", fontWeight: 500, fontSize: 13 }}>
        {value}
      </td>
    </tr>
  );
};

const FeeRow: React.FC<{ label: string; value?: string; hide?: boolean }> = ({
  label,
  value,
  hide,
}) => {
  if (hide || !value) return null;
  return (
    <div
      className="d-flex justify-content-between py-1"
      style={{ gap: 12, fontSize: 13 }}
    >
      <span style={{ color: "#777", flex: 1 }}>{label}</span>
      <span style={{ fontWeight: 500, whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h5
    style={{
      color: "#2e7d32",
      borderBottom: "2px solid #e8f5e9",
      paddingBottom: 8,
      marginTop: 24,
      marginBottom: 16,
    }}
  >
    {children}
  </h5>
);

const ToggleChip: React.FC<{
  selected: boolean;
  disabled?: boolean;
  disabledTitle?: string;
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ selected, disabled, disabledTitle, onClick, children, style }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={disabled ? (disabledTitle ?? "Không thể chọn") : undefined}
    style={{
      cursor: disabled ? "not-allowed" : "pointer",
      border: `2px solid ${selected ? "#4caf50" : disabled ? "#e0e0e0" : "#dee2e6"}`,
      borderRadius: 6,
      padding: "4px 14px",
      backgroundColor: selected ? "#e8f5e9" : disabled ? "#f5f5f5" : "#fff",
      fontWeight: selected ? 700 : 400,
      fontSize: 13,
      color: disabled ? "#bdbdbd" : selected ? "#2e7d32" : "#333",
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
  cabins: CabinInfo[];
  allEdited: ParticipantData[];
  loadingCabins?: boolean;
  shirtCounts?: Record<string, number>;
}> = ({
  data,
  isRep,
  repLabel = "Đại diện",
  index,
  onChange,
  cabins,
  allEdited,
  loadingCabins,
  shirtCounts = {},
}) => {
  // Đếm số người đang chọn từng cabin (pending) — so sánh theo fullName
  const pendingCount: Record<number, number> = {};
  for (const p of allEdited) {
    if (p.cabin) {
      // Tìm cabin tương ứng theo fullName
      const found = cabins.find((c) => c.fullName === p.cabin);
      if (found)
        pendingCount[found.number] = (pendingCount[found.number] ?? 0) + 1;
    }
  }

  // Nhóm cabin theo tên nhóm, giữ thứ tự xuất hiện
  const groups: { name: string; cabins: CabinInfo[] }[] = [];
  const groupIndex: Record<string, number> = {};
  for (const cabin of cabins) {
    if (groupIndex[cabin.group] === undefined) {
      groupIndex[cabin.group] = groups.length;
      groups.push({ name: cabin.group, cabins: [] });
    }
    groups[groupIndex[cabin.group]].cabins.push(cabin);
  }

  return (
    <div
      className="rounded p-3 mb-3"
      style={{
        border: isRep ? "2px solid #4caf50" : "1px solid #dee2e6",
        backgroundColor: isRep ? "#f0f7f0" : "#fafafa",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <strong>{data.name}</strong>
        {isRep ? (
          <span
            className="badge"
            style={{ backgroundColor: "#2e7d32", fontSize: 11 }}
          >
            {repLabel}
          </span>
        ) : (
          <span className="badge bg-secondary" style={{ fontSize: 11 }}>
            Thành viên {index}
          </span>
        )}
      </div>
      <div className="row g-3">
        {/* Dòng 1: Size áo */}
        <div className="col-6 col-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
            Size áo *
          </label>
          <div className="d-flex gap-2 flex-wrap">
            {SHIRT_SIZES.map((s) => {
              const inventoryOut = data.shirt_color
                ? (() => {
                    const limit = SHIRT_INVENTORY[data.shirt_color]?.[s];
                    return (
                      limit !== undefined &&
                      (shirtCounts[`${data.shirt_color}|${s}`] ?? 0) >= limit
                    );
                  })()
                : false;
              const disabled = isSizeDisabled(data.shirt_color, s, shirtCounts);
              return (
                <ToggleChip
                  key={s}
                  selected={data.shirt_size === s}
                  disabled={disabled}
                  disabledTitle={inventoryOut ? "Đã hết áo" : "Không có cỡ này"}
                  onClick={() => !disabled && onChange({ shirt_size: s })}
                  style={{
                    padding: "5px 8px",
                    minWidth: 40,
                    textAlign: "center",
                  }}
                >
                  {s}
                </ToggleChip>
              );
            })}
          </div>
        </div>

        {/* Dòng 1: Màu áo */}
        <div className="col-6 col-md-4">
          <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
            Màu áo *
          </label>
          <div className="d-flex gap-2 align-items-center">
            {SHIRT_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                title={c.label}
                onClick={() => {
                  const patch: { shirt_color: string; shirt_size?: string } = {
                    shirt_color: c.value,
                  };
                  if (
                    data.shirt_size &&
                    isSizeDisabled(c.value, data.shirt_size, shirtCounts)
                  ) {
                    patch.shirt_size = "";
                  }
                  onChange(patch);
                }}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: c.hex,
                  border:
                    data.shirt_color === c.value
                      ? "3px solid #4caf50"
                      : `2px solid ${c.border ?? c.hex}`,
                  outline:
                    data.shirt_color === c.value ? "2px solid #4caf50" : "none",
                  outlineOffset: 2,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              />
            ))}
            {data.shirt_color && (
              <span style={{ fontSize: 13, color: "#555" }}>
                {SHIRT_COLORS.find((c) => c.value === data.shirt_color)?.label}
              </span>
            )}
          </div>
        </div>

        {/* Dòng 2: Cabin (full width) */}
        <div className="col-12">
          <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
            Cabin *
          </label>

          {loadingCabins ? (
            <div className="text-muted" style={{ fontSize: 13 }}>
              <span className="spinner-border spinner-border-sm me-2" />
              Đang tải danh sách cabin...
            </div>
          ) : cabins.length === 0 ? (
            <div className="text-muted" style={{ fontSize: 13 }}>
              Không thể tải danh sách cabin.
            </div>
          ) : (
            <div>
              {groups.map((group) => (
                <div key={group.name} className="mb-3">
                  <div
                    className="fw-semibold mb-1 px-2 py-1 rounded d-inline-block"
                    style={{
                      fontSize: 12,
                      backgroundColor: "#e8f5e9",
                      color: "#2e7d32",
                    }}
                  >
                    🏠 {group.name}
                  </div>
                  <div className="d-flex flex-wrap gap-1">
                    {group.cabins.map((cabin) => {
                      const pending = pendingCount[cabin.number] ?? 0;
                      const displayRegistered = cabin.registered + pending;
                      const displayFull = displayRegistered >= cabin.capacity;
                      const remaining = cabin.capacity - displayRegistered;
                      const isSelected = data.cabin === cabin.fullName;
                      const statusSvg = displayFull ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 40 40"
                          style={{ display: "block" }}
                        >
                          <line
                            x1="8"
                            y1="8"
                            x2="32"
                            y2="32"
                            stroke="#bdbdbd"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="32"
                            y1="8"
                            x2="8"
                            y2="32"
                            stroke="#bdbdbd"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : remaining < cabin.capacity / 2 ? (
                        <svg
                          width="16"
                          height="16"
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
                      ) : (
                        <svg
                          width="16"
                          height="16"
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
                      );
                      return (
                        <ToggleChip
                          key={cabin.number}
                          selected={isSelected}
                          disabled={displayFull && !isSelected}
                          onClick={() =>
                            !displayFull && onChange({ cabin: cabin.fullName })
                          }
                          style={{
                            padding: "3px 10px",
                            minWidth: 40,
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <span style={{ fontWeight: 700 }}>
                              {cabin.groupOrder}
                            </span>
                            {statusSvg}
                          </span>
                        </ToggleChip>
                      );
                    })}
                  </div>
                </div>
              ))}
              {/* Chú thích */}
              <div
                className="d-flex gap-3 mt-1"
                style={{ fontSize: 11, color: "#888" }}
              >
                <span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      backgroundColor: "#e8f5e9",
                      border: "2px solid #4caf50",
                      borderRadius: 3,
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  Đang chọn
                </span>
                <span className="d-flex align-items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 40 40"
                    style={{ display: "block" }}
                  >
                    <line
                      x1="8"
                      y1="8"
                      x2="32"
                      y2="32"
                      stroke="#bdbdbd"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="32"
                      y1="8"
                      x2="8"
                      y2="32"
                      stroke="#bdbdbd"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Đầy
                </span>
                <span className="d-flex align-items-center gap-1">
                  <svg
                    width="12"
                    height="12"
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
                  Còn nhiều chỗ
                </span>
                <span className="d-flex align-items-center gap-1">
                  <svg
                    width="12"
                    height="12"
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
                  Sắp đầy
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const ChinhSuaPage: React.FC = () => {
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [isExpired, setIsExpired] = React.useState(false);
  const [logging, setLogging] = React.useState(false);

  const [result, setResult] = React.useState<LookupResult | null>(null);
  const [edited, setEdited] = React.useState<ParticipantData[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");
  const [saved, setSaved] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"info" | "edit">("info");

  const [cabins, setCabins] = React.useState<CabinInfo[]>([]);
  const [loadingCabins, setLoadingCabins] = React.useState(false);
  const [cabinsFetched, setCabinsFetched] = React.useState(false);
  const [shirtCounts, setShirtCounts] = React.useState<Record<string, number>>(
    {},
  );

  // Upload receipt states (cho trạng thái "Chưa chuyển khoản")
  const [receiptFile, setReceiptFile] = React.useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = React.useState("");
  const [uploadingReceipt, setUploadingReceipt] = React.useState(false);
  const [uploadReceiptError, setUploadReceiptError] = React.useState("");
  const [uploadReceiptDone, setUploadReceiptDone] = React.useState(false);

  // Fetch cabin list + shirt counts khi user chuyển sang tab chỉnh sửa (chỉ fetch 1 lần)
  React.useEffect(() => {
    if (activeTab === "edit" && !cabinsFetched) {
      setLoadingCabins(true);
      Promise.all([
        fetch("/api/trao-2026-cabins").then((r) => r.json()),
        fetch("/api/trao-2026-shirts").then((r) => r.json()),
      ])
        .then(([cabinData, shirtData]) => {
          if (cabinData.ok) setCabins(cabinData.cabins);
          if (shirtData.ok) setShirtCounts(shirtData.counts);
        })
        .catch(() => {})
        .finally(() => {
          setLoadingCabins(false);
          setCabinsFetched(true);
        });
    }
  }, [activeTab, cabinsFetched]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !password.trim()) {
      setLoginError("Vui lòng nhập đầy đủ mã đăng ký và mật khẩu.");
      return;
    }
    setLogging(true);
    setLoginError("");
    setIsExpired(false);
    try {
      const res = await fetch("/api/trao-2026-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          password: password.trim(),
        }),
      });
      const data = await res.json();
      if (res.status === 410 || data.expired) {
        setIsExpired(true);
        setLoginError("");
        return;
      }
      setIsExpired(false);
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
        setSaveError(
          `Vui lòng chọn đầy đủ size áo, màu áo và cabin cho ${p.name}.`,
        );
        return;
      }
    }
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/trao-2026-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          password: password.trim(),
          participants: edited,
        }),
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

  const onReceiptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setReceiptFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setReceiptPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview("");
    }
  };

  const onUploadReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptFile) {
      setUploadReceiptError("Vui lòng chọn ảnh chuyển khoản.");
      return;
    }
    setUploadingReceipt(true);
    setUploadReceiptError("");
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(receiptFile);
      });
      const res = await fetch("/api/trao-2026-upload-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          password: password.trim(),
          receipt: {
            base64,
            mimeType: receiptFile.type,
            filename: receiptFile.name,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Lỗi upload");
      setUploadReceiptDone(true);
      // Cập nhật trạng thái trong result ngay trên UI
      setResult((prev) =>
        prev
          ? {
              ...prev,
              profile: {
                ...prev.profile,
                status: "Chờ xác nhận",
                receipt: data.receiptLink,
              },
            }
          : prev,
      );
    } catch (err: unknown) {
      setUploadReceiptError(err instanceof Error ? err.message : "Lỗi upload.");
    } finally {
      setUploadingReceipt(false);
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
                  <h2 className="mt-1">TRAO 2026</h2>
                  <p className="text-muted">
                    Tra cứu & chỉnh sửa thông tin đăng ký
                  </p>
                </div>
                <div
                  className="p-4 rounded shadow-sm"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e8f5e9",
                  }}
                >
                  <form onSubmit={onLogin} noValidate>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Mã đăng ký
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="BCX123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        style={{
                          fontFamily: "monospace",
                          letterSpacing: 2,
                          fontSize: 18,
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Mật khẩu (6 chữ số)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="form-control"
                        placeholder="123456"
                        maxLength={6}
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value.replace(/\D/g, ""))
                        }
                        style={{
                          fontFamily: "monospace",
                          letterSpacing: 6,
                          fontSize: 22,
                        }}
                      />
                    </div>
                    {isExpired && (
                      <div
                        className="rounded p-3 mt-3 mb-3"
                        style={{
                          backgroundColor: "#fff3e0",
                          border: "1.5px solid #ff8f00",
                        }}
                      >
                        <div
                          className="fw-semibold mb-1"
                          style={{ color: "#e65100" }}
                        >
                          ⏰ Đăng ký đã hết hạn
                        </div>
                        <div style={{ fontSize: 13, color: "#555" }}>
                          Đăng ký chưa được chuyển khoản sau 24 giờ nên đã tự
                          động hết hạn. Vui lòng{" "}
                          <a
                            href="/trao-2026-form-dang-ky"
                            style={{ color: "#e65100", fontWeight: 600 }}
                          >
                            đăng ký lại từ đầu
                          </a>
                          .
                        </div>
                      </div>
                    )}
                    {loginError && !isExpired && (
                      <div className="alert alert-danger py-2">
                        {loginError}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-success w-100 btn-lg"
                      disabled={logging}
                    >
                      {logging ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Đang xác thực...
                        </>
                      ) : (
                        "Xem thông tin →"
                      )}
                    </button>
                  </form>
                  <p
                    className="text-center text-muted mt-3"
                    style={{ fontSize: 13 }}
                  >
                    Nếu quên mật khẩu, liên hệ:
                    <br />
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
          </div>
        </section>
      </Fragment>
    );
  }

  // ── Profile + Edit ──────────────────────────────────────────────────────────
  const { profile } = result;
  const grandTotal = Number(profile.fee_total);

  return (
    <Fragment>
      <section className="wpo-about-section-s2 section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
                <div>
                  <span
                    style={{
                      color: "#4caf50",
                      fontWeight: 600,
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    TRAO 2026
                  </span>
                  <h3 className="mb-0 mt-1">{profile.name}</h3>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#2e7d32",
                        letterSpacing: 2,
                      }}
                    >
                      {profile.code}
                    </span>
                    <span
                      className="badge"
                      style={{
                        backgroundColor:
                          profile.status === "Chưa chuyển khoản"
                            ? "#e53935"
                            : profile.status === "Chờ xác nhận"
                              ? "#ff8f00"
                              : "#2e7d32",
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
                  onClick={() => {
                    setResult(null);
                    setSaved(false);
                  }}
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
                    style={{
                      color: activeTab === "info" ? "#2e7d32" : undefined,
                    }}
                  >
                    📋 Thông tin đăng ký
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "edit" ? "active" : ""}`}
                    onClick={() => setActiveTab("edit")}
                    style={{
                      color: activeTab === "edit" ? "#2e7d32" : undefined,
                    }}
                  >
                    ✏️ Chỉnh sửa áo & cabin
                  </button>
                </li>
              </ul>

              {/* ─── Tab: Thông tin ─────────────────────────────────────────── */}
              {activeTab === "info" && (
                <div
                  className="p-4 rounded shadow-sm"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e8f5e9",
                  }}
                >
                  <SectionTitle>Thông tin cá nhân</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow label="Họ tên" value={profile.name} />
                      <InfoRow label="Email" value={profile.email} />
                      <InfoRow label="Giới tính" value={profile.gender} />
                      <InfoRow label="Tuổi" value={profile.age} />
                      <InfoRow label="Số điện thoại" value={profile.phone} />
                      <InfoRow label="Link Facebook" value={profile.facebook} />
                      <InfoRow
                        label="SĐT khẩn cấp"
                        value={`${profile.emergency_phone} (${profile.emergency_relation})`}
                      />
                      <InfoRow label="Địa chỉ" value={profile.address} />
                      <InfoRow label="Nhóm máu" value={profile.blood_type} />
                    </tbody>
                  </table>

                  <SectionTitle>Áo của người đại diện</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow
                        label="Size áo"
                        value={result.representative.shirt_size}
                      />
                      <InfoRow
                        label="Màu áo"
                        value={
                          SHIRT_COLORS.find(
                            (c) =>
                              c.value === result.representative.shirt_color,
                          )?.label
                        }
                      />
                      <InfoRow
                        label="Cabin"
                        value={result.representative.cabin || undefined}
                      />
                    </tbody>
                  </table>

                  {result.members.length > 0 && (
                    <>
                      <SectionTitle>Thành viên đi cùng</SectionTitle>
                      <div className="table-responsive">
                        <table
                          className="table table-sm table-bordered"
                          style={{ fontSize: 13 }}
                        >
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
                                <td>{m.shirt_size || "-"}</td>
                                <td>
                                  {SHIRT_COLORS.find(
                                    (c) => c.value === m.shirt_color,
                                  )?.label ||
                                    m.shirt_color ||
                                    "-"}
                                </td>
                                <td>{m.cabin || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                  <SectionTitle>Đăng ký & Di chuyển</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow label="Hình thức" value={profile.reg_type} />
                      <InfoRow
                        label="Tổng số người"
                        value={profile.num_person}
                      />
                      <InfoRow label="Phương tiện" value={profile.transport} />
                      <InfoRow
                        label="Nơi xuất phát"
                        value={profile.bus_departure}
                      />
                    </tbody>
                  </table>

                  <SectionTitle>Tổng phí</SectionTitle>
                  <div>
                    {Number(profile.count_adult) > 0 && (
                      <FeeRow
                        label={`Người lớn / trẻ >12 tuổi (${profile.count_adult} người × 16,500 ¥)`}
                        value={fmtYen(Number(profile.count_adult) * 16500)}
                      />
                    )}
                    {Number(profile.count_child) > 0 && (
                      <FeeRow
                        label={`Trẻ em 6-12 tuổi (${profile.count_child} người × 8,000 ¥)`}
                        value={fmtYen(Number(profile.count_child) * 8000)}
                      />
                    )}
                    {Number(profile.count_free) > 0 && (
                      <FeeRow
                        label={`Khuyết tật / trẻ <6 tuổi (${profile.count_free} người)`}
                        value="Miễn phí"
                      />
                    )}
                    {/* Fallback nếu đăng ký cũ chưa có count */}
                    {Number(profile.count_adult) === 0 &&
                      Number(profile.count_child) === 0 &&
                      Number(profile.count_free) === 0 &&
                      Number(profile.fee_event) > 0 && (
                        <FeeRow
                          label="Phí sự kiện"
                          value={fmtYen(profile.fee_event)}
                        />
                      )}
                    <FeeRow
                      label={(() => {
                        if (Number(profile.fee_bus) <= 0) return "Phí xe bus";
                        const dep = profile.bus_departure
                          ? ` từ ${profile.bus_departure}`
                          : "";
                        const perPerson =
                          Number(profile.num_person) > 0
                            ? ` × ${fmtYen(Number(profile.fee_bus) / Number(profile.num_person))}`
                            : "";
                        return `Xe bus${dep} (${profile.num_person} người${perPerson})`;
                      })()}
                      value={
                        Number(profile.fee_bus) > 0
                          ? fmtYen(profile.fee_bus)
                          : undefined
                      }
                    />
                    <FeeRow
                      label={
                        profile.products
                          ? `Sản phẩm (${profile.products})`
                          : "Phí sản phẩm"
                      }
                      value={
                        Number(profile.fee_product) > 0
                          ? fmtYen(profile.fee_product)
                          : undefined
                      }
                    />
                    {Number(profile.donation) > 0 && (
                      <FeeRow
                        label="❤️ Quyên góp thiện nguyện"
                        value={fmtYen(profile.donation)}
                      />
                    )}
                  </div>
                  <div
                    className="d-flex justify-content-between fw-bold py-2 border-top mt-1"
                    style={{ fontSize: 16 }}
                  >
                    <span>Tổng phí</span>
                    <span className="text-success">{fmtYen(grandTotal)}</span>
                  </div>

                  <SectionTitle>Thông tin khác</SectionTitle>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <InfoRow
                        label="Dị ứng thực phẩm"
                        value={profile.food_allergy}
                      />
                      <InfoRow
                        label="Cộng tác viên"
                        value={profile.volunteer}
                      />
                      <InfoRow
                        label="Team CTV"
                        value={profile.volunteer_teams}
                      />
                      <InfoRow label="Ghi chú" value={profile.note} />
                    </tbody>
                  </table>

                  <SectionTitle>Chuyển khoản</SectionTitle>
                  {profile.receipt ? (
                    <a
                      href={profile.receipt}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-success"
                    >
                      🧾 Xem ảnh chuyển khoản
                    </a>
                  ) : profile.status === "Chưa chuyển khoản" &&
                    !uploadReceiptDone ? (
                    <form onSubmit={onUploadReceipt}>
                      <div
                        className="p-3 rounded mb-3"
                        style={{
                          backgroundColor: "#fff8e1",
                          border: "1px solid #ffe082",
                        }}
                      >
                        <p
                          className="mb-2 fw-semibold"
                          style={{ fontSize: 13, color: "#e65100" }}
                        >
                          ⏳ Bạn chưa upload ảnh chuyển khoản. Vui lòng upload
                          trước khi hết 24 giờ kể từ lúc đăng ký.
                        </p>
                        <input
                          type="file"
                          className="form-control form-control-sm mb-2"
                          accept="image/*"
                          onChange={onReceiptFileChange}
                        />
                        {receiptPreview && (
                          <div className="mb-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={receiptPreview}
                              alt="Preview"
                              style={{
                                maxWidth: "100%",
                                maxHeight: 200,
                                borderRadius: 6,
                                border: "1px solid #dee2e6",
                              }}
                            />
                          </div>
                        )}
                        {uploadReceiptError && (
                          <div
                            className="text-danger mb-2"
                            style={{ fontSize: 13 }}
                          >
                            {uploadReceiptError}
                          </div>
                        )}
                        <button
                          type="submit"
                          className="btn btn-sm btn-warning"
                          disabled={uploadingReceipt || !receiptFile}
                          style={{ fontWeight: 600 }}
                        >
                          {uploadingReceipt ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1" />
                              Đang upload...
                            </>
                          ) : (
                            "📤 Upload ảnh chuyển khoản"
                          )}
                        </button>
                      </div>
                    </form>
                  ) : uploadReceiptDone ? (
                    <div
                      className="p-3 rounded"
                      style={{
                        backgroundColor: "#e8f5e9",
                        border: "1px solid #a5d6a7",
                        fontSize: 13,
                        color: "#2e7d32",
                      }}
                    >
                      ✅ Đã upload ảnh chuyển khoản thành công. Trạng thái đã
                      chuyển sang <strong>Chờ xác nhận</strong>.
                    </div>
                  ) : null}

                  <div
                    className="mt-4 p-3 rounded"
                    style={{
                      backgroundColor: "#f0f7f0",
                      fontSize: 13,
                      color: "#555",
                    }}
                  >
                    Thời gian đăng ký: {profile.created_at}
                  </div>
                </div>
              )}

              {/* ─── Tab: Chỉnh sửa ─────────────────────────────────────────── */}
              {activeTab === "edit" && (
                <form onSubmit={onSave} noValidate>
                  <div
                    className="p-4 rounded shadow-sm"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #e8f5e9",
                    }}
                  >
                    <p className="text-muted mb-3" style={{ fontSize: 13 }}>
                      Bạn có thể chỉnh sửa size áo, màu áo và cabin cho từng
                      người tham gia. Tham khảo thông tin trước khi chọn:
                    </p>
                    <div className="row g-2 mb-4">
                      <div className="col-sm-6">
                        <a
                          href="/trao-2026-ao"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="d-flex align-items-center gap-3 p-3 rounded text-decoration-none"
                          style={{
                            backgroundColor: "#f0f7f0",
                            border: "1px solid #a5d6a7",
                          }}
                        >
                          <span style={{ fontSize: 24 }}>👕</span>
                          <div>
                            <div
                              className="fw-semibold"
                              style={{ color: "#1b5e20", fontSize: 13 }}
                            >
                              Bảng size & màu áo
                            </div>
                            <div style={{ fontSize: 11, color: "#888" }}>
                              Tham khảo trước khi chọn
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <a
                          href="/trao-2026-cabin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="d-flex align-items-center gap-3 p-3 rounded text-decoration-none"
                          style={{
                            backgroundColor: "#f0f7f0",
                            border: "1px solid #a5d6a7",
                          }}
                        >
                          <span style={{ fontSize: 24 }}>🏕️</span>
                          <div>
                            <div
                              className="fw-semibold"
                              style={{ color: "#1b5e20", fontSize: 13 }}
                            >
                              Danh sách cabin
                            </div>
                            <div style={{ fontSize: 11, color: "#888" }}>
                              Sức chứa & tình trạng
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    {edited.map((p, i) => (
                      <ParticipantEditCard
                        key={p.rowIndex}
                        data={p}
                        isRep={i === 0}
                        repLabel={
                          profile.reg_type === "Cá nhân"
                            ? "Cá nhân"
                            : "Đại diện"
                        }
                        index={i}
                        onChange={(patch) =>
                          setEdited((prev) =>
                            prev.map((x, j) =>
                              j === i ? { ...x, ...patch } : x,
                            ),
                          )
                        }
                        cabins={cabins}
                        allEdited={edited}
                        loadingCabins={loadingCabins}
                        shirtCounts={shirtCounts}
                      />
                    ))}

                    {saveError && (
                      <div className="alert alert-danger mt-3">{saveError}</div>
                    )}
                    {saved && (
                      <div className="alert alert-success mt-3">
                        ✅ Đã lưu thành công!
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-success btn-lg w-100 mt-3"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Đang lưu...
                        </>
                      ) : (
                        "Lưu thay đổi"
                      )}
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
