import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("bathinda")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Bathinda — Cotton, Grain and Fuel Belt",
  description:
    "AI alerts on cameras your Bathinda yard or godown already owns. Boundary lines that ignore lint and cattle, gate plate logging. Free camera audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Bathinda",
    "godown security Bathinda",
    "cotton yard CCTV Bathinda",
    "contractor attendance Bathinda",
    "warehouse security Bathinda",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
