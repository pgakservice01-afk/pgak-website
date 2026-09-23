import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import InvestigationTimeCalc from "@/components/calc/InvestigationTimeCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "investigation-time")!;

export const metadata: Metadata = pageMeta({
  title: "CCTV Investigation Time Calculator \u2014 Hours vs Cash | PGAK",
  description: "How many hours searching footage costs each month, and what those hours are worth as capacity rather than as an automatic cash saving.",
  path: record.path!,
  keywords: ["CCTV investigation time", "footage search time", "security incident review cost"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{ inputs: "20 investigations a month falling from 90 minutes to 30, at \u20b9500 an hour.", result: "20 hours released, worth \u20b910,000 as capacity \u2014 counted as cash only if a post goes unfilled or overtime stops." }}
    >
      <InvestigationTimeCalc />
    </CalculatorPage>
  );
}
