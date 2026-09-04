import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("coimbatore")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Coimbatore — Mills, Pumps, Foundries",
  description:
    "AI alerts on cameras your Coimbatore mill or engineering unit already owns. Shift-gate attendance that survives cotton fluff. Free camera audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Coimbatore",
    "spinning mill security Coimbatore",
    "factory security system in Coimbatore",
    "shift attendance Coimbatore",
    "engineering unit CCTV Coimbatore",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
