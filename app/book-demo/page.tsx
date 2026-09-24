import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickLead from "@/components/sections/QuickLead";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
/**
 * This page takes a callback request. It does not book anything.
 *
 * "Book a Demo" promised a confirmed appointment and then asked for a phone
 * number — the visitor arrives expecting a slot and leaves without one, which
 * is the kind of small dishonesty that costs a second enquiry. There is no
 * calendar behind this form, so the words say "request". If a real scheduling
 * process ever exists, "Book" can come back and mean it.
 *
 * URL stays /book-demo: it is linked from the nav, the sitemap and elsewhere,
 * and the promise was the problem, not the path.
 */
export const metadata = pageMeta({
  title: "Request an AI Video Analytics Demonstration | PGAK",
  description:
    "Ask PGAK to demonstrate AI video analytics on your own site. Tell us your cameras and what you need to detect, and we call back to arrange it.",
  path: "/book-demo",
});
const trail = [
  { name: "Home", path: "/" },
  { name: "Request a demo", path: "/book-demo" },
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
          Request a demonstration{" "}
          <br />
          for your site.
        </h1>
        <p className="section-intro">
          This is a request, not a booking — there is no calendar behind this
          form. Tell us your cameras and what you need to detect, and we call
          you back to arrange a time that suits you.
        </p>
        <QuickLead cta="book-demo" offer="demo" />
        <p className="mt-5 text-sm text-ink-soft">
          By submitting, you agree that PGAK may contact you about this enquiry.{" "}
          <a href="/privacy" className="underline">
            Privacy policy
          </a>
          .
        </p>
        <h2 className="mt-12 text-[1.15rem] font-semibold">What the call covers</h2>
        <p className="mt-3 max-w-[70ch] text-ink-soft">
          We walk through the software and how an alert reaches you, against
          your own camera positions. What we cannot do on a first call is tell
          you how well detection will perform on your site — that needs your
          footage, which is what the camera assessment and the tuning period are
          for.
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
