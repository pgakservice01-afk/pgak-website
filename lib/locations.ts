/**
 * Location landing pages at `/ai-cctv-{city-slug}`.
 *
 * ⚠️ Local SEO honesty rule: only publish a city page for a city you can
 * actually service. Thin, templated city pages for places you don't serve are
 * the classic doorway-page pattern and Google demotes them — and a customer
 * who books from one and can't be served costs more than the ranking is worth.
 *
 * The cities below reflect the dealer coverage described on the site. Remove
 * any you don't serve; add new ones only when a dealer is genuinely in place.
 * `hasOffice: true` means a physical presence — those get LocalBusiness
 * schema with an address. The rest get `areaServed` only, which is the
 * correct markup for a service area without a premises.
 */

export type Location = {
  slug: string;
  city: string;
  region: string;
  /** True only where PGAK has a physical premises. */
  hasOffice: boolean;
  /** Sectors that dominate this market — keeps each page genuinely different. */
  focus: string;
  intro: string;
  localContext: string[];
  nearby: string[];
  /** A use-case scenario set in this city (hub → spoke link). */
  caseStudy?: { href: string; label: string };
  /**
   * Where in this city the work actually is — named industrial areas, markets
   * or corridors, and the security pattern each one produces. This is local
   * geography and industry fact, never a claim about deployments we've done;
   * it exists so no two city pages read like the same page with the name
   * swapped.
   */
  localAreas?: { heading: string; text: string };
  /**
   * How attendance specifically breaks in this market. Grounded in the city's
   * real industry mix — never a claim about deployments we have done.
   */
  attendanceContext?: string;
  /**
   * Named sub-areas of the city, each with the security pattern that geography
   * produces. Rendered as H3s under `localAreas.heading`, so a page can say
   * something different about Basti Nau and about the Leather Complex instead
   * of one paragraph covering both.
   *
   * This is the main lever against near-duplicate city pages: measured
   * 2026-09-04, any two city pages shared ~53% of their ten-word phrases, and
   * Google had already clustered `/ai-cctv-jalandhar` as a duplicate with no
   * canonical of its own. Named local geography is the part no other page can
   * repeat.
   */
  areas?: { name: string; text: string }[];
  /**
   * City-specific FAQs. When present these REPLACE the generated set in
   * LocationPage (and the FAQPage schema with them), so the answers stop being
   * the same four sentences with the city name swapped.
   */
  faqs?: { q: string; a: string }[];
  /**
   * Which solution cards to show, as slugs from lib/solutions.ts. Omit to show
   * every solution — fine for a broad market, wrong for a city whose demand is
   * concentrated. A shorter, relevant list is both less boilerplate and a
   * better answer for the reader.
   */
  solutionSlugs?: string[];
};

