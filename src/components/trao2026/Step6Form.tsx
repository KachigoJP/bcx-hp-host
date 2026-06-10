import React from "react";

import { CABIN_NUMBERS, SHIRT_COLORS, SHIRT_SIZES } from "./constants";
import type { ParticipantExtra, Step2, Step6 } from "./types";

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

type Props = {
  step2: Step2;
  data: Step6;
  onChange: (patch: Partial<Step6>) => void;
  errors: Partial<Record<string, string>>;
};

const Step6Form: React.FC<Props> = ({ step2, data, onChange, errors }) => {
  const updateParticipant = (index: number, patch: Partial<ParticipantExtra>) => {
    const updated = data.participants.map((participant, i) =>
      i === index ? { ...participant, ...patch } : participant
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

      {data.participants.map((participant, i) => {
        const isRepresentative = i === 0;

        return (
          <div
            key={i}
            className="rounded p-3 mb-3"
            style={{
              border: isRepresentative ? "2px solid #4caf50" : "1px solid #dee2e6",
              backgroundColor: isRepresentative ? "#f0f7f0" : "#fafafa",
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-3">
              <strong>{participant.name}</strong>
              {isRepresentative ? (
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
              <div className="col-6 col-md-3">
                <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
                  Size áo <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {SHIRT_SIZES.map((size) => (
                    <ToggleChip
                      key={size}
                      selected={participant.shirt_size === size}
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

              <div className="col-6 col-md-4">
                <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
                  Màu áo <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {SHIRT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      title={color.label}
                      onClick={() => updateParticipant(i, { shirt_color: color.value })}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: color.hex,
                        border:
                          participant.shirt_color === color.value
                            ? "3px solid #4caf50"
                            : `2px solid ${color.border ?? color.hex}`,
                        cursor: "pointer",
                        outline: participant.shirt_color === color.value ? "2px solid #4caf50" : "none",
                        outlineOffset: 2,
                        transition: "all 0.15s",
                      }}
                    />
                  ))}
                </div>
                {participant.shirt_color && (
                  <div style={{ fontSize: 12, marginTop: 4, color: "#555" }}>
                    {SHIRT_COLORS.find((color) => color.value === participant.shirt_color)?.label}
                  </div>
                )}
                {errors[`color_${i}`] && (
                  <div className="text-danger mt-1" style={{ fontSize: 12 }}>
                    {errors[`color_${i}`]}
                  </div>
                )}
              </div>

              <div className="col-12 col-md-5">
                <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
                  Cabin <span className="text-danger">*</span>
                </label>
                <div className="d-flex flex-wrap gap-1">
                  {CABIN_NUMBERS.map((cabin) => (
                    <ToggleChip
                      key={cabin}
                      selected={participant.stay === String(cabin)}
                      onClick={() => updateParticipant(i, { stay: String(cabin) })}
                      style={{ padding: "3px 10px", minWidth: 40, textAlign: "center" }}
                    >
                      {cabin}
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

export default Step6Form;
