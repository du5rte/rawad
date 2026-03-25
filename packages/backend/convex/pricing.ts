import { v } from "convex/values";

export const money = v.object({
  amount: v.string(),
  currencyCode: v.string(),
});

export const percentage = v.object({
  value: v.string(),
});

export const discount = v.object({
  type: v.union(v.literal("fixed"), v.literal("percentage")),
  value: v.union(money, percentage),
  description: v.optional(v.string()),
});

export const range = v.object({
  amount: v.number(),
  unit: v.string(),
});

export const rate = v.object({
  price: money,
  range: v.optional(range),
  additionalRange: v.optional(range),
});

export const vehicleRates = v.object({
  hour: v.optional(rate),
  day: rate,
  week: v.optional(rate),
  month: v.optional(rate),
});
