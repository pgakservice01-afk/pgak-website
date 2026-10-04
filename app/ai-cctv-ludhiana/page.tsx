import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("ludhiana")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Ludhiana — CCTV Installation by Our Own Team, Gill Road",
  description:
    "AI alerts on the cameras your Ludhiana unit already owns, and CCTV installation by our own Gill Road team — free audit first. Gate attendance, godown cover.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Ludhiana",
    "cctv camera ludhiana",
    "CCTV installation company in Ludhiana",
    "cctv installation ludhiana",
    "cctv installation companies near me",
    "factory attendance Ludhiana",
    "warehouse security Ludhiana",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
