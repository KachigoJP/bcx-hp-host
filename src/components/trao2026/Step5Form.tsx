import React from "react";

import { PRODUCTS, VOLUNTEER_TEAMS } from "./constants";
import { calcProductFee, fmtYen } from "./helpers";
import type { Step5 } from "./types";

const QtyControl: React.FC<{
  value: number;
  onChange: (n: number) => void;
  label: string;
  price: number;
}> = ({ value, onChange, label, price }) => (
  <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
    <div>
      <span className="fw-semibold" style={{ fontSize: 14 }}>
        {label}
      </span>
      <span className="text-muted ms-2" style={{ fontSize: 13 }}>
        {fmtYen(price)}
      </span>
    </div>
    <div className="d-flex align-items-center gap-2">
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary"
        style={{ width: 32, height: 32, padding: 0, lineHeight: 1 }}
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0}
      >
        −
      </button>
      <span
        style={{
          minWidth: 24,
          textAlign: "center",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {value}
      </span>
      <button
        type="button"
        className="btn btn-sm btn-outline-success"
        style={{ width: 32, height: 32, padding: 0, lineHeight: 1 }}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
      {value > 0 && (
        <span
          className="text-success fw-semibold ms-1"
          style={{ fontSize: 13, minWidth: 60 }}
        >
          = {fmtYen(value * price)}
        </span>
      )}
    </div>
  </div>
);

type Props = {
  data: Step5;
  onChange: (patch: Partial<Step5>) => void;
  onClearError: (key: string) => void;
  errors: Partial<Record<string, string>>;
};

const Step5Form: React.FC<Props> = ({
  data,
  onChange,
  onClearError,
  errors,
}) => {
  const toggleTeam = (team: string) => {
    const current = data.volunteer_teams ?? [];
    const next = current.includes(team)
      ? current.filter((t) => t !== team)
      : [...current, team];
    onChange({ volunteer_teams: next });
  };

  const productFee =
    data.want_products === "yes" ? calcProductFee(data.products) : 0;

  return (
    <>
      <h5 className="mb-4 text-success fw-bold">Thông tin khác</h5>

      <div className="mb-4">
        <div
          className="p-3 rounded mb-3"
          style={{ backgroundColor: "#fff8e1", border: "1px solid #ffe082" }}
        >
          <p className="fw-bold mb-1" style={{ fontSize: 14 }}>
            BÁN KHĂN RẰN, KHĂN THỔ CẨM, TÚI TÒ TE GÂY QUỸ CŨNG LÀ MỘT HOẠT ĐỘNG
            TRONG DỰ ÁN BÀN CHÂN XANH.
          </p>
          <p className="mb-2" style={{ fontSize: 14 }}>
            BẠN CÓ MUỐN SỞ HỮU CÁC SẢN PHẨM CHO HÀNH TRÌNH TUYỆT VỜI NÀY KHÔNG?
          </p>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="products-yes"
                checked={data.want_products === "yes"}
                onChange={() => {
                  onChange({ want_products: "yes" });
                  if (errors.want_products) onClearError("want_products");
                }}
              />
              <label className="form-check-label" htmlFor="products-yes">
                Có
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="products-no"
                checked={data.want_products === "no"}
                onChange={() => {
                  onChange({ want_products: "no" });
                  if (errors.want_products) onClearError("want_products");
                }}
              />
              <label className="form-check-label" htmlFor="products-no">
                Không
              </label>
            </div>
          </div>
          {errors.want_products && (
            <div className="text-danger mt-1" style={{ fontSize: 13 }}>
              {errors.want_products}
            </div>
          )}
        </div>

        {data.want_products === "yes" && (
          <div
            className="rounded p-3"
            style={{ border: "1px solid #ffe082", backgroundColor: "#fffde7" }}
          >
            {PRODUCTS.map((product) => (
              <QtyControl
                key={product.key}
                label={product.label}
                price={product.price}
                value={data.products[product.key]}
                onChange={(n) =>
                  onChange({ products: { ...data.products, [product.key]: n } })
                }
              />
            ))}
            {productFee > 0 && (
              <div className="d-flex justify-content-between pt-2 fw-bold">
                <span>Tổng sản phẩm</span>
                <span className="text-warning" style={{ fontSize: 16 }}>
                  {fmtYen(productFee)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">
          Bạn có muốn tham gia làm cộng tác viên cho TRAO không?{" "}
          <span className="text-danger">*</span>
        </label>
        <div className="d-flex gap-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="volunteer-yes"
              checked={data.volunteer === "yes"}
              onChange={() => {
                onChange({ volunteer: "yes" });
                if (errors.volunteer) onClearError("volunteer");
              }}
            />
            <label className="form-check-label" htmlFor="volunteer-yes">
              Có, tôi muốn đóng góp
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="volunteer-no"
              checked={data.volunteer === "no"}
              onChange={() => {
                onChange({ volunteer: "no", volunteer_teams: [] });
                if (errors.volunteer) onClearError("volunteer");
              }}
            />
            <label className="form-check-label" htmlFor="volunteer-no">
              Không, mình chưa sẵn sàng
            </label>
          </div>
        </div>
        {errors.volunteer && (
          <div className="text-danger mt-1" style={{ fontSize: 13 }}>
            {errors.volunteer}
          </div>
        )}

        {data.volunteer === "yes" && (
          <div
            className="mt-3 p-3 rounded"
            style={{ backgroundColor: "#f0f7f0", border: "1px solid #a5d6a7" }}
          >
            <p className="fw-semibold mb-2" style={{ fontSize: 13 }}>
              Bạn muốn tham gia team nào? (có thể chọn nhiều)
            </p>
            <div className="row g-2">
              {VOLUNTEER_TEAMS.map((team) => (
                <div className="col-6" key={team}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`team-${team}`}
                      checked={(data.volunteer_teams ?? []).includes(team)}
                      onChange={() => toggleTeam(team)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`team-${team}`}
                      style={{ fontSize: 14 }}
                    >
                      {team}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">
          Lời nhắn / Ghi chú / Câu hỏi cho Ban tổ chức
        </label>
        <textarea
          className="form-control"
          rows={4}
          placeholder="Nhập lời nhắn, câu hỏi hoặc ghi chú..."
          value={data.note}
          onChange={(e) => onChange({ note: e.target.value })}
        />
      </div>

      <div
        className="p-3 rounded"
        style={{
          backgroundColor: "#f5f5f5",
          border: "1px solid #e0e0e0",
          fontSize: 13,
          color: "#555",
        }}
      >
        <strong>Ghi chú:</strong>
        <p className="mb-0 mt-1">
          BÀN CHÂN XANH có thể sẽ sử dụng hình ảnh của bạn trong sự kiện để
          truyền thông trên các nền tảng mạng xã hội. Nếu bạn không thích điều
          này có thể liên hệ trực tiếp với một trong những thành viên BTC tại sự
          kiện. Hoặc liên hệ qua fanpage cho chúng mình nhé!
        </p>
      </div>
    </>
  );
};

export default Step5Form;
