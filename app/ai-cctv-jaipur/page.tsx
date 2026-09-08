import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("jaipur")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Jaipur — Jewellery, Hotels, Sitapura",
  description:
    "AI alerts on cameras your Jaipur workshop, hotel or unit already owns. Strong-room zones, discreet back-of-house cover. Free camera audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Jaipur",
    "jewellery shop security Jaipur",
    "hotel CCTV Jaipur",
    "strong room monitoring",
    "factory security Sitapura",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
