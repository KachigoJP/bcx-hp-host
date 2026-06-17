import React, { Fragment } from "react";

const midAutumnStyles = `
  @keyframes denSway {
    0%, 100% { transform: rotate(-7deg); }
    50%       { transform: rotate(7deg); }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.25; transform: scale(0.65); }
  }
  @keyframes floatMoon {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-6px); }
    100% { transform: translateY(0px); }
  }
  @keyframes banhGlow {
    0%, 100% { filter: drop-shadow(0 0 3px rgba(230,81,0,.4)); }
    50%       { filter: drop-shadow(0 0 8px rgba(230,81,0,.85)); }
  }
  .den-sway  { animation: denSway 3.2s ease-in-out infinite; display: inline-block; transform-origin: top center; }
  .den-sway2 { animation: denSway 4.5s ease-in-out infinite reverse; display: inline-block; transform-origin: top center; }
  .ma-star  { animation: starTwinkle 2s ease-in-out infinite; display: inline-block; }
  .ma-star2 { animation: starTwinkle 2.7s ease-in-out infinite 0.7s; display: inline-block; }
  .ma-moon  { animation: floatMoon 4s ease-in-out infinite; display: inline-block; }
  .banh-glow { animation: banhGlow 2.5s ease-in-out infinite; display: inline-block; }

  @keyframes riseLantern {
    0%   { transform: translateY(0) rotate(var(--r, -3deg)); opacity: 0; }
    6%   { opacity: 0.85; }
    90%  { opacity: 0.72; }
    100% { transform: translateY(-120vh) rotate(calc(var(--r, -3deg) * -1)); opacity: 0; }
  }
  .form-sky-lantern {
    position: absolute;
    animation: riseLantern var(--dur, 9s) linear var(--delay, 0s) infinite;
    filter: drop-shadow(0 0 7px rgba(255,176,0,.65));
    pointer-events: none;
  }
`;

