import React, { Fragment } from "react";

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
    receipt_file: null,
    receipt_url: "",
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

  const [errors, setErrors] = React.useState<Record<string, string>>({});
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
  }, [currentStep, reservation, reserving]);

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
    if (!step1.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
    if (!step1.emergency_phone.trim())
      e.emergency_phone = "Vui lòng nhập số điện thoại khẩn cấp";
    if (!step1.emergency_relation.trim())
      e.emergency_relation = "Vui lòng nhập quan hệ";
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
    if (!step4.receipt_file)
      e.receipt_file = "Vui lòng upload ảnh chụp màn hình chuyển khoản";
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
        fee_event: fees.event_fee,
        fee_bus: fees.bus_fee,
        fee_total: fees.total,
        food_allergy: step5.food_allergy.trim() || null,
        want_products: step5.want_products,
        products: step5.want_products === "yes" ? step5.products : null,
        product_fee:
          step5.want_products === "yes" ? calcProductFee(step5.products) : 0,
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
      const msg =
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi gửi thông tin.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

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
                          <span className="badge bg-secondary">Thành viên</span>
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
                    <strong className="text-success">
                      {fmtYen(fees.total)}
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
                      onChange={(patch) =>
                        setStep1((prev) => ({ ...prev, ...patch }))
                      }
                      errors={errors}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2Form
                      data={step2}
                      onChange={(patch) =>
                        setStep2((prev) => ({ ...prev, ...patch }))
                      }
                      errors={errors}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3Form
                      data={step3}
                      onChange={(patch) =>
                        setStep3((prev) => ({ ...prev, ...patch }))
                      }
                      errors={errors}
                    />
                  )}
                  {currentStep === 4 && (
                    <Step5Form
                      data={step5}
                      onChange={(patch) =>
                        setStep5((prev) => ({ ...prev, ...patch }))
                      }
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
