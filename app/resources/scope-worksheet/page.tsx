import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import PrintButton from "@/components/PrintButton";
import { pageMeta } from "@/lib/seo";
import ScopeBuilder, { type ScopeTask } from "@/components/tools/ScopeBuilder";
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

function scopeTasks(): ScopeTask[] {
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

export const metadata = pageMeta({
  title: "AI CCTV scope worksheet to print and fill in | PGAK",
  description:
    "A printable worksheet to scope an AI CCTV project before any quote: camera inventory, use cases with acceptance tests, responsibilities and data handling.",
  path: "/resources/scope-worksheet",
});

const CAMERA_ROWS = 10;

const RESPONSIBILITIES = [
  "Stream access on each recorder or camera (done on site, never shared in a message)",
  "Network connection between the recorder and the processing unit",
  "Power and a ventilated place for the on-site processing unit",
  "Processing hardware, licences and their renewal dates",
  "Who receives each alert, and the fallback contact",
  "Who responds on site, and within what time the business expects",
  "Footage retention period and who may view, export or delete",
  "Maintenance: cleaning, re-aiming, disk replacement, firmware updates",
  "Checking that every camera is still recording, and how often",
];

/**
 * A worksheet, not a form: it is printed or saved as a PDF and filled in by
 * hand, so nothing typed here reaches anyone. That is deliberate — it holds
 * site layouts and contacts that do not belong in a web form or a URL.
 */
export default function Page() {
  return (
    <BuyerPage
      title="AI CCTV scope worksheet"
      intro="Fill this in before asking anyone for a quote. Two suppliers quoting from the same worksheet can be compared line by line; two quoting from a phone call cannot."
      path="/resources/scope-worksheet"
      eyebrow="TECHNICAL BUYER GUIDE"
    >
      <div className="evidence-meta">
        <span>Print or save as PDF</span>
        <span>Do not write passwords or stream addresses on it</span>
      </div>
      <ScopeBuilder tasks={scopeTasks()} />

      <h2>Or fill the worksheet by hand</h2>
      <PrintButton />

      <section>
        <h2>1. The site</h2>
        <table className="buyer-table">
          <tbody>
            {["Site name and town", "What the site does (manufacturing, warehouse, retail…)", "Operating hours and shifts", "Who decides on this project", "Who manages the network / IT", "Internet at the site (yes / no, which connection)"].map((r) => (
              <tr key={r}><th scope="row" style={{ width: "45%" }}>{r}</th><td>&nbsp;</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>2. Recorder and cameras</h2>
        <p>
          One row per camera that matters to the use case. Model numbers come from the label on
          the camera or recorder; a photo of the label is better than a guess. A brand is not
          enough — compatibility is decided per model and firmware.
        </p>
        <p><strong>Recorder:</strong> make ________ model ________ channels ____ disk size ____ TB</p>
        <div className="buyer-table-wrap">
          <table className="buyer-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Location</th>
                <th scope="col">Camera model</th>
                <th scope="col">Channel</th>
                <th scope="col">What it must see or do</th>
                <th scope="col">Lit at night?</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: CAMERA_ROWS }, (_, i) => (
                <tr key={i}><td>{i + 1}</td><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>3. Use cases and how each will be accepted</h2>
        <p>
          Write the event in observable terms, then how you will judge it in a pilot. Agree the
          numbers before the pilot starts — see the{" "}
          <a href="/resources/evaluation-method" className="text-link">pilot scorecard</a>.
        </p>
        <div className="buyer-table-wrap">
          <table className="buyer-table">
            <thead>
              <tr>
                <th scope="col">Use case</th>
                <th scope="col">Event, zone and hours</th>
                <th scope="col">Who is told, how</th>
                <th scope="col">Acceptance test (precision, recall, false alerts a day, delay)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>Illustrative: after-hours intrusion</em></td>
                <td><em>A person inside the rear yard between 22:00 and 06:00</em></td>
                <td><em>Night supervisor by phone alert; owner as fallback</em></td>
                <td><em>Agreed before the pilot: recall ≥ __%, false alerts ≤ __ a night, alert within __ s</em></td>
              </tr>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i}><td>&nbsp;</td><td></td><td></td><td></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>4. Who is responsible for what</h2>
        <table className="buyer-table">
          <thead>
            <tr><th scope="col">Item</th><th scope="col">Site owner</th><th scope="col">Installer</th><th scope="col">Analytics supplier</th></tr>
          </thead>
          <tbody>
            {RESPONSIBILITIES.map((r) => (
              <tr key={r}><th scope="row">{r}</th><td>☐</td><td>☐</td><td>☐</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>5. What the quote must itemise</h2>
        <ul className="buyer-list">
          <li>Cameras reused, and any camera to be moved, replaced or added — each named</li>
          <li>On-site processing hardware: model, quantity, warranty</li>
          <li>Software or licences: what each covers, term, renewal price basis</li>
          <li>Installation, configuration and the pilot — what is included</li>
          <li>Support: hours, response time versus fix time, who replaces failed hardware</li>
          <li>Taxes stated separately, and anything excluded</li>
        </ul>
      </section>

      <section>
        <h2>6. Sign-off</h2>
        <p>Scoped by ____________ date ________ &nbsp; Reviewed by ____________ date ________</p>
      </section>

      <BuyerCTA label="Ask for a site-specific assessment" href="/free-audit" />
    </BuyerPage>
  );
}
