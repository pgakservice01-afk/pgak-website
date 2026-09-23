/**
 * The district coverage registry: what PGAK knows about a place, what it can
 * actually deliver there, and whether that is enough to publish a page.
 *
 * ── The problem this exists to prevent ─────────────────────────────────────
 * Search Console, read 2026-09-23, reports 19 URLs as "Duplicate without
 * user-selected canonical" with validation **FAILED** — and they are real
 * pages, not spam: `/factory-security`, `/industrial-cctv`,
 * `/multi-site-cctv-monitoring`, `/ai-surveillance-system`, four insights
 * articles, and two of the eighteen city pages (`/ai-cctv-batala`,
 * `/ai-cctv-khanna`). Every one of them already declares a self-canonical via
 * `pageMeta()`. Google is ignoring the declared canonical and clustering them
 * anyway, which it does on content similarity, not on markup.
 *
 * `lib/locations.ts` records the same lesson from the other side: measured
 * 2026-09-04, any two city pages shared ~53% of their ten-word phrases and
 * Google had clustered `/ai-cctv-jalandhar` as a duplicate with no canonical
 * of its own.
 *
 * So the template is already at its similarity limit at 18 pages. Generating
 * several hundred more from the same template would multiply a defect Google
 * has already refused to clear. The gate below is the mechanism that stops
 * that: a district is published because there is something true and specific
 * to say about it, never because it exists and has a name.
 *
 * ── The gate is deliberately hard to pass ──────────────────────────────────
 * `readinessOf()` returns `indexable-page-ready` only when ALL of:
 *   1. the record carries an LGD district code from the MASTER source — not
 *      from a cross-check directory (see `DistrictSourceKind`);
 *   2. a verified parent state;
 *   3. at least one service with a delivery mode better than `unknown`;
 *   4. local buying evidence with a source, not just a name.
 * Anything short of that lands in a holding state and appears in the coverage
 * report with the exact gap named. Nothing is quietly dropped.
 */

import type { StateRecord } from "./states.generated.ts";
import { STATES, getStateByCode } from "./states.generated.ts";

export { STATES, getStateByCode };
export type { StateRecord };

/**
 * Where a district record's identity came from. The registry treats these
 * very differently, because only one of them is the administrative register.
 */
export type DistrictSourceKind =
  /** LGD master export (data.gov.in API or an owner-supplied LGD download). */
  | "lgd-master"
  /**
   * NIC's igod district-website directory. Useful for confirming a district
   * has an official web presence; it carries no LGD code, no parent state and
   * no effective dates, so it can never establish identity on its own.
   */
  | "igod-crosscheck";

/** Publication state. Every district in the country holds exactly one. */
export type PublicationStatus =
  /** Passed the gate: useful, verified, approved. Indexable. */
  | "indexable-page-ready"
  /** Identifiable district, local buying evidence incomplete. Not published. */
  | "research-needed"
  /** Delivery for this district is not yet confirmed. Not published. */
  | "availability-check"
  /** A service PGAK does not offer here. Never advertised. */
  | "unavailable"
  /** Already served by a suitable existing canonical page. */
  | "legacy-mapped";

/**
 * How a given service reaches a given place. Kept per service because they
 * genuinely differ: remote analytics on an existing stream is not the same
 * commitment as commissioning hardware on site, and saying otherwise on a
 * page is the kind of claim that costs more than the lead is worth.
 */
export type DeliveryMode =
  | "own-team"
  | "verified-partner"
  | "remote-software"
  | "assessment-required"
  | "not-offered"
  | "unknown";

export type ServiceKey =
  | "cctv-installation"
  | "existing-camera-analytics"
  | "attendance"
  | "anpr"
  | "perimeter-monitoring"
  | "multi-site";

export const SERVICE_KEYS: readonly ServiceKey[] = [
  "cctv-installation",
  "existing-camera-analytics",
  "attendance",
  "anpr",
  "perimeter-monitoring",
  "multi-site",
];

export type ServiceAvailability = {
  service: ServiceKey;
  mode: DeliveryMode;
  /** What establishes this mode. Required for anything except `unknown`. */
  evidence?: string;
  reviewedOn?: string;
};

/** A fact about local demand, with the source that supports it. */
export type LocalEvidence = {
  claim: string;
  sourceUrl: string;
  sourceName: string;
  verifiedOn: string;
};

export type DistrictRecord = {
  /** Official LGD district code. Absent until the master export is ingested. */
  lgdDistrictCode?: number;
  /** Official LGD state code. Absent until a verified parent is established. */
  lgdStateCode?: number;
  /** Official district name, exactly as the source publishes it. */
  name: string;
  /** Raw name as it appeared in the source, kept alongside any display name. */
  rawName: string;
  /** Official local-language name, when the source supplies one. */
  localName?: string;
  /** Validated aliases and former names. Never used to infer identity. */
  aliases?: string[];
  /** Official district website, where one is published. */
  website?: string;
  source: DistrictSourceKind;
  sourceUrl: string;
  sourceDate: string;
  verifiedOn: string;
  /** Public slug. Stable once published. */
  slug: string;
  /** Existing canonical URL, for `legacy-mapped` records. */
  canonicalUrl?: string;
  services?: ServiceAvailability[];
  localEvidence?: LocalEvidence[];
  /** Set only by a human review; the gate cannot grant this itself. */
  publicationApproved?: boolean;
};

