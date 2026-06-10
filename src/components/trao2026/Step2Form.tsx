import React from "react";

import { emptyMember } from "./helpers";
import type { Gender, Member, Step2 } from "./types";

type Props = {
  data: Step2;
  onChange: (patch: Partial<Step2>) => void;
  errors: Partial<Record<string, string>>;
};

const Step2Form: React.FC<Props> = ({ data, onChange, errors }) => {
  const updateMember = (index: number, patch: Partial<Member>) => {
    const updated = data.members.map((member, i) => (i === index ? { ...member, ...patch } : member));
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
              onChange={() => onChange({ register_type: "group", members: [emptyMember()] })}
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

export default Step2Form;
