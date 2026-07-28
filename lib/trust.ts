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
  {
    name: "Rajinder Singh",
    context: "Warehouse owner · Ludhiana",
    stars: 5,
    text: "We had 120 cameras but still lost stock every month. Within weeks of PGAK the theft basically stopped — the alert reaches my phone before the guard even notices something is wrong.",
  },
  {
    name: "Meena Verma",
    context: "Retail store · Jaipur",
    stars: 5,
    text: "The endless false alarms used to drive us mad, so we'd stopped trusting the cameras. Now I only get pinged when it actually matters. Setup took one afternoon on the cameras we already had.",
  },
  {
    name: "Arjun Nair",
    context: "Factory manager · Coimbatore",
    stars: 4,
    text: "Face recognition at the gate quietly replaced our biometric machine — attendance is automatic now and the queues at shift change are gone. Support has been genuinely responsive.",
  },
  {
    name: "Fatima Sheikh",
    context: "Housing society · Hyderabad",
    stars: 5,
    text: "As a society committee we needed something simple that worked with our old DVR. PGAK just connected to it. Residents tell us they finally feel safe walking in at night.",
  },
  {
    name: "Harpreet Kaur",
    context: "Jewellery shop · Amritsar",
    stars: 5,
    text: "Peace of mind is exactly the right phrase. An unknown person loitered outside after closing and I got an alert with a snapshot instantly. Worth every single rupee.",
  },
];

export const PHOTOS: Photo[] = [
  { caption: "Warehouse perimeter coverage", sub: "Ludhiana, Punjab" },
  { caption: "Retail entrance camera", sub: "Jaipur" },
  { caption: "Factory gate — face & plate recognition", sub: "Coimbatore" },
  { caption: "Office reception desk", sub: "Bengaluru" },
  { caption: "Society main gate", sub: "Hyderabad" },
  { caption: "PGAK edge device install", sub: "Amritsar" },
];

export const VIDEOS: Video[] = [
  { title: "Live intruder detection demo", duration: "0:42" },
  { title: "Face recognition at the gate", duration: "1:05" },
  { title: "How false-alarm filtering works", duration: "0:58" },
  { title: "PGAK app walkthrough", duration: "1:20" },
];
