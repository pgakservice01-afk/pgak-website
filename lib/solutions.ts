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
      "AI CCTV for Warehouses — Stop Stock Loss at the Gate | PGAK",
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
        a: "Billing is per camera per month with no hidden fees, so a 60-camera warehouse is a predictable line item. We quote your rate on a call or WhatsApp. Most sites find it costs less than a single month of the shrinkage it prevents — see our pricing page for what moves the number.",
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
        label: "How AI CCTV cuts shrinkage in a Ludhiana warehouse",
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
      "Factory Security System — AI CCTV for Gates & Shop Floors | PGAK",
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
      { value: "Per camera", label: "Billed monthly, all-inclusive" },
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
  {
    slug: "biometric-attendance",
    navLabel: "Biometric attendance",
    primaryKeyword: "biometric attendance",
    relatedKeywords: [
      "biometric attendance system",
      "fingerprint attendance system",
      "face recognition attendance",
      "attendance machine",
      "biometric time attendance system",
    ],
    title:
      "Biometric Attendance Without the Machine — Face Recognition on Your Existing Cameras | PGAK",
    description:
      "Biometric attendance breaks at the gate: queues at shift change, worn fingers that won't read, and a register that still gets fudged. PGAK marks attendance from the CCTV cameras already on your wall — no machine, no touching, no queue.",
    eyebrow: "Attendance",
    h1: "Biometric attendance, without anyone stopping to touch a machine",
    intro:
      "Biometric attendance was supposed to end the fudged register. On most Indian sites it just moved the problem: a single fingerprint reader at the gate, forty people queuing behind it at 9am, and half a dozen whose fingers never read cleanly. PGAK marks attendance from the CCTV cameras you already own — a face, recognised as the person walks in, logged with a timestamp and a photo, with nobody breaking stride.",
    painPoints: [
      "Shift change turns into a twenty-minute queue at one fingerprint reader.",
      "Fingers that are wet, cut, worn from manual work or simply dry get rejected again and again.",
      "The machine is at the main gate, so anyone entering another way is invisible to it.",
      "You still keep a paper register as a backup — which means you are running two systems and trusting neither.",
      "Payroll day becomes an argument, because nobody can prove who was actually on site.",
    ],
    sections: [
      {
        h2: "Why fingerprint attendance fails on real sites",
        body: "Fingerprint readers are cheap and everywhere, and on an office floor of thirty people they mostly work. The failure shows up where the workforce is large, the hands are working hands, and everyone arrives inside the same ten minutes.",
        points: [
          {
            h3: "Worn and damaged fingerprints",
            text: "Manual work wears down ridge detail. Masons, machinists, loaders and kitchen staff routinely fail fingerprint capture — and the person who fails is asked to try five times while a queue builds behind them.",
          },
          {
            h3: "One reader, one chokepoint",
            text: "A reader handles one person every three to six seconds at best. Two hundred workers arriving at once is a queue measured in tens of minutes, every single shift.",
          },
          {
            h3: "It only sees one door",
            text: "The reader records the gate it is bolted to. Side entrances, the loading bay and the canteen exit are all outside its world, which is exactly where mid-shift disappearances happen.",
          },
        ],
      },
      {
        h2: "How face-based attendance works on cameras you already have",
        body: "PGAK does not sell you an attendance machine. It reads the cameras already pointed at your entrances, recognises enrolled faces as people walk past at normal walking pace, and writes the attendance record itself.",
        points: [
          {
            h3: "Enrol once, from a phone",
            text: "Each employee is registered with a short guided face scan. No queue, no dedicated enrolment hardware, and the scan can be done by the employee on their own phone.",
          },
          {
            h3: "Recognition at walking pace",
            text: "There is no stopping, no touching and no queue, because the camera is doing the work. Several people can walk in together and each is logged separately.",
          },
          {
            h3: "Every camera becomes a check-in point",
            text: "Because it is software on your existing estate, the side gate and the loading bay can mark attendance too — not just the one door a machine was bolted to.",
          },
          {
            h3: "The record carries its own proof",
            text: "Each entry stores the time and the frame the recognition came from. When payroll is disputed, you look at the photo instead of arguing about the register.",
          },
        ],
      },
      {
        h2: "What it does not do",
        body: "Face attendance is not magic, and being straight about the limits is how you avoid a failed rollout. Recognition needs a reasonably lit, reasonably front-on view of the face — a camera mounted high above a doorway looking at the tops of heads will not work without being repositioned. Very large enrolments need good quality reference photos to stay accurate. And any biometric processing in India sits under the DPDP Act, so employees must be told what is collected and why.",
      },
      {
        h2: "Attendance that feeds payroll instead of fighting it",
        body: "An attendance record is only worth having if it reaches the person who runs payroll without being retyped. PGAK's attendance data flows straight into shift, overtime and payroll views, so the hours that were actually worked are the hours that get paid.",
        points: [
          {
            h3: "Shifts and overtime calculated, not counted by hand",
            text: "Late marks, half days and overtime are derived from the same log the camera wrote, so there is one version of the truth.",
          },
          {
            h3: "The same cameras still do security",
            text: "The estate you are using for attendance is the estate watching your perimeter, your loading bay and your stock room. You are not paying for a second system.",
          },
        ],
      },
    ],
    stats: [
      { value: "0", label: "new attendance machines to buy" },
      { value: "Walk-through", label: "no stopping, no touching, no queue" },
      { value: "Every camera", label: "can become a check-in point" },
      { value: "Photo-backed", label: "every attendance record carries its frame" },
    ],
    faqs: [
      {
        q: "Can biometric attendance work without a fingerprint machine?",
        a: "Yes. Face recognition running on your existing CCTV cameras marks attendance as people walk in, so there is no reader to buy, mount, maintain or queue at. The camera does the identification and writes the record itself.",
      },
      {
        q: "Why do fingerprint attendance systems fail in factories?",
        a: "Three reasons dominate: manual work wears down fingerprint ridges so scans get rejected, one reader creates a queue when hundreds of workers arrive in the same ten minutes, and a reader only records the single door it is fixed to. Face recognition on existing cameras removes all three, because there is no contact, no single chokepoint and no limit of one entry point.",
      },
      {
        q: "Is face recognition attendance legal in India?",
        a: "Yes, with consent and disclosure. Facial data is personal data under the Digital Personal Data Protection Act, so employees must be informed what is being collected, why, and how long it is kept. Employers should publish an internal notice and keep retention to what payroll actually requires.",
      },
      {
        q: "Do we need to replace our CCTV cameras?",
        a: "Usually not. The determining factor is whether a camera gets a reasonably lit, reasonably front-on view of faces at the entrance. Cameras mounted high and looking down at the tops of heads need repositioning; most entrance cameras at normal mounting height are already usable.",
      },
      {
        q: "Can people cheat face attendance the way they share fingerprints?",
        a: "Buddy punching is far harder, because the record stores the actual frame the recognition came from. If a mark is disputed you look at the photograph of who walked through, rather than trusting that the right finger was on the reader.",
      },
    ],
    related: ["face-recognition-attendance-system", "factory-security", "ai-cctv-for-offices"],
    insights: [
      "why-biometric-attendance-machines-fail-at-the-factory-gate",
      "face-recognition-attendance-vs-biometric-machine",
      "is-ai-cctv-legal-in-india-dpdp-act",
    ],
  },
  {
    slug: "face-recognition-attendance-system",
    navLabel: "Face recognition attendance",
    primaryKeyword: "face recognition attendance system",
    relatedKeywords: [
      "face attendance system",
      "attendance system using face recognition",
      "face id attendance system",
      "face detection attendance system",
      "face scanning attendance system",
    ],
    title:
      "Face Recognition Attendance System — On the CCTV Cameras You Already Own | PGAK",
    description:
      "A face recognition attendance system with no terminal to queue at: PGAK recognises enrolled faces on your existing entrance cameras and writes a photo-backed attendance record as people walk in.",
    eyebrow: "Attendance",
    h1: "A face recognition attendance system with no machine at the gate",
    intro:
      "A face recognition attendance system replaces the queue at the fingerprint reader with a camera that simply watches people walk in. PGAK runs face recognition on the CCTV cameras already mounted at your entrances — each enrolled person is recognised at walking pace and logged with a timestamp and the exact frame, so the register fills itself and every entry carries its own proof.",
    painPoints: [
      "Two hundred workers, one biometric terminal, and a queue that eats twenty minutes of every shift.",
      "Wet, worn or dusty fingers that the reader rejects three times before giving up.",
      "Proxy punching — one person carrying two thumbs' worth of attendance.",
      "A machine at the main gate that never sees who came in through the side.",
      "Payroll disputes that come down to a spreadsheet cell nobody can prove.",
    ],
    sections: [
      {
        h2: "How face recognition attendance actually works",
        body: "There is no new hardware in this system. The work happens in software, on the camera feeds you already record.",
        points: [
          {
            h3: "Enrol each person once, from a phone",
            text: "A short guided face scan builds the reference. No enrolment hardware, no visit to an office — the scan can be done on the employee's own phone in under a minute.",
          },
          {
            h3: "The entrance camera does the identification",
            text: "As people walk through, faces are matched against the enrolled list. Several people can enter together; each is logged separately, at normal walking pace, without stopping or touching anything.",
          },
          {
            h3: "Every record carries its frame",
            text: "Each attendance entry stores the exact image the recognition came from. A disputed half-day is settled by looking at the photograph, not by arguing about the register.",
          },
          {
            h3: "The log flows into shifts and payroll",
            text: "Late marks, half days and overtime are derived from the same camera-written log, so the hours actually worked are the hours paid — with no retyping in between.",
          },
        ],
      },
      {
        h2: "Face recognition vs a face attendance machine",
        body: "Wall-mounted face attendance machines fix the hygiene problem of fingerprints but keep every other limitation: one device, one door, one queue, and a per-door hardware cost every time you want to cover another entrance. Camera-based recognition inverts that — every camera you own is a potential check-in point, the side gate and loading bay included, and adding coverage is a software change rather than a purchase order.",
      },
      {
        h2: "What honest vendors admit about accuracy",
        body: "Face recognition needs a reasonably lit, reasonably front-on view. A camera mounted very high and looking at the tops of heads will not identify anyone reliably until it is repositioned — we check this during the free feasibility review rather than promising a blanket accuracy number. Indian sites also sit under the DPDP Act: employees must be told what is collected and why, and facial data must be kept no longer than payroll needs.",
      },
    ],
    stats: [
      { value: "0", label: "terminals to buy, mount or maintain" },
      { value: "Walk-through", label: "recognition at normal walking pace" },
      { value: "Every entrance", label: "any camera can mark attendance" },
      { value: "Photo-backed", label: "each record stores its own frame" },
    ],
    faqs: [
      {
        q: "How does a face recognition attendance system work?",
        a: "Employees are enrolled once with a short face scan. Software then matches faces seen by your entrance cameras against that enrolled list, and writes an attendance record — time, person and the camera frame — as each person walks in. No terminal, card or fingerprint is involved.",
      },
      {
        q: "Do we need special cameras for face recognition attendance?",
        a: "Usually not. The deciding factor is placement, not the camera's age: it needs a reasonably lit, roughly face-height view of the entrance. Most existing entrance cameras qualify, and the ones that don't typically just need remounting.",
      },
      {
        q: "Can face recognition attendance stop proxy attendance?",
        a: "It makes proxy attendance far harder than fingerprints or cards, because every record stores the photograph it came from. If a mark is questioned, you look at who actually walked through — there is no thumb or card to hand to a friend.",
      },
      {
        q: "Is a face recognition attendance system legal in India?",
        a: "Yes, with informed consent. Facial data is personal data under the Digital Personal Data Protection Act, so employees must be told what is collected, why, and for how long it is kept. A simple internal notice at rollout covers this; retention should match what payroll actually needs.",
      },
      {
        q: "What happens if someone is not recognised?",
        a: "Unrecognised faces are flagged for review rather than silently dropped — an admin sees the frame and can mark the person manually while the enrolment photo is improved. The system is designed so a miss costs a tap, not a day's wages.",
      },
    ],
    related: ["biometric-attendance", "factory-security", "ai-cctv-for-offices"],
    insights: [
      "face-recognition-attendance-vs-biometric-machine",
      "why-biometric-attendance-machines-fail-at-the-factory-gate",
      "is-ai-cctv-legal-in-india-dpdp-act",
    ],
  },
  {
    slug: "cctv-installation-company",
    navLabel: "CCTV installation",
    primaryKeyword: "CCTV installation company",
    relatedKeywords: [
      "cctv installation companies near me",
      "cctv companies near me",
      "camera installation service near me",
      "cctv camera providers near me",
      "cctv installation service",
    ],
    title:
      "CCTV Installation Company in Punjab — Cameras That Alert, Not Just Record | PGAK",
    description:
      "Looking for a CCTV installation company near you? PGAK installs and services CCTV across Punjab directly and through verified partners across India — and every install ships with AI alerts, not just recording.",
    eyebrow: "Installation & service",
    h1: "A CCTV installation company that leaves you with alerts, not just footage",
    intro:
      "Most CCTV installation companies wire up cameras, hand over a recorder password (sometimes not even that) and disappear. PGAK is a CCTV installation company with a different end state: when we leave, your cameras don't just record — they tell you, on your phone, when a person crosses a line they shouldn't. Direct installation teams cover Ludhiana and the Punjab belt; verified partners cover the rest of India.",
    painPoints: [
      "The last installer vanished after handover — four cameras have been dark for months.",
      "Nobody gave you the recorder's admin password, so you can't change anything.",
      "The quote was one bundled per-camera number, impossible to compare with anyone else's.",
      "Sixteen cameras record all day, and the first time anyone watches is after something goes wrong.",
      "\"Same day service\" turned out to mean same week, if the phone was answered at all.",
    ],
    sections: [
      {
        h2: "What our installation actually includes",
        body: "An install is a system, not a box count. Every PGAK installation is quoted with the parts itemised — cameras where needed, cabling and power runs, the recorder, storage sized to your real retention need — and handed over with you owning every password.",
        points: [
          {
            h3: "Reuse before replace",
            text: "If your existing cameras are serviceable, we keep them. The intelligence runs in software, so a working camera rarely needs to be thrown away to get modern alerts.",
          },
          {
            h3: "Placement designed for detection",
            text: "Cameras are positioned for what they must detect — the boundary wall, the loading bay, the entrance where attendance is marked — not just for coverage on a floor plan.",
          },
          {
            h3: "Two weeks of tuning after handover",
            text: "Detection zones, alert schedules and who-gets-notified are configured and then tuned against real traffic, so alerts stay trusted instead of getting muted in week one.",
          },
          {
            h3: "You own the system",
            text: "Admin passwords, camera credentials and recorder access are handed over in writing on day one. If we ever part ways, everything keeps working and everything is yours.",
          },
        ],
      },
      {
        h2: "Where we install directly — and where partners do",
        body: "Our own teams handle installation and service across Ludhiana, Jalandhar, Amritsar, Patiala, Khanna, Moga, Bathinda, Batala, Hoshiarpur, Mandi Gobindgarh and Chandigarh–Mohali. In metros further afield — Delhi NCR, Mumbai, Bengaluru, Jaipur and others — installation is carried out by verified partners while monitoring, alerts and support stay with PGAK. Either way the system, the software and the accountability are ours.",
      },
      {
        h2: "Questions to ask any CCTV installation company",
        body: "Ask who owns the recorder password. Ask for the response time to a dead camera in hours, in writing. Ask for cabling and storage as separate line items. Ask what happens when the disk fills. And ask to see a live system they installed more than a year ago. We published our full checklist — including the answers we give — in our buying guide, because a customer who compares carefully tends to choose the installer who tunes and stays.",
      },
    ],
    stats: [
      { value: "11 cities", label: "direct installation & service in Punjab" },
      { value: "Day one", label: "you own every password, in writing" },
      { value: "2 weeks", label: "of post-install tuning included" },
      { value: "AI alerts", label: "every install ships with detection, not just recording" },
    ],
    faqs: [
      {
        q: "Do you install new CCTV cameras or only add software to existing ones?",
        a: "Both. If you have no cameras, we design and install the full system. If you already have cameras, we reuse every serviceable one and add the intelligence layer — most sites end up with a mix of kept cameras, a few repositioned ones, and new units only where coverage is genuinely missing.",
      },
      {
        q: "Which areas does your CCTV installation service cover?",
        a: "Our own teams install and service across the Punjab belt — Ludhiana, Jalandhar, Amritsar, Patiala, Khanna, Moga, Bathinda, Batala, Hoshiarpur, Mandi Gobindgarh and Chandigarh–Mohali. Beyond Punjab, verified partners handle the physical installation while PGAK runs the software, alerts and support.",
      },
      {
        q: "How much does CCTV installation cost?",
        a: "It depends on camera count, cable runs and storage needs, which is why we quote per site with every line itemised — cameras, cabling, power, recorder, storage and support listed separately so you can compare our quote against anyone's. The survey and quote are free.",
      },
      {
        q: "What makes PGAK different from a local CCTV installer?",
        a: "The end state. A typical install ends at 'it records'. Ours ends at 'it tells you' — person and vehicle detection, boundary alerts and camera-offline warnings run on every install, and the first two weeks of tuning are part of the job, not an extra.",
      },
      {
        q: "Can you take over a CCTV system another company installed?",
        a: "Yes, and it is common. We audit what is installed, recover or reset access you should have been given, restore dead cameras where the cabling allows, and add the alerting layer on top of the estate you already paid for.",
      },
    ],
    related: ["ai-intruder-detection", "factory-security", "smart-perimeter-protection"],
    insights: [
      "how-to-choose-a-cctv-installation-company",
      "your-dvr-records-the-theft-it-doesnt-stop-it",
      "where-to-place-cctv-cameras-for-ai-detection",
    ],
  },
  {
    slug: "video-analytics-software",
    navLabel: "Video analytics software",
    primaryKeyword: "video analytics software",
    relatedKeywords: [
      "video analytics solutions",
      "CCTV video analytics",
      "AI video analytics",
      "video analytics for CCTV cameras",
      "intelligent video analytics",
    ],
    title:
      "Video Analytics Software for Existing CCTV — Detection, Alerts, Attendance | PGAK",
    description:
      "PGAK's video analytics software runs on the CCTV cameras you already own: person and vehicle detection, boundary alerts, face-recognition attendance and camera-health monitoring — no camera replacement, no new hardware at the gate.",
    eyebrow: "Platform",
    h1: "Video analytics software that runs on the cameras you already own",
    intro:
      "Video analytics software is the difference between cameras that record and cameras that report. PGAK analyses every frame from your existing CCTV — classifying people and vehicles, watching the boundaries you draw, recognising enrolled faces for attendance — and turns the events that matter into alerts on your phone while there is still time to act.",
    painPoints: [
      "Footage is only ever reviewed after something has already gone wrong.",
      "The recorder's built-in motion detection cried wolf for a week, so it was muted.",
      "Nobody knows a camera has died until the day its footage is needed.",
      "Vendors promise '99% accuracy' but go quiet when asked about your cameras, your lighting, your mounting heights.",
    ],
    sections: [
      {
        h2: "What the software actually detects",
        body: "Every capability below runs on your existing camera estate — the same streams your recorder already receives.",
        points: [
          {
            h3: "Person & vehicle classification",
            text: "The foundation. A moving object is identified as a person, vehicle or animal before any rule fires — which is why a swaying branch or a stray dog doesn't wake you at 2am.",
          },
          {
            h3: "Boundary & zone intrusion",
            text: "Draw a line on a camera view — compound wall, loading bay, stock room door — and get an alert with a snapshot the moment the wrong class of object crosses it during the hours you chose.",
          },
          {
            h3: "Face-recognition attendance",
            text: "Enrolled employees are recognised at the entrance and logged with a photo-backed record, replacing the queue at the biometric machine entirely.",
          },
          {
            h3: "Camera health & tamper watch",
            text: "The least glamorous feature and often the most valuable: you are told within minutes when a camera goes dark, gets covered, or is knocked out of position.",
          },
        ],
      },
      {
        h2: "Why analytics beats the motion detection you already muted",
        body: "Your DVR's motion detection compares pixels between frames, so rain, moths and headlights all fire it — which is why every site we visit has it switched off. Analytics classifies the object first and applies your rules second. The practical result is a system whose notifications people still read in month six, because the alerts have stayed worth reading.",
      },
      {
        h2: "Deployment, honestly described",
        body: "An edge device at your site (or a cloud connection where bandwidth allows) picks up the streams your cameras already produce — no rewiring, no camera replacement as a precondition. A free feasibility check first confirms which of your cameras can support which capability, because a camera mounted for general coverage sometimes needs repositioning before face recognition will work on it. You get that answer before any commitment, not after.",
      },
    ],
    stats: [
      { value: "Existing cameras", label: "runs on the CCTV you already own" },
      { value: "Seconds", label: "from event to alert on your phone" },
      { value: "4-in-1", label: "intrusion, attendance, counting, camera health" },
      { value: "Free", label: "feasibility check on your actual cameras" },
    ],
    faqs: [
      {
        q: "What is video analytics software?",
        a: "Software that analyses camera feeds automatically and raises an event when something specific happens — a person crossing a boundary, a vehicle stopping where it shouldn't, a camera going dark. It replaces the assumption that a human is watching the wall of screens, which on real sites is almost never true.",
      },
      {
        q: "Does video analytics software work with existing CCTV cameras?",
        a: "Yes — that is PGAK's entire model. The software consumes the RTSP streams your cameras and DVR/NVR already produce. The constraint is camera placement rather than camera age: a usable view of the area you care about matters far more than the year the camera was made.",
      },
      {
        q: "Is video analytics the same as motion detection?",
        a: "No. Motion detection reacts to pixel changes, so weather and headlights trigger it constantly. Video analytics classifies what the object is before applying your rules, which is what keeps false alarms low enough that the alerts stay switched on.",
      },
      {
        q: "Can video analytics predict incidents before they happen?",
        a: "No software honestly can, and claims otherwise deserve suspicion. What analytics does reliably is detect defined behaviours — loitering in a zone, a boundary crossed after hours, a vehicle stopped at the gate — fast enough that a human can intervene while it still matters.",
      },
      {
        q: "What does video analytics software cost in India?",
        a: "Pricing is per camera per month and quoted per site, because camera count and the capabilities you enable drive the number. The feasibility check and quote are free, and there is no hardware licence or per-feature surcharge stacked on top.",
      },
    ],
    related: ["ai-intruder-detection", "biometric-attendance", "smart-perimeter-protection"],
    insights: [
      "what-is-video-analytics-software",
      "how-does-ai-intruder-detection-work",
      "1000-alerts-only-one-is-real",
    ],
  },
  {
    slug: "attendance-system-for-factories",
    navLabel: "Factory attendance",
    primaryKeyword: "attendance system for factory",
    relatedKeywords: [
      "factory attendance management",
      "labour attendance system",
      "shift attendance for manufacturing",
      "gate attendance factory",
      "worker attendance system",
    ],
    title:
      "Attendance System for Factories — No Queue at the Gate | PGAK",
    description:
      "A factory attendance system that survives shift change: face recognition on your existing gate cameras logs 200 workers walking in, with no reader queue and no failed scans on worn hands.",
    eyebrow: "Attendance · Manufacturing",
    h1: "An attendance system built for a factory gate at shift change",
    intro:
      "An attendance system for a factory has to survive the one moment office systems never face: two hundred people arriving inside ten minutes, most of them with working hands. PGAK marks factory attendance from the CCTV cameras already watching your gate — people are recognised as they walk through, several at a time, and the log feeds shifts and overtime without anyone queueing or touching a sensor.",
    painPoints: [
      "Shift change becomes a fifteen-minute queue at one reader — twice a day, every day.",
      "Oil, dust and worn ridges mean a chunk of your workforce simply cannot scan reliably.",
      "The reader is on the main gate; the labour entrance and loading bay are invisible to it.",
      "Contractor labour churns weekly and nobody re-enrols them in time.",
      "Overtime disputes end in an argument because the register proves nothing.",
    ],
    sections: [
      {
        h2: "Why factory gates break attendance hardware",
        body: "A factory is the worst case for contact biometrics on every axis at once — headcount density, hand condition and multiple entrances. Understanding which of the three bites you hardest decides what to fix first.",
        points: [
          {
            h3: "Density at shift change",
            text: "A reader handles roughly one person every three to six seconds when scans succeed. Two hundred workers arriving together is queue arithmetic no second machine really solves.",
          },
          {
            h3: "Hands that do not read",
            text: "Machine operators, loaders, dyeing and moulding hands lose ridge detail. The failed scan is not user error — it is the sensor meeting reality.",
          },
          {
            h3: "More gates than machines",
            text: "Labour entrance, contractor gate, loading bay. Hardware covers the doors you bought devices for; cameras cover the doors you already watch.",
          },
        ],
      },
      {
        h2: "How camera-based attendance handles a factory",
        body: "Every entrance camera becomes a check-in point. Workers walk in at normal pace — no stopping, no contact, several people logged at once — and each record stores the frame it came from, which is what settles an overtime dispute in seconds rather than a meeting.",
        points: [
          {
            h3: "Contractor labour enrolled in a minute",
            text: "A guided face scan from a phone. No queue at an enrolment desk when a new gang arrives on Monday.",
          },
          {
            h3: "Shift, OT and late marks derived automatically",
            text: "Rules run against the camera-written log, so the hours worked and the hours paid come from one source.",
          },
          {
            h3: "The same cameras still watch the perimeter",
            text: "You are not running a security estate and an attendance estate — it is one system doing both.",
          },
        ],
      },
      {
        h2: "Where it needs checking first",
        body: "Face recognition needs a reasonably lit, roughly face-height view. Gate cameras mounted high for vehicle coverage usually need repositioning before they can identify people, and we tell you that during the free feasibility check rather than after a purchase order. Biometric data also sits under the DPDP Act, so worker notice and consent are part of rollout, not an afterthought.",
      },
    ],
    stats: [
      { value: "0", label: "new gate hardware to buy" },
      { value: "Walk-through", label: "no queue at shift change" },
      { value: "Every gate", label: "labour, contractor and loading entrances" },
      { value: "Photo-backed", label: "every punch stores its frame" },
    ],
    faqs: [
      {
        q: "What is the best attendance system for a factory?",
        a: "One that does not create a queue and does not depend on fingerprint quality. On sites with large shift-change surges and manual labour, camera-based face recognition outperforms fingerprint readers because there is no contact, no single chokepoint, and every entrance with a camera can log attendance.",
      },
      {
        q: "How do you handle contractor and temporary labour?",
        a: "Enrolment is a short guided face scan that can be done from a phone, so a new gang can be registered in minutes at the gate rather than queueing at an office. Records for temporary workers can be retained separately and purged when the contract ends.",
      },
      {
        q: "Will it work if workers wear helmets, masks or turbans?",
        a: "Head coverings that leave the face visible are fine — turbans and hard hats are normal on Indian sites and do not block recognition. Anything covering the face itself will reduce reliability, which is why the feasibility check looks at your actual gate conditions before we commit to a result.",
      },
      {
        q: "Can it replace our fingerprint machine entirely?",
        a: "On most factory sites yes, and many run both briefly during changeover. The existing machine can stay as a fallback while the camera log is verified against it for a couple of weeks.",
      },
      {
        q: "Does factory attendance integrate with payroll?",
        a: "Yes. Shifts, late marks, half days and overtime are computed from the same log and exported for payroll, which removes the retyping step where most attendance errors are actually introduced.",
      },
    ],
    related: ["biometric-attendance", "face-recognition-attendance-system", "factory-security"],
    insights: [
      "why-biometric-attendance-machines-fail-at-the-factory-gate",
      "fingerprint-attendance-system-why-it-fails",
      "face-recognition-attendance-vs-biometric-machine",
    ],
  },
  {
    slug: "attendance-system-for-warehouses",
    navLabel: "Warehouse attendance",
    primaryKeyword: "attendance system for warehouse",
    relatedKeywords: [
      "warehouse workforce attendance",
      "godown attendance system",
      "logistics attendance tracking",
      "warehouse shift attendance",
      "loading bay attendance",
    ],
    title:
      "Warehouse Attendance System — Track Shifts Across Every Bay | PGAK",
    description:
      "Warehouse attendance without a reader at one door: PGAK recognises staff on the cameras already covering your gates and bays, so pickers, loaders and contract crews are logged wherever they actually enter.",
    eyebrow: "Attendance · Logistics",
    h1: "Warehouse attendance that covers the loading bay, not just the office door",
    intro:
      "Warehouse attendance breaks in a specific way: the attendance machine is at the office entrance, but the people you most need to track come and go through loading bays and yard gates all day. PGAK marks warehouse attendance on the cameras already covering those openings, so pickers, loaders and contract crews are logged where they actually walk — and the same cameras keep watching your stock.",
    painPoints: [
      "Loaders enter through the bay, never past the office reader, so the log is fiction.",
      "Third-party logistics crews change constantly and are never enrolled in time.",
      "Night shift has nobody supervising the gate at all.",
      "You cannot reconcile who was on site against a shrinkage event.",
      "Two systems — one for attendance, one for cameras — and neither talks to the other.",
    ],
    sections: [
      {
        h2: "Why one reader cannot cover a warehouse",
        body: "A warehouse is not one door. It is an office entrance, two or three loading bays, a yard gate and often a separate driver entrance — each with different traffic and different people. Contact hardware forces you to choose which of them you pay to instrument.",
        points: [
          {
            h3: "The bays are where the workforce is",
            text: "Pickers and loaders spend their day at the dock. A reader at reception measures the people least relevant to your operation.",
          },
          {
            h3: "3PL and casual crews churn weekly",
            text: "By the time a temporary crew is enrolled on a machine, the contract has moved on.",
          },
          {
            h3: "Night shift has no supervision",
            text: "The hours you most need an objective record are the hours nobody is watching the gate.",
          },
        ],
      },
      {
        h2: "One estate for attendance and shrinkage",
        body: "The cameras that log attendance are the cameras watching stock movement. That overlap is the real advantage: when a discrepancy shows up in the morning, you can line up who was on site against what the bay camera saw, in the same system.",
        points: [
          {
            h3: "Every opening becomes a check-in point",
            text: "Bay, yard gate, office door — any camera with a usable view can log attendance.",
          },
          {
            h3: "Recognition at walking pace",
            text: "Nobody stops a trolley to punch in. Several people entering together are each logged separately.",
          },
          {
            h3: "Boundary alerts on the same feeds",
            text: "After-hours movement in the yard raises an alert on the same estate, so one subscription does both jobs.",
          },
        ],
      },
      {
        h2: "Honest constraints for a warehouse",
        body: "Bay cameras are often mounted high and angled for vehicles, which is excellent for loading oversight and poor for face recognition. Some repositioning is usually needed, and we identify exactly which cameras qualify during the free feasibility check. High-vis clothing and helmets are not a problem; anything covering the face is.",
      },
    ],
    stats: [
      { value: "Every bay", label: "attendance where staff actually enter" },
      { value: "One estate", label: "attendance and shrinkage on the same cameras" },
      { value: "Minutes", label: "to enrol a new 3PL crew" },
      { value: "Night shift", label: "objective record with nobody supervising" },
    ],
    faqs: [
      {
        q: "How do you track warehouse attendance across multiple loading bays?",
        a: "Any camera with a usable view of an opening can act as a check-in point, so bays, yard gates and office doors are all covered by the same system. There is no per-door hardware cost, which is what makes covering four openings practical rather than theoretical.",
      },
      {
        q: "Can it track third-party logistics or contract crews?",
        a: "Yes. Enrolment is a short face scan from a phone, so a new crew can be registered at the gate in minutes, and their records can be kept separate from permanent staff and purged when the contract ends.",
      },
      {
        q: "Does it help with warehouse shrinkage as well as attendance?",
        a: "That is the practical advantage of running both on one camera estate — you can align who was on site with what the bay cameras recorded. The same feeds also carry after-hours boundary alerts, so one system serves both purposes.",
      },
      {
        q: "What about drivers and visitors who are not employees?",
        a: "Unenrolled faces are logged as unknown rather than ignored, so you retain a record of movement without registering every visiting driver as staff.",
      },
      {
        q: "Do we need to replace our warehouse cameras?",
        a: "Rarely all of them. Bay cameras angled down at vehicles usually need repositioning before they can identify people, while most entrance cameras at normal height already qualify. The feasibility check tells you which is which before you commit.",
      },
    ],
    related: ["biometric-attendance", "ai-cctv-for-warehouses", "face-recognition-attendance-system"],
    insights: [
      "best-ai-cctv-camera-for-warehouses-india",
      "fingerprint-attendance-system-why-it-fails",
      "nobody-can-watch-120-camera-feeds",
    ],
  },
  {
    slug: "attendance-system-for-offices",
    navLabel: "Office attendance",
    primaryKeyword: "office attendance system",
    relatedKeywords: [
      "attendance machine for office",
      "office biometric machine",
      "employee attendance system",
      "staff attendance tracking",
      "office attendance software",
    ],
    title:
      "Office Attendance System Without a Machine at Reception | PGAK",
    description:
      "An office attendance system that removes the reception queue and the punching machine: face recognition on your existing entrance camera logs staff as they walk in, and feeds shifts and payroll directly.",
    eyebrow: "Attendance · Office",
    h1: "An office attendance system with nothing to touch at reception",
    intro:
      "An office attendance system should be invisible. Most are not — there is a machine at reception, a small queue at 9:30, and a monthly ritual of fixing missed punches before payroll. PGAK removes the device entirely: the camera already covering your entrance recognises staff as they walk in, writes a photo-backed record, and passes hours straight through to payroll.",
    painPoints: [
      "A visible punching machine at reception that sets the tone for every visitor who walks past it.",
      "Missed punches discovered on payroll day, corrected from memory.",
      "Staff who forget their card, or share it.",
      "Hybrid and field staff whose attendance nobody can reconcile.",
      "An attendance tool and a payroll tool that never quite agree.",
    ],
    sections: [
      {
        h2: "Why offices outgrow the punching machine",
        body: "Office attendance is rarely a queue problem — it is an accuracy and admin problem. The machine records punches; it does not record intent, exceptions, or who was actually in the building. Everything between the punch and payroll is done by a person, and that is where the errors live.",
        points: [
          {
            h3: "Missed punches become memory work",
            text: "Every forgotten punch is reconstructed weeks later by someone guessing. A photo-backed log removes the guessing.",
          },
          {
            h3: "Cards get shared, faces do not",
            text: "Card-based systems record the card, not the person. Recognition records the person and stores the frame.",
          },
          {
            h3: "The machine is a bad first impression",
            text: "A reception with a queue at a beige box is a small thing that says something about the company to every candidate and client walking through it.",
          },
        ],
      },
      {
        h2: "What replaces it",
        body: "The entrance camera you already have. Staff walk in normally, the log fills itself, and exceptions surface for review rather than being silently wrong.",
        points: [
          {
            h3: "Enrol from a phone in a minute",
            text: "No enrolment desk, no cards to print or replace.",
          },
          {
            h3: "Exceptions flagged, not buried",
            text: "An unrecognised entry is raised for an admin to resolve while the memory is fresh, not on payroll day.",
          },
          {
            h3: "Straight into shifts and payroll",
            text: "Late marks, half days and overtime derive from the same log, so the number that reaches payroll was never retyped.",
          },
        ],
      },
      {
        h2: "Where an office needs to be careful",
        body: "Offices are the easiest environment for recognition — controlled lighting, a single main entrance, faces at a predictable height — but they are also the environment where privacy expectations are highest. Under the DPDP Act, staff must be told what is collected and why, and retention should match payroll need. We recommend publishing that notice at rollout; it takes an afternoon and prevents every later objection.",
      },
    ],
    stats: [
      { value: "No device", label: "nothing at reception to touch or maintain" },
      { value: "Photo-backed", label: "every entry carries its frame" },
      { value: "Minute", label: "to enrol a new joiner from a phone" },
      { value: "Payroll-ready", label: "hours flow through without retyping" },
    ],
    faqs: [
      {
        q: "What is the best attendance system for an office?",
        a: "For most offices, software on the existing entrance camera beats a wall-mounted machine — it removes the reception queue, cannot be shared like a card, and produces a photo-backed record that ends payroll-day disputes. A conventional machine remains perfectly adequate for very small teams with one door.",
      },
      {
        q: "How much does an office attendance machine cost versus this?",
        a: "Office attendance machines commonly list between Rs 6,000 and Rs 15,000 per door, plus installation, attendance software and annual maintenance. Camera-based attendance has no per-door hardware at all; it is billed per camera per month and quoted per site.",
      },
      {
        q: "Can it handle hybrid or field staff?",
        a: "On-site presence is captured automatically by the entrance camera. Field and hybrid staff are handled through the mobile app rather than the camera, so both populations end up in one attendance record.",
      },
      {
        q: "What happens when someone is not recognised?",
        a: "The entry is flagged as an exception for an admin to confirm, and the enrolment photo can be improved at the same time. A miss costs a tap, not a wrong payslip.",
      },
      {
        q: "Is face-based office attendance legal in India?",
        a: "Yes, with disclosure and consent. Facial data is personal data under the DPDP Act, so employees must be told what is collected, why, and how long it is retained — a short internal notice at rollout covers the requirement.",
      },
    ],
    related: ["biometric-attendance", "face-recognition-attendance-system", "ai-cctv-for-offices"],
    insights: [
      "face-recognition-attendance-vs-biometric-machine",
      "biometric-attendance-machine-price-in-india",
      "is-ai-cctv-legal-in-india-dpdp-act",
    ],
  },
  {
    slug: "attendance-system-for-schools",
    navLabel: "School attendance",
    primaryKeyword: "attendance system for school",
    relatedKeywords: [
      "student attendance system",
      "school biometric attendance",
      "staff attendance for schools",
      "college attendance system",
      "automated attendance school",
    ],
    title:
      "School & College Attendance System — Staff and Campus | PGAK",
    description:
      "Attendance for schools and colleges without roll-call time: PGAK recognises staff on existing campus cameras, logs entry automatically, and keeps the same cameras watching gates and boundaries.",
    eyebrow: "Attendance · Education",
    h1: "School attendance that does not cost you the first ten minutes of the day",
    intro:
      "A school attendance system has two jobs that rarely sit in one place: knowing which staff are on campus, and knowing who came through the gate. PGAK handles both from the cameras already installed on your campus — staff attendance is logged automatically at the entrance, and the same estate watches gates and boundaries during school hours.",
    painPoints: [
      "Teaching staff attendance is a register in the principal's office, filled in from memory.",
      "Substitute and visiting faculty are never on the biometric system at all.",
      "The gate has a camera and a guard, and no record connecting them.",
      "Parents ask who was on campus during an incident and nobody can answer precisely.",
      "Any biometric touching students raises consent questions nobody wants to get wrong.",
    ],
    sections: [
      {
        h2: "Start with staff, be careful with students",
        body: "This is the most important design decision in education, and we lead with it: PGAK's attendance is built for staff. Applying facial recognition to minors carries consent, retention and safeguarding obligations that most schools should not take on lightly, and we will tell you that before selling you anything.",
        points: [
          {
            h3: "Staff attendance is the clear win",
            text: "Teaching and non-teaching staff, permanent and substitute, logged automatically at the campus entrance with a photo-backed record.",
          },
          {
            h3: "Students: presence, not identification",
            text: "Where schools need campus-level safety, boundary and gate alerts answer whether someone left the campus without identifying individual children.",
          },
          {
            h3: "Consent obligations are real",
            text: "Under the DPDP Act, processing children's data carries stricter requirements including verifiable parental consent. Any vendor who waves this away is a risk to you, not a shortcut.",
          },
        ],
      },
      {
        h2: "What the same cameras do beyond attendance",
        body: "Campuses already run cameras for safety. Adding intelligence to that estate is what turns them from a recording archive into something that tells a human, during the school day, when something needs attention.",
        points: [
          {
            h3: "Gate and boundary alerts",
            text: "Movement over a boundary wall out of hours, or at the gate during class time, raises an alert with a snapshot.",
          },
          {
            h3: "Substitute faculty enrolled in a minute",
            text: "A guided face scan from a phone, so a visiting teacher is on the record the same morning.",
          },
          {
            h3: "Camera health monitoring",
            text: "You are told when a campus camera goes dark, rather than discovering it when footage is needed.",
          },
        ],
      },
      {
        h2: "Deployment on a campus, honestly",
        body: "Campus entrances are usually good recognition environments; corridors and playgrounds usually are not, and we do not pretend otherwise. The feasibility check identifies which cameras support staff recognition and which are only useful for boundary and gate alerting — and we will recommend against any student-facing biometric deployment that your consent framework cannot properly support.",
      },
    ],
    stats: [
      { value: "Staff-first", label: "attendance designed for teaching and support staff" },
      { value: "Gate alerts", label: "boundary and out-of-hours movement" },
      { value: "Minute", label: "to enrol a substitute teacher" },
      { value: "DPDP-aware", label: "children's data handled with stricter consent" },
    ],
    faqs: [
      {
        q: "Can schools use face recognition for student attendance in India?",
        a: "Technically yes, but it should be approached with real caution. The DPDP Act imposes stricter obligations for processing children's data, including verifiable parental consent and limits on retention. PGAK's attendance is designed for staff; for students we recommend campus safety features such as gate and boundary alerts, which do not identify individual children.",
      },
      {
        q: "How does staff attendance work on a school campus?",
        a: "Teaching and non-teaching staff are enrolled once with a short face scan. The camera at the staff entrance logs each person as they arrive, with a timestamp and the frame it came from, and the record flows into monthly attendance and payroll.",
      },
      {
        q: "Can substitute or visiting faculty be added quickly?",
        a: "Yes — enrolment takes about a minute from a phone, so a substitute arriving in the morning is on the record before first period.",
      },
      {
        q: "What campus safety features run on the same cameras?",
        a: "Boundary crossing alerts, out-of-hours gate movement, and camera-offline warnings. These operate on presence and movement rather than identifying individual students.",
      },
      {
        q: "Do we need new cameras for a school deployment?",
        a: "Usually only at the staff entrance if there is not one already. Existing gate and perimeter cameras generally work as-is for boundary alerting, which is the bulk of campus safety value.",
      },
    ],
    related: ["school-security", "biometric-attendance", "face-recognition-attendance-system"],
    insights: [
      "is-ai-cctv-legal-in-india-dpdp-act",
      "where-to-place-cctv-cameras-for-ai-detection",
      "how-does-ai-intruder-detection-work",
    ],
  },
  {
    slug: "attendance-system-for-construction-sites",
    navLabel: "Construction attendance",
    primaryKeyword: "attendance system for construction site",
    relatedKeywords: [
      "labour attendance system",
      "site attendance for contractors",
      "construction workforce attendance",
      "daily wage attendance",
      "contractor attendance tracking",
    ],
    title:
      "Construction Site Attendance System for Daily-Wage Labour | PGAK",
    description:
      "Attendance for construction sites where the workforce changes daily: face recognition on a site camera logs labour at the gate, with no reader to install on a site that moves.",
    eyebrow: "Attendance · Construction",
    h1: "Construction attendance for a workforce that changes every week",
    intro:
      "Construction attendance is the hardest version of the problem: the workforce changes weekly, the hands are the worst possible case for fingerprint sensors, the site has no permanent structure to mount a machine on, and the whole thing relocates in six months. PGAK logs site attendance from a camera at the gate — enrolment takes a minute per worker, and nothing needs to be bolted to a wall that will not exist next year.",
    painPoints: [
      "Daily-wage labour turns over constantly and no biometric system keeps up.",
      "Site hands — cement, dust, cuts — are exactly the fingerprints readers reject.",
      "There is no permanent wall, power point or network to mount a reader on.",
      "The contractor's headcount and yours never match, and nobody can prove it.",
      "When the site moves, the hardware investment stays behind.",
    ],
    sections: [
      {
        h2: "Why fixed hardware loses on a construction site",
        body: "Every assumption a biometric machine makes — permanent mounting, stable power, a stable workforce, readable fingerprints — is false on a construction site. That is not a product flaw; it is the wrong tool for the environment.",
        points: [
          {
            h3: "The workforce is the churn",
            text: "A gang that arrives Monday and leaves Friday will never be properly enrolled on a device that takes admin time per person.",
          },
          {
            h3: "Site hands do not scan",
            text: "Cement, grit and cuts destroy ridge detail faster than any other trade. Failed scans become manual entries, and manual entries become disputes.",
          },
          {
            h3: "The site is temporary",
            text: "Hardware mounted, wired and maintained on a site with an eighteen-month life is money you write off at handover.",
          },
        ],
      },
      {
        h2: "What works instead",
        body: "A camera at the gate — often one you already run for site security — plus phone-based enrolment. The record is photo-backed, which matters more here than anywhere: labour payment disputes are the single most common friction on Indian sites, and a photograph ends them.",
        points: [
          {
            h3: "Enrol a gang in minutes",
            text: "Guided face scans from a phone at the gate on day one, with no office visit and no cards.",
          },
          {
            h3: "Contractor headcount you can verify",
            text: "Who was on site, when, with the frame to prove it — so billed headcount and actual headcount can finally be reconciled.",
          },
          {
            h3: "Moves with the site",
            text: "When the project ends, the cameras and the software relocate. Nothing is stranded in a wall.",
          },
        ],
      },
      {
        h2: "Practical limits on site",
        body: "Dust, glare and helmet shadow are real, and a gate camera pointed into afternoon sun will underperform. Placement matters more here than in any other vertical, which is why the free feasibility check is done against your actual gate rather than a brochure. Worker notice and consent under the DPDP Act apply to contract labour exactly as they do to permanent staff.",
      },
    ],
    stats: [
      { value: "Minutes", label: "to enrol an entire new gang" },
      { value: "No fixed hardware", label: "nothing bolted to a temporary site" },
      { value: "Photo-backed", label: "ends labour payment disputes" },
      { value: "Relocatable", label: "the system moves with the project" },
    ],
    faqs: [
      {
        q: "How do you track attendance for daily-wage construction labour?",
        a: "Workers are enrolled with a guided face scan from a phone at the gate — fast enough to register an entire gang on their first morning — and a camera at the entrance logs each person as they arrive. No cards, no reader, and no office enrolment step.",
      },
      {
        q: "Why do fingerprint systems fail on construction sites?",
        a: "Cement, grit, and cuts wear down fingerprint ridges faster than in any other trade, so scans fail routinely. Combined with weekly workforce churn and no permanent structure to mount a device on, contact hardware is a poor fit for the environment.",
      },
      {
        q: "Can it reconcile contractor-billed headcount against actual attendance?",
        a: "That is one of the main reasons sites adopt it. Each attendance record stores the frame it came from, so billed headcount can be checked against a photo-backed log of who actually passed the gate.",
      },
      {
        q: "What happens when the project finishes?",
        a: "The cameras and the software move to the next site. Because nothing is permanently installed as attendance hardware, there is no stranded investment at handover.",
      },
      {
        q: "Does it work in dust and strong sunlight?",
        a: "Placement decides this. A gate camera facing into direct afternoon sun will underperform, and dust reduces clarity over time. The feasibility check is done on your actual gate so you know the answer before committing rather than after.",
      },
    ],
    related: ["biometric-attendance", "attendance-system-for-factories", "smart-perimeter-protection"],
    insights: [
      "fingerprint-attendance-system-why-it-fails",
      "why-biometric-attendance-machines-fail-at-the-factory-gate",
      "biometric-attendance-machine-price-in-india",
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export const SOLUTION_SLUGS = SOLUTIONS.map((s) => s.slug);
