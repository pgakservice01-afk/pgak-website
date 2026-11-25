import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import Architecture from "@/components/b2b/Architecture";
export const metadata = pageMeta({
  title: "An analytics layer. A clearly scoped deployment. | PGAK",
  description:
    "See the requirements and evidence needed to evaluate PGAK with your existing CCTV. Camera compatibility and scope are verified before commitment.",
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
      <section>
        <h2>Settle these before you compare products</h2>
        <ul className="buyer-list">
          <li>Which camera views show the event clearly, by day and by night.</li>
          <li>Where the video is processed, and what happens if the link drops.</li>
          <li>Who receives an alert or report, and what they do next.</li>
          <li>What keeps recording, for how long, and who can play it back.</li>
        </ul>
        <p>
          Each state in the capability register is tied to the evidence behind
          it. For a plain-language summary, read{" "}
          <a href="/capabilities-explained" className="text-link">
            what CCTV analytics can and cannot do
          </a>
          .
        </p>
      </section>
      <BuyerCTA />
    </BuyerPage>
  );
}
