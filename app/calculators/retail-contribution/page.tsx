import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import RetailContributionCalc from "@/components/calc/RetailContributionCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "retail-contribution")!;

export const metadata: Metadata = pageMeta({
  title: "Retail Conversion Contribution Calculator (Scenario) | PGAK",
  description: "Model what a small conversion change would be worth: visitors \u00d7 percentage points \u00d7 order value \u00d7 margin, minus extra costs. A scenario, not proof.",
  path: record.path!,
  keywords: ["retail conversion calculator", "footfall conversion value", "store contribution margin calculator"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{ inputs: "10,000 visitors, a 0.5 percentage-point conversion change, \u20b91,200 average order, 40% contribution margin, \u20b95,000 of extra costs.", result: "50 extra orders, \u20b919,000 contribution a month \u2014 a scenario you chose, not evidence that cameras caused it." }}
    >
      <RetailContributionCalc />
    </CalculatorPage>
  );
}
