/**
 * The feature registry — one source of truth for the 18 featured solutions.
 *
 * ── Why this file exists, and what it deliberately does not do ──
 * The site already had two collections: six capability pages (lib/capabilities.ts,
 * rendered at /features/[capability]) and twenty feature guides
 * (lib/feature-explorer.ts + lib/feature-guides.ts, at /features/guides/[slug]).
 * Both are good and both stay. This registry does not copy their words; it
 * points at them and adds the dimensions neither carried: which buyer task a
 * feature belongs to, whether PGAK writes it or supplies it, and which page is
 * the canonical destination when three pages touch the same subject.
 *
 * Fourteen of the eighteen already had a home. Only four needed a new URL. A
 * registry that invented eighteen fresh pages would have split the authority
 * of the pages that already rank and answer.
 *
 * ── The supply distinction matters more than it looks ──
 * "PGAK supplies all eighteen" is a statement about what can be bought, not
 * about who built it. Calling a third-party camera capability "our AI" would
 * be a lie a buyer can check, so `supply` records what PGAK actually does for
 * each one, and the copy on the page follows it.
 *
 * Counts shown anywhere on the site are derived from this array. Nothing is
 * hardcoded, so a nineteenth feature cannot silently make a page say "18".
 */

export type SupplyMode =
  /** PGAK's own analytics layer, running on the on-site processing unit. */
  | "pgak-software"
  /** Third-party hardware PGAK specifies, supplies and commissions. */
  | "supplied-hardware"
  /** A third-party software capability PGAK licenses and configures. */
  | "licensed-module"
  /** Interoperability with something the customer already owns. */
  | "integration";

/** The job the buyer is trying to do. Cards group by this, not by technology. */
export type BuyerTask = "Protect" | "Investigate" | "Improve operations" | "Connect";

export type FeatureEntry = {
  /** Stable id. Attached to enquiries so sales knows what was being read. */
  id: string;
  name: string;
  /** The canonical destination. Never a duplicate of an existing page. */
  route: string;
  featured: boolean;
  task: BuyerTask;
  /** The problem in the buyer's words, not the feature restated. */
  problem: string;
  /** One line of specific business benefit for the card. */
  benefit: string;
  supply: SupplyMode;
  /** Short compatibility note for the card. The page carries the full version. */
  compatibility: string;
  keywords: { primary: string; supporting: string[] };
  /** Where the evidence for this feature's claims lives. */
  evidence: string[];
  image: string | null;
  imageAlt: string;
};

/**
 * Wording for a feature PGAK sells but whose model and site requirements are
 * settled in the proposal rather than on a web page. Using one constant means
 * no page can quietly drift into implying a specification we have not checked.
 */
export const OFFER_LEVEL =
  "PGAK can supply and integrate a suitable solution; model and site requirements are confirmed in the proposal.";

