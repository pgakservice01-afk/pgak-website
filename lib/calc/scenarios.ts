/**
 * Feature calculator scenarios C01–C31 — one per marketed or documented
 * capability. Pure functions, no React, no I/O (`npm run test:scenarios`).
 *
 * ── What these are, and are not ──
 * Each scenario turns the visitor's own measurements into one physical
 * quantity — hours of staff time released, kWh, or a rupee difference between
 * two options — using the formula published beside it. None of them carries a
 * PGAK effectiveness figure: every "after" value is the visitor's assumption or
 * a pilot measurement, and the page says so. Inputs start EMPTY; the worked
 * example is loaded only when asked for, and labelled as an example.
 *
 * ── Money, in one place (`finance`) ──
 *   monthly_cash_equivalent = hours × loaded_hourly_cost × realisation
 *                             + model cash delta + independently evidenced cash delta
 *   monthly_net     = monthly_cash_equivalent − recurring_incremental_cost
 *   first_year_net  = 12 × monthly_net − setup_capital
 *   payback_months  = setup_capital ÷ monthly_net   (only when monthly_net > 0)
 *   first_year_ROI  = first_year_net ÷ setup_capital (only when setup_capital > 0)
 * `realisation` is 0–1 and defaults to 0: released hours are capacity, not cash,
 * until the visitor states how they become cash. Negative results stay negative.
 * Direct TCO comparisons (C05, C24) already contain their capital, so they are
 * reported on their own terms and never passed through `finance` a second time.
 *
 * ── Overlap ──
 * Scenarios in the same `overlapGroup` describe the same staff time from
 * different angles (C06/C07/C08/C15/C17/C22/C26 all reduce alert review).
 * `combine` counts one per group unless the visitor confirms the tasks are
 * separate, so one hour is never sold three times.
 *
 * Amounts are nominal rupees, not discounted, and the engine neither adds nor
 * removes GST: enter every amount on the same basis.
 */

export const SCENARIO_FORMULA_VERSION = "1.0.0";

export type ScenarioId =
  | "C01" | "C02" | "C03" | "C04" | "C05" | "C06" | "C07" | "C08" | "C09" | "C10"
  | "C11" | "C12" | "C13" | "C14" | "C15" | "C16" | "C17" | "C18" | "C19" | "C20"
  | "C21" | "C22" | "C23" | "C24" | "C25" | "C26" | "C27" | "C28" | "C29" | "C30"
  | "C31";

export type Unit =
  | "count/month"
  | "count/day"
  | "count"
  | "minutes"
  | "seconds"
  | "hours/month"
  | "hours/day"
  | "days/month"
  | "months"
  | "fraction"
  | "INR"
  | "INR/month"
  | "INR/kWh"
  | "INR/hour"
  | "W"
  | "minutes/video-minute";

export type InputSpec = {
  key: string;
  label: string;
  unit: Unit;
  /** Differences may legitimately be negative; everything else may not. */
  allowNegative?: boolean;
  /** Short help shown under the field. */
  help?: string;
};

/** What a scenario computes. Exactly the quantities its formula defines. */
export type ScenarioOutput = {
  /** Staff hours released per month. Negative = more work, shown as such. */
  hoursPerMonth?: number;
  /** A cash difference the model itself computes (travel, energy, visits). */
  cashPerMonth?: number;
  /** Energy model only. */
  kwhPerMonth?: number;
  /** Contribution-margin scenario; never added to cash. */
  contributionPerMonth?: number;
  /** Direct TCO comparisons: the rupee difference over the stated term. */
  termDelta?: number;
  /** Direct TCO comparisons: the recurring monthly difference. */
  monthlyDelta?: number;
};

export type Kind = "labour" | "cash" | "energy" | "contribution" | "tco";

export type OverlapGroup =
  | "investigation"
  | "reporting"
  | "alert-review"
  | "infrastructure"
  | "gate-admin"
  | "operator-review"
  | "retail-labour"
  | "retail-contribution"
  | "access-review"
  | "safety-review"
  | "camera-health"
  | "redaction"
  | "energy"
  | "travel"
  | "retrofit"
  | "identity-review"
  | "attendance-admin"
  | "counting";

export type ProofStatus =
  | "Supplier/integration or marketed capability; PGAK availability and site performance require verification"
  | "Limited public demonstration; no measured savings verified"
  | "Installation photographs only; recognition performance not verified";

export type Scenario = {
  id: ScenarioId;
  feature: string;
  kind: Kind;
  overlapGroup: OverlapGroup;
  /** Canonical page the scenario is embedded on. */
  hostPath: string;
  /** Existing standalone calculator using the same model, if any. */
  existingCalculator?: string;
  /** Registry, guide, capability-page and claim-register ids it covers. */
  covers: string[];
  inputs: InputSpec[];
  formula: string;
  compute: (v: Record<string, number>) => ScenarioOutput;
  example: { inputs: Record<string, number>; summary: string; expect: ScenarioOutput };
  proofStatus: ProofStatus;
  /** Shown beside every result. */
  guardrails: string[];
};

const SUPPLIER: ProofStatus =
  "Supplier/integration or marketed capability; PGAK availability and site performance require verification";
const DEMO: ProofStatus = "Limited public demonstration; no measured savings verified";
const PHOTOS: ProofStatus = "Installation photographs only; recognition performance not verified";

const BASE_GUARD = [
  "Hours released are capacity, not cash. They become cash only through a mechanism you state — overtime that stops, a post that is not refilled — entered as the realisation fraction.",
  "The 'after' values are your assumptions or pilot measurements. PGAK publishes no effectiveness figure for this feature.",
];
const SAFETY_GUARD = [
  "This estimates review effort only. It does not value injuries or lives, does not promise that any incident is prevented, and is not a replacement for certified alarms, required guards or supervision.",
];
const PEOPLE_GUARD = [
  "Results must not drive automated punishment, pay deductions, access denial or employment decisions. Use requires appropriate notice, a lawful purpose and human review of every exception.",
];

