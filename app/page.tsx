import type { Metadata } from "next";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import AssessmentForm from "@/components/home/AssessmentForm";
import { ClientLogos, ClientVoices, RealWork } from "@/components/home/Proof";
import {
  EvaluationProcess,
  HOME_FAQS,
  HomeFaq,
  HowItWorks,
  OperatingDetail,
  PricingScope,
  ProblemSelector,
} from "@/components/home/BuyerPath";
import ValueEstimator from "@/components/home/ValueEstimator";
import { BUSINESS, pageMeta } from "@/lib/seo";
import { faqSchema, webPageSchema } from "@/lib/schema";

import "./home.css";

/**
 * The homepage, rebuilt 2026-09-24; restructured 2026-09-27 and 2026-10-10.
 *
 * ── 2026-10-10: a buyer path in ten steps ──
 * The owner's lead-growth brief set the order: a hero that names the outcome
 * and the first step (Check my cameras / See PGAK demonstrations); PGAK's own
 * recordings straight after it; a problem selector; how it works; a value
 * estimator that shows results before any contact request; the evaluation
 * process; what makes up a price; who PGAK is and how data is handled; the
 * questions buyers ask; and the assessment form. The stock background video
 * is gone (no large background video), the category phrase moved to the
 * eyebrow above the H1, and the client-logo row moved from second place into
 * the trust section — logos are not proof of what a clip shows. FAQ markup is
 * back because the FAQs are visible again (lib/schema faqSchema).
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
 * The hero poster is the one piece of stock imagery: licensed shots for mood
 * only, uncaptioned and aria-hidden because they show no PGAK site, feed or
 * feature. The looping video version that ran on wider screens (2026-09-26)
 * was removed on 2026-10-10; components/home/HeroVideo.tsx is no longer used.
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
    "AI video analytics for the CCTV you already have: check which cameras can be used, see PGAK's recorded demonstrations, and get a scope for your site.",
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

/** What the assessment gives back — repeated where the form is. */
const DELIVERABLES = [
  "Which of your cameras can be used, camera by camera",
  "The use case worth testing first, and what it needs",
  "What PGAK's evidence does and does not show for it",
  "An itemised scope you can compare with other quotes",
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
          // Matches the visible FAQ section below, question for question.
          faqSchema(HOME_FAQS),
        ]}
      />
      <Nav overlay />

      <main id="main-content" className="home-2026" data-money-page="home">
        {/* ═══════════════════════════════════════════════════ 1. HERO */}
        {/*
          The poster is decorative stock (alt="", aria-hidden) and the LCP
          element. The background video loop was removed on 2026-10-10: the
          brief asks for no large background video, and it showed no PGAK work.
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
          </div>

          <div className="h-wrap h-vhero__content">
            <p className="h-vhero__kicker">AI video analytics software for existing CCTV</p>
            <h1 id="hero-heading">Make your existing CCTV more useful to your business</h1>
            <p className="h-vhero__sub">
              Check which cameras can support useful analytics, see what PGAK has recorded working,
              and get a scope for your site.
            </p>

            <div className="h-actions">
              <a href="/platform/compatibility#check" className="h-btn h-btn--primary" data-cta="hero-check-cameras">
                Check my cameras
              </a>
              <a href="/resources/evidence" className="h-btn h-btn--ghost" data-cta="hero-demonstrations">
                See PGAK demonstrations
              </a>
            </div>
            <p className="h-vhero__qual">
              Compatibility is confirmed per camera model and site before anything is quoted. Or call{" "}
              <a href={`tel:${BUSINESS.phoneE164}`} data-cta="hero-call">
                {BUSINESS.phone}
              </a>
              .
            </p>
          </div>
        </section>

        {/* ═════════════════════════════════════ 2. WHAT PGAK HAS RECORDED */}
        <RealWork />

        {/* ═══════════════════════════════════════ 3. PROBLEM SELECTOR */}
        <ProblemSelector />

        {/* ═══════════════════════════════════════════ 4. HOW IT WORKS */}
        <HowItWorks />

        {/* ═══════════════════════════════════════ 5. VALUE ESTIMATOR */}
        <section className="h-sec" id="estimate" aria-labelledby="estimate-heading">
          <div className="h-wrap">
            <div className="h-intro">
              <p className="h-eyebrow">Estimate it yourself</p>
              <h2 id="estimate-heading">What would it change at your site?</h2>
              <p className="h-lede">
                Use your own numbers. Staff time released is shown separately from cash, and nothing
                counts as cash until you say how it would become cash. No contact details needed.
              </p>
            </div>
            <ValueEstimator />
          </div>
        </section>

        {/* ═══════════════════════════════════════ 6. EVALUATION PROCESS */}
        <EvaluationProcess />

        {/* ═════════════════════════════════════════════ 7. PRICING SCOPE */}
        <PricingScope />

        {/* ═══════════════════════════════════ 8. TRUST AND OPERATING DETAIL */}
        <OperatingDetail />
        <ClientLogos />
        <ClientVoices />

        {/* ════════════════════════════════════════════════════ 9. FAQ */}
        <HomeFaq />

        {/* ══════════════════════════════════════════ 10. ASSESSMENT */}
        <section className="h-sec h-sec--tint h-cta" id="assessment" aria-labelledby="assess-heading">
          <div className="h-wrap h-cta__wrap">
            <div>
              <p className="h-eyebrow">Free CCTV assessment</p>
              <h2 id="assess-heading">Start with the cameras you already have.</h2>
              <p className="h-body">What you get back:</p>
              <ol className="h-steps">
                {DELIVERABLES.map((step, i) => (
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
