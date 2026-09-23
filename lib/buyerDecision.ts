/**
 * What a buyer has to settle before they can enquire, answered on the page.
 *
 * WHY THIS EXISTS
 * The commercial pages sell the outcome well but leave the deciding facts —
 * what is and is not supported, what the site must provide, what is excluded,
 * what moves the price, how a pilot is judged — spread across FAQs or absent.
 * Buyers ask those before they call, and search-grounded answers (Google's AI
 * Overview, Copilot, Perplexity) can only cite what is written in plain HTML.
 *
 * TRUTH RULE
 * Every line here must already be supported elsewhere on this site or by the
 * product's own documented behaviour: reuse of compatible cameras, RTSP/ONVIF
 * stream access, an on-site processing unit, per-camera-per-month billing, the
 * free assessment, the fortnight of tuning, itemised quotes, and availability
 * confirmed per project. NOTHING here states a rupee figure, an accuracy
 * percentage, a response-time guarantee or a named customer — those need the
 * owner's evidence first (docs/seo/2026-09-22/CLAIMS_REGISTER.md).
 */

export type BuyerDecision = {
  /** Two or three sentences a search engine could quote as the answer. */
  answer: string;
  supported: string[];
  notSupported: string[];
  requirements: string[];
  /** Included / optional / excluded, in the buyer's words. */
  scope: { included: string[]; excluded: string[] };
  priceFactors: string[];
  quoteIncludes: string[];
  pilot: string[];
  afterEnquiry: string[];
};

const COMMON = {
  requirements: [
    "A DVR/NVR or camera that exposes an RTSP stream, or ONVIF discovery on the local network.",
    "An on-site processing unit, sized to the number of cameras and the analytics enabled.",
    "Power and network for that unit, and a stable local link between it and the recorder.",
    "Camera views that actually show what must be detected — placement and lighting decide more than the software does.",
  ],
  quoteIncludes: [
    "Per-camera monthly subscription, and which cameras it covers.",
    "On-site processing hardware, listed separately from the subscription.",
    "Setup, configuration and the tuning period.",
    "Support arrangement, taxes and payment terms.",
  ],
  pilot: [
    "Start on the handful of cameras that matter most, not the whole estate.",
    "Agree the zones, schedules and who receives alerts before counting anything.",
    "Judge it on your own footage over about two weeks: useful alerts, nuisance alerts, missed events and how quickly an alert arrives.",
    "Detection quality depends on your scene, so measure it on site rather than accepting a published accuracy figure.",
  ],
  afterEnquiry: [
    "We call back on the number you give, 9 am to 7 pm Monday to Saturday.",
    "A free assessment of your camera views and stream access says which cameras can do what.",
    "You get that in writing, with the processing hardware and scope itemised, before any commitment.",
  ],
};

