import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import AttendanceAdminCalc from "@/components/calc/AttendanceAdminCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "attendance-admin")!;

export const metadata: Metadata = pageMeta({
  title: "Attendance Administration Time Calculator | PGAK",
  description: "What attendance reconciliation actually costs: hours before versus after, with any verified payment correction kept as its own line.",
  path: record.path!,
  keywords: ["attendance administration cost", "payroll reconciliation time", "attendance system ROI India"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{ inputs: "30 admin hours a month falling to 8, at \u20b9400 an hour, with a verified \u20b95,000 payment correction.", result: "22 hours released, worth \u20b98,800 as capacity, with the \u20b95,000 correction shown separately." }}
    >
      <AttendanceAdminCalc />
    </CalculatorPage>
  );
}
