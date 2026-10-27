import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("ludhiana")!;

export const metadata: Metadata = pageMeta({
  title: "CCTV Installation & AI CCTV in Ludhiana by Our Team | PGAK",
  description:
    "CCTV installation in Ludhiana and AI alerts on cameras you already own, by our own Gill Road team. Free camera audit, gate attendance, number-plate logs.",
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