// Small helpers keep every formula readable as the published one.
const perMin = (n: number) => n / 60;
const perSec = (n: number) => n / 3600;

const labour = (
  id: ScenarioId,
  feature: string,
  overlapGroup: OverlapGroup,
  hostPath: string,
  covers: string[],
  inputs: InputSpec[],
  formula: string,
  hours: (v: Record<string, number>) => number,
  example: { inputs: Record<string, number>; summary: string; hours: number },
  extra: Partial<Pick<Scenario, "existingCalculator" | "proofStatus">> & { guard?: string[] } = {},
): Scenario => ({
  id,
  feature,
  kind: "labour",
  overlapGroup,
  hostPath,
  covers,
  inputs,
  formula,
  compute: (v) => ({ hoursPerMonth: hours(v) }),
  example: { inputs: example.inputs, summary: example.summary, expect: { hoursPerMonth: example.hours } },
  proofStatus: extra.proofStatus ?? SUPPLIER,
  existingCalculator: extra.existingCalculator,
  guardrails: [...BASE_GUARD, ...(extra.guard ?? [])],
});

const I = {
  count: (key: string, label: string, help?: string): InputSpec => ({ key, label, unit: "count/month", help }),
  perDay: (key: string, label: string): InputSpec => ({ key, label, unit: "count/day" }),
  n: (key: string, label: string): InputSpec => ({ key, label, unit: "count" }),
  min: (key: string, label: string, help?: string): InputSpec => ({ key, label, unit: "minutes", help }),
  sec: (key: string, label: string): InputSpec => ({ key, label, unit: "seconds" }),
  hrs: (key: string, label: string, help?: string): InputSpec => ({ key, label, unit: "hours/month", help }),
  days: (key: string, label = "Operating days per month"): InputSpec => ({ key, label, unit: "days/month" }),
  frac: (key: string, label: string, help?: string): InputSpec => ({ key, label, unit: "fraction", help }),
  inr: (key: string, label: string, allowNegative = false): InputSpec => ({ key, label, unit: "INR", allowNegative }),
  inrMonth: (key: string, label: string, allowNegative = false): InputSpec => ({ key, label, unit: "INR/month", allowNegative }),
};

