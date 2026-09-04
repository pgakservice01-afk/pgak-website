import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("delhi-ncr")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Delhi NCR — Retail, Offices, Logistics",
  description:
    "AI alerts on cameras your NCR store, office or warehouse already owns. One record across every branch. Free camera audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Delhi NCR",
    "retail chain security Delhi",
    "warehouse security NCR",
    "office attendance system Delhi",
    "CCTV installation Delhi NCR",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
