import type { Metadata } from "next";

import { PEOPLE } from "./people.ts";

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
  // A company address rather than a personal Gmail: this appears in the
  // Organization schema, on /contact and in the privacy policy, and a free
  // mailbox is the single most common reason a B2B buyer doubts a supplier.
  // Must be kept byte-identical to the Google Business Profile.
  email: "info@pgak.co.in",
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
  // Year of incorporation per the CIN (…PB2023PTC…) — matches the MCA record.
  founded: "2023",
  /** MCA Corporate Identification Number, from the Certificate of Incorporation. */
  cin: "U62013PB2023PTC058631",
} as const;

/** Platforms we have a brand mark for — see components/SocialIcon.tsx. */
export type SocialName =
  | "Instagram"
  | "Facebook"
  | "X"
  | "LinkedIn"
  | "YouTube"
  | "WhatsApp";

export type SocialProfile = {
  name: SocialName;
  /** Handle as it is shown to a reader, e.g. "@pgak.innovations". */
  handle: string;
  /** Full profile URL — or "" while the profile is not live yet. */
  url: string;
};

/**
 * Every PGAK social profile, in the order it renders in the footer.
 *
 * This doubles as the schema.org `sameAs` array (see `socialSameAs()` below and
 * lib/schema.ts) — the signal search engines use to tie this site, the Google
 * Business Profile and each social account together as one entity. A wrong URL
 * here therefore costs more than a dead link does, so a profile whose `url` is
 * empty is skipped everywhere — footer, contact page and `sameAs` alike —
 * rather than shipping a guessed address.
 */
export const SOCIAL: readonly SocialProfile[] = [
  {
    name: "Instagram",
    handle: "@pgak.innovations",
    url: "https://www.instagram.com/pgak.innovations/",
  },
  {
    name: "Facebook",
    handle: "PGAK Innovations",
    url: "https://www.facebook.com/profile.php?id=61593510282587",
  },
  {
    name: "X",
    handle: "@pgakinnovation",
    url: "https://x.com/pgakinnovation",
  },
  {
    name: "LinkedIn",
    handle: "PGAK Innovations",
    url: "https://www.linkedin.com/company/pgakinnovation/",
  },
  {
    name: "YouTube",
    handle: "PGAK Innovations",
    url: "https://www.youtube.com/channel/UC4IL7dZOKq-PvvwqIK6Ng0w",
  },
  {
    name: "WhatsApp",
    handle: BUSINESS.phone,
    url: BUSINESS.whatsapp,
  },
];

/** The profiles that are actually live — the only ones safe to link or claim. */
export const SOCIAL_LIVE: readonly SocialProfile[] = SOCIAL.filter(
  (s) => s.url !== "",
);

/** Live profile URLs, for schema.org `sameAs`. */
export const socialSameAs = (): string[] => SOCIAL_LIVE.map((s) => s.url);

/**
 * The profiles that belong in a "Follow us" row — the ones with a feed to
 * follow. WhatsApp stays in `SOCIAL` because it is a legitimate `sameAs`
 * entry, but it is a contact channel rather than a feed, so it keeps its own
 * CTA link in the footer's contact block instead of appearing twice.
 */
export const SOCIAL_FOLLOW: readonly SocialProfile[] = SOCIAL_LIVE.filter(
  (s) => s.name !== "WhatsApp",
);

/**
 * Named author for insights posts and case studies (E-E-A-T byline + Person
 * schema). The job title was "Founder & CEO, PGAK" until the owner corrected
 * it on 2026-09-24: Aditya leads the company but did not found it, so the
 * byline on every article now reads CEO. See lib/people.ts.
 */
export const AUTHOR = {
  name: "Aditya Mittal",
  jobTitle: "CEO, PGAK",
  url: `${SITE_URL}/leadership`,
  sameAs: ["https://www.linkedin.com/in/adityamittal-pgak"],
} as const;

/**
 * Company leadership shown on /about and /leadership. Derived from
 * lib/people.ts so a role correction lands everywhere at once — the previous
 * hard-coded copy of this list is how the site came to publish one set of
 * roles here and a contradicting set in Organization schema.
 */
export const LEADERSHIP = PEOPLE.map((p) => ({ name: p.name, role: p.role }));

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
