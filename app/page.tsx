import type { Metadata } from "next";
import FeatureExplorer from "@/components/FeatureExplorer";
import Nav from "@/components/Nav";
import ReferenceFilm from "@/components/ReferenceFilm";
import Footer from "@/components/sections/Footer";
import QuickLead from "@/components/sections/QuickLead";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  softwareApplicationSchema,
  webPageSchema,
  faqSchema,
} from "@/lib/schema";
import JourneyChooser from "@/components/sections/JourneyChooser";
import FeatureChooser from "@/components/sections/FeatureChooser";

export const metadata: Metadata = pageMeta({
  title: "AI Video Analytics for Existing CCTV Cameras | PGAK",
  description:
    "AI video analytics software for your existing CCTV. Evaluate intrusion detection, face recognition, attendance and real-time alerts. Request a PGAK demonstration in India.",
  path: "/",
});
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
      {/* No manual <link rel="preload"> for the hero image. React hoists one
          into <head> and drops the `media` scope on the way, so the page shipped
          two preloads for the same file and the unscoped one fired on phones —
          the breakpoint it was written to avoid. The backdrop <img> is the first
          element in <main> and carries fetchPriority="high", which the preload
          scanner acts on just as early, with nothing to duplicate. */}
      <Nav />
      <main
        id="main-content"
        className="premium-home spot-home"
        data-money-page="home"
      >
        <section className="premium-hero cinema-hero" id="top">
          {/* The LCP element on desktop, and the preload above is scoped to
              the same breakpoint that reveals it. It must therefore load
              eagerly and at high priority: `loading="lazy"` here contradicted
              the preload and pushed the largest paint later.
              The phone copy below stays lazy — the backdrop is hidden under
              760px and that figure sits below the fold. */}
          <img
            className="cinema-backdrop"
            src="/media/real-time-response.webp"
            width="986"
            height="720"
            fetchPriority="high"
            decoding="async"
            alt="Illustrative nighttime CCTV view of a commercial yard, from Spot AI"
          />
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
                Request a demo <span aria-hidden="true">↗</span>
              </a>
              <a href="/free-audit" className="text-link" data-cta="hero-audit">
                Get Free Camera Audit <span aria-hidden="true">→</span>
              </a>
              <a href="/roi-calculator" className="text-link" data-cta="hero-business-case">
                Calculate my business case <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="hero-note">Your cameras. A more intelligent view.</p>
          </div>
          <div className="hero-film-link">
            <a href="#intelligence-films">
              <span aria-hidden="true">▶</span> See video intelligence in action
            </a>
            <p>
              Reference footage: Spot AI. Illustrative, not a PGAK deployment.
            </p>
          </div>
        </section>
        <figure className="mobile-camera-scene">
          <img
            src="/media/real-time-response.webp"
            width="986"
            height="720"
            loading="lazy"
            decoding="async"
            alt="Nighttime CCTV view of a commercial yard, illustrating the type of scene video analytics can help teams review"
          />
          <figcaption>
            Reference illustration from Spot AI. Not a PGAK deployment.
          </figcaption>
        </figure>
        <section className="sec" id="journeys" aria-label="Choose your starting point">
          <div className="wrap">
            <JourneyChooser
              heading="Upgrading existing CCTV, or planning a new site?"
              upgradeHref="#dealer"
              ctaPrefix="home-journey"
            />
          </div>
        </section>
        <section className="sec" id="calculators" aria-label="Work out your numbers">
          <div className="wrap">
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.1rem)]">
              Work out your numbers before anyone quotes you
            </h2>
            <p className="mt-4 max-w-[64ch] text-ink-soft">
              Three of the questions buyers have to settle first. They run in your browser, they
              assume no PGAK price, and they show a negative answer as readily as a positive one.
            </p>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {[
                {
                  href: "/roi-calculator",
                  title: "Business case, payback and budget",
                  body: "Enter your quotation and only the benefits you can defend. Net cash per month, payback month, ROI% and what you could afford to spend.",
                  cta: "home-calc-roi",
                },
                {
                  href: "/calculators/cctv-storage",
                  title: "Storage and retention",
                  body: "How much disk keeps 30 days of footage? Cameras × bitrate × hours, in decimal TB, with the free-space reserve and RAID kept separate.",
                  cta: "home-calc-storage",
                },
                {
                  href: "/calculators/retrofit-vs-replacement",
                  title: "Retrofit vs replacement",
                  body: "Adding AI to the cameras you own, against replacing the system — same scope, same horizon. Retrofit does not automatically win.",
                  cta: "home-calc-tco",
                },
              ].map((c) => (
                <article key={c.href} className="card flex flex-col p-6">
                  <h3 className="text-[1.05rem] font-semibold">
                    <a href={c.href} className="text-ink hover:text-accent">
                      {c.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{c.body}</p>
                  <p className="mt-auto pt-5">
                    <a href={c.href} data-cta={c.cta} className="btn btn-ghost">
                      Open the calculator →
                    </a>
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-[0.92rem] text-ink-soft">
              <a href="/calculators" data-cta="home-calc-hub" className="text-accent underline underline-offset-2">
                All calculators, and the ones still in progress
              </a>
            </p>
          </div>
        </section>

        <section className="premium-section compatibility" id="how-compatible">
          <p className="kicker">WORKS WITH YOUR EXISTING CCTV</p>
          <h2>
            Your cameras can do more.
            <br />
            Start with what you have.
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
        {/* The collection sits directly above the films: pick what you need
            detected, then watch what that looks like. The #intelligence-films
            anchor and its section are untouched — they are linked from the
            hero and from elsewhere. */}
        <FeatureChooser />

        <section
          className="intelligence-films"
          id="intelligence-films"
          aria-labelledby="films-heading"
        >
          <div className="film-intro">
            <p className="kicker">FROM WATCHING TO UNDERSTANDING</p>
            <h2 id="films-heading">
              A clearer picture.
              <br />A more informed response.
            </h2>
            <p>
              Explore the idea of video intelligence. Then see what PGAK can do
              on your own cameras.
            </p>
          </div>
          {[
            {
              n: "01",
              title: "See.",
              subtitle: "Bring the important moments into view.",
              body: "Your team cannot watch every camera at once. Configure PGAK to flag activity in the areas and hours that matter to your business.",
              file: "camera-intelligence",
              label:
                "Construction camera footage illustrating scene observation",
              href: "/video-analytics-software",
              link: "Explore AI video analytics",
            },
            {
              n: "02",
              title: "Understand.",
              subtitle: "Give each event the context it needs.",
              body: "Review configured zones, people and activity together. Assess camera placement and image quality before choosing the analytics for your site.",
              file: "event-context",
              label: "Factory camera footage illustrating activity context",
              href: "/video-analytics-software",
              link: "Explore video analytics",
            },
            {
              n: "03",
              title: "Respond.",
              subtitle: "Help the right person act sooner.",
              body: "Turn configured intrusion and loitering events into alerts your team can review. Agree who responds, how they are notified and what happens next.",
              file: "real-time-response",
              label:
                "Nighttime yard camera footage illustrating security response",
              href: "/ai-intruder-detection",
              link: "Explore intrusion detection",
            },
          ].map((film) => (
            <article className="film-row" key={film.n}>
              <div className="film-copy">
                <span className="film-number">
                  {film.n} / INTELLIGENCE IN FOCUS
                </span>
                <h3>{film.title}</h3>
                <h4>{film.subtitle}</h4>
                <p>{film.body}</p>
                <a className="text-link" href={film.href}>
                  {film.link} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <figure className="film-player">
                <ReferenceFilm
                  file={film.file}
                  label={film.label}
                  captionId={`film-${film.n}-caption`}
                />
                <figcaption id={`film-${film.n}-caption`}>
                  {film.label}. Reference illustration from{" "}
                  <a
                    href="https://www.spot.ai/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Spot AI
                  </a>
                  ; any interface or automated actions shown are theirs, not a
                  demonstration of PGAK.
                </figcaption>
              </figure>
            </article>
          ))}
        </section>
        <div id="features"><FeatureExplorer /></div>
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
          <h2>
            Put your cameras
            <br />
            to work.
          </h2>
          <p className="section-intro">
            Get a free camera audit. Find out what your existing CCTV can do
            with PGAK.
          </p>
          <p className="section-intro">
            No cameras yet?{" "}
            <a
              href="/cctv-installation-company#plan"
              className="text-link"
              data-cta="final-new-install"
            >
              Plan a new CCTV installation →
            </a>
          </p>
          <div className="home-form">
            <QuickLead cta="home-audit" />
          </div>
          <div className="action-row">
            <a href="/book-demo" className="text-link" data-cta="final-demo">
              Request a demo →
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
