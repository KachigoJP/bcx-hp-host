import type { ProductOrder } from "./types";

export const FEE_ADULT = 20000;
export const FEE_CHILD = 10000;
export const FEE_BUS = 10000;
export const CHILD_AGE_LIMIT = 12;

export const PRODUCTS = [
  { key: "khan_ran" as keyof ProductOrder, label: "Khăn Rằn", price: 800 },
  { key: "khan_tho_cam" as keyof ProductOrder, label: "Khăn Thổ Cẩm", price: 1300 },
  { key: "tui_to_te" as keyof ProductOrder, label: "Túi Tò Te", price: 1200 },
];

export const VOLUNTEER_TEAMS = [
  "Team truyền thông",
  "Team ẩm thực",
  "MC",
  "Team hậu cần",
  "Team thu ngân / lễ tân",
  "Team văn nghệ",
  "Team camera",
];

export const SHIRT_SIZES = ["S", "M", "L"];

export const SHIRT_COLORS = [
  { value: "black", label: "Đen", hex: "#212121" },
  { value: "white", label: "Trắng", hex: "#f5f5f5", border: "#bdbdbd" },
  { value: "blue", label: "Xanh", hex: "#1565c0" },
];

export const CABIN_NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

export const STEPS = [
  "Thông tin cá nhân",
  "Hình thức đăng ký",
  "Phương tiện di chuyển",
  "Thông tin khác",
  "Áo & Chỗ ngủ",
  "Chuyển khoản",
];
