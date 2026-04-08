"use client";

import {
  RangeCalendarCell,
  RangeCalendarCellIndicator,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHeader,
  RangeCalendarHeader,
  RangeCalendarHeaderCell,
  RangeCalendarHeading,
  RangeCalendarNavButton,
  RangeCalendarRoot,
  type RangeValue,
} from "@heroui/react";
import {
  type CalendarDate,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import type { Discount, VehicleRates } from "@rawad/backend";
import { calcPriceBreakdown } from "@rawad/core";
import { useMemo, useState } from "react";
import { PriceBreakdown } from "./PriceBreakdown";

const MS_PER_DAY = 86_400_000;

function toTimestamp(d: CalendarDate): number {
  return new Date(d.year, d.month - 1, d.day).getTime();
}

interface BookingCalendarProps {
  vehicleRates: VehicleRates;
  discounts?: Discount[];
}

export function BookingCalendar({
  vehicleRates,
  discounts = [],
}: BookingCalendarProps) {
  const [range, setRange] = useState<RangeValue<CalendarDate> | null>(null);

  const minValue = useMemo(() => today(getLocalTimeZone()), []);

  const breakdown = useMemo(
    () =>
      range != null
        ? calcPriceBreakdown(
            vehicleRates,
            toTimestamp(range.start),
            toTimestamp(range.end) + MS_PER_DAY,
            discounts,
          )
        : null,
    [vehicleRates, range, discounts],
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-divider bg-content1 p-4 shadow-sm w-fit">
      <RangeCalendarRoot value={range} onChange={setRange} minValue={minValue}>
        <RangeCalendarHeader>
          <RangeCalendarNavButton slot="previous" />
          <RangeCalendarHeading />
          <RangeCalendarNavButton slot="next" />
        </RangeCalendarHeader>
        <RangeCalendarGrid>
          <RangeCalendarGridHeader>
            {(day) => <RangeCalendarHeaderCell>{day}</RangeCalendarHeaderCell>}
          </RangeCalendarGridHeader>
          <RangeCalendarGridBody>
            {(date) => (
              <RangeCalendarCell date={date}>
                <RangeCalendarCellIndicator />
                {date.day}
              </RangeCalendarCell>
            )}
          </RangeCalendarGridBody>
        </RangeCalendarGrid>
      </RangeCalendarRoot>
      <div className="h-px bg-divider" />
      <PriceBreakdown breakdown={breakdown} />
    </div>
  );
}