export const SCENARIOS: Scenario[] = [
  labour(
    "C01", "Natural-language footage search", "investigation", "/features/guides/natural-language-search",
    ["F08", "natural-language-search"],
    [
      I.count("cases", "Investigations per month"),
      I.min("manual", "Manual search minutes per case"),
      I.min("assisted", "Assisted search minutes per case"),
      I.min("review", "Review minutes per case", "Checking each suggested clip against the original recording."),
    ],
    "hours = cases × (manual − assisted − review) ÷ 60",
    (v) => perMin(v.cases * (v.manual - v.assisted - v.review)),
    { inputs: { cases: 20, manual: 90, assisted: 15, review: 5 }, summary: "20 cases; 90 manual; 15 assisted; 5 review", hours: 23.333 },
    { existingCalculator: "/calculators/investigation-time" },
  ),
  labour(
    "C02", "Cross-camera search", "investigation", "/features/guides/cross-camera-search",
    ["cross-camera-search"],
    [
      I.count("cases", "Investigations per month"),
      I.n("cameras", "Cameras reviewed per case"),
      I.min("oldPerCamera", "Old minutes per camera"),
      I.min("newTotal", "New total minutes per case"),
      I.min("verification", "Verification minutes per case"),
    ],
    "hours = cases × (cameras × old minutes per camera − new total − verification) ÷ 60",
    (v) => perMin(v.cases * (v.cameras * v.oldPerCamera - v.newTotal - v.verification)),
    { inputs: { cases: 10, cameras: 4, oldPerCamera: 15, newTotal: 12, verification: 3 }, summary: "10 cases; 4 cameras; 15 old; 12 new; 3 review", hours: 7.5 },
    { existingCalculator: "/calculators/investigation-time" },
  ),
  labour(
    "C03", "Event summaries", "reporting", "/features/guides/event-summaries",
    ["event-summaries"],
    [
      I.count("reports", "Incident reports per month"),
      I.min("manual", "Manual write-up minutes per report"),
      I.min("assistedReview", "AI draft plus review minutes per report", "Every statement in a draft is checked against the video."),
    ],
    "hours = reports × (manual − assisted and review) ÷ 60",
    (v) => perMin(v.reports * (v.manual - v.assistedReview)),
    { inputs: { reports: 40, manual: 20, assistedReview: 8 }, summary: "40 reports; 20 old; 8 new", hours: 8 },
    { existingCalculator: "/calculators/investigation-time" },
  ),
  labour(
    "C04", "Custom text alerts", "alert-review", "/features/guides/custom-text-alerts",
    ["custom-text-alerts"],
    [
      I.count("events", "Candidate events per month"),
      I.min("old", "Old review minutes per event"),
      I.min("new", "New review minutes per event"),
      I.hrs("maintenance", "Rule maintenance hours per month"),
    ],
    "hours = events × (old − new) ÷ 60 − rule maintenance hours",
    (v) => perMin(v.events * (v.old - v.new)) - v.maintenance,
    { inputs: { events: 300, old: 2, new: 0.5, maintenance: 2 }, summary: "300 events; 2 old; 0.5 new; 2 maintenance", hours: 5.5 },
    { existingCalculator: "/calculators/false-alarm-cost" },
  ),
  {
    id: "C05",
    feature: "Edge AI processing",
    kind: "tco",
    overlapGroup: "infrastructure",
    hostPath: "/features/guides/edge-ai",
    existingCalculator: "/calculators/bandwidth-and-cloud-cost",
    covers: ["F05", "edge-ai"],
    inputs: [
      I.inrMonth("cloudMonthly", "Cloud option: monthly charge"),
      I.inrMonth("edgeMonthly", "On-site option: monthly energy, support and licence"),
      I.inr("incrementalCapital", "On-site option: incremental capital"),
      { key: "months", label: "Comparison term", unit: "months" },
    ],
    formula: "monthly difference = cloud monthly − on-site monthly; term difference = months × monthly difference − incremental capital",
    compute: (v) => {
      const monthlyDelta = v.cloudMonthly - v.edgeMonthly;
      return { monthlyDelta, termDelta: v.months * monthlyDelta - v.incrementalCapital };
    },
    example: {
      inputs: { cloudMonthly: 6000, edgeMonthly: 2500, incrementalCapital: 42000, months: 36 },
      summary: "Cloud ₹6,000; on-site ₹2,500; capital ₹42,000; 36 months",
      expect: { monthlyDelta: 3500, termDelta: 84000 },
    },
    proofStatus: SUPPLIER,
    guardrails: [
      "A positive term difference favours on-site processing over the cloud option on these inputs. It is a comparison of two quotes you supply, not a PGAK price.",
      "The incremental capital is already inside the term difference; it is not deducted again anywhere on this page.",
    ],
  },
  labour(
    "C06", "Object classification", "alert-review", "/features/guides/object-classification",
    ["F02", "object-classification"],
    [
      I.count("irrelevantEvents", "Irrelevant events per month", "Animals, headlights, swaying trees — events no one needed to see."),
      I.frac("filterFraction", "Measured filtering fraction", "Share of irrelevant events the classifier removed in your own test."),
      I.min("reviewMinutes", "Review minutes per event"),
      I.hrs("errorReview", "Error-review hours per month", "Spot-checking what was filtered out, so real events are not hidden."),
    ],
    "hours = irrelevant events × filtering fraction × review minutes ÷ 60 − error-review hours",
    (v) => perMin(v.irrelevantEvents * v.filterFraction * v.reviewMinutes) - v.errorReview,
    { inputs: { irrelevantEvents: 600, filterFraction: 0.5, reviewMinutes: 1, errorReview: 1 }, summary: "600 events; 0.5 filtered; 1 minute; 1 review hour", hours: 4 },
    { existingCalculator: "/calculators/false-alarm-cost" },
  ),
  labour(
    "C07", "Intrusion and line crossing", "alert-review", "/features/intrusion-alerts",
    ["F06", "virtual-perimeter", "intrusion-alerts", "intrusion"],
    [
      I.count("events", "Routine review events per month"),
      I.min("old", "Old review minutes per event"),
      I.min("pilot", "Pilot review minutes per event"),
      I.hrs("verification", "Additional verification hours per month"),
    ],
    "hours = events × (old − pilot) ÷ 60 − verification hours",
    (v) => perMin(v.events * (v.old - v.pilot)) - v.verification,
    { inputs: { events: 200, old: 4, pilot: 1, verification: 2 }, summary: "200 events; 4 old; 1 pilot; 2 verification hours", hours: 8 },
    { existingCalculator: "/calculators/false-alarm-cost" },
  ),
  labour(
    "C08", "Loitering detection", "alert-review", "/features/loitering-detection",
    ["F10", "loitering", "loitering-detection"],
    [
      I.count("alerts", "Dwell alerts per month"),
      I.min("manual", "Manual verification minutes per alert"),
      I.min("assisted", "Assisted verification minutes per alert"),
      I.hrs("tuning", "Tuning hours per month"),
    ],
    "hours = alerts × (manual − assisted) ÷ 60 − tuning hours",
    (v) => perMin(v.alerts * (v.manual - v.assisted)) - v.tuning,
    { inputs: { alerts: 120, manual: 6, assisted: 2, tuning: 1 }, summary: "120 alerts; 6 old; 2 new; 1 tuning hour", hours: 7 },
    { existingCalculator: "/calculators/false-alarm-cost" },
  ),
  labour(
    "C09", "ANPR and vehicle logs", "gate-admin", "/anpr-number-plate-recognition",
    ["F03", "number-plates", "vehicle-and-anpr", "anpr"],
    [
      I.perDay("passagesPerDay", "Vehicle passages per day"),
      I.days("days"),
      I.sec("oldSeconds", "Old handling seconds per vehicle"),
      I.sec("newSeconds", "New handling seconds per vehicle"),
      I.count("exceptions", "Exceptions per month", "Unread or misread plates a guard handles by hand."),
      I.min("minutesPerException", "Minutes per exception"),
    ],
    "hours = passages per day × days × (old − new seconds) ÷ 3600 − exceptions × minutes per exception ÷ 60",
    (v) => perSec(v.passagesPerDay * v.days * (v.oldSeconds - v.newSeconds)) - perMin(v.exceptions * v.minutesPerException),
    { inputs: { passagesPerDay: 200, days: 26, oldSeconds: 45, newSeconds: 15, exceptions: 50, minutesPerException: 2 }, summary: "200 a day; 26 days; 45 old; 15 new; 50 exceptions at 2 minutes", hours: 41.667 },
    { existingCalculator: "/calculators/anpr-gate-time", proofStatus: PHOTOS },
  ),
  labour(
    "C10", "PTZ tracking", "operator-review", "/features/guides/ptz-tracking",
    ["ptz-tracking"],
    [
      I.count("sessions", "Tracking sessions per month"),
      I.min("old", "Old operator minutes per session"),
      I.min("new", "New operator minutes per session"),
      I.min("recovery", "Lost-view recovery minutes per session", "Time spent re-finding a subject the moving camera lost."),
    ],
    "hours = sessions × (old − new − recovery) ÷ 60",
    (v) => perMin(v.sessions * (v.old - v.new - v.recovery)),
    { inputs: { sessions: 60, old: 10, new: 3, recovery: 2 }, summary: "60 sessions; 10 old; 3 new; 2 recovery", hours: 5 },
  ),
  labour(
    "C11", "People counting and occupancy", "retail-labour", "/features/guides/people-counting",
    ["F09", "people-counting"],
    [
      I.perDay("roundsPerDay", "Manual count rounds per day"),
      I.days("days"),
      I.min("manualMinutes", "Minutes per manual round"),
      I.hrs("verification", "Verification hours per month", "Checking the automatic count against a manual tally."),
    ],
    "hours = rounds × days × manual minutes ÷ 60 − verification hours",
    (v) => perMin(v.roundsPerDay * v.days * v.manualMinutes) - v.verification,
    { inputs: { roundsPerDay: 4, days: 26, manualMinutes: 10, verification: 2 }, summary: "4 rounds a day; 26 days; 10 minutes; 2 verification hours", hours: 15.333 },
    { existingCalculator: "/calculators/retail-contribution" },
  ),
  {
    id: "C12",
    feature: "Queue analytics and heat maps",
    kind: "contribution",
    overlapGroup: "retail-contribution",
    hostPath: "/features/guides/queue-analytics",
    existingCalculator: "/calculators/retail-contribution",
    covers: ["F15", "queue-analytics", "queue", "heat-map", "heatmap"],
    inputs: [
      I.count("visitors", "Visitors per month"),
      I.frac("baseline", "Baseline conversion"),
      I.frac("scenario", "Scenario conversion"),
      I.inr("contribution", "Contribution margin per transaction"),
      I.frac("attributable", "Share of the change attributable to the queue or layout change"),
    ],
    formula: "incremental contribution = visitors × (scenario − baseline conversion) × contribution per sale × attributable fraction",
    compute: (v) => ({ contributionPerMonth: v.visitors * (v.scenario - v.baseline) * v.contribution * v.attributable }),
    example: {
      inputs: { visitors: 10000, baseline: 0.2, scenario: 0.21, contribution: 150, attributable: 0.5 },
      summary: "10,000 visitors; 20% baseline; 21% scenario; ₹150 contribution; half attributable",
      expect: { contributionPerMonth: 7500 },
    },
    proofStatus: SUPPLIER,
    guardrails: [
      "This is a contribution-margin scenario, not a causal sales-uplift forecast. It is reported apart from cash and is not counted in net cash below.",
      "Margin, not revenue: use what one more sale actually adds after its direct costs.",
    ],
  },
  labour(
    "C13", "Tailgating detection", "access-review", "/features/guides/tailgating",
    ["tailgating"],
    [
      I.count("events", "Access events reviewed per month"),
      I.min("old", "Old review minutes per event"),
      I.min("new", "New review minutes per event"),
      I.hrs("exceptions", "Exception handling hours per month"),
    ],
    "hours = events × (old − new) ÷ 60 − exception hours",
    (v) => perMin(v.events * (v.old - v.new)) - v.exceptions,
    { inputs: { events: 200, old: 3, new: 1, exceptions: 1 }, summary: "200 events; 3 old; 1 new; 1 exception hour", hours: 5.667 },
    { guard: PEOPLE_GUARD },
  ),
  labour(
    "C14", "PPE detection", "safety-review", "/features/guides/ppe-detection",
    ["F13", "ppe-detection", "ppe"],
    [
      I.count("samples", "Review samples per month"),
      I.min("old", "Old review minutes per sample"),
      I.min("new", "New review minutes per sample"),
      I.hrs("validation", "Human validation hours per month"),
    ],
    "hours = samples × (old − new) ÷ 60 − validation hours",
    (v) => perMin(v.samples * (v.old - v.new)) - v.validation,
    { inputs: { samples: 300, old: 2, new: 0.5, validation: 2 }, summary: "300 samples; 2 old; 0.5 new; 2 validation hours", hours: 5.5 },
    { proofStatus: DEMO, guard: SAFETY_GUARD },
  ),
  labour(
    "C15", "On-site learning and tuning", "alert-review", "/features/guides/onsite-learning",
    ["onsite-learning"],
    [
      I.count("falseEvents", "False events per month before tuning"),
      I.frac("reduction", "Measured reduction fraction", "From a before/after test on your own footage, not a brochure."),
      I.min("reviewMinutes", "Review minutes per event"),
      I.hrs("tuning", "Tuning hours per month"),
    ],
    "hours = false events × measured reduction × review minutes ÷ 60 − tuning hours",
    (v) => perMin(v.falseEvents * v.reduction * v.reviewMinutes) - v.tuning,
    { inputs: { falseEvents: 900, reduction: 0.4, reviewMinutes: 1, tuning: 3 }, summary: "900 events; 0.4 reduction; 1 minute; 3 tuning hours", hours: 3 },
    { existingCalculator: "/calculators/false-alarm-cost" },
  ),
  labour(
    "C16", "Scene-change and tamper detection", "camera-health", "/features/guides/scene-change",
    ["scene-change"],
    [
      I.n("cameras", "Cameras"),
      I.perDay("checksPerDay", "Manual checks per camera per day"),
      I.days("days"),
      I.min("minutesPerCheck", "Minutes per check"),
      I.hrs("exceptions", "New exception-handling hours per month"),
    ],
    "hours = cameras × checks per day × days × minutes per check ÷ 60 − exception hours",
    (v) => perMin(v.cameras * v.checksPerDay * v.days * v.minutesPerCheck) - v.exceptions,
    { inputs: { cameras: 20, checksPerDay: 1, days: 26, minutesPerCheck: 0.5, exceptions: 1 }, summary: "20 cameras; 1 check; 26 days; 0.5 minutes; 1 exception hour", hours: 3.333 },
  ),
  labour(
    "C17", "Sound classification", "alert-review", "/features/guides/sound-classification",
    ["sound-classification"],
    [
      I.count("events", "Audio events per month"),
      I.min("manual", "Manual verification minutes per event"),
      I.min("assisted", "Assisted verification minutes per event"),
      I.hrs("tuning", "Tuning hours per month"),
    ],
    "hours = events × (manual − assisted) ÷ 60 − tuning hours",
    (v) => perMin(v.events * (v.manual - v.assisted)) - v.tuning,
    { inputs: { events: 100, manual: 5, assisted: 2, tuning: 1 }, summary: "100 events; 5 old; 2 new; 1 tuning hour", hours: 4 },
  ),
  labour(
    "C18", "Privacy masking", "redaction", "/features/guides/privacy-masking",
    ["privacy-masking"],
    [
      I.count("exports", "Exports per month"),
      I.min("videoMinutes", "Footage minutes per export"),
      { key: "manualRatio", label: "Manual redaction labour per video minute", unit: "minutes/video-minute" },
      { key: "assistedRatio", label: "Assisted review labour per video minute", unit: "minutes/video-minute" },
    ],
    "hours = exports × video minutes × (manual − assisted labour ratio) ÷ 60",
    (v) => perMin(v.exports * v.videoMinutes * (v.manualRatio - v.assistedRatio)),
    { inputs: { exports: 10, videoMinutes: 30, manualRatio: 2, assistedRatio: 0.5 }, summary: "10 exports; 30 video minutes; 2 old; 0.5 new", hours: 7.5 },
    { guard: PEOPLE_GUARD },
  ),
  {
    id: "C19",
    feature: "Low-light imaging",
    kind: "energy",
    overlapGroup: "energy",
    hostPath: "/features/guides/low-light-ai",
    existingCalculator: "/calculators/electricity-cost",
    covers: ["F16", "low-light-ai"],
    inputs: [
      { key: "oldWatts", label: "Current light wattage (each)", unit: "W" },
      { key: "newWatts", label: "Proposed light wattage (each)", unit: "W", help: "Keep this equal to the current wattage until a site test shows the scene is still lit enough for people as well as cameras." },
      I.n("lights", "Lights"),
      { key: "hoursPerNight", label: "Hours lit per night", unit: "hours/day" },
      I.days("days", "Nights per month"),
      { key: "tariff", label: "Tariff", unit: "INR/kWh" },
      { key: "addedCameraWatts", label: "Added camera wattage (total)", unit: "W" },
    ],
    formula: "kWh difference = (old − new light watts) × lights × hours × days ÷ 1000 − added camera watts × hours × days ÷ 1000; cash = kWh × tariff",
    compute: (v) => {
      const kwh =
        ((v.oldWatts - v.newWatts) * v.lights * v.hoursPerNight * v.days) / 1000 -
        (v.addedCameraWatts * v.hoursPerNight * v.days) / 1000;
      return { kwhPerMonth: kwh, cashPerMonth: kwh * v.tariff };
    },
    example: {
      inputs: { oldWatts: 100, newWatts: 60, lights: 10, hoursPerNight: 12, days: 30, tariff: 8, addedCameraWatts: 20 },
      summary: "100 W to 60 W; 10 lights; 12 h; 30 nights; 20 W extra; ₹8/kWh (illustrative tariff)",
      expect: { kwhPerMonth: 136.8, cashPerMonth: 1094.4 },
    },
    proofStatus: SUPPLIER,
    guardrails: [
      "Do not reduce lighting that people need for safety or security. The example's reduction is illustrative; set the proposed wattage equal to the current one until it is validated on site.",
      "The tariff in the worked example is illustrative. Use the rate on your own bill.",
    ],
  },
  labour(
    "C20", "Smoke and flame video detection", "safety-review", "/features/guides/smoke-flame",
    ["F12", "smoke-flame"],
    [
      I.count("checks", "Monthly checks"),
      I.min("old", "Old review minutes per check"),
      I.min("assisted", "Assisted review minutes per check"),
      I.hrs("verification", "Extra verification hours per month"),
    ],
    "hours = checks × (old − assisted) ÷ 60 − verification hours",
    (v) => perMin(v.checks * (v.old - v.assisted)) - v.verification,
    { inputs: { checks: 60, old: 5, assisted: 2, verification: 1 }, summary: "60 checks; 5 old; 2 new; 1 verification hour", hours: 2 },
    { guard: SAFETY_GUARD },
  ),
  labour(
    "C21", "Weapon detection", "safety-review", "/features/guides/weapon-detection",
    ["F11", "weapon-detection"],
    [
      I.count("alerts", "Alerts per month"),
      I.min("manual", "Manual review minutes per alert"),
      I.min("assisted", "Assisted review minutes per alert"),
      I.hrs("escalation", "False-positive escalation hours per month"),
    ],
    "hours = alerts × (manual − assisted) ÷ 60 − escalation hours",
    (v) => perMin(v.alerts * (v.manual - v.assisted)) - v.escalation,
    { inputs: { alerts: 40, manual: 6, assisted: 2, escalation: 1 }, summary: "40 alerts; 6 old; 2 new; 1 escalation hour", hours: 1.667 },
    { guard: SAFETY_GUARD },
  ),
  labour(
    "C22", "Abandoned and removed objects", "alert-review", "/features/guides/abandoned-object",
    ["F14", "abandoned-object", "abandoned", "removed-object"],
    [
      I.count("events", "Object events per month"),
      I.min("old", "Old verification minutes per event"),
      I.min("assisted", "Assisted verification minutes per event"),
      I.hrs("exceptions", "Exception hours per month"),
    ],
    "hours = events × (old − assisted) ÷ 60 − exception hours",
    (v) => perMin(v.events * (v.old - v.assisted)) - v.exceptions,
    { inputs: { events: 80, old: 5, assisted: 2, exceptions: 1 }, summary: "80 events; 5 old; 2 new; 1 exception hour", hours: 3 },
  ),
  {
    id: "C23",
    feature: "Two-way audio",
    kind: "cash",
    overlapGroup: "travel",
    hostPath: "/features/guides/two-way-audio",
    covers: ["F17", "two-way-audio"],
    inputs: [
      I.count("visits", "Verification visits per month"),
      I.frac("replaceable", "Share of visits replaceable by a remote check"),
      I.inr("costPerVisit", "Cost per visit"),
      I.hrs("remoteHours", "Additional remote operator hours per month"),
      { key: "hourlyCost", label: "Remote operator hourly cost", unit: "INR/hour" },
    ],
    formula: "monthly difference = visits × replaceable fraction × cost per visit − remote hours × hourly cost",
    compute: (v) => ({ cashPerMonth: v.visits * v.replaceable * v.costPerVisit - v.remoteHours * v.hourlyCost }),
    example: {
      inputs: { visits: 20, replaceable: 0.4, costPerVisit: 400, remoteHours: 4, hourlyCost: 200 },
      summary: "20 visits; 0.4 replaceable; ₹400 a visit; 4 hours at ₹200",
      expect: { cashPerMonth: 2400 },
    },
    proofStatus: SUPPLIER,
    guardrails: [
      "Count only visits a remote check genuinely replaces. Speaking through a camera does not replace a person who must attend, and no confrontation outcome is promised.",
    ],
  },
  {
    id: "C24",
    feature: "ONVIF and open integration",
    kind: "tco",
    overlapGroup: "retrofit",
    hostPath: "/features/guides/onvif-integration",
    existingCalculator: "/calculators/retrofit-vs-replacement",
    covers: ["F18", "onvif-integration", "vms"],
    inputs: [
      I.inr("replacementCapital", "Replacement project capital"),
      I.inr("integrationCapital", "Integration project capital"),
      I.inrMonth("extraMonthly", "Extra monthly cost of the integration option", true),
      { key: "months", label: "Comparison term", unit: "months" },
    ],
    formula: "term difference = replacement capital − integration capital − months × extra integration monthly cost",
    compute: (v) => ({
      monthlyDelta: -v.extraMonthly,
      termDelta: v.replacementCapital - v.integrationCapital - v.months * v.extraMonthly,
    }),
    example: {
      inputs: { replacementCapital: 200000, integrationCapital: 80000, extraMonthly: 1000, months: 36 },
      summary: "₹2,00,000 replacement; ₹80,000 integration; ₹1,000 extra a month; 36 months",
      expect: { monthlyDelta: -1000, termDelta: 84000 },
    },
    proofStatus: SUPPLIER,
    guardrails: [
      "A positive term difference favours integrating the existing cameras on these inputs. Both capital figures are quotes you supply; compatibility is confirmed per camera model, never by brand or by an ONVIF badge.",
      "Both options' capital is already inside the term difference; nothing is deducted twice.",
    ],
  },
  labour(
    "C25", "Face recognition and face search", "identity-review", "/features/face-recognition",
    ["F04", "face-recognition", "recognition"],
    [
      I.count("checks", "Identity checks per month"),
      I.sec("oldSeconds", "Old seconds per check"),
      I.sec("assistedSeconds", "Assisted seconds per check"),
      I.hrs("falseMatchReview", "False-match review hours per month"),
    ],
    "hours = checks × (old − assisted seconds) ÷ 3600 − false-match review hours",
    (v) => perSec(v.checks * (v.oldSeconds - v.assistedSeconds)) - v.falseMatchReview,
    { inputs: { checks: 1000, oldSeconds: 30, assistedSeconds: 10, falseMatchReview: 1 }, summary: "1,000 checks; 30 old; 10 new; 1 review hour", hours: 4.556 },
    { guard: PEOPLE_GUARD },
  ),
  labour(
    "C26", "False-alarm filtering", "alert-review", "/features/false-alarm-filtering",
    ["F01", "false-alarm-filtering"],
    [
      I.count("alerts", "False alerts per month"),
      I.frac("reduction", "Measured reduction fraction"),
      I.min("handling", "Handling minutes per alert"),
      I.hrs("admin", "Extra administration hours per month"),
    ],
    "hours = alerts × reduction × handling minutes ÷ 60 − administration hours",
    (v) => perMin(v.alerts * v.reduction * v.handling) - v.admin,
    { inputs: { alerts: 1000, reduction: 0.6, handling: 1, admin: 2 }, summary: "1,000 alerts; 0.6 reduction; 1 minute; 2 admin hours", hours: 8 },
    { existingCalculator: "/calculators/false-alarm-cost" },
  ),
  {
    id: "C27",
    feature: "Remote and multi-site viewing",
    kind: "cash",
    overlapGroup: "travel",
    hostPath: "/remote-cctv-monitoring",
    existingCalculator: "/calculators/multi-site-travel",
    covers: ["F07", "remote-multi-site"],
    inputs: [
      I.count("visits", "Site visits per month"),
      I.frac("replaceable", "Share of visits replaceable by remote review"),
      I.inr("cashPerVisit", "Travel cash cost per visit"),
      { key: "travelHours", label: "Travel hours per visit", unit: "hours/day" },
      I.hrs("remoteReview", "Added remote review hours per month"),
    ],
    formula: "cash = visits × replaceable fraction × cash per visit; hours = visits × replaceable fraction × travel hours − remote review hours",
    compute: (v) => ({
      cashPerMonth: v.visits * v.replaceable * v.cashPerVisit,
      hoursPerMonth: v.visits * v.replaceable * v.travelHours - v.remoteReview,
    }),
    example: {
      inputs: { visits: 8, replaceable: 0.5, cashPerVisit: 1500, travelHours: 4, remoteReview: 4 },
      summary: "8 visits; half replaceable; ₹1,500 travel; 4 travel hours; 4 remote hours",
      expect: { cashPerMonth: 6000, hoursPerMonth: 12 },
    },
    proofStatus: SUPPLIER,
    guardrails: [
      ...BASE_GUARD,
      "Remote viewing replaces looking, not attending. Count only visits whose purpose was to see something.",
    ],
  },
  labour(
    "C28", "Attendance automation", "attendance-admin", "/features/attendance-automation",
    ["attendance-automation", "attendance"],
    [
      I.n("employees", "Employees"),
      I.days("days", "Workdays per month"),
      I.min("old", "Old admin minutes per employee per day"),
      I.min("new", "New admin minutes per employee per day"),
      I.hrs("corrections", "Monthly correction hours"),
    ],
    "hours = employees × days × (old − new) ÷ 60 − correction hours",
    (v) => perMin(v.employees * v.days * (v.old - v.new)) - v.corrections,
    { inputs: { employees: 100, days: 26, old: 0.5, new: 0.1, corrections: 2 }, summary: "100 employees; 26 days; 0.5 old; 0.1 new; 2 correction hours", hours: 15.333 },
    { existingCalculator: "/calculators/attendance-admin-time", guard: PEOPLE_GUARD },
  ),
  labour(
    "C29", "Sack and object counting", "counting", "/platform/capabilities",
    ["line-count", "sack-counting", "object-counting"],
    [
      I.count("batches", "Batches per month"),
      I.min("old", "Old reconciliation minutes per batch"),
      I.min("assisted", "Assisted reconciliation minutes per batch"),
      I.hrs("exceptions", "Exception hours per month"),
    ],
    "hours = batches × (old − assisted) ÷ 60 − exception hours",
    (v) => perMin(v.batches * (v.old - v.assisted)) - v.exceptions,
    { inputs: { batches: 120, old: 10, assisted: 3, exceptions: 2 }, summary: "120 batches; 10 old; 3 new; 2 exception hours", hours: 12 },
    { proofStatus: DEMO, guard: ["A video count is not a certified weighing or stock system; reconcile against your own records."] },
  ),
  labour(
    "C30", "Hot-work monitoring", "safety-review", "/platform/capabilities",
    ["hot-work"],
    [
      I.count("permits", "Permit reviews per month"),
      I.min("old", "Old review minutes per permit"),
      I.min("assisted", "Assisted review minutes per permit"),
      I.hrs("followUp", "Human follow-up hours per month"),
    ],
    "hours = permits × (old − assisted) ÷ 60 − follow-up hours",
    (v) => perMin(v.permits * (v.old - v.assisted)) - v.followUp,
    { inputs: { permits: 80, old: 8, assisted: 3, followUp: 2 }, summary: "80 reviews; 8 old; 3 new; 2 follow-up hours", hours: 4.667 },
    { proofStatus: DEMO, guard: SAFETY_GUARD },
  ),
  labour(
    "C31", "Camera health and recording checks", "camera-health", "/platform/capabilities",
    ["health", "camera-health"],
    [
      I.n("cameras", "Cameras"),
      I.count("checks", "Manual checks per camera per month"),
      I.min("manualMinutes", "Minutes per manual check"),
      I.hrs("exceptionReview", "Automated exception-review hours per month"),
    ],
    "hours = cameras × checks × manual minutes ÷ 60 − exception-review hours",
    (v) => perMin(v.cameras * v.checks * v.manualMinutes) - v.exceptionReview,
    { inputs: { cameras: 32, checks: 26, manualMinutes: 0.5, exceptionReview: 2 }, summary: "32 cameras; 26 checks; 0.5 minutes; 2 exception hours", hours: 4.933 },
  ),
];

