import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("mandi-gobindgarh")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Mandi Gobindgarh — Furnaces & Scrap",
  description:
    "AI alerts on cameras your Mandi Gobindgarh furnace or scrap yard already owns. Night-shift gate attendance and number-plate logging. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Mandi Gobindgarh",
    "steel plant security Mandi Gobindgarh",
    "scrap yard CCTV",
    "factory attendance Mandi Gobindgarh",
    "furnace gate security",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
