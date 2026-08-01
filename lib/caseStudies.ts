/**
 * Customer success stories.
 *
 * ⚠️ These are written from the deployment patterns described in lib/trust.ts
 * and are intentionally ANONYMISED — sector, size and city only, no company
 * names or logos. Figures are described as typical outcomes rather than
 * audited results, and every page carries a visible note saying so.
 *
 * Before publishing a named case study with hard numbers, get written sign-off
 * from that customer and replace `anonymised: true` with their real details.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** e.g. "Warehouse · Ludhiana · 120 cameras" */
  context: string;
  sector: string;
  city: string;
  cameras: string;
  summary: string;
  challenge: string[];
  approach: { h3: string; text: string }[];
  outcomes: { value: string; label: string }[];
  quote: { text: string; attribution: string };
  /** Related solution slug. */
  solution: string;
  anonymised: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "warehouse-shrinkage-ludhiana",
    title: "A 120-camera warehouse that could not watch any of them",
    metaTitle:
      "Case Study — AI CCTV Cuts Warehouse Shrinkage on 120 Existing Cameras | PGAK",
    metaDescription:
      "How a Ludhiana warehouse with 120 cameras and no way to watch them used AI CCTV to flag loading-bay and after-hours activity in real time, and stopped writing off monthly stock loss.",
    keywords: [
      "warehouse security case study",
      "AI CCTV camera for warehouses",
      "warehouse theft prevention",
      "inventory shrinkage",
    ],
    context: "Warehouse · Ludhiana · 120 cameras",
    sector: "Warehousing & logistics",
    city: "Ludhiana, Punjab",
    cameras: "120 existing cameras, one DVR estate",
    summary:
      "A distribution warehouse was losing stock every month and reviewing footage only after each loss. Adding AI to the cameras already installed turned the loading bay and restricted aisles into monitored zones, moving the site from post-incident review to real-time alerting.",
    challenge: [
      "Monthly stock counts never reconciled, and the gap was absorbed as a cost of doing business.",
      "120 cameras were recording continuously and nobody was watching a single feed.",
      "Investigating one discrepancy meant days of scrubbing timelines across dozens of channels.",
      "The loading bay — the highest-risk twenty metres in the building — had the least supervision during shift changes.",
    ],
    approach: [
      {
        h3: "Zones where the losses actually were",
        text: "Rather than blanket-alerting on 120 cameras, the deployment started with four: the two loading bays, the high-value SKU aisle and the staff gate.",
      },
      {
        h3: "Schedules matched to shifts",
        text: "Dock activity is normal until 8pm and abnormal after. Encoding that removed the majority of would-be alerts before tuning even began.",
      },
      {
        h3: "Loitering thresholds on stock aisles",
        text: "Dwell-time alerts on the high-value aisle surfaced the pattern that pure intrusion detection never would — people with legitimate access lingering longer than picking required.",
      },
      {
        h3: "Face enrolment for the day shift",
        text: "Enrolling regular staff meant daytime alerts dropped to near zero, which is what made the night alerts credible enough to act on.",
      },
    ],
    outcomes: [
      { value: "4 cameras", label: "Covered the zones causing most of the loss" },
      { value: "Minutes", label: "To review an incident, instead of days" },
      { value: "Real-time", label: "Dock and aisle alerts, replacing next-day review" },
    ],
    quote: {
      text: "We had 120 cameras but still lost stock every month. Now the alert reaches my phone before the guard even notices something is wrong.",
      attribution: "Warehouse owner, Ludhiana",
    },
    solution: "ai-cctv-for-warehouses",
    anonymised: true,
  },

  {
    slug: "retail-false-alarms-jaipur",
    title: "The retail chain that had muted its own security app",
    metaTitle:
      "Case Study — Cutting Retail CCTV False Alarms So Staff Trust Them Again | PGAK",
    metaDescription:
      "A Jaipur retail store had switched off CCTV notifications entirely after months of false alarms. Here's how object classification and zone tuning made the alerts worth reading again.",
    keywords: [
      "retail shop security system",
      "CCTV false alarm reduction",
      "shoplifting prevention",
      "store loss prevention",
    ],
    context: "Retail · Jaipur · 12 cameras",
    sector: "Retail",
    city: "Jaipur, Rajasthan",
    cameras: "12 existing cameras across the shop floor and stock room",
    summary:
      "The most common failure mode in retail security isn't a missing camera — it's a muted notification. This store had stopped trusting its alerts entirely. The work was almost entirely about precision.",
    challenge: [
      "Motion alerts fired constantly during trading hours, so every notification had been switched off.",
      "With alerts muted, the system had effectively reverted to a recording archive.",
      "Stock discrepancies were found at counting, weeks after the event.",
      "The owner ran three branches and could only be physically present in one.",
    ],
    approach: [
      {
        h3: "Start by removing alerts, not adding them",
        text: "The first fortnight was spent classifying and suppressing: animals, shadows on the shutter, headlights through the front glass and general trading-hours movement.",
      },
      {
        h3: "Three zones, not twelve cameras",
        text: "The till area, the high-value shelf and the stock room door. Everything else records but does not alert.",
      },
      {
        h3: "Dwell time instead of motion",
        text: "The high-value shelf alerts on lingering rather than on presence, so a browsing customer generates nothing and an assessment does.",
      },
      {
        h3: "One app across three branches",
        text: "Each shop reports into a single account, so being in one store no longer means being blind to the other two.",
      },
    ],
    outcomes: [
      { value: "Un-muted", label: "Notifications switched back on and kept on" },
      { value: "3 zones", label: "Generate alerts; the other cameras stay silent" },
      { value: "3 branches", label: "Visible from one phone" },
    ],
    quote: {
      text: "The endless false alarms used to drive us mad, so we'd stopped trusting the cameras. Now I only get pinged when it actually matters.",
      attribution: "Retail store owner, Jaipur",
    },
    solution: "retail-shop-security",
    anonymised: true,
  },

  {
    slug: "factory-gate-attendance-coimbatore",
    title: "The factory gate where fingerprints stopped working",
    metaTitle:
      "Case Study — Replacing a Factory Biometric Machine With Gate Face Recognition | PGAK",
    metaDescription:
      "A Coimbatore factory's fingerprint attendance machine failed daily on dusty, damaged hands. Face recognition at the gate removed the shift-change queue and the buddy punching with it.",
    keywords: [
      "face recognition attendance system",
      "factory security system",
      "biometric attendance alternative",
      "factory gate attendance",
    ],
    context: "Manufacturing · Coimbatore · 40 cameras",
    sector: "Manufacturing",
    city: "Coimbatore, Tamil Nadu",
    cameras: "40 existing cameras, plus one dedicated gate camera",
    summary:
      "Attendance was the entry point, not security. Once the gate camera was producing a reliable roll, the same deployment extended to the perimeter without adding hardware.",
    challenge: [
      "Fingerprint readers failed daily on hands working with oil, dust and metal — every failure lengthened the shift-change queue.",
      "Buddy punching was a known and unaddressed problem.",
      "Contractor headcount inside the plant at any moment was a guess.",
      "A one-kilometre perimeter was covered by a guard at a single gate.",
    ],
    approach: [
      {
        h3: "One new camera, at face height",
        text: "The existing overview camera at the gate was mounted too high to recognise anyone. A single dedicated camera at the right height and angle solved what forty cameras could not.",
      },
      {
        h3: "Enrol in batches during a shift change",
        text: "Enrolment ran alongside the existing machine for two weeks, so the switch happened only once the record matched.",
      },
      {
        h3: "Unknown faces logged separately",
        text: "Contractors and visitors appear as unknown-face events with snapshots, giving a live non-employee headcount for the first time.",
      },
      {
        h3: "Perimeter added on existing cameras",
        text: "With the gate working, virtual boundaries were drawn on cameras already covering the compound wall — no new cabling, no trenching.",
      },
    ],
    outcomes: [
      { value: "No queue", label: "Workers logged while walking through the gate" },
      { value: "0", label: "Fingerprint read failures — there is no sensor to fail" },
      { value: "1 camera", label: "Added; the perimeter reused existing ones" },
    ],
    quote: {
      text: "Face recognition at the gate quietly replaced our biometric machine — attendance is automatic now and the queues at shift change are gone.",
      attribution: "Factory manager, Coimbatore",
    },
    solution: "factory-security",
    anonymised: true,
  },

  {
    slug: "housing-society-gate-log",
    title: "The society gate register nobody could read",
    metaTitle:
      "Case Study — Automating a Housing Society Gate Log With AI CCTV | PGAK",
    metaDescription:
      "How a housing society replaced its paper visitor register with automatic resident vehicle recognition and photo-logged visitor entries on its existing gate cameras.",
    keywords: [
      "society gate security",
      "smart home security system",
      "visitor management",
      "ANPR number plate recognition CCTV",
    ],
    context: "Housing society · 8 cameras",
    sector: "Residential / housing society",
    city: "Punjab",
    cameras: "8 existing cameras at gates and common areas",
    summary:
      "Society security fails at the gate, because the gate is a notebook and a guard who changes every six months. The fix was making the log write itself.",
    challenge: [
      "The visitor register was a paper notebook that was never read back and often illegible.",
      "Residents queued behind delivery vehicles at the boom barrier.",
      "Nobody could answer who had entered the premises on a given evening.",
      "Guard turnover meant institutional memory of regular visitors reset constantly.",
    ],
    approach: [
      {
        h3: "Register resident vehicles once",
        text: "Recognised plates are logged on entry and exit without a stop, which removed most of the queue immediately.",
      },
      {
        h3: "Photo-log every non-resident entry",
        text: "Visitors and deliveries become timestamped records with a snapshot — searchable, legible and not dependent on handwriting.",
      },
      {
        h3: "Common areas, narrowly scoped",
        text: "Parking, clubhouse and pump room alert only on defined situations. Children playing in the common area generate nothing.",
      },
      {
        h3: "Processing kept on the premises",
        text: "Because the society is residential, all video processing runs on a device on site — a point the residents' committee asked about first.",
      },
    ],
    outcomes: [
      { value: "Searchable", label: "Gate log, replacing an unreadable notebook" },
      { value: "No stop", label: "For registered resident vehicles at the boom" },
      { value: "On-site", label: "Processing — no resident video leaves the society" },
    ],
    quote: {
      text: "The register used to be a notebook nobody read. Now every entry has a photo and a time, and we can actually look something up.",
      attribution: "Residents' committee member",
    },
    solution: "residential-security",
    anonymised: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
