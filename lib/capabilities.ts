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
      "CCTV Face Recognition — Know Who's There, Not Just That Someone Is | PGAK",
    description:
      "CCTV face recognition that separates the people you know from the people you don't — enrol staff and family once, and let alerts fire only for unknown faces.",
    summary:
      "Enrol the people who belong. Alerts fire only for the faces the system doesn't know.",
    h1: "CCTV face recognition — the difference between 'someone is there' and 'who is there'",
    intro:
      "CCTV face recognition is what turns a motion alert into a decision. Instead of telling you a person is at the gate, PGAK tells you whether it's your shift supervisor, a delivery driver you've seen forty times, or someone the system has never seen before — and only the last one is worth waking you up for.",
    steps: [
      {
        h3: "Enrolment",
        text: "Each person who belongs — staff, family, regular contractors — is enrolled from a handful of frames. It takes seconds per person and can be done from existing footage.",
      },
      {
        h3: "Template, not photograph",
        text: "The face is converted into a mathematical vector and the image is discarded. There is no searchable photo library of your employees sitting on a disk.",
      },
      {
        h3: "Matching at the edge",
        text: "Every face the cameras see is vectorised and compared against the enrolled set, on hardware at your site. Nothing is sent to an external service to do this.",
      },
      {
        h3: "Act on the result",
        text: "Known face during expected hours: silence. Unknown face at a sensitive door: alert with a snapshot. Known face somewhere they shouldn't be: alert too.",
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
      "A face that is more than about 60° from the camera, heavily covered, or lit only from behind will be detected as a person but may not be identified.",
      "Recognition quality depends on camera placement — a camera at gate height facing arrivals will always outperform one mounted high in a corner.",
      "It identifies enrolled people. It cannot tell you the name of someone who has never been enrolled, and no honest system claims otherwise.",
    ],
    faqs: [
      {
        q: "Can face recognition work on my existing CCTV cameras?",
        a: "Yes, in most cases. What matters is placement and resolution at the point of recognition rather than the camera being marketed as 'AI'. A standard 2MP camera at gate height facing arrivals works well; a 4K camera mounted high on a corner often doesn't.",
      },
      {
        q: "Are photos of my staff stored somewhere?",
        a: "No. Faces are stored as mathematical templates that cannot be reversed into a usable photograph, and processing happens on a device at your premises rather than in a cloud.",
      },
      {
        q: "How accurate is it?",
        a: "On a well-placed camera with a frontal view, matching an enrolled person is highly reliable. Accuracy drops with extreme angles, heavy backlighting or covered faces — which is why we treat camera placement as part of the deployment rather than an afterthought.",
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
      "CCTV False Alarm Reduction — Cut the Noise That Made You Mute the App | PGAK",
    description:
      "PGAK filters animals, weather, shadows and headlights before anything reaches your phone, cutting false CCTV alerts by 90%+ so the alerts you do get are worth reading.",
    summary:
      "Animals, rain, shadows and headlights filtered out before anything reaches your phone.",
    h1: "False-alarm filtering — the feature that makes every other feature usable",
    intro:
      "CCTV false alarm reduction sounds like a minor optimisation until you realise it is the reason most security systems end up switched off. A system that sends forty alerts a night trains you to ignore it within a fortnight, and an ignored system protects nothing. PGAK classifies what it sees before it decides to interrupt you.",
    steps: [
      {
        h3: "Classify before alerting",
        text: "Every moving object is identified as a person, vehicle, animal or environmental noise. Only classes you've asked about can raise an alert.",
      },
      {
        h3: "Apply zone and schedule",
        text: "A person in the yard at 2am matters. The same person in the same yard at 2pm during dispatch does not. Time and place are part of the decision, not an afterthought.",
      },
      {
        h3: "Suppress known people",
        text: "Enrolled faces pass silently. This alone removes most of the daytime noise at any site with staff.",
      },
      {
        h3: "Tune over the first fortnight",
        text: "Every site has its own quirks — a streetlight, a neighbour's dog, a flapping tarpaulin. We tune thresholds against your real footage rather than shipping a generic default.",
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
        a: "Sites typically see a 90%+ reduction after the first fortnight of tuning. The bigger change is qualitative: alerts go from something you swipe away to something you look at.",
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
      "Real-Time CCTV Intrusion Alerts — On Your Phone in Under 3 Seconds | PGAK",
    description:
      "Zone and line-crossing intrusion alerts delivered in under three seconds with a snapshot, a camera name and a timestamp — plus optional siren, strobe and escalation.",
    summary:
      "Zone and line-crossing alerts with a snapshot, in under three seconds.",
    h1: "Real-time intrusion alerts — because evidence at 9am is not security",
    intro:
      "Real-time CCTV intrusion alerts are the whole point of putting intelligence on a camera. PGAK delivers a push notification with a snapshot, the camera name and a timestamp in under three seconds of a person crossing a boundary you defined — early enough that a phone call, a siren or a guard walking over can still change the outcome.",
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
        h3: "Deliver in seconds",
        text: "Push notification and WhatsApp with the triggering snapshot attached, so the recipient can judge without opening the app.",
      },
      {
        h3: "Escalate if nobody responds",
        text: "Unacknowledged alerts can escalate to a second contact, trigger an on-site siren or strobe, or switch on a floodlight.",
      },
    ],
    useCases: [
      "After-hours entry into a closed shop, office or school",
      "Loading bay activity outside dispatch windows",
      "Perimeter and roof-access breaches",
      "Restricted rooms — pharmacies, server rooms, high-value stock aisles",
    ],
    limits: [
      "Alert delivery depends on the recipient's mobile network; the detection is local and instant, the notification is only as fast as the phone receiving it.",
      "An alert is not a response. It buys you the minutes to act — the value comes from having decided in advance who acts.",
    ],
    faqs: [
      {
        q: "How fast is 'real time'?",
        a: "Detection to notification is typically under three seconds. The variable part is your phone's network, not the detection.",
      },
      {
        q: "Can it trigger a siren instead of just my phone?",
        a: "Yes. Alerts can drive an on-site siren, strobe, floodlight or public-address announcement alongside the notification. On perimeters, deterrence during the approach is usually worth more than a notification.",
      },
      {
        q: "What if I'm asleep and miss the alert?",
        a: "Escalation rules handle that: an unacknowledged alert can move to a second contact after a set interval, and can trigger site-local responses that don't depend on anyone being awake.",
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
      "Face Recognition Attendance System — No Queue, No Card, No Contact | PGAK",
    description:
      "Replace the biometric punch machine with the cameras at your gate: automatic face-recognition attendance for factories, offices and schools, exportable for payroll.",
    summary:
      "Automatic attendance from the gate camera. No queue, no card, no fingerprint.",
    h1: "Face recognition attendance — 200 people logged without a queue",
    intro:
      "A face recognition attendance system removes the single most disliked ritual of a shift change: the queue at the punch machine. PGAK logs arrival and departure from the camera already watching your gate, so two hundred people walk in at their own pace and payroll gets a clean export at the end of the month.",
    steps: [
      {
        h3: "Enrol once",
        text: "Each employee is enrolled from a few frames. No fingerprints, no cards, nothing to lose or forget.",
      },
      {
        h3: "Log on the walk-through",
        text: "The gate camera identifies people as they pass. There is no device to touch and nothing to queue for.",
      },
      {
        h3: "Separate the unknowns",
        text: "Contractors and visitors are logged as unknown faces with a snapshot, so headcount on site is always accurate.",
      },
      {
        h3: "Export for payroll",
        text: "In/out times per person per day, exportable, with the triggering snapshot attached to each event for dispute resolution.",
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
        q: "Can this replace our biometric fingerprint machine?",
        a: "For most sites, yes. Face recognition at the gate produces the same record with no contact, no queue and no failure on damaged or dirty fingers. Sites usually run both for two weeks before retiring the machine.",
      },
      {
        q: "Does it stop buddy punching?",
        a: "Yes — that's an inherent property of the method. A face cannot be handed to a colleague at the gate the way a card or a PIN can.",
      },
      {
        q: "Can we export attendance to our payroll software?",
        a: "Yes. Attendance is exportable as structured data with in/out timestamps per person per day, which is the format payroll systems expect.",
      },
      {
        q: "What if someone isn't recognised one morning?",
        a: "They appear as an unknown-face event with a snapshot, so the record still exists and an administrator can attribute it. Repeated misses on one person usually mean their enrolment needs refreshing, which takes seconds.",
      },
    ],
    solutions: ["factory-security", "ai-cctv-for-offices", "school-security"],
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
      "Loitering Detection CCTV — Spot the Behaviour Before the Theft | PGAK",
    description:
      "Dwell-time and loitering detection that flags a person lingering where they shouldn't — the most reliable pre-theft signal in warehouses, shops and perimeters.",
    summary:
      "Flags a person lingering where they shouldn't — the strongest pre-theft signal there is.",
    h1: "Loitering detection — theft has a shape, and it starts with standing still",
    intro:
      "Loitering detection on CCTV catches the part of an incident that happens before the incident. A person who stands at a high-value shelf, a fence line or a loading bay for far longer than the task requires is the single most reliable pre-theft signal in any site — and it is exactly the pattern a busy human never notices and software watches continuously.",
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
        text: "Enrolled staff working in the zone don't trigger it. A queue at a till doesn't either — thresholds are per-zone for exactly this reason.",
      },
      {
        h3: "Alert discreetly",
        text: "Often the right response is a quiet nudge to a manager's phone rather than a siren. A staff member walking over is the most effective deterrent that exists.",
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
        a: "Only if the threshold is set badly. Dwell times are per-zone — thirty seconds at a jewellery counter, three minutes at a fence — and staff are exempt. In practice the tuning takes a week and then the alerts become genuinely rare.",
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
      "ANPR & Vehicle Recognition — Every Gate Movement Logged Automatically | PGAK",
    description:
      "Number plate recognition and vehicle detection that turn a paper gate register into a searchable log — for societies, warehouses, factories and office parks.",
    summary:
      "Number plates and vehicle types logged at the gate, replacing the paper register.",
    h1: "Vehicle and number plate recognition — the gate register that writes itself",
    intro:
      "ANPR number plate recognition on CCTV replaces the most useless artefact in Indian site security: the gate notebook. Every vehicle entering or leaving is logged automatically with its plate, its type, a timestamp and a snapshot — so 'which truck left at 11:40 last Tuesday' becomes a search instead of an argument.",
    steps: [
      {
        h3: "Point a camera at plate height",
        text: "ANPR is the one capability where camera placement is non-negotiable — the plate needs to be readable in the frame.",
      },
      {
        h3: "Register the vehicles that belong",
        text: "Resident, staff and fleet vehicles are registered once and recognised silently thereafter.",
      },
      {
        h3: "Log everything else",
        text: "Unregistered vehicles are logged with plate, type, direction and snapshot — a searchable record replacing the register.",
      },
      {
        h3: "Alert on the exceptions",
        text: "An unregistered vehicle at the dispatch bay after hours, or a blacklisted plate at a society gate, raises an alert.",
      },
    ],
    useCases: [
      "Housing society gates — resident vehicles in without stopping, visitors logged with a photo",
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
        a: "Standard-format plates read reliably. Damaged, hand-painted, stylised or partially obscured plates — which are not rare — will sometimes fail. Vehicle type, direction, timestamp and snapshot are still logged in those cases, so the event is never lost entirely.",
      },
      {
        q: "Can it open the boom barrier automatically?",
        a: "It can trigger an output on recognition of a registered vehicle. Whether that's wired to your barrier depends on the barrier controller, which we check during the site survey.",
      },
    ],
    solutions: [
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