export const BUYER_DECISIONS: Record<string, BuyerDecision> = {
  "video-analytics-software": {
    answer:
      "PGAK's video analytics software runs on the CCTV a site already owns, provided each camera's stream can be reached over RTSP or ONVIF and the view shows what must be detected. Processing runs on a unit installed at the site, so footage stays on the premises and only the alerts you choose leave it. Billing is per camera per month on the cameras you switch on, with the processing hardware quoted separately.",
    supported: [
      "Person and vehicle detection, with animals and common false triggers classified separately.",
      "Boundary and zone alerts on schedules you set, with a clip attached to the alert.",
      "Face-recognition attendance at an entrance, where the camera sees faces at a usable size.",
      "Number-plate logging at a gate, where a camera is positioned for plates.",
      "Camera-offline and health reporting across the estate.",
    ],
    notSupported: [
      "Turning an unusable view into a usable one — a camera that cannot see the plate, the face or the line cannot analyse it.",
      "Guaranteed accuracy or alert timing figures before your own footage is tested.",
      "Identifying people who have not been enrolled, or any claim about intent.",
      "Recovering footage your recorder never kept: retention stays your recorder's job.",
    ],
    requirements: COMMON.requirements,
    scope: {
      included: [
        "Connecting compatible existing cameras, configuring zones and schedules, and a fortnight of tuning on your own footage.",
      ],
      excluded: [
        "New cameras, cabling or recorders; camera repositioning; internet connectivity; and any civil or electrical work.",
      ],
    },
    priceFactors: [
      "How many cameras you make intelligent — not how many you own.",
      "Which analytics are enabled on each camera.",
      "Number of sites and whether they report into one account.",
      "The processing hardware the site needs, which follows camera count and analytics.",
    ],
    quoteIncludes: COMMON.quoteIncludes,
    pilot: COMMON.pilot,
    afterEnquiry: COMMON.afterEnquiry,
  },

  "cctv-installation-company": {
    answer:
      "For a new site, PGAK designs and installs the CCTV system and sets up AI alerts from the start, with cameras, cabling, power, recorder, storage and commissioning quoted as separate lines. Installation availability, delivery arrangements and timelines are confirmed for your project before quotation. Where serviceable cameras already exist, they are reused rather than replaced.",
    supported: [
      "A coverage plan built from what each camera must see — gates, boundaries, loading bays, entrances.",
      "Camera, cabling, power, recorder and storage specified for the site and itemised.",
      "AI alerts configured at handover, not sold as a later upgrade.",
      "Handover of admin passwords and recorder access in writing.",
    ],
    notSupported: [
      "A price before the site, coverage and camera count are known.",
      "A promise about who installs where before your project is confirmed.",
      "Civil works, structural changes or licensing of third-party systems.",
    ],
    requirements: [
      "Site drawings or a walk-through, and the areas that must be covered.",
      "Power points and cable routes, or agreement on where they will be created.",
      "A decision on how many days of footage you need to keep, which sizes storage.",
      "Network for the recorder and the processing unit.",
    ],
    scope: {
      included: [
        "Survey and coverage design, supply and installation of the specified equipment, commissioning, AI setup, handover with credentials, and the tuning period.",
      ],
      excluded: [
        "Civil and electrical work beyond the quoted lines, internet connectivity, and anything not named on the quotation.",
      ],
    },
    priceFactors: [
      "Number of cameras and the view each one must cover.",
      "Cable runs and power points — distance and routing, not just camera count.",
      "Recorder and storage sized to your retention requirement.",
      "Which analytics are enabled, and the processing hardware that follows.",
    ],
    quoteIncludes: [
      "Cameras, cabling, power, recorder and storage as separate lines.",
      "Installation, commissioning, AI setup and handover.",
      "Per-camera monthly subscription for the analytics, listed separately from the hardware.",
      "Support arrangement, taxes and payment terms.",
    ],
    pilot: [
      "Ask for the coverage plan before equipment is ordered: which camera covers which risk.",
      "Agree acceptance at handover — every camera reporting, alerts arriving, credentials handed over in writing.",
      "Judge the alerts over the first fortnight on your own site and have them tuned before sign-off.",
    ],
    afterEnquiry: [
      "We call back to understand the site, the areas to cover and your timeline.",
      "Scope and availability are confirmed for your project, then quoted with each line itemised.",
      "Nothing is assumed about cameras you do not have yet.",
    ],
  },

  "factory-security": {
    answer:
      "A factory usually needs three things from the same cameras: intrusion alerts on the boundary after hours, vehicle logging at the gate, and attendance at shift change. PGAK adds those to compatible existing plant CCTV, with processing on a unit inside the plant so detection continues if the internet drops. What each camera can support is confirmed from its own view before anything is quoted.",
    supported: [
      "Boundary and yard alerts outside working hours, with schedules per zone.",
      "Face-recognition attendance at gates, avoiding the queue a contact device creates at shift change.",
      "Vehicle logging at the gate, including plate capture where a camera is positioned for it.",
      "Alerts routed to the people who can act, with the clip attached.",
    ],
    notSupported: [
      "PPE or safety-compliance claims without a camera view and a pilot that proves them on your floor.",
      "Attendance from a camera that only sees the tops of heads or backlit faces.",
      "A guaranteed detection rate quoted before your footage is tested.",
    ],
    requirements: COMMON.requirements,
    scope: {
      included: [
        "Connecting compatible cameras, zones and schedules per area, attendance enrolment where used, and a fortnight of tuning against real shift patterns.",
      ],
      excluded: [
        "New cameras or cabling, gate hardware and barriers, payroll system changes, and any civil or electrical work.",
      ],
    },
    priceFactors: [
      "How many cameras are made intelligent, and which analytics on each.",
      "Whether attendance is included, and at how many gates.",
      "Number of plants reporting into one account.",
      "Processing hardware sized to the camera count.",
    ],
    quoteIncludes: COMMON.quoteIncludes,
    pilot: COMMON.pilot,
    afterEnquiry: COMMON.afterEnquiry,
  },

  "ai-cctv-for-warehouses": {
    answer:
      "In a warehouse the useful alerts are movement in the stock aisles outside working hours, people loitering at the loading bay, and vehicles at the gate. PGAK adds these to compatible existing warehouse CCTV, processing on site so a large camera count does not depend on your internet line. Which aisles and bays can be covered is confirmed from the actual camera views first.",
    supported: [
      "After-hours movement alerts in aisles and stock areas, on schedules per zone.",
      "Loitering and dwell alerts at the loading bay during working hours.",
      "Vehicle logging at the gate, with plate capture where a camera suits it.",
      "One account across several godowns, with alerts routed per site.",
    ],
    notSupported: [
      "Stock counting, pick verification or inventory reconciliation.",
      "Identifying which specific item was taken.",
      "Reliable detection in aisles that cameras do not actually cover.",
    ],
    requirements: COMMON.requirements,
    scope: {
      included: [
        "Connecting compatible cameras, zones for aisles, bays and gates, alert routing per site, and a fortnight of tuning against real shift traffic.",
      ],
      excluded: [
        "New cameras, cabling or recorders, racking changes, dock hardware, and warehouse-management system integration.",
      ],
    },
    priceFactors: [
      "Cameras made intelligent per site, and which analytics on each.",
      "Number of godowns or sites under one account.",
      "Processing hardware sized to the camera count at each site.",
      "Whether gate plate capture is included.",
    ],
    quoteIncludes: COMMON.quoteIncludes,
    pilot: COMMON.pilot,
    afterEnquiry: COMMON.afterEnquiry,
  },

  "ai-intruder-detection": {
    answer:
      "Intruder detection replaces recorder motion alerts with person and vehicle detection on the cameras you already own, so an alert arrives with a clip while it matters rather than being found the next morning. Animals, moving foliage and headlights are classified separately, which is what makes the alerts survivable. Night performance depends on your camera and lighting, so it is confirmed on your own footage.",
    supported: [
      "Person and vehicle detection on drawn lines and zones, with schedules.",
      "Alerts to phones with a clip, timestamp and the camera name.",
      "Local siren or light triggering where suitable hardware exists on site.",
      "Continued detection during an internet outage, because processing is on site.",
    ],
    notSupported: [
      "Detection in a scene the camera cannot see — unlit areas beyond its IR range, or a view obscured by weather.",
      "A guaranteed nuisance-alert rate before tuning on your footage.",
      "Guard response or monitoring-centre staffing.",
    ],
    requirements: COMMON.requirements,
    scope: {
      included: [
        "Zones and schedules per camera, alert recipients, and a fortnight of tuning to bring nuisance alerts down.",
      ],
      excluded: [
        "New cameras, lighting, sirens and their electrical work, and any guarding service.",
      ],
    },
    priceFactors: [
      "How many cameras carry detection.",
      "Whether boundary, zone and vehicle analytics are combined.",
      "Number of sites on one account.",
      "Processing hardware sized to the camera count.",
    ],
    quoteIncludes: COMMON.quoteIncludes,
    pilot: COMMON.pilot,
    afterEnquiry: COMMON.afterEnquiry,
  },

  "anpr-number-plate-recognition": {
    answer:
      "ANPR turns the gate register into a searchable log: plate, vehicle type, direction, timestamp and a snapshot for every vehicle. It is the one capability where the camera is not negotiable — plate height, distance, approach angle, vehicle speed and night lighting decide whether plates read reliably, so a camera is specified per lane after looking at the gate. Where a plate cannot be read dependably, we say so rather than quoting for it.",
    supported: [
      "Plate and vehicle-type logging per lane, searchable by plate or time.",
      "Direction of travel (in or out) and a snapshot attached to each record.",
      "Known-vehicle lists, so an expected vehicle is distinguished from an unknown one.",
      "A trigger to barrier hardware that can accept one, where such hardware exists.",
    ],
    notSupported: [
      "Reading plates from a general-purpose camera covering a wide gate.",
      "Reliable reads on damaged, non-standard, obscured or heavily stylised plates.",
      "Supplying or wiring the barrier itself — that is separate scope.",
      "A published accuracy figure: it is measured at your gate, in your lighting.",
    ],
    requirements: [
      "A camera positioned for plates on each lane — height, angle and distance matter more than megapixels.",
      "Enough light at the capture point at night, or an IR-suited camera.",
      "A controlled approach speed at the capture point.",
      "Stream access over RTSP or ONVIF, and an on-site processing unit.",
    ],
    scope: {
      included: [
        "Per-lane configuration, known-vehicle lists, the searchable log, and tuning against your own traffic.",
      ],
      excluded: [
        "Barrier supply and its electricals, road works or civil changes at the gate, and any camera repositioning hardware.",
      ],
    },
    priceFactors: [
      "Number of lanes, not number of cameras on the site.",
      "Whether each lane needs a dedicated plate camera.",
      "Whether barrier integration is in scope.",
      "Processing hardware at the gate.",
    ],
    quoteIncludes: COMMON.quoteIncludes,
    pilot: [
      "Test at the actual gate, in daylight and at night, on your real traffic mix.",
      "Count reads, misreads and misses per lane over an agreed period.",
      "Agree what an acceptable read rate is for your gate before rollout — it varies by site.",
    ],
    afterEnquiry: COMMON.afterEnquiry,
  },
};


