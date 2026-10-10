import WorkflowDiagram from "@/components/visuals/WorkflowDiagram";
import { BUSINESS } from "@/lib/seo";
import { SYSTEM_FLOW } from "@/lib/visuals";

/**
 * The homepage's buyer path (10 Oct 2026 brief), as server-rendered sections.
 *
 * Every sentence here is limited to what PGAK can evidence: detection runs on
 * an on-site processing unit (lib/offer.ts); four recordings are published
 * (lib/proof/projects.ts); everything else is "evaluated at your site". No
 * price, response time, free pilot, accuracy or saving is promised.
 */

// ── 3. Problem selector ─────────────────────────────────────────────────────

const PROBLEMS = [
  {
    id: "perimeter",
    title: "After-hours movement at the boundary",
    problem: "Someone in the yard at night is found in the next morning's footage.",
    workflow: "Zones and schedules on boundary cameras → an alert → a person checks the snapshot and decides.",
    evidence: "No PGAK recording published yet — zones and alert timing are tested on your cameras.",
    page: { label: "Intrusion alerts", href: "/features/intrusion-alerts" },
    next: { label: "Estimate review time", href: "/features/intrusion-alerts#scenario-C07" },
  },
  {
    id: "gate",
    title: "Vehicle records at the gate",
    problem: "Hand-written registers that nobody can search when a dispute comes up.",
    workflow: "A plate camera at the lane → a plate event with its image → the operator checks the log.",
    evidence: "A fitted plate camera and the operator console are photographed; read rate is tested at your gate.",
    page: { label: "Number-plate recognition", href: "/anpr-number-plate-recognition" },
    next: { label: "Assess my gate", href: "/anpr-number-plate-recognition#scenario-C09" },
  },
  {
    id: "counting",
    title: "Counts at the loading bay",
    problem: "Bag or carton counts that don't match the challan, and no record of when they diverged.",
    workflow: "An item crosses a set line → a count event → exceptions are reviewed against your records.",
    evidence: "PGAK recording: sacks counted across one line at a loading bay (limited pilot, conditions stated).",
    page: { label: "Warehouse CCTV", href: "/ai-cctv-for-warehouses" },
    next: { label: "Estimate counting effort", href: "/platform/capabilities#scenario-C29" },
  },
  {
    id: "attendance",
    title: "Attendance reconciliation",
    problem: "Hours each month spent fixing missed punches before payroll.",
    workflow: "Attendance records → a person reviews the exceptions → an approved export.",
    evidence: "Not yet demonstrated by PGAK — evaluated at your gate, with human review of every exception.",
    page: { label: "Face-recognition attendance", href: "/face-recognition-attendance-system" },
    next: { label: "Estimate admin time", href: "/features/attendance-automation#scenario-C28" },
  },
  {
    id: "upgrade",
    title: "Upgrading the cameras you already have",
    problem: "Being told to replace a working camera system before anyone has checked it.",
    workflow: "Camera inventory → compatibility check per model and stream → a scoped upgrade.",
    evidence: "Compatibility is confirmed per camera model, firmware and view — never by brand alone.",
    page: { label: "Add AI to existing CCTV", href: "/insights/add-ai-to-existing-cctv-cameras" },
    next: { label: "Check my cameras", href: "/platform/compatibility#check" },
  },
];

