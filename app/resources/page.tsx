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
      <BuyerCTA />
    </BuyerPage>
  );
}
