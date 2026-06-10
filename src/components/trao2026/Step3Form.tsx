import React from "react";

import type { Step3 } from "./types";

type Props = {
  data: Step3;
  onChange: (patch: Partial<Step3>) => void;
  errors: Partial<Record<keyof Step3, string>>;
};

const Step3Form: React.FC<Props> = ({ data, onChange, errors }) => (
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
            onChange={() => onChange({ transport: "own", bus_departure: "" })}
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
            onChange={() => onChange({ transport: "bus" })}
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
                onChange={() => onChange({ bus_departure: city })}
              />
              <label className="form-check-label" htmlFor={`bus-${city}`}>
                {city}
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
