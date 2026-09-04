import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("chandigarh-mohali")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Chandigarh & Mohali — Offices to Zirakpur",
  description:
    "Card-free attendance for tricity offices, showroom cover after closing, number-plate logging on the Zirakpur corridor. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Chandigarh",
    "AI CCTV Mohali",
    "office attendance system Chandigarh",
    "warehouse security Zirakpur",
    "showroom CCTV Chandigarh",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
