import { CAPABILITIES } from "./capabilities.ts";
import { getAllInsights } from "./insights.ts";
import { SOLUTIONS } from "./solutions.ts";

/**
 * Industries — the same content, cut by sector instead of by capability.
 *
 * WHY THIS EXISTS
 * `/solutions` groups pages by what the software does (security, attendance,
 * platform). That is the right cut for someone who already knows they want
 * ANPR. It is the wrong cut for the person who arrives thinking "I run a rice
 * sheller", because their sector is not a product category and they have to
 * translate before they can navigate. The vertical-first hub is the standard
 * answer in this market — Milestone, Genetec and Hanwha all publish one — and
 * this is PGAK's version of that idea, built from PGAK's own pages.
 *
 * WHAT IT IS NOT
 * It is not fourteen new landing pages. Search Console currently reports 19
 * URLs as "Duplicate without user-selected canonical" with validation FAILED,
 * including four commercial pages, because this site's templates already sit
 * at their similarity ceiling. Generating a thin page per sector would feed
 * exactly that. So every entry below POINTS AT pages that already exist and
 * already rank on their own; the hub adds a route in, not another URL to
 * compete with.
 *
 * TRUTH RULE (inherited from lib/buyerDecision.ts)
 * `context` describes the SECTOR, never PGAK's record in it. No entry may
 * claim a deployment, a customer, a rupee figure, an accuracy percentage or a
 * response time. Every `solution`, `capability` and `reading` value must
 * resolve to a page that exists — `industries.test.ts` fails the build-time
 * check if one does not, so a renamed slug cannot leave a dead sector here.
 *
 * INDIAN MARKET, NOT A TRANSLATED ONE
 * The sectors are the ones that actually buy CCTV in PGAK's market. Grain
 * mandis, rice shellers, jewellery showrooms, petrol pumps, hosiery and
 * textile units and housing societies are on this list; airports, casinos and
 * public transit are not, because PGAK has neither the content nor the
 * evidence for them and listing a sector it cannot serve is how a directory
 * starts lying.
 */

