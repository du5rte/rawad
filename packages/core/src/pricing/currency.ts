import type { DineroCurrency } from "dinero.js";
import * as currencies from "dinero.js/currencies";

export function getCurrency(code: string): DineroCurrency<number> {
  if (!(code in currencies)) {
    throw new Error(`Unknown currency code: ${code}`);
  }

  return currencies[code as keyof typeof currencies];
}
