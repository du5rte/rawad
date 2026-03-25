# Pricing

## Domain types

Defined in `packages/backend/convex/pricing.ts` as Convex validators, inferred in `pricing.types.ts`:

- **`Money`** — `{ amount: string, currencyCode: string }`. Amount is a decimal string (e.g. `"250.00"`) to avoid floating-point issues. Converted to/from Dinero via `toDinero` / `toMoney`.
- **`Rate`** — `{ price: Money, range?: Range, additionalRange?: Range }`. A price point with optional range constraints.
- **`VehicleRates`** — the set of rates configured per vehicle: `hour?`, `day` (required), `week?`, `month?`.
- **`Discount`** — `{ type: "fixed" | "percentage", value: Money | Percentage, description? }`.

## Segmented pricing

Durations are broken into the largest applicable tiers (month → week → day → hour) to produce a `PriceSegment[]`. Each segment carries `unit`, `count`, `rate`, and `subtotal`.

`splitIntoSegments(vehicleRates, startDate, endDate)` in `rates.ts`:

- If `vehicleRates.hour` is set: floors the duration to whole days, then appends an hour segment for the remainder (ceiling hours). This prevents a 26h booking from being charged as 2 full days.
- If no hour rate: ceils the duration to whole days (standard behaviour).

The tier reduce runs month → week → day via `buildTierSegments`, a private helper.

## Breakdown calculation

`calcPriceBreakdown(vehicleRates, startDate, endDate, discounts)` in `pricing.ts`:

1. Calls `splitIntoSegments` to get segments.
2. Sums segment subtotals → `subtotal`.
3. Applies each discount via `calcDiscountAmount` → `discountTotal`.
4. Returns `{ segments, subtotal, discounts, total }`. Total is floored at zero.

## Discounts

Two types, both in `discounts.ts`:

- `percentage` — multiplied against the subtotal using a scale-based ratio to preserve decimal precision (e.g. `"10.50"` → `{ amount: 1050, scale: 4 }`).
- `fixed` — a flat `Money` amount subtracted from the subtotal.

## Currency

`getCurrency(code)` in `currency.ts` looks up a `DineroCurrency` from `dinero.js/currencies`. Throws on unknown codes. All arithmetic uses Dinero internally; `Money` is only the serialisation format.
