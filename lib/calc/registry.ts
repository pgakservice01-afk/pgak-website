import { FORMULA_VERSION } from "./engine.ts";

/**
 * The twelve calculators, as records rather than routes.
 *
 * `status` is the honest part: "live" means the tool is built and linked;
 * "planned" means it is specified and scheduled but NOT published, because a
 * placeholder page is worse than no page. Only `live` entries get a route in
 * the sitemap and the hub's main list.
 *
 * `capability` says what PGAK can actually do about the answer. A calculator
 * that models an industry problem is not a claim that PGAK sells the fix:
 * "educational" tools say so on the page.
 */

export type CalculatorStatus = "live" | "planned";
export type Capability =
  /** PGAK supplies this directly, verified on the site's own pages. */
  | "verified"
  /** Possible, but subject to a site assessment before anything is promised. */
  | "assessment-required"
  /** Useful to the buyer; not a PGAK product claim. */
  | "educational";

export type CalculatorRecord = {
  id: string;
  /** Canonical path. Present for live tools only. */
  path?: string;
  title: string;
  /** The buyer question this answers, in their words. */
  question: string;
  summary: string;
  inputs: string[];
  method: string;
  /** What the tool deliberately does NOT claim. */
  limits: string;
  capability: Capability;
  /** The commercial page this belongs to, for internal linking both ways. */
  relatedPath: string;
  relatedLabel: string;
  cta: string;
  status: CalculatorStatus;
  formulaVersion: string;
};

const v = FORMULA_VERSION;