export const scenarioById = (id: string) => SCENARIOS.find((s) => s.id === id);
export const scenariosForPath = (path: string) => SCENARIOS.filter((s) => s.hostPath === path);
/** Any registry/guide/capability id or alias → its scenario. */
export const scenarioForFeature = (featureId: string) =>
  SCENARIOS.find((s) => s.covers.includes(featureId) || s.hostPath.endsWith(`/${featureId}`));

// ── Validation ──────────────────────────────────────────────────────────────

export type Raw = Record<string, string | number | null | undefined>;
export type Validated =
  | { ok: true; values: Record<string, number> }
  | { ok: false; errors: Record<string, string> };

const UNIT_MAX: Partial<Record<Unit, number>> = {
  "days/month": 31,
  "hours/day": 24,
  fraction: 1,
  months: 120,
};

/**
 * Turns form strings into numbers or field errors. Missing, NaN and negative
 * values are errors, never silently zero; a typed 0 is a legitimate 0.
 * Fractions arrive as 0–1 (the UI converts percent before calling this).
 */
export function validate(inputs: InputSpec[], raw: Raw): Validated {
  const errors: Record<string, string> = {};
  const values: Record<string, number> = {};
  for (const spec of inputs) {
    const r = raw[spec.key];
    if (r === null || r === undefined || (typeof r === "string" && r.trim() === "")) {
      errors[spec.key] = "Required.";
      continue;
    }
    const n = typeof r === "number" ? r : Number(String(r).replace(/,/g, "").trim());
    if (!Number.isFinite(n)) {
      errors[spec.key] = "Enter a number.";
      continue;
    }
    if (n < 0 && !spec.allowNegative) {
      errors[spec.key] = "Cannot be negative.";
      continue;
    }
    const max = UNIT_MAX[spec.unit];
    if (max !== undefined && n > max) {
      errors[spec.key] =
        spec.unit === "fraction" ? "Must be between 0% and 100%." : `Cannot exceed ${max}.`;
      continue;
    }
    if (spec.unit === "months" && n < 1) {
      errors[spec.key] = "At least 1 month.";
      continue;
    }
    values[spec.key] = n;
  }
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, values };
}

