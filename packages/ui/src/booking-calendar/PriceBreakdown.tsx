import type { Money, Percentage } from "@rawad/backend";
import type { calcPriceBreakdown, PriceSegment } from "@rawad/core";

type Breakdown = ReturnType<typeof calcPriceBreakdown>;

function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(money.amount));
}

const UNIT_LABEL: Record<PriceSegment["unit"], string> = {
  month: "month",
  week: "week",
  day: "day",
  hour: "hour",
};

interface PriceBreakdownProps {
  breakdown: Breakdown | null;
}

export function PriceBreakdown({ breakdown }: PriceBreakdownProps) {
  if (!breakdown) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-foreground-400">
        Select dates to see pricing
      </div>
    );
  }

  const savingsAmount =
    parseFloat(breakdown.subtotal.amount) - parseFloat(breakdown.total.amount);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        {breakdown.segments.map((segment) => (
          <div
            key={segment.unit}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-foreground-600">
              {segment.count} {UNIT_LABEL[segment.unit]}
              {segment.count > 1 ? "s" : ""} × {formatMoney(segment.rate.price)}
            </span>
            <span className="font-medium">{formatMoney(segment.subtotal)}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-divider" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground-600">Subtotal</span>
        <span>{formatMoney(breakdown.subtotal)}</span>
      </div>

      {savingsAmount > 0 && (
        <>
          {breakdown.discounts.map((discount) => {
            const label =
              discount.description ??
              (discount.type === "percentage"
                ? `${(discount.value as Percentage).value}% off`
                : "Discount");
            return (
              <div
                key={label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-success-600">{label}</span>
              </div>
            );
          })}
          <div className="flex items-center justify-between text-sm">
            <span className="text-success-600">Savings</span>
            <span className="text-success-600">
              −
              {formatMoney({
                amount: savingsAmount.toFixed(2),
                currencyCode: breakdown.subtotal.currencyCode,
              })}
            </span>
          </div>
        </>
      )}

      <div className="h-px bg-divider" />

      <div className="flex items-center justify-between font-semibold">
        <span>Total</span>
        <span>{formatMoney(breakdown.total)}</span>
      </div>
    </div>
  );
}
