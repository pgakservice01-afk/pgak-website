import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("mumbai")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Mumbai — Retail, Bhiwandi, Societies",
  description:
    "AI alerts on cameras your Mumbai store, Bhiwandi warehouse or society already owns. No queue at the door, quiet market alerts. Free camera audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Mumbai",
    "warehouse security Bhiwandi",
    "retail store security Mumbai",
    "society visitor management Mumbai",
    "CCTV installation Mumbai",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
