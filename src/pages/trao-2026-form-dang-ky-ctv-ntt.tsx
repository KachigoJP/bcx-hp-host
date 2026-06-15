import React, { Fragment } from "react";
import {
  Step1Form,
  Step3Form,
  Step5Form,
  Step6Form,
} from "../components/trao2026";
import CopyButton from "../components/trao2026/CopyButton";
import {
  buildParticipants,
  calcProductFee,
  fmtYen,
} from "../components/trao2026/helpers";
import type {
  CabinInfo,
  Step1,
  Step3,
  Step5,
  Step6,
} from "../components/trao2026/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "ctv" | "ntt" | "";

const STEPS = [
  "Thông tin cá nhân",
  "Vai trò",
  "Phương tiện",
  "Thông tin khác",
  "Áo & Chỗ ngủ",
  "Xác nhận",
];

// ─── Fee helpers ─────────────────────────────────────────────────────────────

const FEE_ADULT = 16500;
const FEE_CHILD = 8000;
const FEE_BUS_TOKYO = 7000;
const FEE_BUS_OTHER = 9000;

function calcNormalEventFee(age: number): number {
  if (age < 6) return 0;
  if (age <= 12) return FEE_CHILD;
  return FEE_ADULT;
}

function calcFeesForRole(step1: Step1, step3: Step3, role: Role) {
  const age = Number(step1.age) || 0;
  const normalFee = calcNormalEventFee(age);
  const eventFee =
    role === "ntt" ? 0 : role === "ctv" ? Math.floor(normalFee / 2) : normalFee;
  const feePerBus =
    step3.bus_departure === "Tokyo" ? FEE_BUS_TOKYO : FEE_BUS_OTHER;
  const busFee = step3.transport === "bus" ? feePerBus : 0;
  return {
    normal_fee: normalFee,
    event_fee: eventFee,
    bus_fee: busFee,
    total: eventFee + busFee,
  };
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

const ProgressBarCustom: React.FC<{ current: number }> = ({ current }) => (
  <div className="mb-5">
    <div className="d-flex justify-content-between align-items-start mb-2">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div
            key={step}
            className="text-center"
            style={{ flex: 1, position: "relative" }}
          >
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
                backgroundColor: done
                  ? "#2e7d32"
                  : active
                    ? "#4caf50"
                    : "#dee2e6",
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

// ─── Role picker (step 2) ────────────────────────────────────────────────────

const RolePicker: React.FC<{
  role: Role;
  onChange: (r: Role) => void;
  error?: string;
}> = ({ role, onChange, error }) => (
  <div>
    <h5 className="mb-3 text-success fw-bold">Vai trò của bạn</h5>
    <p style={{ fontSize: 14, color: "#555" }}>
      Vui lòng chọn đúng vai trò. Ban tổ chức sẽ xác nhận sau khi nhận đăng ký.
    </p>

    {[
      {
        value: "ctv" as const,
        label: "Cộng tác viên (CTV)",
        icon: "🤝",
        badge: "Giảm 50% phí sự kiện",
        badgeColor: "#e65100",
        badgeBg: "#fff3e0",
        desc: "Bạn là cộng tác viên tích cực của Bàn Chân Xanh và đăng ký hỗ trợ tổ chức TRAO 2026. Phí sự kiện được giảm 50%. Phí xe bus (nếu có) tính như người tham gia.",
      },
      {
        value: "ntt" as const,
        label: "Nhà tài trợ (NTT)",
        icon: "⭐",
        badge: "Miễn phí tham gia",
        badgeColor: "#1b5e20",
        badgeBg: "#e8f5e9",
        desc: "Bạn là nhà tài trợ của TRAO 2026. Phí sự kiện được miễn hoàn toàn. Phí xe bus (nếu có) tính riêng.",
      },
    ].map((opt) => (
      <label
        key={opt.value}
        className="d-flex align-items-start gap-3 p-3 rounded mb-3"
        style={{
          cursor: "pointer",
          backgroundColor: role === opt.value ? "#f0f7f0" : "#fff",
          border: `2px solid ${role === opt.value ? "#4caf50" : "#dee2e6"}`,
          transition: "all .15s",
        }}
      >
        <input
          type="radio"
          name="role"
          value={opt.value}
          checked={role === opt.value}
          onChange={() => onChange(opt.value)}
          style={{ marginTop: 4, accentColor: "#4caf50", flexShrink: 0 }}
        />
        <div>
          <div className="fw-bold" style={{ fontSize: 16 }}>
            {opt.icon} {opt.label}
          </div>
          <span
            className="badge mt-1 mb-2"
            style={{
              backgroundColor: opt.badgeBg,
              color: opt.badgeColor,
              fontSize: 12,
              fontWeight: 700,
              border: `1px solid ${opt.badgeColor}`,
            }}
          >
            {opt.badge}
          </span>
          <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
            {opt.desc}
          </div>
        </div>
      </label>
    ))}

    {error && (
      <div className="text-danger mt-1" style={{ fontSize: 13 }}>
        {error}
      </div>
    )}
  </div>
);

// ─── Payment / Confirm step (step 6) ─────────────────────────────────────────

const ConfirmStep: React.FC<{
  step1: Step1;
  step3: Step3;
  step5: Step5;
  role: Role;
  reservation: { code: string; password: string } | null;
  paymentTiming: string;
  setPaymentTiming: (v: string) => void;
  receiptFile: File | null;
  setReceiptFile: (f: File | null) => void;
  receiptPreview: string;
  setReceiptPreview: (s: string) => void;
  donation: string;
  setDonation: (s: string) => void;
  errors: Record<string, string>;
}> = ({
  step1,
  step3,
  step5,
  role,
  reservation,
  paymentTiming,
  setPaymentTiming,
  receiptFile,
  setReceiptFile,
  receiptPreview,
  setReceiptPreview,
  donation,
  setDonation,
  errors,
}) => {
  const fees = calcFeesForRole(step1, step3, role);
  const productFee =
    step5.want_products === "yes" ? calcProductFee(step5.products) : 0;
  const isFree = fees.total === 0;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <h5 className="mb-3 text-success fw-bold">Xác nhận đăng ký</h5>

      {/* Mã đăng ký & mật khẩu */}
      <div
        className="p-3 rounded mb-3"
        style={{ backgroundColor: "#1b5e20", color: "#fff" }}
      >
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.7,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Mã đăng ký
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3 }}>
              {reservation?.code ?? "—"}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.7,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Mật khẩu
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3 }}>
              {reservation?.password ?? "—"}
            </div>
          </div>
          {reservation && (
            <CopyButton
              text={`Mã đăng ký: ${reservation.code}\nMật khẩu: ${reservation.password}`}
              label="Copy mã & mật khẩu"
              dark
            />
          )}
        </div>
      </div>
      <p
        className="text-white rounded px-3 py-2 mb-4"
        style={{ backgroundColor: "#2e7d32", fontSize: 12 }}
      >
        Mã đăng ký và mật khẩu sẽ được gửi tới email của bạn. Bạn sẽ cần dùng
        thông tin này để tra cứu/chỉnh sửa áo/cabin hoặc upload ảnh chuyển
        khoản. Nếu quên, liên hệ ban tổ chức để được cấp lại.
      </p>

      {/* Phí */}
      <div
        className="rounded p-3 mb-4"
        style={{ backgroundColor: "#f0f7f0", border: "1px solid #a5d6a7" }}
      >
        <p
          className="fw-semibold mb-2"
          style={{ fontSize: 14, color: "#1b5e20" }}
        >
          Chi tiết phí tham gia
        </p>
        <table className="table table-sm mb-0" style={{ fontSize: 14 }}>
          <tbody>
            <tr>
              <td style={{ color: "#555" }}>
                Phí sự kiện{" "}
                {role === "ctv" && (
                  <span style={{ color: "#e65100", fontSize: 12 }}>
                    (giảm 50%, gốc {fmtYen(fees.normal_fee)})
                  </span>
                )}
                {role === "ntt" && (
                  <span style={{ color: "#2e7d32", fontSize: 12 }}>
                    (miễn phí — NTT)
                  </span>
                )}
              </td>
              <td className="text-end fw-semibold">{fmtYen(fees.event_fee)}</td>
            </tr>
            {fees.bus_fee > 0 && (
              <tr>
                <td style={{ color: "#555" }}>
                  Phí xe bus ({step3.bus_departure})
                </td>
                <td className="text-end fw-semibold">{fmtYen(fees.bus_fee)}</td>
              </tr>
            )}
            {productFee > 0 && (
              <tr>
                <td style={{ color: "#555" }}>Phí sản phẩm</td>
                <td className="text-end fw-semibold">{fmtYen(productFee)}</td>
              </tr>
            )}
            <tr style={{ backgroundColor: "#e8f5e9" }}>
              <td className="fw-bold" style={{ color: "#1b5e20" }}>
                Tổng phí
              </td>
              <td
                className="text-end fw-bold"
                style={{ color: "#1b5e20", fontSize: 16 }}
              >
                {fmtYen(fees.total + productFee)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {isFree ? (
        <div
          className="rounded p-3 mb-4 text-center"
          style={{ backgroundColor: "#e8f5e9", border: "2px solid #4caf50" }}
        >
          <div style={{ fontSize: 32, marginBottom: 6 }}>🎉</div>
          <p
            className="fw-bold mb-1"
            style={{ color: "#1b5e20", fontSize: 16 }}
          >
            Miễn phí tham gia!
          </p>
          <p style={{ color: "#555", fontSize: 13, margin: 0 }}>
            Với vai trò Nhà tài trợ, bạn không cần chuyển khoản phí sự kiện.
            Nhấn <strong>Hoàn tất đăng ký</strong> để xác nhận.
          </p>
        </div>
      ) : (
        <>
          {/* Chọn thời điểm chuyển khoản */}
          <div
            className="rounded p-3 mb-4"
            style={{ backgroundColor: "#f0f7f0", border: "1px solid #c8e6c9" }}
          >
            <div
              className="fw-semibold mb-2"
              style={{ fontSize: 14, color: "#1b5e20" }}
            >
              Bạn muốn chuyển khoản khi nào?
            </div>
            {[
              {
                value: "now",
                label: "Chuyển khoản ngay",
                desc: "Upload ảnh chụp màn hình chuyển khoản để hoàn tất đăng ký.",
                icon: "✅",
              },
              {
                value: "later",
                label: "Chuyển khoản sau (trong vòng 24h)",
                desc: "Vào trang tra cứu để upload ảnh trong vòng 24 giờ. Sau 24h, đăng ký sẽ hết hạn.",
                icon: "⏳",
              },
            ].map((opt) => (
              <label
                key={opt.value}
                className="d-flex align-items-start gap-3 p-3 rounded mb-2"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    paymentTiming === opt.value ? "#e8f5e9" : "#fff",
                  border: `2px solid ${paymentTiming === opt.value ? "#4caf50" : "#dee2e6"}`,
                  transition: "all .15s",
                }}
              >
                <input
                  type="radio"
                  name="payment_timing"
                  value={opt.value}
                  checked={paymentTiming === opt.value}
                  onChange={() => {
                    setPaymentTiming(opt.value);
                    setReceiptFile(null);
                    setReceiptPreview("");
                  }}
                  style={{ marginTop: 3, accentColor: "#4caf50" }}
                />
                <div>
                  <div className="fw-semibold" style={{ fontSize: 14 }}>
                    {opt.icon} {opt.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>
                    {opt.desc}
                  </div>
                </div>
              </label>
            ))}
            {errors.payment_timing && (
              <div className="text-danger mt-1" style={{ fontSize: 13 }}>
                {errors.payment_timing}
              </div>
            )}
          </div>

          {/* Thông tin chuyển khoản */}
          <div
            className="p-3 rounded mb-4"
            style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082" }}
          >
            <h6 className="fw-bold mb-3">Thông tin chuyển khoản</h6>
            <ul className="mb-0" style={{ lineHeight: 2 }}>
              <li>
                <strong>Ngân hàng:</strong> 住信ＳＢＩネット銀行(0038) スミシン
                SBI 銀行 (Sumishin SBI netbank)
              </li>
              <li>
                <strong>Số tài khoản:</strong> バナナ支店(107) / 口座番号
                普通　7615757
              </li>
              <li>
                <strong>Tên tài khoản:</strong>{" "}
                ＴＲＡＮ　ＶＡＮ　ＧＩＡＮＧ（トラン　ヴアンジヤン）
              </li>
              <li>
                <strong>Nội dung CK:</strong>{" "}
                <span
                  className="fw-bold px-2 py-1 rounded me-2"
                  style={{
                    backgroundColor: "#fff3e0",
                    color: "#e65100",
                    fontSize: 15,
                    letterSpacing: 1,
                  }}
                >
                  TRAO2026-{reservation?.code ?? "[Mã đăng ký]"}
                </span>
                {reservation && (
                  <CopyButton
                    text={`TRAO2026-${reservation.code}`}
                    label="Copy"
                    small
                  />
                )}
              </li>
            </ul>
            <div
              className="mt-3 p-2 rounded text-danger"
              style={{ backgroundColor: "#ffebee", fontSize: 13 }}
            >
              ⚠️ Vui lòng nhập đúng nội dung chuyển khoản ở trên, KHÔNG dùng họ
              tên, để ban tổ chức xác nhận nhanh chóng.
            </div>
          </div>

          {paymentTiming === "later" && (
            <div
              className="rounded p-3 mb-3"
              style={{
                backgroundColor: "#fff8e1",
                border: "1px solid #ffe082",
              }}
            >
              <p className="mb-0" style={{ fontSize: 13, color: "#e65100" }}>
                ⏳ Bạn đã chọn chuyển khoản sau. Sau khi đăng ký, vào trang{" "}
                <strong>Tra cứu thông tin đăng ký</strong> để upload ảnh chuyển
                khoản trong vòng 24 giờ. Sau 24 giờ, đăng ký sẽ{" "}
                <strong>tự động hết hạn</strong>.
              </p>
            </div>
          )}

          {paymentTiming === "now" && (
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
              {receiptPreview && (
                <div className="mt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={receiptPreview}
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
          )}
        </>
      )}

      {/* Quyên góp */}
      <div
        className="rounded p-3 mb-3"
        style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082" }}
      >
        <div
          className="fw-semibold mb-1"
          style={{ fontSize: 14, color: "#e65100" }}
        >
          ❤️ TRAO — Hoạt động gây quỹ thiện nguyện
        </div>
        <p
          className="mb-2"
          style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}
        >
          TRAO không chỉ là sự kiện hội ngộ — đây còn là dịp để cộng đồng Bàn
          Chân Xanh cùng nhau gây quỹ hỗ trợ các hoạt động thiện nguyện: trao
          học bổng, xây trường, hỗ trợ đồng bào tại Việt Nam.
        </p>
        <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
          Số tiền quyên góp (¥) — tùy tâm, không bắt buộc
        </label>
        <div className="input-group" style={{ maxWidth: 220 }}>
          <input
            type="number"
            className="form-control"
            placeholder="0"
            min={0}
            step={100}
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
          />
          <span className="input-group-text">¥</span>
        </div>
        {Number(donation) > 0 && (
          <div className="mt-2" style={{ fontSize: 13, color: "#2e7d32" }}>
            🙏 Cảm ơn bạn đã đóng góp{" "}
            <strong>{Number(donation).toLocaleString("ja-JP")} ¥</strong> cho
            quỹ thiện nguyện!
          </div>
        )}
      </div>
    </>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const initialStep1: Step1 = {
  email: "",
  name: "",
  gender: "",
  age: "",
  disabled: false,
  facebook: "https://facebook.com/",
  phone: "",
  emergency_phone: "",
  emergency_relation: "",
  address: "",
  blood_type: "",
  food_allergy: "",
};

const STEP2_INDIVIDUAL = { register_type: "individual" as const, members: [] };

const RegisterCtvNttPage: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [step1, setStep1] = React.useState<Step1>(initialStep1);
  const [role, setRole] = React.useState<Role>("");
  const [step3, setStep3] = React.useState<Step3>({
    transport: "",
    bus_departure: "",
  });
  const [step5, setStep5] = React.useState<Step5>({
    food_allergy: "",
    want_products: "",
    products: { khan_ran: 0, khan_tho_cam: 0, tui_to_te: 0 },
    volunteer: "",
    volunteer_teams: [],
    note: "",
  });
  const [step6, setStep6] = React.useState<Step6>({ participants: [] });
  const [cabins, setCabins] = React.useState<CabinInfo[]>([]);
  const [loadingCabins, setLoadingCabins] = React.useState(false);

  const [reservation, setReservation] = React.useState<{
    code: string;
    password: string;
  } | null>(null);
  const [reserving, setReserving] = React.useState(false);

  const [paymentTiming, setPaymentTiming] = React.useState("");
  const [receiptFile, setReceiptFile] = React.useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = React.useState("");
  const [donation, setDonation] = React.useState("");

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [confirmContact, setConfirmContact] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [repCode, setRepCode] = React.useState("");

  const clearError = React.useCallback((key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  // Reserve code when entering step 6
  React.useEffect(() => {
    if (currentStep !== 6 || reservation || reserving) return;
    let cancelled = false;
    setReserving(true);
    fetch("/api/trao-2026-reserve", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok)
          setReservation({ code: data.code, password: data.password });
        else setSubmitError(data.error ?? "Không thể tạo mã đăng ký.");
      })
      .catch(() => {
        if (!cancelled)
          setSubmitError(
            "Không thể tạo mã đăng ký. Vui lòng kiểm tra kết nối.",
          );
      })
      .finally(() => {
        if (!cancelled) setReserving(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, reservation]);

  // Fetch cabins when entering step 5
  React.useEffect(() => {
    if (currentStep !== 5) return;
    setLoadingCabins(true);
    fetch("/api/trao-2026-cabins")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setCabins(data.cabins);
      })
      .catch(() => {})
      .finally(() => setLoadingCabins(false));
  }, [currentStep]);

  // ── Validation ──────────────────────────────────────────────────────────────

  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step1.email.trim()) e.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1.email))
      e.email = "Email không hợp lệ";
    if (!step1.name.trim()) e.name = "Vui lòng nhập họ và tên";
    if (!step1.gender) e.gender = "Vui lòng chọn giới tính";
    if (!step1.age.trim()) e.age = "Vui lòng nhập tuổi";
    else if (Number(step1.age) < 1 || Number(step1.age) > 120)
      e.age = "Tuổi không hợp lệ";
    if (!step1.facebook.trim()) e.facebook = "Vui lòng nhập link Facebook";
    else if (
      !/^https?:\/\/(www\.)?(facebook\.com|fb\.com)\/.+/i.test(
        step1.facebook.trim(),
      )
    )
      e.facebook =
        "Vui lòng nhập đúng link Facebook (bắt đầu bằng https://facebook.com/...)";
    if (!step1.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[\d\s\-\+\(\)]{7,20}$/.test(step1.phone.trim()))
      e.phone = "Số điện thoại không hợp lệ";
    if (!step1.emergency_phone.trim())
      e.emergency_phone = "Vui lòng nhập số điện thoại khẩn cấp";
    else if (!/^[\d\s\-\+\(\)]{7,20}$/.test(step1.emergency_phone.trim()))
      e.emergency_phone = "Số điện thoại không hợp lệ";
    if (!step1.emergency_relation.trim())
      e.emergency_relation = "Vui lòng nhập quan hệ";
    if (!confirmContact)
      e.confirmContact = "Vui lòng xác nhận email và Facebook đã chính xác";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Record<string, string> = {};
    if (!role) e.role = "Vui lòng chọn vai trò";
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

  const validateStep4 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step5.want_products) e.want_products = "Vui lòng chọn một lựa chọn";
    if (!step5.volunteer) e.volunteer = "Vui lòng chọn một lựa chọn";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

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

  const validateStep6 = (): boolean => {
    const e: Record<string, string> = {};
    const fees = calcFeesForRole(step1, step3, role);
    if (fees.total > 0) {
      if (!paymentTiming)
        e.payment_timing =
          "Mã đăng ký có hiệu lực trong vòng 24 giờ. Vui lòng chọn hình thức thanh toán.";
      else if (paymentTiming === "now" && !receiptFile)
        e.receipt_file = "Vui lòng upload ảnh chụp màn hình chuyển khoản";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Navigation ───────────────────────────────────────────────────────────────

  const goNext = () => {
    const valid =
      currentStep === 1
        ? validateStep1()
        : currentStep === 2
          ? validateStep2()
          : currentStep === 3
            ? validateStep3()
            : currentStep === 4
              ? validateStep4()
              : currentStep === 5
                ? validateStep5()
                : true;
    if (!valid) return;
    setErrors({});
    setSubmitError("");
    if (currentStep === 4) {
      setStep6(() => {
        const fresh = buildParticipants(step1, STEP2_INDIVIDUAL);
        return {
          participants: fresh.map((p) => ({
            ...p,
            shirt_size: "",
            shirt_color: "",
            stay: "",
          })),
        };
      });
    }
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    if (currentStep === 6) {
      setPaymentTiming("");
      setReceiptFile(null);
      setReceiptPreview("");
    }
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
      if (!reservation)
        throw new Error("Chưa có mã đăng ký. Vui lòng thử lại.");
      const code = reservation.code;
      const fees = calcFeesForRole(step1, step3, role);
      const productFee =
        step5.want_products === "yes" ? calcProductFee(step5.products) : 0;

      let receipt: {
        base64: string;
        mimeType: string;
        filename: string;
      } | null = null;
      if (receiptFile) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve((reader.result as string).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(receiptFile);
        });
        receipt = {
          base64,
          mimeType: receiptFile.type,
          filename: `${code}_${receiptFile.name}`,
        };
      }

      const participant = step6.participants[0] ?? {
        shirt_size: "",
        shirt_color: "",
        stay: "",
      };

      const formData = {
        code,
        role,
        email: step1.email.trim(),
        name: step1.name.trim(),
        gender: step1.gender,
        age: Number(step1.age),
        disabled: step1.disabled,
        facebook: step1.facebook.trim(),
        phone: step1.phone.trim(),
        emergency_phone: step1.emergency_phone.trim(),
        emergency_relation: step1.emergency_relation.trim(),
        address: step1.address.trim() || null,
        blood_type: step1.blood_type || null,
        transport: step3.transport,
        bus_departure: step3.bus_departure || null,
        fee_event: fees.event_fee,
        fee_bus: fees.bus_fee,
        fee_total: fees.total,
        donation: Number(donation) || 0,
        food_allergy: step1.food_allergy.trim() || null,
        want_products: step5.want_products,
        products: step5.want_products === "yes" ? step5.products : null,
        product_fee: productFee,
        volunteer: step5.volunteer,
        volunteer_teams: step5.volunteer === "yes" ? step5.volunteer_teams : [],
        note: step5.note.trim() || null,
        participant,
        password: reservation.password,
        payment_timing: fees.total === 0 ? "free" : paymentTiming,
      };

      const res = await fetch("/api/trao-2026-register-ctv-ntt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, receipt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Lỗi không xác định");
      setRepCode(data.repCode);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi gửi thông tin.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────────

  if (repCode) {
    const roleLabel =
      role === "ctv" ? "Cộng tác viên (CTV)" : "Nhà tài trợ (NTT)";
    const fees = calcFeesForRole(step1, step3, role);

    return (
      <Fragment>
        <section className="wpo-about-section-s2 section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-10 col-12 text-center">
                <div style={{ fontSize: 56, marginBottom: 8 }}>🎉</div>
                <h3 className="text-success fw-bold">Đăng ký thành công!</h3>
                <p className="text-muted">
                  Xin chào <strong>{step1.name}</strong> — cảm ơn bạn đã tham
                  gia TRAO 2026 với vai trò <strong>{roleLabel}</strong>!
                </p>

                <div
                  className="p-3 my-4 rounded text-start"
                  style={{
                    backgroundColor: "#f0f7f0",
                    border: "2px dashed #4caf50",
                  }}
                >
                  <p
                    className="fw-bold mb-3 text-center"
                    style={{ fontSize: 15 }}
                  >
                    Thông tin đăng ký của bạn
                  </p>
                  <table className="table table-sm mb-0">
                    <tbody>
                      <tr style={{ backgroundColor: "#c8e6c9" }}>
                        <th>Họ tên</th>
                        <td className="fw-bold">{step1.name}</td>
                      </tr>
                      <tr>
                        <th>Vai trò</th>
                        <td>
                          <span
                            className="badge"
                            style={{ backgroundColor: "#2e7d32" }}
                          >
                            {roleLabel}
                          </span>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: "#f5f5f5" }}>
                        <th>Mã đăng ký</th>
                        <td
                          className="fw-bold text-success"
                          style={{ letterSpacing: 2, fontSize: 16 }}
                        >
                          {repCode}
                        </td>
                      </tr>
                      <tr>
                        <th>Mật khẩu</th>
                        <td className="fw-bold" style={{ letterSpacing: 2 }}>
                          {reservation?.password}
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: "#f5f5f5" }}>
                        <th>Phương tiện</th>
                        <td>
                          {step3.transport === "bus"
                            ? `Xe bus BTC (${step3.bus_departure})`
                            : "Tự túc"}
                        </td>
                      </tr>
                      <tr>
                        <th>Tổng phí</th>
                        <td className="fw-bold text-success">
                          {fmtYen(fees.total)}
                          {fees.total === 0 && (
                            <span
                              className="ms-2 badge"
                              style={{
                                backgroundColor: "#e8f5e9",
                                color: "#2e7d32",
                                border: "1px solid #a5d6a7",
                              }}
                            >
                              Miễn phí
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={{ fontSize: 14 }} className="text-muted">
                  Vui lòng <strong>lưu lại mã đăng ký và mật khẩu</strong>. Ban
                  tổ chức sẽ liên hệ qua Facebook hoặc email để xác nhận và
                  hướng dẫn các bước tiếp theo.
                </p>
                <p className="text-muted" style={{ fontSize: 12 }}>
                  Liên hệ:{" "}
                  <a
                    href="https://www.facebook.com/banchanxanhjp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fanpage Bàn Chân Xanh
                  </a>
                </p>
                <div className="mt-4">
                  <a href="/trao-2026" className="btn btn-success px-4">
                    ← Xem thông tin chi tiết TRAO-2026
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────

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
                <h2 className="mt-1 mb-1">ĐĂNG KÝ TRAO 2026</h2>
                <div
                  style={{
                    fontSize: 13,
                    color: "#2e7d32",
                    fontWeight: 600,
                    letterSpacing: 1,
                  }}
                >
                  Dành cho Cộng tác viên &amp; Nhà tài trợ
                </div>
              </div>

              <ProgressBarCustom current={currentStep} />

              <div
                className="p-4 rounded shadow-sm"
                style={{ backgroundColor: "#fff", border: "1px solid #e8f5e9" }}
              >
                <form onSubmit={onSubmit} noValidate>
                  {currentStep === 1 && (
                    <Step1Form
                      data={step1}
                      onChange={(patch) =>
                        setStep1((prev) => ({ ...prev, ...patch }))
                      }
                      onClearError={clearError}
                      errors={errors}
                    />
                  )}

                  {currentStep === 2 && (
                    <RolePicker
                      role={role}
                      onChange={setRole}
                      error={errors.role}
                    />
                  )}

                  {currentStep === 3 && (
                    <Step3Form
                      data={step3}
                      onChange={(patch) =>
                        setStep3((prev) => ({ ...prev, ...patch }))
                      }
                      onClearError={clearError}
                      errors={errors}
                    />
                  )}

                  {currentStep === 4 && (
                    <Step5Form
                      data={step5}
                      onChange={(patch) =>
                        setStep5((prev) => ({ ...prev, ...patch }))
                      }
                      onClearError={clearError}
                      errors={errors}
                    />
                  )}

                  {currentStep === 5 && (
                    <Step6Form
                      step2={STEP2_INDIVIDUAL}
                      data={step6}
                      onChange={(patch) =>
                        setStep6((prev) => ({ ...prev, ...patch }))
                      }
                      errors={errors}
                      cabins={cabins}
                      loadingCabins={loadingCabins}
                    />
                  )}

                  {currentStep === 6 &&
                    (reserving ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-success mb-3" />
                        <p className="text-muted">Đang tạo mã đăng ký...</p>
                      </div>
                    ) : (
                      <ConfirmStep
                        step1={step1}
                        step3={step3}
                        step5={step5}
                        role={role}
                        reservation={reservation}
                        paymentTiming={paymentTiming}
                        setPaymentTiming={setPaymentTiming}
                        receiptFile={receiptFile}
                        setReceiptFile={setReceiptFile}
                        receiptPreview={receiptPreview}
                        setReceiptPreview={setReceiptPreview}
                        donation={donation}
                        setDonation={setDonation}
                        errors={errors}
                      />
                    ))}

                  {/* Fee summary ở step 3 */}
                  {currentStep === 3 && role && (
                    <div
                      className="mt-3 p-3 rounded"
                      style={{
                        backgroundColor: "#f0f7f0",
                        border: "1px solid #a5d6a7",
                        fontSize: 13,
                      }}
                    >
                      <strong>Dự kiến phí tham gia:</strong>
                      <ul className="mb-0 mt-1">
                        {role === "ntt" ? (
                          <li style={{ color: "#2e7d32" }}>
                            Phí sự kiện: <strong>Miễn phí (NTT)</strong>
                          </li>
                        ) : (
                          <li>
                            Phí sự kiện:{" "}
                            <strong>
                              {fmtYen(
                                Math.floor(
                                  calcNormalEventFee(Number(step1.age) || 0) /
                                    2,
                                ),
                              )}
                            </strong>{" "}
                            <span style={{ color: "#e65100" }}>
                              (giảm 50% — CTV)
                            </span>
                          </li>
                        )}
                        {step3.transport === "bus" && step3.bus_departure && (
                          <li>
                            Phí xe bus ({step3.bus_departure}):{" "}
                            <strong>
                              {fmtYen(
                                step3.bus_departure === "Tokyo"
                                  ? FEE_BUS_TOKYO
                                  : FEE_BUS_OTHER,
                              )}
                            </strong>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {submitError && (
                    <div className="alert alert-danger mt-3">{submitError}</div>
                  )}

                  {/* Contact confirm checkbox ở step 1 */}
                  {currentStep === 1 && (
                    <div className="mt-4">
                      <label
                        className="d-flex align-items-start gap-2"
                        style={{ cursor: "pointer", fontSize: 14 }}
                      >
                        <input
                          type="checkbox"
                          checked={confirmContact}
                          onChange={(e) => setConfirmContact(e.target.checked)}
                          required
                          style={{
                            marginTop: 3,
                            flexShrink: 0,
                            accentColor: "#2e7d32",
                          }}
                        />
                        <span>
                          Tôi xác nhận <strong>email</strong> và{" "}
                          <strong>link Facebook</strong> đã nhập là chính xác.
                          <br />
                          (Ban tổ chức sẽ liên hệ qua 2 kênh này để thông báo và
                          xác nhận đăng ký.)
                        </span>
                      </label>
                      {errors.confirmContact && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: 12, paddingLeft: 22 }}
                        >
                          {errors.confirmContact}
                        </div>
                      )}
                    </div>
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

                    {currentStep < STEPS.length ? (
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
                        disabled={submitting || reserving || !reservation}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Đang gửi...
                          </>
                        ) : reserving ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Đang tạo mã...
                          </>
                        ) : (
                          "Hoàn tất đăng ký"
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <p
                className="text-center text-muted mt-3"
                style={{ fontSize: 12 }}
              >
                Mọi thắc mắc liên hệ:{" "}
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

export default RegisterCtvNttPage;