// ── Finance ─────────────────────────────────────────────────────────────────

export type FinanceInput = {
  hoursPerMonth: number;
  /** null = not entered. Only needed when realisation > 0. */
  loadedHourlyCost: number | null;
  /** 0–1. Default 0: hours are capacity until a mechanism is stated. */
  realisation: number;
  /** Cash the model itself computes (travel, visits, energy). */
  modelCashPerMonth: number;
  /** Independently evidenced cash change, may be negative. */
  evidencedCashDelta: number;
  /** null = unknown, which leaves net, payback and ROI incomplete. */
  recurringCost: number | null;
  setupCapital: number | null;
};

export type FinanceResult = {
  hoursPerMonth: number;
  hoursValueAtFullRealisation: number | null;
  monthlyCashEquivalent: number | null;
  monthlyNet: number | null;
  firstYearNet: number | null;
  /** null with a reason when not defined. */
  paybackMonths: number | null;
  paybackNote: string | null;
  firstYearRoi: number | null;
  roiNote: string | null;
  incomplete: string[];
};

const r3 = (n: number) => Math.round(n * 1000) / 1000;
const r2 = (n: number) => Math.round(n * 100) / 100;

export function finance(i: FinanceInput): FinanceResult {
  const incomplete: string[] = [];
  const realisation = Math.min(1, Math.max(0, i.realisation));
  const hoursValueAtFullRealisation =
    i.loadedHourlyCost === null ? null : r2(i.hoursPerMonth * i.loadedHourlyCost);

  let monthlyCashEquivalent: number | null;
  if (realisation > 0 && i.loadedHourlyCost === null) {
    incomplete.push("Enter a loaded hourly cost to value the realised hours.");
    monthlyCashEquivalent = null;
  } else {
    monthlyCashEquivalent = r2(
      i.hoursPerMonth * (i.loadedHourlyCost ?? 0) * realisation +
        i.modelCashPerMonth +
        i.evidencedCashDelta,
    );
  }

  if (i.recurringCost === null) incomplete.push("Enter the recurring incremental cost (0 if there is none).");
  if (i.setupCapital === null) incomplete.push("Enter the one-off setup capital (0 if there is none).");

  const monthlyNet =
    monthlyCashEquivalent === null || i.recurringCost === null
      ? null
      : r2(monthlyCashEquivalent - i.recurringCost);
  const firstYearNet =
    monthlyNet === null || i.setupCapital === null ? null : r2(12 * monthlyNet - i.setupCapital);

  let paybackMonths: number | null = null;
  let paybackNote: string | null = null;
  if (monthlyNet === null || i.setupCapital === null) paybackNote = "Not calculated until costs are entered.";
  else if (monthlyNet <= 0) paybackNote = "Not applicable: the monthly net is zero or negative, so the setup capital is never recovered on these inputs.";
  else if (i.setupCapital === 0) {
    paybackMonths = 0;
    paybackNote = "No setup capital, so there is nothing to pay back.";
  } else paybackMonths = r2(i.setupCapital / monthlyNet);

  let firstYearRoi: number | null = null;
  let roiNote: string | null = null;
  if (firstYearNet === null || i.setupCapital === null) roiNote = "Not calculated until costs are entered.";
  else if (i.setupCapital <= 0) roiNote = "Not applicable: ROI is undefined without setup capital.";
  else firstYearRoi = r3(firstYearNet / i.setupCapital);

  return {
    hoursPerMonth: r3(i.hoursPerMonth),
    hoursValueAtFullRealisation,
    monthlyCashEquivalent,
    monthlyNet,
    firstYearNet,
    paybackMonths,
    paybackNote,
    firstYearRoi,
    roiNote,
    incomplete,
  };
}

