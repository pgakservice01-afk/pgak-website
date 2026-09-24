import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import PlanningCalculator from "@/components/b2b/PlanningCalculator";
import PrintButton from "@/components/PrintButton";
export const metadata = pageMeta({
  title: "CCTV storage and bandwidth calculator | PGAK",
  description:
    "Estimate continuous-recording video volume from camera count, average bitrate and retention. This vendor-neutral worksheet does not claim PGAK supplies recording storage.",
  path: "/resources/storage-bandwidth",
});
export default function Page() {
  return (
    <BuyerPage
      title="CCTV storage and bandwidth calculator"
      intro="Estimate continuous-recording video volume from camera count, average bitrate and retention. This vendor-neutral worksheet does not claim PGAK supplies recording storage."
      path="/resources/storage-bandwidth"
      eyebrow="VENDOR-NEUTRAL WORKSHEET"
    >
      <PlanningCalculator storage />
      <section>
        <h2>Transparent assumptions</h2>
        <p>
          Bandwidth = camera count × average bitrate. Decimal TB = cameras ×
          Mbps × 1,000,000 / 8 × 86,400 × days / 1,000,000,000,000. The default
          eight-camera, 2 Mbps, 30-day scenario is an illustration, not a
          hardware recommendation.
        </p>
        <p>
          Record observed bitrate over representative day/night scenes. Allow
          additional capacity for peaks, resilience, metadata, audio, filesystem
          overhead and the recorder’s storage design. Event recording requires a
          separate measured duty-cycle assumption.
        </p>
        <p>
          Updated 19 September 2026. Confirm the final specification with your
          recorder/storage supplier.
        </p>
        <PrintButton />
      </section>
      <BuyerCTA />
    </BuyerPage>
  );
}
