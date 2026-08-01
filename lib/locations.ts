/**
 * Location landing pages at `/ai-cctv-{city-slug}`.
 *
 * ⚠️ Local SEO honesty rule: only publish a city page for a city you can
 * actually service. Thin, templated city pages for places you don't serve are
 * the classic doorway-page pattern and Google demotes them — and a customer
 * who books from one and can't be served costs more than the ranking is worth.
 *
 * The cities below reflect the dealer coverage described on the site. Remove
 * any you don't serve; add new ones only when a dealer is genuinely in place.
 * `hasOffice: true` means a physical presence — those get LocalBusiness
 * schema with an address. The rest get `areaServed` only, which is the
 * correct markup for a service area without a premises.
 */

export type Location = {
  slug: string;
  city: string;
  region: string;
  /** True only where PGAK has a physical premises. */
  hasOffice: boolean;
  /** Sectors that dominate this market — keeps each page genuinely different. */
  focus: string;
  intro: string;
  localContext: string[];
  nearby: string[];
};

export const LOCATIONS: Location[] = [
  {
    slug: "ludhiana",
    city: "Ludhiana",
    region: "Punjab",
    hasOffice: true,
    focus: "Warehousing, textile and cycle-parts manufacturing",
    intro:
      "PGAK is based in Ludhiana, and it is where most of our earliest deployments still run. The city's mix of textile units, cycle-parts manufacturing and distribution warehousing means the two problems we see most here are gate attendance at scale and stock shrinkage in high-throughput warehouses.",
    localContext: [
      "Large manufacturing units where fingerprint attendance machines fail on oil- and dust-covered hands at shift change.",
      "Distribution warehouses with sizeable existing camera estates and nobody able to watch them.",
      "Long compound perimeters where a single guard covers a kilometre of wall.",
    ],
    nearby: ["Jalandhar", "Amritsar", "Chandigarh", "Mohali"],
  },
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    region: "Delhi, Haryana & Uttar Pradesh",
    hasOffice: false,
    focus: "Offices, retail chains and logistics parks",
    intro:
      "Across Delhi NCR the dominant request is business CCTV that does something during working hours as well as after them — office access monitoring, retail loss prevention across multiple branches, and dispatch-bay coverage in the logistics parks ringing the city.",
    localContext: [
      "Multi-branch retail chains that need one phone showing every store.",
      "Corporate offices retiring access cards and biometric machines in favour of gate face recognition.",
      "Logistics and 3PL warehouses in Gurugram, Noida and Ghaziabad with heavy vehicle movement to log.",
    ],
    nearby: ["Gurugram", "Noida", "Faridabad", "Ghaziabad"],
  },
  {
    slug: "gurugram",
    city: "Gurugram",
    region: "Haryana",
    hasOffice: false,
    focus: "Corporate offices and gated residential",
    intro:
      "Gurugram splits cleanly into two security problems: corporate office floors that need quiet daytime monitoring and hard after-hours alerting, and high-density gated societies where the gate register is still a paper notebook.",
    localContext: [
      "Office towers where tailgating through secured doors is the real access-control gap.",
      "Gated societies wanting resident vehicle recognition so the boom barrier stops being a queue.",
      "Weekend and long-holiday equipment loss from unoccupied office floors.",
    ],
    nearby: ["Delhi", "Noida", "Faridabad", "Manesar"],
  },
  {
    slug: "noida",
    city: "Noida",
    region: "Uttar Pradesh",
    hasOffice: false,
    focus: "Industrial sectors, offices and housing societies",
    intro:
      "Noida's sector layout puts manufacturing units, office parks and large housing societies within a few kilometres of each other, and we deploy across all three — usually starting with gate attendance in the industrial sectors and visitor logging in the societies.",
    localContext: [
      "Industrial-sector units needing contactless shift attendance for large workforces.",
      "Housing societies replacing paper visitor registers with photo-logged entries.",
      "Office parks needing after-hours intrusion alerting across multiple floors.",
    ],
    nearby: ["Greater Noida", "Delhi", "Ghaziabad", "Gurugram"],
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    hasOffice: false,
    focus: "Retail, warehousing and high-density residential",
    intro:
      "Space is the constraint in Mumbai, which changes what security has to do. Retail floors are dense and busy, warehouses are packed and high-turnover, and residential buildings sit directly on public roads — so precision matters more here than anywhere else we deploy.",
    localContext: [
      "Busy retail floors where any motion-based system is unusable and dwell-time detection is the only workable approach.",
      "High-turnover warehouses in the Bhiwandi and Navi Mumbai belts.",
      "Residential buildings fronting public roads, where filtering out pavement traffic is the whole job.",
    ],
    nearby: ["Navi Mumbai", "Thane", "Bhiwandi", "Pune"],
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    region: "Karnataka",
    hasOffice: false,
    focus: "Tech offices, campuses and gated communities",
    intro:
      "Bengaluru asks harder questions about privacy than most markets, and that suits us — processing runs on-premises by default, face data is stored as templates rather than images, and access is role-controlled. The typical deployment here is campus access and attendance rather than theft prevention.",
    localContext: [
      "Tech campuses needing contactless attendance and restricted-room access logs.",
      "Gated communities with multiple entry gates and heavy delivery traffic.",
      "Organisations with internal data-governance reviews that require on-premises processing.",
    ],
    nearby: ["Whitefield", "Electronic City", "Hosur", "Mysuru"],
  },
  {
    slug: "jaipur",
    city: "Jaipur",
    region: "Rajasthan",
    hasOffice: false,
    focus: "Retail, jewellery and hospitality",
    intro:
      "Jaipur's retail and jewellery trade needs a different balance from a warehouse: very high-value stock in small floor areas, constant legitimate customer movement, and a hard requirement that alerts never embarrass a genuine customer. Dwell-time detection with tight zones does the work here.",
    localContext: [
      "Jewellery and high-value retail where a discreet alert to a manager beats any siren.",
      "Hospitality properties needing entrance and common-area monitoring without intruding on guests.",
      "Multi-branch retailers wanting one view across the city.",
    ],
    nearby: ["Ajmer", "Alwar", "Kota", "Udaipur"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

/** Route for a location page. */
export function locationPath(slug: string): string {
  return `/ai-cctv-${slug}`;
}
