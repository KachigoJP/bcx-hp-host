export type Gender = "Nam" | "Nữ" | "Khác" | "";

export type Step1 = {
  email: string;
  name: string;
  gender: Gender;
  age: string;
  disabled: boolean;
  facebook: string;
  phone: string;
  emergency_phone: string;
  emergency_relation: string;
  address: string;
  blood_type: string;
};

export type Member = {
  name: string;
  gender: Gender;
  age: string;
  disabled: boolean;
  relation: string;
};

export type Step2 = {
  register_type: "individual" | "group" | "";
  members: Member[];
};

export type Step3 = {
  transport: "own" | "bus" | "";
  bus_departure: "Tokyo" | "Nagoya" | "Osaka" | "";
};

export type Step4 = {
  receipt_file: File | null;
  receipt_url: string;
};

export type ProductOrder = {
  khan_ran: number;
  khan_tho_cam: number;
  tui_to_te: number;
};

export type Step5 = {
  food_allergy: string;
  want_products: "yes" | "no" | "";
  products: ProductOrder;
  volunteer: "yes" | "no" | "";
  volunteer_teams: string[];
  note: string;
};

export type ParticipantExtra = {
  name: string;
  shirt_size: string;
  shirt_color: string;
  stay: string;
};

export type Step6 = {
  participants: ParticipantExtra[];
};

export type Step1Errors = Partial<Record<keyof Step1, string>>;
