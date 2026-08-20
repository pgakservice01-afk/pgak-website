import type { Metadata } from "next";

/**
 * Single source of truth for everything SEO: the canonical origin, the
 * business NAP (name / address / phone) used by LocalBusiness schema, and a
 * `pageMeta()` helper so every page gets a canonical + Open Graph + Twitter
 * card without copy-pasting the same twelve lines.
 *
 * ⚠️ NAP values must match your Google Business Profile *exactly* (character
 * for character). Update `BUSINESS.address` and `BUSINESS.geo` with the real
 * registered address before submitting to Search Console.
 */

export const SITE_URL = "https://www.pgak.co.in";
export const SITE_NAME = "PGAK";

export const BUSINESS = {
  // Exactly as on the MCA Certificate of Incorporation — must match GBP too.
  legalName: "PGAK Innovations Pvt. Ltd.",
  phone: "+91 62839 93600",
  /** E.164 — used in tel: links and schema. */
  phoneE164: "+916283993600",
  whatsapp: "https://wa.me/916283993600",
  email: "Pgakinnovation@gmail.com",
  address: {
    /** Building and street, as they appear on the Google Business Profile. */
    street: "BK Towers, 2480/2, Gill Rd",
    /** Neighbourhood — rendered between street and city, and used in schema. */
    area: "New Janta Nagar, Janta Nagar",
    locality: "Ludhiana",
    region: "Punjab",
    postalCode: "141003",
    country: "IN",
  },
  /** Approximate Gill Road / Janta Nagar pin — replace with the exact
   *  coordinates from the Google Business Profile listing when available. */
  geo: { lat: 30.8846, lng: 75.8342 },
  openingHours: "Mo-Sa 09:00-19:00",
  founded: "2024",
  social: [
    "https://www.instagram.com/pgakinnovation/",
    "https://www.facebook.com/profile.php?id=1160757603787801",
    "https://wa.me/916283993600",
  ],
} as const;

/** Named author for insights posts and case studies (E-E-A-T byline + Person schema). */
export const AUTHOR = {
  name: "Aditya Mittal",
  jobTitle: "Founder, PGAK",
  url: `${SITE_URL}/about`,
} as const;

/**
 * Social card image. Pre-cropped to 1200×630 (the size every card renderer
 * crops to anyway) by scripts/optimize-images.mjs, so the dimensions declared
 * in the meta tags are the real ones.
 */
export const DEFAULT_OG_IMAGE = "/og-pgak-ai-cctv.webp";
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

type PageMetaInput = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/ai-intruder-detection". */
  path: string;
  /** Primary + related keywords for this page. */
  keywords?: readonly string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/**
 * Builds a complete Metadata object — canonical, Open Graph and Twitter card
 * all derived from one set of inputs so they can never drift apart.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  noIndex,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        // Only claim dimensions for the default card, whose size we control.
        // A per-page override could be any shape, so we let the crawler measure.
        image === DEFAULT_OG_IMAGE
          ? { url: ogImage, width: OG_WIDTH, height: OG_HEIGHT, alt: title }
          : { url: ogImage, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Absolute URL for a site-relative path. */
export function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
