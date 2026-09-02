import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("bathinda")!;

export const metadata: Metadata = pageMeta({
  title: `AI CCTV in ${location.city} — Alerts, Not Just Video`,
  description: `AI alerts on the CCTV cameras your ${location.city} site already owns — intruder detection, face recognition, fewer false alarms. Free readiness audit.`,
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
