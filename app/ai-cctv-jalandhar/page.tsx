import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("jalandhar")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Jalandhar — Sports Goods, Tools, Leather",
  description:
    "AI alerts on the cameras your Jalandhar unit already owns. Finished-goods stores, mixed job-work gates. Free camera audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Jalandhar",
    "CCTV installation company in Jalandhar",
    "factory security Jalandhar",
    "face attendance Jalandhar",
    "export unit CCTV Jalandhar",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
