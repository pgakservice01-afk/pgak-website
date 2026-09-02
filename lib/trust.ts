// Content for the Customer Trust proof pages (/trust/reviews, /photos, /videos).
//
// MEDIA: photos and videos default to on-brand placeholders. To show real
// (AI-generated or real) media, drop the file in /public/trust/... and set its
// `src` here — e.g. src: "/trust/photos/warehouse.jpg" or a video `src` +
// `poster`. Until then the pages render clean placeholder tiles (no 404s).

export type Review = {
  name: string;
  context: string;
  stars: number;
  text: string;
};

export type Photo = {
  caption: string;
  sub?: string;
  src?: string; // e.g. "/trust/photos/warehouse.jpg"
};

export type Video = {
  title: string;
  duration?: string;
  src?: string; // e.g. "/trust/videos/detection.mp4"
  poster?: string; // e.g. "/trust/videos/detection.jpg"
};

export const REVIEWS: Review[] = [
  // Emptied 2026-09-02. The five testimonials here were confirmed by the owner
  // not to be real customers. They shipped in commit bcc0cc8 alongside the
  // AI-generated "installation photos" (since deleted) and the four case
  // studies (since reframed as illustrative scenarios), and the first four
  // were the customer-voice retelling of those same four fictional sites.
  //
  // Named people with star ratings are the highest-risk form of invented proof:
  // fake consumer reviews are actionable under India's consumer-protection
  // rules, and Google treats them as a spam signal. Real, consented quotes go
  // here when they exist; until then the page stays out of the index.
]

export const PHOTOS: Photo[] = [
  // Emptied 2026-08-24: the six images here were AI-generated scenes captioned
  // as specific installations ("Warehouse perimeter coverage — Ludhiana"), which
  // claimed work that had not been done. Real site photographs go here when they
  // exist; until then the page stays out of the index rather than shipping
  // synthetic proof.
];

export const VIDEOS: Video[] = [
  { title: "Live intruder detection demo", duration: "0:42" },
  { title: "Face recognition at the gate", duration: "1:05" },
  { title: "How false-alarm filtering works", duration: "0:58" },
  { title: "PGAK app walkthrough", duration: "1:20" },
];

// Industry-filtered "Protected sites" showcase. Representative deployments —
// replace the metrics/locations with your own verified figures before launch.
export type Industry =
  | "Home"
  | "Retail"
  | "Office"
  | "Warehouse"
  | "Factory"
  | "Society";

export type Site = {
  industry: Industry;
  title: string;
  location: string;
  cameras: number;
  metric: string; // headline outcome
  metricLabel: string;
  note: string;
};

export const INDUSTRIES: Industry[] = [
  "Home",
  "Retail",
  "Office",
  "Warehouse",
  "Factory",
  "Society",
];

export const SITES: Site[] = [
  {
    industry: "Warehouse",
    title: "Distribution warehouse",
    location: "Ludhiana, Punjab",
    cameras: 120,
    metric: "90%",
    metricLabel: "Theft reduced",
    note: "Retrofitted existing CCTV — live in 3 days, no rip-and-replace.",
  },
  {
    industry: "Factory",
    title: "Manufacturing plant",
    location: "Coimbatore",
    cameras: 45,
    metric: "Zero",
    metricLabel: "Biometric queues",
    note: "Gate face-recognition replaced the punch-in machine at shift change.",
  },
  {
    industry: "Retail",
    title: "Retail store",
    location: "Jaipur",
    cameras: 6,
    metric: "80%",
    metricLabel: "Fewer false alerts",
    note: "AI filters wind, shadows and staff — only real events reach the phone.",
  },
  {
    industry: "Society",
    title: "Housing society",
    location: "Hyderabad",
    cameras: 32,
    metric: "24×7",
    metricLabel: "Gate monitoring",
    note: "Every visitor logged; residents alerted to unknown faces at night.",
  },
  {
    industry: "Home",
    title: "Independent house",
    location: "Amritsar",
    cameras: 8,
    metric: "1.9s",
    metricLabel: "To first alert",
    note: "Loitering at the gate after hours pushed an instant snapshot alert.",
  },
  {
    industry: "Office",
    title: "Corporate office",
    location: "Bengaluru",
    cameras: 18,
    metric: "100%",
    metricLabel: "Reception coverage",
    note: "Tailgating and after-hours entry flagged across every floor.",
  },
];
