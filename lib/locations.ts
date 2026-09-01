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
  /**
   * Where in this city the work actually is — named industrial areas, markets
   * or corridors, and the security pattern each one produces. This is local
   * geography and industry fact, never a claim about deployments we've done;
   * it exists so no two city pages read like the same page with the name
   * swapped.
   */
  localAreas?: { heading: string; text: string };
  /**
   * How attendance specifically breaks in this market. Grounded in the city's
   * real industry mix — never a claim about deployments we have done.
   */
  attendanceContext?: string;
};

export const LOCATIONS: Location[] = [
  {
    slug: "ludhiana",
    city: "Ludhiana",
    region: "Punjab",
    hasOffice: true,
    focus: "Warehousing, textile and cycle-parts manufacturing",
    attendanceContext:
      "Ludhiana's attendance problem is a shift-change problem. Textile and cycle-parts units here run large workforces arriving inside the same ten minutes, and the hands on those lines are exactly the ones fingerprint readers reject — oil, dye and worn ridges. Add contractor gangs that turn over weekly across the Focal Point and Gill Road belts and the register in the supervisor's drawer becomes the real record. Camera-based attendance at the gate removes the queue and the failed scan in one move.",
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
    localAreas: {
      heading: "Where the risk sits in Ludhiana",
      text: "The pressure points cluster along the Gill Road and Focal Point belts, the hosiery units around Chandigarh Road, and the distribution godowns strung along the GT Road side of the city. These are high-headcount sites with long compound walls and a single guard covering far more perimeter than one person can watch, which is why gate attendance and after-hours boundary alerts are usually the first two things a Ludhiana site switches on.",
    },
  },
  {
    slug: "jalandhar",
    city: "Jalandhar",
    region: "Punjab",
    hasOffice: false,
    focus: "Sports goods, hand tools and leather manufacturing",
    attendanceContext:
      "Sports goods and hand-tool units in Jalandhar run piece-rate and shift labour side by side, which makes accurate hours a payment question rather than an HR formality. Leather and tool workshops also produce the hand conditions that defeat fingerprint sensors. Because attendance runs on the entrance camera rather than a reader, the labour gate and the office door can both be covered without buying a second device.",
    intro:
      "Jalandhar's export units — sports goods, hand tools, leather — keep high-value finished stock in small stores next to busy production floors, which is exactly where shrinkage hides. Being an hour from our Ludhiana base, it is part of our regular installation and support circuit.",
    localContext: [
      "Export houses where a finished-goods store worth lakhs sits behind a single latch, and the camera watching it is never actually watched.",
      "Factory gates mixing workers, job-work loaders and visitors at the same time of day — face recognition sorts who belongs from who doesn't.",
      "The Doaba reality: houses that stand locked for months while owners are abroad, needing an alert the family can act on from another continent.",
    ],
    nearby: ["Ludhiana", "Hoshiarpur", "Amritsar", "Batala"],
    localAreas: {
      heading: "Where the risk sits in Jalandhar",
      text: "Sports-goods and hand-tool units around Basti Nau and the Focal Point, leather and rubber works towards Kapurthala Road, and a dense wholesale trade in the old city. Many of these are family-run units with mixed-age camera estates, so the practical question is almost always whether the existing DVR can feed the AI rather than whether new cameras are needed.",
    },
  },
  {
    slug: "amritsar",
    city: "Amritsar",
    region: "Punjab",
    hasOffice: false,
    focus: "Wholesale trade, hotels and food processing",
    attendanceContext:
      "Wholesale trade and hotels in Amritsar share one attendance pattern: staff arrive across a long window rather than a single shift start, and turnover in kitchens and housekeeping is constant. Enrolling a new joiner in about a minute from a phone matters more here than raw throughput, and hotel entrances are usually already covered by cameras positioned well for recognition.",
    intro:
      "Amritsar runs on trade and hospitality — wholesale cloth and dry-fruit markets, hotels and guest houses around the walled city, and food-processing units on the bypass. The common thread is stock and guests moving all day, and nobody able to say who entered after closing.",
    localContext: [
      "Wholesale shops and katra godowns where the loss is discovered at stock-taking, weeks after it happened.",
      "Hotels and guest houses that need entrance and corridor monitoring without pointing a camera at guests' privacy.",
      "Papad, wadiyan and other food units where hygiene audits and night intrusion both need answering with the same cameras.",
    ],
    nearby: ["Batala", "Jalandhar", "Ludhiana"],
    localAreas: {
      heading: "Where the risk sits in Amritsar",
      text: "Wholesale markets in the walled city, hotels and guest houses on the approach roads to Harmandir Sahib, and food-processing units out towards the Majitha Road industrial pockets. Hospitality sites here need alerting that is discreet — a manager's phone, not a siren in a lobby full of guests — while the wholesale markets care mainly about after-hours shutter activity.",
    },
  },
  {
    slug: "chandigarh-mohali",
    city: "Chandigarh & Mohali",
    region: "Punjab / Chandigarh",
    hasOffice: false,
    focus: "Offices, showrooms and the Zirakpur warehousing corridor",
    attendanceContext:
      "Offices and showrooms across Chandigarh and Mohali rarely have a queue problem — they have an accuracy and appearance problem. A punching machine at reception is the first thing a client sees, and missed punches surface on payroll day. With attendance running on the entrance camera there is no device at reception at all, and the Zirakpur warehousing corridor gets bay-side coverage the same way.",
    intro:
      "The tricity splits into three security problems: IT and corporate offices in Mohali's IT City wanting card-free attendance, showrooms on Madhya Marg protecting displayed stock, and the Zirakpur–Dera Bassi corridor's warehouses feeding half of Punjab's e-commerce deliveries.",
    localContext: [
      "Offices replacing biometric machines with gate face recognition — no queue at 9:30, and attendance that can't be buddy-punched.",
      "High-street showrooms where after-hours intrusion matters as much as daytime footfall counting.",
      "Zirakpur warehouses with vehicle movement worth logging by number plate, not by a guard's register.",
    ],
    nearby: ["Ludhiana", "Patiala", "Khanna"],
    localAreas: {
      heading: "Where the risk sits in Chandigarh & Mohali",
      text: "Corporate offices in the Chandigarh sectors, IT units in Mohali's Phase 8 and the Industrial Area, and the warehousing corridor that runs out through Zirakpur. Office sites tend to want attendance and restricted-room logs; the Zirakpur godowns want loading-bay and night-time perimeter cover, which are different configurations of the same cameras.",
    },
  },
  {
    slug: "patiala",
    city: "Patiala",
    region: "Punjab",
    hasOffice: false,
    focus: "Education campuses, agri-machinery and residential kothis",
    attendanceContext:
      "Patiala's education campuses need staff attendance far more than student tracking, and we say so plainly: applying face recognition to minors carries consent obligations most institutions should not take on. Teaching and support staff logged at the campus entrance, plus gate and boundary alerts that do not identify individual children, is the combination that fits here. Agri-machinery units get the standard gate-attendance model.",
    intro:
      "Patiala's mix is unusual: large education campuses and hostels, agri-machinery yards on the bypass roads, and some of Punjab's largest residential kothis. All three suffer the same gap — plenty of cameras, and nobody watching them at 3 AM.",
    localContext: [
      "Colleges and hostels where the requirement is knowing the moment an outsider crosses the boundary, not reviewing footage the next day.",
      "Agri-implement yards with high-value machines parked in open compounds overnight.",
      "Kothis whose owners want one phone alert with a snapshot — not sixteen tiles of live video they will never open.",
    ],
    nearby: ["Chandigarh & Mohali", "Khanna", "Ludhiana"],
    localAreas: {
      heading: "Where the risk sits in Patiala",
      text: "University and college campuses, agri-machinery workshops around the Focal Point, and large residential kothis in the older colonies. Campuses are the distinctive case here: wide open boundaries, thousands of legitimate people moving at once, and a need to spot the one person who does not belong rather than to log everybody.",
    },
  },
  {
    slug: "bathinda",
    city: "Bathinda",
    region: "Punjab",
    hasOffice: false,
    focus: "Fuel and agri-trade, cotton godowns and processing units",
    attendanceContext:
      "Cotton godowns and processing units around Bathinda run seasonal labour, which is the hardest case for any enrolment process — a workforce that peaks and disappears. Phone-based enrolment at the gate is what makes seasonal attendance practical, and the same yard cameras carry after-hours boundary alerts once the season ends and the site sits idle.",
    intro:
      "The Malwa belt around Bathinda stores enormous value in plain sheds — cotton, grain, fertiliser, fuel. Most of it is guarded by one chowkidar and a dog. AI on the existing cameras means the perimeter watches itself, every night, without adding a single wire.",
    localContext: [
      "Cotton and grain godowns where a fire or an intrusion found at dawn is found too late.",
      "Petrol pumps and fuel depots needing round-the-clock forecourt coverage that flags loitering, not just records it.",
      "Agri-processing units on the ring roads with long, dark boundary walls.",
    ],
    nearby: ["Moga", "Patiala", "Ludhiana"],
    localAreas: {
      heading: "Where the risk sits in Bathinda",
      text: "Fuel and agri-trade yards, cotton godowns, and processing units spread along the Mansa and Barnala roads. Storage sites in this belt hold high-value stock in low-supervision yards, so dwell-time alerts on stacked material and vehicle-movement logs at the gate usually matter more than face recognition.",
    },
  },
  {
    slug: "mandi-gobindgarh",
    city: "Mandi Gobindgarh",
    region: "Punjab",
    hasOffice: false,
    focus: "Steel furnaces, rolling mills and scrap yards",
    attendanceContext:
      "Steel furnaces and rolling mills in Mandi Gobindgarh combine every condition that breaks contact biometrics: heat, scale dust, gloves, and hands worn smooth by the work. Attendance at these gates has to be contactless to work at all. Scrap yards on the same premises also benefit from boundary alerting on the identical camera estate.",
    intro:
      "In the steel town, theft is not an occasional event — scrap and finished sections walk out of yards every season, and the weighbridge register never quite explains it. Cameras already exist at every gate; what's missing is something that reads the vehicles and watches the yard at night.",
    localContext: [
      "Scrap yards where the difference between a loaded and half-loaded truck is lakhs, and gate video is only checked after a dispute.",
      "Number-plate logging at weighbridges and gates, so every entry and exit is a searchable record instead of a diary entry.",
      "Furnace units running night shifts where the perimeter and the back gate see no guard for hours at a stretch.",
    ],
    nearby: ["Khanna", "Ludhiana", "Patiala"],
    localAreas: {
      heading: "Where the risk sits in Mandi Gobindgarh",
      text: "Steel furnaces, rolling mills and scrap yards — the town is effectively one large industrial estate. Scrap handling is the defining security problem: high-value material moving constantly by vehicle, weighbridge disputes, and yards where a camera has to distinguish routine loading from removal after hours.",
    },
  },
  {
    slug: "khanna",
    city: "Khanna",
    region: "Punjab",
    hasOffice: false,
    focus: "Grain mandi, rice shellers and highway godowns",
    attendanceContext:
      "The grain mandi and rice shellers around Khanna run heavy seasonal labour with contractor gangs arriving for the procurement cycle. Verifying billed headcount against who actually walked through the gate is the commercial value here, and a photo-backed attendance record is what makes that reconciliation possible rather than theoretical.",
    intro:
      "Khanna holds Asia's largest grain market, and the GT Road on either side of it is lined with rice shellers and storage. Stock sits in the open or in sheds for months; the season decides everything. Twenty minutes from our Ludhiana office, it is inside our fastest service radius.",
    localContext: [
      "Mandi-adjacent godowns where bagged stock is counted rarely and pilferage shows up only at dispatch.",
      "Rice shellers with seasonal labour at the gate — attendance and who-is-this-person both answered by the same camera.",
      "Highway-facing yards where an alert must reach the owner's phone before a loaded trolley reaches the GT Road.",
    ],
    nearby: ["Mandi Gobindgarh", "Ludhiana", "Patiala"],
    localAreas: {
      heading: "Where the risk sits in Khanna",
      text: "The grain mandi, rice shellers, and the highway godowns along the GT Road. Seasonal peaks matter here in a way they do not elsewhere: during procurement the mandi runs round the clock with heavy vehicle movement, so schedules and zones have to change with the season rather than being set once.",
    },
  },
  {
    slug: "moga",
    city: "Moga",
    region: "Punjab",
    hasOffice: false,
    focus: "Dairy, food processing and distribution",
    attendanceContext:
      "Dairy and food processing units in Moga carry hygiene requirements that make shared-contact devices an active problem, not just an inconvenience — a fingerprint reader at a food-processing entrance is a surface everyone touches. Contactless attendance at the gate removes that surface entirely while covering the despatch side on the same cameras.",
    intro:
      "Moga is Punjab's food-processing town — dairy plants, rice mills and the distributor godowns that feed the Malwa belt. Plants here already carry big camera estates for hygiene compliance; PGAK makes those same cameras handle security, attendance and vehicle logging too.",
    localContext: [
      "Food and dairy plants where the audit cameras can also flag intrusion, PPE-free entry and after-hours movement.",
      "Distributor godowns dispatching before dawn, when the gate is busiest and least supervised.",
      "Farm and plant perimeters too long for a guard to patrol honestly.",
    ],
    nearby: ["Bathinda", "Ludhiana", "Jalandhar"],
    localAreas: {
      heading: "Where the risk sits in Moga",
      text: "Dairy and food-processing plants, cold storage, and the distribution units feeding them. Food-grade sites bring a second requirement alongside security — hygiene and process discipline — so the same cameras are often asked to flag entry into restricted zones as well as intrusion.",
    },
  },
  {
    slug: "hoshiarpur",
    city: "Hoshiarpur",
    region: "Punjab",
    hasOffice: false,
    focus: "Plywood, timber yards and wood industry",
    attendanceContext:
      "Plywood and timber yards in Hoshiarpur run open sites with multiple gates and vehicle traffic through most of them. One reader on the office door records the people least relevant to the operation. Because every camera can act as a check-in point, the timber gate and the loading side get covered without a device on each.",
    intro:
      "Hoshiarpur's plywood and timber trade keeps its stock where it must — in open yards. Timber is high-value, easy to load and hard to trace once gone. The yards already have cameras on poles; what they lack is anything that acts on what the cameras see at night.",
    localContext: [
      "Timber and veneer yards where a single night's theft can outweigh a year of the guard's salary.",
      "Plywood units where presses run late and the same cameras must cover fire watch and intrusion.",
      "Kandi-belt houses locked for long stretches, with family abroad wanting an alert they can trust and act on.",
    ],
    nearby: ["Jalandhar", "Batala", "Ludhiana"],
    localAreas: {
      heading: "Where the risk sits in Hoshiarpur",
      text: "Plywood and timber units, saw mills, and the timber yards on the outskirts. Open-air stock is the pattern: material stacked in yards that cannot be shuttered, where the realistic control is boundary alerting after dark plus vehicle logs at the gate.",
    },
  },
  {
    slug: "batala",
    city: "Batala",
    region: "Punjab",
    hasOffice: false,
    focus: "Iron foundries, castings and machine tools",
    attendanceContext:
      "Iron foundries and machine-tool workshops in Batala present the classic hand-condition problem — casting and grinding work destroys fingerprint ridge detail faster than almost any trade. Contactless recognition at the gate is the only attendance approach that does not degrade with the workforce's own labour.",
    intro:
      "Batala's foundries and machine-tool shops fight the same battle as the steel towns: castings, patterns and finished machined parts disappearing between shifts, and a gate register that proves nothing. The fix is cameras that recognise faces at the gate and watch the casting yard all night.",
    localContext: [
      "Foundry yards where castings and scrap are indistinguishable in a register but not to a camera log.",
      "Machine shops protecting tooling and finished jobs that are small enough to carry and costly to replace.",
      "Night-shift gates where knowing who entered matters more than knowing that someone did.",
    ],
    nearby: ["Amritsar", "Jalandhar", "Hoshiarpur"],
    localAreas: {
      heading: "Where the risk sits in Batala",
      text: "Iron foundries, casting units and machine-tool workshops, most of them clustered around the industrial belt on the Amritsar and Qadian roads. Foundry environments are hard on gate hardware — heat, dust and metal particulate — which is exactly where fingerprint machines fail and a camera already mounted at the gate does not.",
    },
  },
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    region: "Delhi, Haryana & Uttar Pradesh",
    hasOffice: false,
    focus: "Offices, retail chains and logistics parks",
    attendanceContext:
      "Across Delhi NCR the pattern is multi-site: several offices, retail points or logistics units under one payroll, each running its own attendance island and merged by hand at month end. One system holding every location with per-site rules and a single payroll export is what removes that merge, and logistics parks get bay-side coverage rather than office-door-only.",
    intro:
      "Across Delhi NCR the dominant request is business CCTV that does something during working hours as well as after them — office access monitoring, retail loss prevention across multiple branches, and dispatch-bay coverage in the logistics parks ringing the city.",
    localContext: [
      "Multi-branch retail chains that need one phone showing every store.",
      "Corporate offices retiring access cards and biometric machines in favour of gate face recognition.",
      "Logistics and 3PL warehouses in Gurugram, Noida and Ghaziabad with heavy vehicle movement to log.",
    ],
    nearby: ["Gurugram", "Noida", "Faridabad", "Ghaziabad"],
    localAreas: {
      heading: "Where the risk sits in Delhi NCR",
      text: "Retail chains across the city, corporate offices, and the logistics parks that ring the region towards Bawana, Narela and the Haryana border. Multi-site retail is the common shape here: an owner running several branches who needs one view across all of them rather than a separate app per shop.",
    },
  },
  {
    slug: "gurugram",
    city: "Gurugram",
    region: "Haryana",
    hasOffice: false,
    focus: "Corporate offices and gated residential",
    attendanceContext:
      "Corporate offices in Gurugram usually already have card access and still have an attendance accuracy problem, because a card records the credential rather than the person. Camera-based attendance at the main entrance produces a photo-backed record that ends payroll-day disputes, with nothing added at reception.",
    intro:
      "Gurugram splits cleanly into two security problems: corporate office floors that need quiet daytime monitoring and hard after-hours alerting, and high-density gated societies where the gate register is still a paper notebook.",
    localContext: [
      "Office towers where tailgating through secured doors is the real access-control gap.",
      "Gated societies wanting resident vehicle recognition so the boom barrier stops being a queue.",
      "Weekend and long-holiday equipment loss from unoccupied office floors.",
    ],
    nearby: ["Delhi", "Noida", "Faridabad", "Manesar"],
    localAreas: {
      heading: "Where the risk sits in Gurugram",
      text: "Corporate offices along Golf Course Road and Udyog Vihar, plus gated residential across the sectors. Office and society sites share a requirement that industrial sites do not — the system has to be unobtrusive to a large population of legitimate people, so suppressing known faces matters more than raw detection.",
    },
  },
  {
    slug: "noida",
    city: "Noida",
    region: "Uttar Pradesh",
    hasOffice: false,
    focus: "Industrial sectors, offices and housing societies",
    attendanceContext:
      "Noida's industrial sectors and office blocks often sit in the same portfolio, which means two very different attendance patterns under one HR team — shift labour at the unit, staggered arrival at the office. Running both on one platform with per-site rules avoids the two-system merge that produces most month-end corrections.",
    intro:
      "Noida's sector layout puts manufacturing units, office parks and large housing societies within a few kilometres of each other, and we deploy across all three — usually starting with gate attendance in the industrial sectors and visitor logging in the societies.",
    localContext: [
      "Industrial-sector units needing contactless shift attendance for large workforces.",
      "Housing societies replacing paper visitor registers with photo-logged entries.",
      "Office parks needing after-hours intrusion alerting across multiple floors.",
    ],
    nearby: ["Greater Noida", "Delhi", "Ghaziabad", "Gurugram"],
    localAreas: {
      heading: "Where the risk sits in Noida",
      text: "Industrial sectors on the Noida–Greater Noida corridor, office parks, and large housing societies. Societies are the distinctive case: a main gate with constant visitor, delivery and cab movement, where an automated gate log is usually more valuable day to day than an intrusion alarm.",
    },
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    hasOffice: false,
    focus: "Retail, warehousing and high-density residential",
    attendanceContext:
      "High-throughput warehousing in the Bhiwandi and Navi Mumbai belts is where Mumbai attendance actually breaks: the reader is at the office entrance while the workforce lives at the loading bay. Covering bays as check-in points, and reconciling who was on site against a shrinkage event on the same camera estate, is the practical value here.",
    intro:
      "Space is the constraint in Mumbai, which changes what security has to do. Retail floors are dense and busy, warehouses are packed and high-turnover, and residential buildings sit directly on public roads — so precision matters more here than anywhere else we deploy.",
    localContext: [
      "Busy retail floors where any motion-based system is unusable and dwell-time detection is the only workable approach.",
      "High-turnover warehouses in the Bhiwandi and Navi Mumbai belts.",
      "Residential buildings fronting public roads, where filtering out pavement traffic is the whole job.",
    ],
    nearby: ["Navi Mumbai", "Thane", "Bhiwandi", "Pune"],
    localAreas: {
      heading: "Where the risk sits in Mumbai",
      text: "Retail across the suburbs, warehousing towards Bhiwandi, and high-density residential everywhere. Space is the constraint that shapes everything: small floor areas with constant legitimate movement, so tight zones and dwell-time rules do the work that wide-area detection does elsewhere.",
    },
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    region: "Karnataka",
    hasOffice: false,
    focus: "Tech offices, campuses and gated communities",
    attendanceContext:
      "Tech offices and campuses in Bengaluru have the strongest privacy expectations of any market we serve, and that shapes the deployment rather than blocking it — a clear DPDP notice at rollout, retention matched to payroll need, and templates deleted on exit. On the operational side, hybrid staff are handled through the app while on-site presence comes from the entrance camera.",
    intro:
      "Bengaluru asks harder questions about privacy than most markets, and that suits us — processing runs on-premises by default, face data is stored as templates rather than images, and access is role-controlled. The typical deployment here is campus access and attendance rather than theft prevention.",
    localContext: [
      "Tech campuses needing contactless attendance and restricted-room access logs.",
      "Gated communities with multiple entry gates and heavy delivery traffic.",
      "Organisations with internal data-governance reviews that require on-premises processing.",
    ],
    nearby: ["Whitefield", "Electronic City", "Hosur", "Mysuru"],
    localAreas: {
      heading: "Where the risk sits in Bengaluru",
      text: "Tech offices and campuses across the Outer Ring Road corridor, along with gated communities and their clubhouses. Campus and community sites here typically already run substantial camera estates, so the useful question is which of the existing feeds are placed well enough to carry face recognition, not how many more to add.",
    },
  },
  {
    slug: "jaipur",
    city: "Jaipur",
    region: "Rajasthan",
    hasOffice: false,
    focus: "Retail, jewellery and hospitality",
    attendanceContext:
      "Retail and hospitality in Jaipur run long opening hours with staggered shifts and steady staff turnover, so enrolment speed matters more than gate throughput. Jewellery retail additionally needs attendance and stock-area monitoring on one estate, which is where running both on the existing cameras rather than separate systems pays off.",
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
    localAreas: {
      heading: "Where the risk sits in Jaipur",
      text: "Jewellery and high-value retail in and around Johari Bazaar and the walled city, hospitality properties on the tourist routes, and multi-branch retailers across the newer colonies. Jewellery retail sets the tone: very high value in small floor areas, constant genuine customer movement, and an absolute requirement that an alert never embarrasses a real customer.",
    },
  },
  {
    slug: "coimbatore",
    city: "Coimbatore",
    region: "Tamil Nadu",
    hasOffice: false,
    focus: "Spinning mills, textile units and engineering job-works",
    attendanceContext:
      "Spinning mills and engineering job-works in Coimbatore run continuous shifts, which makes night-shift attendance the real question — the hours with no supervisor and the highest manual-entry rate. Instrumenting exits as well as entries is what turns 'was present' into 'was present for the full shift', and cotton dust makes contactless the only durable option at the gate.",
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
    localAreas: {
      heading: "Where the risk sits in Coimbatore",
      text: "Spinning and textile mills, engineering job-works, and the industrial estates around Peelamedu, Kurichi and Singanallur. Shift discipline is the defining pattern — hundreds of workers crossing a gate inside a few minutes — which makes gate throughput, not camera count, the number that decides whether attendance works.",
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
