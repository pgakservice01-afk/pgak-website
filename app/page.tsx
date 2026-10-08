import type { Metadata } from "next";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import AssessmentForm from "@/components/home/AssessmentForm";
import HeroVideo from "@/components/home/HeroVideo";
import { ClientLogos, ClientVoices, RealWork } from "@/components/home/Proof";
import { BUSINESS, pageMeta } from "@/lib/seo";
import { organizationSchema, webPageSchema } from "@/lib/schema";

import "./home.css";

/**
 * The homepage, rebuilt 2026-09-24; restructured 2026-09-27.
 *
 * ── 2026-09-27: a front door, not a brochure ──
 * The owner's brief: too much on the homepage, and the rest of the site
 * already holds the detail. So the page is now six blocks, each with one job —
 * hero, the businesses we have helped, four things Ai Alerto does (each handing
 * off to its own page), real footage, three client quotes, and one way to
 * start. The service cards, the "site-first" cards, the long intro, the
 * mid-page call to action and the four-step process moved off the page; every
 * one of them still lives on the pages the tiles and the nav link to. The FAQ
 * markup went too: it described questions this page no longer shows, and
 * structured data must match what a visitor can see.
 *
 * ── What changed and why ──
 * The previous homepage opened on a nighttime yard scene from Spot AI, a
 * competitor, correctly captioned as theirs. Three more of their reference
 * films ran further down. Between them they were the largest visual statement
 * the site made, and every one of them belonged to somebody else. A visitor
 * who scrolled the whole page never saw PGAK's own work above the fold.
 *
 * Everything borrowed or generated now lives on /capabilities-explained, each
 * item labelled. Everything on this page that shows work, a site or a result is
 * material PGAK recorded itself, and the sections that would carry customer
 * proof hide themselves until that proof is approved (see lib/proof/consent.ts).
 *
 * The one exception, added 2026-09-26 at the owner's request, is the hero's
 * background loop: a montage of licensed stock shots (a city at night,
 * CCTV-style views of a boundary, a gate and a warehouse, a lighthouse), there
 * for mood only. It shows no PGAK site, feed or feature, so it is
 * uncaptioned and aria-hidden, and it must stay that way (see
 * components/home/HeroVideo.tsx).
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

/**
 * What Ai Alerto does: four tiles, one line each, each handing off to the page
 * that explains it properly. Wording follows the language rule above — no
 * "every", no "instant", no accuracy claim; the PPE line says a supervisor
 * checks, because that is what a detection is for.
 */
const CAPABILITIES = [
  {
    n: "01",
    title: "Intrusion alerts",
    body: "Someone in the yard after hours reaches your phone while it is happening, not in tomorrow's footage.",
    href: "/smart-perimeter-protection",
  },
  {
    n: "02",
    title: "Number plates at the gate",
    body: "Vehicles in and out, logged by plate, without a hand-written register.",
    href: "/anpr-number-plate-recognition",
  },
  {
    n: "03",
    title: "Face attendance",
    body: "Staff are marked present as they walk in. No queue at shift change.",
    href: "/face-recognition-attendance-system",
  },
  {
    n: "04",
    title: "Safety and PPE",
    body: "Missing gloves or helmets flagged on the line, for a supervisor to check.",
    href: "/features/guides/ppe-detection",
  },
];

/** The whole engagement in three lines — the detail lives on /free-audit. */
const STEPS = [
  "We check your cameras, lighting and coverage.",
  "We switch on the alerts that fit your site.",
  "Your team gets alerts worth answering.",
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
          // organizationSchema() is emitted once for every page by app/layout.tsx;
          // listing it here again put the LocalBusiness entity on the homepage twice.
        ]}
      />
      <Nav overlay />

      <main id="main-content" className="home-2026" data-money-page="home">
        {/* ═══════════════════════════════════════════════════ 1. HERO */}
        {/*
          Full-bleed background loop behind the opening message only.
          The poster <img> is the LCP element and the only thing a phone ever
          loads; HeroVideo adds the loop on wider screens. Both are decorative
          stock, hence alt="" and aria-hidden — see the note at the top.
        */}
        <section className="h-vhero" aria-labelledby="hero-heading">
          <div className="h-vhero__media" aria-hidden="true">
            <img
              className="h-vhero__poster"
              src="/hero/security-mix-1920.webp"
              srcSet="/hero/security-mix-960.webp 960w, /hero/security-mix-1280.webp 1280w, /hero/security-mix-1920.webp 1920w"
              sizes="100vw"
              width={1920}
              height={1080}
              alt=""
              fetchPriority="high"
              decoding="async"
            />
            <HeroVideo />
          </div>

          {/* On the video: what the product is, then its name and one line.
              The 2026-09-26 brief put the name alone in the H1; the 2026-10-03
              audit found non-brand searchers landing on a page whose heading
              told them nothing about the category, and the owner's brief of
              the same day asked for the category to lead with Ai Alerto kept
              as the product name. The line, chosen 2026-09-27, is unchanged:
              no "never miss", no "instant", no accuracy claim. */}
          <div className="h-wrap h-vhero__content">
            <h1 id="hero-heading">AI video analytics software for your existing CCTV</h1>
            <p className="h-vhero__tagline">Ai Alerto — your cameras, finally paying attention.</p>

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
          </div>
        </section>

        {/* ═══════════════════════════════ 2. BUSINESSES WE'VE HELPED */}
        <ClientLogos />

        {/* ══════════════════════════════════════ 3. WHAT AI ALERTO DOES */}
        <section className="h-sec h-sec--tint" id="what-it-does" aria-labelledby="does-heading">
          <div className="h-wrap">
            <div className="h-intro">
              <p className="h-eyebrow">What Ai Alerto does</p>
              <h2 id="does-heading">Make your CCTV more useful.</h2>
              <p className="h-lede">
                It runs on the cameras you already have, and tells your team only
                what needs their attention.
              </p>
            </div>

            <ul className="h-caps">
              {CAPABILITIES.map((c) => (
                <li key={c.href}>
                  <a className="h-cap" href={c.href}>
                    <span className="h-cap__n" aria-hidden="true">
                      {c.n}
                    </span>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    <span className="h-cap__more" aria-hidden="true">
                      Learn more →
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/*
              The qualification keeps its place on the homepage, not only on a
              deep page (docs/homepage-2026 §4). One line now, not a paragraph.
            */}
            <p className="h-trustline h-caps__note">
              What each alert can do depends on camera position, lighting and the
              network — which is why we check your cameras first.{" "}
              <a href="/capabilities-explained" className="underline">
                What analytics can and cannot do →
              </a>
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ 4. SEE IT WORKING */}
        <RealWork />

        {/* ═══════════════════════════════════════════ 5. CLIENT VOICES */}
        <ClientVoices />

        {/* ════════════════════════════════════════════════ 6. START HERE */}
        <section className="h-sec h-sec--tint h-cta" id="assessment" aria-labelledby="assess-heading">
          <div className="h-wrap h-cta__wrap">
            <div>
              <p className="h-eyebrow">Free CCTV assessment</p>
              <h2 id="assess-heading">Start with the cameras you already have.</h2>
              <ol className="h-steps">
                {STEPS.map((step, i) => (
                  <li key={step}>
                    <span className="h-steps__n" aria-hidden="true">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <AssessmentForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
