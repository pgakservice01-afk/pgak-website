import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import ElectricityCalc from "@/components/calc/ElectricityCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "electricity")!;

export const metadata: Metadata = pageMeta({
  title: "CCTV Electricity Cost Calculator \u2014 Watts to Rupees | PGAK",
  description: "What CCTV and an AI processing unit add to the power bill: watts \u00d7 hours \u00f7 1000 \u00d7 tariff, with incremental project power separated from the whole system.",
  path: record.path!,
  keywords: ["CCTV power consumption", "camera electricity cost", "NVR power usage calculator"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{ inputs: "A 60 W processing unit running 24 hours a day for 30 days at \u20b98 per kWh, beside a 400 W whole system.", result: "43.2 kWh added, costing \u20b9346 \u2014 against 288 kWh and \u20b92,304 for the whole system." }}
    >
      <ElectricityCalc />
    </CalculatorPage>
  );
}
