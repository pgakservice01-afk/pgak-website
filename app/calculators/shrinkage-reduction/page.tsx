import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import ShrinkageCalc from "@/components/calc/ShrinkageCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "shrinkage")!;

export const metadata: Metadata = pageMeta({
  title: "CCTV Shrinkage Reduction Calculator (Scenario) | PGAK",
  description: "Model a realistic recovery on documented stock loss: eligible loss \u00d7 the improvement you assume or measured in a pilot. No default recovery rate.",
  path: record.path!,
  keywords: ["shrinkage calculator", "stock loss reduction CCTV", "retail shrinkage India", "inventory loss camera ROI"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{ inputs: "Documented loss \u20b92,00,000 a month, half of it in areas cameras cover, and an assumed 20% improvement.", result: "\u20b91,00,000 eligible, so the scenario benefit is \u20b920,000 a month \u2014 as an assumption to test, not a forecast." }}
    >
      <ShrinkageCalc />
    </CalculatorPage>
  );
}
