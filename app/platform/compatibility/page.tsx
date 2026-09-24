import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CCTV compatibility: verify the stream and the scene | PGAK",
  description:
    "A camera brand or ONVIF label does not establish compatibility. Match model and firmware evidence to the intended analytics, then test representative conditions.",
  path: "/platform/compatibility",
});
export default function Page() {
  return (
    <BuyerPage
      title="CCTV compatibility: verify the stream and the scene"
      intro="A camera brand or ONVIF label does not establish compatibility. Match model and firmware evidence to the intended analytics, then test representative conditions."
      path="/platform/compatibility"
      eyebrow="TECHNICAL BUYER GUIDE"
    >
      <section>
        <h2>Current compatibility record</h2>
        <p className="buyer-notice">
          Not yet verified. No model/firmware approval matrix is attached to
          this release. A technical review must confirm the exact combination
          before it is described as compatible.
        </p>
        <div className="buyer-table-wrap">
          <table className="buyer-table">
            <caption>
              Information to prepare; do not include credentials
            </caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">What to record</th>
                <th scope="col">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Camera / recorder",
                  "Model, firmware, channel and authorised stream support",
                  "A recorder may expose a different stream from its attached camera.",
                ],
                [
                  "Video",
                  "Codec, resolution, frame rate, bitrate and stability",
                  "Decode support and useful image detail affect processing.",
                ],
                [
                  "Scene",
                  "Mounting height, target distance, lighting and occlusion",
                  "A feed can be readable but unsuitable for the intended event.",
                ],
                [
                  "Infrastructure",
                  "Network capacity, processing device, power and ownership",
                  "A stable stream needs a supported deployment path.",
                ],
                [
                  "Test record",
                  "Date, configuration, sample conditions, result and limitations",
                  "Compatibility applies to a tested configuration, not every product from a brand.",
                ],
              ].map((r) => (
                <tr key={r[0]}>
                  {r.map((c, i) =>
                    i === 0 ? (
                      <th scope="row" key={c}>
                        {c}
                      </th>
                    ) : (
                      <td key={c}>{c}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2>Camera access stays outside the marketing form</h2>
        <p>
          Never submit passwords, raw RTSP credentials or unrestricted
          live-access links. Agree a permissioned review process with named
          recipients and retention before sharing footage.
        </p>
        <a href="/platform/deployment" className="text-link">
          Deployment requirements →
        </a>
      </section>
      <BuyerCTA />
    </BuyerPage>
  );
}
