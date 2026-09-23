"use client";

import SimpleCalc from "@/components/calc/SimpleCalc";
import { computeRetailContribution, formatINR, formatNumber } from "@/lib/calc/engine";

export default function RetailContributionCalc() {
  return (
    <SimpleCalc
      resultsTitle="Scenario contribution"
      fields={[
        { key: "visitors", label: "Visitors", unit: "per month", initial: 10000, min: 0, max: 1000000 },
        { key: "delta", label: "Conversion change", unit: "percentage points", initial: 0, min: -10, max: 10, step: 0.1, hint: "Points, not percent: 0.5 means 20% \u2192 20.5%, not 20% \u2192 20.1%." },
        { key: "aov", label: "Average order value", unit: "\u20b9", initial: null, allowUnknown: true },
        { key: "margin", label: "Contribution margin", unit: "%", initial: 40, min: 0, max: 100 },
        { key: "extra", label: "Extra monthly costs", unit: "\u20b9", initial: 0, min: 0 },
      ]}
      compute={(v) => {
        const r = computeRetailContribution({
          visitorsPerMonth: v.visitors ?? 0,
          conversionChangePercentagePoints: v.delta ?? 0,
          averageOrderValue: v.aov,
          contributionMarginPercent: v.margin ?? 0,
          extraCostsPerMonth: v.extra ?? 0,
        });
        return {
          rows: [
            { label: "Extra orders", value: `${formatNumber(r.extraOrders, 1)} / month` },
            { label: "Contribution", value: r.contributionPerMonth === null ? "Order value not entered" : `${formatINR(r.contributionPerMonth)} / month`, strong: true },
          ],
          note: "A scenario you are choosing, not evidence. Cameras do not cause sales, and PGAK does not sell a retail conversion product \u2014 this exists because retailers need the arithmetic.",
        };
      }}
      footnote="If you want to test a change like this, measure it against a comparable period and a control store, not against last month."
    />
  );
}
