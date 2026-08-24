import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("jalandhar")!;

export const metadata: Metadata = pageMeta({
  title: `AI CCTV Camera in ${location.city} — Alerts on Your Own Cameras | PGAK`,
  description: `AI CCTV and intruder detection in ${location.city}, ${location.region}. PGAK adds real-time alerts, face recognition and false-alarm filtering to the cameras you already own — ₹1,000 per camera per month.`,
  path: locationPath(location.slug),
  keywords: [
    `AI CCTV camera ${location.city}`,
    `CCTV installation ${location.city}`,
    `AI intruder detection ${location.city}`,
    `business CCTV ${location.city}`,
    `smart security system ${location.city}`,
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
