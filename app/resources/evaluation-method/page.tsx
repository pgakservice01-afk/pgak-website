import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import PrintButton from "@/components/PrintButton";
export const metadata = pageMeta({
  title: "A practical AI CCTV pilot worksheet | PGAK",
  description:
    "Define success before testing. Use the same scenes and criteria for every candidate, and record failures as carefully as useful alerts.",
  path: "/resources/evaluation-method",
});
export default function Page() {
  return (
    <BuyerPage
      title="A practical AI CCTV pilot worksheet"
      intro="Define success before testing. Use the same scenes and criteria for every candidate, and record failures as carefully as useful alerts."
      path="/resources/evaluation-method"
      eyebrow="TECHNICAL BUYER GUIDE"
    >
      <div className="evidence-meta">
        <span>Vendor-neutral method</span>
        <span>19 September 2026</span>
        <span>No customer performance data</span>
      </div>
      <section>
        <h2>1. Agree the observation</h2>
        <p>
          Write one observable event, the zone, operating hours, permitted
          exceptions and the person who reviews it. Example: a person enters a
          closed loading bay after the agreed shift. This is an illustrative
          test scenario, not a customer result.
        </p>
      </section>
      <section>
        <h2>2. Document the test conditions</h2>
        <p>
          Record camera model, firmware, lens/view, stream settings, processing
          configuration, software version and date. Include day/night, glare,
          weather where relevant, occlusion, legitimate workers and deliberate
          negative examples. Obtain permission for footage and identification
          tests.
        </p>
      </section>
      <section>
        <h2>3. Keep a ground-truth event log</h2>
        <table className="buyer-table">
          <thead>
            <tr>
              <th>Record</th>
              <th>How to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Eligible real events</td>
              <td>
                Manually label events using the pre-agreed definition,
                independent of the detector output.
              </td>
            </tr>
            <tr>
              <td>True / false alerts</td>
              <td>
                Count correct alerts and alerts where the eligible event did not
                occur.
              </td>
            </tr>
            <tr>
              <td>Missed events</td>
              <td>
                Count eligible events with no usable alert; include outages
                separately.
              </td>
            </tr>
            <tr>
              <td>Delay</td>
              <td>
                Record event time and receipt time with synchronised clocks;
                report the distribution, not just the fastest example.
              </td>
            </tr>
            <tr>
              <td>Availability and recovery</td>
              <td>Log stream loss, reconnection and operator intervention.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>4. Report denominators and limitations</h2>
        <p>
          Precision = true alerts / all alerts. Recall = detected eligible
          events / all eligible events. When the denominator is zero, report not
          measured. State sample size, observation duration and excluded
          conditions. Model confidence is not measured accuracy.
        </p>
        <p>
          Agree acceptance criteria before the test; do not select a threshold
          after seeing the results. Small samples and staged scenes do not prove
          performance at another site.
        </p>
      </section>
      <section>
        <h2>5. Decide and assign ownership</h2>
        <p>
          Record pass, revise or stop against each requirement. Document who
          owns follow-up, maintenance, data retention and human review.
          Analytics is supplementary monitoring, not certified protective
          equipment or automatic proof of misconduct.
        </p>
        <PrintButton />
      </section>
      <BuyerCTA label="Scope a pilot discussion" href="/book-demo" />
    </BuyerPage>
  );
}