export type Industry = {
  /** Anchor id on the hub. Not a route — these do not get their own URLs. */
  slug: string;
  name: string;
  /**
   * What the sector's sites are like, in plain terms. A fact about the
   * industry, never a claim about PGAK's work in it.
   */
  context: string;
  /** The existing solution page that already serves this sector, if any. */
  solution?: string;
  /** Capability pages that matter most here, as slugs from lib/capabilities. */
  capabilities: string[];
  /** Existing insights articles written for this sector. */
  reading: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "manufacturing",
    name: "Factories and manufacturing",
    context:
      "A boundary wall, a gate that moves people and vehicles at shift change, and sheds where a camera sees more than any one supervisor can.",
    solution: "factory-security",
    capabilities: ["intrusion-alerts", "attendance-automation", "vehicle-and-anpr"],
    reading: ["how-many-cctv-cameras-does-a-factory-need", "why-biometric-attendance-machines-fail-at-the-factory-gate"],
  },
  {
    slug: "warehousing",
    name: "Warehouses and logistics",
    context:
      "Loading bays, aisles that are empty for most of the night, and stock that moves through several pairs of hands before it leaves.",
    solution: "ai-cctv-for-warehouses",
    capabilities: ["intrusion-alerts", "loitering-detection", "vehicle-and-anpr"],
    reading: ["how-many-cameras-does-a-warehouse-need", "best-ai-cctv-camera-for-warehouses-india"],
  },
  {
    slug: "textiles",
    name: "Textile and hosiery units",
    context:
      "Multi-floor units with contract labour, several shifts and finished goods stored on the same premises as the machines.",
    solution: "industrial-cctv",
    capabilities: ["attendance-automation", "intrusion-alerts"],
    reading: ["textile-unit-security-attendance", "attendance-system-for-contract-labour"],
  },
  {
    slug: "grain-mandis",
    name: "Rice shellers and grain mandis",
    context:
      "Open yards, seasonal labour arriving in bulk, weighbridge traffic and stock that sits outdoors between procurement and dispatch.",
    solution: "industrial-cctv",
    capabilities: ["vehicle-and-anpr", "intrusion-alerts", "attendance-automation"],
    reading: ["rice-sheller-grain-mandi-security"],
  },
  {
    slug: "cold-storage",
    name: "Cold storage",
    context:
      "Chambers people enter rarely, doors that matter more than aisles, and conditions that are hard on cameras and cabling alike.",
    solution: "industrial-cctv",
    capabilities: ["intrusion-alerts", "false-alarm-filtering"],
    reading: ["cold-storage-monitoring-cameras"],
  },
  {
    slug: "retail",
    name: "Retail shops and showrooms",
    context:
      "A shop floor, a till, a stockroom and a back door — and staff who are usually the only people watching any of them.",
    solution: "retail-shop-security",
    capabilities: ["loitering-detection", "face-recognition"],
    reading: ["showroom-retail-shrinkage", "ai-cctv-for-small-shops-worth-it"],
  },
  {
    slug: "jewellery",
    name: "Jewellery showrooms",
    context:
      "High value in a small area, customers handled one to one, and a strongroom whose door is the only thing between stock and the street.",
    solution: "retail-shop-security",
    capabilities: ["loitering-detection", "face-recognition", "intrusion-alerts"],
    reading: ["jewellery-shop-security-india"],
  },
  {
    slug: "pharmacies",
    name: "Pharmacies and medical stores",
    context:
      "Long counter hours, controlled stock behind the counter, and a single person on duty for much of the day.",
    solution: "retail-shop-security",
    capabilities: ["loitering-detection", "intrusion-alerts"],
    reading: ["pharmacy-medical-store-security"],
  },
  {
    slug: "petrol-pumps",
    name: "Petrol pumps and fuel stations",
    context:
      "Forecourt traffic around the clock, cash handled in the open, and vehicles that arrive and leave in under two minutes.",
    solution: "commercial-cctv",
    capabilities: ["vehicle-and-anpr", "intrusion-alerts"],
    reading: ["petrol-pump-security-cameras"],
  },
  {
    slug: "hospitality",
    name: "Hotels and restaurants",
    context:
      "Public areas, service corridors guests never see, kitchens with hygiene rules, and staff on rotas rather than fixed shifts.",
    solution: "commercial-cctv",
    capabilities: ["attendance-automation", "face-recognition"],
    reading: ["hotel-security-and-staff-attendance", "restaurant-kitchen-attendance-hygiene"],
  },
  {
    slug: "offices",
    name: "Offices and IT parks",
    context:
      "A reception, a tailgating problem nobody logs, and a contract workforce whose hours are billed on somebody else's word.",
    solution: "ai-cctv-for-offices",
    capabilities: ["face-recognition", "attendance-automation"],
    reading: ["replace-attendance-register-with-camera", "multi-location-attendance-management"],
  },
  {
    slug: "schools",
    name: "Schools and campuses",
    context:
      "A gate that must know parents from strangers, grounds that empty after hours, and staff attendance that has to survive an audit.",
    solution: "school-security",
    capabilities: ["face-recognition", "intrusion-alerts", "attendance-automation"],
    reading: ["attendance-records-law-india", "cctv-workplace-privacy-india"],
  },
  {
    slug: "healthcare",
    name: "Hospitals and clinics",
    context:
      "Entrances open at all hours, pharmacies and stores that need restricting, and wards where privacy is a legal question, not a preference.",
    solution: "hospital-security",
    capabilities: ["face-recognition", "intrusion-alerts"],
    reading: ["is-ai-cctv-legal-in-india-dpdp-act", "cctv-signage-requirements-india"],
  },
  {
    slug: "housing-societies",
    name: "Housing societies and residential",
    context:
      "A main gate with a visitor register nobody reads back, common areas owned by everybody, and residents who want to know before something happens.",
    solution: "residential-security",
    capabilities: ["vehicle-and-anpr", "face-recognition", "intrusion-alerts"],
    reading: ["housing-society-gate-management"],
  },
  {
    slug: "construction",
    name: "Construction sites",
    context:
      "A perimeter that changes weekly, material stored in the open, and a headcount that is different every morning.",
    solution: "attendance-system-for-construction-sites",
    capabilities: ["attendance-automation", "intrusion-alerts"],
    reading: ["geofencing-attendance-field-staff", "attendance-seasonal-peak-workforce"],
  },
];

/** Every solution slug an industry points at. */
export function industrySolutionSlugs(): string[] {
  return [...new Set(INDUSTRIES.map((i) => i.solution).filter((s): s is string => Boolean(s)))];
}

/**
 * Referential integrity. Returns a list of problems — empty means every slug
 * on every industry resolves to a page that exists. Called by the test so a
 * renamed solution, capability or article cannot silently leave a dead link
 * on the hub.
 */
export function industryLinkProblems(): string[] {
  const solutions = new Set(SOLUTIONS.map((s) => s.slug));
  const capabilities = new Set(CAPABILITIES.map((c) => c.slug));
  const posts = new Set(getAllInsights().map((p) => p.slug));
  const seen = new Set<string>();
  const problems: string[] = [];

  for (const industry of INDUSTRIES) {
    if (seen.has(industry.slug)) problems.push(`duplicate industry slug: ${industry.slug}`);
    seen.add(industry.slug);

    if (industry.solution && !solutions.has(industry.solution)) {
      problems.push(`${industry.slug}: no solution page "${industry.solution}"`);
    }
    if (industry.capabilities.length === 0) {
      problems.push(`${industry.slug}: no capabilities listed`);
    }
    for (const c of industry.capabilities) {
      if (!capabilities.has(c)) problems.push(`${industry.slug}: no capability "${c}"`);
    }
    if (industry.reading.length === 0) {
      problems.push(`${industry.slug}: no reading — an entry with nothing to read is a stub`);
    }
    for (const r of industry.reading) {
      if (!posts.has(r)) problems.push(`${industry.slug}: no insights article "${r}"`);
    }
  }

  return problems;
}
