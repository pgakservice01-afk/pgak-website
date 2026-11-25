import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Requirements, evidence and useful planning tools | PGAK",
  description:
    "Get useful information before a sales conversation. These guides separate general evaluation methods from verified PGAK product evidence.",
  path: "/resources",
});
export default function Page() {
  return (
    <BuyerPage
      title="Requirements, evidence and useful planning tools"
      intro="Get useful information before a sales conversation. These guides separate general evaluation methods from verified PGAK product evidence."
      path="/resources"
      eyebrow="RESOURCES"
    >
      <div className="buyer-links">
        {[
          [
            "Camera readiness assessment",
            "Prepare your project brief without contact capture.",
            "/free-audit",
          ],
          [
            "Evidence register",
            "Read the status and limitations of published proof.",
            "/resources/evidence",
          ],
          [
            "Evaluation worksheet",
            "Define a pilot that records false and missed events.",
            "/resources/evaluation-method",
          ],
          [
            "Scope worksheet",
            "Print it, fill it in, and get quotes you can compare line by line.",
            "/resources/scope-worksheet",
          ],
          [
            "Camera compatibility self-check",
            "Two minutes, nothing sent: find likely blockers before a survey.",
            "/platform/compatibility",
          ],
          [
            "Cost & benefit calculator",
            "Separate cash savings from productivity estimates.",
            "/roi-calculator",
          ],
          [
            "Storage & bandwidth",
            "Estimate a continuous recording scenario.",
            "/resources/storage-bandwidth",
          ],
          [
            "Inventory shrinkage scenario",
            "Use your own documented loss; no default recovery percentage is supplied.",
            "/calculators/shrinkage-reduction",
          ],
          [
            "What CCTV analytics can and cannot do",
            "A plain-language guide to capability and limits.",
            "/capabilities-explained",
          ],
          [
            "Technical guides",
            "Browse the existing CCTV and attendance library.",
            "/insights",
          ],
        ].map(([t, b, h]) => (
          <article key={h}>
            <h2>{t}</h2>
            <p>{b}</p>
            <a href={h}>Open resource →</a>
          </article>
        ))}
      </div>
      <section>
        <h2>A sensible order to use them in</h2>
        <ul className="buyer-list">
          <li>
            Start with the camera readiness assessment and the compatibility
            self-check, so the cameras are settled first.
          </li>
          <li>
            Use the scope worksheet to describe one event, one area and one
            owner, then ask every supplier to quote against the same page.
          </li>
          <li>
            Run the evaluation worksheet during a pilot, and the calculators
            with your own figures afterwards.
          </li>
        </ul>
      </section>
      <BuyerCTA />
    </BuyerPage>
  );
}
