"use client";

import SimpleCalc from "@/components/calc/SimpleCalc";
import { computeTravel, formatINR, formatNumber } from "@/lib/calc/engine";

export default function MultiSiteTravelCalc() {
  return (
    <SimpleCalc
      resultsTitle="Visits avoided"
      fields={[
        { key: "visits", label: "Avoidable visits", unit: "per month", initial: 8, min: 0, max: 200, hint: "Only visits made purely to look at something a camera could show." },
        { key: "expense", label: "Travel and accommodation per visit", unit: "\u20b9", initial: null, allowUnknown: true },
        { key: "hours", label: "Hours per visit", unit: "hours", initial: 3, min: 0, max: 48 },
        { key: "rate", label: "Fully-loaded hourly cost", unit: "\u20b9 per hour", initial: null, allowUnknown: true },
      ]}
      compute={(v) => {
        const r = computeTravel({
          avoidableVisitsPerMonth: v.visits ?? 0,
          expensePerVisit: v.expense,
          hoursPerVisit: v.hours ?? 0,
          hourlyCost: v.rate,
        });
        return {
          rows: [
            { label: "Expense avoided (cash)", value: r.cashPerMonth === null ? "Expense not entered" : `${formatINR(r.cashPerMonth)} / month`, strong: true },
            { label: "Travel hours released", value: `${formatNumber(r.hoursPerMonth, 1)} / month` },
            { label: "Capacity value", value: r.capacityValue === null ? "Hourly cost not entered" : `${formatINR(r.capacityValue)} / month` },
          ],
          note: "Remote viewing does not replace inspections you are required to perform in person \u2014 safety walks, statutory checks or anything needing a signature on site.",
        };
      }}
      footnote="Expense avoided is cash. The hours are capacity, and only become money if the time is redeployed or the travel was billed."
    />
  );
}
