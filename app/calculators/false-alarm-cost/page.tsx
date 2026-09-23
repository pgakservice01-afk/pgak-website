import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import FalseAlarmCalc from "@/components/calc/FalseAlarmCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "false-alarms")!;

export const metadata: Metadata = pageMeta({
  title: "False Alarm Cost Calculator for CCTV Alerts | PGAK",
  description: "What nuisance CCTV alerts cost each month in handling time, and how to judge a reduction without cutting detection coverage.",
  path: record.path!,
  keywords: ["false alarm cost", "CCTV nuisance alerts", "reduce false alarms CCTV"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{ inputs: "40 false alerts a day falling to 6, three minutes each, 30 days, at \u20b9300 an hour.", result: "1,020 alerts avoided, 51 hours released, worth \u20b915,300 as capacity." }}
    >
      <FalseAlarmCalc />
    </CalculatorPage>
  );
}
