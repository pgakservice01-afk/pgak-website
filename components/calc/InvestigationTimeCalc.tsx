"use client";

import SimpleCalc from "@/components/calc/SimpleCalc";
import { computeTimeReleased, formatINR, formatNumber } from "@/lib/calc/engine";

export default function InvestigationTimeCalc() {
  return (
    <SimpleCalc
      resultsTitle="Hours first, money second"
      fields={[
        { key: "events", label: "Investigations", unit: "per month", initial: 20, min: 0, max: 500 },
        { key: "before", label: "Minutes each, today", unit: "minutes", initial: 90, min: 0, max: 600 },
        { key: "after", label: "Minutes each, after", unit: "minutes", initial: 30, min: 0, max: 600 },
        { key: "rate", label: "Fully-loaded hourly cost", unit: "\u20b9 per hour", initial: null, allowUnknown: true },
      ]}
      toggles={[{ key: "mechanism", label: "A specific post is not filled, or overtime stops", hint: "Only then do these hours become cash rather than capacity.", initial: false }]}
      compute={(v, t) => {
        const r = computeTimeReleased({
          eventsPerMonth: v.events ?? 0,
          minutesBefore: v.before ?? 0,
          minutesAfter: v.after ?? 0,
          hourlyCost: v.rate,
          cashMechanism: t.mechanism ? "stated" : "",
        });
        return {
          rows: [
            { label: "Hours released", value: `${formatNumber(r.hoursPerMonth, 1)} / month`, strong: true },
            { label: "Capacity value", value: r.capacityValuePerMonth === null ? "Hourly cost not entered" : `${formatINR(r.capacityValuePerMonth)} / month` },
            { label: "Cash saving", value: r.cashSavingPerMonth === null ? "None claimed" : `${formatINR(r.cashSavingPerMonth)} / month`, strong: true },
          ],
          note: r.cashSavingPerMonth === null
            ? "Released time is capacity until something changes on the payroll. Without that, this is work your team can do instead \u2014 valuable, but not a cheque."
            : "Counted as cash because you confirmed a specific staffing change.",
        };
      }}
      footnote="Search speed depends on how well the footage is indexed and how precisely you can describe the event. Measure it on your own recordings."
    />
  );
}
