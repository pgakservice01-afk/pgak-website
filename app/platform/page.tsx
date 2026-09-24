import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import Architecture from "@/components/b2b/Architecture";
export const metadata = pageMeta({
  title: "An analytics layer. A clearly scoped deployment. | PGAK",
  description:
    "Explore the requirements and evidence needed to evaluate PGAK with your existing CCTV system. Camera compatibility and product scope are verified before commitment.",
  path: "/platform",
});
export default function Page() {
  return (
    <BuyerPage
      title="An analytics layer. A clearly scoped deployment."
      intro="Explore the requirements and evidence needed to evaluate PGAK with your existing CCTV system. Camera compatibility and product scope are verified before commitment."
      path="/platform"
      eyebrow="PLATFORM"
    >
      <div className="buyer-links">
        {[
          [
            "Compatibility",
            "Camera, stream and scene requirements.",
            "/platform/compatibility",
          ],
          [
            "Deployment",
            "Processing, network and ownership.",
            "/platform/deployment",
          ],
          [
            "Capability register",
            "What is evidenced and what still needs verification.",
            "/platform/capabilities",
          ],
        ].map(([t, b, h]) => (
          <article key={h}>
            <h2>{t}</h2>
            <p>{b}</p>
            <a href={h}>Read the requirements →</a>
          </article>
        ))}
      </div>
      <section className="buyer-split">
        <Architecture />
        <div>
          <h2>Keep the recorder in the conversation.</h2>
          <p>
            Recording, playback and retention have different requirements from
            analytics. Confirm the role of your existing VMS and recorder in the
            proposed architecture.
          </p>
          <a href="/platform/vms-integration" className="text-link">
            Analytics and VMS integration →
          </a>
        </div>
      </section>
      <BuyerCTA />
    </BuyerPage>
  );
}
