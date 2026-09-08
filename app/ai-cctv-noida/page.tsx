import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("noida")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Noida — Sectors, Expressway, Societies",
  description:
    "AI alerts on cameras your Noida factory, office or society already owns. Contract-crew hours you can verify, searchable visitor logs. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Noida",
    "factory security Noida",
    "society visitor management Noida",
    "office attendance system Noida",
    "contract labour attendance Noida",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
