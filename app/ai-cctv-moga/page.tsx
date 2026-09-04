import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("moga")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Moga — Dairy, Food and Cold Chain",
  description:
    "AI alerts on cameras your Moga food or cold-chain unit already owns. Hygiene-safe attendance, nothing to touch. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Moga",
    "food factory security Moga",
    "cold store CCTV Moga",
    "hygiene safe attendance",
    "dairy plant security Moga",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
