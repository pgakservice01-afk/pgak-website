/**
 * Solution / industry landing pages.
 *
 * One entry = one indexable page at `/{slug}` with its own primary keyword.
 * The slugs are deliberately keyword-shaped (`/ai-intruder-detection`, not
 * `/solutions/2`) and each page owns exactly one primary keyword so they don't
 * cannibalise each other in search.
 *
 * Content contract:
 *   primaryKeyword  → appears in the H1, the <title>, and the first paragraph
 *   relatedKeywords → 3–5 natural variations woven through the body copy
 *   sections        → H2s; each may carry H3-level points
 *   faqs            → rendered on-page AND emitted as FAQPage schema
 *   related         → internal links to sibling solution pages (topic cluster)
 */

export type SolutionSection = {
  h2: string;
  body: string;
  points?: { h3: string; text: string }[];
};

export type Solution = {
  slug: string;
  /** Short label used in nav, footer and breadcrumbs. */
  navLabel: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /** First paragraph — must contain the primary keyword naturally. */
  intro: string;
  /** The pain this page speaks to, in the reader's own words. */
  painPoints: string[];
  sections: SolutionSection[];
  stats: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
  /** Slugs of sibling solution pages. */
  related: string[];
  /** Blog post slugs from content/insights. */
  insights: string[];
  /** Case-study links proving this solution (hub → spoke). */
  caseStudies?: { href: string; label: string }[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "ai-intruder-detection",
    navLabel: "AI intruder detection",
    primaryKeyword: "AI intruder detection",
    relatedKeywords: [
      "intrusion detection system",
      "AI CCTV camera",
      "real-time trespass alerts",
      "perimeter breach detection",
      "smart security system",
    ],
    title:
      "AI Intruder Detection — Real-Time Trespass Alerts on Your Existing CCTV | PGAK",
    description:
      "PGAK's AI intruder detection watches every camera you already own and alerts you in seconds when a person crosses a line they shouldn't — with false alarms from cats, shadows and headlights filtered out.",
    eyebrow: "Intrusion detection",
    h1: "AI intruder detection that alerts you in seconds, not the next morning",
    intro:
      "AI intruder detection is the difference between a camera that records a break-in and a system that stops one. PGAK layers real-time person detection onto the CCTV cameras you already own, so the moment someone crosses a boundary they shouldn't, the alert is on your phone — with a clip, a timestamp and the exact camera — while the intruder is still standing there.",
    painPoints: [
      "You only find out about a break-in when you review footage the next day.",
      "Motion alerts fire all night for cats, moths, rain and passing headlights — so you muted them.",
      "Nobody is realistically watching a wall of live feeds at 3am.",
      "Your guard covers one gate at a time; the fence has twelve blind spots.",
    ],
    sections: [
      {
        h2: "How AI intruder detection actually works",
        body: "Traditional motion detection compares pixels between frames — which is why a swaying branch sets it off. PGAK runs a person-and-vehicle recognition model on every frame instead, so it responds to what an object *is*, not merely that something changed.",
        points: [
          {
            h3: "Draw the boundary once",
            text: "You mark a virtual line or zone on each camera view — the compound wall, the loading bay, the stock room door. It takes about a minute per camera.",
          },
          {
            h3: "The model classifies every moving object",
            text: "Person, vehicle, animal, or environmental noise. Only the classes you care about, crossing the zones you drew, in the hours you chose, can raise an alert.",
          },
          {
            h3: "The alert reaches a human in seconds",
            text: "Push notification, WhatsApp and an optional siren or strobe — each carrying the snapshot that triggered it, so the person receiving it can judge in one glance.",
          },
        ],
      },
      {
        h2: "Why false alarms are the real problem",
        body: "An intrusion detection system that cries wolf gets switched off within a fortnight, and a switched-off system protects nothing. Filtering is not a nice-to-have feature — it is the feature that makes every other feature usable. PGAK suppresses animal movement, weather, light changes and repeated known faces before anything reaches your phone.",
      },
      {
        h2: "It runs on the cameras you already bought",
        body: "There is no rip-and-replace. If your existing CCTV cameras produce an RTSP stream — and virtually every DVR/NVR installed in the last decade does — PGAK connects to them. The intelligence is software, so upgrading your security no longer means re-cabling a building.",
      },
      {
        h2: "Evidence that holds up afterwards",
        body: "Every detection is stored as a clipped event with the camera, zone and timestamp attached. Instead of scrubbing through eleven hours of night footage, you open a list of the four times a person entered the yard.",
      },
    ],
    stats: [
      { value: "< 3s", label: "From detection to alert on your phone" },
      { value: "90%+", label: "Reduction in false alerts after tuning" },
      { value: "24×7", label: "Every camera watched, every night" },
    ],
    faqs: [
      {
        q: "How is AI intruder detection different from normal CCTV motion alerts?",
        a: "Motion alerts fire whenever pixels change, which includes rain, insects, shadows and headlights. AI intruder detection classifies the moving object first, so it only alerts you for a person or vehicle entering a zone you defined. In practice that is the difference between forty alerts a night and two.",
      },
      {
        q: "Do I need to buy new AI CCTV cameras?",
        a: "No. PGAK works with your existing cameras as long as they expose an RTSP stream through the DVR or NVR, which nearly all modern systems do. The AI runs as software alongside them, so you keep the hardware you already paid for.",
      },
      {
        q: "Does it work at night?",
        a: "Yes. The model is trained on infrared and low-light footage, which is when most intrusions happen. Night performance depends on your cameras having usable IR illumination — something we check during the free camera audit.",
      },
      {
        q: "Will it alert me for stray dogs or cats?",
        a: "Not unless you ask it to. Animals are classified separately from people and are suppressed by default — this is one of the biggest sources of false alarms in Indian installations, particularly at factory and warehouse perimeters.",
      },
      {
        q: "What happens to my footage — is it sent to the cloud?",
        a: "Processing runs on an edge device at your site, so video stays on your premises by default. Only the small alert clips you choose to receive leave the building. See our privacy policy for the full detail.",
      },
    ],
    related: [
      "smart-perimeter-protection",
      "ai-cctv-for-warehouses",
      "factory-security",
    ],
    insights: [
      "1000-alerts-only-one-is-real",
      "stop-threats-before-they-happen",
      "your-dvr-records-the-theft-it-doesnt-stop-it",
    ],
  },

  {
    slug: "ai-cctv-for-warehouses",
    navLabel: "Warehouses",
    primaryKeyword: "AI CCTV camera for warehouses",
    relatedKeywords: [
      "warehouse security",
      "warehouse theft prevention",
      "loading bay monitoring",
      "inventory shrinkage",
      "business CCTV",
    ],
    title:
      "AI CCTV Camera for Warehouses — Stop Stock Loss Before It Leaves the Gate | PGAK",
    description:
      "Warehouse security that actually intervenes: PGAK's AI watches every aisle, dock and gate on your existing cameras, flags loitering and after-hours movement in seconds, and cuts the shrinkage you've been writing off.",
    eyebrow: "Warehouse security",
    h1: "AI CCTV for warehouses — because 120 cameras and nobody watching is not security",
    intro:
      "An AI CCTV camera system for warehouses solves the problem every logistics manager knows: you have plenty of cameras and no way to watch them. PGAK turns your existing warehouse CCTV into an always-alert observer — flagging after-hours movement in the stock aisles, people loitering at the loading bay, and vehicles at the gate outside dispatch hours — so shrinkage stops being a number you discover at stock-take.",
    painPoints: [
      "Stock counts never match the system, and the footage is only reviewed after the loss.",
      "The dispatch bay is the highest-risk twenty metres in the building and the least supervised.",
      "Night-shift movement in restricted aisles goes unnoticed until it's a pattern.",
      "Reviewing a week of 120-camera footage to find one incident takes days.",
    ],
    sections: [
      {
        h2: "Where warehouse losses actually happen",
        body: "Very little warehouse shrinkage is a dramatic midnight break-in. It is the loading bay during a shift change, a pallet that leaves on the wrong vehicle, or repeated small removals by someone with legitimate access. Those are behavioural patterns — exactly what an AI CCTV camera for warehouses can be told to look for, and exactly what a human staring at a video wall will miss.",
        points: [
          {
            h3: "Loading bay and dock monitoring",
            text: "Alerts when a vehicle is at the dock outside scheduled dispatch windows, or when loading continues after the shift has formally ended.",
          },
          {
            h3: "Restricted-aisle intrusion",
            text: "High-value SKU aisles get their own zones. Anyone entering outside picking hours raises an alert with a clip attached.",
          },
          {
            h3: "Loitering and dwell-time detection",
            text: "A person standing in one spot for longer than expected near stock is flagged. It is the single most reliable pre-theft signal in a warehouse.",
          },
          {
            h3: "Gate vehicle logging",
            text: "Every vehicle entry and exit becomes a searchable, timestamped event instead of a line in a paper register.",
          },
        ],
      },
      {
        h2: "Searchable footage changes how you investigate",
        body: "When a discrepancy shows up, you no longer scrub timelines. You filter: this camera, this zone, people only, between these hours. A three-day review becomes a three-minute one. That alone changes whether an investigation happens at all.",
      },
      {
        h2: "Attendance and gate control, without a separate machine",
        body: "The same cameras that watch the perimeter can recognise faces at the staff entrance, so contractor and shift attendance is logged automatically. Warehouses running biometric punch machines usually find the queues at shift change disappear along with the buddy-punching.",
      },
      {
        h2: "Built for the scale warehouses actually run at",
        body: "Sites with 40, 80 or 120+ cameras are the normal case, not the edge case. Processing runs on an edge device at your site, so adding cameras doesn't mean paying for a bigger internet line or shipping every frame to a cloud.",
      },
    ],
    stats: [
      { value: "120+", label: "Cameras supported on a single site" },
      { value: "< 3s", label: "Alert latency on a dock or aisle breach" },
      { value: "Minutes", label: "To review an incident, instead of days" },
    ],
    faqs: [
      {
        q: "How many cameras can PGAK handle in one warehouse?",
        a: "Sites running 120 or more cameras are routine. Processing is distributed across edge devices at your premises, so capacity scales with hardware at the site rather than with your internet bandwidth.",
      },
      {
        q: "Can it tell the difference between staff and an intruder?",
        a: "Yes. Enrolled staff faces are recognised and can be excluded from alerts, so the system only escalates unknown people — or known people in places and at times they shouldn't be.",
      },
      {
        q: "Will it work with our existing DVR and cameras?",
        a: "In almost all cases, yes. If the DVR or NVR gives an RTSP stream, PGAK connects to it. Warehouses are typically the easiest sites to deploy on because the cabling is already comprehensive.",
      },
      {
        q: "How much does AI CCTV for a warehouse cost?",
        a: "Pricing is ₹1,000 per camera per month with no hidden fees, so a 60-camera warehouse is a predictable line item. Most sites find it costs less than a single month of the shrinkage it prevents — see our pricing page for the full breakdown.",
      },
      {
        q: "Does it help with insurance or audit evidence?",
        a: "Every alert is stored as a clipped event with camera, zone and timestamp metadata, which is far more useful to an insurer or auditor than a raw archive nobody can navigate.",
      },
    ],
    related: ["factory-security", "ai-intruder-detection", "smart-perimeter-protection"],
    insights: [
      "best-ai-cctv-camera-for-warehouses-india",
      "nobody-can-watch-120-camera-feeds",
      "your-dvr-records-the-theft-it-doesnt-stop-it",
      "1000-alerts-only-one-is-real",
    ],
    caseStudies: [
      {
        href: "/insights/case-studies/warehouse-shrinkage-ludhiana",
        label: "See how one Ludhiana warehouse cut shrinkage",
      },
    ],
  },

  {
    slug: "ai-cctv-for-offices",
    navLabel: "Offices",
    primaryKeyword: "AI CCTV for offices",
    relatedKeywords: [
      "office security system",
      "business CCTV",
      "workplace access monitoring",
      "tailgating detection",
      "employee attendance system",
    ],
    title:
      "AI CCTV for Offices — Access Monitoring, Attendance and After-Hours Alerts | PGAK",
    description:
      "Office security that runs quietly in the background: PGAK adds face-based attendance, tailgating detection and after-hours intrusion alerts to the business CCTV you already have.",
    eyebrow: "Office security",
    h1: "AI CCTV for offices — quiet during the day, wide awake at night",
    intro:
      "AI CCTV for offices has to solve two different problems at once: during working hours it should be invisible, and after hours it should be uncompromising. PGAK does both on your existing business CCTV — logging who came through reception, flagging tailgating at secured doors, and alerting instantly if anyone is moving through the floor at 2am.",
    painPoints: [
      "Reception logs visitors on paper nobody ever reads back.",
      "Secured doors get held open — one badge, three people through.",
      "Laptops and equipment go missing over long weekends.",
      "Attendance is a spreadsheet fed by an unreliable punch machine.",
    ],
    sections: [
      {
        h2: "During office hours: attendance and access, automatically",
        body: "The cameras at your entrance already see everyone who arrives. PGAK turns that into a structured record — no queues at a biometric machine, no card to forget, nothing to touch.",
        points: [
          {
            h3: "Face-based attendance",
            text: "Enrolled employees are logged on arrival and departure. Contractors and visitors show up as unknown faces with a snapshot, so the visitor book maintains itself.",
          },
          {
            h3: "Tailgating detection",
            text: "When more people pass through a secured door than were authorised, that's flagged — the failure mode every access-control system has and few detect.",
          },
          {
            h3: "Restricted-room monitoring",
            text: "Server rooms, HR filing, finance. Entry by anyone outside the approved list raises an alert with a clip.",
          },
        ],
      },
      {
        h2: "After hours: the office becomes a perimeter",
        body: "At a time you set, the same cameras switch behaviour. Any person detected on the floor, in the server room or at the entrance raises a real-time alert to whoever is on call, with the clip attached so they can judge before deciding to escalate.",
      },
      {
        h2: "Privacy that stands up to an employee's question",
        body: "Video processing happens on an edge device on your premises, not in someone else's cloud. Face data is stored as a mathematical template rather than a photo library, and you control who in the organisation can view what. When staff ask what the system is doing with their face — and they will — there is a clear answer.",
      },
      {
        h2: "One system, several buildings",
        body: "Multi-floor and multi-branch offices roll up into a single view, so a facilities manager sees all sites and a branch manager sees only their own.",
      },
    ],
    stats: [
      { value: "0", label: "Punch machines or access cards required" },
      { value: "< 3s", label: "After-hours intrusion alert latency" },
      { value: "On-site", label: "Video processing — nothing sent to a cloud" },
    ],
    faqs: [
      {
        q: "Can AI CCTV replace our biometric attendance machine?",
        a: "For most offices, yes. Face recognition at the entrance produces the same attendance record with no queue, no contact and nothing for staff to carry. Sites usually run both for a fortnight and then retire the machine.",
      },
      {
        q: "Is face recognition legal for employee attendance in India?",
        a: "Using it for attendance with employee notice and consent is standard practice, and PGAK is built to support that: processing stays on your premises, templates are stored instead of images, and access is role-controlled. We are not lawyers — check your own HR policy — but the technical controls you'd need are all in place.",
      },
      {
        q: "Will it alert us every time the cleaning staff move at night?",
        a: "No. Enrol them once and they're recognised as known people. You can also set schedules so expected activity in expected hours doesn't escalate.",
      },
      {
        q: "Does it work across multiple branches?",
        a: "Yes. Each site processes locally and reports into one dashboard, with role-based access so branch managers see their own site and head office sees everything.",
      },
    ],
    related: ["residential-security", "retail-shop-security", "ai-intruder-detection"],
    insights: [
      "how-many-of-your-cameras-can-actually-recognize-a-face",
      "why-biometric-attendance-machines-fail-at-the-factory-gate",
    ],
  },

  {
    slug: "factory-security",
    navLabel: "Factories",
    primaryKeyword: "factory security system",
    relatedKeywords: [
      "industrial CCTV",
      "factory gate attendance",
      "safety compliance monitoring",
      "plant perimeter security",
      "AI CCTV camera",
    ],
    title:
      "Factory Security System — AI CCTV for Gates, Perimeters and Shop Floors | PGAK",
    description:
      "A factory security system that covers the gate, the perimeter and the shop floor: automatic attendance, PPE and safety-zone monitoring, and real-time intrusion alerts on your existing industrial CCTV.",
    eyebrow: "Factory & industrial",
    h1: "Factory security that watches the gate, the fence and the floor",
    intro:
      "A factory security system has to do more than deter thieves. PGAK turns your existing industrial CCTV into one layer that handles all three of a plant's real problems — automatic attendance at the gate, intrusion detection along the perimeter, and safety-zone monitoring on the shop floor — without adding a single new machine to the queue at shift change.",
    painPoints: [
      "Shift change means a 200-person queue at a biometric machine that fails on dusty or damaged fingerprints.",
      "The perimeter fence is a kilometre long and the guard is at one gate.",
      "Safety incidents are investigated from memory because nobody can find the footage.",
      "Contractor headcount on site is a guess.",
    ],
    sections: [
      {
        h2: "The gate: attendance that doesn't create a queue",
        body: "Fingerprint readers fail exactly where factories need them most — on hands that work with oil, dust, cement and metal. Face recognition at the gate logs 200 people walking through at their own pace, with no contact, no card and no queue.",
        points: [
          {
            h3: "Automatic shift logging",
            text: "In and out times per worker, exported for payroll, with a snapshot attached to each event.",
          },
          {
            h3: "Contractor and visitor tracking",
            text: "Unknown faces are logged separately, so you always know how many non-employees are inside the plant right now.",
          },
          {
            h3: "No buddy punching",
            text: "A face can't be handed to a colleague at the gate, which quietly removes the most common form of attendance fraud.",
          },
        ],
      },
      {
        h2: "The perimeter: a fence that reports itself",
        body: "Virtual boundaries along the compound wall detect people or vehicles crossing where they shouldn't, at hours they shouldn't. Because the model classifies objects, the stray dogs and blowing tarpaulin that make conventional perimeter alarms useless are filtered out before they ever reach a phone.",
      },
      {
        h2: "The shop floor: safety and compliance",
        body: "The same cameras can watch for people entering machine exclusion zones, or working in areas where PPE is mandatory. Safety monitoring is where factory CCTV stops being a cost centre — a single prevented incident pays for years of it.",
        points: [
          {
            h3: "Restricted machine zones",
            text: "Alert when a person enters an exclusion zone while equipment is running.",
          },
          {
            h3: "PPE and compliance checks",
            text: "Flag entry into designated areas without required safety equipment, so compliance is measured rather than assumed.",
          },
          {
            h3: "Incident reconstruction",
            text: "Every flagged event is a clip with a timestamp, so an investigation starts from footage rather than from conflicting accounts.",
          },
        ],
      },
      {
        h2: "Built for industrial conditions",
        body: "Dust, vibration, poor lighting, intermittent connectivity. Processing runs on edge hardware at the plant, so a dropped internet line degrades reporting rather than stopping detection.",
      },
    ],
    stats: [
      { value: "200+", label: "Workers logged per shift, no queue" },
      { value: "0", label: "Fingerprint failures on dusty hands" },
      { value: "Edge", label: "Runs on-site, survives internet drops" },
    ],
    faqs: [
      {
        q: "Why do biometric attendance machines fail at a factory gate?",
        a: "Fingerprint sensors need clean, undamaged skin. Factory work produces the opposite — oil, dust, cuts and callouses — so a meaningful share of workers fail to read every day, and each failure adds to the queue. Face recognition at the gate has no contact requirement and processes people while they walk.",
      },
      {
        q: "Can it monitor PPE compliance?",
        a: "Yes, for designated zones and equipment types. It's best used as a measurement and coaching tool — a weekly compliance rate you can act on — rather than as a disciplinary trigger on individual frames.",
      },
      {
        q: "Our plant has patchy internet. Does that break it?",
        a: "No. Detection runs on edge devices inside the plant. If connectivity drops, detection and local alerting continue; the dashboard catches up when the link returns.",
      },
      {
        q: "How long does deployment take?",
        a: "Most plants are running on their existing cameras within a day. The longer part is tuning zones and schedules to your actual shift patterns, which we do over the first fortnight.",
      },
    ],
    related: [
      "ai-cctv-for-warehouses",
      "smart-perimeter-protection",
      "ai-intruder-detection",
    ],
    insights: [
      "why-biometric-attendance-machines-fail-at-the-factory-gate",
      "nobody-can-watch-120-camera-feeds",
      "stop-threats-before-they-happen",
    ],
  },

  {
    slug: "retail-shop-security",
    navLabel: "Retail",
    primaryKeyword: "retail shop security system",
    relatedKeywords: [
      "shop CCTV camera",
      "shoplifting prevention",
      "business CCTV",
      "store loss prevention",
      "AI CCTV camera",
    ],
    title:
      "Retail Shop Security System — AI CCTV That Catches Theft as It Happens | PGAK",
    description:
      "A retail shop security system that flags suspicious dwell time, till-area activity and after-hours entry in real time — running on the shop CCTV cameras you already installed.",
    eyebrow: "Retail & stores",
    h1: "Retail shop security that acts during the theft, not after it",
    intro:
      "A retail shop security system is only worth its cost if it does something while the theft is happening. PGAK adds real-time intelligence to your existing shop CCTV cameras — flagging unusual dwell time at high-value shelves, movement behind the till, and any entry after closing — so the shopkeeper gets a nudge in the moment rather than a video to mourn over later.",
    painPoints: [
      "You watch the footage after stock goes missing and learn nothing you can act on.",
      "The counter is unattended for thirty seconds at a time, all day.",
      "Alerts from the old system fire so often that the app notification is muted.",
      "You run three branches and can only be in one of them.",
    ],
    sections: [
      {
        h2: "Catching the behaviour, not just the person",
        body: "Shop theft has a shape: someone stands at a shelf far longer than a browsing customer, checks sightlines, and moves. That is a pattern software can watch for continuously and a busy shopkeeper cannot.",
        points: [
          {
            h3: "Dwell-time alerts on high-value shelves",
            text: "Set a zone around the expensive stock. Anyone lingering past the threshold raises a discreet alert on the owner's phone.",
          },
          {
            h3: "Till and counter protection",
            text: "Movement behind the counter by an unrecognised person is flagged immediately, day or night.",
          },
          {
            h3: "After-hours entry",
            text: "Once the shutter is down, any person detected inside is an instant escalation with a clip and optional siren.",
          },
          {
            h3: "Repeat-visitor recognition",
            text: "The same unknown face returning across multiple days near the same shelf is a signal worth surfacing.",
          },
        ],
      },
      {
        h2: "Staff accountability without micromanagement",
        body: "Face-based attendance logs when staff arrived and left, and till-area recognition distinguishes staff from customers. Most owners use it as a quiet baseline rather than a surveillance tool — the value is that discrepancies become visible without anyone having to accuse anybody.",
      },
      {
        h2: "Several shops, one phone",
        body: "Every branch reports into one app. You see which store raised what alert, so being physically present in one shop no longer means being blind to the other two.",
      },
      {
        h2: "It works on the cameras already on your wall",
        body: "Most shops have four to sixteen cameras on a DVR that was installed years ago. That is enough. PGAK connects over the existing stream — no new cabling, no shutting the shop for an installation day.",
      },
    ],
    stats: [
      { value: "4–16", label: "Cameras is a typical shop deployment" },
      { value: "₹1,000", label: "Per camera per month, all-inclusive" },
      { value: "1 day", label: "Typical time to go live" },
    ],
    faqs: [
      {
        q: "Will this work on my shop's existing CCTV?",
        a: "Almost certainly. If your DVR shows footage on a phone app today, it exposes the stream PGAK needs. We confirm compatibility during the free camera audit before anything is purchased.",
      },
      {
        q: "Can it actually stop shoplifting, or only record it?",
        a: "It alerts in real time, which is what makes intervention possible — a staff member walking over is the single most effective deterrent there is. It also supports an audible chime or announcement on high-value zone alerts.",
      },
      {
        q: "Won't it alert constantly in a busy shop?",
        a: "Not once tuned. Alerts are tied to specific zones, dwell thresholds and times rather than to general movement, so a crowded aisle at 6pm doesn't generate anything.",
      },
      {
        q: "I have three branches. Do I need three systems?",
        a: "No. Each shop runs locally but reports into a single account, so you get one app showing all branches with per-branch alerting.",
      },
    ],
    related: ["ai-cctv-for-offices", "ai-intruder-detection", "residential-security"],
    insights: [
      "your-dvr-records-the-theft-it-doesnt-stop-it",
      "1000-alerts-only-one-is-real",
    ],
  },

  {
    slug: "residential-security",
    navLabel: "Homes & societies",
    primaryKeyword: "smart home security system",
    relatedKeywords: [
      "residential CCTV",
      "society gate security",
      "home intruder alert",
      "AI CCTV camera for home",
      "visitor management",
    ],
    title:
      "Smart Home Security System — AI CCTV for Houses and Societies | PGAK",
    description:
      "A smart home security system that knows your family from a stranger: real-time intruder alerts, gate visitor logging and society-wide monitoring on the residential CCTV you already own.",
    eyebrow: "Homes & societies",
    h1: "A smart home security system that knows the difference between your family and a stranger",
    intro:
      "A smart home security system should be silent when your family walks in and loud when someone else does. PGAK adds that judgement to ordinary residential CCTV — recognising the people who live there, logging every visitor at the gate, and raising an instant alert when an unknown person is at the door at an hour they shouldn't be.",
    painPoints: [
      "The camera app pings all night for moths and passing headlights, so you turned notifications off.",
      "You have no idea who rang the bell while the house was empty.",
      "Elderly parents are home alone and you're in another city.",
      "The society gate register is a notebook full of illegible names.",
    ],
    sections: [
      {
        h2: "For an individual home",
        body: "Four cameras and a DVR is the common setup, and it is enough. The intelligence goes on top.",
        points: [
          {
            h3: "Known faces, silent entry",
            text: "Enrol your family once. When they arrive, nothing happens — which is exactly what you want a security system to do most of the time.",
          },
          {
            h3: "Unknown person at the door",
            text: "An unrecognised face lingering at the gate or door raises an alert with a snapshot, so you can look before you decide.",
          },
          {
            h3: "Away mode",
            text: "Leaving for a week? Any person detected on the property escalates immediately — including to a neighbour or relative you nominate.",
          },
          {
            h3: "Elderly and child awareness",
            text: "Optional gentle alerts if someone leaves the compound at unusual hours, without cameras inside living spaces.",
          },
        ],
      },
      {
        h2: "For a housing society",
        body: "Society security fails at the gate, because the gate is a notebook and a guard who changes every six months. Face and vehicle recognition at the entrance turns that into a searchable log — residents' vehicles recognised automatically, visitors logged with a photo, and delivery traffic separated from everything else.",
        points: [
          {
            h3: "Resident vehicle recognition",
            text: "Registered vehicles are logged on entry and exit without stopping at the boom.",
          },
          {
            h3: "Visitor logging with a photo",
            text: "Every non-resident entry becomes a timestamped record with a snapshot, replacing the paper register nobody can read.",
          },
          {
            h3: "Common-area monitoring",
            text: "Parking, clubhouse, play area and pump room — alerts only for the situations you define, not for children playing.",
          },
        ],
      },
      {
        h2: "Privacy inside your own home",
        body: "Processing runs on a device in the house. Video does not leave your premises unless you send a clip yourself, and face data is stored as a template rather than a photo album. For a system that watches your family, this matters more than any feature.",
      },
    ],
    stats: [
      { value: "4", label: "Cameras is enough for most homes" },
      { value: "0", label: "Video leaves your home by default" },
      { value: "24×7", label: "Gate and entry monitoring for societies" },
    ],
    faqs: [
      {
        q: "Do I need special AI cameras for my home?",
        a: "No. If you already have CCTV with a DVR, PGAK almost certainly works with it. The intelligence is software running alongside the cameras you own.",
      },
      {
        q: "Will it stop alerting me about my own family?",
        a: "Yes — that's the point. Enrolled family members are recognised and pass silently. Alerts are reserved for unknown people, which is what makes the notifications worth keeping switched on.",
      },
      {
        q: "Is my family's video going to a cloud server?",
        a: "Not by default. Processing happens on an edge device inside the home, so footage stays on your premises. Only clips you deliberately share leave the house.",
      },
      {
        q: "Can our housing society use this at the main gate?",
        a: "Yes, and it's one of the most common deployments. Resident vehicles are recognised automatically and every visitor entry becomes a searchable record with a photo instead of a line in a register.",
      },
    ],
    related: ["school-security", "ai-cctv-for-offices", "smart-perimeter-protection"],
    insights: [
      "how-many-of-your-cameras-can-actually-recognize-a-face",
      "1000-alerts-only-one-is-real",
    ],
  },

  {
    slug: "school-security",
    navLabel: "Schools",
    primaryKeyword: "school security system",
    relatedKeywords: [
      "campus CCTV",
      "student attendance system",
      "school gate monitoring",
      "unauthorised visitor detection",
      "AI CCTV camera",
    ],
    title:
      "School Security System — AI CCTV for Campus Gates and Grounds | PGAK",
    description:
      "A school security system built around who belongs on campus: unknown-visitor alerts at the gate, automatic student and staff attendance, and after-hours grounds monitoring on your existing campus CCTV.",
    eyebrow: "Schools & campuses",
    h1: "School security that knows who belongs on campus",
    intro:
      "A school security system has one job above all others: knowing, at any moment, whether the people on campus are supposed to be there. PGAK adds that to the campus CCTV a school already has — recognising staff and students at the gate, flagging unknown adults near entrances during school hours, and turning the grounds into a monitored perimeter after the last bell.",
    painPoints: [
      "Anyone can walk through the gate during drop-off and nobody would be certain.",
      "Attendance is taken on paper in thirty classrooms and reconciled hours later.",
      "Parents ask what happened at 2pm and the answer is a shrug.",
      "The grounds are empty and unwatched from 6pm to 7am.",
    ],
    sections: [
      {
        h2: "At the gate, during school hours",
        body: "Drop-off and pick-up are the two windows where a campus is most open and least controllable. Recognition at the gate gives the guard a second pair of eyes that never gets distracted by a queue of two hundred parents.",
        points: [
          {
            h3: "Unknown-adult alerts",
            text: "An unrecognised adult loitering near a gate or entrance during school hours is flagged to the front office with a snapshot.",
          },
          {
            h3: "Staff and student recognition",
            text: "Enrolled faces pass silently. The system's attention is spent entirely on the people it doesn't know.",
          },
          {
            h3: "Vehicle logging",
            text: "Buses, staff cars and visitor vehicles logged automatically at entry and exit.",
          },
        ],
      },
      {
        h2: "Attendance without thirty registers",
        body: "Face-based attendance at gates or classroom entrances produces a live roll for the whole school. The practical value is not the automation — it's that at 11am you can answer 'is this child on campus?' in seconds rather than by walking to a classroom.",
      },
      {
        h2: "After hours: the campus becomes a perimeter",
        body: "Schools are attractive targets when empty — electronics, equipment, copper. Once the campus closes, any person detected on the grounds raises an alert to the principal and the security contact, with a clip attached.",
      },
      {
        h2: "Safeguarding and privacy",
        body: "This is a school, so the bar is higher. Processing stays on-premises, cameras go on gates, corridors and grounds rather than in classrooms or any private area, face data is stored as a template rather than as photographs of children, and access is restricted to named staff. Every one of those is a policy question as much as a technical one, and we set it up with you rather than around you.",
      },
    ],
    stats: [
      { value: "Seconds", label: "To answer 'is this student on campus?'" },
      { value: "On-site", label: "All processing — no student video in a cloud" },
      { value: "24×7", label: "Grounds monitoring outside school hours" },
    ],
    faqs: [
      {
        q: "Are cameras placed inside classrooms?",
        a: "We recommend against it and it isn't needed. Gates, corridors, entrances, grounds and perimeters give you the security and attendance value without putting cameras in learning or private spaces.",
      },
      {
        q: "How is students' face data protected?",
        a: "Processing runs on a device at the school, so video never leaves the campus by default. Faces are stored as mathematical templates rather than image galleries, and only named staff can access the system.",
      },
      {
        q: "Can it flag an unknown adult near the school gate?",
        a: "Yes. Anyone not enrolled as staff, a parent or a known contractor who lingers near an entrance during school hours is flagged to the front office with a snapshot for a human to judge.",
      },
      {
        q: "Does it replace our attendance registers?",
        a: "It can produce a live campus-wide roll from gate and entrance recognition. Most schools run it alongside registers for a term and then decide how much of the paper process to retire.",
      },
    ],
    related: ["hospital-security", "residential-security", "smart-perimeter-protection"],
    insights: [
      "how-many-of-your-cameras-can-actually-recognize-a-face",
      "stop-threats-before-they-happen",
    ],
  },

  {
    slug: "hospital-security",
    navLabel: "Hospitals",
    primaryKeyword: "hospital security system",
    relatedKeywords: [
      "healthcare CCTV",
      "patient safety monitoring",
      "restricted ward access",
      "hospital visitor management",
      "AI CCTV camera",
    ],
    title:
      "Hospital Security System — AI CCTV for Wards, Pharmacies and Entrances | PGAK",
    description:
      "A hospital security system that never closes: restricted-area alerts for pharmacies and ICUs, visitor and staff recognition at entrances, and patient-safety monitoring on existing healthcare CCTV.",
    eyebrow: "Hospitals & healthcare",
    h1: "Hospital security for a building that never closes",
    intro:
      "A hospital security system has to work in a building with no closing time, no fixed visitor list and several rooms that only a handful of people should ever enter. PGAK adds that discrimination to existing healthcare CCTV — alerting when someone enters a pharmacy, drug store or ICU without authorisation, logging visitors at entrances, and flagging safety situations in corridors and wards.",
    painPoints: [
      "Pharmacy and drug-store access is controlled by a key and a hope.",
      "Visitor numbers are uncountable and unrestricted after visiting hours.",
      "Aggression at reception and casualty escalates before anyone responds.",
      "A patient wanders off the ward and is found twenty minutes later.",
    ],
    sections: [
      {
        h2: "Restricted areas that are actually restricted",
        body: "Pharmacies, drug stores, ICUs, neonatal units, records rooms and biomedical stores each get their own authorised-person list. Entry by anyone outside it raises an alert with a clip — which is a far more reliable control than a key that has been copied twice.",
        points: [
          {
            h3: "Pharmacy and controlled-substance stores",
            text: "Every entry logged with an identified person and timestamp, and unauthorised entry escalated immediately.",
          },
          {
            h3: "ICU and neonatal units",
            text: "Alert on unknown adults entering high-sensitivity wards, at any hour.",
          },
          {
            h3: "Records and biomedical rooms",
            text: "Access records that satisfy an audit without anyone maintaining a logbook.",
          },
        ],
      },
      {
        h2: "Entrances and visitor flow",
        body: "Staff are enrolled and pass silently; visitors are logged with a snapshot. Outside visiting hours, unknown people entering ward corridors are flagged. It replaces a visitor register that, in practice, nobody ever reads.",
      },
      {
        h2: "Patient and staff safety",
        body: "Corridor and ward cameras can flag a person on the floor, or a patient leaving a ward area they shouldn't. Reception and casualty areas can be monitored for crowding and aggression so security responds during the incident rather than after it.",
      },
      {
        h2: "Patient privacy is the constraint, not an afterthought",
        body: "Cameras belong in corridors, entrances, stores and common areas — not in treatment rooms, wards where patients are exposed, or anywhere with a reasonable expectation of privacy. Processing stays on hospital premises, access is role-restricted, and retention windows are set explicitly. We configure the deployment around your clinical governance policy.",
      },
    ],
    stats: [
      { value: "24×7", label: "Restricted-area monitoring, no closing time" },
      { value: "On-site", label: "Processing — patient video stays in the hospital" },
      { value: "Per-room", label: "Authorised-person lists for every sensitive area" },
    ],
    faqs: [
      {
        q: "Where should cameras not be placed in a hospital?",
        a: "Treatment rooms, patient bays, toilets and changing areas — anywhere with a reasonable expectation of privacy. The security value sits in corridors, entrances, pharmacies, stores and common areas, and that's where we deploy.",
      },
      {
        q: "Can it control access to the pharmacy?",
        a: "It monitors and alerts rather than physically locking. Every entry is logged against an identified person, and entry by anyone outside the authorised list raises an immediate alert with a clip — which in practice is what catches misuse.",
      },
      {
        q: "Does patient video go to a cloud service?",
        a: "No. Processing runs on edge hardware inside the hospital and video stays on your premises by default, which is usually a requirement of the clinical governance policy rather than a preference.",
      },
      {
        q: "Can it help with aggression at reception or casualty?",
        a: "Yes — crowding and rapid-movement patterns in defined areas can raise an alert to the security desk, so a response starts while the situation is still de-escalatable.",
      },
    ],
    related: ["school-security", "ai-cctv-for-offices", "ai-intruder-detection"],
    insights: [
      "how-many-of-your-cameras-can-actually-recognize-a-face",
      "nobody-can-watch-120-camera-feeds",
    ],
  },

  {
    slug: "smart-perimeter-protection",
    navLabel: "Perimeter protection",
    primaryKeyword: "smart perimeter protection",
    relatedKeywords: [
      "virtual fence detection",
      "perimeter intrusion detection system",
      "boundary breach alerts",
      "AI CCTV camera",
      "trespass detection",
    ],
    title:
      "Smart Perimeter Protection — Virtual Fencing on Existing CCTV | PGAK",
    description:
      "Smart perimeter protection without trenching a cable: draw virtual boundaries on the cameras you already own and get real-time alerts the moment a person or vehicle crosses them.",
    eyebrow: "Perimeter protection",
    h1: "Smart perimeter protection — a fence that reports itself",
    intro:
      "Smart perimeter protection replaces the physical sensors nobody maintains with virtual boundaries drawn on the cameras you already own. Mark a line along the compound wall, the yard edge or the roof access, and PGAK raises a real-time alert the moment a person or vehicle crosses it — while filtering out the animals, weather and moving foliage that made your old perimeter alarm unusable.",
    painPoints: [
      "Beam sensors and fence wires fail constantly and cost a fortune to trench in.",
      "The old perimeter alarm fires so often at night that the guard disabled it.",
      "A one-kilometre boundary is covered by one guard at one gate.",
      "You learn about the breach from the damage, not from an alert.",
    ],
    sections: [
      {
        h2: "Virtual fencing, drawn in a minute",
        body: "A perimeter intrusion detection system used to mean buried cable, beam pairs and a maintenance contract. Now it means drawing a line on a camera view. You can change the boundary whenever the site changes, at no cost, on any camera that can see the area.",
        points: [
          {
            h3: "Line-crossing detection",
            text: "Alert when an object crosses a boundary — with direction, so entering the site raises an alert and leaving it doesn't.",
          },
          {
            h3: "Zone intrusion",
            text: "Enclosed areas — a yard, a substation, a roof, a fuel store — alert on any presence rather than on crossing.",
          },
          {
            h3: "Loitering along the boundary",
            text: "Someone standing at the fence for two minutes is a stronger pre-breach signal than someone walking past it.",
          },
          {
            h3: "Schedules per boundary",
            text: "The dispatch gate is busy until 8pm and should be silent after; the substation should be alarmed all day. Each boundary has its own hours.",
          },
        ],
      },
      {
        h2: "Filtering is what makes it survivable",
        body: "The reason most perimeter systems end up switched off is not that they miss intruders — it's that they report everything. PGAK classifies before alerting: animals, rain, insects on the lens, headlights sweeping the wall and branches in the wind are suppressed. A boundary alert means a person or a vehicle.",
      },
      {
        h2: "Response, not just notification",
        body: "A boundary breach can trigger more than a phone buzz — an on-site siren, a strobe, a floodlight, or an announcement. Deterrence during the approach is worth more than evidence after the entry.",
      },
      {
        h2: "Long perimeters, no new cabling",
        body: "Because it uses cameras that are already installed and powered, extending coverage along a long boundary costs a camera, not a trench. Sites typically start with the two or three most exposed stretches and widen from there.",
      },
    ],
    stats: [
      { value: "1 min", label: "To draw a new virtual boundary" },
      { value: "0m", label: "Of new cable trenched" },
      { value: "< 3s", label: "From boundary crossing to alert" },
    ],
    faqs: [
      {
        q: "How is virtual fencing different from beam sensors?",
        a: "Beams detect that something broke the beam — a bird does that as well as a person. Virtual fencing on camera classifies the object first, so it tells you a person crossed rather than that something did. It also needs no trenching, no power runs along the fence and no field maintenance.",
      },
      {
        q: "Will wind, rain or animals trigger it?",
        a: "They're filtered out. Object classification runs before the alerting logic, so weather, foliage and animals are suppressed by default. This is the single biggest reason perimeter systems get abandoned, and it's the part we tune hardest during the first fortnight.",
      },
      {
        q: "Can it trigger a siren or light, not just my phone?",
        a: "Yes. Boundary alerts can drive a siren, strobe, floodlight or public announcement at the site, alongside the phone notification. Deterrence during the approach beats evidence after the entry.",
      },
      {
        q: "How long a perimeter can this cover?",
        a: "As long as your cameras can see. Coverage is limited by camera placement rather than by the software, and extending it means adding a camera to an existing stretch — not laying new sensor cable.",
      },
    ],
    related: ["ai-intruder-detection", "factory-security", "ai-cctv-for-warehouses"],
    insights: [
      "stop-threats-before-they-happen",
      "1000-alerts-only-one-is-real",
      "your-dvr-records-the-theft-it-doesnt-stop-it",
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export const SOLUTION_SLUGS = SOLUTIONS.map((s) => s.slug);