export function ProblemSelector() {
  return (
    <section className="h-sec" id="problems" aria-labelledby="problems-heading">
      <div className="h-wrap">
        <div className="h-intro">
          <p className="h-eyebrow">Start from the problem</p>
          <h2 id="problems-heading">What do you want your cameras to help with?</h2>
          <p className="h-lede">
            Pick the closest. Each card says what PGAK can show you today and what is checked on
            your own site first.
          </p>
        </div>
        <ul className="h-problems">
          {PROBLEMS.map((p) => (
            <li key={p.id} className="h-problem">
              <h3>{p.title}</h3>
              <p className="h-body">
                <strong>The problem:</strong> {p.problem}
              </p>
              <p className="h-body">
                <strong>The workflow:</strong> {p.workflow}
              </p>
              <p className="h-note">{p.evidence}</p>
              <div className="h-problem__links">
                <a href={p.next.href} className="h-btn h-btn--primary h-btn--sm" data-cta={`problem-${p.id}`}>
                  {p.next.label}
                </a>
                <a href={p.page.href} className="underline" data-cta={`problem-${p.id}-page`}>
                  {p.page.label} →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── 4. How it works ─────────────────────────────────────────────────────────

export function HowItWorks() {
  return (
    <section className="h-sec h-sec--tint" id="how-it-works" aria-labelledby="how-heading">
      <div className="h-wrap">
        <div className="h-intro">
          <p className="h-eyebrow">How it works</p>
          <h2 id="how-heading">From a camera you own to a person who decides.</h2>
          <p className="h-lede">
            Suitable cameras are reused. Detection runs on a small processing unit at your site, and
            every event ends with a person reviewing it — the system flags, people decide.
          </p>
        </div>
        <div className="h-flow">
          <WorkflowDiagram visual={SYSTEM_FLOW} showMeta={false} />
        </div>
      </div>
    </section>
  );
}

// ── 6. Evaluation process ───────────────────────────────────────────────────

const EVAL_STEPS = [
  { h: "Assess the site", p: "Compatibility findings per camera, a recommended use case, prerequisites, and what the evidence does and does not show." },
  { h: "Agree the test", p: "A written scope with acceptance criteria — what counts as a correct alert, a false one and a miss — before anything runs." },
  { h: "Review the results", p: "Measured against those criteria, including the misses, on your own cameras." },
  { h: "Choose the rollout", p: "Expand, change the scope, or stop. Nothing commits you before the written proposal." },
];

export function EvaluationProcess() {
  return (
    <section className="h-sec" id="evaluation" aria-labelledby="eval-heading">
      <div className="h-wrap">
        <div className="h-intro">
          <p className="h-eyebrow">How we evaluate</p>
          <h2 id="eval-heading">Check, test, then decide.</h2>
        </div>
        <ol className="h-evalsteps">
          {EVAL_STEPS.map((s, i) => (
            <li key={s.h}>
              <span className="h-steps__n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.h}</h3>
                <p className="h-body">{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="h-split">
          <div>
            <h3>PGAK supplies</h3>
            <ul className="h-list">
              <li>The site assessment and a written scope</li>
              <li>Configuration of the agreed analytics</li>
              <li>The processing setup named in the scope</li>
              <li>A results review against the agreed criteria</li>
            </ul>
          </div>
          <div>
            <h3>You supply</h3>
            <ul className="h-list">
              <li>Access to the recorder on site — never passwords by message</li>
              <li>A network port and power near the recorder</li>
              <li>Someone who knows the site and its routines</li>
              <li>Ground-truth notes while a test runs</li>
            </ul>
          </div>
        </div>
        <p className="h-note">
          Any pilot terms, including charges and duration, are agreed in writing before it starts.{" "}
          <a href="/resources/evaluation-method" className="underline">
            The pilot scorecard →
          </a>
        </p>
      </div>
    </section>
  );
}

// ── 7. Pricing scope ────────────────────────────────────────────────────────

export function PricingScope() {
  const rows: [string, string][] = [
    ["One-time", "Processing hardware, installation and configuration, and any camera that has to be moved or added — each line named."],
    ["Recurring, if your scope has any", "Licence or support, with the term and how renewal is priced stated in the quote."],
    ["Optional", "More analytics, more sites, extended support hours."],
    ["Quoted separately if needed", "Civil works, new cable runs, barriers and network upgrades."],
  ];
  return (
    <section className="h-sec h-sec--tint" id="pricing-scope" aria-labelledby="price-heading">
      <div className="h-wrap">
        <div className="h-intro">
          <p className="h-eyebrow">What affects the price</p>
          <h2 id="price-heading">A quote you can compare line by line.</h2>
          <p className="h-lede">
            PGAK does not publish a per-camera price: the number moves with camera count, the
            analytics on each, the number of sites and the processing a site needs. Every quote is
            itemised like this, with taxes shown separately.
          </p>
        </div>
        <dl className="h-pricegrid">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="h-note">
          <a href="/resources/scope-worksheet" className="underline">
            Build your scope first
          </a>{" "}
          ·{" "}
          <a href="/pricing" className="underline">
            How pricing works
          </a>
        </p>
      </div>
    </section>
  );
}

// ── 8. Trust and operating detail ───────────────────────────────────────────

export function OperatingDetail() {
  const a = BUSINESS.address;
  return (
    <section className="h-sec" id="who" aria-labelledby="who-heading">
      <div className="h-wrap">
        <div className="h-intro">
          <p className="h-eyebrow">Who you are dealing with</p>
          <h2 id="who-heading">A registered company in Ludhiana, with the details in plain sight.</h2>
        </div>
        <div className="h-split">
          <div>
            <h3>{BUSINESS.legalName}</h3>
            <p className="h-body">
              {a.street}, {a.area}, {a.locality}, {a.region} {a.postalCode}
              <br />
              <a href={`tel:${BUSINESS.phoneE164}`} className="underline" data-cta="who-phone">
                {BUSINESS.phone}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${BUSINESS.email}`} className="underline">
                {BUSINESS.email}
              </a>
            </p>
          </div>
          <div>
            <h3>How data is handled</h3>
            <p className="h-body">
              Detection runs on a processing unit at your site. Who can view or export footage, how
              long anything is kept, and anything that leaves the site are written into the scope
              with you. We never ask for camera passwords over WhatsApp or a web form.
            </p>
          </div>
        </div>
        <p className="h-note">
          What is proven and what is not:{" "}
          <a href="/resources/evidence" className="underline">
            recorded demonstrations
          </a>{" "}
          ·{" "}
          <a href="/platform/capabilities" className="underline">
            capability status
          </a>
          . No accuracy figure or customer saving is published yet.
        </p>
      </div>
    </section>
  );
}

// ── 9. FAQs ─────────────────────────────────────────────────────────────────

export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "Will it work with the cameras I already have?",
    a: "Often, suitable cameras can be reused, but it depends on the camera model, firmware, the stream it provides (RTSP or ONVIF), the view and the lighting. A brand name alone does not settle it. Each camera that matters is confirmed at the assessment; the two-minute self-check shows likely blockers first.",
  },
  {
    q: "I have an older DVR, not an NVR. Can it still be used?",
    a: "Many DVRs provide a network stream for each channel, so they can often be read. Analogue resolution can limit detail-heavy tasks such as reading plates or recognising faces, which is checked on a still image from each camera.",
  },
  {
    q: "Does it need internet?",
    a: "Detection runs on a processing unit at your site. Alerts to a phone and remote viewing need a connection. What continues during an internet outage is confirmed for your setup and written into the scope.",
  },
  {
    q: "Where is the video processed?",
    a: "On a processing unit installed at your site. Who can view or export footage, how long anything is kept, and anything that leaves the site are agreed with you in the written scope.",
  },
  {
    q: "Will cameras need to be moved or added?",
    a: "Sometimes. General boundary or loading-bay views are often usable as they are. Reading number plates and recognising faces need cameras placed for that job. Any camera that has to be moved or added is named in the quote.",
  },
  {
    q: "What does it cost?",
    a: "PGAK does not publish a per-camera price. The quote itemises cameras reused and added, the processing hardware, any licence or support, installation, any agreed pilot, and taxes, after the assessment.",
  },
  {
    q: "What maintenance does it need?",
    a: "Cameras still need cleaning and occasional re-aiming, recorder disks wear out, and the processing unit and software need updates. Who does what, and the support hours, are stated in the quote.",
  },
  {
    q: "What can it not do?",
    a: "PGAK publishes no accuracy figure or customer saving yet. Analytics flags events for a person to review; it does not replace guards, certified alarms or supervision, and it does not make decisions about people. Results are measured on your own cameras before any rollout.",
  },
];

export function HomeFaq() {
  return (
    <section className="h-sec h-sec--tint" id="faq" aria-labelledby="faq-heading">
      <div className="h-wrap">
        <div className="h-intro">
          <p className="h-eyebrow">Questions buyers ask</p>
          <h2 id="faq-heading">Before you enquire.</h2>
        </div>
        <div className="h-faq">
          {HOME_FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p className="h-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
