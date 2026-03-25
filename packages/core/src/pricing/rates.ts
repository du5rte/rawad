import type { Money, Rate, VehicleRates } from "@rawad/backend";
import { multiply } from "dinero.js";
import { toDinero, toMoney } from "./money";

export type PriceSegment = {
  unit: "month" | "week" | "day" | "hour";
  count: number;
  rate: Rate;
  subtotal: Money;
};

const TIERS: Array<{ unit: PriceSegment["unit"]; length: number }> = [
  { unit: "month", length: 30 },
  { unit: "week", length: 7 },
  { unit: "day", length: 1 },
];

function buildTierSegments(
  vehicleRates: VehicleRates,
  days: number,
): PriceSegment[] {
  return TIERS.reduce(
    ({ segments, remaining }, { unit, length }) => {
      const rate = vehicleRates[unit];
      if (!rate || remaining < length) return { segments, remaining };
      const count = Math.floor(remaining / length);
      const subtotal = multiply(toDinero(rate.price), count);
      return {
        segments: [
          ...segments,
          { unit, count, rate, subtotal: toMoney(subtotal) },
        ],
        remaining: remaining - count * length,
      };
    },
    { segments: [] as PriceSegment[], remaining: days },
  ).segments;
}

export function splitIntoSegments(
  vehicleRates: VehicleRates,
  startDate: number,
  endDate: number,
): PriceSegment[] {
  const durationMs = endDate - startDate;

  if (vehicleRates.hour) {
    const days = Math.floor(durationMs / 86_400_000);
    const remainingHours = Math.ceil((durationMs % 86_400_000) / 3_600_000);
    const segments = buildTierSegments(vehicleRates, days);
    if (remainingHours > 0) {
      const subtotal = multiply(
        toDinero(vehicleRates.hour.price),
        remainingHours,
      );
      segments.push({
        unit: "hour",
        count: remainingHours,
        rate: vehicleRates.hour,
        subtotal: toMoney(subtotal),
      });
    }
    return segments;
  }

  return buildTierSegments(vehicleRates, Math.ceil(durationMs / 86_400_000));
}
