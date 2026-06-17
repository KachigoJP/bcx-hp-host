import React from "react";

import { SHIRT_COLORS, SHIRT_INVENTORY, SHIRT_SIZES } from "./constants";
import type { CabinInfo, ParticipantExtra, Step2, Step6 } from "./types";

const ToggleChip: React.FC<{
  selected: boolean;
  disabled?: boolean;
  disabledTitle?: string;
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ selected, disabled, disabledTitle, onClick, children, style }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={disabled ? (disabledTitle ?? "Không thể chọn") : undefined}
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
  cabins: CabinInfo[];
  loadingCabins?: boolean;
  shirtCounts?: Record<string, number>; // "white|M" -> số lượng đã đăng ký
};

const Step6Form: React.FC<Props> = ({
  step2,
  data,
  onChange,
  errors,
  cabins,
  loadingCabins,
  shirtCounts = {},
}) => {
  const isInventorySoldOut = (color: string, size: string): boolean => {
    const limit = SHIRT_INVENTORY[color]?.[size];
    if (limit === undefined) return false;
    return (shirtCounts[`${color}|${size}`] ?? 0) >= limit;
  };
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
      <p className="text-muted mb-3" style={{ fontSize: 13 }}>
        Vui lòng chọn size áo, màu áo và cabin cho từng người tham gia. Tham
        khảo thông tin trước khi chọn:
      </p>
      <div className="row g-2 mb-4">
        <div className="col-sm-6">
          <a
            href="/trao-2026-ao"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center gap-3 p-3 rounded text-decoration-none"
            style={{
              backgroundColor: "#f0f7f0",
              border: "1px solid #a5d6a7",
            }}
          >
            <span style={{ fontSize: 24 }}>👕</span>
            <div>
              <div
                className="fw-semibold"
                style={{ color: "#1b5e20", fontSize: 13 }}
              >
                Bảng size & màu áo
              </div>
              <div style={{ fontSize: 11, color: "#888" }}>
                Tham khảo trước khi chọn
              </div>
            </div>
          </a>
        </div>
        <div className="col-sm-6">
          <a
            href="/trao-2026-cabin"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center gap-3 p-3 rounded text-decoration-none"
            style={{
              backgroundColor: "#f0f7f0",
              border: "1px solid #a5d6a7",
            }}
          >
            <span style={{ fontSize: 24 }}>🏕️</span>
            <div>
              <div
                className="fw-semibold"
                style={{ color: "#1b5e20", fontSize: 13 }}
              >
                Danh sách cabin
              </div>
              <div style={{ fontSize: 11, color: "#888" }}>
                Sức chứa & tình trạng
              </div>
            </div>
          </a>
        </div>
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
                  {SHIRT_SIZES.map((size) => {
                    const colorUnavailable =
                      (participant.shirt_color === "green" ||
                        participant.shirt_color === "white") &&
                      (size === "XS" || size === "S");
                    const notAvailable =
                      participant.shirt_color === "yellow" &&
                      !["XS", "S"].includes(size);
                    const inventorySoldOut = participant.shirt_color
                      ? isInventorySoldOut(participant.shirt_color, size)
                      : false;
                    const soldOut = colorUnavailable || inventorySoldOut;
                    const disabled = soldOut || notAvailable;
                    return (
                      <ToggleChip
                        key={size}
                        selected={participant.shirt_size === size}
                        disabled={disabled}
                        disabledTitle={
                          notAvailable
                            ? "Không có cỡ này"
                            : colorUnavailable
                              ? "Không có size này"
                              : "Đã hết áo"
                        }
                        onClick={() =>
                          !disabled &&
                          updateParticipant(i, { shirt_size: size })
                        }
                        style={{
                          minWidth: 40,
                          textAlign: "center",
                          padding: "5px 8px",
                        }}
                      >
                        {size}
                      </ToggleChip>
                    );
                  })}
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
                      onClick={() => {
                        const patch: Partial<ParticipantExtra> = {
                          shirt_color: color.value,
                        };
                        if (
                          (color.value === "green" ||
                            color.value === "white") &&
                          (participant.shirt_size === "XS" ||
                            participant.shirt_size === "S")
                        ) {
                          patch.shirt_size = "";
                        }
                        if (
                          color.value === "yellow" &&
                          !["XS", "S", ""].includes(participant.shirt_size)
                        ) {
                          patch.shirt_size = "";
                        }
                        updateParticipant(i, patch);
                      }}
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
                            const remaining =
                              cabin.capacity - displayRegistered;
                            const isSelected =
                              participant.stay === String(cabin.number);
                            const statusSvg = displayFull ? (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 40 40"
                                style={{ display: "block" }}
                              >
                                <line
                                  x1="8"
                                  y1="8"
                                  x2="32"
                                  y2="32"
                                  stroke="#bdbdbd"
                                  strokeWidth="5"
                                  strokeLinecap="round"
                                />
                                <line
                                  x1="32"
                                  y1="8"
                                  x2="8"
                                  y2="32"
                                  stroke="#bdbdbd"
                                  strokeWidth="5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ) : remaining < cabin.capacity / 2 ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 40 40"
                                style={{ display: "block" }}
                              >
                                <path
                                  d="M17.2,9.3 Q20,4 22.8,9.3 L33.2,28.7 Q36,34 30,34 L10,34 Q4,34 6.8,28.7 Z"
                                  fill="#FFE082"
                                  stroke="#EF6C00"
                                  strokeWidth="2.5"
                                  strokeLinejoin="round"
                                />
                                <rect
                                  x="18.5"
                                  y="13.5"
                                  width="3"
                                  height="11.5"
                                  rx="1.5"
                                  fill="#E65100"
                                />
                                <circle cx="20" cy="30" r="2" fill="#E65100" />
                              </svg>
                            ) : (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 40 40"
                                style={{ display: "block" }}
                              >
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="17"
                                  fill="#F1F8E9"
                                  stroke="#AED581"
                                  strokeWidth="1.5"
                                  strokeDasharray="4 2"
                                />
                                <polyline
                                  points="11,20 17,27 29,13"
                                  fill="none"
                                  stroke="#558B2F"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                            return (
                              <ToggleChip
                                key={cabin.number}
                                selected={isSelected}
                                disabled={displayFull && !isSelected}
                                disabledTitle="Cabin đã đầy"
                                onClick={() =>
                                  !displayFull &&
                                  updateParticipant(i, {
                                    stay: String(cabin.number),
                                  })
                                }
                              >
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  <span style={{ fontWeight: 700 }}>
                                    {cabin.groupOrder}
                                  </span>
                                  {statusSvg}
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
                      <span className="d-flex align-items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 40 40"
                          style={{ display: "block" }}
                        >
                          <line
                            x1="8"
                            y1="8"
                            x2="32"
                            y2="32"
                            stroke="#bdbdbd"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="32"
                            y1="8"
                            x2="8"
                            y2="32"
                            stroke="#bdbdbd"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        </svg>
                        Đầy
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 40 40"
                          style={{ display: "block" }}
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="17"
                            fill="#F1F8E9"
                            stroke="#AED581"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />
                          <polyline
                            points="11,20 17,27 29,13"
                            fill="none"
                            stroke="#558B2F"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Còn nhiều chỗ
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 40 40"
                          style={{ display: "block" }}
                        >
                          <path
                            d="M17.2,9.3 Q20,4 22.8,9.3 L33.2,28.7 Q36,34 30,34 L10,34 Q4,34 6.8,28.7 Z"
                            fill="#FFE082"
                            stroke="#EF6C00"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="18.5"
                            y="13.5"
                            width="3"
                            height="11.5"
                            rx="1.5"
                            fill="#E65100"
                          />
                          <circle cx="20" cy="30" r="2" fill="#E65100" />
                        </svg>
                        Sắp đầy
                      </span>
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
