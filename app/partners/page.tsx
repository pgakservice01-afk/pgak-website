import BuyerPage from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import QuickLead from "@/components/sections/QuickLead";
export const metadata = pageMeta({
  title: "CCTV Dealer and Integrator Partner Enquiries | PGAK",
  description:
    "Discuss an integration or delivery relationship separately from a customer deployment. No appointment, territory or commercial arrangement is implied.",
  path: "/partners",
});
export default function Page() {
  return (
    <BuyerPage
      title="Dealer and integrator enquiries"
      intro="Discuss a potential integration or delivery relationship separately from an end-customer deployment. No appointment, territory or commercial arrangement is implied."
      path="/partners"
      eyebrow="PARTNERS"
    >
      <section>
        <h2>Prepare for a partner discussion</h2>
        <ul className="buyer-list">
          <li>Your integration or installation scope and operating region.</li>
          <li>The camera, recorder and network environments you support.</li>
          <li>
            Technical support, data access and customer ownership
            responsibilities.
          </li>
        </ul>
        <p>
          Do not include customer contact lists, credentials or footage in an
          initial enquiry.
        </p>
      </section>
      <section>
        <h2>Questions worth settling early</h2>
        <ul className="buyer-list">
          <li>Who surveys the site and confirms that each camera view is suitable.</li>
          <li>Who installs, configures and tests, and who signs off the result.</li>
          <li>Who the customer calls when a camera, recorder or alert stops working.</li>
          <li>Which capabilities are evidenced today and which are still unverified.</li>
        </ul>
        <p>
          The{" "}
          <a href="/platform/capabilities" className="text-link">
            capability and evidence register
          </a>{" "}
          shows the current state of each function, so a partner never has to
          promise more than the record supports.
        </p>
      </section>
      <section>
        <h2>Request a partner callback</h2>
        <QuickLead
          cta="partner-enquiry"
          offer="partner"
          context="Journey: dealer / integrator enquiry. Route to partner owner, not end-customer sales."
        />
      </section>
    </BuyerPage>
  );
}
