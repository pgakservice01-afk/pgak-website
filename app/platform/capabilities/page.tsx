import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import { CAPABILITY_REGISTER, EVIDENCE_DATE } from "@/lib/b2b/claims";
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
        configuration; limited pilot = evidenced only in a named pilot; planned
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
      <BuyerCTA label="Request a scoped demonstration" href="/book-demo" />
    </BuyerPage>
  );
}
