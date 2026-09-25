import type { Metadata } from "next";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import AssessmentForm from "@/components/home/AssessmentForm";
import { ClientVoices, RealWork } from "@/components/home/Proof";
import { BUSINESS, pageMeta } from "@/lib/seo";
import { organizationSchema, webPageSchema, faqSchema } from "@/lib/schema";

import "./home.css";

/**
 * The homepage, rebuilt 2026-09-24.
 *
 * ── What changed and why ──
 * The previous homepage opened on a nighttime yard scene from Spot AI, a
 * competitor, correctly captioned as theirs. Three more of their reference
 * films ran further down. Between them they were the largest visual statement
 * the site made, and every one of them belonged to somebody else. A visitor
 * who scrolled the whole page never saw PGAK's own work above the fold.
 *
 * Everything borrowed or generated now lives on /capabilities-explained, each
 * item labelled. This page carries only material PGAK recorded itself, and the
 * sections that would carry customer proof hide themselves until that proof is
 * approved (see lib/proof/consent.ts).
 *
 * ── Why the palette is scoped, not global ──
 * The brief asks for white ground, graphite text and a steel-blue accent. The
 * other ~120 routes are built on the green accent and the dark hero treatment.
 * app/home.css scopes every rule to `.home-2026` so this page can change
 * without silently repainting pages nobody reviewed. Rolling it out further is
 * a deliberate, page-by-page job.
 *
 * ── The language rule ──
 * No "revolutionise", "future-proof", "never miss anything", "100% accurate",
 * "instant intelligence", "guaranteed prevention", "world-class AI" or
 * "transform everything". Not because they are banned words, but because every
 * one of them is a claim this company cannot evidence, and the entire argument
 * of this page is that we check before we promise.
 */

const PATH = "/";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Video Analytics & Smart Security Assessment in India | PGAK",
  description:
    "PGAK helps factories, warehouses, offices and institutions assess existing CCTV, plan new installations and evaluate practical AI video analytics for real business sites.",
  path: PATH,
  keywords: [
    "AI CCTV video analytics India",
    "CCTV assessment",
    "CCTV camera installation",
    "factory CCTV security",
    "warehouse CCTV monitoring",
    "existing CCTV upgrade",
    "CCTV installation for offices and schools",
  ],
});

const SERVICES = [
  {
    title: "Existing CCTV assessment",
    body: "We review your existing cameras, angles, video quality, blind spots, lighting and recording setup. You get a clear picture of what can be improved and what your current system can support.",
    href: "/free-audit",
  },
  {
    title: "AI video analytics for CCTV",
    body: "Where the camera setup is suitable, we help configure intelligent alerts around specific areas and events. This can reduce unnecessary video review and help your team focus on what needs attention.",
    href: "/video-analytics-software",
  },
  {
    title: "New CCTV installation",
    body: "For new sites, expansions or outdated systems, we plan camera positions, cabling, recording, storage and remote viewing around the way your site actually operates.",
    href: "/cctv-installation-company",
  },
  {
    title: "Pilot before scale",
    body: "Start with selected cameras and a defined requirement. Review the output in your real environment before deciding on a wider rollout.",
    href: "/resources/evaluation-method",
  },
];

const SITE_FIRST = [
  {
    title: "We check the ground reality.",
    body: "We look at entrances, boundaries, loading areas, corridors, production areas, parking, blind spots and other locations that matter to your operation.",
  },
  {
    title: "We explain what is practical.",
    body: "We tell you what can be reused, what needs improvement and what should be planned properly from the beginning.",
  },
  {
    title: "We create a clear next step.",
    body: "You receive a practical scope — not confusing technical jargon or a one-size-fits-all package.",
  },
];

const PROCESS = [
  {
    title: "Understand your site",
    body: "We discuss the property, current CCTV setup, areas of concern and what your team needs to monitor.",
  },
  {
    title: "Review the camera reality",
    body: "We assess camera views, image quality, coverage gaps, lighting, network access and recording capability.",
  },
  {
    title: "Recommend the right scope",
    body: "You receive a practical recommendation that explains what can be reused, what needs improvement and what should be installed.",
  },
  {
    title: "Pilot, deploy and support",
    body: "Where appropriate, we start with selected cameras, review results in the real environment and then plan the next stage.",
  },
];

