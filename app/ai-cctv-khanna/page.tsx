import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("khanna")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Khanna — Grain Mandi and Shellers",
  description:
    "AI alerts on cameras your Khanna sheller or godown already owns. Seasonal crew attendance, weighbridge-matching gate logs. Free camera audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Khanna",
    "godown security Khanna",
    "rice sheller CCTV Khanna",
    "grain mandi security",
    "seasonal attendance Khanna",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