/**
 * The three pages below were excluded from Google's index as "Duplicate
 * without user-selected canonical" (Search Console, pgak.co.in, 23 Sep 2026),
 * even though each serves a self-referencing canonical and runs ~2,000 words.
 * The cause is not thinness or canonicals: they share a template and a topic
 * with a page Google did index — /factory-security and /ai-cctv-for-warehouses
 * for industrial CCTV, /video-analytics-software for AI surveillance,
 * /remote-cctv-monitoring for multi-site. Each entry therefore leads with what
 * this page answers that its neighbour does not.
 */
BUYER_DECISIONS["industrial-cctv"] = {
  answer:
    "Industrial CCTV is the estate-level question: forty, a hundred and twenty, or several hundred cameras across sheds, yards and gates that nobody can watch. PGAK adds detection to the compatible cameras already there and processes on site, so alerts do not depend on the plant's internet line. Where /factory-security covers one plant's gate, boundary and shop floor, this page is about running that across a large or multi-shed estate.",
  supported: [
    "Zones and schedules per area across a large camera count, not just a few cameras.",
    "Alerts routed by area to the person responsible for it.",
    "Camera-offline reporting across the estate, so a dead camera is noticed the same day.",
    "Several plants or yards reporting into one account.",
  ],
  notSupported: [
    "Process or production monitoring, machine vision and quality inspection.",
    "Turning a camera count into coverage: unviewed areas stay unviewed.",
    "A single accuracy figure across mixed cameras, lighting and weather.",
  ],
  requirements: COMMON.requirements,
  scope: {
    included: [
      "Connecting compatible cameras across the estate, zones and schedules per area, alert routing, and a fortnight of tuning against real traffic.",
    ],
    excluded: [
      "New cameras, cabling, poles or lighting; network works between buildings; and any civil or electrical work.",
    ],
  },
  priceFactors: [
    "How many cameras carry analytics, across how many buildings.",
    "Processing hardware per site, which follows camera count.",
    "Whether gate plate capture and attendance are included.",
    "Number of sites reporting into one account.",
  ],
  quoteIncludes: COMMON.quoteIncludes,
  pilot: COMMON.pilot,
  afterEnquiry: COMMON.afterEnquiry,
};

