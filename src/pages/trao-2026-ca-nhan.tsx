import React, { Fragment } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const FEE_ADULT = 20000;
const FEE_CHILD = 10000;
const FEE_BUS = 10000;
const CHILD_AGE_LIMIT = 12; // dưới 12 tuổi = trẻ em

// ─── Types ────────────────────────────────────────────────────────────────────

type Gender = "Nam" | "Nữ" | "Khác" | "";

type Step1 = {
  email: string;
  name: string;
  gender: Gender;
  age: string;
  facebook: string;
  phone: string;
  emergency_phone: string;
  emergency_relation: string;
  // optional
  address: string;
  blood_type: string;
};

type Member = {
  name: string;
  gender: Gender;
  age: string;
  relation: string;
};

type Step2 = {
  register_type: "individual" | "group" | "";
  members: Member[];
};

type Step3 = {
  transport: "own" | "bus" | "";
  bus_departure: "Tokyo" | "Nagoya" | "Osaka" | "";
};

type Step4 = {
  receipt_file: File | null;
  receipt_url: string;
};

type ProductOrder = {
  khan_ran: number;
  khan_tho_cam: number;
  tui_to_te: number;
};

const PRODUCTS = [
  { key: "khan_ran"    as keyof ProductOrder, label: "Khăn Rằn",     price: 800  },
  { key: "khan_tho_cam" as keyof ProductOrder, label: "Khăn Thổ Cẩm", price: 1300 },
  { key: "tui_to_te"  as keyof ProductOrder, label: "Túi Tò Te",     price: 1200 },
];

const VOLUNTEER_TEAMS = [
  "Team truyền thông",
  "Team ẩm thực",
  "MC",
  "Team hậu cần",
  "Team thu ngân / lễ tân",
  "Team văn nghệ",
  "Team camera",
];

type Step5 = {
  food_allergy: string;
  want_products: "yes" | "no" | "";
  products: ProductOrder;
  volunteer: "yes" | "no" | "";
  volunteer_teams: string[];
  note: string;
};

function calcProductFee(products: ProductOrder): number {
  return PRODUCTS.reduce((sum, p) => sum + (products[p.key] ?? 0) * p.price, 0);
}

type ParticipantExtra = {
  name: string;
  shirt_size: string;
  shirt_color: string;
  stay: string;
};

type Step6 = {
  participants: ParticipantExtra[];
};

const SHIRT_SIZES = ["S", "M", "L"];
const SHIRT_COLORS = [
  { value: "black", label: "Đen", hex: "#212121" },
  { value: "white", label: "Trắng", hex: "#f5f5f5", border: "#bdbdbd" },
  { value: "blue", label: "Xanh", hex: "#1565c0" },
];
const CABIN_NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const emptyMember = (): Member => ({ name: "", gender: "", age: "", relation: "" });

function calcFees(step1: Step1, step2: Step2, step3: Step3) {
  const allAges: number[] = [Number(step1.age)];
  if (step2.register_type === "group") {
    step2.members.forEach((m) => allAges.push(Number(m.age)));
  }
  const adults = allAges.filter((a) => a >= CHILD_AGE_LIMIT).length;
  const children = allAges.filter((a) => a < CHILD_AGE_LIMIT && a > 0).length;
  const total_people = adults + children;
  const event_fee = adults * FEE_ADULT + children * FEE_CHILD;
  const bus_fee = step3.transport === "bus" ? total_people * FEE_BUS : 0;
  return { adults, children, total_people, event_fee, bus_fee, total: event_fee + bus_fee };
}

function fmtYen(n: number) {
  return n.toLocaleString("ja-JP") + " ¥";
}

