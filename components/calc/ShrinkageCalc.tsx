"use client";

import SimpleCalc from "@/components/calc/SimpleCalc";
import { computeShrinkage, formatINR } from "@/lib/calc/engine";

export default function ShrinkageCalc() {
  return (
    <SimpleCalc
      resultsTitle="Scenario, not a forecast"
      fields={[
        { key: "loss", label: "Documented loss at cost", unit: "\u20b9 per month", initial: null, allowUnknown: true, hint: "From your own stock records, valued at cost. Not an industry estimate." },
        { key: "eligible", label: "Share the cameras could see", unit: "%", initial: 50, min: 0, max: 100, slider: true, hint: "Loss in areas a camera actually covers. The rest cannot be affected." },
        { key: "improve", label: "Improvement you assume", unit: "%", initial: 0, min: 0, max: 100, slider: true, hint: "Start at zero. Use a figure a pilot measured, or your own judgement \u2014 no default is supplied." },
      ]}
      compute={(v) => {
        const r = computeShrinkage({
          documentedLossPerMonth: v.loss,
          eligibleSharePercent: v.eligible ?? 0,
          improvementPercent: v.improve ?? 0,
        });
        return {
          rows: [
            { label: "Eligible loss", value: r.eligibleLoss === null ? "Loss not entered" : formatINR(r.eligibleLoss) },
            { label: "Scenario benefit", value: r.scenarioBenefit === null ? "\u2014" : `${formatINR(r.scenarioBenefit)} / month`, strong: true },
          ],
          note: (v.improve ?? 0) === 0
            ? "Improvement is zero until you set it. That is deliberate: there is no typical recovery rate that is honest to apply to someone else\u2019s shrinkage."
            : "A scenario built on your assumption. Cameras record and alert; they do not by themselves prove they caused a reduction.",
        };
      }}
      footnote="Treat the output as a hypothesis to test in a pilot, and keep it out of the cash line of a business case until measured."
    />
  );
}
