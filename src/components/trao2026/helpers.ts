import {
  CHILD_AGE_LIMIT,
  CHILD_FREE_AGE_LIMIT,
  FEE_ADULT,
  FEE_BUS_OTHER,
  FEE_BUS_TOKYO,
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
  disabled: false,
  relation: "",
});

export function calcProductFee(products: ProductOrder): number {
  return PRODUCTS.reduce(
    (sum, product) => sum + (products[product.key] ?? 0) * product.price,
    0,
  );
}

export function calcFees(step1: Step1, step2: Step2, step3: Step3) {
  type Person = { age: number; disabled: boolean };
  const allPeople: Person[] = [
    { age: Number(step1.age), disabled: step1.disabled },
  ];
  if (step2.register_type === "group") {
    step2.members.forEach((member) =>
      allPeople.push({ age: Number(member.age), disabled: member.disabled }),
    );
  }

  const validPeople = allPeople.filter((p) => p.age > 0);
  const adults = validPeople.filter(
    (p) => !p.disabled && p.age > CHILD_AGE_LIMIT,
  ).length;
  const children = validPeople.filter(
    (p) =>
      !p.disabled && p.age >= CHILD_FREE_AGE_LIMIT && p.age <= CHILD_AGE_LIMIT,
  ).length;
  const free = validPeople.filter(
    (p) => p.disabled || p.age < CHILD_FREE_AGE_LIMIT,
  ).length;
  const total_people = adults + children + free;

  const event_fee = adults * FEE_ADULT + children * FEE_CHILD;
  const fee_per_bus =
    step3.bus_departure === "Tokyo" ? FEE_BUS_TOKYO : FEE_BUS_OTHER;
  const bus_fee = step3.transport === "bus" ? total_people * fee_per_bus : 0;

  return {
    adults,
    children,
    free,
    total_people,
    event_fee,
    bus_fee,
    fee_per_bus,
    total: event_fee + bus_fee,
  };
}

export function fmtYen(value: number) {
  return value.toLocaleString("ja-JP") + " ¥";
}

export function buildParticipants(
  step1: Step1,
  step2: Step2,
): ParticipantExtra[] {
  const participants: ParticipantExtra[] = [
    {
      name: step1.name || "Người đại diện",
      shirt_size: "",
      shirt_color: "",
      stay: "",
    },
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
