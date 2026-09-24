export const BUYER_SOLUTIONS: Record<
  string,
  {
    kind: "problem" | "industry";
    title: string;
    intro: string;
    workflow: string;
    event: string;
    requirements: string[];
    limits: string;
    example: string;
    test: string;
    privacy: string;
  }
> = {
  "ai-intruder-detection": {
    kind: "problem",
    title: "AI intrusion detection for existing CCTV",
    intro:
      "Evaluate whether a configured camera view can identify entry into a restricted area and provide useful context to an authorised reviewer. Detection supplements your existing security process.",
    workflow:
      "A security supervisor defines a perimeter zone and schedule. The pilot distinguishes authorised deliveries and staff movement from entry that needs review. The response owner decides what to do; a detector does not establish criminal intent.",
    event:
      "A person enters a defined loading-bay zone during agreed closed hours.",
    requirements: [
      "Stable authorised stream and appropriate target detail at the far edge of the zone.",
      "Representative night lighting, camera angle and unobstructed approaches.",
      "Processing capacity, verified alert destination and an accountable response owner.",
    ],
    limits:
      "Occlusion, headlights, rain, vegetation and small or distant targets can create false alerts or missed events. A working daytime test does not establish nighttime performance.",
    example:
      "Illustration: a warehouse tests a rear loading bay after shift end, alongside authorised cleaning and a scheduled collection. The outcome is a test log, not a claimed reduction in theft.",
    test: "Agree ground truth, zones and eligible events first. Stage permitted crossings and legitimate exceptions. Count true alerts, false alerts, missed events and event-to-recipient delay. Repeat across agreed conditions and test stream loss.",
    privacy:
      "Use footage only for an authorised purpose. Restrict access and retention, preserve human review and keep analytics separate from safety-critical protective systems.",
  },
  "face-recognition-attendance-system": {
    kind: "problem",
    title: "Evaluate face recognition attendance on CCTV",
    intro:
      "Assess whether suitable entrance views can support attendance records that people can review and correct. Camera suitability, authorised enrolment and exception handling come before payroll use.",
    workflow:
      "HR and the site operator agree enrolment, shift rules and a correction process. Entrance events are compared with a permitted reference record. Ambiguous and missing records require review before any attendance or pay decision.",
    event:
      "An enrolled person passes the selected entrance; the review workflow resolves a missing or ambiguous event.",
    requirements: [
      "A consistent entrance view with sufficient face detail, lighting and limited occlusion.",
      "An authorised enrolment process and defined access/retention responsibilities.",
      "Verified event export or attendance integration and a manual correction workflow.",
    ],
    limits:
      "Queues, helmets, masks, profile views and backlighting can cause missed or incorrect matches. Model confidence is not proof of identity. Do not promise payroll integration without demonstrating the exact interface.",
    example:
      "Illustration: a factory compares one gate's proposed attendance events with an authorised manual register during a scoped shift trial. No payroll adjustment is automated from the trial.",
    test: "Measure false matches and missed events against a permitted ground-truth set. Test shift boundaries, repeat entry, queues and correction of disputed records. Record the sample size and conditions.",
    privacy:
      "Provide appropriate notice, authorisation and alternatives where required. Limit enrolment data, access and retention. A qualified person should assess applicable privacy and employment obligations; analytics is not automatic proof of misconduct.",
  },
  "multi-site-cctv-monitoring": {
    kind: "problem",
    title: "Camera-feed health across multiple sites",
    intro:
      "Evaluate a repeatable process for noticing unavailable camera feeds, assigning ownership and confirming recovery. Verify central visibility and access controls for the exact proposed deployment.",
    workflow:
      "Each site has a network/camera owner and an escalation contact. Operators distinguish a camera failure from recorder, processing or connectivity failures. A recovery event must be reviewed rather than assumed from a cleared alert.",
    event:
      "A permitted camera stream is interrupted and later restored during a controlled test.",
    requirements: [
      "An inventory of site, camera, recorder and network dependencies.",
      "Approved processing and monitoring paths, with clock synchronisation.",
      "Verified notification routing, role boundaries and recovery procedure.",
    ],
    limits:
      "A connected feed is not proof of a clear image or useful detection. A network outage may interrupt both the stream and notification path. Full multi-site VMS permissions remain unverified until demonstrated.",
    example:
      "Illustration: two warehouses test one disconnected feed each and check whether the intended site owner receives actionable context without seeing the other site's restricted footage.",
    test: "Test camera, recorder and network interruptions separately. Record detection delay, delivery, false alarms, recovery and manual intervention. Confirm role restrictions with authorised test accounts.",
    privacy:
      "Use least-necessary viewing access and documented cross-site responsibilities. Retention and export remain with the scoped recorder/VMS and data owner.",
  },
  "factory-security": {
    kind: "industry",
    title: "AI CCTV evaluation for factory operations",
    intro:
      "Start with a factory workflow: gates, restricted production areas, shift change or after-hours access. Define the event and operating response before selecting analytics.",
    workflow:
      "Security controls the gate while supervisors manage shifts and authorised contractor movement. A production-line view is a different task from a perimeter view; agree separate requirements and owners.",
    event:
      "Entry into a restricted maintenance zone outside a permitted window, or an attendance exception at the selected staff gate.",
    requirements: [
      "Views suited to the chosen task, accounting for machinery, dust and occlusion.",
      "Shift schedules, contractor exceptions and authorised enrolment where relevant.",
      "Processing, network and an operating response agreed with security and production.",
    ],
    limits:
      "Busy shifts, PPE, dust, glare and machine movement affect performance. Analytics is supplementary monitoring; it is not certified machine guarding, protective equipment or a replacement for safety procedures.",
    example:
      "Illustration: select a gate and a restricted stores area for different tests. Keep the guard's operating process and existing recorder in place while reviewing the pilot findings.",
    test: "Sample normal shifts, changeovers, authorised maintenance and closed hours. Log useful and missed events and nuisance alerts. Stop or revise the pilot if it disrupts operations or fails agreed acceptance criteria.",
    privacy:
      "Separate security and attendance purposes. Limit identification access and ensure workers can raise corrections before any employment decision.",
  },
  "ai-cctv-for-warehouses": {
    kind: "industry",
    title: "AI CCTV evaluation for warehouses",
    intro:
      "Assess loading bays, stock areas and after-hours approaches against the way your warehouse actually operates. Delivery activity and legitimate work should be part of the test.",
    workflow:
      "Warehouse supervisors coordinate deliveries, cleaning and stock movement. Security needs the zone, hours and exceptions so an alert is actionable rather than simply another notification.",
    event:
      "A person enters a closed loading bay after dispatch, excluding a scheduled collection.",
    requirements: [
      "Camera views with usable target detail beyond racking and parked vehicles.",
      "Day/night testing under actual bay lighting and vehicle headlights.",
      "Delivery schedules, network/processing and named shift response owners.",
    ],
    limits:
      "Forklifts, pallets, vehicle occlusion and open doors can change a scene substantially. Detection is not a stock ledger and does not prove inventory shrinkage or theft prevention.",
    example:
      "Illustration: test a rear bay and a goods entrance with legitimate collections alongside staged restricted entry. Compare evidence usefulness with the supervisor's manual event log.",
    test: "Agree event definitions and an independent log. Test both quiet periods and dispatch peaks, recording false alerts, missed events, delays and recovery after a network interruption.",
    privacy:
      "Restrict shared footage to authorised security and operational purposes. Agree retention, visitor notice and controlled export; avoid unnecessary identification.",
  },
};
