import BuyerPage, { BuyerCTA } from "@/components/b2b/Page";
import { pageMeta } from "@/lib/seo";
import QuickLead from "@/components/sections/QuickLead";
export const metadata = pageMeta({
  title: "Dealer and integrator enquiries | PGAK",
  description:
    "Discuss an integration or delivery partnership with PGAK, separately from an end-customer project. No territory or commercial terms are implied.",
  path: "/partners",
});
export default function Page() {
  return (
    <BuyerPage
      title="Dealer and integrator enquiries"
      intro="Discuss an integration or delivery partnership with PGAK, separately from an end-customer project. No territory or commercial terms are implied."
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
        <h2>Request a partner callback</h2>
        <QuickLead
          cta="partner-enquiry"
          context="Journey: dealer / integrator enquiry. Route to partner owner, not end-customer sales."
        />
      </section>
    </BuyerPage>
  );
}