BUYER_DECISIONS["multi-site-cctv-monitoring"] = {
  answer:
    "Multi-site monitoring is about one account across locations rather than one app per recorder: every branch, plant or godown in a single view, with alerts routed to whoever runs each site and access limited to what each manager should see. Recorders and camera brands can differ between sites, because each site is connected through its own on-site processing unit. /remote-cctv-monitoring answers how one site reaches you; this page answers how fourteen do.",
  supported: [
    "One view across sites, with alerts routed per site to the people who run it.",
    "Per-site access, so a regional manager sees their own locations.",
    "Mixed recorders and camera makes across sites, subject to the usual stream checks.",
    "Camera-health reporting per site, so a location that stops reporting is visible centrally.",
  ],
  notSupported: [
    "A guarantee that every existing recorder at every site is compatible — each is checked.",
    "Staffed monitoring: PGAK does not watch your cameras for you.",
    "Central live view of every camera at once on one screen, which no operator can usefully watch.",
  ],
  requirements: [
    "Stream access at each site (RTSP or ONVIF) and a processing unit per site.",
    "A working internet connection per site for alerts and the central view — detection itself continues locally if it drops.",
    "A decision on who should see which sites.",
  ],
  scope: {
    included: [
      "Per-site connection and zones, alert routing rules, user access per site, and tuning at each site.",
    ],
    excluded: [
      "New cameras or recorders at any site, inter-site networking, and staffed monitoring.",
    ],
  },
  priceFactors: [
    "Number of sites, and cameras made intelligent at each.",
    "Processing hardware per site.",
    "Which analytics run where — sites rarely need the same set.",
  ],
  quoteIncludes: COMMON.quoteIncludes,
  pilot: [
    "Start with two or three representative sites, not the whole chain.",
    "Check alert routing: the right person at the right site, with the clip attached.",
    "Confirm what happens at a site when its internet drops, and what catches up afterwards.",
  ],
  afterEnquiry: COMMON.afterEnquiry,
};

