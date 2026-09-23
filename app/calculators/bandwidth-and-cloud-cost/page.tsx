import type { Metadata } from "next";

import CalculatorPage from "@/components/calc/CalculatorPage";
import BandwidthCalc from "@/components/calc/BandwidthCalc";
import { CALCULATORS } from "@/lib/calc/registry";
import { pageMeta } from "@/lib/seo";

const record = CALCULATORS.find((c) => c.id === "bandwidth")!;

export const metadata: Metadata = pageMeta({
  title: "CCTV Bandwidth & Cloud Transfer Calculator | PGAK",
  description: "Size the internet link for CCTV streams and estimate cloud transfer: streams \u00d7 bitrate, with headroom shown separately and data computed from real traffic.",
  path: record.path!,
  keywords: ["CCTV bandwidth calculator", "IP camera bandwidth", "cloud CCTV data usage", "video surveillance bandwidth requirements"],
});

export default function Page() {
  return (
    <CalculatorPage
      record={record}
      example={{
        inputs: "8 streams at 2 Mbps, 24 hours a day for 30 days, with 30% link headroom.",
        result: "16 Mbps of actual traffic, a 20.8 Mbps link to buy, and 5,184 GB transferred \u2014 headroom sizes the link, not the data.",
      }}
    >
      <BandwidthCalc />
    </CalculatorPage>
  );
}
