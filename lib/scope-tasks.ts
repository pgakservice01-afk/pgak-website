import type { ScopeTask } from "@/components/tools/ScopeBuilder";
import { FEATURE_TRUTH } from "@/lib/feature-truth";

/** Tasks the builder offers, with needs in plain words and evidence derived
 *  from the feature-truth registry (never typed by hand). */
const TASK_DEFS: { id: string; scenario: string; label: string; needs: string }[] = [
  { id: "intrusion", scenario: "C07", label: "After-hours intrusion", needs: "A view of the boundary or zone where a person would walk; schedules; who is alerted." },
  { id: "anpr", scenario: "C09", label: "Vehicle plates at a gate", needs: "A camera placed for plates: lane-facing, near plate height, where vehicles slow." },
  { id: "counting", scenario: "C29", label: "Counting at a loading bay", needs: "A view across the line items cross, where items do not hide each other." },
  { id: "attendance", scenario: "C28", label: "Attendance", needs: "A camera at face height where people pass one at a time; an exception-review routine." },
  { id: "ppe", scenario: "C14", label: "PPE review", needs: "A clear view of the work area at enough detail to see the item checked." },
  { id: "health", scenario: "C31", label: "Camera health checks", needs: "Access to every stream; a person who acts when a camera goes dark." },
  { id: "remote", scenario: "C27", label: "Viewing several sites", needs: "A reachable internet connection at each site." },
  { id: "search", scenario: "C01", label: "Searching recorded footage", needs: "Recordings in a format and retention the search tool can index." },
];

const EVIDENCE_TEXT: Record<string, string> = {
  "limited pilot": "PGAK recording published, with conditions and limits",
  unverified: "No PGAK recording yet — evaluated at your site",
  educational: "Industry capability — evaluated at your site",
  available: "Available for a defined configuration",
  planned: "Planned — not purchasable today",
};

export function scopeTasks(): ScopeTask[] {
  return TASK_DEFS.map((t) => {
    const truth = FEATURE_TRUTH.find((f) => f.scenarioId === t.scenario);
    return {
      id: t.id,
      label: t.label,
      needs: t.needs,
      evidence: !truth
        ? "Evaluated at your site"
        : truth.evidence[0]?.type === "photographs"
          ? "PGAK installation photographs published — they show a fitting, not a read rate"
          : EVIDENCE_TEXT[truth.availability],
      calculatorHref: truth ? `${truth.canonicalRoute}#scenario-${t.scenario}` : "/calculators",
    };
  });
}