export const CALCULATORS: CalculatorRecord[] = [
  {
    id: "roi",
    path: "/roi-calculator",
    title: "CCTV business case: ROI, payback and break-even budget",
    question: "Will AI on my existing cameras pay for itself, and by when?",
    summary:
      "Enter the quote you were given and only the benefits you can defend. Returns monthly net cash, cumulative position, payback month, ROI% and benefit/cost ratio — including when the answer is no.",
    inputs: ["Upfront cost (₹)", "Monthly operating cost (₹)", "Selected monthly benefits (₹)", "Horizon (months)"],
    method:
      "Net cash per month = selected cash benefits − incremental operating costs. Cumulative position starts at −upfront. ROI% = 100 × horizon net benefit ÷ total horizon cost.",
    limits:
      "Capacity released is reported separately and is not treated as cash without a stated mechanism. No PGAK price is assumed; an unknown cost leaves ROI incomplete rather than flattering.",
    capability: "verified",
    relatedPath: "/pricing",
    relatedLabel: "How PGAK pricing works",
    cta: "Ask for a business-case review",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "retrofit-vs-replacement",
    path: "/calculators/retrofit-vs-replacement",
    title: "Retrofit vs replacement: like-for-like total cost",
    question: "Is adding AI to my cameras cheaper than replacing the system?",
    summary:
      "Compares both options over the same horizon: upfront + operating + mid-life replacements − residual value. Retrofit does not automatically win, and an unknown on either side blocks the verdict.",
    inputs: ["Upfront (₹) per option", "Monthly operating (₹)", "Replacements inside horizon (₹)", "Residual value (₹)", "Horizon (months)"],
    method:
      "Total = upfront + monthly operating × months + replacement cost − residual value, computed identically for both options.",
    limits:
      "Like-for-like only: if the two options cover different cameras or areas, the comparison is invalid. Residual value counts only if you can actually realise it.",
    capability: "assessment-required",
    relatedPath: "/cctv-installation-company",
    relatedLabel: "New installation scope",
    cta: "Get both options quoted",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "storage",
    path: "/calculators/cctv-storage",
    title: "CCTV storage and retention",
    question: "How much disk do I need to keep N days of footage?",
    summary:
      "Camera count × recorded bitrate × recording hours, in decimal TB, with the free-space reserve and any RAID overhead kept as separate steps.",
    inputs: ["Cameras", "Recorded bitrate (Mbps)", "Recording hours/day", "Retention (days)", "Usable capacity (%)", "RAID overhead (×)"],
    method:
      "Bytes = cameras × bitrate(Mbps) × 1,000,000 × hours × 3600 × days ÷ 8. TB = bytes ÷ 1e12 (decimal). Nominal = recorded ÷ usable fraction.",
    limits:
      "Uses the bitrate you measured or were quoted. No codec saving is applied on top of an already-measured bitrate, and RAID is never folded into the reserve.",
    capability: "educational",
    relatedPath: "/video-analytics-software",
    relatedLabel: "What runs on your existing CCTV",
    cta: "Have your retention checked",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "bandwidth",
    path: "/calculators/bandwidth-and-cloud-cost",
    title: "Bandwidth and cloud/edge transfer cost",
    question: "What link do I need, and what would cloud transfer cost?",
    summary:
      "Simultaneous streams × bitrate sizes the link, with headroom shown separately. Transferred data is computed from real traffic, never inflated by the headroom factor.",
    inputs: ["Simultaneous streams", "Bitrate (Mbps)", "Headroom (%)", "Streaming hours/day", "Days", "Tariff per GB (₹)"],
    method:
      "Required Mbps = streams × bitrate. Recommended link = required × (1 + headroom). Transferred GB = required Mbps × seconds ÷ 8 ÷ 1e9.",
    limits:
      "On-site processing means most footage never leaves the building; only apply cloud tariffs to what your architecture actually uploads.",
    capability: "assessment-required",
    relatedPath: "/multi-site-cctv-monitoring",
    relatedLabel: "Multi-site monitoring",
    cta: "Check your architecture",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "shrinkage",
    path: "/calculators/shrinkage-reduction",
    title: "Inventory shrinkage reduction",
    question: "What is a realistic recovery on documented stock loss?",
    summary:
      "Documented eligible loss at cost × an improvement you choose or observed in a pilot. No default 'typical' recovery percentage is supplied.",
    inputs: ["Documented monthly loss at cost (₹)", "Eligible share (%)", "Assumed or observed improvement (%)"],
    method: "Scenario benefit = eligible loss × improvement. Reported as a scenario, never as cash saved.",
    limits: "Loss must be documented, not estimated from industry averages. Cameras do not by themselves prove causation.",
    capability: "assessment-required",
    relatedPath: "/retail-shop-security",
    relatedLabel: "Retail security",
    cta: "Discuss a measured pilot",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "investigation-time",
    path: "/calculators/investigation-time",
    title: "Investigation time released",
    question: "How many hours does searching footage cost us each month?",
    summary: "Incidents × (minutes before − minutes after) ÷ 60, reported as hours and capacity value, separate from any cash saving.",
    inputs: ["Investigations/month", "Minutes before", "Minutes after", "Hourly cost (₹)", "Cash mechanism"],
    method: "Hours = events × Δminutes ÷ 60. Capacity value = hours × hourly cost. Cash only with a stated mechanism.",
    limits: "Released time is not automatically money; it becomes cash only if a post is not filled, overtime stops, or work is redeployed.",
    capability: "verified",
    relatedPath: "/video-analytics-software",
    relatedLabel: "Search and alerts",
    cta: "Ask for a review",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "attendance-admin",
    path: "/calculators/attendance-admin-time",
    title: "Attendance administration time",
    question: "What does reconciling attendance actually cost us?",
    summary: "Actual administration and reconciliation hours before versus after, with any verified payment correction kept separate.",
    inputs: ["Admin hours/month before", "Hours after", "Hourly cost (₹)", "Verified payment correction (₹)"],
    method: "Hours released = before − after. Value = hours × hourly cost. Payment correction is a separate, evidenced line.",
    limits: "Assumes nothing about lateness or fraud: those need your own payroll evidence, not an industry guess.",
    capability: "verified",
    relatedPath: "/face-recognition-attendance-system",
    relatedLabel: "Attendance from CCTV",
    cta: "Check feasibility at your gate",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "false-alarms",
    path: "/calculators/false-alarm-cost",
    title: "False-alarm handling cost",
    question: "What do nuisance alerts cost us every month?",
    summary: "Difference in false alerts × handling minutes × days ÷ 60, as hours and capacity value.",
    inputs: ["False alerts/day before", "After", "Handling minutes each", "Days/month", "Hourly cost (₹)"],
    method: "Hours = Δalerts × minutes × days ÷ 60.",
    limits: "Fewer alerts must come from better classification, not from switching off detection or shrinking coverage.",
    capability: "verified",
    relatedPath: "/ai-intruder-detection",
    relatedLabel: "Intruder detection",
    cta: "Tune alerts on your footage",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "multi-site-travel",
    path: "/calculators/multi-site-travel",
    title: "Multi-site travel avoided",
    question: "Which site visits could remote checks replace?",
    summary: "Avoidable visits × actual travel and accommodation expense. Travel time is reported separately as capacity.",
    inputs: ["Avoidable visits/month", "Travel cost per visit (₹)", "Hours per visit", "Hourly cost (₹)"],
    method: "Cash = visits × expense. Capacity = visits × hours × hourly cost.",
    limits: "Remote viewing does not replace inspections you are required to perform in person.",
    capability: "verified",
    relatedPath: "/multi-site-cctv-monitoring",
    relatedLabel: "Multi-site monitoring",
    cta: "Review your site list",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "anpr-gate",
    path: "/calculators/anpr-gate-time",
    title: "ANPR gate processing",
    question: "How much gate time would plate recognition save?",
    summary: "Vehicles × processing-time difference × days, with theoretical capacity shown separately from real queue throughput.",
    inputs: ["Vehicles/day", "Seconds before", "Seconds after", "Days/month", "Gate staff hourly cost (₹)"],
    method: "Gate hours = vehicles × Δseconds × days ÷ 3600.",
    limits: "A driver's waiting time is not your cash saving unless you pay for it. Real throughput also depends on lanes and barrier hardware.",
    capability: "verified",
    relatedPath: "/anpr-number-plate-recognition",
    relatedLabel: "ANPR at gates",
    cta: "Size it per lane",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "retail-contribution",
    path: "/calculators/retail-contribution",
    title: "Retail conversion contribution (scenario)",
    question: "What would a small conversion change be worth?",
    summary: "Visitors × conversion-rate change (in percentage points) × order value × contribution margin, minus extra costs.",
    inputs: ["Visitors/month", "Conversion change (pp)", "Average order value (₹)", "Contribution margin (%)", "Extra costs (₹)"],
    method: "Contribution = visitors × Δpp ÷ 100 × AOV × margin − extra costs.",
    limits: "A scenario, not evidence that cameras cause sales. PGAK does not claim a retail uplift product.",
    capability: "educational",
    relatedPath: "/retail-shop-security",
    relatedLabel: "Retail security",
    cta: "Discuss what is measurable",
    status: "live",
    formulaVersion: v,
  },
  {
    id: "electricity",
    path: "/calculators/electricity-cost",
    title: "Electricity running cost",
    question: "What will this add to the power bill?",
    summary: "Watts × hours ÷ 1000 × tariff, with whole-system power and the incremental project power kept apart.",
    inputs: ["System watts", "Incremental watts", "Hours/day", "Days", "Tariff per kWh (₹)"],
    method: "kWh = watts × hours ÷ 1000. Cost = kWh × tariff.",
    limits: "Uses the wattages on your own equipment labels or quote. PoE losses are counted once, at the switch, never twice.",
    capability: "educational",
    relatedPath: "/industrial-cctv",
    relatedLabel: "Industrial CCTV",
    cta: "Ask what your site would draw",
    status: "live",
    formulaVersion: v,
  },
];

export const liveCalculators = () => CALCULATORS.filter((c) => c.status === "live");
export const plannedCalculators = () => CALCULATORS.filter((c) => c.status === "planned");
/** Calculators that belong beside a given commercial page. */
export const calculatorsForPage = (pagePath: string) =>
  CALCULATORS.filter((c) => c.status === "live" && c.relatedPath === pagePath);

export const calculatorByPath = (path: string) =>
  CALCULATORS.find((c) => c.path === path);
