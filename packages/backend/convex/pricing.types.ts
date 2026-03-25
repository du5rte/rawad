import type { Infer } from "convex/values";
import type {
  discount,
  money,
  percentage,
  range,
  rate,
  vehicleRates,
} from "./pricing";

export type Money = Infer<typeof money>;
export type Percentage = Infer<typeof percentage>;
export type Discount = Infer<typeof discount>;
export type Range = Infer<typeof range>;
export type Rate = Infer<typeof rate>;
export type VehicleRates = Infer<typeof vehicleRates>;
