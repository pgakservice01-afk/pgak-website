import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AI video analytics software for existing CCTV | PGAK",
  description:
    "Video analytics evaluates selected events in camera feeds. Check the intended task, technical fit and evidence before choosing software for your business.",
  path: "/video-analytics-software",
});
export default function Page() {
  return (
    <BuyerPage
      title="AI video analytics software for existing CCTV"
      intro="Video analytics evaluates selected events in camera feeds. Check the intended task, technical fit and evidence before choosing software for your business."
      path="/video-analytics-software"
      eyebrow="PLATFORM GUIDE"
    >
      <section>
        <h2>What video analytics software does</h2>
        <p>
          <strong>
            Straight answer: video analytics software reads a feed from cameras
            that are already installed and flags one defined event — a person
            crossing a boundary, a vehicle stopping where it should not, a
            camera that has gone dark — so a person reviews the exception
            instead of watching every screen. The decision worth making is
            which single event it must detect, and what evidence shows it does
            so on your own cameras.
          </strong>
        </p>
      </section>
      <section>
        <h2>What the analytics layer does</h2>
        <p>
          A scoped analytics deployment evaluates a defined event rather than
          asking someone to watch every feed continuously. The exact PGAK
          function and output must be demonstrated on the proposed
          configuration; the capability register distinguishes missing proof
          from available features.
        </p>
        <a href="/platform/capabilities" className="text-link">
          Read capability and evidence status →
        </a>
      </section>
      <section>
        <h2>Four decisions before a pilot</h2>
        <ol className="buyer-list">
          <li>
            Choose one observable problem: perimeter events, attendance
            exceptions or unavailable camera feeds.
          </li>
          <li>
            Check stream compatibility, placement, lighting, network and
            processing requirements.
          </li>
          <li>
            Agree authorised data use, evidence format, recipient and human
            response.
          </li>
          <li>
            Define acceptance criteria including false alerts, missed events,
            delays and outages.
          </li>
        </ol>
      </section>
      <section>
        <h2>Analytics is not the same as a VMS</h2>
        <p>
          Recording, playback, storage retention and user permissions need their
          own specification. A full PGAK replacement VMS is unverified; describe
          the role of the existing recorder explicitly.
        </p>
        <a href="/platform/vms-integration" className="text-link">
          Explore VMS integration requirements →
        </a>
      </section>
      <section>
        <h2>Compare requirements, not blanket promises</h2>
        <p>
          A claim to work with every camera, need no hardware or eliminate false
          alarms is not a useful acceptance criterion. Use dated configuration
          records and representative tests. A successful scene demonstration is
          not a measured accuracy study.
        </p>
        <a href="/resources/evaluation-method" className="text-link">
          Use the evaluation method →
        </a>
      </section>
      <BuyerCTA />
    </BuyerPage>
  );
}