/** Run one scenario end to end. Rounds hours to 3 places for display and tests. */
export function runScenario(id: ScenarioId, values: Record<string, number>): ScenarioOutput {
  const s = scenarioById(id);
  if (!s) throw new Error(`Unknown scenario ${id}`);
  const out = s.compute(values);
  const round = (n: number | undefined) => (n === undefined ? undefined : r3(n));
  return Object.fromEntries(
    Object.entries(out).map(([k, v]) => [k, round(v as number)]),
  ) as ScenarioOutput;
}

// ── Overlap ─────────────────────────────────────────────────────────────────

export type Selected = { id: ScenarioId; hoursPerMonth: number; cashPerMonth?: number };

/**
 * Totals across selected scenarios without counting the same staff time
 * twice. Within one overlap group only the largest is counted, unless the
 * visitor has confirmed that group's tasks are separate.
 */
export function combine(
  selected: Selected[],
  separateGroups: OverlapGroup[] = [],
): { hoursPerMonth: number; cashPerMonth: number; counted: ScenarioId[]; excluded: { id: ScenarioId; reason: string }[] } {
  const byGroup = new Map<OverlapGroup, Selected[]>();
  for (const s of selected) {
    const g = scenarioById(s.id)!.overlapGroup;
    byGroup.set(g, [...(byGroup.get(g) ?? []), s]);
  }
  const counted: ScenarioId[] = [];
  const excluded: { id: ScenarioId; reason: string }[] = [];
  let hours = 0;
  let cash = 0;
  for (const [group, items] of byGroup) {
    if (items.length === 1 || separateGroups.includes(group)) {
      for (const it of items) {
        counted.push(it.id);
        hours += it.hoursPerMonth;
        cash += it.cashPerMonth ?? 0;
      }
      continue;
    }
    const best = [...items].sort((a, b) => b.hoursPerMonth - a.hoursPerMonth)[0];
    counted.push(best.id);
    hours += best.hoursPerMonth;
    cash += best.cashPerMonth ?? 0;
    for (const it of items)
      if (it !== best)
        excluded.push({
          id: it.id,
          reason: `Same ${group} time as ${best.id}; counted once unless you confirm the tasks are separate.`,
        });
  }
  return { hoursPerMonth: r3(hours), cashPerMonth: r2(cash), counted, excluded };
}