export const LOCATIONS: Location[] = [
  {
    slug: "ludhiana",
    city: "Ludhiana",
    region: "Punjab",
    hasOffice: true,
    focus: "Hosiery, cycle parts, machine tools and distribution warehousing",
    attendanceContext:
      "Ludhiana's attendance problem is a shift-change problem. A hosiery unit off Chandigarh Road or a cycle-parts works in the Focal Point puts several hundred people through one gate inside ten minutes, and the hands on those lines are exactly the ones fingerprint readers reject: dye, oil and ridges worn flat by years of press work. Add contractor gangs that turn over weekly and migrant labour that arrives with the season, and the register in the supervisor's drawer quietly becomes the real record of who worked. Reading faces off the gate camera removes the queue and the failed scan together, and because it is the camera doing the work, the same gate that logs attendance is still watching the gate.",
    intro:
      "This is home. PGAK is built in Ludhiana, our office is on Gill Road, and the first sites we ever ran are still running here. That means something practical for a Ludhiana buyer: the survey, the installation and the fortnight of tuning afterwards are done by our own team, not passed to a partner. The city gives us two problems more than any other — attendance at gates too busy for a machine, and stock walking out of warehouses nobody can watch.",
    localContext: [
      "Hosiery and cycle-parts units where several hundred workers cross one gate in ten minutes and the biometric reader is the bottleneck.",
      "Distribution godowns with forty cameras already installed and nobody who can watch even one of them.",
      "Compound walls a kilometre long with a single guard, where the useful alert is a line crossed after the last shift.",
    ],
    nearby: ["Khanna", "Mandi Gobindgarh", "Jalandhar", "Moga"],
    solutionSlugs: [
      "factory-security",
      "ai-cctv-for-warehouses",
      "cctv-installation-company",
      "attendance-system-for-factories",
      "biometric-attendance",
      "smart-perimeter-protection",
    ],
    caseStudy: {
      href: "/insights/case-studies/warehouse-shrinkage-ludhiana",
      label: "How AI CCTV cuts shrinkage in a Ludhiana warehouse",
    },
    localAreas: {
      heading: "Where the risk sits in Ludhiana",
      text: "We drive these belts every week. Each one produces a different first configuration, and knowing which is which is most of what a survey is for.",
    },
    areas: [
      {
        name: "Focal Point, phases one to eight",
        text: "Large compounds, two and three shifts, and yards where raw material, scrap and finished goods are all stacked outdoors. The loss that hurts is rarely a break-in; it is material leaving on an authorised vehicle at an authorised hour. Number-plate logging at the gate turns that into a list somebody can reconcile against the dispatch register the next morning.",
      },
      {
        name: "Gill Road and the cycle-parts belt",
        text: "Our own doorstep. Dense workshops, mixed-age camera estates, and owners who want one thing to work before they will consider a second. The usual starting point here is the gate — attendance and a record of who entered — because it pays for itself in payroll accuracy before anyone argues about security.",
      },
      {
        name: "The Chandigarh Road hosiery belt",
        text: "Seasonal headcount that doubles for the winter order book, with the dyeing and finishing hands that defeat contact readers. Enrolment speed matters more than anything else here: twenty new faces added from a phone on the morning they start, and removed when the season ends.",
      },
      {
        name: "Dhandari Kalan and the GT Road godowns",
        text: "Freight, transhipment and long stretches of boundary wall next to open ground. Loading-bay activity outside booked dispatch hours and a boundary line along the rear wall are the two rules that earn their keep; interior aisle cameras come much later.",
      },
    ],
    faqs: [
      {
        q: "You are based in Ludhiana. Does that actually change anything for me?",
        a: "It changes who turns up. In Ludhiana the survey, the installation and the two weeks of tuning are done by our own team from the Gill Road office, and if something needs a person on site the person is in the same city. Everywhere else in India that work runs through a verified partner with us behind them. It also means we can look at your cameras before you commit to anything.",
      },
      {
        q: "Our gate has three hundred workers arriving in ten minutes. Will it keep up?",
        a: "That is the case it is built for, because there is no queue at all — nobody stops, nobody touches anything, people simply walk in and the camera reads faces as they pass. The limit is not throughput, it is camera placement: one camera at head height covering the walking line, rather than one mounted high on a pole looking at the tops of heads. The audit tells you which of yours qualify.",
      },
      {
        q: "We already have forty cameras in the godown. Do we replace them?",
        a: "No. If the DVR or NVR gives an RTSP stream, which nearly every recorder installed in the last decade does, the software runs on what is already there. In a forty-camera godown the honest answer is usually that six to eight of those cameras are worth making intelligent — the bays, the restricted aisles, the gate — and the rest stay as ordinary recording.",
      },
      {
        q: "Can it separate our own trucks from everyone else's?",
        a: "Yes, by number plate. You add your regular vehicles and contract carriers once, and after that a plate that is not on the list arriving at eleven at night is an alert, while your own tempo on its usual run is not. That distinction is what makes gate logging useful rather than noisy.",
      },
      {
        q: "Winter doubles our headcount. Is enrolment going to eat our supervisor's week?",
        a: "It should take a minute a person, done at the gate from a phone, which is why the hosiery units here care about it. There is no enrolment machine to queue at and no fingerprint to re-take when it fails. When the season ends you remove them just as quickly, and the payroll record for the period stays intact.",
      },
    ],
  },
  {
    slug: "jalandhar",
    city: "Jalandhar",
    region: "Punjab",
    hasOffice: false,
    focus: "Sports goods, hand tools, surgical instruments and leather",
    attendanceContext:
      "Jalandhar pays by the piece. A sports-goods unit stitching footballs, a forging shop turning out spanners, a leather works cutting uppers — all of them settle wages against output and hours together, and most run a core staff alongside job-work hands who come and go with the order book. That is the exact combination fingerprint readers handle worst. Forging and buffing leave ridges worn flat, tanning chemicals and adhesives coat the fingertips, and a reader that rejects one worker in six turns the gate into an argument at shift change. Reading faces off the entrance camera removes the device and the queue together, and a job-work hand can be enrolled from a phone in under a minute on the morning they start rather than waiting for the supervisor with the enrolment machine.",
    intro:
      "Jalandhar is an export town, and the security problem here follows the money: finished goods worth lakhs sitting in a small store beside a busy production floor, in a building where three families have worked for two generations and nobody thinks to lock the internal door. Add the Doaba pattern of houses standing empty for months while the owners are abroad, and the city needs two different kinds of alert. It is a short run up the GT Road from our Ludhiana base, which puts it on the regular installation and support circuit.",
    localContext: [
      "Export houses where a finished-goods store worth lakhs sits behind a single latch, and the camera watching it is never actually watched.",
      "Gates where staff, job-work loaders and buyers arrive in the same ten minutes, and the register cannot tell one from another.",
      "Locked family houses in the Doaba belt that need an alert the family can act on from Vancouver or Milan, not footage to review later.",
    ],
    nearby: ["Ludhiana", "Hoshiarpur", "Amritsar", "Batala"],
    solutionSlugs: [
      "factory-security",
      "ai-cctv-for-warehouses",
      "residential-security",
      "smart-perimeter-protection",
      "biometric-attendance",
      "attendance-system-for-factories",
    ],
    localAreas: {
      heading: "Where the risk sits in Jalandhar",
      text: "Four belts, four different problems. The pattern below is geography and industry, not a claim about work we have done here.",
    },
    areas: [
      {
        name: "Basti Nau and the sports-goods cluster",
        text: "Small multi-storey units with production on one floor and finished stock on another, connected by a common stair that suppliers, job-workers and family all use. Nothing here needs a perimeter alarm; what it needs is a camera that knows the difference between a face it has seen for eleven years and a face it has never seen, and that says so while the person is still on the stair.",
      },
      {
        name: "Focal Point and the forging shops",
        text: "Larger compounds, machinery running two shifts, scrap and finished tools both stacked in the open yard. The theft that hurts is not dramatic — it is material walking out with a legitimate vehicle at a legitimate hour. Number-plate logging at the gate turns that into a record somebody can check against the dispatch book.",
      },
      {
        name: "The Leather Complex on Kapurthala Road",
        text: "Chemical processes, wet floors, and workers whose hands rule out any contact sensor. Attendance and hygiene-zone access are the live questions here, and both run off cameras that are usually already mounted at the entrance.",
      },
      {
        name: "Rainak Bazaar and the old-city wholesale",
        text: "Shutters down at eight, deliveries at six, and a lane too narrow for anyone to see the far end. After-hours shutter activity is the alert that matters, and it has to reach a phone rather than sound a siren in a residential lane.",
      },
    ],
    faqs: [
      {
        q: "Will this work on the DVRs already in Jalandhar's older factory buildings?",
        a: "Usually yes. Most units here run Hikvision, CP Plus or Dahua recorders installed in the last decade, and any of those will hand over an RTSP stream, which is all PGAK needs. The genuine question is camera placement, not camera brand: a camera aimed down a stairwell from ceiling height sees the tops of heads, and no software recovers a face from that. The free audit tells you which of your existing cameras are usable for recognition and which are only good for general recording, before you spend anything.",
      },
      {
        q: "Our workers change with the order book. How fast can we add someone?",
        a: "Under a minute, from a phone, at the gate. That matters more in Jalandhar than raw speed at the reader, because a sports-goods or hand-tool unit taking on twenty job-work hands for a shipment cannot spare the supervisor for an afternoon of enrolments. Removing someone is just as quick when the order finishes.",
      },
      {
        q: "Can it watch the finished-goods store without a person watching the screen?",
        a: "That is the point of it. You mark the store as a restricted zone with the hours it should be empty, and anyone entering outside those hours puts an alert on your phone with the clip attached. Nobody has to sit in front of a wall of feeds, which is what makes it different from the DVR you already own.",
      },
      {
        q: "We are abroad for months. Can the family in Canada get the alert?",
        a: "Yes. Alerts go to whichever phones you add to the account, in any country, with the clip attached. For a locked house in the Doaba belt the useful configuration is a boundary line rather than motion detection, so a stray dog or a passing bike does not wake anyone at three in the morning but a person crossing the wall does.",
      },
      {
        q: "Who installs and supports it in Jalandhar?",
        a: "A verified partner covering the Jalandhar belt, with our Ludhiana team behind them for anything that needs escalation. Every deployment follows the same order regardless of who turns up: free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your real footage. The tuning is what decides whether the alerts stay switched on.",
      },
    ],
  },
  {
    slug: "amritsar",
    city: "Amritsar",
    region: "Punjab",
    hasOffice: false,
    focus: "Wholesale markets, hotels and food processing",
    attendanceContext:
      "Amritsar's attendance problem is a rota problem, not a queue problem. A hotel near the walled city runs housekeeping, kitchen, front desk and security on four different clocks, none of which start at nine, and staff turnover in kitchens and housekeeping is high enough that the enrolment burden matters more than throughput. Food units add a second obstacle: where hygiene rules put workers in gloves, a fingerprint reader is not merely inaccurate, it is something a food-safety auditor will ask about. Reading faces off the door camera sidesteps both. Hotel entrances are usually already fitted with cameras at a sensible height for recognition, because they were installed to see arrivals in the first place.",
    intro:
      "Trade and hospitality run this city, and both keep their doors open long after the accounts close. Wholesale cloth, dry fruit and jewellery move through the walled-city katras all day on trust and memory; hotels and guest houses on the approaches to Harmandir Sahib turn over guests around the clock. The shared gap is simple. Everything is on camera, and nobody can say who came in after closing until somebody counts the stock and finds it short.",
    localContext: [
      "Katra shops and godowns where the shortfall is discovered at stock-taking, weeks after the night it walked out.",
      "Hotels that need entrances, corridors and back-of-house covered without pointing anything intrusive at guests.",
      "Food units where the same cameras have to answer a hygiene audit by day and an intrusion question at night.",
    ],
    nearby: ["Batala", "Jalandhar", "Ludhiana"],
    solutionSlugs: [
      "retail-shop-security",
      "ai-cctv-for-warehouses",
      "ai-intruder-detection",
      "hospital-security",
      "face-recognition-attendance-system",
      "attendance-system-for-offices",
    ],
    localAreas: {
      heading: "Where the risk sits in Amritsar",
      text: "The city's risk is unusually concentrated by trade. Four pockets, four different asks — geography and industry, not a claim about deployments here.",
    },
    areas: [
      {
        name: "Hall Bazaar, Guru Bazaar and the katras",
        text: "Dense lanes, shutters within arm's reach of each other, and stock values that would surprise anyone judging by the frontage. Jewellery and cloth traders here rarely want a siren, because a false alarm in a crowded katra costs more goodwill than the risk it prevents. What works is a quiet after-hours line across the shutter and the lane in front of it, sent to two phones.",
      },
      {
        name: "The hotel belt around Heritage Street",
        text: "Guests at every hour, luggage moving constantly, and a staff door that is propped open half the night. The valuable alerts are back-of-house: the store room, the linen room, the roof access. Anything aimed at guest areas has to be discreet by design, which in practice means a manager's phone rather than a lobby alarm, and no recognition in corridors.",
      },
      {
        name: "Majitha Road and the Chheharta industrial pockets",
        text: "Papad, wadiyan, spice and cold-storage units with wide compounds and long night gaps between the last dispatch and the first shift. Boundary alerts at the wall and vehicle logging at the gate cover both the theft question and the who-came-in-with-that-truck question.",
      },
      {
        name: "The bypass and the Attari trade road",
        text: "Transport yards and warehousing serving cross-border and regional trade, where the load is on the vehicle far longer than it is in the building. Number-plate recognition at the gate is worth more here than any camera inside the shed.",
      },
    ],
    faqs: [
      {
        q: "Will this identify guests in our hotel?",
        a: "No, and it should not. The sensible configuration for a hotel in Amritsar puts recognition only on staff entrances and back-of-house doors, with guest corridors either left on ordinary recording or covered by movement rules that flag a door opening at an odd hour without identifying anyone. That distinction is set during the audit, before anything is switched on, and it is written into how the site is configured rather than left to policy.",
      },
      {
        q: "Our shop is in a narrow katra. Will it call the alarm every time somebody walks past?",
        a: "Not if the line is drawn properly. Instead of motion across the whole frame, a boundary is drawn at your shutter and the strip immediately in front of it, active only in the hours you are closed. Passers-by in the lane do not cross it. Someone standing at your shutter at two in the morning does, and that goes to your phone with the clip attached.",
      },
      {
        q: "We handle food. Does anything have to touch the workers' hands?",
        a: "Nothing. That is the practical argument for camera-based attendance in a food unit: there is no shared surface at the entrance at all, which removes both the hygiene objection and the auditor's question about a contact device in a production area. Workers walk in and the entrance camera does the rest.",
      },
      {
        q: "The market is busiest during the pilgrimage season. Does that break the counting?",
        a: "Footfall counting stays reliable at crowd density; recognition is the part that degrades when a doorway is packed, because faces are obscured by other people. For a trading business the honest answer is that the after-hours alerting is the dependable half, and the daytime counting is useful for staffing decisions rather than for security.",
      },
      {
        q: "Who covers Amritsar, and how long does it take?",
        a: "A verified partner covering the Amritsar and Batala belt handles installation and support, with our Ludhiana team behind them. Most sites are live within a day of the survey. The fortnight after that is tuning against your own footage, and skipping it is the single most common reason people end up muting their own alerts.",
      },
    ],
  },
  {
    slug: "chandigarh-mohali",
    city: "Chandigarh & Mohali",
    region: "Punjab / Chandigarh",
    hasOffice: false,
    focus: "Corporate offices, IT parks, showrooms and the Zirakpur warehousing corridor",
    attendanceContext:
      "The tricity does not have a queue at the gate; it has an accuracy problem and an appearance problem. A punching machine bolted to the wall is the first thing a client sees walking into a Mohali office, and the missed punches it generates surface on payroll day as a hundred small corrections somebody has to approve by hand. There is a second workforce nobody enrols properly: the housekeeping, security and cafeteria staff supplied by contractors, whose hours are billed to the company on the contractor's word. Attendance read from the entrance camera covers both populations from the same hardware, with nothing at reception, and the same approach works at a Zirakpur loading bay where the shift starts outdoors.",
    intro:
      "Three cities, three different asks, one contiguous market. Corporate and IT offices across Chandigarh and Mohali want card-free attendance and a record of who entered which room. Showrooms on the main sector roads care about displayed stock after closing and footfall while open. The Zirakpur and Dera Bassi corridor, which now handles a large share of the region's e-commerce and distribution volume, cares about vehicles and loading bays. All three are within a couple of hours of our Ludhiana base.",
    localContext: [
      "Offices retiring the reception punching machine in favour of recognition at the door, with no queue and no buddy-punching.",
      "Showrooms where the same cameras have to count daytime footfall and hold the line after the shutter comes down.",
      "Warehouses on the Zirakpur corridor where the useful record is the number plate at the gate, not the guard's register.",
    ],
    nearby: ["Ludhiana", "Patiala", "Khanna"],
    solutionSlugs: [
      "ai-cctv-for-offices",
      "retail-shop-security",
      "ai-cctv-for-warehouses",
      "attendance-system-for-offices",
      "face-recognition-attendance-system",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits across the tricity",
      text: "The three sub-markets barely overlap, and a configuration that suits one is wrong for the others. Geography and industry, not a claim about deployments here.",
    },
    areas: [
      {
        name: "Chandigarh sectors and Madhya Marg showrooms",
        text: "Glass frontages, high-value display stock and a service lane behind. The daytime question is footfall and dwell time by section, which is a merchandising answer as much as a security one. The night question is the rear service door, which is where the shutter is thinnest and the street is emptiest.",
      },
      {
        name: "Mohali IT City, Phase 8 and the Rajiv Gandhi IT Park",
        text: "Multi-tenant buildings, several entrances, and a permanent flow of visitors, delivery riders and contract staff who are not on anyone's payroll system. Recognition at the main door plus restricted-room logging for server rooms and record stores answers both the attendance question and the audit question, without a device at reception.",
      },
      {
        name: "The Zirakpur, VIP Road and Dera Bassi corridor",
        text: "Warehousing and last-mile hubs where the goods spend most of their life on a vehicle. Number-plate logging at the gate, loading-bay activity outside scheduled hours, and a boundary line along the yard wall are the three configurations that do the work here; interior cameras matter much less.",
      },
      {
        name: "Kharar, New Chandigarh and the Mohali societies",
        text: "Gated residential with a guard cabin, a boom barrier and a paper visitor register nobody can read a week later. Resident vehicles recognised automatically and visitors photo-logged at entry replaces the register with something searchable, and the RWA gets a record it can actually produce when asked.",
      },
    ],
    faqs: [
      {
        q: "Can we take the punching machine off the reception wall entirely?",
        a: "Yes, and for most tricity offices that is the reason they call. Attendance is read from a camera at the entrance, so there is no device, no queue at half past nine and nothing for a visitor to look at. Staff walk in as normal. The record is a timestamped entry with a face image attached, which also settles the disputes a card system cannot, because a card can be handed to a colleague and a face cannot.",
      },
      {
        q: "How does it handle contractor staff we do not employ directly?",
        a: "The same way as employees, in a separate group. Housekeeping, security and cafeteria staff are enrolled once and their hours are recorded independently of what the contractor invoices, which is usually the first time a company can check one against the other. Access can be limited to the floors and hours their contract actually covers.",
      },
      {
        q: "Our building has three entrances and two tenants. Is that a problem?",
        a: "No, it is the ordinary case here. Each entrance is a camera, and each tenant is a separate account with its own people and its own alerts, so neither sees the other's data. What matters at survey time is that at least one camera per entrance is mounted at a height where it sees faces rather than the tops of heads.",
      },
      {
        q: "For the Zirakpur warehouse, what actually gets flagged?",
        a: "Three things, in order of how often they earn their keep: a vehicle entering or leaving outside scheduled hours with its number plate logged, movement in a loading bay when no dispatch is booked, and anyone crossing the yard boundary after the last shift. Interior aisle coverage is usually the last thing to switch on, not the first.",
      },
      {
        q: "Who handles the tricity, and does the Chandigarh location complicate anything?",
        a: "A verified partner covers Chandigarh, Mohali, Zirakpur and Panchkula, with our Ludhiana team behind them. The union-territory boundary makes no difference to the deployment. What does make a difference is that many tricity buildings are leased, so it is worth confirming with the landlord that you may add software to the existing camera system before the survey. In almost every case there is nothing to add physically at all.",
      },
    ],
  },
  {
    slug: "patiala",
    city: "Patiala",
    region: "Punjab",
    hasOffice: false,
    focus: "University campuses, agri-machinery works and large residential kothis",
    attendanceContext:
      "Patiala has two workforces that break attendance in opposite directions. Education campuses run hundreds of staff plus contracted housekeeping, security and mess workers whose hours are billed by an agency rather than recorded by the institution, and a card system there is only ever as honest as the person carrying the card. Agri-machinery and foundry units on the Rajpura side have the opposite problem: grease and metal dust on every hand at the gate. Camera-based attendance covers both from equipment already mounted at entrances, and for a campus it does something a reader cannot — the same footage answers who was in the block at the time, which is the question that actually gets asked after an incident.",
    intro:
      "Patiala is a campus city with an industrial edge and a lot of very large houses. Punjabi University and Thapar bring thousands of students and a contracted workforce nobody has an accurate roll for; the agri-machinery and tractor-parts works out towards Rajpura bring gates covered in grease; and the kothis of Model Town and Urban Estate bring a quieter problem, which is a big property, a boundary wall and one guard who cannot see the far corner.",
    localContext: [
      "Campuses with a contracted housekeeping and security workforce whose hours are billed on an agency's word.",
      "Agri-machinery and foundry gates where every hand is greased and no contact reader survives the season.",
      "Large residential plots where the wall is long, the guard is one, and the family is often away.",
    ],
    nearby: ["Ludhiana", "Khanna", "Chandigarh & Mohali"],
    solutionSlugs: [
      "school-security",
      "residential-security",
      "factory-security",
      "attendance-system-for-schools",
      "face-recognition-attendance-system",
      "smart-perimeter-protection",
    ],
    localAreas: {
      heading: "Where the risk sits in Patiala",
      text: "Three quite different markets inside one small city, and a configuration that suits one is wrong for the others.",
    },
    areas: [
      {
        name: "The university and college belt",
        text: "Multiple gates, a perimeter that students treat as a suggestion, and hostel blocks with their own entrances. The useful configuration is rarely recognition everywhere — it is staff attendance at the main gates, restricted-area alerts on labs and record rooms, and after-hours boundary lines on the sections of wall students actually use.",
      },
      {
        name: "The Rajpura road industrial stretch",
        text: "Agri-machinery, tractor parts and foundry work, with material yards open to the road and night shifts that run thin. Gate attendance for a greasy-handed workforce and a boundary line along the yard are the two things that get switched on first here.",
      },
      {
        name: "Model Town, Urban Estate and the kothi belt",
        text: "Big plots, high walls, gates that stay open through the day for staff and deliveries, and owners who travel. What works is a boundary that only counts people, so the alert is not triggered by a dog or a passing scooter, and a phone alert with the clip attached rather than a siren that annoys the neighbours.",
      },
      {
        name: "The old city and Adalat Bazaar",
        text: "Narrow trading lanes with shutters facing each other and vehicle access that stops well short of most shops. After-hours shutter activity is the alert that matters, and it has to go to a phone quietly, because a siren in a lane like this brings a crowd before it brings help.",
      },
    ],
    faqs: [
      {
        q: "Can a campus use this without putting recognition on students?",
        a: "Yes, and most should. The sensible split is recognition on staff and contractor entrances only, with student-facing areas covered by movement and boundary rules that flag an event without identifying anybody. Where the institution does want student attendance, that is a separate decision with its own consent requirements, and it is configured deliberately rather than switched on by default.",
      },
      {
        q: "Our housekeeping and security staff come through an agency. Can we check their hours?",
        a: "That is one of the strongest reasons a campus here adopts it. Agency staff are enrolled as their own group and their entry and exit times are recorded independently of what the agency invoices. It is usually the first time an institution can put its own record beside the bill, and the difference between the two tends to be the whole business case.",
      },
      {
        q: "Will grease and metal dust stop it working at a machinery unit?",
        a: "No, because nothing is touched. The failure mode of a fingerprint reader is a worn or coated fingertip; a camera reading a face at the gate is indifferent to what is on the worker's hands. What does matter is light — a gate that is backlit at dawn needs the camera repositioned or a second one added, and the audit flags exactly that.",
      },
      {
        q: "My house has a long boundary wall and I am away for months. What do I actually get?",
        a: "A line drawn on the wall in the software, active in the hours you choose, that alerts only when a person crosses it. Not a dog, not a bike passing in the street, not a branch moving. The alert reaches whichever phones you add to the account, in any country, with the clip attached, so somebody local can be sent to look.",
      },
      {
        q: "Who handles Patiala, and how far is support?",
        a: "A verified partner covering the Patiala and Rajpura belt, with our Ludhiana team about two hours away for anything that needs escalating. The sequence is the same everywhere: free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your own footage.",
      },
    ],
  },
  {
    slug: "bathinda",
    city: "Bathinda",
    region: "Punjab",
    hasOffice: false,
    focus: "Cotton ginning, grain and fuel trade, and refinery-belt contracting",
    attendanceContext:
      "Bathinda's workforce is seasonal and contracted, which makes attendance a billing question before it is an HR one. A ginning factory staffs up for the cotton arrival and empties out again; refinery-belt contractors move crews between sites week to week; grain-market labour is engaged by the day. In all three cases somebody is paying against a headcount they cannot verify, and a fingerprint reader in a cotton shed collects lint until it stops reading at all. Attendance taken from the gate camera survives the dust, enrols a new crew in about a minute a head, and produces a record with a face image attached that settles a contractor's invoice without an argument.",
    intro:
      "Bathinda trades in things that are cheap by the kilo and expensive by the truckload — cotton, grain, fuel, fertiliser. The security problem follows that shape: wide open compounds rather than locked rooms, value sitting in the yard rather than in a safe, and losses that are noticed at weighment rather than at the door. Add a contracted workforce that changes with the season and the questions become who came in, with which vehicle, and were they on the payroll at all.",
    localContext: [
      "Ginning and cotton yards where stock sits in the open and the fence line is longer than any guard can walk.",
      "Grain and fertiliser godowns where the shortfall shows up on the weighbridge, days after the night it left.",
      "Contractor crews for the refinery and thermal belt, billed by headcount nobody independently counts.",
    ],
    nearby: ["Moga", "Ludhiana", "Khanna"],
    solutionSlugs: [
      "ai-cctv-for-warehouses",
      "smart-perimeter-protection",
      "factory-security",
      "ai-intruder-detection",
      "attendance-system-for-construction-sites",
      "biometric-attendance",
    ],
    localAreas: {
      heading: "Where the risk sits in Bathinda",
      text: "Almost everything of value here sits outdoors, which pushes the useful configuration to the boundary and the gate rather than the building.",
    },
    areas: [
      {
        name: "The cotton and ginning belt",
        text: "Bales stacked in open yards, lint in the air, and a season that compresses the whole year's risk into a few months. Cameras here need boundary rules rather than motion detection, because wind-blown lint and moving tarpaulin will trigger anything cruder every few minutes until somebody switches the alerts off for good.",
      },
      {
        name: "The grain market and the godown line",
        text: "Vehicles all day, labour engaged by the day, and stock that is counted by weight rather than by item. Number-plate logging at the gate and loading activity outside booked hours are the two records that let a trader reconcile a shortfall to a night instead of to a week.",
      },
      {
        name: "The refinery and thermal contracting belt",
        text: "Crews that move between sites, gates that open before dawn, and safety rules that make a shared contact device awkward. Attendance from the gate camera gives the contractor and the client the same number, which is usually the point of contention.",
      },
      {
        name: "Mansa Road and the Goniana Road trade line",
        text: "Traders' shops and small warehouses along the arterial roads, shuttered overnight with no one nearby. A line across the shutter and the strip in front of it, active only after closing, is the whole configuration most of these sites need.",
      },
    ],
    faqs: [
      {
        q: "Cotton lint and dust destroy our fingerprint machine every season. Will a camera survive it?",
        a: "The camera is not touched by any of it, which is the point — no shared surface, nothing to clog. What dust does affect is the lens over months, so a ginning yard should expect to wipe the entrance camera the way it already wipes everything else. That is a cleaning routine, not a failure mode, and it does not stop recognition working in the meantime.",
      },
      {
        q: "Our yard is huge and open. Will it alert every time a tarpaulin moves?",
        a: "Not if it is set up as a boundary rather than as motion detection. The software is looking for a person crossing a line you draw, not for pixels changing, so wind, lint, birds and moving covers do not trigger it. That distinction is the single biggest reason people keep the alerts switched on rather than muting them in week three.",
      },
      {
        q: "We pay contractors by headcount. Can we verify what they bill?",
        a: "Yes. Contractor crews are enrolled as their own group, and their entry and exit times are recorded independently, with a face image on each entry. When the invoice arrives you have your own count to put beside it. Most sites find the gap in the first month covers the cost of the whole deployment.",
      },
      {
        q: "Can it tell our own trucks from a stranger's at the gate?",
        a: "By number plate, yes. Regular vehicles and contract carriers are added once, and after that an unlisted plate arriving outside working hours is an alert while your own vehicles on their usual runs are not. For a grain or fertiliser yard that single rule is often the whole reason to start.",
      },
      {
        q: "Who covers Bathinda?",
        a: "A verified partner for the Bathinda and Mansa belt, with our Ludhiana team behind them. The order of work does not change: free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your real footage before anyone decides it is finished.",
      },
    ],
  },
  {
    slug: "mandi-gobindgarh",
    city: "Mandi Gobindgarh",
    region: "Punjab",
    hasOffice: false,
    focus: "Induction furnaces, rolling mills and the scrap trade",
    attendanceContext:
      "Steel town attendance is a round-the-clock problem. Furnaces do not stop, so the gate turns over three times a day including once in the middle of the night, and the crews are heavily contracted. Heat, scale and gloves make a contact reader both unreliable and unsafe to queue at when men are coming off a hot floor. Because the camera reads faces as people walk through, the night change is recorded as accurately as the morning one, and a supervisor is not standing at a machine at two in the morning ticking names. For a unit paying contractor crews by shift, that record with a face image attached is the difference between an invoice you accept and one you can check.",
    intro:
      "Mandi Gobindgarh is a furnace town, and it runs at night as hard as it runs by day. The value here is not in a locked store — it is scrap in the yard, billets on the floor and finished sections stacked outside, all of it heavy, all of it saleable, and most of it leaving legitimately on a truck at some point. That makes the gate the whole story: which vehicle, whose crew, and at what hour.",
    localContext: [
      "Scrap yards where the stock is measured by weight and a single load leaving unrecorded is a real number.",
      "Furnace and rolling units running three shifts, with the middle-of-the-night change the least supervised.",
      "Long compound walls next to open ground, where the boundary is the only line worth watching after dark.",
    ],
    nearby: ["Khanna", "Ludhiana", "Patiala"],
    solutionSlugs: [
      "factory-security",
      "smart-perimeter-protection",
      "ai-cctv-for-warehouses",
      "attendance-system-for-factories",
      "biometric-attendance",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits in Mandi Gobindgarh",
      text: "One industry, four positions within it, and the configuration changes at each.",
    },
    areas: [
      {
        name: "The scrap markets and yards",
        text: "Material arriving and leaving all day on mixed vehicles, with weighment as the only real control. Number-plate logging at the gate paired with the weighbridge record is what turns a suspicion into a specific night and a specific truck.",
      },
      {
        name: "The furnace and rolling-mill compounds",
        text: "Hot floors, three shifts, and gates that never fully close. Attendance at the gate matters more than interior coverage, and the after-hours question is usually the finished-goods yard rather than the shed.",
      },
      {
        name: "The Amloh and Bassi Pathana road units",
        text: "Smaller works strung along the approach roads, often with a single guard and a wall backing onto fields. A boundary line along the rear, active from the end of the last shift, does more here than any number of cameras pointed at the machinery.",
      },
      {
        name: "The GT Road transport line",
        text: "Loading, parking and transhipment along the highway, where a vehicle can stand for hours without anyone recording why. Vehicle logging and loading-bay rules outside booked hours are the two that pay.",
      },
    ],
    faqs: [
      {
        q: "Our gate runs three shifts including a night change. Does it work in the dark?",
        a: "It works wherever the camera can see a face, which at night means the gate needs usable light — not floodlighting, but enough that a person is recognisable on the existing feed. Many gates here already have that because of the vehicle traffic. Where a gate is genuinely dark, the audit says so and the fix is a lamp, not a new camera system.",
      },
      {
        q: "Heat and scale kill everything we mount near the floor. Where does the camera go?",
        a: "Nowhere near the floor. Attendance is read at the personnel gate, not inside the shed, and vehicle logging sits at the main gate. The hot areas are usually left on ordinary recording, because the questions worth answering with AI here are about the boundary and the gate rather than about the furnace.",
      },
      {
        q: "Can it record which crew was on when a load went out?",
        a: "Yes, and that pairing is the useful part. The vehicle log gives you the plate and the time, the gate attendance gives you which crew was on shift at that time, and both sit in the same record. Reconciling a dispatch against those two takes minutes instead of an afternoon of scrubbing footage.",
      },
      {
        q: "Most of our labour is contracted and changes constantly. Is enrolment realistic?",
        a: "About a minute a person, from a phone, at the gate. That is the only way it works in a town where crews change weekly. Removing someone is just as fast, and the attendance record for the period they worked stays intact for the payroll dispute that comes later.",
      },
      {
        q: "Who supports it here?",
        a: "A verified partner covering the Mandi Gobindgarh and Khanna belt, with our Ludhiana team an hour away. Free camera audit first, then software on the cameras you already own, then two weeks of tuning against your own footage — the tuning is what stops the alerts becoming noise.",
      },
    ],
  },
  {
    slug: "khanna",
    city: "Khanna",
    region: "Punjab",
    hasOffice: false,
    focus: "Grain mandi trade, rice shellers and highway godowns",
    attendanceContext:
      "Khanna's labour arrives with the crop. A sheller that runs a skeleton crew for half the year takes on dozens of hands for the milling season, engaged through a thekedar and paid against days worked. Nobody is going to enrol that on a fingerprint machine, and grain dust would defeat it if they tried. Attendance from the gate camera handles the surge because enrolling a new hand takes about a minute from a phone, and it produces a day-by-day record with a face image attached — which is precisely the document that settles the seasonal wage argument that arrives at the end of every milling run.",
    intro:
      "Khanna lives off one of the largest grain markets in Asia, and everything else here is shaped by it: shellers, godowns, weighbridges and a highway lined with storage. The stock is bulk, the value is in the aggregate rather than the item, and the losses show up as a discrepancy on a weighment slip rather than as a break-in. The questions worth answering are about vehicles at the gate and activity in the yard after the mandi closes.",
    localContext: [
      "Shellers and godowns where a shortfall appears on the weighbridge and nobody can say which night it happened.",
      "Seasonal milling crews engaged through contractors, paid against days that were never independently counted.",
      "Highway storage with long fence lines and no neighbours after dark.",
    ],
    nearby: ["Ludhiana", "Mandi Gobindgarh", "Patiala"],
    solutionSlugs: [
      "ai-cctv-for-warehouses",
      "smart-perimeter-protection",
      "factory-security",
      "attendance-system-for-warehouses",
      "biometric-attendance",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits in Khanna",
      text: "The mandi sets the rhythm and everything else follows it, including when the risk is highest.",
    },
    areas: [
      {
        name: "The grain market and its approach roads",
        text: "Vehicles queueing, labour engaged by the day, and stock changing hands faster than any register keeps up with. Gate logging by number plate is the one record that survives a busy arrival day and is still readable a month later.",
      },
      {
        name: "The rice shellers",
        text: "Dust everywhere, a seasonal crew several times the size of the permanent one, and machinery running long hours. Attendance at the personnel gate and a boundary line around the drying yard cover the two questions that actually get asked.",
      },
      {
        name: "The GT Road godown line",
        text: "Storage strung along the highway with fields behind and nobody within earshot after dark. The boundary is the whole security perimeter, and a line drawn along the rear wall from the end of the working day does more than any interior camera.",
      },
      {
        name: "The Samrala and Payal road cold stores",
        text: "Cold storage with restricted chambers, controlled access and a small permanent staff. Restricted-area logging matters here in a way it does not in an open godown, because the chamber door is the only real control point.",
      },
    ],
    faqs: [
      {
        q: "Grain dust wrecks our attendance machine every season. Is a camera any better?",
        a: "Nothing is touched, so there is no surface to clog and no reader to fail on a dusty hand. The practical maintenance is wiping the entrance camera lens occasionally, which is a two-minute job rather than a service call. Recognition keeps working in the meantime.",
      },
      {
        q: "Our crew size triples for the milling season. How fast can we enrol them?",
        a: "About a minute a head, at the gate, from a phone, on the morning they start. That is the only enrolment model that survives a seasonal surge. When the season ends you remove them in seconds, and their day-by-day record stays available for the wage settlement afterwards.",
      },
      {
        q: "Can it tell me which truck was here when the weight did not match?",
        a: "That is the strongest reason to put it on the gate. Every vehicle entry and exit is logged with the plate and the time, so a discrepancy on a weighment slip can be narrowed to the vehicles present in that window instead of to a whole week of footage. Pairing that with loading-bay activity outside booked hours usually answers it outright.",
      },
      {
        q: "Fields back onto our godown. Will animals set off the alerts?",
        a: "No, because the rule is a person crossing a line you draw, not movement in the frame. Stray dogs, cattle and moving crops do not trigger it. That is exactly the difference between an alert people act on and one they mute after a fortnight.",
      },
      {
        q: "Who covers Khanna, and how quickly?",
        a: "A verified partner covering the Khanna and Mandi Gobindgarh belt, with our Ludhiana team about forty minutes away. Free camera audit first, then software on the cameras you already have, then a fortnight of tuning against your own footage.",
      },
    ],
  },
  {
    slug: "moga",
    city: "Moga",
    region: "Punjab",
    hasOffice: false,
    focus: "Dairy and food processing, grain trade and cold-chain distribution",
    attendanceContext:
      "Food and dairy work puts a hygiene rule between a worker and any shared surface. Where staff are gloved, hair-netted and moving between a wet zone and a dry one, a fingerprint reader at the entrance is not just unreliable, it is the thing a food-safety auditor asks about. Moga's other attendance pressure is the clock: dairy intake and dispatch run early and late, so the gate turns over at hours when no supervisor is standing at a machine. Reading faces from the entrance camera removes the shared surface entirely and records the five-in-the-morning change as accurately as the mid-shift one.",
    intro:
      "Moga runs on perishables and the vehicles that move them. Dairy and food processing set the clock, grain trade sets the season, and cold-chain distribution ties the two together with trucks that arrive before dawn and leave after dark. That combination puts almost all of the risk at the loading bay and the gate: what went out, on which vehicle, at an hour when the office was empty.",
    localContext: [
      "Processing units where hygiene rules rule out any shared contact device at the entrance.",
      "Cold stores and dispatch bays working at hours when the office is closed and the yard is dark.",
      "Grain and commission agents' godowns where the count is by weight and the loss is found later.",
    ],
    nearby: ["Ludhiana", "Bathinda", "Jalandhar"],
    solutionSlugs: [
      "factory-security",
      "ai-cctv-for-warehouses",
      "attendance-system-for-factories",
      "face-recognition-attendance-system",
      "smart-perimeter-protection",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits in Moga",
      text: "Perishables move on a schedule, and the security questions cluster around the moments when they move.",
    },
    areas: [
      {
        name: "The dairy and food-processing belt",
        text: "Hygiene zones, gloved staff and shift patterns that start before dawn. Attendance at the personnel entrance and restricted-area logging on production and cold zones are the useful pair; interior cameras in a wet processing area are rarely worth making intelligent.",
      },
      {
        name: "Cold stores and the dispatch yards",
        text: "Chamber doors are the real control point and the loading bay is where value is exposed. Bay activity outside booked dispatch hours, plus number-plate logging at the gate, answers most of what a cold-store owner actually wants to know.",
      },
      {
        name: "The Ferozepur Road and grain trade line",
        text: "Commission agents' godowns and storage along the arterial road, busy by day and completely still at night. A boundary line from the end of the working day is the whole configuration for most of them.",
      },
      {
        name: "Baghapurana and the rural distribution points",
        text: "Smaller depots with no neighbours, a single chowkidar and a wall backing onto fields. Person-only boundary rules matter more here than anywhere, because cattle and dogs will trigger anything cruder every night.",
      },
    ],
    faqs: [
      {
        q: "We are a food unit. Will an auditor object to this at the entrance?",
        a: "There is nothing at the entrance to object to. Camera-based attendance has no shared surface, no touchpad and no queue at a device, which removes the contact question that a contact reader in or near a production area invites. Gloves, hairnets and aprons make no difference to a camera reading a face.",
      },
      {
        q: "Our first shift starts at five in the morning. Is the record reliable then?",
        a: "Provided the entrance is lit well enough for a face to be recognisable on the existing feed, yes, and most dairy gates already are because vehicles arrive at that hour. Where an entrance is genuinely dark the audit says so, and the fix is usually a lamp rather than new equipment.",
      },
      {
        q: "What is worth alerting on at a cold store?",
        a: "Three things, in the order they earn their keep: a vehicle entering or leaving outside booked hours with its plate logged, activity in the loading bay when no dispatch is scheduled, and the chamber door opening outside working hours. Interior aisle coverage comes much later, if at all.",
      },
      {
        q: "Cattle and dogs cross our yard all night. Will that flood my phone?",
        a: "No. The rule is a person crossing a line you draw, not motion in the frame, so animals do not trigger it. That is deliberately the case, because an alert people mute is worse than no alert at all.",
      },
      {
        q: "Who covers Moga?",
        a: "A verified partner for the Moga and Bathinda belt, with our Ludhiana team roughly an hour and a half away. The sequence is unchanged: free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your real footage.",
      },
    ],
  },
  {
    slug: "hoshiarpur",
    city: "Hoshiarpur",
    region: "Punjab",
    hasOffice: false,
    focus: "Plywood and timber, wood-based units and the NRI residential belt",
    attendanceContext:
      "Plywood and timber work is piece-rate and physical, and the hands that come off a press or a saw line are exactly the ones a fingerprint reader rejects — resin, dust and worn ridges in combination. Hoshiarpur units also run heavy job-work labour that changes with the order book, so the enrolment burden matters more than the reading speed. Attendance from the gate camera solves both, and it does something a reader cannot in a yard full of stacked timber: the same camera that records who arrived is still watching the yard when the shift ends.",
    intro:
      "Hoshiarpur is a wood town in the Doaba, which gives it two unrelated security problems. The plywood and timber units keep enormous value stacked outdoors in a form that burns, and their gates run a job-work labour force that turns over constantly. Meanwhile the surrounding NRI belt is full of large houses that stand locked for most of the year while the family is abroad, needing an alert somebody can act on from another time zone.",
    localContext: [
      "Timber and plywood yards where the stock is stacked in the open and the fence is the only real barrier.",
      "Press and saw lines whose workers' hands defeat every contact reader within a season.",
      "Locked family houses across the Doaba belt, watched by neighbours rather than by anything that alerts.",
    ],
    nearby: ["Jalandhar", "Batala", "Ludhiana"],
    solutionSlugs: [
      "factory-security",
      "smart-perimeter-protection",
      "residential-security",
      "attendance-system-for-factories",
      "biometric-attendance",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits in Hoshiarpur",
      text: "Wood and absent owners, two problems with almost nothing in common except that both are solved at the boundary.",
    },
    areas: [
      {
        name: "The plywood and press units",
        text: "Resin, dust and a job-work crew that changes with the order book. Gate attendance is the first thing switched on, both for payroll accuracy and because the same camera then answers who was on site when something went missing.",
      },
      {
        name: "The timber yards and saw mills",
        text: "Value stacked outdoors, long fence lines and a fire risk that makes after-hours presence worth knowing about for reasons beyond theft. A person-only boundary line running from the end of the last shift is the configuration that fits.",
      },
      {
        name: "The Una Road and Jalandhar Road industrial stretch",
        text: "Smaller works along the approach roads with a single guard and a wall backing onto open ground. What these sites need is one reliable line and a phone alert, not a wall of screens nobody watches.",
      },
      {
        name: "The NRI residential belt",
        text: "Large houses locked for months, often with cameras already installed by a previous contractor and never once reviewed. Turning those existing cameras into a boundary alert that reaches a phone in Vancouver or Milan is usually a software change with nothing to install.",
      },
    ],
    faqs: [
      {
        q: "Resin and sawdust ruin our attendance reader. Will a camera hold up?",
        a: "There is no contact, so there is nothing to clog or wear. Dust does settle on a lens over months, so an entrance camera in a timber yard wants an occasional wipe, which is a two-minute job. Recognition is unaffected by what is on the worker's hands, which is the whole reason units here move to it.",
      },
      {
        q: "Our labour changes with every order. Is enrolment worth the trouble?",
        a: "About a minute a person, from a phone, at the gate, on the day they start. That is the only model that survives a job-work crew, and removing someone when the order finishes is instant. The record for the period they worked stays intact.",
      },
      {
        q: "Can it warn us about people in the timber yard at night?",
        a: "Yes, with a boundary line drawn along the yard, active from the end of the last shift. It alerts on a person crossing that line, not on movement generally, so wind in the stacks, animals and passing vehicles do not trigger it. Given what a timber yard is worth and how it burns, that alert is worth having even where theft is not the main worry.",
      },
      {
        q: "I live abroad and my house here is empty. Do I need new cameras?",
        a: "Usually not. If a previous contractor installed a DVR that exposes an RTSP stream, which most do, the existing cameras can be given a boundary line and an alert that reaches whichever phones you add, in any country, with the clip attached. The audit tells you whether your particular setup qualifies before you spend anything.",
      },
      {
        q: "Who handles Hoshiarpur?",
        a: "A verified partner covering the Hoshiarpur and Jalandhar belt, with our Ludhiana team behind them. Free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your own footage.",
      },
    ],
  },
  {
    slug: "batala",
    city: "Batala",
    region: "Punjab",
    hasOffice: false,
    focus: "Iron foundries, castings, machine tools and agricultural implements",
    attendanceContext:
      "Foundry hands are the hardest case a fingerprint reader ever meets: sand, oil, heat and skin worn smooth by years of moulding work. Batala's units also run heavily on contracted and piece-rate labour, with crews that follow the order book between workshops. Attendance from the gate camera removes the reader entirely, enrols a new hand in about a minute, and produces a record with a face image attached — which matters in a town where a large share of the wage bill is settled against a contractor's count rather than a payroll system.",
    intro:
      "Batala is one of the oldest iron-working towns in the country, and its workshops are built accordingly: open-fronted sheds, sand floors, castings stacked in the yard and a gate that stays open through the working day. The value here is heavy and anonymous, which changes what is worth watching. Nobody carries a casting out under a jacket; it leaves on a vehicle, which makes the gate and the boundary the only two places worth putting intelligence.",
    localContext: [
      "Foundry yards where castings and scrap are stacked outdoors and leave by vehicle, never by hand.",
      "Moulding and machining lines whose workers' hands defeat any contact reader inside a season.",
      "Workshops with open frontages onto the road, where the boundary at night is a wall and a chowkidar.",
    ],
    nearby: ["Amritsar", "Jalandhar", "Hoshiarpur"],
    solutionSlugs: [
      "factory-security",
      "smart-perimeter-protection",
      "ai-cctv-for-warehouses",
      "attendance-system-for-factories",
      "biometric-attendance",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits in Batala",
      text: "A single industry, but the exposure changes with the size of the unit.",
    },
    areas: [
      {
        name: "The foundry cluster",
        text: "Sand, heat and heavy material moving on trolleys and trucks. Gate attendance and number-plate logging are the two configurations that fit; putting cameras deep inside a hot shed rarely earns its cost.",
      },
      {
        name: "The machine-tool and implement workshops",
        text: "Finished implements and tooling with real resale value, stored in a corner of the same shed where the work happens. A restricted-zone rule on that corner with the hours it should be empty is a better answer than a camera on the whole floor.",
      },
      {
        name: "The Jalandhar Road and Fatehgarh Churian Road stretch",
        text: "Units strung along the approach roads with open frontage by day and a shutter by night. After-hours boundary lines and a phone alert with the clip attached, rather than a siren that empties into an empty road.",
      },
      {
        name: "The scrap and material yards",
        text: "Weight-based stock with vehicles in and out all day. Logging every plate at the gate is what allows a shortfall to be traced to a window of hours instead of to a week.",
      },
    ],
    faqs: [
      {
        q: "Foundry hands defeat every fingerprint machine we have bought. Is this different?",
        a: "Fundamentally, because nothing is touched. Sand, oil, heat and worn ridges are all problems for a sensor pressed against a fingertip and none of them are problems for a camera reading a face at the gate. Units here typically buy it for that reason first and discover the security value second.",
      },
      {
        q: "Our shed is open-fronted and hot. Where would cameras even go?",
        a: "At the personnel gate and the vehicle gate, not inside the shed. The questions worth answering in a foundry are who came in, which vehicle left and whether anyone crossed the boundary after the last shift. The hot working areas can stay on ordinary recording, which is what they are already good for.",
      },
      {
        q: "How does it help when everything valuable is too heavy to steal by hand?",
        a: "By concentrating on the vehicle. Heavy material leaves on a truck or a trolley, so number-plate logging at the gate plus loading activity outside working hours is the pairing that matters. Reconciling that against your dispatch record takes minutes rather than an afternoon of scrubbing footage.",
      },
      {
        q: "Our crews follow the work between workshops. Can we add and remove people quickly?",
        a: "About a minute to add, seconds to remove, done from a phone at the gate. The attendance record for the days a person worked stays available afterwards, which is usually what the wage settlement turns on.",
      },
      {
        q: "Who covers Batala?",
        a: "A verified partner for the Batala and Amritsar belt, with our Ludhiana team behind them. Free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your real footage.",
      },
    ],
  },
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    region: "Delhi, Haryana & Uttar Pradesh",
    hasOffice: false,
    focus: "Retail chains, wholesale markets, offices and logistics parks",
    attendanceContext:
      "NCR's attendance problem is scale and outsourcing rather than dirty hands. A retail chain with fourteen stores has fourteen registers and no single view; an office building's housekeeping, security and pantry staff are supplied by agencies who invoice against a headcount nobody independently counts; a logistics park runs loaders through a gate at hours when the HR office is closed. Camera-based attendance gives a head office one record across every site without a device in any of them, and the agency invoice finally has something to be checked against.",
    intro:
      "The capital region is really several markets that happen to share a road network: chain retail across the city, the wholesale density of the old markets, corporate offices, and the logistics belt that feeds all of them. Delivered by a verified PGAK partner in the region, with the same platform and the same free audit as anywhere else — what changes is only who carries the ladder.",
    localContext: [
      "Retail chains where every store keeps its own record and head office cannot see any of them in one place.",
      "Wholesale markets whose shutters back onto lanes too narrow for anyone to watch the far end.",
      "Logistics parks where the gate turns over at hours the office is closed and the register is a notebook.",
    ],
    nearby: ["Gurugram", "Noida"],
    solutionSlugs: [
      "retail-shop-security",
      "ai-cctv-for-warehouses",
      "ai-cctv-for-offices",
      "attendance-system-for-offices",
      "face-recognition-attendance-system",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits across NCR",
      text: "Four distinct sub-markets, each with a different first configuration. Geography and industry, not a claim about deployments here.",
    },
    areas: [
      {
        name: "The old-city wholesale markets",
        text: "Extremely dense trading lanes where shutters face each other and stock value is invisible from the frontage. Sirens are counterproductive in a lane like that; what works is a quiet line across the shutter after closing, sent to two phones.",
      },
      {
        name: "Chain retail across the city",
        text: "The head-office question is not one store, it is comparability: the same alerts, the same attendance rules and the same reporting across every branch. Footfall counting by store hour is often the feature that justifies it internally, with the after-hours cover as the security half.",
      },
      {
        name: "The industrial and logistics belt",
        text: "Loaders, contract drivers and vehicles moving through gates at every hour. Number-plate logging and loading-bay rules outside booked windows are the two records that make a night reconstructable.",
      },
      {
        name: "Office buildings and business parks",
        text: "Multiple tenants, several entrances, and an outsourced workforce nobody has enrolled. Recognition at the main doors plus restricted-room logging for server and record rooms covers both the attendance and the audit question, with no device at any reception.",
      },
    ],
    faqs: [
      {
        q: "We run fourteen stores. Can head office see them all in one place?",
        a: "That is the main reason chains here adopt it. Every store reports into the same account, so alerts, attendance and footfall are comparable across branches instead of living in fourteen separate DVRs. A regional manager sees one list rather than fourteen apps, and a store that stops reporting is itself visible.",
      },
      {
        q: "Our housekeeping and security staff come from agencies. Can we verify the bill?",
        a: "Yes. Agency staff are enrolled as their own group and their hours are recorded independently of what the agency invoices, with a face image on each entry. Companies here routinely find the first month's comparison covers the cost of the deployment.",
      },
      {
        q: "Do we have to replace the cameras our previous vendor installed?",
        a: "Almost never. If the DVR or NVR exposes an RTSP stream, which nearly all recorders installed in the last decade do, the software runs on what is there. The real constraint is camera placement, and the free audit tells you which of your existing cameras can support recognition and which are only useful for general recording.",
      },
      {
        q: "Who installs it, since PGAK is based in Punjab?",
        a: "A verified partner in the region does the survey, the installation and the support, with our team behind them on the platform. The process does not change: free camera audit first, then software on your existing cameras, then a fortnight of tuning against your own footage. There is no PGAK office in NCR and we do not pretend otherwise.",
      },
      {
        q: "How quickly does a site go live?",
        a: "Most are live within a day of the survey, because in the ordinary case nothing physical is installed. The fortnight afterwards is the part that matters: tuning zones, schedules and thresholds against your real footage is what decides whether the alerts are still switched on in month three.",
      },
    ],
  },
  {
    slug: "gurugram",
    city: "Gurugram",
    region: "Haryana",
    hasOffice: false,
    focus: "Corporate offices, gated residential and the Manesar industrial belt",
    attendanceContext:
      "Gurugram runs on badges and a large contracted workforce, and both fail in the same direction. A badge can be handed to a colleague, and the housekeeping, security, cafeteria and facilities staff who keep a tower running are billed by agencies against numbers the tenant cannot check. Face recognition at the entrance closes the first gap because a face cannot be lent, and it closes the second because contracted staff are recorded in their own group independently of the invoice. Neither requires a device at a reception desk that clients walk past.",
    intro:
      "Gurugram splits cleanly into three: the office towers and business parks, the gated residential belt, and the industrial and warehousing zone out towards Manesar. Each wants something different, and confusing them is the usual mistake. Offices want attendance and restricted-room records, societies want a visitor log that is actually searchable, and the industrial belt wants vehicles and boundaries. Delivered through a verified partner in the region.",
    localContext: [
      "Office towers where badge-sharing makes the attendance record softer than anyone admits.",
      "Gated societies whose visitor register is a paper book nobody can read a week later.",
      "Warehousing and industrial units where the gate is the only meaningful control point.",
    ],
    nearby: ["Delhi NCR", "Noida"],
    solutionSlugs: [
      "ai-cctv-for-offices",
      "residential-security",
      "ai-cctv-for-warehouses",
      "attendance-system-for-offices",
      "face-recognition-attendance-system",
      "smart-perimeter-protection",
    ],
    localAreas: {
      heading: "Where the risk sits in Gurugram",
      text: "Three markets, three configurations, and very little overlap between them.",
    },
    areas: [
      {
        name: "The office and business-park corridor",
        text: "Multi-tenant towers with several entrances and a constant flow of visitors, riders and contract staff. Recognition on the main doors and restricted-room logging on server and record rooms answers the attendance question and the audit question with the same cameras.",
      },
      {
        name: "The gated residential belt",
        text: "Boom barriers, guard cabins and a paper visitor register. Resident vehicles recognised by plate and visitors photo-logged at entry gives the association something searchable, which is what it actually needs when a question is asked a month later.",
      },
      {
        name: "The Manesar and Pataudi Road industrial zone",
        text: "Warehousing and manufacturing with long boundaries and shift gates. Number-plate logging, loading-bay activity outside booked hours and a boundary line after the last shift are the three that pay here.",
      },
      {
        name: "High-street and mall retail",
        text: "Displayed stock by day, an empty service corridor by night. Footfall counting supports merchandising decisions while the rear service door carries the after-hours risk, and both run off cameras that are usually already in place.",
      },
    ],
    faqs: [
      {
        q: "Our access cards get shared. Does face recognition actually fix that?",
        a: "It removes the mechanism. A card is a token that can be handed over; a face cannot be, so the entry record is tied to the person rather than to an object they carry. Entries are stored with a face image attached, which also settles the disputes a card log cannot resolve on its own.",
      },
      {
        q: "We are one tenant in a shared tower. Is that a problem?",
        a: "No, it is the normal case. Each tenant is a separate account with its own people, alerts and data, and neither tenant sees the other's. What matters at survey time is having at least one camera per entrance mounted where it sees faces rather than the tops of heads, and that is usually a repositioning rather than a purchase.",
      },
      {
        q: "Can a society replace its paper visitor register with this?",
        a: "Yes, and it is one of the clearest wins available. Resident vehicles are recognised at the barrier automatically, visitors are photo-logged at entry, and the association gets a searchable record instead of a book of illegible handwriting. Guards still control the barrier; the record simply stops depending on them writing it down.",
      },
      {
        q: "Do we need to buy hardware?",
        a: "In the ordinary case, no. The software runs on the cameras and recorder you already have, provided the recorder exposes an RTSP stream. Where a camera is badly placed for recognition the audit says so before you commit, and the fix is usually moving one camera rather than replacing a system.",
      },
      {
        q: "Who supports it here?",
        a: "A verified partner covering Gurugram and the wider NCR, with our team behind them on the platform. PGAK has no office in Gurugram and does not claim one. The process is identical to everywhere else: free audit, then software on your existing cameras, then a fortnight of tuning.",
      },
    ],
  },
  {
    slug: "noida",
    city: "Noida",
    region: "Uttar Pradesh",
    hasOffice: false,
    focus: "Industrial sectors, expressway offices and large housing societies",
    attendanceContext:
      "Noida's sector industry runs shifts and contract labour; its expressway offices run badges and outsourced facilities staff; its societies run guards on a roster. All three record attendance in a way that nobody can audit afterwards. Reading faces at the entrance produces the same record for a factory gate, an office door and a guard cabin, which matters most for the population everybody forgets — the contracted housekeeping, security and pantry workers whose hours reach the client as a number on an agency invoice.",
    intro:
      "Noida is unusually easy to describe and unusually varied to serve: numbered industrial sectors with real manufacturing, the expressway office belt, and some of the largest housing societies in the country. The three want different things from the same cameras — a factory gate wants attendance and vehicles, an office wants restricted-room records, a society wants a visitor log it can search. Delivered through a verified partner in the region.",
    localContext: [
      "Sector factories running shift gates with contract labour and no independent count.",
      "Expressway offices with several entrances and an outsourced workforce nobody has enrolled.",
      "Very large societies where the visitor register is paper and the towers each have their own entrance.",
    ],
    nearby: ["Delhi NCR", "Gurugram"],
    solutionSlugs: [
      "factory-security",
      "ai-cctv-for-offices",
      "residential-security",
      "attendance-system-for-factories",
      "face-recognition-attendance-system",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits in Noida",
      text: "The sector grid makes the sub-markets unusually distinct, and each has its own first move.",
    },
    areas: [
      {
        name: "The industrial sectors",
        text: "Manufacturing and assembly with shift gates and contracted crews. Attendance at the personnel gate plus number-plate logging at the vehicle gate is the pairing that answers both the payroll question and the dispatch question.",
      },
      {
        name: "The expressway office belt",
        text: "Multi-tenant buildings with several doors and a permanent flow of delivery riders and visitors. Recognition on the main entrances and restricted-room logging for server and record rooms, with no device at reception.",
      },
      {
        name: "The large housing societies",
        text: "Multiple towers, a single main gate and thousands of residents. Resident vehicle recognition at the barrier and photo-logged visitors turn the register into something an association can actually search when a complaint arrives.",
      },
      {
        name: "Warehousing towards Greater Noida",
        text: "Long boundaries, night dispatch and yards backing onto open ground. Boundary lines after the last shift and bay activity outside booked hours do the work; interior coverage comes later.",
      },
    ],
    faqs: [
      {
        q: "We have contract labour on the factory gate. What changes?",
        a: "You get your own count. Contract crews are enrolled as a separate group and their entry and exit times are recorded independently of the contractor's claim, with a face image on each entry. When the invoice arrives there is something to check it against, which is usually where the value shows up first.",
      },
      {
        q: "Our society has six towers and one main gate. How does that work?",
        a: "The main gate carries vehicle recognition for residents and photo-logging for visitors; tower entrances can be added where the association wants them. The association ends up with a searchable record instead of a paper book, and guards keep control of the barrier exactly as before.",
      },
      {
        q: "Is this legal for recording people at a workplace in India?",
        a: "Workplace CCTV is ordinary and lawful; what changes with recognition is that you are processing identity, so it should be disclosed to staff, limited to the entrances that need it, and the retention period set deliberately. Those are configuration decisions made during the audit, not afterthoughts, and we will tell you where we think a proposed configuration goes further than it needs to.",
      },
      {
        q: "Our building has three tenants sharing a lobby. Can data stay separate?",
        a: "Yes. Each tenant is its own account with its own enrolled people and alerts, and one tenant cannot see another's data even where a camera covers a shared lobby. The scope of what each account can see is set at configuration.",
      },
      {
        q: "Who covers Noida?",
        a: "A verified partner for Noida and the NCR, with our team behind them on the platform. There is no PGAK office here. Free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your real footage.",
      },
    ],
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    hasOffice: false,
    focus: "Retail, the Bhiwandi warehousing belt and high-density residential",
    attendanceContext:
      "Mumbai's attendance problem is commute-shaped. Staff arrive across a long window because the trains decide when they get in, so a device at the door creates a queue at exactly the wrong moment, and retail chains compound it by keeping a separate record in every store. Warehousing in the Bhiwandi belt runs the opposite pattern: loaders engaged by the day through contractors, at hours when no office is open. Camera-based attendance suits both, because there is no queue to form and enrolling a new hand takes about a minute from a phone at the gate.",
    intro:
      "Mumbai's density changes what security means. Space is expensive, so stock is stacked tighter, buildings are taller and the warehousing that serves the city sits outside it in the Bhiwandi belt. That produces three separate asks: retail wants footfall and after-hours cover, warehousing wants vehicles and boundaries, and housing societies want a visitor record that survives a month. Delivered through a verified PGAK partner in the region.",
    localContext: [
      "Retail floors where stock density makes a physical count slow and a footage review slower.",
      "Warehousing in the Bhiwandi belt with long boundaries, night dispatch and contracted loaders.",
      "Housing societies with several wings, one gate and a paper visitor book nobody can search.",
    ],
    nearby: ["Delhi NCR", "Bengaluru"],
    solutionSlugs: [
      "retail-shop-security",
      "ai-cctv-for-warehouses",
      "residential-security",
      "attendance-system-for-warehouses",
      "face-recognition-attendance-system",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits in Mumbai",
      text: "Four sub-markets shaped by how expensive space is. Geography and industry, not a claim about deployments here.",
    },
    areas: [
      {
        name: "The Bhiwandi warehousing belt",
        text: "This is where the city's goods actually sit. Long compound walls, night dispatch and contracted loading crews make number-plate logging at the gate, bay activity outside booked hours and a boundary line after the last shift the three configurations worth having.",
      },
      {
        name: "Chain retail across the suburbs",
        text: "Dense floors and tight aisles, where the useful daytime output is footfall and dwell by section rather than an alarm. The security half is the rear service door and the shutter after closing, which is where the actual after-hours risk lives.",
      },
      {
        name: "The wholesale markets in the old city",
        text: "Extremely narrow lanes, high stock value and neighbours within arm's reach. Sirens are the wrong instrument here; a quiet line across the shutter, active only when closed, sent to two phones, is the right one.",
      },
      {
        name: "Housing societies and gated developments",
        text: "Several wings, one main gate, thousands of residents and a register nobody can read later. Resident vehicle recognition and photo-logged visitors give the committee something searchable when a complaint arrives weeks after the event.",
      },
    ],
    faqs: [
      {
        q: "Our staff arrive over a two-hour window because of the trains. Does that matter?",
        a: "It helps, if anything. There is no device and no queue, so a long arrival window is simply a long window of entries rather than a bottleneck at a reader. Each entry is timestamped with a face image, which is what the payroll question actually needs.",
      },
      {
        q: "Our warehouse is in Bhiwandi but our office is in the city. Can we see both?",
        a: "Both sites report into the same account, so alerts and attendance from the warehouse reach whoever you nominate in the city, on a phone, with the clip attached. That separation of where the risk is from where the manager is describes most Mumbai deployments.",
      },
      {
        q: "Retail floors here are extremely tight. Is footfall counting reliable?",
        a: "Counting holds up well at density; recognition is the part that degrades when a doorway is packed, because faces are obscured by other people. For a retail chain the honest split is that counting and after-hours alerting are the dependable halves, and identity at a crowded entrance is not what to buy it for.",
      },
      {
        q: "Do we replace the cameras the mall or landlord installed?",
        a: "Usually not. If the recorder exposes an RTSP stream the software runs on what is there. Because many Mumbai premises are leased, it is worth confirming with the landlord that you may add software to the existing system before the survey — in almost every case there is nothing to install physically at all.",
      },
      {
        q: "Who handles Mumbai?",
        a: "A verified partner in the region, with our team behind them on the platform. PGAK has no Mumbai office and does not claim one. Free camera audit first, then software on your existing cameras, then a fortnight of tuning against your own footage.",
      },
    ],
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    region: "Karnataka",
    hasOffice: false,
    focus: "Tech offices and campuses, Peenya industry and gated communities",
    attendanceContext:
      "Bengaluru offices already have badges, so the gap is not recording attendance — it is that the record is soft. A badge is a token that can be handed over, and the facilities workforce that actually keeps a campus running is supplied by agencies whose invoices are accepted on trust. The industrial belt has the older problem: shift gates and contract crews with no independent count. Face recognition at the entrance covers both, and on a campus with several buildings it does something a turnstile cannot, which is give one consistent record across every entrance without a device at any of them.",
    intro:
      "Bengaluru is two cities for our purposes. There is the technology belt — campuses, multi-tenant towers, gated communities built around them — where the questions are attendance integrity, restricted-room records and visitor logging. And there is the older manufacturing city around Peenya and the northern industrial estates, where the questions are shift gates, vehicles and boundaries. Delivered through a verified PGAK partner in the region.",
    localContext: [
      "Campuses and towers where badge-sharing quietly softens the attendance record.",
      "Facilities, housekeeping and security staff supplied by agencies and billed on an unverified headcount.",
      "Industrial estates with shift gates, contract crews and long boundary walls.",
    ],
    nearby: ["Coimbatore", "Mumbai"],
    solutionSlugs: [
      "ai-cctv-for-offices",
      "factory-security",
      "residential-security",
      "attendance-system-for-offices",
      "face-recognition-attendance-system",
      "smart-perimeter-protection",
    ],
    localAreas: {
      heading: "Where the risk sits in Bengaluru",
      text: "The technology belt and the older industrial city want almost opposite configurations.",
    },
    areas: [
      {
        name: "The tech campuses and office parks",
        text: "Multiple buildings, several entrances each, and a large contracted facilities workforce. Recognition at main doors plus restricted-room logging for server rooms and record stores gives one record across the campus with no device at any reception.",
      },
      {
        name: "Peenya and the northern industrial estates",
        text: "Manufacturing with shift gates, contract crews and material yards. Gate attendance and number-plate logging are the first two, with a boundary line after the last shift where the compound backs onto open ground.",
      },
      {
        name: "Gated communities and apartment complexes",
        text: "Boom barriers, guard cabins and a visitor register in a book. Resident vehicles recognised automatically and visitors photo-logged makes the record searchable, which is the only form in which it is ever actually useful.",
      },
      {
        name: "Warehousing on the outer ring and towards Nelamangala",
        text: "Distribution sheds with night dispatch and long fence lines. Bay activity outside booked hours plus boundary alerts are the pair that matter; interior aisle coverage rarely justifies itself first.",
      },
    ],
    faqs: [
      {
        q: "We already have badge access. Why add recognition?",
        a: "Because a badge records a card and a camera records a person. Where attendance feeds payroll or compliance, the difference matters: a card can be handed to a colleague and a face cannot. It also covers the population badges usually miss, which is the contracted facilities workforce nobody enrols properly.",
      },
      {
        q: "Our campus has eight buildings. Does each need its own system?",
        a: "No. Every entrance reports into one account, so attendance and alerts are consistent across the campus rather than living in eight separate systems. What each entrance needs is a camera positioned to see faces at head height on the walking line, and the audit tells you which of your existing ones already do.",
      },
      {
        q: "How do we handle employee privacy properly?",
        a: "Disclose it to staff, keep recognition to the entrances that genuinely need it, leave general areas on ordinary recording, and set the retention period deliberately rather than leaving it at a default. Those are configuration choices made during the audit. If a proposed setup goes further than the purpose requires, we will say so.",
      },
      {
        q: "Can it work across our office and our Peenya unit together?",
        a: "Yes, and they can be configured completely differently while reporting into one account. The office runs recognition and restricted rooms; the unit runs gate attendance, vehicle logging and a boundary line. One view for whoever needs both.",
      },
      {
        q: "Who covers Bengaluru?",
        a: "A verified partner in the city, with our team behind them on the platform. There is no PGAK office in Bengaluru. Free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your real footage.",
      },
    ],
  },
  {
    slug: "jaipur",
    city: "Jaipur",
    region: "Rajasthan",
    hasOffice: false,
    focus: "Jewellery and gem trade, retail, hospitality and the Sitapura industrial belt",
    attendanceContext:
      "Jaipur's jewellery and gem workshops run skilled piece-rate artisans, often in small units where the same family has worked for years and attendance is remembered rather than recorded — until a wage dispute makes memory insufficient. Hotels bring the opposite pattern: four departments on four different clocks and constant turnover in housekeeping and kitchens, where enrolling a new joiner quickly matters more than reading speed. Camera-based attendance at the entrance serves both, and in a jewellery unit it adds something a reader cannot, because the same camera that records the arrival is watching the door to the strong room.",
    intro:
      "Jaipur trades in small things worth a great deal, which is a security profile of its own. Gem and jewellery work concentrates enormous value into rooms with ordinary doors; the tourist economy fills hotels and heritage properties with guests around the clock; and the Sitapura and VKI industrial areas carry the more familiar warehousing and manufacturing risk. Delivered through a verified PGAK partner in the region.",
    localContext: [
      "Gem and jewellery units where the value in one room exceeds everything else on the premises combined.",
      "Hotels and heritage properties needing back-of-house cover without anything intrusive facing guests.",
      "Industrial and warehousing estates with the usual gate, vehicle and boundary questions.",
    ],
    nearby: ["Delhi NCR", "Gurugram"],
    solutionSlugs: [
      "retail-shop-security",
      "ai-cctv-for-offices",
      "ai-cctv-for-warehouses",
      "ai-intruder-detection",
      "face-recognition-attendance-system",
      "smart-perimeter-protection",
    ],
    localAreas: {
      heading: "Where the risk sits in Jaipur",
      text: "Value density varies enormously between these four, and so does the right configuration.",
    },
    areas: [
      {
        name: "The jewellery and gem trade",
        text: "Workshops and trading rooms where a single restricted room holds most of the value. Restricted-zone rules with the hours that room should be empty, plus recognition on the door to it, is worth more than any number of cameras on the general floor.",
      },
      {
        name: "The walled-city bazaars",
        text: "Dense trading lanes with shutters facing each other and no vehicle access. Quiet after-hours lines across the shutter, sent to phones rather than sounded aloud, for the same reason as every other crowded market: a false siren costs more than it prevents.",
      },
      {
        name: "Hotels and heritage properties",
        text: "Guests at every hour and a staff door that stays propped open. The valuable coverage is back-of-house — stores, linen, roof access — with guest areas left deliberately non-identifying, and alerts reaching a manager's phone rather than a lobby.",
      },
      {
        name: "The Sitapura and VKI industrial areas",
        text: "Manufacturing and warehousing with shift gates and long boundaries. Gate attendance, number-plate logging and after-hours boundary lines, in that order of usefulness.",
      },
    ],
    faqs: [
      {
        q: "Our strong room is the whole risk. What can this actually do?",
        a: "Treat that room as a restricted zone with the hours it should be empty, and anyone entering outside those hours generates an alert on your phone with the clip attached. Add recognition on the door itself and you also have a record of who opened it and when, rather than footage somebody has to go and find afterwards.",
      },
      {
        q: "Will guests in our hotel be identified?",
        a: "Not if it is configured properly, and it should not be. Recognition belongs on staff entrances and back-of-house doors; guest corridors are either left on ordinary recording or covered by rules that flag a door opening at an odd hour without identifying anyone. That line is drawn during the audit and written into the configuration.",
      },
      {
        q: "Our artisans are paid by the piece. Is attendance even relevant?",
        a: "It becomes relevant the moment there is a disagreement about days worked, which in a small unit is exactly when nobody has a record. Entry and exit times with a face image attached settle that in minutes, and nobody has to stand at a machine to produce them.",
      },
      {
        q: "The season swings hard here. Does that affect anything?",
        a: "Only staffing, which is where fast enrolment helps: seasonal hotel and workshop staff are added in about a minute each from a phone and removed just as quickly. The alerting configuration does not change with the season, though hotels often widen their back-of-house hours during peak.",
      },
      {
        q: "Who covers Jaipur?",
        a: "A verified partner in the region, with our team behind them on the platform. There is no PGAK office in Jaipur. Free camera audit first, then software on the cameras you already own, then a fortnight of tuning against your own footage.",
      },
    ],
  },
  {
    slug: "coimbatore",
    city: "Coimbatore",
    region: "Tamil Nadu",
    hasOffice: false,
    focus: "Spinning mills, pump and motor manufacturing, foundries and engineering job-work",
    attendanceContext:
      "Coimbatore's mills run continuous shifts with a workforce that includes a large migrant contingent housed nearby, and the gate turns over three times a day including once at night. Cotton fluff in a spinning shed and machining oil in an engineering unit are both hard on contact readers, and the change-over crowd makes a queue at a device genuinely costly. Reading faces as people walk through removes the queue and survives the fluff, and for units paying contract crews by shift it produces a record with a face image attached that can be set beside the contractor's invoice.",
    intro:
      "Coimbatore is an engineering city with a textile backbone: spinning mills, pump and motor works, foundries and a deep bench of job-work machine shops feeding them. The risks follow that structure — continuous shifts through busy gates, finished goods and castings stacked in yards, and a workforce that includes migrant and contract labour engaged by the season. Delivered through a verified PGAK partner in the region, with the same free audit as anywhere else.",
    localContext: [
      "Spinning mills running continuous shifts, where the gate turns over three times a day including at night.",
      "Pump, motor and job-work units with finished goods and castings stacked in open yards.",
      "Contract and migrant crews engaged by the season, billed on a headcount nobody counts independently.",
    ],
    nearby: ["Bengaluru", "Mumbai"],
    solutionSlugs: [
      "factory-security",
      "ai-cctv-for-warehouses",
      "attendance-system-for-factories",
      "biometric-attendance",
      "smart-perimeter-protection",
      "ai-intruder-detection",
    ],
    localAreas: {
      heading: "Where the risk sits in Coimbatore",
      text: "One industrial ecosystem, four positions in it, each with its own first configuration.",
    },
    areas: [
      {
        name: "The spinning and textile mills",
        text: "Continuous shifts, cotton fluff everywhere and a change-over crowd at the gate three times a day. Attendance at the personnel gate is the first thing switched on, and it is the case that most clearly beats a contact reader on both accuracy and throughput.",
      },
      {
        name: "The pump, motor and engineering units",
        text: "Finished goods with real resale value stored beside the shop floor, and machining oil on every hand. A restricted-zone rule on the finished-goods area with the hours it should be empty does more than a camera on the machining floor.",
      },
      {
        name: "The foundry and job-work cluster",
        text: "Sand, heat and heavy material leaving by vehicle rather than by hand. Number-plate logging at the gate paired with the dispatch record is the reconciliation that matters here.",
      },
      {
        name: "The industrial estates and warehousing approaches",
        text: "Compounds with long boundaries and night gaps between dispatches. A person-only boundary line from the end of the last shift, and bay activity outside booked hours.",
      },
    ],
    faqs: [
      {
        q: "Cotton fluff in the shed kills our fingerprint machine. Does a camera cope?",
        a: "There is no contact surface to clog, which is the core of it. Fluff does settle on a lens over time, so an entrance camera in a mill wants an occasional wipe, the same as everything else in the building. Recognition is unaffected by what is on a worker's hands or gloves.",
      },
      {
        q: "Our gate turns over three times a day, once at night. Will the night shift record properly?",
        a: "Wherever the camera can see a face, which at night means the gate needs usable light rather than floodlighting. Most mill gates already have it because of vehicle movement. Where a gate is genuinely dark, the audit says so and the fix is a lamp rather than a new system.",
      },
      {
        q: "Much of our labour is contracted. Can we check what we are billed?",
        a: "Yes. Contract crews are enrolled as their own group with entry and exit times recorded independently of the contractor's claim, each with a face image. Setting your own count beside the invoice is usually where the first month's value comes from.",
      },
      {
        q: "Do we need new cameras for the finished-goods area?",
        a: "Rarely. If the existing recorder exposes an RTSP stream, the software works with the cameras already there. What the audit checks is whether the camera covering that area sees the doorway usefully — a camera aimed at the whole floor from a corner is fine for recording and poor for a restricted-zone rule.",
      },
      {
        q: "Who covers Coimbatore, given PGAK is in Punjab?",
        a: "A verified partner in the region does the survey, installation and support, with our team behind them on the platform. There is no PGAK office in Tamil Nadu and we do not pretend otherwise. Free camera audit first, then software on your existing cameras, then a fortnight of tuning against your own footage.",
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

/** Route for a location page. */
export function locationPath(slug: string): string {
  return `/ai-cctv-${slug}`;
}
