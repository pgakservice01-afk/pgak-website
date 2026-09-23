import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import TcoCalc from "@/components/calc/TcoCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "retrofit-vs-replacement")!;

export const metadata: Metadata = pageMeta({
  title: "Retrofit vs Replace CCTV \u2014 Total Cost Calculator | PGAK",
  description: "Compare adding AI to existing cameras against replacing the system: upfront, operating, mid-life replacements and residual value over the same horizon.",
  path: record.path!,
  keywords: ["retrofit vs replace CCTV", "CCTV total cost of ownership", "upgrade or replace security cameras", "CCTV TCO calculator"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{
        inputs: "Retrofit at \u20b95,00,000 upfront and \u20b99,000 a month, against replacement at \u20b93,00,000 upfront, \u20b92,000 a month, \u20b950,000 of replacements and \u20b920,000 residual, over 36 months.",
        result: "Retrofit \u20b98,24,000, replacement \u20b94,02,000 \u2014 replacement is cheaper by \u20b94,22,000. Retrofit does not automatically win.",
      }}
    >
      <TcoCalc />
    </CalculatorPage>
  );
}
