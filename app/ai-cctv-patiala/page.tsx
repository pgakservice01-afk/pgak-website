import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("patiala")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Patiala — Campuses, Machinery, Kothis",
  description:
    "AI alerts on cameras your Patiala campus, works or kothi already owns. Contractor hours, long boundary walls. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Patiala",
    "campus security Patiala",
    "CCTV for schools Patiala",
    "home security Patiala",
    "attendance system Patiala",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
