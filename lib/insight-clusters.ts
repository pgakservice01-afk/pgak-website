/**
 * Topic clusters for /insights, from the B001–B100 article ledger
 * (docs/pgak-growth-implementation-log/article-briefs.tsv). Articles outside
 * the ledger fall back by category, so every post lands in exactly one cluster.
 */
export type ClusterId =
  | "buying-retrofit"
  | "storage-operations"
  | "perimeter-alerts"
  | "attendance"
  | "anpr-access"
  | "safety-counting"
  | "retail-sites"
  | "investigation-integration"
  | "privacy-governance"
  | "local-procurement";

export const CLUSTERS: { id: ClusterId; name: string }[] = [
  { id: "buying-retrofit", name: "Buying and retrofit" },
  { id: "storage-operations", name: "Storage and operations" },
  { id: "perimeter-alerts", name: "Perimeter and alerts" },
  { id: "attendance", name: "Attendance" },
  { id: "anpr-access", name: "ANPR and access" },
  { id: "safety-counting", name: "Safety and counting" },
  { id: "retail-sites", name: "Retail and sites" },
  { id: "investigation-integration", name: "Investigation and integration" },
  { id: "privacy-governance", name: "Privacy and governance" },
  { id: "local-procurement", name: "Local and procurement" },
];

