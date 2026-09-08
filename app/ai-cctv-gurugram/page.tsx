import type { Metadata } from "next";
import LocationPage from "@/components/solutions/LocationPage";
import { getLocation, locationPath } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const location = getLocation("gurugram")!;

export const metadata: Metadata = pageMeta({
  title: "AI CCTV in Gurugram — Offices, Societies, Manesar",
  description:
    "AI alerts on cameras your Gurugram office, society or warehouse already owns. Badges cannot be shared when the record is a face. Free audit.",
  path: locationPath(location.slug),
  keywords: [
    "AI CCTV Gurugram",
    "office attendance system Gurugram",
    "society visitor management Gurugram",
    "warehouse security Manesar",
    "face recognition attendance Gurugram",
  ],
});

export default function Page() {
  return <LocationPage location={location} />;
}
