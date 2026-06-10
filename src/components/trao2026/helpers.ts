import {
  CHILD_AGE_LIMIT,
  FEE_ADULT,
  FEE_BUS,
  FEE_CHILD,
  PRODUCTS,
} from "./constants";
import type {
  Member,
  ParticipantExtra,
  ProductOrder,
  Step1,
  Step2,
  Step3,
} from "./types";

export const emptyMember = (): Member => ({
  name: "",
  gender: "",
  age: "",
  relation: "",
});

export function calcProductFee(products: ProductOrder): number {
  return PRODUCTS.reduce((sum, product) => sum + (products[product.key] ?? 0) * product.price, 0);
}

export function calcFees(step1: Step1, step2: Step2, step3: Step3) {
  const allAges: number[] = [Number(step1.age)];
  if (step2.register_type === "group") {
    step2.members.forEach((member) => allAges.push(Number(member.age)));
  }

  const adults = allAges.filter((age) => age >= CHILD_AGE_LIMIT).length;
  const children = allAges.filter((age) => age < CHILD_AGE_LIMIT && age > 0).length;
  const total_people = adults + children;
  const event_fee = adults * FEE_ADULT + children * FEE_CHILD;
  const bus_fee = step3.transport === "bus" ? total_people * FEE_BUS : 0;

  return { adults, children, total_people, event_fee, bus_fee, total: event_fee + bus_fee };
}

export function fmtYen(value: number) {
  return value.toLocaleString("ja-JP") + " ¥";
}

export function buildParticipants(step1: Step1, step2: Step2): ParticipantExtra[] {
  const participants: ParticipantExtra[] = [
    { name: step1.name || "Người đại diện", shirt_size: "", shirt_color: "", stay: "" },
  ];

  if (step2.register_type === "group") {
    step2.members.forEach((member) => {
      participants.push({
        name: member.name || "Thành viên",
        shirt_size: "",
        shirt_color: "",
        stay: "",
      });
    });
  }

  return participants;
}
