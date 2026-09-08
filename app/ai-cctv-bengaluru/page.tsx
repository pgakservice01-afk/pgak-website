import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("bengaluru")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Bengaluru — Campuses, Peenya, Gated",
  description:
    "AI alerts on cameras your Bengaluru campus, unit or community already owns. One record across every entrance, agency hours checked. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Bengaluru",
    "office attendance system Bengaluru",
    "campus security Bengaluru",
    "factory security Peenya",
    "face recognition attendance Bengaluru",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