const BY_SLUG: Record<string, ClusterId> = {
  "aadhaar-based-attendance-and-aebas-explained": "privacy-governance",
  "abandoned-object-detection-evaluation": "safety-counting",
  "add-ai-to-existing-cctv-cameras": "buying-retrofit",
  "ai-cctv-30-day-value-review": "local-procurement",
  "ai-cctv-alert-response-sop": "perimeter-alerts",
  "ai-cctv-false-alarms-how-to-reduce": "perimeter-alerts",
  "ai-cctv-for-small-shops-worth-it": "local-procurement",
  "ai-cctv-pilot-acceptance-checklist": "buying-retrofit",
  "ai-cctv-price-in-india-what-it-should-cost": "buying-retrofit",
  "ai-cctv-proposal-comparison-checklist": "local-procurement",
  "ai-cctv-vs-normal-cctv": "buying-retrofit",
  "ai-cctv-vs-security-guard-cost": "perimeter-alerts",
  "ai-video-event-summary-review": "investigation-integration",
  "anpr-gate-automation-cost-india": "anpr-access",
  "anpr-number-plate-recognition-when-it-works": "anpr-access",
  "anpr-pilot-accuracy-checklist": "anpr-access",
  "anpr-vehicle-history-permissions": "anpr-access",
  "anpr-vs-rfid-factory-gate": "anpr-access",
  "attendance-admin-time-roi": "attendance",
  "attendance-data-retention-what-to-delete": "privacy-governance",
  "attendance-records-law-india": "privacy-governance",
  "attendance-system-for-contract-labour": "attendance",
  "biometric-attendance-machine-price-in-india": "attendance",
  "biometric-attendance-payroll-integration": "attendance",
  "camera-resolution-vs-distance": "storage-operations",
  "carton-counting-video-pilot": "safety-counting",
  "cctv-ai-processor-electricity-cost": "storage-operations",
  "cctv-amc-what-should-it-include": "storage-operations",
  "cctv-blind-spots-where-thieves-look": "perimeter-alerts",
  "cctv-camera-offline-how-to-know": "storage-operations",
  "cctv-camera-tampering-detection": "perimeter-alerts",
  "cctv-dealer-ai-project-margin": "local-procurement",
  "cctv-footage-legal-evidence-india": "privacy-governance",
  "cctv-monsoon-failures": "storage-operations",
  "cctv-new-rule-2026-india-stqc-er-compliance": "privacy-governance",
  "cctv-role-based-access-policy": "privacy-governance",
  "cctv-signage-requirements-india": "privacy-governance",
  "cctv-storage-how-many-days": "storage-operations",
  "cctv-total-cost-of-ownership-5-years": "buying-retrofit",
  "cold-storage-monitoring-cameras": "retail-sites",
  "compare-ai-video-analytics-suppliers-india": "buying-retrofit",
  "cross-camera-search-evaluation": "investigation-integration",
  "custom-text-video-alerts": "investigation-integration",
  "does-ai-cctv-work-without-internet": "buying-retrofit",
  "does-ai-work-with-tapo-imou-qubo-cameras": "buying-retrofit",
  "dvr-vs-nvr-which-do-you-have": "storage-operations",
  "employee-refuses-biometric-consent": "privacy-governance",
  "face-recognition-attendance-vs-biometric-machine": "attendance",
  "face-recognition-human-review-policy": "privacy-governance",
  "face-recognition-low-light-gate": "anpr-access",
  "factory-cctv-handover-checklist": "local-procurement",
  "fingerprint-attendance-system-why-it-fails": "attendance",
  "h264-h265-cctv-storage-test": "storage-operations",
  "hospital-video-analytics-planning": "retail-sites",
  "hot-work-video-monitoring": "safety-counting",
  "housing-society-gate-management": "anpr-access",
  "how-does-ai-intruder-detection-work": "perimeter-alerts",
  "how-many-cameras-does-a-warehouse-need": "retail-sites",
  "how-to-choose-a-cctv-installation-company": "local-procurement",
  "how-to-stop-proxy-attendance": "attendance",
  "ip-vs-analogue-cameras-india": "storage-operations",
  "is-ai-cctv-legal-in-india-dpdp-act": "privacy-governance",
  "late-mark-policy-design": "attendance",
  "loitering-detection-explained": "perimeter-alerts",
  "ludhiana-factory-cctv-site-survey": "local-procurement",
  "masks-helmets-turbans-face-recognition": "anpr-access",
  "multi-location-attendance-management": "attendance",
  "natural-language-cctv-search-evaluation": "investigation-integration",
  "night-shift-attendance-tracking": "attendance",
  "nri-property-security-plan": "local-procurement",
  "onsite-video-ai-tuning": "investigation-integration",
  "onvif-ai-compatibility-checklist": "investigation-integration",
  "people-counting-footfall-cctv": "retail-sites",
  "person-vehicle-detection-alert-design": "perimeter-alerts",
  "ppe-detection-site-acceptance": "safety-counting",
  "ppe-glove-detection-pilot": "safety-counting",
  "privacy-masking-video-export": "investigation-integration",
  "ptz-auto-tracking-limitations": "investigation-integration",
  "queue-analytics-retail-roi": "retail-sites",
  "remote-cctv-bandwidth-calculation": "storage-operations",
  "remote-cctv-multi-site-roi": "investigation-integration",
  "retail-heat-map-layout-testing": "retail-sites",
  "reuse-existing-cctv-or-replace": "buying-retrofit",
  "rice-sheller-grain-mandi-security": "retail-sites",
  "sack-counting-loading-bay": "safety-counting",
  "school-gate-security-workflow": "retail-sites",
  "showroom-retail-shrinkage": "retail-sites",
  "sound-classification-cctv-evaluation": "safety-counting",
  "tailgating-detection-access-control": "anpr-access",
  "textile-unit-security-attendance": "retail-sites",
  "truck-entry-queue-time": "anpr-access",
  "two-way-audio-unmanned-gate": "perimeter-alerts",
  "video-near-miss-review-workflow": "safety-counting",
  "video-smoke-detection-limitations": "safety-counting",
  "virtual-tripwire-vs-motion-detection": "perimeter-alerts",
  "weapon-detection-cctv-evaluation": "safety-counting",
  "what-is-video-analytics-software": "buying-retrofit",
  "what-to-do-day-after-a-theft": "local-procurement",
};

const BY_CATEGORY: Record<string, ClusterId> = {
  Attendance: "attendance",
  Compliance: "privacy-governance",
  "Buying Guide": "buying-retrofit",
  "Camera Setup": "storage-operations",
  "Warehouse Security": "retail-sites",
  Retail: "retail-sites",
  Monitoring: "investigation-integration",
  Alerts: "perimeter-alerts",
  "Proactive Security": "perimeter-alerts",
  "Security Basics": "perimeter-alerts",
};

export function clusterOf(slug: string, category: string): ClusterId {
  return BY_SLUG[slug] ?? BY_CATEGORY[category] ?? "buying-retrofit";
}
