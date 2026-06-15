import React from "react";

import CostSummaryCard from "./CostSummaryCard";
import CopyButton from "./CopyButton";
import { calcFees, calcProductFee } from "./helpers";
import type { Step1, Step2, Step3, Step4, Step5 } from "./types";

type Props = {
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step5: Step5;
  reservation: { code: string; password: string } | null;
  data: Step4;
  onChange: (patch: Partial<Step4>) => void;
  errors: Partial<Record<string, string>>;
};

const Step4PaymentForm: React.FC<Props> = ({
  step1,
  step2,
  step3,
  step5,
  reservation,
  data,
  onChange,
  errors,
}) => {
  const [preview, setPreview] = React.useState<string>("");

  // Reset preview khi file bị xóa từ bên ngoài (ví dụ khi nhấn Quay lại)
  React.useEffect(() => {
    if (!data.receipt_file) setPreview("");
  }, [data.receipt_file]);

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

  const fees = calcFees(step1, step2, step3);
  const productFee =
    step5.want_products === "yes" ? calcProductFee(step5.products) : 0;
  const grandTotal = fees.total + productFee + (Number(data.donation) || 0);
  const isLater = data.payment_timing === "later";

  return (
    <>
      <h5 className="mb-3 text-success fw-bold">Chuyển khoản</h5>

      <div
        className="p-3 rounded mb-2"
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
        thông tin này để tra cứu/chỉnh sửa áo/cabin, hoặc chuyển khoản nếu chọn
        chuyển khoản sau khi hoàn tất đăng ký. Nếu quên, liên hệ ban tổ chức để
        được cấp lại.
      </p>

      {/* ── Quyên góp thiện nguyện ──────────────────────────────────── */}
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
          className="mb-3"
          style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}
        >
          TRAO không chỉ là sự kiện hội ngộ — đây còn là dịp để cộng đồng Bàn
          Chân Xanh cùng nhau gây quỹ hỗ trợ các hoạt động thiện nguyện trong
          năm: trao học bổng cho trẻ em vùng khó khăn, xây trường, hỗ trợ đồng
          bào tại Việt Nam.
        </p>
        <p
          className="mb-3"
          style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}
        >
          Nếu bạn muốn quyên góp, hãy nhập số tiền vào ô bên dưới. Mọi khoản
          đóng góp đều được sử dụng minh bạch và thông báo sau sự kiện.
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
            value={data.donation}
            onChange={(e) => onChange({ donation: e.target.value })}
          />
          <span className="input-group-text">¥</span>
        </div>
        {Number(data.donation) > 0 && (
          <div className="mt-2" style={{ fontSize: 13, color: "#2e7d32" }}>
            🙏 Cảm ơn bạn đã đóng góp{" "}
            <strong>{Number(data.donation).toLocaleString("ja-JP")} ¥</strong>{" "}
            cho quỹ thiện nguyện!
          </div>
        )}
      </div>

      <CostSummaryCard
        step1={step1}
        step2={step2}
        step3={step3}
        step5={step5}
        donation={Number(data.donation) || 0}
      />

      {grandTotal > 0 && (
        <>
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

          {/* ── Chọn thời điểm chuyển khoản ─────────────────────────────── */}
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
                value: "now" as const,
                label: "Chuyển khoản ngay",
                desc: "Upload ảnh chụp màn hình chuyển khoản để hoàn tất đăng ký.",
                icon: "✅",
              },
              {
                value: "later" as const,
                label: "Chuyển khoản sau (trong vòng 24h)",
                desc: "Bạn sẽ cần upload ảnh trong trang tra cứu trước khi hết 24 giờ. Sau 24h chưa chuyển, đăng ký sẽ hết hạn.",
                icon: "⏳",
              },
            ].map((opt) => (
              <label
                key={opt.value}
                className="d-flex align-items-start gap-3 p-3 rounded mb-2"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    data.payment_timing === opt.value ? "#e8f5e9" : "#fff",
                  border: `2px solid ${data.payment_timing === opt.value ? "#4caf50" : "#dee2e6"}`,
                  transition: "all .15s",
                }}
              >
                <input
                  type="radio"
                  name="payment_timing"
                  value={opt.value}
                  checked={data.payment_timing === opt.value}
                  onChange={() =>
                    onChange({
                      payment_timing: opt.value,
                      receipt_file: null,
                      receipt_url: "",
                    })
                  }
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

          {isLater ? (
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
          ) : (
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
                  <p className="text-muted mb-1" style={{ fontSize: 13 }}>
                    Xem trước:
                  </p>
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
          )}
        </>
      )}
    </>
  );
};

export default Step4PaymentForm;
