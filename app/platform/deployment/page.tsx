import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import Architecture from "@/components/b2b/Architecture";
export const metadata = pageMeta({
  title: "Deployment requirements and responsibilities | PGAK",
  description:
    "Plan processing, connectivity and the operating response together. A written scope should identify what PGAK supplies, what the site supplies and what remains unverified.",
  path: "/platform/deployment",
});
export default function Page() {
  return (
    <BuyerPage
      title="Deployment requirements and responsibilities"
      intro="Plan processing, connectivity and the operating response together. A written scope should identify what PGAK supplies, what the site supplies and what remains unverified."
      path="/platform/deployment"
      eyebrow="TECHNICAL BUYER GUIDE"
    >
      <Architecture />
      <section>
        <h2>Before the pilot</h2>
        <ul className="buyer-list">
          <li>
            Inventory camera feeds and recorders. Verify permitted stream access
            and test decoding.
          </li>
          <li>
            Size processing hardware against the tested analytics, simultaneous
            feeds and stream settings. Do not assume no additional hardware.
          </li>
          <li>
            Review local network capacity, internet requirements, power and
            recovery after an interruption.
          </li>
          <li>
            Agree permitted data use, authorised accounts, retention and
            deletion responsibilities.
          </li>
        </ul>
      </section>
      <section>
        <h2>Agree who owns each step</h2>
        <table className="buyer-table">
          <thead>
            <tr>
              <th>Responsibility</th>
              <th>Confirm in the scope</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Camera and network maintenance</td>
              <td>
                Named site or integration owner; access and maintenance windows.
              </td>
            </tr>
            <tr>
              <td>Analytics configuration</td>
              <td>
                Supplier role, approved zones, schedules, version and change
                process.
              </td>
            </tr>
            <tr>
              <td>Alert delivery and response</td>
              <td>
                Verified channel, escalation owner and actions during an outage.
              </td>
            </tr>
            <tr>
              <td>Recording and retention</td>
              <td>
                Existing VMS/recorder role, storage, permissions, exports and
                deletion.
              </td>
            </tr>
            <tr>
              <td>Support</td>
              <td>
                Hours, response targets, exclusions and contact path agreed in
                writing.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>Test interruption as well as detection</h2>
        <p>
          A pilot should include stream loss, reconnection, processing restart
          and an unavailable notification destination. Record what recovers
          automatically and what needs an operator.
        </p>
        <a href="/resources/evaluation-method" className="text-link">
          Open the acceptance-test worksheet →
        </a>
      </section>
      <BuyerCTA />
    </BuyerPage>
  );
}
