import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import QuickLead from "@/components/sections/QuickLead";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  softwareApplicationSchema,
  webPageSchema,
  faqSchema,
} from "@/lib/schema";

export const metadata: Metadata = pageMeta({
  title: "AI Video Analytics for Existing CCTV Cameras | PGAK",
  description:
    "AI video analytics software for your existing CCTV. Evaluate intrusion detection, face recognition, attendance and real-time alerts. Book a PGAK demo in India.",
  path: "/",
});
const features = [
  [
    "01",
    "Threat detection",
    "Bring configured security events to your team’s attention.",
    "/ai-surveillance-system",
  ],
  [
    "02",
    "Face recognition",
    "Recognise enrolled people on suitable camera feeds.",
    "/features/face-recognition",
  ],
  [
    "03",
    "Attendance",
    "Turn entrance events into records your team can review.",
    "/face-recognition-attendance-system",
  ],
  [
    "04",
    "Intrusion",
    "Define restricted zones and the hours that matter.",
    "/ai-intruder-detection",
  ],
  [
    "05",
    "Loitering",
    "Flag extended presence in configured areas.",
    "/features/loitering-detection",
  ],
  [
    "06",
    "Camera health",
    "Know when a camera feed needs attention.",
    "/multi-site-cctv-monitoring",
  ],
  [
    "07",
    "Real-time alerts",
    "Get event context so the right person can respond.",
    "/features/intrusion-alerts",
  ],
];
const industries = [
  ["Factories", "Perimeters. Entrances. Shift changes.", "/factory-security"],
  [
    "Warehouses",
    "Loading bays. Stock areas. After hours.",
    "/ai-cctv-for-warehouses",
  ],
  ["Offices", "People. Access. Everyday operations.", "/ai-cctv-for-offices"],
  ["Retail", "Shop floors. Stockrooms. Entry points.", "/retail-shop-security"],
  [
    "Commercial sites",
    "Multiple cameras. One clearer picture.",
    "/commercial-cctv",
  ],
];
const faqs = [
  {
    q: "Will PGAK work with my existing CCTV?",
    a: "PGAK assesses compatible RTSP or ONVIF streams from your cameras and DVR/NVR. Camera placement, lighting, stream access and network quality are checked before confirming what can be reused. An on-site processing device may be needed.",
  },
  {
    q: "What does AI video analytics software detect?",
    a: "PGAK supports evaluation of configured intrusion, loitering, face recognition, attendance and camera-health events. The right combination depends on your site and camera feeds. Agree a pilot and acceptance criteria before rollout.",
  },
  {
    q: "How much does PGAK cost?",
    a: "Pricing is scoped to your camera count, sites, enabled analytics and processing requirements. Ask for a written quote covering hardware, setup, subscription, support and taxes.",
  },
];
export default function Home() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: "/",
            name: "AI video analytics for existing CCTV cameras",
            description:
              "PGAK AI CCTV software for factories, warehouses, offices and commercial sites in India.",
          }),
          softwareApplicationSchema(),
          faqSchema(faqs),
        ]}
      />
      <Nav />
      <main id="main-content" className="premium-home" data-money-page="home">
        <section className="premium-hero" id="top">
          <div className="hero-copy">
            <p className="kicker">PGAK · INTELLIGENT SECURITY</p>
            <h1>
              AI Video Analytics
              <br />
              for Existing
              <br />
              <span>CCTV Cameras.</span>
            </h1>
            <p className="hero-description">
              Turn your existing CCTV into intelligent security with AI-powered
              intrusion detection, face recognition, attendance and real-time
              alerts.
            </p>
            <div className="action-row">
              <a
                href="/book-demo"
                className="btn btn-primary"
                data-cta="hero-demo"
              >
                Book a Demo <span aria-hidden="true">↗</span>
              </a>
              <a href="/free-audit" className="text-link" data-cta="hero-audit">
                Get Free Camera Audit <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="hero-note">Your cameras. A more intelligent view.</p>
          </div>
          <figure className="product-figure">
            <img
              src="/pgak-intelligence.svg"
              width="1100"
              height="760"
              fetchPriority="high"
              alt="Illustration of PGAK analysing a warehouse camera, identifying a restricted zone and displaying an intrusion event"
            />
            <figcaption>
              Product illustration. Not customer footage or measured results.
            </figcaption>
          </figure>
        </section>
        <section className="premium-section compatibility" id="how-compatible">
          <p className="kicker">WORKS WITH YOUR EXISTING CCTV</p>
          <h2>
            A smarter system.
            <br />A familiar starting point.
          </h2>
          <p className="section-intro">
            Keep compatible cameras. Add an intelligence layer. Start with an
            assessment of what you already own.
          </p>
          <div className="compatibility-row">
            <span>IP cameras</span>
            <span>DVR / NVR</span>
            <span>RTSP</span>
            <span>ONVIF</span>
          </div>
          <p className="fine-print">
            Stream access, placement, lighting and processing hardware are
            checked before deployment.
          </p>
          <a className="text-link" href="/video-analytics-software">
            Explore AI video analytics software{" "}
            <span aria-hidden="true">→</span>
          </a>
        </section>
        <section className="premium-section" id="features">
          <div className="section-heading">
            <div>
              <p className="kicker">WHAT PGAK DETECTS</p>
              <h2>
                See what matters.
                <br />
                Know when to act.
              </h2>
            </div>
            <p>
              Purposeful intelligence for the moments your team needs to know
              about.
            </p>
          </div>
          <div className="detection-grid">
            {features.map(([n, title, body, href]) => (
              <a className="detection-item" href={href} key={title}>
                <span className="item-number">{n}</span>
                <h3>
                  {title} <span aria-hidden="true">↗</span>
                </h3>
                <p>{body}</p>
              </a>
            ))}
          </div>
          <p className="fine-print">
            Capabilities and alert timing depend on camera suitability,
            configuration, processing and connectivity.
          </p>
        </section>
        <section className="premium-section industry-section" id="sites">
          <p className="kicker">BUILT AROUND YOUR BUSINESS</p>
          <h2>
            Different spaces.
            <br />
            One clearer view.
          </h2>
          <div className="industry-list">
            {industries.map(([title, body, href]) => (
              <a href={href} key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
        <section className="premium-section" id="how">
          <p className="kicker">HOW IT WORKS</p>
          <h2>From camera to clarity.</h2>
          <ol className="steps">
            {[
              [
                "Connect",
                "Check compatible streams and confirm processing requirements.",
              ],
              [
                "Analyse",
                "Configure the scenes, zones and schedules for your site.",
              ],
              [
                "Detect",
                "Identify the events your team has chosen to monitor.",
              ],
              [
                "Alert",
                "Send event context to the people responsible for responding.",
              ],
            ].map(([title, body], i) => (
              <li key={title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="premium-section proof-section" id="trust">
          <div>
            <p className="kicker">PROOF BEFORE PROMISES</p>
            <h2>
              Your site.
              <br />
              Your cameras.
              <br />A real evaluation.
            </h2>
          </div>
          <div className="proof-copy">
            <p className="large-copy">
              The most useful proof is what works on your own feeds.
            </p>
            <p>
              Start with a camera assessment. Agree the zones to monitor, review
              useful and missed events, and measure alert delay before a wider
              rollout.
            </p>
            <p>
              Our published deployment scenarios explain the approach. They are
              illustrations, not verified customer case studies.
            </p>
            <a className="text-link" href="/insights/case-studies">
              Explore deployment scenarios →
            </a>
            <a className="text-link" href="/about">
              Meet PGAK Innovations →
            </a>
          </div>
        </section>
        <section className="premium-section compact-faq">
          <p className="kicker">A FEW THINGS TO KNOW</p>
          <h2>Clear answers.</h2>
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">＋</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
          <a href="/insights" className="text-link">
            Read our CCTV guides →
          </a>
        </section>
        <section className="premium-section final-enquiry" id="dealer">
          <span id="audit" />
          <span id="demo" />
          <p className="kicker">LET’S START WITH YOUR CAMERAS</p>
          <h2>See what’s possible.</h2>
          <p className="section-intro">
            Get a free camera audit. Find out what your existing CCTV can do
            with PGAK.
          </p>
          <div className="home-form">
            <QuickLead cta="home-audit" />
          </div>
          <div className="action-row">
            <a href="/book-demo" className="text-link" data-cta="final-demo">
              Book a Demo →
            </a>
            <a
              href="https://wa.me/916283993600"
              className="text-link"
              data-cta="final-whatsapp"
            >
              Talk on WhatsApp ↗
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
