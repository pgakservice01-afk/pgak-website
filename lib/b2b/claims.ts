export type CapabilityState =
  "available" | "limited pilot" | "planned" | "unverified";
export type CapabilityRecord = {
  id: string;
  title: string;
  state: CapabilityState;
  scope: string;
  requirement: string;
  href: string;
  /**
   * The demonstration this state rests on, when there is one. Points at a
   * record in lib/proof/projects.ts — the only material on the site that
   * carries an approval, its conditions and what it does not prove.
   */
  evidence?: { projectId: string; note: string; href: string };
};
/** Evidence gate: marketing copy alone cannot promote a capability to available. */
export const CAPABILITY_REGISTER: CapabilityRecord[] = [
  // ── Demonstrated under stated conditions ─────────────────────────────────
  // "limited pilot" is the register's own definition for "evidenced only in a
  // named pilot". A recorded demonstration of one scene is exactly that: it
  // proves the function ran under the conditions on the clip, and nothing
  // wider. None of these is "available", whose bar is a defined configuration.
  {
    id: "ppe",
    title: "PPE check — bare hands on a line camera",
    state: "limited pilot",
    scope:
      "One PPE class (gloves) on an existing overhead line camera; confidence shown per detection so a supervisor can judge the low ones.",
    requirement:
      "To reach available: the PPE classes for a site agreed at assessment, and an acceptance test on that site's own cameras.",
    href: "/features/guides/ppe-detection",
    evidence: {
      projectId: "ppe-assembly-line",
      note: "14 s recording, 1 April 2025, conditions and limits stated",
      href: "/features/guides/ppe-detection",
    },
  },
  {
    id: "line-count",
    title: "Object count across a line at a loading bay",
    state: "limited pilot",
    scope:
      "A known item type counted once each as it crosses one configured line on an existing dock camera. Not an inventory system; does not reconcile against a ledger.",
    requirement:
      "To reach available: the item type and line position agreed at assessment, and a count checked against a manual tally at the site.",
    href: "/ai-cctv-for-warehouses",
    evidence: {
      projectId: "dock-count",
      note: "16 s recording, 19 December 2022, third-party identifiers blurred",
      href: "/ai-cctv-for-warehouses",
    },
  },
  {
    id: "anpr",
    title: "Number-plate camera, fitted and operated",
    state: "limited pilot",
    scope:
      "The camera as fitted to a gate pillar and the console the operator works from. The photographs prove a fitting and a working console, not a read rate.",
    requirement:
      "To reach available: plate reads logged against the gate register at a site, with mounting height, approach angle and lighting recorded.",
    href: "/anpr-number-plate-recognition",
    evidence: {
      projectId: "anpr-gate",
      note: "Two site photographs, mounting ~1.5 m, daylight",
      href: "/anpr-number-plate-recognition",
    },
  },
  {
    id: "hot-work",
    title: "Hot work beside flammable material",
    state: "limited pilot",
    scope:
      "Two classes — a hot-work activity and a flammable-material store — detected in the same frame on one fixed camera, in PGAK's own test setup.",
    requirement:
      "To reach available: the same two classes on a customer's own camera, with camera model, distance and confidence recorded.",
    href: "/industrial-cctv",
    evidence: {
      projectId: "hot-work-flammable",
      note: "11 s recording, PGAK test setup; camera details pending",
      href: "/industrial-cctv",
    },
  },
  // ── No evidence record yet ───────────────────────────────────────────────
  {
    id: "intrusion",
    title: "Perimeter events",
    state: "unverified",
    scope:
      "Evaluate configured zones and operating hours on a representative feed.",
    requirement:
      "A dated demonstration, approved configuration and site acceptance test.",
    href: "/ai-intruder-detection",
  },
  {
    id: "attendance",
    title: "Attendance exceptions",
    state: "unverified",
    scope:
      "Evaluate enrolled-person events and human review of missing or ambiguous records.",
    requirement:
      "Authorised enrolment, retention policy, suitable views and correction workflow.",
    href: "/face-recognition-attendance-system",
  },
  {
    id: "health",
    title: "Camera-feed health",
    state: "unverified",
    scope:
      "Evaluate interruption detection and the response process for an unavailable stream.",
    requirement:
      "Disconnect/reconnect tests and a verified notification destination.",
    href: "/multi-site-cctv-monitoring",
  },
  {
    id: "recognition",
    title: "Face recognition",
    state: "unverified",
    scope:
      "Site-specific evaluation of enrolled people; never automatic proof of identity or misconduct.",
    requirement:
      "Permissioned test set, false matches and missed matches, documented human review.",
    href: "/features/face-recognition",
  },
  {
    id: "loitering",
    title: "Loitering",
    state: "unverified",
    scope: "Evaluate presence over a defined duration in a selected zone.",
    requirement:
      "Queue, occlusion and legitimate-worker scenarios in the acceptance test.",
    href: "/features/loitering-detection",
  },
  {
    id: "vms",
    title: "Full video management system",
    state: "unverified",
    scope:
      "PGAK is presented here as an analytics layer; replacement recording, playback and retention are not established.",
    requirement:
      "Recording, search/playback, export, retention, roles, audit and recovery evidence.",
    href: "/platform/vms-integration",
  },
];
export const EVIDENCE_DATE = "2026-10-03";
export const PROOF_NOTICE =
  "PGAK has published recorded demonstrations of its own (listed on the evidence page), each with its conditions and limits. No customer result or measured accuracy report is published yet, and the deployment scenarios are illustrations, not verified deployments.";