BUYER_DECISIONS["ai-surveillance-system"] = {
  answer:
    "An AI surveillance system, bought as a system rather than as clever cameras, means the intelligence sits behind the estate you already own: existing cameras keep seeing, an on-site unit does the detecting, and the alerts, attendance records and camera-health reporting arrive in one place. /video-analytics-software describes the software and its compatibility rules; this page is for deciding between buying AI cameras one at a time and adding one layer across everything you already have.",
  supported: [
    "One layer over mixed camera makes and ages, rather than a few smart cameras among many ordinary ones.",
    "Person, vehicle, boundary, loitering and face-based attendance from the same estate.",
    "Camera health and offline alerts across every connected camera.",
    "Adding cameras to the layer later without replacing anything.",
  ],
  notSupported: [
    "Making an unusable camera view usable, whatever the software.",
    "Replacing a recorder: retention and storage stay with your DVR/NVR.",
    "Published accuracy figures that hold on any site without a pilot.",
  ],
  requirements: COMMON.requirements,
  scope: {
    included: [
      "Connecting compatible cameras, enabling the analytics you choose per camera, alerting, and a fortnight of tuning.",
    ],
    excluded: [
      "Cameras, recorders, cabling and storage; any network or electrical work.",
    ],
  },
  priceFactors: [
    "Cameras enabled, and which analytics on each.",
    "Processing hardware sized to that count.",
    "Number of sites on one account.",
    "Whether attendance enrolment is included.",
  ],
  quoteIncludes: COMMON.quoteIncludes,
  pilot: COMMON.pilot,
  afterEnquiry: COMMON.afterEnquiry,
};

export function buyerDecisionFor(slug: string): BuyerDecision | undefined {
  return BUYER_DECISIONS[slug];
}