/* ── Đèn Ông Sao SVG ─────────────────────────────────────────────────────────
   Đèn ngôi sao 5 cánh truyền thống Trung Thu Việt Nam
*/
const DenOngSao: React.FC<{
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}> = ({ size = 28, style, className }) => (
  <svg
    width={size}
    height={Math.round(size * 1.42)}
    viewBox="0 0 32 46"
    style={{ display: "inline-block", verticalAlign: "middle", ...style }}
    className={className}
    aria-label="Đèn ông sao"
  >
    {/* Hào quang */}
    <polygon
      points="16,2 20,11 29,12 22,18 24,27 16,22 8,27 10,18 3,12 12,11"
      fill="#ffe082"
      opacity="0.5"
      style={{ filter: "blur(2.5px)" }}
    />
    {/* Ngôi sao — vàng cam, viền đỏ */}
    <polygon
      points="16,2 20,11 29,12 22,18 24,27 16,22 8,27 10,18 3,12 12,11"
      fill="#f9a825"
      stroke="#c62828"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    {/* Ánh nến */}
    <circle cx="16" cy="15" r="4.5" fill="#fff176" opacity="0.9" />
    {/* Cán */}
    <line
      x1="16"
      y1="27"
      x2="16"
      y2="44"
      stroke="#5d4037"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="2"
      x2="16"
      y2="-2"
      stroke="#5d4037"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Đèn Trời SVG ────────────────────────────────────────────────────────────
   Đèn trời (sky lantern) hình bầu dục thả lên trời
*/
const DenTroi: React.FC<{ size?: number; warm?: boolean }> = ({
  size = 28,
  warm = true,
}) => {
  const h = Math.round(size * 1.6);
  const cx = size / 2;
  const rx = size / 2 - 1;
  const bodyH = Math.round(size * 0.95);
  const cy = bodyH / 2 + 2;
  const ry = bodyH / 2;
  const flameY = cy + ry;
  const flameH = Math.round(size * 0.28);
  const color1 = warm ? "#ff8f00" : "#ffa726";
  const color2 = warm ? "#ffe082" : "#fff9c4";
  return (
    <svg
      width={size}
      height={h}
      viewBox={`0 0 ${size} ${h}`}
      style={{ display: "block" }}
    >
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="#ffb300"
        opacity="0.22"
        style={{ filter: "blur(3px)" }}
      />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color1} opacity="0.92" />
      <line
        x1={cx - rx + 2}
        y1={cy}
        x2={cx + rx - 2}
        y2={cy}
        stroke="#e65100"
        strokeWidth="0.7"
        opacity="0.5"
      />
      <line
        x1={cx}
        y1={cy - ry + 3}
        x2={cx}
        y2={cy + ry - 3}
        stroke="#e65100"
        strokeWidth="0.7"
        opacity="0.5"
      />
      <ellipse
        cx={cx}
        cy={cy + ry - 1}
        rx={Math.round(rx * 0.45)}
        ry={Math.round(ry * 0.14)}
        fill="none"
        stroke="#bf360c"
        strokeWidth="1"
      />
      <ellipse
        cx={cx}
        cy={flameY + flameH * 0.5}
        rx={Math.round(size * 0.14)}
        ry={flameH * 0.6}
        fill="#ffee58"
        opacity="0.95"
      />
      <ellipse
        cx={cx}
        cy={flameY + flameH * 0.45}
        rx={Math.round(size * 0.07)}
        ry={flameH * 0.4}
        fill={color2}
        opacity="0.9"
      />
      <line
        x1={cx - 4}
        y1={cy - ry + 1}
        x2={cx - 4}
        y2={cy - ry - 4}
        stroke="#8d6e63"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <line
        x1={cx + 4}
        y1={cy - ry + 1}
        x2={cx + 4}
        y2={cy - ry - 4}
        stroke="#8d6e63"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
};

// bottom: vị trí xuất phát (px), rải đều ~60px, trộn ngẫu nhiên để không thành hàng
// 24 đèn/bên, delay cách đều 60/24 = 2.5s → luôn có đèn ở mọi tầng cao
// dur ngẫu nhiên 52–72s để đèn bay rất chậm, thư thái; left/right trải khắp 240px
const LEFT_LANTERNS = [
  {
    left: 12,
    bottom: -50,
    delay: "0.00s",
    dur: "60s",
    size: 28,
    rotate: -5,
    warm: true,
  },
  {
    left: 80,
    bottom: -50,
    delay: "2.50s",
    dur: "56s",
    size: 18,
    rotate: 4,
    warm: false,
  },
  {
    left: 175,
    bottom: -50,
    delay: "5.00s",
    dur: "64s",
    size: 34,
    rotate: -3,
    warm: true,
  },
  {
    left: 38,
    bottom: -50,
    delay: "7.50s",
    dur: "52s",
    size: 22,
    rotate: 6,
    warm: false,
  },
  {
    left: 130,
    bottom: -50,
    delay: "10.00s",
    dur: "68s",
    size: 16,
    rotate: -4,
    warm: true,
  },
  {
    left: 215,
    bottom: -50,
    delay: "12.50s",
    dur: "60s",
    size: 30,
    rotate: 3,
    warm: false,
  },
  {
    left: 60,
    bottom: -50,
    delay: "15.00s",
    dur: "56s",
    size: 20,
    rotate: -6,
    warm: true,
  },
  {
    left: 155,
    bottom: -50,
    delay: "17.50s",
    dur: "72s",
    size: 38,
    rotate: 5,
    warm: false,
  },
  {
    left: 22,
    bottom: -50,
    delay: "20.00s",
    dur: "60s",
    size: 14,
    rotate: -2,
    warm: true,
  },
  {
    left: 100,
    bottom: -50,
    delay: "22.50s",
    dur: "52s",
    size: 26,
    rotate: 4,
    warm: false,
  },
  {
    left: 195,
    bottom: -50,
    delay: "25.00s",
    dur: "64s",
    size: 18,
    rotate: -5,
    warm: true,
  },
  {
    left: 48,
    bottom: -50,
    delay: "27.50s",
    dur: "60s",
    size: 32,
    rotate: 7,
    warm: false,
  },
  {
    left: 140,
    bottom: -50,
    delay: "30.00s",
    dur: "56s",
    size: 22,
    rotate: -3,
    warm: true,
  },
  {
    left: 72,
    bottom: -50,
    delay: "32.50s",
    dur: "68s",
    size: 16,
    rotate: 5,
    warm: false,
  },
  {
    left: 225,
    bottom: -50,
    delay: "35.00s",
    dur: "60s",
    size: 28,
    rotate: -4,
    warm: true,
  },
  {
    left: 18,
    bottom: -50,
    delay: "37.50s",
    dur: "52s",
    size: 20,
    rotate: 3,
    warm: false,
  },
  {
    left: 110,
    bottom: -50,
    delay: "40.00s",
    dur: "64s",
    size: 36,
    rotate: -6,
    warm: true,
  },
  {
    left: 185,
    bottom: -50,
    delay: "42.50s",
    dur: "60s",
    size: 14,
    rotate: 4,
    warm: false,
  },
  {
    left: 55,
    bottom: -50,
    delay: "45.00s",
    dur: "72s",
    size: 24,
    rotate: -3,
    warm: true,
  },
  {
    left: 160,
    bottom: -50,
    delay: "47.50s",
    dur: "56s",
    size: 30,
    rotate: 6,
    warm: false,
  },
  {
    left: 30,
    bottom: -50,
    delay: "50.00s",
    dur: "60s",
    size: 18,
    rotate: -5,
    warm: true,
  },
  {
    left: 210,
    bottom: -50,
    delay: "52.50s",
    dur: "68s",
    size: 22,
    rotate: 2,
    warm: false,
  },
  {
    left: 88,
    bottom: -50,
    delay: "55.00s",
    dur: "52s",
    size: 16,
    rotate: -4,
    warm: true,
  },
  {
    left: 135,
    bottom: -50,
    delay: "57.50s",
    dur: "60s",
    size: 32,
    rotate: 5,
    warm: false,
  },
];
const RIGHT_LANTERNS = [
  {
    right: 14,
    bottom: -50,
    delay: "1.25s",
    dur: "64s",
    size: 30,
    rotate: 5,
    warm: false,
  },
  {
    right: 85,
    bottom: -50,
    delay: "3.75s",
    dur: "60s",
    size: 20,
    rotate: -4,
    warm: true,
  },
  {
    right: 170,
    bottom: -50,
    delay: "6.25s",
    dur: "52s",
    size: 36,
    rotate: 3,
    warm: false,
  },
  {
    right: 42,
    bottom: -50,
    delay: "8.75s",
    dur: "68s",
    size: 16,
    rotate: -6,
    warm: true,
  },
  {
    right: 125,
    bottom: -50,
    delay: "11.25s",
    dur: "60s",
    size: 28,
    rotate: 4,
    warm: false,
  },
  {
    right: 205,
    bottom: -50,
    delay: "13.75s",
    dur: "56s",
    size: 18,
    rotate: -3,
    warm: true,
  },
  {
    right: 65,
    bottom: -50,
    delay: "16.25s",
    dur: "72s",
    size: 40,
    rotate: 6,
    warm: false,
  },
  {
    right: 150,
    bottom: -50,
    delay: "18.75s",
    dur: "60s",
    size: 22,
    rotate: -5,
    warm: true,
  },
  {
    right: 28,
    bottom: -50,
    delay: "21.25s",
    dur: "64s",
    size: 14,
    rotate: 3,
    warm: false,
  },
  {
    right: 110,
    bottom: -50,
    delay: "23.75s",
    dur: "52s",
    size: 32,
    rotate: -4,
    warm: true,
  },
  {
    right: 188,
    bottom: -50,
    delay: "26.25s",
    dur: "60s",
    size: 24,
    rotate: 5,
    warm: false,
  },
  {
    right: 50,
    bottom: -50,
    delay: "28.75s",
    dur: "68s",
    size: 18,
    rotate: -2,
    warm: true,
  },
  {
    right: 135,
    bottom: -50,
    delay: "31.25s",
    dur: "56s",
    size: 26,
    rotate: 4,
    warm: false,
  },
  {
    right: 78,
    bottom: -50,
    delay: "33.75s",
    dur: "60s",
    size: 16,
    rotate: -6,
    warm: true,
  },
  {
    right: 218,
    bottom: -50,
    delay: "36.25s",
    dur: "52s",
    size: 34,
    rotate: 3,
    warm: false,
  },
  {
    right: 20,
    bottom: -50,
    delay: "38.75s",
    dur: "64s",
    size: 20,
    rotate: -4,
    warm: true,
  },
  {
    right: 100,
    bottom: -50,
    delay: "41.25s",
    dur: "60s",
    size: 14,
    rotate: 6,
    warm: false,
  },
  {
    right: 175,
    bottom: -50,
    delay: "43.75s",
    dur: "72s",
    size: 28,
    rotate: -3,
    warm: true,
  },
  {
    right: 58,
    bottom: -50,
    delay: "46.25s",
    dur: "56s",
    size: 22,
    rotate: 5,
    warm: false,
  },
  {
    right: 145,
    bottom: -50,
    delay: "48.75s",
    dur: "60s",
    size: 38,
    rotate: -5,
    warm: true,
  },
  {
    right: 35,
    bottom: -50,
    delay: "51.25s",
    dur: "68s",
    size: 16,
    rotate: 2,
    warm: false,
  },
  {
    right: 200,
    bottom: -50,
    delay: "53.75s",
    dur: "52s",
    size: 30,
    rotate: -4,
    warm: true,
  },
  {
    right: 90,
    bottom: -50,
    delay: "56.25s",
    dur: "60s",
    size: 18,
    rotate: 4,
    warm: false,
  },
  {
    right: 160,
    bottom: -50,
    delay: "58.75s",
    dur: "64s",
    size: 24,
    rotate: -6,
    warm: true,
  },
];

import {
  CostSummaryCard,
  ProgressBar,
  Step1Form,
  Step2Form,
  Step3Form,
  Step4PaymentForm,
  Step5Form,
  Step6Form,
} from "../components/trao2026";
import { STEPS } from "../components/trao2026/constants";
import {
  buildParticipants,
  calcFees,
  calcProductFee,
  fmtYen,
} from "../components/trao2026/helpers";
import type {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
} from "../components/trao2026/types";

const initialStep1: Step1 = {
  email: "",
  name: "",
  gender: "",
  age: "",
  disabled: false,
  facebook: "",
  phone: "",
  emergency_phone: "",
  emergency_relation: "",
  address: "",
  blood_type: "",
  food_allergy: "",
};

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [step1, setStep1] = React.useState<Step1>(initialStep1);
  const [step2, setStep2] = React.useState<Step2>({
    register_type: "",
    members: [],
  });
  const [step3, setStep3] = React.useState<Step3>({
    transport: "",
    bus_departure: "",
  });
  const [step4, setStep4] = React.useState<Step4>({
    payment_timing: "",
    receipt_file: null,
    receipt_url: "",
    donation: "",
  });
  const [reservation, setReservation] = React.useState<{
    code: string;
    password: string;
  } | null>(null);
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

  const [cabins, setCabins] = React.useState<
    import("../components/trao2026/types").CabinInfo[]
  >([]);
  const [loadingCabins, setLoadingCabins] = React.useState(false);
  const [shirtCounts, setShirtCounts] = React.useState<Record<string, number>>(
    {},
  );

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [confirmContact, setConfirmContact] = React.useState(false);

  const clearError = React.useCallback((key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev; // không thay đổi nếu không có lỗi
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);
  const [submitting, setSubmitting] = React.useState(false);
  const [allCodes, setAllCodes] = React.useState<{
    rep: string;
    members: string[];
  } | null>(null);
  const [submitError, setSubmitError] = React.useState("");

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
          setSubmitError(
            data.error ?? "Không thể tạo mã đăng ký. Vui lòng thử lại.",
          );
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSubmitError(
            "Không thể tạo mã đăng ký. Vui lòng kiểm tra kết nối.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setReserving(false);
      });

    return () => {
      cancelled = true;
    };
    // Chỉ phụ thuộc vào currentStep và reservation.
    // Không đưa `reserving` vào deps — nếu có, setReserving(true) bên trong
    // sẽ trigger cleanup ngay lập tức, cancel fetch đang chạy và treo spinner mãi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, reservation]);

  // Fetch danh sách cabin + số lượng áo đã đăng ký khi vào step 5
  React.useEffect(() => {
    if (currentStep !== 5) return;
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
      .finally(() => setLoadingCabins(false));
  }, [currentStep]);

  const TOTAL_STEPS = STEPS.length;

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
    if (!step2.register_type)
      e.register_type = "Vui lòng chọn hình thức đăng ký";
    if (step2.register_type === "group") {
      step2.members.forEach((member, i) => {
        if (!member.name.trim()) e[`member_${i}_name`] = "Bắt buộc";
        if (!member.gender) e[`member_${i}_gender`] = "Bắt buộc";
        if (!member.age.trim()) e[`member_${i}_age`] = "Bắt buộc";
        else if (Number(member.age) < 1 || Number(member.age) > 120)
          e[`member_${i}_age`] = "Không hợp lệ";
        if (!member.relation.trim()) e[`member_${i}_relation`] = "Bắt buộc";
      });
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = (): boolean => {
    const e: Record<string, string> = {};
    if (!step3.transport) e.transport = "Vui lòng chọn phương tiện di chuyển";
    if (step3.transport === "bus" && !step3.bus_departure) {
      e.bus_departure = "Vui lòng chọn nơi xuất phát";
    }
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
    step6.participants.forEach((participant, i) => {
      if (!participant.shirt_size) e[`shirt_${i}`] = "Vui lòng chọn size áo";
      if (!participant.shirt_color) e[`color_${i}`] = "Vui lòng chọn màu áo";
      if (!participant.stay) e[`stay_${i}`] = "Vui lòng chọn cabin";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep6 = (): boolean => {
    const e: Record<string, string> = {};
    const fees = calcFees(step1, step2, step3);
    const productFee =
      step5.want_products === "yes" ? calcProductFee(step5.products) : 0;
    const grandTotal = fees.total + productFee + (Number(step4.donation) || 0);
    if (grandTotal > 0) {
      if (!step4.payment_timing)
        e.payment_timing =
          "Mã đăng ký có hiệu lực trong vòng 24 giờ. Vui lòng chuyển khoản đúng hạn.";
      else if (step4.payment_timing === "now" && !step4.receipt_file)
        e.receipt_file = "Vui lòng upload ảnh chụp màn hình chuyển khoản";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    let valid = false;
    if (currentStep === 1) valid = validateStep1();
    else if (currentStep === 2) valid = validateStep2();
    else if (currentStep === 3) valid = validateStep3();
    else if (currentStep === 4) valid = validateStep4();
    else if (currentStep === 5) valid = validateStep5();

    if (!valid) return;

    setErrors({});
    setSubmitError("");

    if (currentStep === 4) {
      setStep6((prev) => {
        const fresh = buildParticipants(step1, step2);
        const merged = fresh.map((participant, i) => ({
          ...participant,
          shirt_size: prev.participants[i]?.shirt_size ?? "",
          shirt_color: prev.participants[i]?.shirt_color ?? "",
          stay: prev.participants[i]?.stay ?? "",
        }));
        return { participants: merged };
      });
    }

    setCurrentStep((step) => step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    // Nếu đang ở bước thanh toán (step 6), xóa file đã chọn để tránh
    // tình trạng form tự động submit khi quay lại rồi tiến tới lại.
    if (currentStep === 6) {
      setStep4((prev) => ({
        ...prev,
        payment_timing: "",
        receipt_file: null,
        receipt_url: "",
      }));
    }
    setCurrentStep((step) => step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep6()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      if (!reservation)
        throw new Error("Chưa có mã đăng ký. Vui lòng thử lại.");

      const code = reservation.code;
      const fees = calcFees(step1, step2, step3);

      let receipt: {
        base64: string;
        mimeType: string;
        filename: string;
      } | null = null;
      if (step4.receipt_file) {
        const file = step4.receipt_file;
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve((reader.result as string).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        receipt = {
          base64,
          mimeType: file.type,
          filename: `${code}_${file.name}`,
        };
      }

      const formData = {
        code,
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
        register_type: step2.register_type,
        members: step2.members,
        num_person: fees.total_people,
        transport: step3.transport,
        bus_departure: step3.bus_departure || null,
        count_adult: fees.adults,
        count_child: fees.children,
        count_free: fees.free,
        fee_event: fees.event_fee,
        fee_bus: fees.bus_fee,
        fee_total: fees.total,
        donation: Number(step4.donation) || 0,
        food_allergy: step1.food_allergy.trim() || null,
        want_products: step5.want_products,
        products: step5.want_products === "yes" ? step5.products : null,
        product_fee:
          step5.want_products === "yes" ? calcProductFee(step5.products) : 0,
        volunteer: step5.volunteer,
        volunteer_teams: step5.volunteer === "yes" ? step5.volunteer_teams : [],
        note: step5.note.trim() || null,
        participants: step6.participants,
        password: reservation.password,
        payment_timing: step4.payment_timing,
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
      const msg =
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi gửi thông tin.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (allCodes) {
    const fees = calcFees(step1, step2, step3);
    const productFee =
      step5.want_products === "yes" ? calcProductFee(step5.products) : 0;
    const grandTotal = fees.total + productFee + (Number(step4.donation) || 0);
    const allMembers = step2.register_type === "group" ? step2.members : [];

    return (
      <Fragment>
        <style>{midAutumnStyles}</style>
        {/* Success banner */}
        <div
          style={{
            background:
              "linear-gradient(90deg,#7b1fa2 0%,#b71c1c 25%,#e65100 55%,#f57f17 75%,#e65100 90%,#b71c1c 100%)",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <DenOngSao
            size={22}
            className="den-sway"
            style={{ marginRight: 10 }}
          />
          <span
            style={{
              color: "#ffe082",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 3,
            }}
          >
            ✦ ĐÊM HỘI TRUNG THU · TRAO 2026 ✦
          </span>
          <DenOngSao
            size={22}
            className="den-sway2"
            style={{ marginLeft: 10 }}
          />
        </div>
        <section className="wpo-about-section-s2 section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-10 col-12 text-center">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                  <DenOngSao size={26} className="den-sway" />
                  <span
                    className="ma-star"
                    style={{ color: "#f57f17", fontSize: 14 }}
                  >
                    ✦
                  </span>
                  <span className="banh-glow" style={{ fontSize: 32 }}>
                    🥮
                  </span>
                  <span className="ma-moon" style={{ fontSize: 26 }}>
                    🌕
                  </span>
                  <span className="banh-glow" style={{ fontSize: 32 }}>
                    🥮
                  </span>
                  <span
                    className="ma-star2"
                    style={{ color: "#f57f17", fontSize: 14 }}
                  >
                    ✦
                  </span>
                  <DenOngSao size={26} className="den-sway2" />
                </div>
                <div style={{ fontSize: 56, marginBottom: 8 }}>🎉</div>
                <h3 className="text-success fw-bold">Đăng ký thành công!</h3>
                <p className="text-muted">
                  Xin chào <strong>{step1.name}</strong>, thông tin của bạn đã
                  được ghi nhận.
                </p>

                <div
                  className="p-3 my-4 rounded text-start"
                  style={{
                    backgroundColor: "#f0f7f0",
                    border: "2px dashed #4caf50",
                  }}
                >
                  <p
                    className="fw-bold mb-2 text-center"
                    style={{ fontSize: 15 }}
                  >
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
                          <span
                            className="badge"
                            style={{ backgroundColor: "#2e7d32" }}
                          >
                            {step2.register_type === "individual"
                              ? "Cá nhân"
                              : "Đại diện"}
                          </span>
                        </td>
                        <td
                          className="fw-bold text-success"
                          style={{ letterSpacing: 2 }}
                        >
                          {allCodes.rep}
                        </td>
                      </tr>
                      {allMembers.map((member, i) => (
                        <tr key={i}>
                          <td>{member.name}</td>
                          <td>
                            <span className="badge bg-secondary">
                              Thành viên
                            </span>
                          </td>
                          <td
                            className="fw-bold text-success"
                            style={{ letterSpacing: 2 }}
                          >
                            {allCodes.members[i]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  className="p-3 rounded text-start mb-4"
                  style={{ backgroundColor: "#f8f9fa", fontSize: 14 }}
                >
                  <p className="mb-2 fw-semibold">Tóm tắt đăng ký:</p>
                  <table className="table table-sm mb-2">
                    <thead>
                      <tr style={{ backgroundColor: "#e8f5e9" }}>
                        <th>Họ tên</th>
                        <th>Tuổi</th>
                        <th>Vai trò</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{step1.name}</td>
                        <td>{step1.age}</td>
                        <td>
                          <span
                            className="badge"
                            style={{ backgroundColor: "#2e7d32" }}
                          >
                            {step2.register_type === "individual"
                              ? "Cá nhân"
                              : "Đại diện"}
                          </span>
                        </td>
                      </tr>
                      {allMembers.map((m, i) => (
                        <tr key={i}>
                          <td>{m.name}</td>
                          <td>{m.age}</td>
                          <td>
                            <span className="badge bg-secondary">
                              Thành viên
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="mb-0">
                    <li>
                      Tổng số người: <strong>{fees.total_people}</strong> (
                      {[
                        fees.adults > 0 ? `${fees.adults} người lớn` : "",
                        fees.children > 0 ? `${fees.children} trẻ em` : "",
                        fees.free > 0 ? `${fees.free} miễn phí` : "",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                      )
                    </li>
                    <li>
                      Phương tiện:{" "}
                      {step3.transport === "bus"
                        ? `Xe bus BTC (${step3.bus_departure})`
                        : "Tự túc"}
                    </li>
                    <li>
                      Tổng phí:{" "}
                      <strong className="text-success">
                        {fmtYen(grandTotal)}
                      </strong>
                    </li>
                  </ul>
                </div>

                <p style={{ fontSize: 14 }} className="text-muted">
                  Vui lòng <strong>lưu lại các mã đăng ký</strong> trên. Ban tổ
                  chức sẽ liên hệ qua Facebook hoặc số điện thoại để xác nhận và
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

  return (
    <Fragment>
      <style>{midAutumnStyles}</style>

      {/* ── Banner Trung Thu ─────────────────────────────────────── */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#7b1fa2 0%,#b71c1c 25%,#e65100 55%,#f57f17 75%,#e65100 90%,#b71c1c 100%)",
          padding: "9px 16px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[
          ["12%", 4],
          ["30%", 6],
          ["52%", 3],
          ["70%", 6],
          ["88%", 4],
        ].map(([left, top], i) => (
          <span
            key={i}
            className={i % 2 === 0 ? "ma-star" : "ma-star2"}
            style={{
              position: "absolute",
              top: Number(top),
              left: String(left),
              fontSize: 8,
              color: "#ffe082",
              lineHeight: 1,
            }}
          >
            ✦
          </span>
        ))}
        <DenOngSao size={20} className="den-sway" style={{ marginRight: 10 }} />
        <span
          style={{
            color: "#ffe082",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          ✦ ĐÊM HỘI TRUNG THU · TRAO 2026 ✦
        </span>
        <DenOngSao size={20} className="den-sway2" style={{ marginLeft: 10 }} />
      </div>

      <section
        className="wpo-about-section-s2 section-padding"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* ── Đèn trời bên trái — ẩn trên màn hình nhỏ ── */}
        <div
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 240,
            pointerEvents: "none",
          }}
        >
          {LEFT_LANTERNS.map((l, i) => (
            <div
              key={i}
              className="form-sky-lantern"
              style={{
                left: l.left,
                bottom: l.bottom,
                ["--dur" as string]: l.dur,
                ["--delay" as string]: l.delay,
                ["--r" as string]: `${l.rotate}deg`,
              }}
            >
              <DenTroi size={l.size} warm={l.warm} />
            </div>
          ))}
        </div>

        {/* ── Đèn trời bên phải — ẩn trên màn hình nhỏ ── */}
        <div
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 240,
            pointerEvents: "none",
          }}
        >
          {RIGHT_LANTERNS.map((l, i) => (
            <div
              key={i}
              className="form-sky-lantern"
              style={{
                right: l.right,
                bottom: l.bottom,
                ["--dur" as string]: l.dur,
                ["--delay" as string]: l.delay,
                ["--r" as string]: `${l.rotate}deg`,
              }}
            >
              <DenTroi size={l.size} warm={l.warm} />
            </div>
          ))}
        </div>

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
                <div className="mt-1 mb-1 d-flex align-items-center justify-content-center gap-2">
                  <DenOngSao size={28} className="den-sway" />
                  <span
                    className="ma-moon"
                    style={{ fontSize: 30, lineHeight: 1 }}
                  >
                    🌕
                  </span>
                  <span
                    className="banh-glow"
                    style={{ fontSize: 32, lineHeight: 1 }}
                  >
                    🥮
                  </span>
                  <span
                    className="ma-moon"
                    style={{ fontSize: 30, lineHeight: 1 }}
                  >
                    🌕
                  </span>
                  <DenOngSao size={28} className="den-sway2" />
                </div>
                <h2 className="mb-1">ĐĂNG KÝ TRAO 2026</h2>
                <div
                  style={{
                    fontSize: 12,
                    color: "#e65100",
                    fontWeight: 600,
                    letterSpacing: 2,
                  }}
                >
                  <span className="ma-star" style={{ marginRight: 6 }}>
                    ✦
                  </span>
                  Đêm Hội Trung Thu
                  <span className="ma-star2" style={{ marginLeft: 6 }}>
                    ✦
                  </span>
                </div>
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
                      onChange={(patch) =>
                        setStep1((prev) => ({ ...prev, ...patch }))
                      }
                      onClearError={clearError}
                      errors={errors}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2Form
                      data={step2}
                      onChange={(patch) =>
                        setStep2((prev) => ({ ...prev, ...patch }))
                      }
                      onClearError={clearError}
                      errors={errors}
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
                      step2={step2}
                      data={step6}
                      onChange={(patch) =>
                        setStep6((prev) => ({ ...prev, ...patch }))
                      }
                      errors={errors}
                      cabins={cabins}
                      loadingCabins={loadingCabins}
                      shirtCounts={shirtCounts}
                    />
                  )}
                  {currentStep === 6 &&
                    (reserving ? (
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
                        onChange={(patch) =>
                          setStep4((prev) => ({ ...prev, ...patch }))
                        }
                        errors={errors}
                      />
                    ))}

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

export default RegisterPage;
