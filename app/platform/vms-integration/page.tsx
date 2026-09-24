import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AI analytics and your existing VMS | PGAK",
  description:
    "Analytics evaluates events in video. A VMS manages workflows such as recording, playback, retention and operator permissions. Verify both roles without assuming one replaces the other.",
  path: "/platform/vms-integration",
});
export default function Page() {
  return (
    <BuyerPage
      title="AI analytics and your existing VMS"
      intro="Analytics evaluates events in video. A VMS manages workflows such as recording, playback, retention and operator permissions. Verify both roles without assuming one replaces the other."
      path="/platform/vms-integration"
      eyebrow="TECHNICAL BUYER GUIDE"
    >
      <section>
        <h2>PGAK scope in this website</h2>
        <p>
          PGAK is positioned as an analytics layer for compatible existing CCTV.
          A complete replacement VMS is unverified. Existing product names or a
          market opportunity do not establish recording, playback or retention
          functionality.
        </p>
      </section>
      <section>
        <h2>Integration questions for the technical demonstration</h2>
        <ul className="buyer-list">
          <li>
            Which recorder/VMS version and stream configuration is being tested?
          </li>
          <li>
            Where is video recorded, and who controls retention and export?
          </li>
          <li>
            Does the proposed workflow provide an evidence clip, a timestamp, a
            still or a link into the recorder? Demonstrate the exact behaviour.
          </li>
          <li>
            How are users, roles, audit records and access revocation handled?
          </li>
          <li>
            What happens when the recorder, analytics processor or network is
            unavailable?
          </li>
        </ul>
      </section>
      <section>
        <h2>A neutral evaluation boundary</h2>
        <p>
          Video search, camera management, failover recording, multi-site roles
          and storage management should each have a testable requirement. Do not
          purchase a replacement VMS on the basis of an analytics demonstration
          alone.
        </p>
        <a href="/platform/capabilities" className="text-link">
          Inspect the capability register →
        </a>
      </section>
      <BuyerCTA label="Request a technical demo" href="/book-demo" />
    </BuyerPage>
  );
}