/** Why a district is not publishable. Empty means it passed. */
export type ReadinessGap =
  | "no-lgd-district-code"
  | "no-verified-parent-state"
  | "cross-check-source-only"
  | "no-deliverable-service"
  | "no-local-evidence"
  | "not-approved";

export type Readiness = {
  status: PublicationStatus;
  gaps: ReadinessGap[];
};

/**
 * The gate. Returns the status a district record has earned and, when it is
 * not publishable, every reason why — so the coverage report can name the
 * exact next action instead of repeating "needs research".
 *
 * A record already mapped to an existing canonical page short-circuits: the
 * useful page exists, and creating a second one to make the URL hierarchy
 * uniform is how a site ends up with two pages competing for one intent.
 */
export function readinessOf(record: DistrictRecord): Readiness {
  if (record.canonicalUrl) return { status: "legacy-mapped", gaps: [] };

  const gaps: ReadinessGap[] = [];

  if (record.source !== "lgd-master") gaps.push("cross-check-source-only");
  if (record.lgdDistrictCode === undefined) gaps.push("no-lgd-district-code");
  if (record.lgdStateCode === undefined || !getStateByCode(record.lgdStateCode)) {
    gaps.push("no-verified-parent-state");
  }

  const deliverable = (record.services ?? []).filter(
    (s) => s.mode !== "unknown" && s.mode !== "not-offered" && Boolean(s.evidence)
  );
  const offersNothing =
    (record.services ?? []).length > 0 &&
    (record.services ?? []).every((s) => s.mode === "not-offered");

  if (deliverable.length === 0) gaps.push("no-deliverable-service");
  if ((record.localEvidence ?? []).length === 0) gaps.push("no-local-evidence");
  if (!record.publicationApproved) gaps.push("not-approved");

  if (gaps.length === 0) return { status: "indexable-page-ready", gaps };

  // A district PGAK has decided it does not serve is not "pending research";
  // saying so plainly is better than leaving it in a queue forever.
  if (offersNothing) return { status: "unavailable", gaps };

  // Delivery unconfirmed is a different question from local demand unresearched,
  // and they need different follow-ups, so they get different holding states.
  if (gaps.includes("no-deliverable-service")) return { status: "availability-check", gaps };

  return { status: "research-needed", gaps };
}

/** True only for records that may appear in the sitemap and be indexed. */
export function isPublishable(record: DistrictRecord): boolean {
  return readinessOf(record).status === "indexable-page-ready";
}

/**
 * Existing city pages, mapped so the district system never produces a rival
 * URL for a place that already has a working page.
 *
 * These eighteen are city pages, not district pages, and the distinction is
 * real: `/ai-cctv-delhi-ncr` covers a multi-state region that is not a
 * district at all, and `/ai-cctv-chandigarh-mohali` spans a UT and a Punjab
 * district. They are listed by the slug of the place a district record would
 * otherwise claim, so `legacyCanonicalFor()` can hand back the existing URL.
 *
 * Entries are NOT assertions that the city equals the district. They mean:
 * a searcher looking for this place already has a better page than a fresh
 * district template would give them.
 */
const LEGACY_CITY_PAGES: Record<string, string> = {
  ludhiana: "/ai-cctv-ludhiana",
  jalandhar: "/ai-cctv-jalandhar",
  amritsar: "/ai-cctv-amritsar",
  patiala: "/ai-cctv-patiala",
  bathinda: "/ai-cctv-bathinda",
  moga: "/ai-cctv-moga",
  hoshiarpur: "/ai-cctv-hoshiarpur",
  gurugram: "/ai-cctv-gurugram",
  jaipur: "/ai-cctv-jaipur",
  coimbatore: "/ai-cctv-coimbatore",
  mumbai: "/ai-cctv-mumbai",
  bengaluru: "/ai-cctv-bengaluru",
  // Deliberately absent, because the existing page is not district-shaped:
  //   /ai-cctv-delhi-ncr          multi-state region, not a district
  //   /ai-cctv-chandigarh-mohali  spans a UT and a Punjab district
  //   /ai-cctv-noida              city inside Gautam Buddha Nagar district
  //   /ai-cctv-mandi-gobindgarh   town inside Fatehgarh Sahib district
  //   /ai-cctv-khanna             town inside Ludhiana district
  //   /ai-cctv-batala             town inside Gurdaspur district
  // Those six need a documented decision once the LGD master lands; until
  // then a district record for their parent must not silently absorb them.
};

/** The existing canonical page for a district slug, when one already serves it. */
export function legacyCanonicalFor(slug: string): string | undefined {
  return LEGACY_CITY_PAGES[slug];
}

/** Every city page the district system must not duplicate. */
export function legacyCityPageSlugs(): readonly string[] {
  return Object.keys(LEGACY_CITY_PAGES);
}

/** URL-safe slug from an official name. Matches scripts/geo/build-states.mjs. */
export function slugifyPlace(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type CoverageTotals = Record<PublicationStatus, number>;

/** Counts by status. Every record lands in exactly one bucket. */
export function coverageTotals(records: readonly DistrictRecord[]): CoverageTotals {
  const totals: CoverageTotals = {
    "indexable-page-ready": 0,
    "research-needed": 0,
    "availability-check": 0,
    unavailable: 0,
    "legacy-mapped": 0,
  };
  for (const r of records) totals[readinessOf(r).status] += 1;
  return totals;
}
