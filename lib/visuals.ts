/**
 * Explanatory visuals — illustrations and diagrams, kept apart from proof.
 *
 * Nothing here is evidence. Approved PGAK recordings live only in
 * lib/proof/projects.ts behind its publication gate; this registry must never
 * be merged into it. Every entry carries a role, provenance, alt text and the
 * caption that must render beside it, so a concept can never be shown as if
 * it were a deployment.
 *
 * Diagrams are drawn as inline SVG from these records (components/visuals/
 * WorkflowDiagram.tsx): the text is real HTML, so it is readable, translatable
 * and accessible, and the layout stacks on a phone instead of shrinking.
 */

export type VisualRole = "illustration" | "diagram" | "demo" | "site-photo";

export type VisualRecord = {
  id: string;
  role: VisualRole;
  title: string;
  /** Short alt text for the graphic as a whole. */
  alt: string;
  /** Visible caption, rendered beside the visual. Mandatory for concepts. */
  caption: string;
  provenance: string;
  /** Feature registry / guide ids and calculator scenario the visual explains. */
  featureIds: string[];
  calculatorId?: string;
  cta: { label: string; href: string };
  /** Diagrams only. */
  steps?: string[];
  benefit?: string;
  limit?: string;
  /** Raster illustrations only: files must exist in /public before use. */
  files?: { src: string; width: number; height: number }[];
  status: "ready" | "blocked: source file not supplied";
};

const DIAGRAM_PROVENANCE =
  "Drawn by PGAK as an explanatory diagram (inline SVG), 10 October 2026. Not a product screenshot or a customer result.";

export const DIAGRAMS: VisualRecord[] = [
  {
    id: "reuse-workflow",
    role: "diagram",
    title: "Check before replacing your cameras",
    alt: "Three steps: existing cameras, a compatibility check, then a scoped upgrade.",
    caption: "Illustrative workflow. Reuse depends on the camera, stream, network, scene and workload, confirmed at the assessment.",
    provenance: DIAGRAM_PROVENANCE,
    featureIds: ["onvif-integration", "F18"],
    calculatorId: "C24",
    cta: { label: "Check my cameras", href: "/platform/compatibility#check" },
    steps: ["Existing cameras", "Compatibility check", "Scoped upgrade"],
    benefit: "Potential benefit: avoid replacing cameras that can be reused.",
    limit: "Reuse depends on camera, stream, network, scene and workload.",
    status: "ready",
  },
  {
    id: "incident-workflow",
    role: "diagram",
    title: "Give the reviewer the relevant event",
    alt: "Three steps: a recorded event, finding the relevant clip, then human review.",
    caption: "Illustrative workflow. Search capability and any time saved must be tested on your own footage.",
    provenance: DIAGRAM_PROVENANCE,
    featureIds: ["natural-language-search", "cross-camera-search", "F08"],
    calculatorId: "C01",
    cta: { label: "Estimate review time", href: "/features/guides/natural-language-search#scenario-C01" },
    steps: ["Recorded event", "Find the relevant clip", "Human review"],
    benefit: "Potential benefit: less repetitive footage scanning.",
    limit: "Search capability and time saved must be tested on the actual site.",
    status: "ready",
  },
  {
    id: "gate-workflow",
    role: "diagram",
    title: "Connect vehicle images with gate records",
    alt: "Three steps: a vehicle at the gate, a plate event with its image, then an operator checking the log.",
    caption: "Illustrative workflow. Recognition depends on approach angle, lighting and plate visibility; it is tested at your gate.",
    provenance: DIAGRAM_PROVENANCE,
    featureIds: ["number-plates", "vehicle-and-anpr", "F03", "anpr"],
    calculatorId: "C09",
    cta: { label: "Assess my gate", href: "/anpr-number-plate-recognition#scenario-C09" },
    steps: ["Vehicle at the gate", "Plate event and image", "Operator checks the log"],
    benefit: "Potential benefit: less hand-written logging and faster checking.",
    limit: "Recognition depends on approach, lighting and plate visibility.",
    status: "ready",
  },
  {
    id: "warehouse-workflow",
    role: "diagram",
    title: "Review the count at the loading line",
    alt: "Three steps: an item crosses a line, a count event is recorded, then exceptions are reviewed.",
    caption: "Illustrative workflow. A line counter is not an inventory or ERP reconciliation system.",
    provenance: DIAGRAM_PROVENANCE,
    featureIds: ["line-count", "sack-counting"],
    calculatorId: "C29",
    cta: { label: "Estimate counting effort", href: "/platform/capabilities#scenario-C29" },
    steps: ["Item crosses the line", "Count event recorded", "Review exceptions"],
    benefit: "Potential benefit: less manual counting at the bay.",
    limit: "A line counter is not a complete inventory or ERP reconciliation system.",
    status: "ready",
  },
  {
    id: "attendance-workflow",
    role: "diagram",
    title: "Spend less time reconciling attendance",
    alt: "Three steps: attendance records, exception review, then an approved export.",
    caption: "Illustrative workflow. Integrations and approvals must be verified; time saved is not automatically cash saved.",
    provenance: DIAGRAM_PROVENANCE,
    featureIds: ["attendance-automation", "attendance"],
    calculatorId: "C28",
    cta: { label: "Estimate admin time", href: "/features/attendance-automation#scenario-C28" },
    steps: ["Attendance records", "Exception review", "Approved export"],
    benefit: "Potential benefit: free administrative time.",
    limit: "Integrations and approvals must be verified. Time saved is not automatically cash saved.",
    status: "ready",
  },
  {
    id: "ppe-workflow",
    role: "diagram",
    title: "Help supervisors review PPE observations",
    alt: "Three steps: a visible PPE observation, supervisor review, then a recorded follow-up.",
    caption: "Illustrative workflow. It does not certify compliance or replace supervision.",
    provenance: DIAGRAM_PROVENANCE,
    featureIds: ["ppe-detection", "F13", "ppe"],
    calculatorId: "C14",
    cta: { label: "Plan a PPE evaluation", href: "/features/guides/ppe-detection#scenario-C14" },
    steps: ["Visible PPE observation", "Supervisor review", "Recorded follow-up"],
    benefit: "Potential benefit: support targeted review.",
    limit: "Illustrative workflow; does not certify compliance or replace supervision.",
    status: "ready",
  },
];

