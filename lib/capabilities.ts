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
      "CCTV face recognition is what turns a motion alert into a decision. Instead of only telling you a person is at the gate, a recognition system can indicate whether it's your shift supervisor, a delivery driver you've seen forty times, or someone it has never seen before — and only the last one is worth waking you up for. Whether that works at your gate is evaluated on your own cameras and confirmed in the written scope.",
    steps: [
      {
        h3: "Enrolment",
        text: "Each person who belongs — staff, family, regular contractors — is enrolled from a handful of frames. Whether existing footage is good enough for enrolment is checked at your site.",
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
      "Gate attendance at factories, replacing fingerprint machines that fail on dusty hands",
      "Silent entry for family in a home system, so notifications stay worth reading",
      "Unknown-adult alerts near school gates during school hours",
      "Restricted-room access logs in hospitals and offices",
      "Repeat-visitor detection near high-value retail shelves",
    ],
    limits: [
      "A face turned well away from the camera, heavily covered, or lit only from behind will be detected as a person but may not be identified.",
      "Recognition quality depends on camera placement — a camera at gate height facing arrivals will always outperform one mounted high in a corner.",
      "It identifies enrolled people. It cannot tell you the name of someone who has never been enrolled, and no honest system claims otherwise.",
    ],
    faqs: [
      {
        q: "Can face recognition work on my existing CCTV cameras?",
        a: "Sometimes — it is tested on your cameras before anything is promised. What matters is placement and resolution at the point of recognition rather than the camera being marketed as 'AI'. A standard 2MP camera at gate height facing arrivals is usually a better candidate than a 4K camera mounted high on a corner.",
      },
      {
        q: "Are photos of my staff stored somewhere?",
        a: "What is stored, where and for how long is agreed in the written scope and your retention policy before anyone is enrolled. Processing runs on a unit at your premises rather than in a cloud.",
      },
      {
        q: "How accurate is it?",
        a: "PGAK has published no accuracy figure for face recognition. It is measured at your site — false matches and missed matches on a permissioned test set, with documented human review. Accuracy drops with extreme angles, heavy backlighting or covered faces, which is why camera placement is treated as part of the deployment rather than an afterthought.",
      },
      {
        q: "Does it work with masks or helmets?",
        a: "Partially. A mask covering the lower face reduces confidence significantly and a full helmet usually prevents identification. In those environments we lean on person detection, zones and schedules rather than on identity.",
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
      "Zone and line-crossing alerts with a snapshot, camera name and timestamp, evaluated on your own cameras; timing and escalation confirmed in the scope.",
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
      "Face Recognition Attendance — No Card, No Contact | PGAK",
    description:
      "Face-recognition attendance from the camera at your gate, for factories, offices and schools, evaluated at your site with exports confirmed in writing.",
    summary:
      "Attendance from the gate camera — no card or fingerprint, evaluated at your site.",
    h1: "Face recognition attendance — logging the gate without a queue",
    intro:
      "A face recognition attendance system removes the single most disliked ritual of a shift change: the queue at the punch machine. The approach logs arrival and departure from a camera watching your gate, so people walk in at their own pace and payroll can receive an export at the end of the month. With PGAK, whether your gate camera is suitable, how missed or ambiguous records are reviewed, and any processing hardware are confirmed at your site and set out in the written scope and quote.",
    steps: [
      {
        h3: "Enrol once",
        text: "Each employee is enrolled from a few frames. No fingerprints, no cards, nothing to lose or forget.",
      },
      {
        h3: "Log on the walk-through",
        text: "The gate camera is used to identify enrolled people as they pass. There is no device to touch and nothing to queue for.",
      },
      {
        h3: "Separate the unknowns",
        text: "Contractors and visitors can be logged as unknown faces with a snapshot, so they appear in the record for a person to review.",
      },
      {
        h3: "Export for payroll",
        text: "The export — in/out times per person per day, with the triggering snapshot for each event for dispute resolution — is confirmed in the written scope.",
      },
    ],
    useCases: [
      "Factory gates where fingerprint readers fail on dusty or damaged hands",
      "Offices retiring an access-card system nobody wants to carry",
      "Schools needing a live campus roll rather than thirty paper registers",
      "Sites with heavy contractor traffic and no reliable headcount",
    ],
    limits: [
      "It is an attendance record, not a legal timekeeping certification — verify it meets your own audit requirements before retiring an existing system.",
      "Employees must be informed and enrolled with consent. That is a policy step we will not skip on your behalf.",
      "Very high-throughput gates benefit from a dedicated camera at face height; a general overview camera will miss people.",
    ],
    faqs: [
      {
        q: "How much does face recognition attendance cost in India?",
        a: "PGAK quotes per site rather than publishing a price. How many people one gate camera can handle depends on the gate width, the flow at shift change and the camera position, and is checked at your site. Whether your existing gate camera is suitable or a dedicated camera at face height is needed, and any processing hardware, are confirmed in the quote. Call or WhatsApp us with your gate count for a quotation.",
      },
      {
        q: "Can this replace our biometric fingerprint machine?",
        a: "Possibly — that is what the site evaluation is for. Face recognition at the gate can produce the same kind of record with no contact and no queue, and is not affected by damaged or dirty fingers. Running both side by side before retiring the machine is the sensible check, and verify it meets your own audit requirements first.",
      },
      {
        q: "Does it stop buddy punching?",
        a: "It is not a guarantee. A face cannot be handed to a colleague the way a card or a PIN can, so proxy attendance becomes harder to go unnoticed — provided missed and ambiguous records get human review, which is part of what is tested at your site.",
      },
      {
        q: "Can we export attendance to our payroll software?",
        a: "The export — structured data with in/out timestamps per person per day — and the format your payroll software expects are confirmed in the written scope.",
      },
      {
        q: "What if someone isn't recognised one morning?",
        a: "The design is that they appear as an unknown-face event with a snapshot, so an administrator can review and attribute it — that correction workflow is part of what is tested at your site. Repeated misses on one person usually mean their enrolment needs refreshing.",
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
      "ANPR & Vehicle Recognition — Every Gate Logged | PGAK",
    description:
      "Number plate and vehicle detection that turn a paper gate register into a searchable log — for societies, warehouses, factories and office parks.",
    summary:
      "Number plates and vehicle types logged at the gate, replacing the paper register.",
    h1: "Vehicle and number plate recognition — the gate register that writes itself",
    intro:
      "ANPR number plate recognition on CCTV replaces the most useless artefact in Indian site security: the gate notebook. The aim is that every vehicle entering or leaving is logged with its plate, its type, a timestamp and a snapshot — so 'which truck left at 11:40 last Tuesday' becomes a search instead of an argument. PGAK's published ANPR evidence is photographs of a fitted camera and a working console, not a read rate, so reading is tested at your gate.",
    steps: [
      {
        h3: "Point a camera at plate height",
        text: "ANPR is the one capability where camera placement is non-negotiable — the plate needs to be readable in the frame.",
      },
      {
        h3: "Register the vehicles that belong",
        text: "Resident, staff and fleet vehicles are registered once, and can be recognised without an alert once plate reads at your gate have been tested.",
      },
      {
        h3: "Log everything else",
        text: "Unregistered vehicles can be logged with plate, type, direction and snapshot — a searchable record replacing the register.",
      },
      {
        h3: "Alert on the exceptions",
        text: "An unregistered vehicle at the dispatch bay after hours, or a blacklisted plate at a society gate, can be configured to raise an alert.",
      },
    ],
    useCases: [
      "Housing society gates — resident vehicles recognised, visitors logged with a photo",
      "Warehouse dispatch — every truck movement timestamped against the dispatch schedule",
      "Factory and office-park gates with heavy contractor vehicle traffic",
      "Parking areas where unauthorised vehicles are a recurring dispute",
    ],
    limits: [
      "Plate reading needs a dedicated, well-angled camera at an appropriate height and a controlled approach speed. A general overview camera will not do it reliably, and we will tell you so during the audit rather than after the invoice.",
      "Damaged, obscured, non-standard or heavily stylised plates — common enough in India — will fail to read. Vehicle type and snapshot logging still work.",
      "Night reading depends on IR illumination and plate retro-reflectivity.",
    ],
    faqs: [
      {
        q: "Do I need a special ANPR camera?",
        a: "You need a camera positioned for it — plate height, controlled approach, good IR at night. That's often a new dedicated camera at the gate even when the rest of the site reuses existing cameras. It's the one place we regularly recommend hardware.",
      },
      {
        q: "How well does it read Indian number plates?",
        a: "PGAK has not published a read rate. Standard-format plates are the easiest case, and reads are logged against the gate register at your site to measure it. Damaged, hand-painted, stylised or partially obscured plates — which are not rare — will sometimes fail. Vehicle type, direction, timestamp and snapshot can still be logged in those cases.",
      },
      {
        q: "Can it open the boom barrier automatically?",
        a: "Automatic barrier opening is something a site may configure and test, not a default. An output on recognition of a registered vehicle can be wired to a barrier only if the controller supports it, which is checked during the site survey and confirmed in the written scope.",
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
