import React from "react";

import { FEE_BUS_OTHER, FEE_BUS_TOKYO } from "./constants";
import { fmtYen } from "./helpers";
import type { Step3 } from "./types";

type Props = {
  data: Step3;
  onChange: (patch: Partial<Step3>) => void;
  onClearError: (key: string) => void;
  errors: Partial<Record<keyof Step3, string>>;
};

const Step3Form: React.FC<Props> = ({
  data,
  onChange,
  onClearError,
  errors,
}) => (
  <>
    <h5 className="mb-4 text-success fw-bold">Phương tiện di chuyển</h5>

    <div className="mb-4">
      <label className="form-label fw-semibold">
        Phương tiện <span className="text-danger">*</span>
      </label>
      <div className="d-flex flex-column gap-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="transport-own"
            checked={data.transport === "own"}
            onChange={() => {
              onChange({ transport: "own", bus_departure: "" });
              if (errors.transport) onClearError("transport");
            }}
          />
          <label className="form-check-label" htmlFor="transport-own">
            <strong>Ô tô riêng / Phương tiện cá nhân</strong>
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="transport-bus"
            checked={data.transport === "bus"}
            onChange={() => {
              onChange({ transport: "bus" });
              if (errors.transport) onClearError("transport");
            }}
          />
          <label className="form-check-label" htmlFor="transport-bus">
            <strong>Xe bus Ban tổ chức</strong>
          </label>
        </div>
      </div>
      {errors.transport && (
        <div className="text-danger mt-1" style={{ fontSize: 13 }}>
          {errors.transport}
        </div>
      )}
    </div>

    {data.transport === "bus" && (
      <div
        className="p-3 rounded border"
        style={{ backgroundColor: "#f0f7f0", borderColor: "#a5d6a7" }}
      >
        <label className="form-label fw-semibold">
          Nơi xuất phát <span className="text-danger">*</span>
        </label>
        <div className="d-flex gap-4">
          {(["Tokyo", "Nagoya", "Osaka"] as const).map((city) => (
            <div className="form-check" key={city}>
              <input
                className="form-check-input"
                type="radio"
                id={`bus-${city}`}
                checked={data.bus_departure === city}
                onChange={() => {
                  onChange({ bus_departure: city });
                  if (errors.bus_departure) onClearError("bus_departure");
                }}
              />
              <label className="form-check-label" htmlFor={`bus-${city}`}>
                {city}{" "}
                <span className="text-muted" style={{ fontSize: 12 }}>
                  (
                  {city === "Tokyo"
                    ? fmtYen(FEE_BUS_TOKYO)
                    : fmtYen(FEE_BUS_OTHER)}
                  /người)
                </span>
              </label>
            </div>
          ))}
        </div>
        {errors.bus_departure && (
          <div className="text-danger mt-1" style={{ fontSize: 13 }}>
            {errors.bus_departure}
          </div>
        )}
      </div>
    )}
  </>
);

export default Step3Form;
