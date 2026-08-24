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
  /** A use-case scenario set in this city (hub → spoke link). */
  caseStudy?: { href: string; label: string };
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
    nearby: ["Khanna", "Mandi Gobindgarh", "Jalandhar", "Moga"],
    caseStudy: {
      href: "/insights/case-studies/warehouse-shrinkage-ludhiana",
      label: "How AI CCTV cuts shrinkage in a Ludhiana warehouse",
    },
  },
  {
    slug: "jalandhar",
    city: "Jalandhar",
    region: "Punjab",
    hasOffice: false,
    focus: "Sports goods, hand tools and leather manufacturing",
    intro:
      "Jalandhar's export units — sports goods, hand tools, leather — keep high-value finished stock in small stores next to busy production floors, which is exactly where shrinkage hides. Being an hour from our Ludhiana base, it is part of our regular installation and support circuit.",
    localContext: [
      "Export houses where a finished-goods store worth lakhs sits behind a single latch, and the camera watching it is never actually watched.",
      "Factory gates mixing workers, job-work loaders and visitors at the same time of day — face recognition sorts who belongs from who doesn't.",
      "The Doaba reality: houses that stand locked for months while owners are abroad, needing an alert the family can act on from another continent.",
    ],
    nearby: ["Ludhiana", "Hoshiarpur", "Amritsar", "Batala"],
  },
  {
    slug: "amritsar",
    city: "Amritsar",
    region: "Punjab",
    hasOffice: false,
    focus: "Wholesale trade, hotels and food processing",
    intro:
      "Amritsar runs on trade and hospitality — wholesale cloth and dry-fruit markets, hotels and guest houses around the walled city, and food-processing units on the bypass. The common thread is stock and guests moving all day, and nobody able to say who entered after closing.",
    localContext: [
      "Wholesale shops and katra godowns where the loss is discovered at stock-taking, weeks after it happened.",
      "Hotels and guest houses that need entrance and corridor monitoring without pointing a camera at guests' privacy.",
      "Papad, wadiyan and other food units where hygiene audits and night intrusion both need answering with the same cameras.",
    ],
    nearby: ["Batala", "Jalandhar", "Ludhiana"],
  },
  {
    slug: "chandigarh-mohali",
    city: "Chandigarh & Mohali",
    region: "Punjab / Chandigarh",
    hasOffice: false,
    focus: "Offices, showrooms and the Zirakpur warehousing corridor",
    intro:
      "The tricity splits into three security problems: IT and corporate offices in Mohali's IT City wanting card-free attendance, showrooms on Madhya Marg protecting displayed stock, and the Zirakpur–Dera Bassi corridor's warehouses feeding half of Punjab's e-commerce deliveries.",
    localContext: [
      "Offices replacing biometric machines with gate face recognition — no queue at 9:30, and attendance that can't be buddy-punched.",
      "High-street showrooms where after-hours intrusion matters as much as daytime footfall counting.",
      "Zirakpur warehouses with vehicle movement worth logging by number plate, not by a guard's register.",
    ],
    nearby: ["Ludhiana", "Patiala", "Khanna"],
  },
  {
    slug: "patiala",
    city: "Patiala",
    region: "Punjab",
    hasOffice: false,
    focus: "Education campuses, agri-machinery and residential kothis",
    intro:
      "Patiala's mix is unusual: large education campuses and hostels, agri-machinery yards on the bypass roads, and some of Punjab's largest residential kothis. All three suffer the same gap — plenty of cameras, and nobody watching them at 3 AM.",
    localContext: [
      "Colleges and hostels where the requirement is knowing the moment an outsider crosses the boundary, not reviewing footage the next day.",
      "Agri-implement yards with high-value machines parked in open compounds overnight.",
      "Kothis whose owners want one phone alert with a snapshot — not sixteen tiles of live video they will never open.",
    ],
    nearby: ["Chandigarh & Mohali", "Khanna", "Ludhiana"],
  },
  {
    slug: "bathinda",
    city: "Bathinda",
    region: "Punjab",
    hasOffice: false,
    focus: "Fuel and agri-trade, cotton godowns and processing units",
    intro:
      "The Malwa belt around Bathinda stores enormous value in plain sheds — cotton, grain, fertiliser, fuel. Most of it is guarded by one chowkidar and a dog. AI on the existing cameras means the perimeter watches itself, every night, without adding a single wire.",
    localContext: [
      "Cotton and grain godowns where a fire or an intrusion found at dawn is found too late.",
      "Petrol pumps and fuel depots needing round-the-clock forecourt coverage that flags loitering, not just records it.",
      "Agri-processing units on the ring roads with long, dark boundary walls.",
    ],
    nearby: ["Moga", "Patiala", "Ludhiana"],
  },
  {
    slug: "mandi-gobindgarh",
    city: "Mandi Gobindgarh",
    region: "Punjab",
    hasOffice: false,
    focus: "Steel furnaces, rolling mills and scrap yards",
    intro:
      "In the steel town, theft is not an occasional event — scrap and finished sections walk out of yards every season, and the weighbridge register never quite explains it. Cameras already exist at every gate; what's missing is something that reads the vehicles and watches the yard at night.",
    localContext: [
      "Scrap yards where the difference between a loaded and half-loaded truck is lakhs, and gate video is only checked after a dispute.",
      "Number-plate logging at weighbridges and gates, so every entry and exit is a searchable record instead of a diary entry.",
      "Furnace units running night shifts where the perimeter and the back gate see no guard for hours at a stretch.",
    ],
    nearby: ["Khanna", "Ludhiana", "Patiala"],
  },
  {
    slug: "khanna",
    city: "Khanna",
    region: "Punjab",
    hasOffice: false,
    focus: "Grain mandi, rice shellers and highway godowns",
    intro:
      "Khanna holds Asia's largest grain market, and the GT Road on either side of it is lined with rice shellers and storage. Stock sits in the open or in sheds for months; the season decides everything. Twenty minutes from our Ludhiana office, it is inside our fastest service radius.",
    localContext: [
      "Mandi-adjacent godowns where bagged stock is counted rarely and pilferage shows up only at dispatch.",
      "Rice shellers with seasonal labour at the gate — attendance and who-is-this-person both answered by the same camera.",
      "Highway-facing yards where an alert must reach the owner's phone before a loaded trolley reaches the GT Road.",
    ],
    nearby: ["Mandi Gobindgarh", "Ludhiana", "Patiala"],
  },
  {
    slug: "moga",
    city: "Moga",
    region: "Punjab",
    hasOffice: false,
    focus: "Dairy, food processing and distribution",
    intro:
      "Moga is Punjab's food-processing town — dairy plants, rice mills and the distributor godowns that feed the Malwa belt. Plants here already carry big camera estates for hygiene compliance; PGAK makes those same cameras handle security, attendance and vehicle logging too.",
    localContext: [
      "Food and dairy plants where the audit cameras can also flag intrusion, PPE-free entry and after-hours movement.",
      "Distributor godowns dispatching before dawn, when the gate is busiest and least supervised.",
      "Farm and plant perimeters too long for a guard to patrol honestly.",
    ],
    nearby: ["Bathinda", "Ludhiana", "Jalandhar"],
  },
  {
    slug: "hoshiarpur",
    city: "Hoshiarpur",
    region: "Punjab",
    hasOffice: false,
    focus: "Plywood, timber yards and wood industry",
    intro:
      "Hoshiarpur's plywood and timber trade keeps its stock where it must — in open yards. Timber is high-value, easy to load and hard to trace once gone. The yards already have cameras on poles; what they lack is anything that acts on what the cameras see at night.",
    localContext: [
      "Timber and veneer yards where a single night's theft can outweigh a year of the guard's salary.",
      "Plywood units where presses run late and the same cameras must cover fire watch and intrusion.",
      "Kandi-belt houses locked for long stretches, with family abroad wanting an alert they can trust and act on.",
    ],
    nearby: ["Jalandhar", "Batala", "Ludhiana"],
  },
  {
    slug: "batala",
    city: "Batala",
    region: "Punjab",
    hasOffice: false,
    focus: "Iron foundries, castings and machine tools",
    intro:
      "Batala's foundries and machine-tool shops fight the same battle as the steel towns: castings, patterns and finished machined parts disappearing between shifts, and a gate register that proves nothing. The fix is cameras that recognise faces at the gate and watch the casting yard all night.",
    localContext: [
      "Foundry yards where castings and scrap are indistinguishable in a register but not to a camera log.",
      "Machine shops protecting tooling and finished jobs that are small enough to carry and costly to replace.",
      "Night-shift gates where knowing who entered matters more than knowing that someone did.",
    ],
    nearby: ["Amritsar", "Jalandhar", "Hoshiarpur"],
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
    caseStudy: {
      href: "/insights/case-studies/retail-false-alarms-jaipur",
      label: "How AI CCTV handles false alarms for a Jaipur retail chain",
    },
  },
  {
    slug: "coimbatore",
    city: "Coimbatore",
    region: "Tamil Nadu",
    hasOffice: false,
    focus: "Spinning mills, textile units and engineering job-works",
    intro:
      "Coimbatore's factories run on shift discipline: hundreds of workers through a gate in minutes, machinery halls that should be empty at night, and scrap yards that quietly leak value. The gate camera you already own can take attendance and watch the perimeter — we proved it here first.",
    localContext: [
      "Textile mills and spinning units where shift-change queues at the punch machine cost twenty minutes of production.",
      "Engineering job-works and foundries with high-value raw material in open yards.",
      "Industrial estates around Peelamedu and Kurichi wanting after-hours machinery-hall monitoring.",
    ],
    nearby: ["Tiruppur", "Erode", "Salem", "Pollachi"],
    caseStudy: {
      href: "/insights/case-studies/factory-gate-attendance-coimbatore",
      label: "How a 200-worker Coimbatore factory gate replaces the punch machine",
    },
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

/** Route for a location page. */
export function locationPath(slug: string): string {
  return `/ai-cctv-${slug}`;
}
