import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import QuickLead from "@/components/sections/QuickLead";
export const metadata = pageMeta({
  title: "See the workflow you need to evaluate | PGAK",
  description:
    "Request a tailored PGAK demonstration for a defined site and use case. Confirm supported functions, technical requirements and limitations before a pilot.",
  path: "/book-demo",
});
export default function Page() {
  return (
    <BuyerPage
      title="See the workflow you need to evaluate"
      intro="Request a tailored PGAK demonstration for a defined site and use case. Confirm supported functions, technical requirements and limitations before a pilot."
      path="/book-demo"
      eyebrow="PRODUCT DEMONSTRATION"
    >
      <section>
        <h2>A useful demonstration agenda</h2>
        <ol className="buyer-list">
          <li>
            Identify your intended event, camera setup and operating conditions.
          </li>
          <li>
            Show the actual interface and evidence format for the supported
            function.
          </li>
          <li>Test the agreed notification destination and human review.</li>
          <li>
            Discuss false positives, missed events, processing and failure
            recovery.
          </li>
        </ol>
        <p>
          PGAK&rsquo;s recorded demonstrations — glove detection on a line
          camera, sack counting at a loading bay, hot work flagged in a test
          setup and a fitted number-plate camera — are published with their
          conditions and limits. A demonstration for your site uses your own
          cameras or footage.
        </p>
        <a href="/resources/evidence" className="text-link">
          See the recordings and what they do not prove →
        </a>
      </section>
      <section id="dealer">
        <h2>Request a technical demonstration</h2>
        <QuickLead cta="book-demo" offer="demo" />
      </section>
    </BuyerPage>
  );
}
