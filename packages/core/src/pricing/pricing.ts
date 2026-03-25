import type { Discount, VehicleRates } from "@rawad/backend";
import { add, dinero, isNegative, subtract } from "dinero.js";
import { getCurrency } from "./currency";
import { calcDiscountAmount } from "./discounts";
import { toDinero, toMoney } from "./money";
import { splitIntoSegments } from "./rates";

export function calcPriceBreakdown(
  vehicleRates: VehicleRates,
  startDate: number,
  endDate: number,
  discounts: Discount[],
) {
  const currency = getCurrency(vehicleRates.day.price.currencyCode);
  const zero = dinero({ amount: 0, currency });

  const segments = splitIntoSegments(vehicleRates, startDate, endDate);
  const subtotal = segments.reduce(
    (sum, s) => add(sum, toDinero(s.subtotal)),
    zero,
  );
  const discountTotal = discounts.reduce(
    (sum, d) => add(sum, calcDiscountAmount(subtotal, d)),
    zero,
  );
  const rawTotal = subtract(subtotal, discountTotal);

  return {
    segments,
    subtotal: toMoney(subtotal),
    discounts,
    total: toMoney(isNegative(rawTotal) ? zero : rawTotal),
  };
}