const FAQS = [
  {
    q: "Will PGAK work with my existing CCTV?",
    a: "Often, but it is checked rather than assumed. We look at whether your cameras and DVR or NVR expose compatible RTSP or ONVIF streams, and at placement, lighting and network quality, before confirming what can be reused. An on-site processing device may be needed.",
  },
  {
    q: "What does the free CCTV assessment cover?",
    a: "Camera views and image quality, coverage gaps and blind spots, lighting through the day, network access, recording and retention, and the entry and exit points that matter to your operation. You get a written picture of what your current system can and cannot support.",
  },
  {
    q: "Do I have to replace my cameras?",
    a: "Not necessarily, and we will say so if you do. Some sites can run analytics on the cameras already installed; others have a camera at the wrong height or facing the light, where no software will fix the view. The assessment is what tells the two apart.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "AI CCTV video analytics and CCTV assessment in India",
            description:
              "PGAK assesses existing CCTV, plans new installations and configures practical AI video analytics for factories, warehouses, offices and institutions in India.",
          }),
          organizationSchema(),
          faqSchema(FAQS),
        ]}
      />
      <Nav />

      <main id="main-content" className="home-2026" data-money-page="home">
        {/* ═══════════════════════════════════════════════════ 1. HERO */}
        <section className="h-wrap" aria-labelledby="hero-heading">
          <div className="h-hero">
            <div>
              <p className="h-eyebrow">Intelligent CCTV for real business sites</p>
              <h1 id="hero-heading">Make your CCTV more useful.</h1>
              <p className="h-lede">
                Your cameras already capture important activity. PGAK helps you
                review the right areas, identify gaps and set up practical CCTV
                intelligence around the events that matter to your business.
              </p>
              <p className="h-lede" style={{ marginTop: 14 }}>
                We begin with your site — not a generic sales pitch.
              </p>

              <div className="h-actions">
                <a href="#assessment" className="h-btn h-btn--primary" data-cta="hero-assessment">
                  Request a free CCTV assessment
                </a>
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  className="h-btn h-btn--ghost"
                  data-cta="hero-specialist"
                >
                  Talk to a security specialist
                </a>
              </div>

              <p className="h-trustline">
                We first check your cameras, lighting, coverage, network and site
                requirements before recommending any solution.
              </p>

              <ul className="h-ticks">
                {[
                  "Existing CCTV assessment",
                  "New CCTV installation",
                  "AI video analytics where suitable",
                  "Clear scope before deployment",
                ].map((t) => (
                  <li key={t}>
                    <span className="h-tick" aria-hidden="true">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/*
              A real photograph, not an illustration of one.
              This is PGAK's own ANPR camera as actually fitted to a gate
              pillar — one of four original assets the company has. It is here
              rather than something more dramatic because something more
              dramatic would have had to be generated, and a generated hero on
              a page arguing "we check before we promise" defeats the page.
            */}
            <figure className="h-figure">
              <img
                src="/proof/ppe-line-hero.webp"
                width={1200}
                height={675}
                fetchPriority="high"
                decoding="async"
                alt="Overhead CCTV of a vehicle assembly line with six workers marked by the model, each box drawn on a bare hand and labelled NO-Gloves with a confidence score"
              />
              <figcaption>
                PGAK running on a customer&rsquo;s assembly line, 16:57 on a
                working Wednesday. Six detections at once, each box on a hand
                rather than a person, each carrying the model&rsquo;s own
                confidence — including the low ones, which is what a supervisor
                checks rather than what a system should act on alone.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ══════════════════════════════════════════ 2. WHAT PGAK DOES */}
        <section className="h-sec h-sec--tint" id="what-we-do" aria-labelledby="services-heading">
          <div className="h-wrap">
            <p className="h-eyebrow">What PGAK does</p>
            <h2 id="services-heading">Security starts with seeing the real picture.</h2>
            <p className="h-lede">
              Every site is different. A warehouse gate, school corridor, factory
              floor, office reception and loading bay all need different camera
              coverage and different response workflows.
            </p>
            <p className="h-lede" style={{ marginTop: 14 }}>
              PGAK helps you make informed decisions before you invest.
            </p>

            <div className="h-grid h-grid--4">
              {SERVICES.map((s) => (
                <article className="h-card" key={s.title}>
                  <h3>{s.title}</h3>
                  <p className="h-body">{s.body}</p>
                  <p className="h-body">
                    <a href={s.href} className="underline">
                      More on this →
                    </a>
                  </p>
                </article>
              ))}
            </div>

            <div className="h-actions">
              <a href="#assessment" className="h-btn h-btn--primary" data-cta="services-assessment">
                Get a site-specific recommendation
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════ 3. WHY SITE-FIRST */}
        <section className="h-sec" id="site-first" aria-labelledby="sitefirst-heading">
          <div className="h-wrap">
            <p className="h-eyebrow">Why clients prefer a site-first approach</p>
            <h2 id="sitefirst-heading">No generic package. No assumptions.</h2>
            <p className="h-lede">
              A good security setup depends on more than the camera model. It
              depends on where the camera is placed, what it can see, how the
              light changes, how people move through the site and who will act
              when an alert comes in.
            </p>

            <div className="h-grid h-grid--3">
              {SITE_FIRST.map((p, i) => (
                <article className="h-card" key={p.title}>
                  <span className="h-card__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{p.title}</h3>
                  <p className="h-body">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 4. REAL WORK (hides if no media) */}
        <RealWork />

        {/* ═══════════════ 5. CLIENT VOICES (hides until 2 approvals) */}
        <ClientVoices />

        <section className="h-sec h-sec--tint" aria-labelledby="talk-heading">
          <div className="h-wrap" style={{ maxWidth: 760 }}>
            <h2 id="talk-heading">Want to speak with our team?</h2>
            <p className="h-lede">
              Tell us about your site, existing CCTV setup or upcoming project.
              We will help you understand the practical next step.
            </p>
            <div className="h-actions">
              <a href="#assessment" className="h-btn h-btn--primary" data-cta="mid-assessment">
                Request a free assessment
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ 6. HOW THE PROCESS WORKS */}
        <section className="h-sec" id="process" aria-labelledby="process-heading">
          <div className="h-wrap">
            <p className="h-eyebrow">How the process works</p>
            <h2 id="process-heading">A clear process before you invest.</h2>

            <ol className="h-grid h-grid--4" style={{ listStyle: "none", padding: 0 }}>
              {PROCESS.map((s, i) => (
                <li className="h-card" key={s.title}>
                  <span className="h-card__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{s.title}</h3>
                  <p className="h-body">{s.body}</p>
                </li>
              ))}
            </ol>

            {/*
              The qualification, given the same weight as the promise.
              Every analytics claim on this site is conditional on things a
              brochure never mentions, and burying that in a footnote is how a
              customer ends up disappointed on a site we told them would work.
            */}
            <p className="h-trustline" style={{ marginTop: 32 }}>
              The availability and effectiveness of any CCTV analytics feature
              depend on camera position, image quality, lighting, network
              conditions, hardware and the agreed site workflow.{" "}
              <a href="/capabilities-explained" className="underline">
                What analytics can and cannot do →
              </a>
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ 7. FINAL CTA */}
        <section className="h-sec h-sec--tint" id="assessment" aria-labelledby="assess-heading">
          <div className="h-wrap" style={{ maxWidth: 900 }}>
            <p className="h-eyebrow">Book an assessment</p>
            <h2 id="assess-heading">Start with an honest CCTV assessment.</h2>
            <p className="h-lede">
              Whether you have an existing CCTV system, a new facility under
              construction or a security concern that needs a better process,
              PGAK can help you evaluate the next practical step.
            </p>
            <div style={{ marginTop: 36 }}>
              <AssessmentForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
