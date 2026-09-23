"use client";

import SimpleCalc from "@/components/calc/SimpleCalc";
import { computeAnprGate, formatINR, formatNumber } from "@/lib/calc/engine";

export default function AnprGateCalc() {
  return (
    <SimpleCalc
      resultsTitle="Gate time"
      fields={[
        { key: "vehicles", label: "Vehicles through the gate", unit: "per day", initial: 120, min: 0, max: 5000 },
        { key: "before", label: "Seconds per vehicle today", unit: "seconds", initial: 90, min: 0, max: 900 },
        { key: "after", label: "Seconds per vehicle after", unit: "seconds", initial: 20, min: 0, max: 900 },
        { key: "days", label: "Operating days", unit: "per month", initial: 26, min: 1, max: 31 },
        { key: "staffRate", label: "Gate staff hourly cost", unit: "\u20b9 per hour", initial: null, allowUnknown: true },
        { key: "driverRate", label: "Driver or vehicle hourly cost", unit: "\u20b9 per hour", initial: null, allowUnknown: true, hint: "Only relevant if you pay for that waiting time \u2014 hired vehicles, demurrage." },
      ]}
      toggles={[{ key: "billed", label: "Waiting time is billed to us", hint: "Untick for third-party drivers whose time you do not pay for.", initial: false }]}
      compute={(v, t) => {
        const r = computeAnprGate({
          vehiclesPerDay: v.vehicles ?? 0,
          secondsBefore: v.before ?? 0,
          secondsAfter: v.after ?? 0,
          daysPerMonth: v.days ?? 26,
          gateStaffHourlyCost: v.staffRate,
          driverTimeIsBilledToYou: t.billed,
          driverHourlyCost: v.driverRate,
        });
        return {
          rows: [
            { label: "Saved per vehicle", value: `${formatNumber(r.secondsSavedPerVehicle, 0)} seconds` },
            { label: "Gate hours released", value: `${formatNumber(r.gateHoursPerMonth, 1)} / month`, strong: true },
            { label: "Gate capacity value", value: r.gateCapacityValue === null ? "Hourly cost not entered" : `${formatINR(r.gateCapacityValue)} / month` },
            { label: "Driver waiting time as cash", value: r.driverCashValue === null ? "Not your cost" : `${formatINR(r.driverCashValue)} / month` },
          ],
          note: "Theoretical capacity, not queue throughput: real gates are also limited by lanes, barrier speed and how vehicles arrive in bunches.",
        };
      }}
      footnote="Plate reads depend on the camera per lane, approach angle, speed and night lighting. Where a plate cannot be read dependably, we say so instead of quoting."
    />
  );
}
