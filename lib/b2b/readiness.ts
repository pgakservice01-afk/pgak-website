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
  "Camera-feed health",
] as const;
export type ReadinessInput = { site: string; cameras: string; problem: string };
export function readinessChecklist(input: ReadinessInput) {
  const common = [
    "Record the camera and recorder model plus firmware version; do not share passwords.",
    "Check authorised stream access, network capacity and available processing hardware.",
    "Agree who reviews an event, who responds and how evidence is retained.",
  ];
  const checks: Record<string, string[]> = {
    "Perimeter events": [
      "Mark the zone and operating hours; include legitimate workers and deliveries in tests.",
      "Check night lighting, glare, rain, vegetation and occluded approaches.",
    ],
    "Attendance exceptions": [
      "Confirm authorised enrolment, staff notice, limited retention and a correction process.",
      "Test queues, helmets, changing light, missing events and false matches; retain human review.",
    ],
    "Camera-feed health": [
      "Test a controlled disconnect and reconnect, including recorder and network failures.",
      "Assign a maintenance owner and verify the alert channel and recovery acknowledgement.",
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
