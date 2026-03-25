import type { Money } from "@rawad/backend";
import { type Dinero, dinero, toDecimal, toSnapshot } from "dinero.js";

import { getCurrency } from "./currency";

export function toDinero(money: Money): Dinero<number> {
  const currency = getCurrency(money.currencyCode);
  const [whole, fraction = ""] = money.amount.split(".");
  const padded = fraction
    .padEnd(currency.exponent, "0")
    .slice(0, currency.exponent);
  return dinero({ amount: Number(whole + padded), currency });
}

export function toMoney(d: Dinero<number>): Money {
  const { currency } = toSnapshot(d);
  return { amount: toDecimal(d), currencyCode: currency.code };
}
