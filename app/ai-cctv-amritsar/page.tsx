import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("amritsar")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Amritsar — Markets, Hotels, Food Units",
  description:
    "AI alerts on the cameras your Amritsar shop, hotel or food unit already owns. Quiet after-hours katra alerts, discreet hotel cover. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Amritsar",
    "CCTV for shops in Amritsar",
    "hotel CCTV Amritsar",
    "wholesale market security Amritsar",
    "face attendance Amritsar",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
