import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import QuickLead from "@/components/sections/QuickLead";
export const metadata = pageMeta({
  title: "A quote built around your site | PGAK",
  description:
    "Understand the cost drivers before you commit. Confirm exact charges, inclusions, support and contract terms in a written proposal.",
  path: "/pricing",
});
export default function Page() {
  return (
    <BuyerPage
      title="A quote built around your site"
      intro="Understand the cost drivers before you commit. Confirm exact charges, inclusions, support and contract terms in a written proposal."
      path="/pricing"
      eyebrow="PRICING & PROCUREMENT"
    >
      <section>
        <h2>What the scope needs to include</h2>
        <table className="buyer-table">
          <thead>
            <tr>
              <th>Cost driver</th>
              <th>What to clarify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Software",
                "Selected cameras, sites, analytics, licence basis and renewal terms.",
              ],
              [
                "Processing hardware",
                "Required device, capacity, ownership, power and replacement responsibilities.",
              ],
              [
                "Setup and integration",
                "Stream assessment, configuration, commissioning and existing VMS integration.",
              ],
              [
                "Support",
                "Hours, response targets, maintenance, updates and exclusions.",
              ],
              [
                "Commercial terms",
                "Taxes, payment schedule, pilot charges, termination and changes to scope.",
              ],
            ].map(([a, b]) => (
              <tr key={a}>
                <th scope="row">{a}</th>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Assessment → scoped pilot → rollout</h2>
        <p>
          Start by checking technical fit. Agree the pilot configuration and
          acceptance criteria before deployment. Use the findings to decide
          whether a larger rollout is justified.
        </p>
        <p>
          No sample price, free installation, fixed delivery time or no-lock-in
          guarantee is implied here. Your approved written proposal controls the
          commercial commitment.
        </p>
      </section>
      <section id="dealer">
        <h2>Request a project quote</h2>
        <p className="mb-6">
          Only a phone number is required. Camera count is optional. We will
          clarify your site and intended use cases before preparing a proposal.
        </p>
        <QuickLead cta="pricing-quote" offer="quote" />
      </section>
      <section>
        <h2>Build a transparent business case</h2>
        <p>
          Keep actual recoverable cash separate from staff-time estimates and
          uncertain risk reduction.
        </p>
        <a href="/roi-calculator" className="text-link">
          Use the cost & benefit calculator →
        </a>
      </section>
    </BuyerPage>
  );
}
