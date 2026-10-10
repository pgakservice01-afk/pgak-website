/**
 * Viewing notes for the demo library on /resources/evidence.
 *
 * Annotations only: each entry is keyed to a record in lib/proof/projects.ts
 * and renders only when that record is published (publishedProjects()). It
 * adds no evidence, date or claim of its own — "what to watch" points at what
 * is visibly in the approved clip or photograph, nothing beyond it.
 */
export type DemoTask = "ppe" | "counting" | "gate" | "safety";

export const DEMO_TASKS: { id: DemoTask; label: string }[] = [
  { id: "ppe", label: "PPE review" },
  { id: "counting", label: "Counting" },
  { id: "gate", label: "Gate records" },
  { id: "safety", label: "Hot work and safety" },
];

export type DemoGuide = {
  projectId: string;
  task: DemoTask;
  watch: string;
  shows: string;
  calculator: { label: string; href: string };
  next: { label: string; href: string };
};

export const DEMO_GUIDE: DemoGuide[] = [
  {
    projectId: "ppe-assembly-line",
    task: "ppe",
    watch: "The boxes sit on hands, not whole people, with the model's confidence beside each — one at 0.75, one at 0.27, left in for a supervisor to judge.",
    shows: "Bare hands flagged on a camera already fitted above a production line.",
    calculator: { label: "Estimate PPE review effort", href: "/features/guides/ppe-detection#scenario-C14" },
    next: { label: "Plan a PPE evaluation", href: "/free-audit" },
  },
  {
    projectId: "dock-count",
    task: "counting",
    watch: "Each sack gets a tracking number as it crosses the line, so the same sack is not counted twice; the running total climbs from four to seven.",
    shows: "Sacks counted across one configured line on an existing dock camera.",
    calculator: { label: "Estimate counting effort", href: "/platform/capabilities#scenario-C29" },
    next: { label: "Check my loading-bay cameras", href: "/platform/compatibility#check" },
  },
  {
    projectId: "anpr-gate",
    task: "gate",
    watch: "Where the camera actually sits on the pillar and the lane it looks along — placement decides plate reading more than software does.",
    shows: "A plate camera as fitted at a gate, photographed; no plate reading is shown.",
    calculator: { label: "Estimate gate handling time", href: "/anpr-number-plate-recognition#scenario-C09" },
    next: { label: "Assess my gate", href: "/free-audit" },
  },
  {
    projectId: "hot-work-flammable",
    task: "safety",
    watch: "Two boxes in one frame — the grinding and the drums with hazard diamonds. Neither matters alone; together they are worth a person's attention.",
    shows: "Hot work flagged beside flammable storage in PGAK's own test setup, not a customer site.",
    calculator: { label: "Estimate review effort", href: "/platform/capabilities#scenario-C30" },
    next: { label: "Plan a supervised evaluation", href: "/free-audit" },
  },
];

export const guideFor = (projectId: string) => DEMO_GUIDE.find((g) => g.projectId === projectId);
