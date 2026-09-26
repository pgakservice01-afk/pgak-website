import Link from "next/link";
import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import StorageCalc from "@/components/calc/StorageCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "storage")!;

export const metadata: Metadata = pageMeta({
  title: "CCTV Storage Calculator \u2014 Days of Footage to TB | PGAK",
  description: "Work out the disk a CCTV system needs: cameras \u00d7 bitrate \u00d7 hours \u00d7 days, in decimal TB, with the free-space reserve and RAID overhead kept separate.",
  path: record.path!,
  keywords: ["CCTV storage calculator", "how much storage for CCTV", "NVR hard disk size", "CCTV retention days calculator", "camera storage per day"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{
        inputs: "16 cameras, 2 Mbps each, recording 24 hours a day for 30 days.",
        result: "10.368 TB of footage. At 80% usable capacity that is 12.96 TB to buy, before any RAID overhead.",
      }}
    >
      <StorageCalc />
      <p>
        <Link
          href="/insights/cctv-storage-how-many-days"
          className="text-link"
        >
          How many days is CCTV footage stored? →
        </Link>
      </p>
    </CalculatorPage>
  );
}
