export type CapabilityState =
  "available" | "limited pilot" | "planned" | "unverified";
export type CapabilityRecord = {
  id: string;
  title: string;
  state: CapabilityState;
  scope: string;
  requirement: string;
  href: string;
};
/** Evidence gate: marketing copy alone cannot promote a capability to available. */
export const CAPABILITY_REGISTER: CapabilityRecord[] = [
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
export const EVIDENCE_DATE = "2026-09-19";
export const PROOF_NOTICE =
  "No approved PGAK customer result or measured accuracy report is attached to this release. Published scenarios are illustrations, not verified deployments.";
