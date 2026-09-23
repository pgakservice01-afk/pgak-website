import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import MultiSiteTravelCalc from "@/components/calc/MultiSiteTravelCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "multi-site-travel")!;

export const metadata: Metadata = pageMeta({
  title: "Multi-Site CCTV Travel Cost Calculator | PGAK",
  description: "Which site visits remote checks could replace: avoidable visits \u00d7 real travel expense, with travel hours reported separately as capacity.",
  path: record.path!,
  keywords: ["multi site CCTV monitoring cost", "site visit travel saving", "remote site inspection CCTV"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{ inputs: "8 avoidable visits a month at \u20b91,200 each, three hours per visit, at \u20b9500 an hour.", result: "\u20b99,600 of expense avoided as cash, plus 24 hours released worth \u20b912,000 as capacity." }}
    >
      <MultiSiteTravelCalc />
    </CalculatorPage>
  );
}
