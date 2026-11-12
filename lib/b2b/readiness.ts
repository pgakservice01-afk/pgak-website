export const SITE_TYPES = [
  "Not sure",
  "Factory",
  "Warehouse",
  "Office",
  "Retail",
  "Multiple sites",
] as const;
export const PROBLEMS = [
  "Not sure",
  "Perimeter events",
  "Attendance exceptions",
  "Vehicle entry / ANPR",
  "Camera-feed health",
  "Loading / object counting",
] as const;
export type ReadinessInput = { site: string; cameras: string; problem: string };
export function readinessChecklist(input: ReadinessInput) {
  const common = [
    "Record the camera and recorder model plus firmware version; do not share passwords.",
    "Check authorised stream access, network capacity and available processing hardware.",
    "Name the agreed event reviewer, responder and backup; define retention, then test notification receipt and acknowledgement.",
  ];
  const checks: Record<string, string[]> = {
    "Perimeter events": [
      "Mark the zone and operating hours; include legitimate workers and deliveries in tests.",
      "Check night lighting, glare, rain, vegetation and occluded approaches.",
    ],
    "Attendance exceptions": [
      "Confirm authorised enrolment, staff notice, limited retention and a correction process.",
      "Test actual workwear, queues, lighting, missed events and false matches. Keep required PPE on; agree an authorised fallback and correction owner.",
    ],
    "Vehicle entry / ANPR": [
      "Define whether you need a vehicle record, a plate read or an access decision; these are separate requirements.",
      "Test each proposed lane view with day and night traffic, plate angles, headlights, stopping positions and unreadable plates.",
      "Agree manual review, authorised access lists and retention; barrier integration and safety need their own approval and acceptance test.",
    ],
    "Camera-feed health": [
      "Test a controlled disconnect and reconnect, including recorder and network failures.",
      "Assign a maintenance owner and verify the alert channel and recovery acknowledgement.",
    ],
    "Loading / object counting": [
      "Define the unit and movement direction. Include reversals, returns, overlapping objects and obscured views in the evaluation.",
      "Separate a visible count from SKU or serial identification. Confirm any barcode, QR or stock-system requirement independently.",
      "Agree a permissioned representative sample and reference count, then record misses, duplicates and exclusions before deciding whether a pilot is suitable.",
    ],
  };
  return [
    ...common,
    ...(checks[input.problem] ?? [
      "Choose one observable problem and define a repeatable acceptance test before a pilot.",
    ]),
    ...(input.site === "Multiple sites"
      ? [
          "Document each site's network owner, time zone, roles and escalation contact.",
        ]
      : []),
  ];
}
export function projectBrief(input: ReadinessInput) {
  return [
    `Site: ${input.site || "Not sure"}`,
    `Cameras: ${input.cameras || "Not sure"}`,
    `Problem: ${input.problem || "Not sure"}`,
    "Compatibility: Not yet verified",
    "Open questions: model/firmware, stream access, lighting, processing, retention and response owner",
  ].join("\n");
}
