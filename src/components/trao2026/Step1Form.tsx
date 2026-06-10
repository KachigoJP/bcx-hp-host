import React from "react";

import type { Gender, Step1, Step1Errors } from "./types";

type Props = {
  data: Step1;
  onChange: (patch: Partial<Step1>) => void;
  errors: Step1Errors;
};

const Step1Form: React.FC<Props> = ({ data, onChange, errors }) => {
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
          {(["Nam", "Nữ", "Khác"] as Gender[]).map((gender) => (
            <div className="form-check" key={gender}>
              <input
                className="form-check-input"
                type="radio"
                id={`gender-${gender}`}
                checked={data.gender === gender}
                onChange={() => onChange({ gender })}
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
            (bloodType) => (
              <option key={bloodType} value={bloodType}>
                {bloodType}
              </option>
            )
          )}
        </select>
      </div>
    </>
  );
};

export default Step1Form;