/** The flow the homepage explains first. Separate because it has four steps. */
export const SYSTEM_FLOW: VisualRecord = {
  id: "system-flow",
  role: "diagram",
  title: "How it works",
  alt: "Four steps: a compatible camera or recorder stream, an on-site processing unit, an event or record, and a person who reviews it.",
  caption:
    "Illustrative system flow. Detection runs on a processing unit at your site; which functions need internet (for example alerts to a phone) is confirmed at the assessment.",
  provenance: DIAGRAM_PROVENANCE,
  featureIds: ["edge-ai", "F05"],
  calculatorId: "C05",
  cta: { label: "Check my cameras", href: "/platform/compatibility#check" },
  steps: ["Compatible camera or recorder stream", "Processing unit at your site", "Event or record", "A person reviews and acts"],
  status: "ready",
};

/**
 * The three concept illustrations named in the 10 Oct brief. Their source
 * files and Image_Manifest.json were not present on the build machine, so
 * they are registered but blocked; nothing renders them until the files are
 * supplied, checked against the manifest and placed in /public.
 */
export const ILLUSTRATIONS: VisualRecord[] = [
  {
    id: "camera-reuse",
    role: "illustration",
    title: "Check what can be reused",
    alt: "Concept illustration of cameras at a warehouse connected to analysis and a supervisor.",
    caption: "Illustrative system concept. Reuse depends on verified compatibility and site conditions.",
    provenance: "AI-generated concept illustration supplied with the 10 Oct 2026 brief. Not product or customer evidence.",
    featureIds: ["onvif-integration"],
    calculatorId: "C24",
    cta: { label: "Check my cameras", href: "/platform/compatibility#check" },
    files: [
      { src: "/illustrations/camera-reuse-768.webp", width: 768, height: 432 },
      { src: "/illustrations/camera-reuse-1280.webp", width: 1280, height: 720 },
    ],
    status: "blocked: source file not supplied",
  },
  {
    id: "incident-review",
    role: "illustration",
    title: "Help people review the relevant event",
    alt: "Concept illustration contrasting many footage tiles with a focused human review of event clips.",
    caption: "Illustrative review workflow. Search capability and time savings require site testing.",
    provenance: "AI-generated concept illustration supplied with the 10 Oct 2026 brief. Not product or customer evidence.",
    featureIds: ["natural-language-search"],
    calculatorId: "C01",
    cta: { label: "Estimate review time", href: "/features/guides/natural-language-search#scenario-C01" },
    files: [
      { src: "/illustrations/incident-review-768.webp", width: 768, height: 432 },
      { src: "/illustrations/incident-review-1280.webp", width: 1280, height: 720 },
    ],
    status: "blocked: source file not supplied",
  },
  {
    id: "vehicle-log",
    role: "illustration",
    title: "Make gate records easier to check",
    alt: "Concept illustration of a vehicle at a gate and an operator reviewing an image-linked record.",
    caption: "Illustrative gate workflow. Recognition and integration depend on site conditions.",
    provenance: "AI-generated concept illustration supplied with the 10 Oct 2026 brief. Not product or customer evidence.",
    featureIds: ["number-plates"],
    calculatorId: "C09",
    cta: { label: "Assess my gate", href: "/anpr-number-plate-recognition#scenario-C09" },
    files: [
      { src: "/illustrations/vehicle-log-768.webp", width: 768, height: 432 },
      { src: "/illustrations/vehicle-log-1280.webp", width: 1280, height: 720 },
    ],
    status: "blocked: source file not supplied",
  },
];

export const diagramById = (id: string) =>
  [...DIAGRAMS, SYSTEM_FLOW].find((d) => d.id === id);
