import React from "react";

import {
  CHILD_AGE_LIMIT,
  CHILD_FREE_AGE_LIMIT,
  FEE_ADULT,
  FEE_CHILD,
  PRODUCTS,
} from "./constants";
import { calcFees, calcProductFee, fmtYen } from "./helpers";
import type { Step1, Step2, Step3, Step5 } from "./types";

type Props = {
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step5?: Step5;
  donation?: number;
  compact?: boolean;
};

const CostSummaryCard: React.FC<Props> = ({
  step1,
  step2,
  step3,
  step5,
  donation = 0,
  compact,
}) => {
  const fees = calcFees(step1, step2, step3);
  const productFee =
    step5 && step5.want_products === "yes" ? calcProductFee(step5.products) : 0;
  const grandTotal = fees.total + productFee + donation;

  if (!step2.register_type) return null;

  return (
    <div
      className="rounded p-3 mt-4"
      style={{ backgroundColor: "#f0f7f0", border: "1px solid #a5d6a7" }}
    >
      <p className="fw-semibold mb-2" style={{ fontSize: 14 }}>
        💰 Ước tính chi phí
      </p>
      <table className="table table-sm mb-0" style={{ fontSize: 13 }}>
        <tbody>
          {fees.adults > 0 && (
            <tr>
              <td className="ps-0 border-0">
                Người lớn, trẻ em &gt;{CHILD_AGE_LIMIT} tuổi ({fees.adults} ×{" "}
                {fmtYen(FEE_ADULT)})
              </td>
              <td className="text-end border-0 fw-semibold">
                {fmtYen(fees.adults * FEE_ADULT)}
              </td>
            </tr>
          )}
          {fees.children > 0 && (
            <tr>
              <td className="ps-0 border-0">
                Trẻ em {CHILD_FREE_AGE_LIMIT}–{CHILD_AGE_LIMIT} tuổi (
                {fees.children} × {fmtYen(FEE_CHILD)})
              </td>
              <td className="text-end border-0 fw-semibold">
                {fmtYen(fees.children * FEE_CHILD)}
              </td>
            </tr>
          )}
          {fees.free > 0 && (
            <tr>
              <td className="ps-0 border-0">
                Người khuyết tật / Trẻ em &lt;{CHILD_FREE_AGE_LIMIT} tuổi (
                {fees.free} người)
              </td>
              <td className="text-end border-0 fw-semibold text-success">
                Miễn phí
              </td>
            </tr>
          )}
          {step3.transport === "bus" && (
            <tr>
              <td className="ps-0 border-0">
                Xe bus {step3.bus_departure} ({fees.total_people} ×{" "}
                {fmtYen(fees.fee_per_bus)})
              </td>
              <td className="text-end border-0 fw-semibold">
                {fmtYen(fees.bus_fee)}
              </td>
            </tr>
          )}
          {productFee > 0 &&
            PRODUCTS.map((product) => {
              const qty = step5!.products[product.key];
              if (!qty) return null;

              return (
                <tr key={product.key}>
                  <td className="ps-0 border-0">
                    {product.label} ({qty} × {fmtYen(product.price)})
                  </td>
                  <td className="text-end border-0 fw-semibold">
                    {fmtYen(qty * product.price)}
                  </td>
                </tr>
              );
            })}
          {donation > 0 && (
            <tr>
              <td className="ps-0 border-0">❤️ Quyên góp thiện nguyện</td>
              <td
                className="text-end border-0 fw-semibold"
                style={{ color: "#e65100" }}
              >
                {fmtYen(donation)}
              </td>
            </tr>
          )}
          <tr style={{ borderTop: "1px solid #a5d6a7" }}>
            <td className="ps-0 fw-bold">Tổng phí</td>
            <td
              className="text-end fw-bold text-success"
              style={{ fontSize: compact ? 15 : 17 }}
            >
              {fmtYen(grandTotal)}
            </td>
          </tr>
        </tbody>
      </table>
      {step3.transport !== "bus" && step3.transport !== "own" && (
        <p className="text-muted mb-0 mt-1" style={{ fontSize: 12 }}>
          * Phí xe bus sẽ được tính thêm nếu bạn chọn xe ban tổ chức ở bước tiếp
          theo.
        </p>
      )}
    </div>
  );
};

export default CostSummaryCard;
