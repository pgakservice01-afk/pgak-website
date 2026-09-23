"use client";

import SimpleCalc from "@/components/calc/SimpleCalc";
import { computeAdminTime, formatINR, formatNumber } from "@/lib/calc/engine";

export default function AttendanceAdminCalc() {
  return (
    <SimpleCalc
      resultsTitle="Administration, measured"
      fields={[
        { key: "before", label: "Admin and reconciliation hours today", unit: "hours per month", initial: 30, min: 0, max: 400 },
        { key: "after", label: "Hours after", unit: "hours per month", initial: 8, min: 0, max: 400 },
        { key: "rate", label: "Fully-loaded hourly cost", unit: "\u20b9 per hour", initial: null, allowUnknown: true },
        { key: "correction", label: "Verified payment correction", unit: "\u20b9 per month", initial: null, allowUnknown: true, hint: "Only a figure your payroll team has actually verified. Leave unknown otherwise." },
      ]}
      compute={(v) => {
        const r = computeAdminTime({
          hoursBefore: v.before ?? 0,
          hoursAfter: v.after ?? 0,
          hourlyCost: v.rate,
          verifiedPaymentCorrection: v.correction,
        });
        return {
          rows: [
            { label: "Hours released", value: `${formatNumber(r.hoursReleased, 1)} / month`, strong: true },
            { label: "Capacity value", value: r.capacityValue === null ? "Hourly cost not entered" : `${formatINR(r.capacityValue)} / month` },
            { label: "Verified payment correction", value: r.paymentCorrection === null ? "Not entered" : `${formatINR(r.paymentCorrection)} / month` },
          ],
          note: "Nothing here assumes lateness or attendance fraud. If your payroll shows a correction, enter it; if it does not, leave it unknown.",
        };
      }}
      footnote="Face-based attendance needs a camera that sees faces at a usable size at the entrance. Feasibility is checked on your own gate footage first."
    />
  );
}
