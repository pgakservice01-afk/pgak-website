import BuyerPage from "./Page";
import QuickLead from "@/components/sections/QuickLead";
import { BUYER_SOLUTIONS } from "@/lib/b2b/solutions";
import { PROOF_NOTICE } from "@/lib/b2b/claims";
export default function BuyerSolution({ slug }: { slug: string }) {
  const s = BUYER_SOLUTIONS[slug];
  return (
    <BuyerPage
      title={s.title}
      intro={s.intro}
      path={`/${slug}`}
      eyebrow={
        s.kind === "industry" ? "INDUSTRY WORKFLOW" : "PROBLEM & REQUIREMENTS"
      }
    >
      <div className="action-row">
        <a
          href="#dealer"
          className="btn btn-primary"
          data-cta={`${slug}-assessment`}
        >
          Check this use case →
        </a>
        <a href="/platform/capabilities" className="text-link">
          Capability status
        </a>
      </div>
      <section>
        <h2>
          {s.kind === "industry"
            ? "Start with the operating workflow"
            : "Who this evaluation is for"}
        </h2>
        <p>{s.workflow}</p>
      </section>
      <section className="buyer-split">
        <div>
          <h2>Define an observable event</h2>
          <p>{s.event}</p>
        </div>
        <div className="buyer-notice">
          <h3>Limitations to test</h3>
          <p>{s.limits}</p>
        </div>
      </section>
      <section>
        <h2>Technical requirements</h2>
        <ul className="buyer-list">
          {s.requirements.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <a href="/platform/compatibility" className="text-link">
          Camera and stream requirements →
        </a>
      </section>
      <section>
        <div className="evidence-meta">
          <span>Illustration</span>
          <span>Not a customer result</span>
        </div>
        <h2>A scoped deployment example</h2>
        <p>{s.example}</p>
      </section>
      <section>
        <h2>Acceptance-test approach</h2>
        <p>{s.test}</p>
        <a href="/resources/evaluation-method" className="text-link">
          Use the evaluation worksheet →
        </a>
      </section>
      <section>
        <h2>Available evidence</h2>
        <p>{PROOF_NOTICE}</p>
        <p>
          This use case remains unverified as an available PGAK capability until
          an approved demonstration and configuration record is attached. Ask
          for evidence of the exact workflow you need.
        </p>
        <a href="/resources/evidence" className="text-link">
          Inspect evidence status →
        </a>
      </section>
      <section>
        <h2>Cost drivers and responsibilities</h2>
        <p>
          Camera count is only one input. Include processing, site preparation,
          configuration, integration, support, taxes and contract terms. Agree
          who maintains the feeds, reviews events and responds during an outage.
        </p>
        <a href="/pricing" className="text-link">
          Understand project pricing →
        </a>
      </section>
      <section>
        <h2>Privacy and safety boundaries</h2>
        <p>{s.privacy}</p>
      </section>
      <section id="dealer">
        <h2>Discuss this use case</h2>
        <p className="mb-6">
          Send a callback request with this page’s context. Camera count is
          optional; do not include credentials or footage.
        </p>
        <QuickLead
          cta={`solution-${slug}`}
          context={`Requested evaluation: ${s.title}. Compatibility and capability evidence not yet verified.`}
        />
      </section>
      <section>
        <h2>Continue your evaluation</h2>
        <div className="action-row">
          <a href="/solutions">Solutions hub →</a>
          <a href="/resources">Technical resources →</a>
          <a href="/platform/deployment">Deployment responsibilities →</a>
        </div>
      </section>
    </BuyerPage>
  );
}
