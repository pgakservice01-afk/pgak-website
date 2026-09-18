import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickLead from "@/components/sections/QuickLead";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
export const metadata = pageMeta({
  title: "Book an AI Video Analytics Demo | PGAK",
  description:
    "See how PGAK AI video analytics can work with your existing CCTV cameras. Request a demo for your factory, warehouse, office or commercial site.",
  path: "/book-demo",
});
const trail = [
  { name: "Home", path: "/" },
  { name: "Book a Demo", path: "/book-demo" },
];
export default function BookDemo() {
  return (
    <>
      <Nav />
      <JsonLd
        nodes={[
          breadcrumbSchema(trail),
          webPageSchema({
            path: "/book-demo",
            name: "Book a PGAK demo",
            description:
              "Request a demonstration of AI video analytics for existing CCTV.",
          }),
        ]}
      />
      <main id="main-content" className="demo-page" data-money-page="demo">
        <Breadcrumbs trail={trail} />
        <p className="kicker mt-8">SEE PGAK IN ACTION</p>
        <h1>
          Better intelligence.
          <br />
          Starts with a conversation.
        </h1>
        <p className="section-intro">
          Book a demo of PGAK’s AI video analytics. Tell us your camera count
          and we’ll contact you to arrange a time.
        </p>
        <QuickLead cta="book-demo" offer="demo" />
        <p className="mt-5 text-sm text-ink-soft">
          By submitting, you agree that PGAK may contact you about this enquiry.{" "}
          <a href="/privacy" className="underline">
            Privacy policy
          </a>
          .
        </p>
        <ol className="steps">
          <li>
            <h2>Your setup</h2>
            <p>
              Discuss your cameras, recorder and the areas you want to monitor.
            </p>
          </li>
          <li>
            <h2>Your use case</h2>
            <p>
              Explore intrusion alerts, attendance or other relevant analytics.
            </p>
          </li>
          <li>
            <h2>Your next step</h2>
            <p>Agree a camera assessment and the scope of a suitable pilot.</p>
          </li>
        </ol>
        <div className="action-row mt-10">
          <a
            href="https://wa.me/916283993600?text=Hi%20PGAK%2C%20I%20would%20like%20to%20arrange%20a%20product%20demo."
            className="text-link"
            data-cta="demo-whatsapp"
          >
            WhatsApp us ↗
          </a>
          <a href="tel:+916283993600" className="text-link">
            Call +91 62839 93600
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
