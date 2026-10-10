import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import QuickLead from "@/components/sections/QuickLead";
export const metadata = pageMeta({
  title: "AI CCTV pricing — a quote built around your site | PGAK",
  description:
    "Understand the cost drivers before you commit. Confirm exact charges, inclusions, support and contract terms in a written proposal.",
  path: "/pricing",
});
export default function Page() {
  return (
    <BuyerPage
      title="AI CCTV pricing — a quote built around your site"
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
        <h2>Three example scopes, itemised</h2>
        <p>
          Illustrative site shapes, not customer projects. They show which
          lines a proposal for each would contain. PGAK does not publish a
          per-camera or package price; every line is quoted for the actual site
          after the assessment.
        </p>
        <div className="buyer-table-wrap">
          <table className="buyer-table">
            <thead>
              <tr>
                <th scope="col">Line on the quote</th>
                <th scope="col">Shop or office, ~8 cameras, one entrance</th>
                <th scope="col">Factory, ~32 cameras, gate + yard + line</th>
                <th scope="col">Three sites, ~60 cameras, one view</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cameras reused", "Most, if streams and views suit", "Most; the gate and line views are checked first", "Per site, camera by camera"],
                ["Cameras moved or added", "Usually none", "Often one for plates or faces at the gate", "Depends on each site's gaps"],
                ["On-site processing unit", "One small unit", "One unit sized for the camera count and analytics", "One per site"],
                ["Software / licences", "Only the analytics chosen", "Per analytic and camera group", "Per site, with central viewing"],
                ["Installation and configuration", "A short visit", "Zones, schedules, alert routing per area", "Repeated per site plus central setup"],
                ["Pilot", "Optional", "Recommended, with criteria agreed first", "One site first, then roll out"],
                ["Support", "Hours and response stated", "Hours, response vs fix time, hardware replacement", "As factory, per site"],
                ["Price", "Quoted per site", "Quoted per site", "Quoted per site"],
              ].map(([a, ...cells]) => (
                <tr key={a}>
                  <th scope="row">{a}</th>
                  {cells.map((c, i) => (
                    <td key={i}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Bring two quotes to the same{" "}
          <a href="/resources/scope-worksheet" className="text-link">scope worksheet</a>{" "}
          and they can be compared line by line.
        </p>
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
          Your number, your city and roughly how many cameras — that is all the
          form asks. We clarify the site and the use cases before preparing a
          proposal.
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
        <p className="mt-6">
          Quoting a property you own in Punjab while living overseas works the
          same way, with the camera photos sent on WhatsApp instead of a site
          visit —{" "}
          <a href="/nri-property-security" className="text-link">
            NRI property security →
          </a>
        </p>
      </section>
    </BuyerPage>
  );
}
