import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import PlanningCalculator from "@/components/b2b/PlanningCalculator";
export const metadata = pageMeta({
  title: "AI CCTV cost and benefit calculator | PGAK",
  description:
    "Build a scenario from your own quote and evidence. Separate actual cash savings from productivity estimates; a result can legitimately say the purchase is not justified.",
  path: "/roi-calculator",
});
export default function Page() {
  return (
    <BuyerPage
      title="AI CCTV cost and benefit calculator"
      intro="Build a scenario from your own quote and evidence. Separate actual cash savings from productivity estimates; a result can legitimately say the purchase is not justified."
      path="/roi-calculator"
      eyebrow="PLANNING TOOL"
    >
      <PlanningCalculator />
      <section>
        <h2>Assumptions and calculation</h2>
        <p>
          Net monthly cash = documented recoverable cash − quoted monthly costs.
          Year-one cash = 12 × net monthly cash − one-time costs. Payback =
          one-time costs / positive net monthly cash; otherwise not achieved.
        </p>
        <p>
          Staff-time value is shown separately and never added to cash savings.
          Do not count the same saved labour cost in both fields. Theft
          prevention, uncertain risk reduction and speculative payroll recovery
          are excluded.
        </p>
        <p>
          Include taxes, support, hardware and setup consistently with your
          accounting approach. Zero cost is accepted only when you explicitly
          enter it; unknown price produces no return claim. These are scenarios,
          not PGAK revenue or advertising conversion values.
        </p>
      </section>
      <BuyerCTA label="Request a project quote" href="/pricing" />
    </BuyerPage>
  );
}
