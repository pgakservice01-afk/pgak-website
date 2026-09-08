import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("ludhiana")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Ludhiana — Our Home City, Our Team",
  description:
    "AI alerts on the cameras your Ludhiana unit already owns. Gate attendance for hosiery and cycle-parts shifts, godown cover. Surveyed by our own team.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Ludhiana",
    "cctv camera ludhiana",
    "CCTV installation company in Ludhiana",
    "factory attendance Ludhiana",
    "warehouse security Ludhiana",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
