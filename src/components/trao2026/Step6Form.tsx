import React from "react";

import { SHIRT_COLORS, SHIRT_SIZES } from "./constants";
import type { CabinInfo, ParticipantExtra, Step2, Step6 } from "./types";

const ToggleChip: React.FC<{
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ selected, disabled, onClick, children, style }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={disabled ? "Cabin đã đầy" : undefined}
    style={{
      cursor: disabled ? "not-allowed" : "pointer",
      border: `2px solid ${selected ? "#4caf50" : disabled ? "#e0e0e0" : "#dee2e6"}`,
      borderRadius: 6,
      padding: "3px 10px",
      minWidth: 40,
      textAlign: "center",
      backgroundColor: selected ? "#e8f5e9" : disabled ? "#f5f5f5" : "#fff",
      fontWeight: selected ? 700 : 400,
      fontSize: 12,
      color: disabled ? "#bdbdbd" : selected ? "#2e7d32" : "#333",
      transition: "all 0.15s",
      position: "relative",
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
  cabins: CabinInfo[]; // danh sách cabin từ API
  loadingCabins?: boolean;
};

const Step6Form: React.FC<Props> = ({
  step2,
  data,
  onChange,
  errors,
  cabins,
  loadingCabins,
}) => {
  const updateParticipant = (
    index: number,
    patch: Partial<ParticipantExtra>,
  ) => {
    const updated = data.participants.map((participant, i) =>
      i === index ? { ...participant, ...patch } : participant,
    );
    onChange({ participants: updated });
  };

  // Đếm số người trong form hiện đang chọn từng cabin (pending)
  const pendingCount: Record<number, number> = {};
  for (const p of data.participants) {
    if (p.stay) {
      const n = Number(p.stay);
      if (n > 0) pendingCount[n] = (pendingCount[n] ?? 0) + 1;
    }
  }

  // Nhóm cabin theo tên nhóm, giữ thứ tự xuất hiện đầu tiên
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
    <>
      <h5 className="mb-1 text-success fw-bold">Áo & Chỗ ngủ</h5>
      <div className="d-flex gap-3 mb-4" style={{ fontSize: 13 }}>
        <a href="/trao-2026-ao" target="_blank" className="text-success">
          📐 Xem bảng size & màu áo
        </a>
        <a href="/trao-2026-cabin" target="_blank" className="text-success">
          🏕️ Xem sơ đồ & thông tin cabin
        </a>
      </div>

      {data.participants.map((participant, i) => {
        const isRepresentative = i === 0;

        return (
          <div
            key={i}
            className="rounded p-3 mb-3"
            style={{
              border: isRepresentative
                ? "2px solid #4caf50"
                : "1px solid #dee2e6",
              backgroundColor: isRepresentative ? "#f0f7f0" : "#fafafa",
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-3">
              <strong>{participant.name}</strong>
              {isRepresentative ? (
                <span
                  className="badge"
                  style={{ backgroundColor: "#2e7d32", fontSize: 11 }}
                >
                  {step2.register_type === "individual"
                    ? "Cá nhân"
                    : "Đại diện"}
                </span>
              ) : (
                <span className="badge bg-secondary" style={{ fontSize: 11 }}>
                  Thành viên {i}
                </span>
              )}
            </div>

            <div className="row g-3">
              {/* Dòng 1: Size áo */}
              <div className="col-6 col-md-4">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: 13 }}
                >
                  Size áo <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {SHIRT_SIZES.map((size) => (
                    <ToggleChip
                      key={size}
                      selected={participant.shirt_size === size}
                      onClick={() => updateParticipant(i, { shirt_size: size })}
                      style={{
                        minWidth: 40,
                        textAlign: "center",
                        padding: "5px 8px",
                      }}
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

              {/* Dòng 1: Màu áo */}
              <div className="col-6 col-md-4">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: 13 }}
                >
                  Màu áo <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-2 align-items-center">
                  {SHIRT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      title={color.label}
                      onClick={() =>
                        updateParticipant(i, { shirt_color: color.value })
                      }
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
                        outline:
                          participant.shirt_color === color.value
                            ? "2px solid #4caf50"
                            : "none",
                        outlineOffset: 2,
                        transition: "all 0.15s",
                      }}
                    />
                  ))}
                  {participant.shirt_color && (
                    <span style={{ fontSize: 13, color: "#555" }}>
                      {
                        SHIRT_COLORS.find(
                          (color) => color.value === participant.shirt_color,
                        )?.label
                      }
                    </span>
                  )}
                </div>
                {errors[`color_${i}`] && (
                  <div className="text-danger mt-1" style={{ fontSize: 12 }}>
                    {errors[`color_${i}`]}
                  </div>
                )}
              </div>

              {/* Dòng 2: Cabin (full width) */}
              <div className="col-12">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: 13 }}
                >
                  Cabin <span className="text-danger">*</span>
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
                            const displayRegistered =
                              cabin.registered + pending;
                            const displayFull =
                              displayRegistered >= cabin.capacity;
                            const isSelected =
                              participant.stay === String(cabin.number);
                            return (
                              <ToggleChip
                                key={cabin.number}
                                selected={isSelected}
                                disabled={displayFull && !isSelected}
                                onClick={() =>
                                  !displayFull &&
                                  updateParticipant(i, {
                                    stay: String(cabin.number),
                                  })
                                }
                              >
                                <span style={{ fontWeight: 700 }}>
                                  {cabin.groupOrder}
                                </span>
                                <span
                                  style={{
                                    display: "block",
                                    fontSize: 9,
                                    color:
                                      displayFull && !isSelected
                                        ? "#bdbdbd"
                                        : "#888",
                                    lineHeight: 1,
                                  }}
                                >
                                  {displayRegistered}/{cabin.capacity}
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
                      <span>
                        <span
                          style={{
                            display: "inline-block",
                            width: 12,
                            height: 12,
                            backgroundColor: "#f5f5f5",
                            border: "2px solid #e0e0e0",
                            borderRadius: 3,
                            verticalAlign: "middle",
                          }}
                        />{" "}
                        Đầy
                      </span>
                      <span>Số trong cabin: đã đăng ký / sức chứa</span>
                    </div>
                  </div>
                )}

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