export const FEATURE_REGISTRY: FeatureEntry[] = [
  {
    id: "F01",
    name: "False-alarm reduction",
    route: "/features/false-alarm-filtering",
    featured: true,
    task: "Protect",
    problem: "Every shadow, dog and gust of wind sends a notification, so the team stopped opening them.",
    benefit: "Filters routine movement so the alerts that arrive are worth looking at.",
    supply: "pgak-software",
    compatibility: "Needs a usable view of the area. Filtering reduces noise; it does not remove every false alert.",
    keywords: {
      primary: "CCTV false alarm reduction",
      supporting: ["smart motion detection camera", "AI CCTV alerts", "reduce false alarms CCTV", "motion detection false positives"],
    },
    evidence: ["lib/capabilities.ts", "content/insights/ai-cctv-false-alarms-how-to-reduce.md"],
    // Pending its own illustration. object-classification.webp depicts F02's
    // scene (a vehicle and a pedestrian at a gate); using it here as well would
    // put the same picture on two cards and caption it wrongly on one of them.
    image: null,
    imageAlt: "Illustration of routine yard movement being filtered from a genuine alert",
  },
  {
    id: "F02",
    name: "Person and vehicle detection",
    route: "/features/guides/object-classification",
    featured: true,
    task: "Protect",
    problem: "The recorder treats a person, a truck and a plastic bag as the same event.",
    benefit: "Alerts only on the object types you care about at that camera.",
    supply: "pgak-software",
    compatibility: "Depends on object size, angle and lighting. Classification reduces errors; it does not eliminate them.",
    keywords: {
      primary: "human vehicle detection CCTV",
      supporting: ["person detection camera", "vehicle detection camera", "object classification CCTV"],
    },
    evidence: ["lib/feature-explorer.ts", "https://www.axis.com/products/axis-object-analytics"],
    image: "/features/object-classification.webp",
    imageAlt: "Illustration distinguishing a delivery vehicle from a pedestrian at a factory gate",
  },
  {
    id: "F03",
    name: "Number-plate recognition (ANPR)",
    route: "/anpr-number-plate-recognition",
    featured: true,
    task: "Investigate",
    problem: "Nobody can say which vehicles came through the gate last Tuesday night.",
    benefit: "Logs vehicle entries so arrivals can be searched instead of remembered.",
    supply: "licensed-module",
    compatibility: "Needs a camera placed for plates — height, angle and speed matter. Confirm Indian plate support and night capture.",
    keywords: {
      primary: "ANPR system India",
      supporting: ["number plate recognition software", "ANPR camera price", "vehicle entry logging"],
    },
    evidence: ["lib/buyerDecision.ts", "https://www.axis.com/products/axis-license-plate-verifier"],
    image: "/features/number-plates.webp",
    imageAlt: "Illustration of an Indian industrial entry gate with a vehicle plate being logged",
  },
  {
    id: "F04",
    name: "Face recognition and face search",
    route: "/features/face-recognition",
    featured: true,
    task: "Investigate",
    problem: "Finding one person across a week of footage means watching a week of footage.",
    benefit: "Matches enrolled faces at an entrance, and narrows a search to review.",
    supply: "pgak-software",
    compatibility: "Needs a camera near face height at an entry point. A match is a lead for a person to check, never proof.",
    keywords: {
      primary: "face recognition CCTV",
      supporting: ["face search CCTV software", "facial recognition camera", "face recognition attendance"],
    },
    evidence: ["lib/capabilities.ts", "content/insights/face-recognition-accuracy-what-affects-it.md"],
    image: "/features/cross-camera-search.webp",
    imageAlt: "Illustration of an operator reviewing an enrolled face match at a controlled office entrance",
  },
  {
    id: "F05",
    name: "Edge AI processing",
    route: "/features/guides/edge-ai",
    featured: true,
    task: "Connect",
    problem: "Uploading every frame to a cloud is not acceptable, and the link could not carry it anyway.",
    benefit: "Detection runs at the site, so footage stays on your premises.",
    supply: "pgak-software",
    compatibility: "On-camera AI and an on-site appliance are different things. Which applies depends on your cameras.",
    keywords: {
      primary: "edge AI camera",
      supporting: ["on camera video analytics", "edge AI CCTV", "on-premise video analytics"],
    },
    evidence: ["lib/offer.ts", "https://i-pro.com/products_and_solutions/us-en/surveillance/solutions/technologies/edge-ai-solutions"],
    image: "/features/edge-ai.webp",
    imageAlt: "Illustration of a technician installing a camera with processing shown at the site",
  },
  {
    id: "F06",
    name: "Intrusion and line crossing",
    route: "/features/intrusion-alerts",
    featured: true,
    task: "Protect",
    problem: "The perimeter is a kilometre long and the guard is at one gate.",
    benefit: "Flags people or vehicles crossing a boundary you draw, on the schedule you set.",
    supply: "pgak-software",
    compatibility: "Needs suitable coverage of the line and configured schedules. Dense foliage and headlights need tuning.",
    keywords: {
      primary: "perimeter intrusion detection CCTV",
      supporting: ["line crossing detection camera", "AI intrusion detection", "virtual tripwire CCTV"],
    },
    evidence: ["lib/capabilities.ts", "https://www.axis.com/products/axis-object-analytics"],
    image: "/features/virtual-perimeter.webp",
    imageAlt: "Illustration of a person crossing a marked restricted-zone boundary at a warehouse",
  },
  {
    id: "F07",
    name: "Remote and multi-site viewing",
    route: "/remote-cctv-monitoring",
    featured: true,
    task: "Connect",
    problem: "Three sites, three apps, and no way to see them together.",
    benefit: "Reach your sites from one place, without moving recording to a cloud.",
    supply: "integration",
    compatibility: "Remote viewing and cloud recording are separate decisions. Bandwidth and retention are confirmed per site.",
    keywords: {
      primary: "remote CCTV monitoring",
      supporting: ["cloud video management software", "cloud VMS India", "multi site CCTV monitoring"],
    },
    evidence: ["lib/solutions.ts", "lib/buyerDecision.ts"],
    image: "/media/camera-intelligence.webp",
    imageAlt: "Illustration of a manager reviewing several business locations from a laptop",
  },
  {
    id: "F08",
    name: "Natural-language footage search",
    route: "/features/guides/natural-language-search",
    featured: true,
    task: "Investigate",
    problem: "You know what you are looking for, but not when it happened.",
    benefit: "Describe the person or vehicle instead of scrubbing through hours.",
    supply: "licensed-module",
    compatibility: "Requires a platform that indexes your footage. Which cameras and how far back are confirmed first.",
    keywords: {
      primary: "natural language video search",
      supporting: ["AI CCTV footage search", "video forensic search software", "search CCTV by description"],
    },
    evidence: ["lib/feature-guides.ts", "https://www.hikvision.com/content/dam/hikvision/en/marketing/image/products/ip-products/network-video-recorders/acuseek/document-download/Flyer_AcuSeek-Application-for-Supermarkets.pdf"],
    image: "/features/natural-language-search.webp",
    imageAlt: "Illustration of a supervisor searching footage for a white delivery van",
  },
  {
    id: "F09",
    name: "People counting and occupancy",
    route: "/features/guides/people-counting",
    featured: true,
    task: "Improve operations",
    problem: "Nobody knows which hours are actually busy, so staffing is guesswork.",
    benefit: "Counts entries and exits so busy periods can be compared.",
    supply: "pgak-software",
    compatibility: "Mounting and full entrance coverage matter. Figures are estimates, not certified headcounts.",
    keywords: {
      primary: "people counting camera",
      supporting: ["footfall counter CCTV", "occupancy monitoring system", "retail footfall analytics"],
    },
    evidence: ["lib/feature-explorer.ts", "content/insights/people-counting-footfall-cctv.md"],
    image: "/features/people-counting.webp",
    imageAlt: "Illustration of shoppers entering a retail entrance with counts being reviewed",
  },
  {
    id: "F10",
    name: "Loitering and dwell time",
    route: "/features/loitering-detection",
    featured: true,
    task: "Protect",
    problem: "Someone waited by the loading bay for twenty minutes and nobody saw it until later.",
    benefit: "Flags a person or vehicle staying longer than the time you set.",
    supply: "pgak-software",
    compatibility: "Dwell thresholds need tuning per area. Waiting is not suspicious by itself; an operator reads the context.",
    keywords: {
      primary: "loitering detection camera",
      supporting: ["dwell time video analytics", "CCTV loitering alerts", "after hours loitering"],
    },
    evidence: ["lib/capabilities.ts", "https://www.axis.com/products/axis-object-analytics"],
    image: "/features/loitering.webp",
    imageAlt: "Illustration of an operator reviewing a person waiting near a closed loading bay",
  },
  {
    id: "F11",
    name: "Weapon detection",
    route: "/features/guides/weapon-detection",
    featured: true,
    task: "Protect",
    problem: "A visible weapon at an entrance needs a person told now, not found in review.",
    benefit: "Raises a possible-object alert for a human to judge immediately.",
    supply: "licensed-module",
    compatibility: "Every alert requires human review. Concealed items are not detectable, and this is not a screening system.",
    keywords: {
      primary: "AI weapon detection camera",
      supporting: ["gun detection CCTV", "weapon detection software", "visible weapon alert"],
    },
    evidence: ["OFFER_LEVEL"],
    image: null,
    imageAlt: "Illustration of a staged security-training review of a possible-object alert",
  },
  {
    id: "F12",
    name: "Fire and smoke detection",
    route: "/features/guides/smoke-flame",
    featured: true,
    task: "Protect",
    problem: "A fire in an unmanned yard is discovered when somebody smells it.",
    benefit: "Adds visual smoke and flame detection where a detector cannot sit.",
    supply: "licensed-module",
    compatibility: "Requires specialist equipment and professional fire-system design. It is not a substitute for required fire protection.",
    keywords: {
      primary: "AI fire detection camera",
      supporting: ["smoke detection CCTV", "video fire detection", "visual flame detection industrial"],
    },
    evidence: ["lib/feature-explorer.ts", "https://media.boschsecurity.com/fs/media/en/pb/images/products/fire_alarm_systems/aviotec_1/AVIOTEC_2Pager.pdf"],
    image: "/features/smoke-flame.webp",
    imageAlt: "Illustration of a labelled simulated industrial smoke event reviewed by a safety supervisor",
  },
  {
    id: "F13",
    name: "PPE and safety compliance",
    route: "/features/guides/ppe-detection",
    featured: true,
    task: "Improve operations",
    problem: "Helmet rules are enforced when a supervisor happens to be standing there.",
    benefit: "Checks for hard hats and high-visibility clothing at entry points.",
    supply: "pgak-software",
    compatibility: "Confirm which PPE classes are supported. Human safety supervision remains required.",
    keywords: {
      primary: "PPE detection camera",
      supporting: ["helmet detection camera", "AI safety compliance", "hi-vis vest detection"],
    },
    evidence: ["lib/feature-explorer.ts", "https://docs.verkada.com/docs/ai-powered-search-alerts-overview.pdf"],
    image: "/features/ppe-detection.webp",
    imageAlt: "Illustration of a safety supervisor reviewing hard-hat checks at a factory entry point",
  },
  {
    id: "F14",
    name: "Abandoned and removed objects",
    route: "/features/guides/abandoned-object",
    featured: true,
    task: "Protect",
    problem: "A bag left in a lobby, or equipment gone from its place, is noticed hours later.",
    benefit: "Flags an object left behind, or one removed from a monitored spot.",
    supply: "licensed-module",
    compatibility: "Needs a stable view and a defined normal state. Busy scenes and changing light raise false alerts.",
    keywords: {
      primary: "abandoned object detection CCTV",
      supporting: ["unattended baggage detection", "object removal detection", "left luggage alert CCTV"],
    },
    evidence: ["OFFER_LEVEL", "https://www.boschsecurity.com/xc/en/solutions/video-systems/video-analytics/"],
    image: null,
    imageAlt: "Illustration of an unattended bag in a commercial lobby with a before and after panel",
  },
  {
    id: "F15",
    name: "Queue analytics and heat maps",
    route: "/features/guides/queue-analytics",
    featured: true,
    task: "Improve operations",
    problem: "Customers walk out of a queue and the first you hear of it is the takings.",
    benefit: "Shows where congestion builds and how long people wait.",
    supply: "pgak-software",
    compatibility: "Requires an appropriate overhead view and configured thresholds. Crowding and occlusion affect accuracy.",
    keywords: {
      primary: "queue management CCTV",
      supporting: ["retail heat map camera", "queue length analytics", "checkout queue monitoring"],
    },
    evidence: ["lib/feature-explorer.ts", "https://www.axis.com/products/axis-object-analytics"],
    image: "/features/queue-analytics.webp",
    imageAlt: "Illustration of a store manager reviewing a checkout queue and a footfall heat map",
  },
  {
    id: "F16",
    name: "Low-light and colour night imaging",
    route: "/features/guides/low-light-ai",
    featured: true,
    task: "Protect",
    problem: "The night footage shows that something happened, but not who.",
    benefit: "Improves detail after dark, within what the camera actually captured.",
    supply: "supplied-hardware",
    compatibility: "Depends on sensor, lens and site lighting. Processing cannot recover detail that was never captured.",
    keywords: {
      primary: "full colour night vision camera",
      supporting: ["low light CCTV camera", "AI night vision camera", "colour night CCTV"],
    },
    evidence: ["lib/feature-explorer.ts", "https://www.hikvision.com/content/dam/hikvision/uk/products/colorvu/Pro-Series-with-ColorVu-3.0---Brochure-UK-May.25-A4-HR.pdf"],
    image: "/features/low-light-ai.webp",
    imageAlt: "Illustration of an industrial gate at night with realistic illumination",
  },
  {
    id: "F17",
    name: "Two-way audio and voice deterrence",
    route: "/features/guides/two-way-audio",
    featured: true,
    task: "Protect",
    problem: "You can watch someone climb the fence, but you cannot say anything to them.",
    benefit: "Speak to a visitor or intruder from wherever you are watching.",
    supply: "supplied-hardware",
    compatibility: "Needs a speaker and microphone at the camera position, plus power and network. Recording audio has its own legal duties.",
    keywords: {
      primary: "two way audio CCTV camera",
      supporting: ["active deterrence camera", "voice warning CCTV", "talk down CCTV system"],
    },
    evidence: ["OFFER_LEVEL", "https://www.axis.com/products/network-speakers"],
    image: null,
    imageAlt: "Illustration of an operator speaking to a visitor at a commercial gate",
  },
  {
    id: "F18",
    name: "ONVIF and open integration",
    route: "/features/guides/onvif-integration",
    featured: true,
    task: "Connect",
    problem: "Four camera brands, two recorders, and a vendor who says only their kit will work.",
    benefit: "Works across mixed estates instead of demanding one brand.",
    supply: "integration",
    compatibility: "ONVIF stream support and full analytics-event interoperability are different. Profiles are confirmed per device.",
    keywords: {
      primary: "ONVIF compatible VMS",
      supporting: ["video management software API", "CCTV integration software", "mixed brand CCTV integration"],
    },
    evidence: ["OFFER_LEVEL", "https://www.onvif.org/profiles/"],
    image: null,
    imageAlt: "Illustration of an engineer reviewing a diagram of cameras, recorder and analytics",
  },
];

/** Buyer-task order used by the homepage. */
export const BUYER_TASKS: BuyerTask[] = ["Protect", "Investigate", "Improve operations", "Connect"];

export const featuredFeatures = (): FeatureEntry[] => FEATURE_REGISTRY.filter((f) => f.featured);

export const featuresForTask = (task: BuyerTask): FeatureEntry[] =>
  featuredFeatures().filter((f) => f.task === task);

/** Derived, never hardcoded — see the note at the top of this file. */
export const featuredCount = (): number => featuredFeatures().length;

/** Features still waiting on an authorised illustration. */
export const featuresAwaitingImage = (): FeatureEntry[] =>
  FEATURE_REGISTRY.filter((f) => f.image === null);

export const featureById = (id: string): FeatureEntry | undefined =>
  FEATURE_REGISTRY.find((f) => f.id === id);