const STEPS = [
  "Thông tin cá nhân",
  "Hình thức đăng ký",
  "Phương tiện di chuyển",
  "Thông tin khác",
  "Áo & Chỗ ngủ",
  "Chuyển khoản",
];

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const ProgressBar: React.FC<{ current: number }> = ({ current }) => (
  <div className="mb-5">
    <div className="d-flex justify-content-between align-items-start mb-2">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="text-center" style={{ flex: 1, position: "relative" }}>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: "50%",
                  width: "100%",
                  height: 3,
                  backgroundColor: done ? "#2e7d32" : "#dee2e6",
                  zIndex: 0,
                }}
              />
            )}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: done ? "#2e7d32" : active ? "#4caf50" : "#dee2e6",
                color: done || active ? "#fff" : "#6c757d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontWeight: 700,
                fontSize: 15,
                position: "relative",
                zIndex: 1,
                border: active ? "3px solid #1b5e20" : "3px solid transparent",
              }}
            >
              {done ? "✓" : step}
            </div>
            <div
              style={{
                fontSize: 11,
                marginTop: 6,
                color: active ? "#2e7d32" : done ? "#4caf50" : "#aaa",
                fontWeight: active ? 700 : 400,
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
    <div className="text-muted text-center" style={{ fontSize: 13 }}>
      Bước {current}/{STEPS.length}
    </div>
  </div>
);

// ─── Cost Summary Card ────────────────────────────────────────────────────────

const CostSummaryCard: React.FC<{
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step5?: Step5;
  compact?: boolean;
}> = ({ step1, step2, step3, step5, compact }) => {
  const fees = calcFees(step1, step2, step3);
  const productFee = step5 && step5.want_products === "yes" ? calcProductFee(step5.products) : 0;
  const grandTotal = fees.total + productFee;
  if (!step2.register_type) return null;

  return (
    <div
      className="rounded p-3 mt-4"
      style={{ backgroundColor: "#f0f7f0", border: "1px solid #a5d6a7" }}
    >
      <p className="fw-semibold mb-2" style={{ fontSize: 14 }}>
        💰 Ước tính chi phí
      </p>
      <table className="table table-sm mb-0" style={{ fontSize: 13 }}>
        <tbody>
          {fees.adults > 0 && (
            <tr>
              <td className="ps-0 border-0">Người lớn ({fees.adults} × {fmtYen(FEE_ADULT)})</td>
              <td className="text-end border-0 fw-semibold">{fmtYen(fees.adults * FEE_ADULT)}</td>
            </tr>
          )}
          {fees.children > 0 && (
            <tr>
              <td className="ps-0 border-0">Trẻ em &lt;{CHILD_AGE_LIMIT} tuổi ({fees.children} × {fmtYen(FEE_CHILD)})</td>
              <td className="text-end border-0 fw-semibold">{fmtYen(fees.children * FEE_CHILD)}</td>
            </tr>
          )}
          {step3.transport === "bus" && (
            <tr>
              <td className="ps-0 border-0">Xe bus ({fees.total_people} × {fmtYen(FEE_BUS)})</td>
              <td className="text-end border-0 fw-semibold">{fmtYen(fees.bus_fee)}</td>
            </tr>
          )}
          {productFee > 0 && PRODUCTS.map((p) => {
            const qty = step5!.products[p.key];
            if (!qty) return null;
            return (
              <tr key={p.key}>
                <td className="ps-0 border-0">{p.label} ({qty} × {fmtYen(p.price)})</td>
                <td className="text-end border-0 fw-semibold">{fmtYen(qty * p.price)}</td>
              </tr>
            );
          })}
          <tr style={{ borderTop: "1px solid #a5d6a7" }}>
            <td className="ps-0 fw-bold">Tổng dự kiến</td>
            <td className="text-end fw-bold text-success" style={{ fontSize: compact ? 15 : 17 }}>
              {fmtYen(grandTotal)}
            </td>
          </tr>
        </tbody>
      </table>
      {step3.transport !== "bus" && step3.transport !== "own" && (
        <p className="text-muted mb-0 mt-1" style={{ fontSize: 12 }}>
          * Phí xe bus sẽ được tính thêm nếu bạn chọn xe ban tổ chức ở bước tiếp theo.
        </p>
      )}
    </div>
  );
};

// ─── Step 1: Thông tin cá nhân ────────────────────────────────────────────────

type Step1Errors = Partial<Record<keyof Step1, string>>;

const Step1Form: React.FC<{
  data: Step1;
  onChange: (patch: Partial<Step1>) => void;
  errors: Step1Errors;
}> = ({ data, onChange, errors }) => {
  const field = (
    label: string,
    name: keyof Step1,
    type = "text",
    placeholder = "",
    required = true
  ) => (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={data[name] as string}
        onChange={(e) => onChange({ [name]: e.target.value })}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <>
      <h5 className="mb-4 text-success fw-bold">Thông tin cá nhân</h5>

      {field("Địa chỉ Email", "email", "email", "example@email.com")}
      {field("Họ và tên", "name", "text", "Nguyễn Văn A")}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Giới tính <span className="text-danger">*</span>
        </label>
        <div className="d-flex gap-4">
          {(["Nam", "Nữ", "Khác"] as Gender[]).map((g) => (
            <div className="form-check" key={g}>
              <input
                className="form-check-input"
                type="radio"
                id={`gender-${g}`}
                checked={data.gender === g}
                onChange={() => onChange({ gender: g })}
              />
              <label className="form-check-label" htmlFor={`gender-${g}`}>{g}</label>
            </div>
          ))}
        </div>
        {errors.gender && (
          <div className="text-danger" style={{ fontSize: 13 }}>{errors.gender}</div>
        )}
      </div>

      {field("Tuổi", "age", "number", "25")}
      {field("Link Facebook", "facebook", "url", "https://facebook.com/yourprofile")}
      {field("Số điện thoại", "phone", "tel", "090-1234-5678")}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Số điện thoại liên lạc khẩn cấp <span className="text-danger">*</span>
        </label>
        <input
          type="tel"
          className={`form-control ${errors.emergency_phone ? "is-invalid" : ""}`}
          placeholder="090-9876-5432"
          value={data.emergency_phone}
          onChange={(e) => onChange({ emergency_phone: e.target.value })}
        />
        {errors.emergency_phone && (
          <div className="invalid-feedback">{errors.emergency_phone}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Quan hệ với người tham gia <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${errors.emergency_relation ? "is-invalid" : ""}`}
          placeholder="Vd: Bố/Mẹ, Vợ/Chồng, Anh/Chị..."
          value={data.emergency_relation}
          onChange={(e) => onChange({ emergency_relation: e.target.value })}
        />
        {errors.emergency_relation && (
          <div className="invalid-feedback">{errors.emergency_relation}</div>
        )}
      </div>

      <hr className="my-4" />
      <p className="text-muted fw-semibold mb-3" style={{ fontSize: 13 }}>
        Thông tin tùy chọn (không bắt buộc)
      </p>

      {field("Địa chỉ nhà", "address", "text", "Vd: 1-2-3 Shinjuku, Tokyo", false)}

      <div className="mb-3">
        <label className="form-label fw-semibold">Nhóm máu</label>
        <select
          className="form-control"
          value={data.blood_type}
          onChange={(e) => onChange({ blood_type: e.target.value })}
        >
          <option value="">-- Chọn nhóm máu --</option>
          {["A", "B", "AB", "O", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
            (bt) => (
              <option key={bt} value={bt}>{bt}</option>
            )
          )}
        </select>
      </div>
    </>
  );
};

// ─── Step 2: Hình thức đăng ký ────────────────────────────────────────────────

const Step2Form: React.FC<{
  data: Step2;
  onChange: (patch: Partial<Step2>) => void;
  errors: Partial<Record<string, string>>;
}> = ({ data, onChange, errors }) => {
  const updateMember = (index: number, patch: Partial<Member>) => {
    const updated = data.members.map((m, i) => (i === index ? { ...m, ...patch } : m));
    onChange({ members: updated });
  };
  const addMember = () => onChange({ members: [...data.members, emptyMember()] });
  const removeMember = (index: number) =>
    onChange({ members: data.members.filter((_, i) => i !== index) });

  return (
    <>
      <h5 className="mb-4 text-success fw-bold">Hình thức đăng ký</h5>

      <div className="mb-4">
        <label className="form-label fw-semibold">
          Hình thức <span className="text-danger">*</span>
        </label>
        <div className="d-flex flex-column gap-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="type-individual"
              checked={data.register_type === "individual"}
              onChange={() => onChange({ register_type: "individual", members: [] })}
            />
            <label className="form-check-label" htmlFor="type-individual">
              <strong>Cá nhân</strong> — Chỉ đăng ký cho bản thân
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="type-group"
              checked={data.register_type === "group"}
              onChange={() =>
                onChange({ register_type: "group", members: [emptyMember()] })
              }
            />
            <label className="form-check-label" htmlFor="type-group">
              <strong>Gia đình / Nhóm bạn</strong> — Đăng ký cùng nhiều người
            </label>
          </div>
        </div>
        {errors.register_type && (
          <div className="text-danger mt-1" style={{ fontSize: 13 }}>
            {errors.register_type}
          </div>
        )}
      </div>

      {data.register_type === "group" && (
        <div>
          <label className="form-label fw-semibold">
            Thành viên trong nhóm <span className="text-danger">*</span>
          </label>
          <p className="text-muted mb-3" style={{ fontSize: 13 }}>
            Nhập thông tin từng thành viên tham gia cùng (không bao gồm người đại diện đăng ký).
          </p>

          {data.members.map((member, i) => (
            <div
              key={i}
              className="border rounded p-3 mb-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong style={{ fontSize: 14 }}>Thành viên {i + 1}</strong>
                {data.members.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeMember(i)}
                  >
                    Xóa
                  </button>
                )}
              </div>
              <div className="row g-2">
                <div className="col-md-5">
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors[`member_${i}_name`] ? "is-invalid" : ""}`}
                    placeholder="Họ và tên *"
                    value={member.name}
                    onChange={(e) => updateMember(i, { name: e.target.value })}
                  />
                  {errors[`member_${i}_name`] && (
                    <div className="invalid-feedback">{errors[`member_${i}_name`]}</div>
                  )}
                </div>
                <div className="col-md-3">
                  <select
                    className={`form-control form-control-sm ${errors[`member_${i}_gender`] ? "is-invalid" : ""}`}
                    value={member.gender}
                    onChange={(e) => updateMember(i, { gender: e.target.value as Gender })}
                  >
                    <option value="">Giới tính *</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                  {errors[`member_${i}_gender`] && (
                    <div className="invalid-feedback">{errors[`member_${i}_gender`]}</div>
                  )}
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className={`form-control form-control-sm ${errors[`member_${i}_age`] ? "is-invalid" : ""}`}
                    placeholder="Tuổi *"
                    value={member.age}
                    onChange={(e) => updateMember(i, { age: e.target.value })}
                  />
                  {errors[`member_${i}_age`] && (
                    <div className="invalid-feedback">{errors[`member_${i}_age`]}</div>
                  )}
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors[`member_${i}_relation`] ? "is-invalid" : ""}`}
                    placeholder="Quan hệ với đại diện *"
                    value={member.relation}
                    onChange={(e) => updateMember(i, { relation: e.target.value })}
                  />
                  {errors[`member_${i}_relation`] && (
                    <div className="invalid-feedback">{errors[`member_${i}_relation`]}</div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={addMember}
          >
            + Thêm thành viên
          </button>
        </div>
      )}
    </>
  );
};

// ─── Step 3: Phương tiện di chuyển ───────────────────────────────────────────

const Step3Form: React.FC<{
  data: Step3;
  onChange: (patch: Partial<Step3>) => void;
  errors: Partial<Record<keyof Step3, string>>;
}> = ({ data, onChange, errors }) => (
  <>
    <h5 className="mb-4 text-success fw-bold">Phương tiện di chuyển</h5>

    <div className="mb-4">
      <label className="form-label fw-semibold">
        Phương tiện <span className="text-danger">*</span>
      </label>
      <div className="d-flex flex-column gap-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="transport-own"
            checked={data.transport === "own"}
            onChange={() => onChange({ transport: "own", bus_departure: "" })}
          />
          <label className="form-check-label" htmlFor="transport-own">
            <strong>Ô tô riêng / Phương tiện cá nhân</strong>
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="transport-bus"
            checked={data.transport === "bus"}
            onChange={() => onChange({ transport: "bus" })}
          />
          <label className="form-check-label" htmlFor="transport-bus">
            <strong>Xe bus Ban tổ chức</strong>
          </label>
        </div>
      </div>
      {errors.transport && (
        <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.transport}</div>
      )}
    </div>

    {data.transport === "bus" && (
      <div
        className="p-3 rounded border"
        style={{ backgroundColor: "#f0f7f0", borderColor: "#a5d6a7" }}
      >
        <label className="form-label fw-semibold">
          Nơi xuất phát <span className="text-danger">*</span>
        </label>
        <div className="d-flex gap-4">
          {(["Tokyo", "Nagoya", "Osaka"] as const).map((city) => (
            <div className="form-check" key={city}>
              <input
                className="form-check-input"
                type="radio"
                id={`bus-${city}`}
                checked={data.bus_departure === city}
                onChange={() => onChange({ bus_departure: city })}
              />
              <label className="form-check-label" htmlFor={`bus-${city}`}>{city}</label>
            </div>
          ))}
        </div>
        {errors.bus_departure && (
          <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.bus_departure}</div>
        )}
      </div>
    )}
  </>
);

// ─── Copy Button ─────────────────────────────────────────────────────────────

const CopyButton: React.FC<{
  text: string;
  label?: string;
  small?: boolean;
  dark?: boolean;
}> = ({ text, label = "Copy", small, dark }) => {
  const [copied, setCopied] = React.useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback cho môi trường không hỗ trợ clipboard API
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontSize: small ? 12 : 13,
        padding: small ? "2px 10px" : "5px 14px",
        borderRadius: 6,
        border: dark ? "1px solid rgba(255,255,255,0.4)" : "1px solid #4caf50",
        backgroundColor: copied
          ? (dark ? "rgba(255,255,255,0.25)" : "#e8f5e9")
          : "transparent",
        color: dark ? "#fff" : "#2e7d32",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "✓ Đã copy" : `📋 ${label}`}
    </button>
  );
};

// ─── Step 4: Chuyển khoản ────────────────────────────────────────────────────

const Step4PaymentForm: React.FC<{
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step5: Step5;
  reservation: { code: string; password: string } | null;
  data: Step4;
  onChange: (patch: Partial<Step4>) => void;
  errors: Partial<Record<string, string>>;
}> = ({ step1, step2, step3, step5, reservation, onChange, errors }) => {
  const [preview, setPreview] = React.useState<string>("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange({ receipt_file: file, receipt_url: "" });
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  return (
    <>
      <h5 className="mb-4 text-success fw-bold">Chuyển khoản</h5>

      {/* Nhắc nhở lưu code/password */}
      <div
        className="p-3 rounded mb-2"
        style={{ backgroundColor: "#1b5e20", color: "#fff" }}
      >
        <p className="fw-semibold mb-2" style={{ fontSize: 13 }}>
          ⚠️ Lưu lại thông tin này — dùng để tra cứu hoặc chỉnh sửa thông tin đăng ký
        </p>
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, textTransform: "uppercase", letterSpacing: 1 }}>Mã đăng ký</div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3 }}>
              {reservation?.code ?? "—"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, textTransform: "uppercase", letterSpacing: 1 }}>Mật khẩu</div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3 }}>
              {reservation?.password ?? "—"}
            </div>
          </div>
          {reservation && <CopyButton text={`Mã đăng ký: ${reservation.code}\nMật khẩu: ${reservation.password}`} label="Copy mã & mật khẩu" dark />}
        </div>
      </div>
      <p className="text-white rounded px-3 py-2 mb-4" style={{ backgroundColor: "#2e7d32", fontSize: 12 }}>
        Vui lòng lưu lại mã đăng ký và mật khẩu. Bạn sẽ cần dùng để tra cứu hoặc chỉnh sửa thông tin sau khi hoàn tất. Nếu quên, liên hệ ban tổ chức để được cấp lại.
      </p>

      {/* Cost breakdown */}
      <CostSummaryCard step1={step1} step2={step2} step3={step3} step5={step5} />
      <p className="text-muted mt-1 mb-4" style={{ fontSize: 12 }}>
        * Phí trên chỉ mang tính dự kiến, ban tổ chức sẽ xác nhận sau khi nhận đăng ký.
      </p>

      {/* Bank info */}
      <div
        className="p-3 rounded mb-4"
        style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082" }}
      >
        <h6 className="fw-bold mb-3">Thông tin chuyển khoản</h6>
        <ul className="mb-0" style={{ lineHeight: 2 }}>
          <li><strong>Ngân hàng:</strong> PayPay銀行 (PayPay Bank)</li>
          <li><strong>Số tài khoản:</strong> 店番 001 / 口座番号 1234567</li>
          <li><strong>Tên tài khoản:</strong> BAN CHAN XANH</li>
          <li>
            <strong>Nội dung CK:</strong>{" "}
            <span
              className="fw-bold px-2 py-1 rounded me-2"
              style={{ backgroundColor: "#fff3e0", color: "#e65100", fontSize: 15, letterSpacing: 1 }}
            >
              TRAO2026-{reservation?.code ?? "[Mã đăng ký]"}
            </span>
            {reservation && (
              <CopyButton text={`TRAO2026-${reservation.code}`} label="Copy" small />
            )}
          </li>
        </ul>
        <div className="mt-3 p-2 rounded text-danger" style={{ backgroundColor: "#ffebee", fontSize: 13 }}>
          ⚠️ Nhập đúng nội dung chuyển khoản ở trên — KHÔNG dùng họ tên — để ban tổ chức xác nhận nhanh chóng.
        </div>
      </div>

      {/* Upload */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Upload ảnh chụp màn hình chuyển khoản{" "}
          <span className="text-danger">*</span>
        </label>
        <input
          type="file"
          className={`form-control ${errors.receipt_file ? "is-invalid" : ""}`}
          accept="image/*"
          onChange={onFileChange}
        />
        {errors.receipt_file && (
          <div className="invalid-feedback">{errors.receipt_file}</div>
        )}
        <div className="form-text">
          Chấp nhận: JPG, PNG, HEIC, v.v. Dung lượng tối đa 10MB.
        </div>
        {preview && (
          <div className="mt-3">
            <p className="text-muted mb-1" style={{ fontSize: 13 }}>Xem trước:</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Receipt preview"
              style={{
                maxWidth: "100%",
                maxHeight: 320,
                borderRadius: 8,
                border: "1px solid #dee2e6",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

// ─── Step 5: Thông tin khác ───────────────────────────────────────────────────

const QtyControl: React.FC<{
  value: number;
  onChange: (n: number) => void;
  label: string;
  price: number;
}> = ({ value, onChange, label, price }) => (
  <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
    <div>
      <span className="fw-semibold" style={{ fontSize: 14 }}>{label}</span>
      <span className="text-muted ms-2" style={{ fontSize: 13 }}>{fmtYen(price)}</span>
    </div>
    <div className="d-flex align-items-center gap-2">
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary"
        style={{ width: 32, height: 32, padding: 0, lineHeight: 1 }}
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0}
      >−</button>
      <span style={{ minWidth: 24, textAlign: "center", fontWeight: 700, fontSize: 16 }}>{value}</span>
      <button
        type="button"
        className="btn btn-sm btn-outline-success"
        style={{ width: 32, height: 32, padding: 0, lineHeight: 1 }}
        onClick={() => onChange(value + 1)}
      >+</button>
      {value > 0 && (
        <span className="text-success fw-semibold ms-1" style={{ fontSize: 13, minWidth: 60 }}>
          = {fmtYen(value * price)}
        </span>
      )}
    </div>
  </div>
);

const Step5Form: React.FC<{
  data: Step5;
  onChange: (patch: Partial<Step5>) => void;
  errors: Partial<Record<string, string>>;
}> = ({ data, onChange, errors }) => {
  const toggleTeam = (team: string) => {
    const current = data.volunteer_teams ?? [];
    const next = current.includes(team)
      ? current.filter((t) => t !== team)
      : [...current, team];
    onChange({ volunteer_teams: next });
  };

  const productFee = data.want_products === "yes" ? calcProductFee(data.products) : 0;

  return (
    <>
      <h5 className="mb-4 text-success fw-bold">Thông tin khác</h5>

      {/* Dị ứng thực phẩm */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Dị ứng thực phẩm</label>
        <input
          type="text"
          className="form-control"
          placeholder="Vd: hải sản, đậu phộng... (để trống nếu không có)"
          value={data.food_allergy}
          onChange={(e) => onChange({ food_allergy: e.target.value })}
        />
        <div className="form-text">Giúp ban tổ chức chuẩn bị bữa ăn phù hợp.</div>
      </div>

      {/* Sản phẩm gây quỹ */}
      <div className="mb-4">
        <div
          className="p-3 rounded mb-3"
          style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082" }}
        >
          <p className="fw-bold mb-1" style={{ fontSize: 14 }}>
            BÁN KHĂN RẰN, KHĂN THỔ CẨM, TÚI TÒ TE GÂY QUỸ CŨNG LÀ MỘT HOẠT ĐỘNG TRONG DỰ ÁN BÀN CHÂN XANH.
          </p>
          <p className="mb-2" style={{ fontSize: 14 }}>
            BẠN CÓ MUỐN SỞ HỮU CÁC SẢN PHẨM CHO HÀNH TRÌNH TUYỆT VỜI NÀY KHÔNG?
          </p>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="products-no"
                checked={data.want_products === "no"}
                onChange={() => onChange({ want_products: "no" })}
              />
              <label className="form-check-label" htmlFor="products-no">Không</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="products-yes"
                checked={data.want_products === "yes"}
                onChange={() => onChange({ want_products: "yes" })}
              />
              <label className="form-check-label" htmlFor="products-yes">Có</label>
            </div>
          </div>
          {errors.want_products && (
            <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.want_products}</div>
          )}
        </div>

        {data.want_products === "yes" && (
          <div className="rounded p-3" style={{ border: "1px solid #ffe082", backgroundColor: "#fffde7" }}>
            {PRODUCTS.map((p) => (
              <QtyControl
                key={p.key}
                label={p.label}
                price={p.price}
                value={data.products[p.key]}
                onChange={(n) => onChange({ products: { ...data.products, [p.key]: n } })}
              />
            ))}
            {productFee > 0 && (
              <div className="d-flex justify-content-between pt-2 fw-bold">
                <span>Tổng sản phẩm</span>
                <span className="text-warning" style={{ fontSize: 16 }}>{fmtYen(productFee)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cộng tác viên */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Bạn có muốn tham gia làm cộng tác viên không?{" "}
          <span className="text-danger">*</span>
        </label>
        <div className="d-flex gap-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="volunteer-yes"
              checked={data.volunteer === "yes"}
              onChange={() => onChange({ volunteer: "yes" })}
            />
            <label className="form-check-label" htmlFor="volunteer-yes">Có, tôi muốn đóng góp</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="volunteer-no"
              checked={data.volunteer === "no"}
              onChange={() => onChange({ volunteer: "no", volunteer_teams: [] })}
            />
            <label className="form-check-label" htmlFor="volunteer-no">Không, cảm ơn</label>
          </div>
        </div>
        {errors.volunteer && (
          <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.volunteer}</div>
        )}

        {data.volunteer === "yes" && (
          <div
            className="mt-3 p-3 rounded"
            style={{ backgroundColor: "#f0f7f0", border: "1px solid #a5d6a7" }}
          >
            <p className="fw-semibold mb-2" style={{ fontSize: 13 }}>Bạn muốn tham gia team nào? (có thể chọn nhiều)</p>
            <div className="row g-2">
              {VOLUNTEER_TEAMS.map((team) => (
                <div className="col-6" key={team}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`team-${team}`}
                      checked={(data.volunteer_teams ?? []).includes(team)}
                      onChange={() => toggleTeam(team)}
                    />
                    <label className="form-check-label" htmlFor={`team-${team}`} style={{ fontSize: 14 }}>
                      {team}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ghi chú */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Lời nhắn / Ghi chú / Câu hỏi cho Ban tổ chức
        </label>
        <textarea
          className="form-control"
          rows={4}
          placeholder="Nhập lời nhắn, câu hỏi hoặc ghi chú..."
          value={data.note}
          onChange={(e) => onChange({ note: e.target.value })}
        />
      </div>

      {/* Ghi chú hình ảnh */}
      <div
        className="p-3 rounded"
        style={{ backgroundColor: "#f5f5f5", border: "1px solid #e0e0e0", fontSize: 13, color: "#555" }}
      >
        <strong>Ghi chú:</strong>
        <p className="mb-0 mt-1">
          BÀN CHÂN XANH có thể sẽ sử dụng hình ảnh của bạn trong sự kiện để truyền thông trên các nền tảng mạng xã hội.
          Nếu bạn không thích điều này có thể liên hệ trực tiếp với một trong những thành viên BTC tại sự kiện.
          Hoặc liên hệ qua fanpage cho chúng mình nhé!
        </p>
      </div>
    </>
  );
};

// ─── Step 6: Áo & Chỗ ngủ ────────────────────────────────────────────────────

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

const Step6Form: React.FC<{
  step1: Step1;
  step2: Step2;
  data: Step6;
  onChange: (patch: Partial<Step6>) => void;
  errors: Partial<Record<string, string>>;
}> = ({ step2, data, onChange, errors }) => {
  const updateParticipant = (index: number, patch: Partial<ParticipantExtra>) => {
    const updated = data.participants.map((p, i) =>
      i === index ? { ...p, ...patch } : p
    );
    onChange({ participants: updated });
  };

  return (
    <>
      <h5 className="mb-1 text-success fw-bold">Áo & Chỗ ngủ</h5>
      <div className="d-flex gap-3 mb-4" style={{ fontSize: 13 }}>
        <a href="/trao-2026-ao" target="_blank" className="text-success">
          📐 Xem bảng size & màu áo
        </a>
        <a href="/trao-2026-cabin" target="_blank" className="text-success">
          🏕️ Xem sơ đồ cabin
        </a>
      </div>

      {data.participants.map((p, i) => {
        const isRep = i === 0;
        return (
          <div
            key={i}
            className="rounded p-3 mb-3"
            style={{
              border: isRep ? "2px solid #4caf50" : "1px solid #dee2e6",
              backgroundColor: isRep ? "#f0f7f0" : "#fafafa",
            }}
          >
            {/* Header */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <strong>{p.name}</strong>
              {isRep ? (
                <span className="badge" style={{ backgroundColor: "#2e7d32", fontSize: 11 }}>
                  {step2.register_type === "individual" ? "Cá nhân" : "Đại diện"}
                </span>
              ) : (
                <span className="badge bg-secondary" style={{ fontSize: 11 }}>
                  Thành viên {i}
                </span>
              )}
            </div>

            <div className="row g-3">
              {/* Size áo */}
              <div className="col-6 col-md-3">
                <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
                  Size áo <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {SHIRT_SIZES.map((size) => (
                    <ToggleChip
                      key={size}
                      selected={p.shirt_size === size}
                      onClick={() => updateParticipant(i, { shirt_size: size })}
                    >
                      {size}
                    </ToggleChip>
                  ))}
                </div>
                {errors[`shirt_${i}`] && (
                  <div className="text-danger mt-1" style={{ fontSize: 12 }}>
                    {errors[`shirt_${i}`]}
                  </div>
                )}
              </div>

              {/* Màu áo */}
              <div className="col-6 col-md-4">
                <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
                  Màu áo <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {SHIRT_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      title={c.label}
                      onClick={() => updateParticipant(i, { shirt_color: c.value })}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: c.hex,
                        border: p.shirt_color === c.value
                          ? "3px solid #4caf50"
                          : `2px solid ${c.border ?? c.hex}`,
                        cursor: "pointer",
                        outline: p.shirt_color === c.value ? "2px solid #4caf50" : "none",
                        outlineOffset: 2,
                        transition: "all 0.15s",
                      }}
                    />
                  ))}
                </div>
                {p.shirt_color && (
                  <div style={{ fontSize: 12, marginTop: 4, color: "#555" }}>
                    {SHIRT_COLORS.find((c) => c.value === p.shirt_color)?.label}
                  </div>
                )}
                {errors[`color_${i}`] && (
                  <div className="text-danger mt-1" style={{ fontSize: 12 }}>
                    {errors[`color_${i}`]}
                  </div>
                )}
              </div>

              {/* Cabin */}
              <div className="col-12 col-md-5">
                <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
                  Cabin <span className="text-danger">*</span>
                </label>
                <div className="d-flex flex-wrap gap-1">
                  {CABIN_NUMBERS.map((n) => (
                    <ToggleChip
                      key={n}
                      selected={p.stay === String(n)}
                      onClick={() => updateParticipant(i, { stay: String(n) })}
                      style={{ padding: "3px 10px", minWidth: 40, textAlign: "center" }}
                    >
                      {n}
                    </ToggleChip>
                  ))}
                </div>
                {errors[`stay_${i}`] && (
                  <div className="text-danger mt-1" style={{ fontSize: 12 }}>
                    {errors[`stay_${i}`]}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const initialStep1: Step1 = {
  email: "",
  name: "",
  gender: "",
  age: "",
  facebook: "",
  phone: "",
  emergency_phone: "",
  emergency_relation: "",
  address: "",
  blood_type: "",
};

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [step1, setStep1] = React.useState<Step1>(initialStep1);
  const [step2, setStep2] = React.useState<Step2>({ register_type: "", members: [] });
  const [step3, setStep3] = React.useState<Step3>({ transport: "", bus_departure: "" });
  const [step4, setStep4] = React.useState<Step4>({ receipt_file: null, receipt_url: "" });
  const [reservation, setReservation] = React.useState<{ code: string; password: string } | null>(null);
  const [reserving, setReserving] = React.useState(false);
  const [step5, setStep5] = React.useState<Step5>({
    food_allergy: "",
    want_products: "",
    products: { khan_ran: 0, khan_tho_cam: 0, tui_to_te: 0 },
    volunteer: "",
    volunteer_teams: [],
    note: "",
  });
  const [step6, setStep6] = React.useState<Step6>({ participants: [] });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [allCodes, setAllCodes] = React.useState<{ rep: string; members: string[] } | null>(null);
  const [submitError, setSubmitError] = React.useState("");

  // Reserve code+password tự động khi bước sang trang Chuyển khoản
  React.useEffect(() => {
    if (currentStep !== 6 || reservation || reserving) return;
    let cancelled = false;
    setReserving(true);
    fetch("/api/trao-2026-reserve", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) {
          setReservation({ code: data.code, password: data.password });
        } else {
          setSubmitError(data.error ?? "Không thể tạo mã đăng ký. Vui lòng thử lại.");
        }
      })
      .catch(() => {
        if (!cancelled) setSubmitError("Không thể tạo mã đăng ký. Vui lòng kiểm tra kết nối.");
      })
      .finally(() => { if (!cancelled) setReserving(false); });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const TOTAL_STEPS = STEPS.length;

  // ── Validation ───────────────────────────────────────────────────────────────

  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step1.email.trim()) e.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1.email)) e.email = "Email không hợp lệ";
    if (!step1.name.trim()) e.name = "Vui lòng nhập họ và tên";
    if (!step1.gender) e.gender = "Vui lòng chọn giới tính";
    if (!step1.age.trim()) e.age = "Vui lòng nhập tuổi";
    else if (Number(step1.age) < 1 || Number(step1.age) > 120) e.age = "Tuổi không hợp lệ";
    if (!step1.facebook.trim()) e.facebook = "Vui lòng nhập link Facebook";
    if (!step1.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
    if (!step1.emergency_phone.trim()) e.emergency_phone = "Vui lòng nhập số điện thoại khẩn cấp";
    if (!step1.emergency_relation.trim()) e.emergency_relation = "Vui lòng nhập quan hệ";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step2.register_type) e.register_type = "Vui lòng chọn hình thức đăng ký";
    if (step2.register_type === "group") {
      step2.members.forEach((m, i) => {
        if (!m.name.trim()) e[`member_${i}_name`] = "Bắt buộc";
        if (!m.gender) e[`member_${i}_gender`] = "Bắt buộc";
        if (!m.age.trim()) e[`member_${i}_age`] = "Bắt buộc";
        else if (Number(m.age) < 1 || Number(m.age) > 120) e[`member_${i}_age`] = "Không hợp lệ";
        if (!m.relation.trim()) e[`member_${i}_relation`] = "Bắt buộc";
      });
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step3.transport) e.transport = "Vui lòng chọn phương tiện di chuyển";
    if (step3.transport === "bus" && !step3.bus_departure)
      e.bus_departure = "Vui lòng chọn nơi xuất phát";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Step 4 = Thông tin khác
  const validateStep4 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step5.want_products) e.want_products = "Vui lòng chọn một lựa chọn";
    if (!step5.volunteer) e.volunteer = "Vui lòng chọn một lựa chọn";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Step 5 = Áo & Chỗ ngủ
  const validateStep5 = (): boolean => {
    const e: Record<string, string> = {};
    step6.participants.forEach((p, i) => {
      if (!p.shirt_size) e[`shirt_${i}`] = "Vui lòng chọn size áo";
      if (!p.shirt_color) e[`color_${i}`] = "Vui lòng chọn màu áo";
      if (!p.stay) e[`stay_${i}`] = "Vui lòng chọn cabin";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Step 6 = Chuyển khoản
  const validateStep6 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step4.receipt_file) e.receipt_file = "Vui lòng upload ảnh chụp màn hình chuyển khoản";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Xây danh sách participants từ step1 + step2.members
  const buildParticipants = (): ParticipantExtra[] => {
    const all: ParticipantExtra[] = [
      { name: step1.name || "Người đại diện", shirt_size: "", shirt_color: "", stay: "" },
    ];
    if (step2.register_type === "group") {
      step2.members.forEach((m) =>
        all.push({ name: m.name || "Thành viên", shirt_size: "", shirt_color: "", stay: "" })
      );
    }
    return all;
  };

  // ── Navigation ────────────────────────────────────────────────────────────────

  const goNext = () => {
    let valid = false;
    if (currentStep === 1) valid = validateStep1();
    else if (currentStep === 2) valid = validateStep2();
    else if (currentStep === 3) valid = validateStep3();
    else if (currentStep === 4) valid = validateStep4();
    else if (currentStep === 5) valid = validateStep5();
    if (valid) {
      setErrors({});
      setSubmitError("");

      // Khi chuyển sang step 5 (Áo & Chỗ ngủ), sync danh sách participants
      if (currentStep === 4) {
        setStep6((prev) => {
          const fresh = buildParticipants();
          // Giữ lại shirt_size và stay nếu đã chọn trước đó
          const merged = fresh.map((p, i) => ({
            ...p,
            shirt_size: prev.participants[i]?.shirt_size ?? "",
            shirt_color: prev.participants[i]?.shirt_color ?? "",
            stay: prev.participants[i]?.stay ?? "",
          }));
          return { participants: merged };
        });
      }
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setErrors({});
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Submit ────────────────────────────────────────────────────────────────────

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep6()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      if (!reservation) throw new Error("Chưa có mã đăng ký. Vui lòng thử lại.");
      const code = reservation.code;
      const fees = calcFees(step1, step2, step3);

      // Chuyển file ảnh sang base64
      let receipt: { base64: string; mimeType: string; filename: string } | null = null;
      if (step4.receipt_file) {
        const file = step4.receipt_file;
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        receipt = { base64, mimeType: file.type, filename: `${code}_${file.name}` };
      }

      const formData = {
        code,
        email: step1.email.trim(),
        name: step1.name.trim(),
        gender: step1.gender,
        age: Number(step1.age),
        facebook: step1.facebook.trim(),
        phone: step1.phone.trim(),
        emergency_phone: step1.emergency_phone.trim(),
        emergency_relation: step1.emergency_relation.trim(),
        address: step1.address.trim() || null,
        blood_type: step1.blood_type || null,
        register_type: step2.register_type,
        members: step2.members,
        num_person: fees.total_people,
        transport: step3.transport,
        bus_departure: step3.bus_departure || null,
        fee_event: fees.event_fee,
        fee_bus: fees.bus_fee,
        fee_total: fees.total,
        food_allergy: step5.food_allergy.trim() || null,
        want_products: step5.want_products,
        products: step5.want_products === "yes" ? step5.products : null,
        product_fee: step5.want_products === "yes" ? calcProductFee(step5.products) : 0,
        volunteer: step5.volunteer,
        volunteer_teams: step5.volunteer === "yes" ? step5.volunteer_teams : [],
        note: step5.note.trim() || null,
        participants: step6.participants,
        password: reservation.password,
      };

      const res = await fetch("/api/trao-2026-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, receipt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Lỗi không xác định");

      setAllCodes({ rep: data.repCode, members: data.memberCodes ?? [] });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi khi gửi thông tin.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success Screen ─────────────────────────────────────────────────────────────

  if (allCodes) {
    const fees = calcFees(step1, step2, step3);
    const allMembers = step2.register_type === "group" ? step2.members : [];

    return (
      <section className="wpo-about-section-s2 section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-10 col-12 text-center">
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <h3 className="text-success fw-bold">Đăng ký thành công!</h3>
              <p className="text-muted">
                Xin chào <strong>{step1.name}</strong>, thông tin của bạn đã được ghi nhận.
              </p>

              {/* Bảng mã đăng ký */}
              <div
                className="p-3 my-4 rounded text-start"
                style={{ backgroundColor: "#f0f7f0", border: "2px dashed #4caf50" }}
              >
                <p className="fw-bold mb-2 text-center" style={{ fontSize: 15 }}>
                  Mã đăng ký của từng người tham gia
                </p>
                <table className="table table-sm mb-0">
                  <thead>
                    <tr style={{ backgroundColor: "#c8e6c9" }}>
                      <th>Họ tên</th>
                      <th>Vai trò</th>
                      <th className="text-success fw-bold">Mã đăng ký</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{step1.name}</td>
                      <td>
                        <span className="badge" style={{ backgroundColor: "#2e7d32" }}>
                          {step2.register_type === "individual" ? "Cá nhân" : "Đại diện"}
                        </span>
                      </td>
                      <td className="fw-bold text-success" style={{ letterSpacing: 2 }}>
                        {allCodes.rep}
                      </td>
                    </tr>
                    {allMembers.map((m, i) => (
                      <tr key={i}>
                        <td>{m.name}</td>
                        <td>
                          <span className="badge bg-secondary">Thành viên</span>
                        </td>
                        <td className="fw-bold text-success" style={{ letterSpacing: 2 }}>
                          {allCodes.members[i]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tóm tắt */}
              <div
                className="p-3 rounded text-start mb-4"
                style={{ backgroundColor: "#f8f9fa", fontSize: 14 }}
              >
                <p className="mb-1 fw-semibold">Tóm tắt đăng ký:</p>
                <ul className="mb-0">
                  <li>
                    Số người: {fees.total_people} ({fees.adults} người lớn
                    {fees.children > 0 ? `, ${fees.children} trẻ em` : ""})
                  </li>
                  <li>
                    Phương tiện:{" "}
                    {step3.transport === "bus"
                      ? `Xe bus BTC (${step3.bus_departure})`
                      : "Tự túc"}
                  </li>
                  <li>
                    Tổng phí dự kiến:{" "}
                    <strong className="text-success">{fmtYen(fees.total)}</strong>
                  </li>
                </ul>
              </div>

              <p style={{ fontSize: 14 }} className="text-muted">
                Vui lòng <strong>lưu lại các mã đăng ký</strong> trên. Ban tổ chức sẽ
                liên hệ qua Facebook hoặc số điện thoại để xác nhận và hướng dẫn các
                bước tiếp theo.
              </p>
              <p className="text-muted" style={{ fontSize: 12 }}>
                Liên hệ: <a href="https://www.facebook.com/banchanxanhjp" target="_blank" rel="noopener noreferrer">Fanpage Bàn Chân Xanh</a>
              </p>
              <div className="mt-4">
                <a href="/" className="btn btn-success px-4">
                  ← Về trang chủ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────────

  return (
    <Fragment>
      <section className="wpo-about-section-s2 section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-10 col-12">
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
                <h2 className="mt-1">ĐĂNG KÝ TRAO 2026</h2>
              </div>

              <ProgressBar current={currentStep} />

              <div
                className="p-4 rounded shadow-sm"
                style={{ backgroundColor: "#fff", border: "1px solid #e8f5e9" }}
              >
                <form onSubmit={onSubmit} noValidate>
                  {currentStep === 1 && (
                    <Step1Form
                      data={step1}
                      onChange={(patch) => setStep1((p) => ({ ...p, ...patch }))}
                      errors={errors}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2Form
                      data={step2}
                      onChange={(patch) => setStep2((p) => ({ ...p, ...patch }))}
                      errors={errors}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3Form
                      data={step3}
                      onChange={(patch) => setStep3((p) => ({ ...p, ...patch }))}
                      errors={errors}
                    />
                  )}
                  {/* Bước 4: Thông tin khác */}
                  {currentStep === 4 && (
                    <Step5Form
                      data={step5}
                      onChange={(patch) => setStep5((p) => ({ ...p, ...patch }))}
                      errors={errors}
                    />
                  )}

                  {/* Bước 5: Áo & Chỗ ngủ */}
                  {currentStep === 5 && (
                    <Step6Form
                      step1={step1}
                      step2={step2}
                      data={step6}
                      onChange={(patch) => setStep6((p) => ({ ...p, ...patch }))}
                      errors={errors}
                    />
                  )}

                  {/* Bước 6: Chuyển khoản */}
                  {currentStep === 6 && (
                    reserving ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-success mb-3" />
                        <p className="text-muted">Đang tạo mã đăng ký...</p>
                      </div>
                    ) : (
                      <Step4PaymentForm
                        step1={step1}
                        step2={step2}
                        step3={step3}
                        step5={step5}
                        reservation={reservation}
                        data={step4}
                        onChange={(patch) => setStep4((p) => ({ ...p, ...patch }))}
                        errors={errors}
                      />
                    )
                  )}

                  {(currentStep === 2 || currentStep === 3) && (
                    <CostSummaryCard
                      step1={step1}
                      step2={step2}
                      step3={step3}
                      compact
                    />
                  )}
                  {currentStep === 4 && (
                    <CostSummaryCard
                      step1={step1}
                      step2={step2}
                      step3={step3}
                      step5={step5}
                      compact
                    />
                  )}

                  {submitError && (
                    <div className="alert alert-danger mt-3">{submitError}</div>
                  )}

                  <div className="d-flex justify-content-between mt-4">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={goBack}
                      >
                        ← Quay lại
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < TOTAL_STEPS ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={goNext}
                      >
                        Tiếp theo →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Đang gửi...
                          </>
                        ) : (
                          "Hoàn tất đăng ký"
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <p className="text-center text-muted mt-3" style={{ fontSize: 12 }}>
                Mọi thắc mắc liên hệ: <a href="https://www.facebook.com/banchanxanhjp" target="_blank" rel="noopener noreferrer">Fanpage Bàn Chân Xanh</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default RegisterPage;
