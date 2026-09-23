"use client";

import SimpleCalc from "@/components/calc/SimpleCalc";
import { computeFalseAlarms, formatINR, formatNumber } from "@/lib/calc/engine";

export default function FalseAlarmCalc() {
  return (
    <SimpleCalc
      resultsTitle="Nuisance alert workload"
      fields={[
        { key: "before", label: "False alerts a day, today", unit: "alerts", initial: 40, min: 0, max: 1000 },
        { key: "after", label: "False alerts a day, after", unit: "alerts", initial: 6, min: 0, max: 1000 },
        { key: "minutes", label: "Minutes spent on each", unit: "minutes", initial: 3, min: 0, max: 120 },
        { key: "days", label: "Days a month", unit: "days", initial: 30, min: 1, max: 31 },
        { key: "rate", label: "Fully-loaded hourly cost", unit: "\u20b9 per hour", initial: null, allowUnknown: true },
      ]}
      compute={(v) => {
        const r = computeFalseAlarms({
          alertsPerDayBefore: v.before ?? 0,
          alertsPerDayAfter: v.after ?? 0,
          minutesPerAlert: v.minutes ?? 0,
          daysPerMonth: v.days ?? 30,
          hourlyCost: v.rate,
        });
        return {
          rows: [
            { label: "Alerts avoided", value: `${formatNumber(r.alertsAvoided, 0)} / month` },
            { label: "Hours released", value: `${formatNumber(r.hoursPerMonth, 1)} / month`, strong: true },
            { label: "Capacity value", value: r.capacityValue === null ? "Hourly cost not entered" : `${formatINR(r.capacityValue)} / month` },
          ],
          note: "Fewer alerts must come from better classification \u2014 animals, foliage and headlights separated from people and vehicles \u2014 not from narrowing zones or switching detection off.",
        };
      }}
      footnote="The honest test is over a fortnight on your own footage: useful alerts, nuisance alerts and anything missed, counted together."
    />
  );
}
