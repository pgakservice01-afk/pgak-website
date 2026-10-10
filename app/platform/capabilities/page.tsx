import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import { CAPABILITY_REGISTER, EVIDENCE_DATE } from "@/lib/b2b/claims";
import FeatureScenario from "@/components/calc/FeatureScenario";
import { scenariosForPath } from "@/lib/calc/scenarios";
export const metadata = pageMeta({
  title: "Capability and evidence register | PGAK",
  description:
    "A shared reference for product scope. Unverified means a suitable, approved evidence record is missing; it is not a statement that a feature can never be supplied.",
  path: "/platform/capabilities",
});
export default function Page() {
  return (
    <BuyerPage
      title="Capability and evidence register"
      intro="A shared reference for product scope. Unverified means a suitable, approved evidence record is missing; it is not a statement that a feature can never be supplied."
      path="/platform/capabilities"
      eyebrow="TECHNICAL BUYER GUIDE"
    >
      <p>
        Reviewed {EVIDENCE_DATE}. States: available = evidenced for a defined
        configuration; limited pilot = demonstrated on a recorded scene or one
        installation under stated conditions, not yet for a defined
        configuration; planned
        = approved roadmap, not purchasable today; unverified = no sufficient
        record attached.
      </p>
      <div className="buyer-table-wrap">
        <table className="buyer-table">
          <caption>
            Do not interpret a listed evaluation area as an available product
            claim.
          </caption>
          <thead>
            <tr>
              <th>Capability</th>
              <th>State</th>
              <th>Scope and evidence needed</th>
              <th>Evidence on file</th>
            </tr>
          </thead>
          <tbody>
            {CAPABILITY_REGISTER.map((c) => (
              <tr key={c.id}>
                <th scope="row">
                  <a href={c.href}>{c.title}</a>
                </th>
                <td>{c.state}</td>
                <td>
                  {c.scope}
                  <br />
                  <br />
                  {c.requirement}
                </td>
                <td>
                  {c.evidence ? (
                    <a href={c.evidence.href}>{c.evidence.note}</a>
                  ) : (
                    "none yet"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Other capabilities in the educational feature library remain unverified
        until added here with approved evidence. No measured accuracy, latency,
        uptime or certification is established by this list.
      </p>
      <h2>Estimate the effort these would change at your site</h2>
      <p>
        Three of the capabilities above have their own calculator scenario.
        Each uses your measurements, reports staff time separately from cash,
        and states the evidence it rests on.
      </p>
      {scenariosForPath("/platform/capabilities").map((sc, i, all) => (
        <FeatureScenario key={sc.id} id={sc.id} withLeadForm={i === all.length - 1} />
      ))}
      <BuyerCTA label="Request a scoped demonstration" href="/book-demo" />
    </BuyerPage>
  );
}
