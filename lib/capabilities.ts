/**
 * Feature (capability) pages — one per AI capability, at `/features/{slug}`.
 *
 * These sit one level below the solution pages: a solution page answers
 * "what does PGAK do for a warehouse", a capability page answers "how does
 * face recognition actually work". Together they form the topic cluster that
 * /features and /solutions link into.
 */

export type Capability = {
  slug: string;
  navLabel: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  title: string;
  description: string;
  /** One line used on the /solutions and /features grids. */
  summary: string;
  h1: string;
  intro: string;
  /** "How it works" — ordered steps. */
  steps: { h3: string; text: string }[];
  /** Where this capability matters most. */
  useCases: string[];
  /** Honest limits. Builds trust and answers the questions buyers ask anyway. */
  limits: string[];
  faqs: { q: string; a: string }[];
  /** Solution slugs this capability powers. */
  solutions: string[];
  /** Deep-dive articles and case studies for this capability (hub → spoke links). */
  readMore?: { href: string; label: string }[];
};

export const CAPABILITIES: Capability[] = [
  {
    slug: "face-recognition",
    navLabel: "Face recognition",
    primaryKeyword: "CCTV face recognition",
    relatedKeywords: [
      "facial recognition security camera",
      "known face detection",
      "watchlist alerts",
      "AI CCTV camera",
    ],
    title:
      "CCTV Face Recognition — Know Who's There | PGAK",
    description:
      "Separate the people you know from the people you don't — enrolled-person matching that is evaluated on your own cameras before anything relies on it.",
    summary:
      "Enrol the people who belong; unknown-face alerts can be evaluated at your site.",
    h1: "CCTV face recognition — the difference between 'someone is there' and 'who is there'",
    intro:
      "CCTV face recognition compares a captured face with an authorized enrolled set. A possible match can support review, but it does not establish permission to enter or whether a situation is safe. Someone familiar may still enter a restricted area; someone unmatched may be an enrolled person whose capture was unsuitable. Assess the camera view, matching conditions and alert rules at your site, and confirm the supported workflow in the written scope.",
    steps: [
      {
        h3: "Enrolment",
        text: "Use the selected system's supported enrolment procedure for authorized participants. Confirm sample requirements, identity mapping, permission and retention before capture; do not assume existing footage is an approved enrolment source.",
      },
      {
        h3: "Template, not photograph",
        text: "Recognition systems convert a face into a mathematical vector for matching. Whether enrolment images are kept or discarded, and for how long, is set out in the written scope and your retention policy.",
      },
      {
        h3: "Matching at the edge",
        text: "Faces the cameras see are compared against the enrolled set. Processing runs on a unit at your site, and how matching is configured for your site is confirmed in the written scope.",
      },
      {
        h3: "Act on the result",
        text: "Rules can be configured and tested at your site — for example, silence for a known face during expected hours, an alert with a snapshot for an unknown face at a sensitive door, and an alert for a known face somewhere they shouldn't be.",
      },
    ],
    useCases: [
      "Assessing factory gate attendance where finger-based capture is difficult, with a supported fallback and review of missed records",
      "Silent entry for family in a home system, so notifications stay worth reading",
      "Reviewing unmatched-person events at school gates within an authorized, documented safeguarding workflow",
      "Restricted-room access logs in hospitals and offices",
      "Reviewing relevant observations of authorized enrolled participants in retail areas, within the agreed scope",
    ],
    limits: [
      "A turned or covered face, backlighting and occlusion can affect capture or matching. A person-detection event is not guaranteed when identity matching is unavailable; test the actual conditions and define the review or fallback.",
      "Recognition quality depends on the actual capture view, lighting, movement, enrolment and matching settings. Assess the proposed camera and system together; a mounting height alone does not establish accuracy.",
      "It identifies enrolled people. It cannot tell you the name of someone who has never been enrolled, and no honest system claims otherwise.",
    ],
    faqs: [
      {
        q: "Can face recognition work on my existing CCTV cameras?",
        a: "Sometimes. Assess usable face detail, capture angle, lighting, movement, stream compatibility and the selected software together. Neither the megapixel label nor a fixed mounting height establishes suitability. Test representative passages on the proposed camera view and confirm any additional equipment or supported fallback in the scope.",
      },
      {
        q: "Are photos of my staff stored somewhere?",
        a: "What is stored, where and for how long is agreed in the written scope and your retention policy before anyone is enrolled. Processing runs on a unit at your premises rather than in a cloud.",
      },
      {
        q: "How accurate is it?",
        a: "PGAK has published no accuracy figure for face recognition. Agree an authorized trial that records correct matches, incorrect matches, missed matches and capture failures under representative conditions. Angle, lighting, movement, face coverings, enrolment and configuration can affect results; measure the proposed system rather than assuming one factor determines accuracy. Document human review and the supported fallback for unresolved cases.",
      },
      {
        q: "Does it work with masks or helmets?",
        a: "Results depend on the selected system and actual conditions. Test permitted headwear and required PPE as worn; required protection stays in place. If identity matching is unsuitable, agree a supported alternative and human review rather than treating a missed match as an absence.",
      },
    ],
    solutions: ["factory-security", "ai-cctv-for-offices", "school-security"],
  },

  {
    slug: "false-alarm-filtering",
    navLabel: "False-alarm filtering",
    primaryKeyword: "CCTV false alarm reduction",
    relatedKeywords: [
      "false alert filtering",
      "motion detection alternative",
      "smart security system",
      "alert fatigue",
    ],
    title:
      "CCTV False Alarm Reduction — Cut the Noise | PGAK",
    description:
      "Object classification can filter animals, weather, shadows and headlights before an alert is sent — how much it cuts false alerts is tested on your own footage.",
    summary:
      "Animals, rain, shadows and headlights can be filtered out before an alert is sent — tested on your footage.",
    h1: "False-alarm filtering — the feature that makes every other feature usable",
    intro:
      "CCTV false alarm reduction sounds like a minor optimisation until you realise it is the reason most security systems end up switched off. A system that sends forty alerts a night trains you to ignore it within a fortnight, and an ignored system protects nothing. The approach is to classify what the camera sees before deciding to interrupt you, and how well that works on your cameras is tested at your site.",
    steps: [
      {
        h3: "Classify before alerting",
        text: "Moving objects are classified as a person, vehicle, animal or environmental noise. Only classes you've asked about can raise an alert.",
      },
      {
        h3: "Apply zone and schedule",
        text: "A person in the yard at 2am matters. The same person in the same yard at 2pm during dispatch does not. Time and place are part of the decision, not an afterthought.",
      },
      {
        h3: "Suppress known people",
        text: "Where face recognition is configured and tested, enrolled people can be exempted, which can reduce daytime alerts at sites with staff.",
      },
      {
        h3: "Tune against your footage",
        text: "Every site has its own quirks — a streetlight, a neighbour's dog, a flapping tarpaulin. Thresholds are tuned against your real footage rather than left at a generic default.",
      },
    ],
    useCases: [
      "Perimeter alarms that were disabled because they fired all night",
      "Home camera apps whose notifications were muted months ago",
      "Warehouse yards with stray animals and constant vehicle movement",
      "Any site where a guard has learned to ignore the buzzer",
    ],
    limits: [
      "Filtering trades a small amount of recall for a large amount of precision. Tuned aggressively, it will occasionally suppress a genuine but ambiguous event — we set that balance with you rather than for you.",
      "Cameras pointed at a public road will always see more legitimate movement; the fix is framing, not filtering.",
      "Insects on the lens at night are the hardest single case, and are handled better by an IR housing than by software.",
    ],
    faqs: [
      {
        q: "How much can false alerts actually be reduced?",
        a: "PGAK has published no measured reduction figure. It depends on the site — framing, lighting, animals, traffic — and is measured on your own footage by comparing alerts before and after tuning. The aim is qualitative as much as numerical: alerts you look at rather than swipe away.",
      },
      {
        q: "Why does my current system alert for shadows and rain?",
        a: "Because conventional motion detection compares pixel changes between frames and has no concept of what an object is. Rain, shadows, headlights and swaying branches all change pixels. Object classification is a fundamentally different approach.",
      },
      {
        q: "Could filtering cause me to miss a real intrusion?",
        a: "It's a real trade-off and we won't pretend otherwise. Filtering set too aggressively can suppress an ambiguous event. We start conservative, review the first weeks of events with you, and tighten only where the footage justifies it.",
      },
    ],
    solutions: [
      "ai-intruder-detection",
      "smart-perimeter-protection",
      "residential-security",
    ],
  },

  {
    slug: "intrusion-alerts",
    navLabel: "Real-time intrusion alerts",
    primaryKeyword: "real-time CCTV intrusion alerts",
    relatedKeywords: [
      "instant security alerts",
      "trespass notification",
      "AI intruder detection",
      "zone breach alert",
    ],
    title:
      "Real-Time CCTV Intrusion Alerts to Your Phone | PGAK",
    description:
      "Zone and line-crossing alerts with a snapshot, camera name and timestamp — evaluated on your own cameras, with alert timing, sirens and escalation confirmed in the written scope.",
    summary:
      "Zone and line-crossing alerts with a snapshot — evaluated and timed at your site.",
    h1: "Real-time intrusion alerts — because evidence at 9am is not security",
    intro:
      "Real-time CCTV intrusion alerts are the whole point of putting intelligence on a camera. The aim is a notification with a snapshot, the camera name and a timestamp soon after a person crosses a boundary you defined — early enough that a phone call, a siren or a guard walking over can still change the outcome. PGAK has no published intrusion demonstration yet, so how quickly alerts arrive is measured at your site and confirmed in the written scope.",
    steps: [
      {
        h3: "Define the boundary",
        text: "Draw a line or a zone on the camera view — a compound wall, a stock aisle, a till area, a roof access.",
      },
      {
        h3: "Set who and when",
        text: "Which object classes count, which hours are armed, and which enrolled people are exempt.",
      },
      {
        h3: "Deliver the alert",
        text: "The alert carries the triggering snapshot so the recipient can judge without opening the app. Which delivery channels are used at your site is confirmed in the written scope.",
      },
      {
        h3: "Escalate if nobody responds",
        text: "Escalation of an unacknowledged alert — to a second contact, an on-site siren or strobe, or a floodlight — can be configured and tested where the site's hardware allows, and is confirmed in the written scope.",
      },
    ],
    useCases: [
      "After-hours entry into a closed shop, office or school",
      "Loading bay activity outside dispatch windows",
      "Perimeter and roof-access breaches",
      "Restricted rooms — pharmacies, server rooms, high-value stock aisles",
    ],
    limits: [
      "Alert delivery depends on the recipient's mobile network; the detection runs locally, but the notification is only as fast as the network and the phone receiving it.",
      "An alert is not a response. It buys you the minutes to act — the value comes from having decided in advance who acts.",
    ],
    faqs: [
      {
        q: "How fast is 'real time'?",
        a: "PGAK has not published a measured alert time. The time from detection to notification is measured on your own site during testing and written into the scope. Much of the variation comes from the phone's network rather than the on-site detection.",
      },
      {
        q: "Can it trigger a siren instead of just my phone?",
        a: "It can be configured and tested where your siren, strobe, floodlight or public-address system can accept a trigger — that is checked at the survey and confirmed in the written scope. On perimeters, deterrence during the approach is usually worth more than a notification.",
      },
      {
        q: "What if I'm asleep and miss the alert?",
        a: "Escalation — moving an unacknowledged alert to a second contact after a set interval, or triggering a site-local response that doesn't depend on anyone being awake — can be configured and tested at your site and confirmed in the written scope.",
      },
    ],
    solutions: [
      "ai-intruder-detection",
      "retail-shop-security",
      "smart-perimeter-protection",
    ],
  },

  {
    slug: "attendance-automation",
    navLabel: "Attendance automation",
    primaryKeyword: "face recognition attendance system",
    relatedKeywords: [
      "automatic attendance CCTV",
      "biometric attendance alternative",
      "gate attendance logging",
      "contactless attendance",
    ],
    title:
      "Face Recognition Attendance Assessment | PGAK",
    description:
      "Face-recognition attendance from the camera at your gate, for factories, offices and schools — evaluated at your site, with exports and review of missed records confirmed in the written scope.",
    summary:
      "Assess camera-based attendance, employee mapping and review of missed records at your site.",
    h1: "Face recognition attendance — assess capture and review",
    intro:
      "AI Alerto by PGAK assesses whether a suitable gate-camera view can support attendance observations for enrolled employees. Test the intended arrival and departure process, including any pause, interaction or fallback, under representative shift-change conditions. Confirm employee mapping, review of missed or ambiguous records, the required export and any integration or additional hardware in the written scope. A captured event is an input to attendance review, not an automatic payroll decision.",
    steps: [
      {
        h3: "Enrol using the supported process",
        text: "Each employee is enrolled using the selected system's supported procedure. Confirm the employee identity, authorized sample requirements and an approved process for exceptions.",
      },
      {
        h3: "Test the intended entry flow",
        text: "Assess whether the gate camera can identify enrolled people during the intended arrival process. Document any required pause or interaction, test shift-change flow and retain an approved fallback for missed or ambiguous records.",
      },
      {
        h3: "Separate the unknowns",
        text: "Confirm how the selected setup handles people who are not enrolled, including whether an event or snapshot is produced and who may review it. Do not assume an unknown-face log is a complete visitor or contractor headcount.",
      },
      {
        h3: "Export for payroll",
        text: "The export — in/out times per person per day, with the triggering snapshot for each event for dispute resolution — is confirmed in the written scope.",
      },
    ],
    useCases: [
      "Factory gates where fingerprint readers fail on dusty or damaged hands",
      "Offices retiring an access-card system nobody wants to carry",
      "Schools assessing gate attendance against the required records and authorized review process",
      "Sites with heavy contractor traffic and no reliable headcount",
    ],
    limits: [
      "It is an attendance record, not a legal timekeeping certification — verify it meets your own audit requirements before retiring an existing system.",
      "Employees must be informed and enrolled with consent. That is a policy step we will not skip on your behalf.",
      "High-throughput gates need a representative shift-change trial. Check whether the existing view is suitable or an additional camera is needed, and record capture failures, missed matches and correction responsibilities.",
    ],
    faqs: [
      {
        q: "How much does face recognition attendance cost in India?",
        a: "PGAK quotes for the assessed site and agreed scope. Review the busiest arrival pattern, capture view, lighting, selected software and processing requirements together. Confirm whether existing cameras are suitable or whether another view or additional equipment is needed; a fixed mounting height alone does not settle that decision. Bring the gate count, shift pattern and required attendance output for a scoped quotation.",
      },
      {
        q: "Can this replace our biometric fingerprint machine?",
        a: "Possibly. Compare the proposed capture method, record format, shift-change flow and exception process with your current arrangement. Any pause, interaction, required PPE and supported fallback should be included in the trial. Run an agreed parallel comparison and confirm the required records and approvals before retiring the existing machine; do not assume identical records or a queue-free result.",
      },
      {
        q: "Does it stop buddy punching?",
        a: "Do not assume that face matching alone prevents proxy attendance. Check identity enrolment, administrator access, the exact configuration's supported presentation-attack safeguards and review of uncertain records. Request evidence for any anti-spoof claim and test the agreed workflow; liveness is not implied merely by using a camera.",
      },
      {
        q: "Can we export attendance to our payroll software?",
        a: "The export — structured data with in/out timestamps per person per day — and the format your payroll software expects are confirmed in the written scope.",
      },
      {
        q: "What if someone isn't recognised one morning?",
        a: "Keep a missed or ambiguous record visible through the approved exception process; do not automatically mark an absence. Confirm whether the selected setup produces an event or supporting image, and who can review and correct it. Investigate capture conditions, identity mapping, enrolment and configuration before deciding the remedy. Required PPE stays in place, with an agreed supported fallback where needed.",
      },
    ],
    solutions: ["factory-security", "ai-cctv-for-offices", "school-security"],
    readMore: [
      {
        href: "/insights/why-biometric-attendance-machines-fail-at-the-factory-gate",
        label: "Why fingerprint readers fail at the gate",
      },
      {
        href: "/insights/face-recognition-attendance-vs-biometric-machine",
        label: "Face recognition vs biometric machine — the full comparison",
      },
      {
        href: "/insights/case-studies/factory-gate-attendance-coimbatore",
        label: "Scenario: 200-worker factory gate in Coimbatore",
      },
    ],
  },

  {
    slug: "loitering-detection",
    navLabel: "Loitering & dwell time",
    primaryKeyword: "loitering detection CCTV",
    relatedKeywords: [
      "dwell time analytics",
      "suspicious behaviour detection",
      "pre-theft indicators",
      "smart security system",
    ],
    title:
      "Loitering Detection CCTV — Spot It Before the Theft | PGAK",
    description:
      "Dwell-time detection that flags a person lingering where they shouldn't in warehouses, shops and perimeters — thresholds and exemptions evaluated at your site.",
    summary:
      "Flags a person lingering where they shouldn't — evaluated per zone at your site.",
    h1: "Loitering detection — theft has a shape, and it starts with standing still",
    intro:
      "Loitering detection on CCTV catches the part of an incident that happens before the incident. A person who stands at a high-value shelf, a fence line or a loading bay for far longer than the task requires is often worth a closer look — and it is a pattern a busy human easily misses. With PGAK, loitering detection is evaluated per zone on your own cameras; there is no published PGAK demonstration of it yet.",
    steps: [
      {
        h3: "Mark the zone",
        text: "The shelf, the bay, the fence stretch, the parked-vehicle row — anywhere lingering is unusual.",
      },
      {
        h3: "Set a dwell threshold",
        text: "How long is too long here? Thirty seconds at a jewellery counter; three minutes at a fence.",
      },
      {
        h3: "Exempt the expected",
        text: "Where face recognition is configured, enrolled staff working in the zone can be exempted. A queue at a till is handled by per-zone thresholds — and queue and legitimate-worker scenarios are part of the test at your site.",
      },
      {
        h3: "Alert discreetly",
        text: "Often the right response is a quiet nudge to a manager's phone rather than a siren. A staff member walking over is often an effective deterrent.",
      },
    ],
    useCases: [
      "High-value retail shelves and jewellery counters",
      "Warehouse aisles holding fast-moving, high-value SKUs",
      "Perimeter fence lines where someone is assessing a way in",
      "ATM lobbies, parking areas and society common areas",
    ],
    limits: [
      "Legitimate lingering exists — a customer genuinely deciding, a technician working. Thresholds and staff exemptions carry the weight here, and they need tuning per zone.",
      "It flags behaviour, not intent. Every alert deserves a human glance before any action, and the system is designed around that assumption.",
    ],
    faqs: [
      {
        q: "Won't this flag ordinary customers browsing?",
        a: "Only if the threshold is set badly. Dwell times are per-zone — thirty seconds at a jewellery counter, three minutes at a fence — and staff are exempt. How rare the alerts become is measured on your own footage during testing, including queue and legitimate-worker scenarios.",
      },
      {
        q: "Is this the same as motion detection?",
        a: "It's almost the opposite. Motion detection reacts to movement; loitering detection reacts to a person tracked continuously in one zone without leaving. That requires tracking an identified person across frames, which pixel-difference motion detection cannot do.",
      },
      {
        q: "What should we do when a loitering alert fires?",
        a: "Look at the snapshot, and if it warrants it, have someone walk over. Presence is the deterrent. We'd caution against automated sirens on dwell alerts specifically — the false-positive cost is a confronted customer.",
      },
    ],
    solutions: [
      "retail-shop-security",
      "ai-cctv-for-warehouses",
      "smart-perimeter-protection",
    ],
  },

  {
    slug: "vehicle-and-anpr",
    navLabel: "Vehicle & number plate",
    primaryKeyword: "ANPR number plate recognition CCTV",
    relatedKeywords: [
      "vehicle detection camera",
      "gate vehicle logging",
      "licence plate recognition India",
      "society gate automation",
    ],
    title:
      "ANPR & Vehicle Recognition for Gate Records | PGAK",
    description:
      "Assess searchable plate and vehicle records for your gate. Confirm capture fields, review exceptions and test the proposed setup before changing the register.",
    summary:
      "Assess plate and vehicle records at your gate, with a review process for missed or uncertain reads.",
    h1: "Vehicle and number plate recognition for searchable gate records",
    intro:
      "AI Alerto by PGAK can assess ANPR for searchable vehicle records at a suitable gate camera view. Confirm the fields captured, test plate reads against actual traffic and keep a process for missed or uncertain records. PGAK publishes photographs of a fitted camera and a working console; those images show a setup, not a measured read rate.",
    steps: [
      {
        h3: "Establish a readable plate view",
        text: "ANPR is the one capability where camera placement is non-negotiable — the plate needs to be readable in the frame.",
      },
      {
        h3: "Register the vehicles that belong",
        text: "Maintain the authorized vehicle list and its update process. Test how the selected setup matches readable plates and applies the agreed alert rules. A list match alone does not establish current entry permission or a safe barrier movement.",
      },
      {
        h3: "Review unregistered vehicle records",
        text: "Confirm which plate, vehicle, direction, timestamp and image fields the selected setup can capture. Review incomplete or uncertain records against the agreed gate process before deciding whether any register workflow can change.",
      },
      {
        h3: "Alert on the exceptions",
        text: "An unregistered vehicle at the dispatch bay after hours, or a blacklisted plate at a society gate, can be configured to raise an alert.",
      },
    ],
    useCases: [
      "Housing society gates assessing vehicle records, visitor review and access responsibilities",
      "Warehouse dispatch — captured vehicle records reviewed alongside dispatch records",
      "Factory and office-park gates with heavy contractor vehicle traffic",
      "Parking areas where unauthorised vehicles are a recurring dispute",
    ],
    limits: [
      "Plate reading needs a suitable capture view, adequate plate detail and tested exposure at the intended approach speed. Existing cameras may be suitable; some gates need repositioning or dedicated cameras. Confirm coverage and hardware at the assessment.",
      "Damaged, obscured, non-standard or heavily stylised plates may be missed or read incorrectly. Whether a vehicle event, type, direction or snapshot is still recorded depends on the selected setup and capture conditions. Test those cases and keep a review process for missing or uncertain records.",
      "Night reading depends on IR illumination and plate retro-reflectivity.",
    ],
    faqs: [
      {
        q: "Do I need a special ANPR camera?",
        a: "Assess plate detail, capture angle, approach speed, lighting and the selected system together. Existing cameras may be suitable; repositioning or dedicated hardware may be needed. Confirm the recommendation through representative day and night passages at your gate.",
      },
      {
        q: "How well does it read Indian number plates?",
        a: "PGAK has not published a read rate. Compare captured records with an agreed reference count across representative vehicle passages at your gate. Include difficult plate and lighting conditions, and distinguish correct reads, incorrect reads, missed vehicles and unreadable plates. Confirm which supporting fields or images the selected setup records when a plate is not read; do not assume fallback logging works in every case.",
      },
      {
        q: "Can it open the boom barrier automatically?",
        a: "Barrier integration requires a separate site assessment and written scope. Confirm controller compatibility, entry authorization, obstacle protection, emergency behavior and manual override with the responsible qualified installer. A plate match is an input to that process, not proof of permission or a safe movement; do not bypass the barrier's safety controls.",
      },
    ],
    solutions: [
      "anpr-number-plate-recognition",
      "residential-security",
      "ai-cctv-for-warehouses",
      "factory-security",
    ],
  },
];

export function getCapability(slug: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.slug === slug);
}

export const CAPABILITY_SLUGS = CAPABILITIES.map((c) => c.slug);
