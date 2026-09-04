import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("hoshiarpur")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Hoshiarpur — Plywood, Timber, NRI Homes",
  description:
    "AI alerts on cameras your Hoshiarpur unit or locked house already owns. Timber-yard boundary lines and alerts that reach you abroad. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Hoshiarpur",
    "plywood factory security Hoshiarpur",
    "timber yard CCTV",
    "NRI home security Punjab",
    "attendance system Hoshiarpur",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
