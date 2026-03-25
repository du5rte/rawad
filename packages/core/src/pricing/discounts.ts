import type { Discount, Money, Percentage } from "@rawad/backend";
import { type Dinero, multiply } from "dinero.js";
import { toDinero } from "./money";

// "10.50" → { amount: 1050, scale: 4 }  (1050 × 10⁻⁴ = 0.1050 = 10.50%)
function percentageRatio(value: string) {
  const [whole, fraction = ""] = value.split(".");
  return { amount: Number(whole + fraction), scale: fraction.length + 2 };
}

export function calcDiscountAmount(
  price: Dinero<number>,
  discount: Discount,
): Dinero<number> {
  if (discount.type === "percentage") {
    return multiply(
      price,
      percentageRatio((discount.value as Percentage).value),
    );
  }
  return toDinero(discount.value as Money);
}
