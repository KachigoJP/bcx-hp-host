import React from "react";

import { STEPS } from "./constants";

const ProgressBar: React.FC<{ current: number }> = ({ current }) => (
  <div className="mb-5">
    <div className="d-flex justify-content-between align-items-start mb-2">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;

        return (
          <div key={step} className="text-center" style={{ flex: 1, position: "relative" }}>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: "50%",
                  width: "100%",
                  height: 3,
                  backgroundColor: done ? "#2e7d32" : "#dee2e6",
                  zIndex: 0,
                }}
              />
            )}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: done ? "#2e7d32" : active ? "#4caf50" : "#dee2e6",
                color: done || active ? "#fff" : "#6c757d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontWeight: 700,
                fontSize: 15,
                position: "relative",
                zIndex: 1,
                border: active ? "3px solid #1b5e20" : "3px solid transparent",
              }}
            >
              {done ? "✓" : step}
            </div>
            <div
              style={{
                fontSize: 11,
                marginTop: 6,
                color: active ? "#2e7d32" : done ? "#4caf50" : "#aaa",
                fontWeight: active ? 700 : 400,
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
    <div className="text-muted text-center" style={{ fontSize: 13 }}>
      Bước {current}/{STEPS.length}
    </div>
  </div>
);

export default ProgressBar;
