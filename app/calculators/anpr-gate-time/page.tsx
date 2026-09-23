import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import AnprGateCalc from "@/components/calc/AnprGateCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "anpr-gate")!;

export const metadata: Metadata = pageMeta({
  title: "ANPR Gate Time Calculator \u2014 Vehicles per Day | PGAK",
  description: "How much gate time number-plate recognition could save: vehicles \u00d7 time difference \u00d7 days, with theoretical capacity separated from real queue throughput.",
  path: record.path!,
  keywords: ["ANPR gate time", "number plate recognition ROI", "factory gate vehicle processing"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{ inputs: "120 vehicles a day, 90 seconds falling to 20, over 26 days, gate staff at \u20b9250 an hour.", result: "70 seconds saved per vehicle, 60.7 gate hours a month, worth \u20b915,167 as capacity. Drivers' waiting time is excluded unless you pay for it." }}
    >
      <AnprGateCalc />
    </CalculatorPage>
  );
}
