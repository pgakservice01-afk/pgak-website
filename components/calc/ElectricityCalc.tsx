"use client";

import SimpleCalc from "@/components/calc/SimpleCalc";
import { computePower, formatINR, formatNumber } from "@/lib/calc/engine";

export default function ElectricityCalc() {
  return (
    <SimpleCalc
      resultsTitle="Running cost"
      fields={[
        { key: "system", label: "Whole system power", unit: "watts", initial: null, allowUnknown: true, hint: "Cameras, recorder and switch together, from their labels or the quotation." },
        { key: "incremental", label: "Power this project adds", unit: "watts", initial: null, allowUnknown: true, hint: "Usually just the processing unit. This is the figure that belongs in a project case." },
        { key: "hours", label: "Hours a day", unit: "hours", initial: 24, min: 1, max: 24 },
        { key: "days", label: "Days", unit: "days", initial: 30, min: 1, max: 366 },
        { key: "tariff", label: "Electricity tariff", unit: "\u20b9 per kWh", initial: null, allowUnknown: true },
      ]}
      compute={(v) => {
        const r = computePower({
          systemWatts: v.system,
          incrementalWatts: v.incremental,
          hoursPerDay: v.hours ?? 24,
          days: v.days ?? 30,
          tariffPerKWh: v.tariff,
        });
        return {
          rows: [
            { label: "Whole system", value: r.systemKWh === null ? "Watts not entered" : `${formatNumber(r.systemKWh, 1)} kWh` },
            { label: "Whole system cost", value: r.systemCost === null ? "Tariff or watts not entered" : formatINR(r.systemCost) },
            { label: "Added by this project", value: r.incrementalKWh === null ? "Watts not entered" : `${formatNumber(r.incrementalKWh, 1)} kWh`, strong: true },
            { label: "Added cost", value: r.incrementalCost === null ? "Tariff or watts not entered" : formatINR(r.incrementalCost), strong: true },
          ],
          note: "Use the wattages on your own equipment. PoE losses belong once, at the switch \u2014 counting them at the camera as well double-counts the same electricity.",
        };
      }}
      footnote="No PGAK device wattage is assumed here. Ask for the figure for the processing unit you are quoted and enter it above."
    />
  );
}
