import Evidence from "@/components/b2b/Evidence";
import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import { PROOF_NOTICE, EVIDENCE_DATE } from "@/lib/b2b/claims";
export const metadata = pageMeta({
  title: "Evidence you can inspect | PGAK",
  description:
    "Evidence should identify the function, conditions, date, method and limitations. A demonstration is not a measured customer result.",
  path: "/resources/evidence",
});
export default function Page() {
  return (
    <BuyerPage
      title="Evidence you can inspect"
      intro="Evidence should identify the function, conditions, date, method and limitations. A demonstration is not a measured customer result."
      path="/resources/evidence"
      eyebrow="EVIDENCE"
    >
      <section>
        <div className="evidence-meta">
          <span>Evidence status</span>
          <span>Reviewed {EVIDENCE_DATE}</span>
        </div>
        <h2>Approved deployment evidence</h2>
        <p>{PROOF_NOTICE}</p>
        <p>
          No customer footage, product interface or measured result is presented
          here as approved evidence. Third-party reference clips used in the
          earlier design are excluded from this buying journey.
        </p>
      </section>
      <section>
        <h2>What a useful demonstration should establish</h2>
        <ul className="buyer-list">
          <li>
            The supported function and exact software/processing configuration.
          </li>
          <li>
            The source of the scene: customer deployment, permissioned lab test
            or illustration.
          </li>
          <li>
            Camera/firmware settings, site conditions and relevant constraints.
          </li>
          <li>
            What the operator sees, the evidence format, recipient and handling
            process.
          </li>
          <li>
            False alerts, missed events and failures, with a denominator and
            test method for any measurement.
          </li>
        </ul>
        <a href="/resources/evaluation-method" className="text-link">
          Use the test worksheet →
        </a>
      </section>
      <section>
        <h2>Illustrative deployment scenarios</h2>
        <p>
          The existing scenarios explain a possible approach. They are separate
          from verified customer results.
        </p>
        <a href="/insights/case-studies" className="text-link">
          Read labelled scenarios →
        </a>
      </section>
      <section>
        <h2>Architecture illustration record</h2>
        <Evidence
          record={{
            id: "architecture-illustration",
            title: "From a camera feed to human review",
            kind: "Illustration",
            date: "19 September 2026",
            functionShown:
              "A proposed operating architecture, shown on the homepage. No live PGAK interface or customer footage is used.",
            conditions:
              "Conceptual drawing only. Stream, processing, evidence and response steps require technical verification.",
            limitations:
              "Does not establish implementation, compatibility, detection accuracy, notification channels or customer outcomes.",
            transcript:
              "A compatible stream is assessed; processing and rules are scoped; event evidence and delivery are tested; an authorised person owns the response.",
          }}
        />
      </section>
      <BuyerCTA label="Request a product demonstration" href="/book-demo" />
    </BuyerPage>
  );
}
