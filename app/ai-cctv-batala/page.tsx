import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("batala")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Batala — Foundries and Machine Tools",
  description:
    "AI alerts on cameras your Batala foundry or workshop already owns. Attendance that survives sand and oil. Free camera audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Batala",
    "foundry security Batala",
    "machine tool workshop CCTV",
    "factory attendance Batala",
    "casting yard security",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
