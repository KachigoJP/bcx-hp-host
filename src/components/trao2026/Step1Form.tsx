import React from "react";

import type { Gender, Step1, Step1Errors } from "./types";

// ── Per-field validators (mirrors validateStep1 in the page) ─────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FB_RE = /^https?:\/\/(www\.)?(facebook\.com|fb\.com)\/.+/i;
const PHONE_RE = /^[\d\s\-\+\(\)]{7,20}$/;

function isValid(name: keyof Step1, value: unknown): boolean {
  const v = String(value ?? "");
  switch (name) {
    case "email":
      return !!v.trim() && EMAIL_RE.test(v.trim());
    case "name":
      return !!v.trim();
    case "gender":
      return !!v;
    case "age":
      return !!v.trim() && Number(v) >= 1 && Number(v) <= 120;
    case "facebook":
      return !!v.trim() && FB_RE.test(v.trim());
    case "phone":
      return !!v.trim() && PHONE_RE.test(v.trim());
    case "emergency_phone":
      return !!v.trim() && PHONE_RE.test(v.trim());
    case "emergency_relation":
      return !!v.trim();
    default:
      return true; // optional fields always "valid"
  }
}

type Props = {
  data: Step1;
  onChange: (patch: Partial<Step1>) => void;
  onClearError: (key: string) => void;
  errors: Step1Errors;
};

const Step1Form: React.FC<Props> = ({
  data,
  onChange,
  onClearError,
  errors,
}) => {
  // Helper cho các text input đơn giản
  const field = (
    label: string,
    name: keyof Step1,
    type = "text",
    placeholder = "",
    required = true,
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
        onChange={(e) => {
          const val = e.target.value;
          onChange({ [name]: val });
          if (errors[name] && isValid(name, val)) onClearError(name);
        }}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <>
      <h5 className="mb-4 text-success fw-bold">Thông tin cá nhân</h5>

      {field("Địa chỉ Email", "email", "email", "example@email.com")}
      {field("Họ và tên", "name", "text", "Nguyễn Văn A")}

      {/* Giới tính */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Giới tính <span className="text-danger">*</span>
        </label>
        <div className="d-flex gap-4">
          {(["Nam", "Nữ", "Khác"] as Gender[]).map((gender) => (
            <div className="form-check" key={gender}>
              <input
                className="form-check-input"
                type="radio"
                id={`gender-${gender}`}
                checked={data.gender === gender}
                onChange={() => {
                  onChange({ gender });
                  if (errors.gender) onClearError("gender");
                }}
              />
              <label className="form-check-label" htmlFor={`gender-${gender}`}>
                {gender}
              </label>
            </div>
          ))}
        </div>
        {errors.gender && (
          <div className="text-danger" style={{ fontSize: 13 }}>
            {errors.gender}
          </div>
        )}
      </div>

      {/* Tuổi */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Tuổi <span className="text-danger">*</span>
        </label>
        <div className="d-flex align-items-center gap-3">
          <input
            type="number"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            placeholder="25"
            value={data.age}
            onChange={(e) => {
              const val = e.target.value;
              onChange({ age: val });
              if (errors.age && isValid("age", val)) onClearError("age");
            }}
            style={{ maxWidth: 120 }}
          />
          <div className="form-check mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              id="rep-disabled"
              checked={data.disabled}
              onChange={(e) => onChange({ disabled: e.target.checked })}
            />
            <label className="form-check-label" htmlFor="rep-disabled">
              Người khuyết tật
            </label>
          </div>
        </div>
        {errors.age && (
          <div className="text-danger mt-1" style={{ fontSize: 13 }}>
            {errors.age}
          </div>
        )}
      </div>

      {field(
        "Link Facebook",
        "facebook",
        "url",
        "https://facebook.com/yourprofile",
      )}
      {field("Số điện thoại", "phone", "tel", "090-1234-5678")}

      {/* SĐT khẩn cấp */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Số điện thoại liên lạc khẩn cấp <span className="text-danger">*</span>
        </label>
        <input
          type="tel"
          className={`form-control ${errors.emergency_phone ? "is-invalid" : ""}`}
          placeholder="090-9876-5432"
          value={data.emergency_phone}
          onChange={(e) => {
            const val = e.target.value;
            onChange({ emergency_phone: val });
            if (errors.emergency_phone && isValid("emergency_phone", val))
              onClearError("emergency_phone");
          }}
        />
        {errors.emergency_phone && (
          <div className="invalid-feedback">{errors.emergency_phone}</div>
        )}
      </div>

      {/* Quan hệ khẩn cấp */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Quan hệ với người tham gia <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${errors.emergency_relation ? "is-invalid" : ""}`}
          placeholder="Vd: Bố/Mẹ, Vợ/Chồng, Anh/Chị..."
          value={data.emergency_relation}
          onChange={(e) => {
            const val = e.target.value;
            onChange({ emergency_relation: val });
            if (errors.emergency_relation && isValid("emergency_relation", val))
              onClearError("emergency_relation");
          }}
        />
        {errors.emergency_relation && (
          <div className="invalid-feedback">{errors.emergency_relation}</div>
        )}
      </div>

      <hr className="my-4" />
      <p className="text-muted fw-semibold mb-3" style={{ fontSize: 13 }}>
        Thông tin tùy chọn (không bắt buộc)
      </p>

      {field(
        "Địa chỉ nhà",
        "address",
        "text",
        "Vd: 1-2-3 Shinjuku, Tokyo",
        false,
      )}

      <div className="mb-3">
        <label className="form-label fw-semibold">Nhóm máu</label>
        <select
          className="form-control"
          value={data.blood_type}
          onChange={(e) => onChange({ blood_type: e.target.value })}
        >
          <option value="">-- Chọn nhóm máu --</option>
          {[
            "A",
            "B",
            "AB",
            "O",
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-",
          ].map((bt) => (
            <option key={bt} value={bt}>
              {bt}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Dị ứng thực phẩm</label>
        <input
          type="text"
          className="form-control"
          placeholder="Vd: hải sản, đậu phộng... (để trống nếu không có)"
          value={data.food_allergy}
          onChange={(e) => onChange({ food_allergy: e.target.value })}
        />
        <div className="form-text">
          Giúp ban tổ chức chuẩn bị bữa ăn phù hợp.
        </div>
      </div>
    </>
  );
};

export default Step1Form;
