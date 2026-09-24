import type { Metadata } from "next";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReferenceFilm from "@/components/ReferenceFilm";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

import "../home.css";

/**
 * /capabilities-explained — where everything not photographed by PGAK lives.
 *
 * ── Why this page exists ──
 * The homepage used to carry four Spot AI reference films and a generated
 * nighttime yard scene. All of it was labelled, and labelling was not enough:
 * it was still the largest visual statement the site made, it was still
 * somebody else's product, and a visitor skimming a homepage does not read
 * captions. Moving it here keeps the explanatory value — these films do show
 * what video analytics looks like — while taking it out of the position where
 * it reads as evidence about PGAK.
 *
 * ── The rule for this page ──
 * Every visual here carries the same sentence, verbatim, in its own figcaption:
 * "Illustrative visual. Not a PGAK customer project, live camera feed or
 * confirmed result." It is rendered from `DISCLAIMER` below rather than typed
 * out each time, so it cannot drift, be softened, or be forgotten on the one
 * that gets added next.
 *
 * ── What may NOT be moved here ──
 * This is not a loophole. A label makes a borrowed illustration honest; it does
 * not make an invented claim honest. Nothing on this page may state a result,
 * a customer, a site, a detection rate or an outcome — only what a category of
 * technology generally looks like.
 *
 * ── noindex ──
 * The page is deliberately kept out of search. Its entire content is
 * third-party footage and generated illustration; there is nothing here that
 * should rank, and a page of competitor stills ranking for PGAK terms would be
 * the same mistake in a new place. It is linked from the homepage for people
 * who want the explanation.
 */

const PATH = "/capabilities-explained";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Understanding CCTV Analytics: What It Can — and Cannot — Do | PGAK",
    description:
      "An illustrated explanation of what AI video analytics does on CCTV, what it depends on, and what it cannot be relied on to do. Illustrative visuals only.",
    path: PATH,
  }),
  robots: { index: false, follow: true },
};

/** The one sentence every non-real visual on this page must carry. */
const DISCLAIMER =
  "Illustrative visual. Not a PGAK customer project, live camera feed or confirmed result.";

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Understanding CCTV analytics", path: PATH },
];

/**
 * The three Spot AI reference films, moved here from the homepage.
 * `owner` is required on every entry — an illustration whose source nobody
 * recorded is exactly how borrowed footage becomes "ours" three edits later.
 */
const FILMS = [
  {
    n: "01",
    title: "Seeing",
    body: "Analytics begins with a camera that can actually see the thing you care about. Before any software question, there is a physical one: is the area in frame, in focus, and lit well enough at the hour it matters?",
    file: "camera-intelligence",
    label: "Construction site camera footage illustrating scene observation",
    owner: "Spot AI",
  },
  {
    n: "02",
    title: "Context",
    body: "A detection on its own is rarely useful. What makes an event worth sending to a person is the surrounding information — which zone, what time, what happened either side of it.",
    file: "event-context",
    label: "Factory camera footage illustrating activity context",
    owner: "Spot AI",
  },
  {
    n: "03",
    title: "Response",
    body: "An alert only has value if someone acts on it. Who receives it, on what device, and what they are expected to do is a workflow decision, not a software setting.",
    file: "real-time-response",
    label: "Nighttime yard camera footage illustrating security response",
    owner: "Spot AI",
  },
];

const DEPENDS_ON = [
  ["Camera position", "Height, angle and distance decide what is even in frame. Most disappointing results are a mounting problem, not a model problem."],
  ["Image quality", "Resolution at the subject, not at the sensor. A 4MP camera thirty metres from a gate is a low-resolution camera at that gate."],
  ["Lighting", "Including how it changes. A view that works at 11am can be unusable at 6pm against the same sun."],
  ["Movement and occlusion", "People and vehicles that pass behind racking, pillars or each other are harder to track continuously."],
  ["Network and recording", "Stream access, bandwidth and retention decide what can be processed and what can be reviewed afterwards."],
  ["The configured use case", "A model tuned to count a known item across a line is not the same as one asked to judge behaviour."],
];

const CANNOT = [
  "Guarantee that nothing is missed. Every analytics configuration has a false-negative rate, and any supplier who says otherwise has not measured it.",
  "Make a badly placed camera work. Software cannot recover a view the lens never captured.",
  "Identify intent. A system can flag that a person is in a zone at an unusual hour. It cannot tell you why.",
  "Replace a response process. An alert nobody is assigned to act on is a notification, not security.",
  "Produce the same accuracy on every site. Results depend on the conditions above, which is why we assess before quoting.",
];

export default function CapabilitiesExplainedPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "Understanding CCTV analytics: what it can and cannot do",
            description:
              "An illustrated explanation of AI video analytics on CCTV, what results depend on, and what it cannot be relied on to do.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />
      <Nav />

      <main id="main-content" className="home-2026">
        <section className="h-wrap" style={{ paddingBlock: "48px 8px" }}>
          <Breadcrumbs trail={TRAIL} />
        </section>

        <section className="h-sec h-sec--flush" aria-labelledby="cap-heading">
          <div className="h-wrap" style={{ maxWidth: 860 }}>
            <p className="h-eyebrow">Understanding the technology</p>
            <h1 id="cap-heading">
              Understanding CCTV analytics: what it can — and cannot — do
            </h1>
            <p className="h-lede">
              AI video analytics can help teams review selected events faster,
              but results depend on camera quality, placement, lighting,
              movement, network conditions and the use case being configured. A
              site assessment is the best way to understand what is suitable for
              your environment.
            </p>

            {/*
              Said once, plainly, before a visitor sees the first film — rather
              than only underneath each one where a skimmer meets it too late.
            */}
            <p className="h-trustline">
              <strong>About the visuals on this page.</strong> Everything below
              is illustrative. The films are reference footage published by{" "}
              <a href="https://www.spot.ai/" target="_blank" rel="noreferrer" className="underline">
                Spot AI
              </a>
              , another company in this field; any interface or automated action
              shown is theirs, not a demonstration of PGAK. To see PGAK&rsquo;s own
              recordings from real installations, with the conditions they were
              captured under, go to{" "}
              <a href="/#real-work" className="underline">
                our own work on the homepage
              </a>
              .
            </p>
          </div>
        </section>

        <section className="h-sec" aria-labelledby="films-heading">
          <div className="h-wrap">
            <h2 id="films-heading">What the idea looks like</h2>
            <p className="h-lede">
              Three short, silent films. They are here to explain a category of
              technology, not to show a result on anybody&rsquo;s site.
            </p>

            <div className="h-grid h-grid--3">
              {FILMS.map((f) => (
                <article className="h-project" key={f.n}>
                  <figure style={{ margin: 0 }}>
                    <ReferenceFilm
                      file={f.file}
                      label={f.label}
                      captionId={`cap-film-${f.n}`}
                    />
                    <figcaption id={`cap-film-${f.n}`} className="h-project__caveat">
                      <b>{DISCLAIMER}</b> {f.label}. Reference footage published
                      by {f.owner}.
                    </figcaption>
                  </figure>
                  <div className="h-project__meta">
                    <p className="h-project__tag">{f.n}</p>
                    <h3>{f.title}</h3>
                    <p className="h-body">{f.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="h-sec h-sec--tint" aria-labelledby="depends-heading">
          <div className="h-wrap">
            <h2 id="depends-heading">What the results actually depend on</h2>
            <p className="h-lede">
              These are the six things we check at an assessment, in roughly the
              order they decide the outcome.
            </p>
            <div className="h-grid h-grid--3">
              {DEPENDS_ON.map(([title, body], i) => (
                <article className="h-card" key={title}>
                  <span className="h-card__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{title}</h3>
                  <p className="h-body">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="h-sec" aria-labelledby="cannot-heading">
          <div className="h-wrap" style={{ maxWidth: 820 }}>
            <h2 id="cannot-heading">What it cannot do</h2>
            <p className="h-lede">
              Worth reading before you compare quotations. A supplier who will
              not put this list in writing is not offering you a better product.
            </p>
            <ul style={{ margin: "32px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 14 }}>
              {CANNOT.map((c) => (
                <li key={c} className="h-project__caveat" style={{ fontSize: 15 }}>
                  {c}
                </li>
              ))}
            </ul>

            <div className="h-actions">
              <a href="/#assessment" className="h-btn h-btn--primary" data-cta="cap-assessment">
                Request a free CCTV assessment
              </a>
              <a href="/platform/capabilities" className="h-btn h-btn--ghost">
                See the capability and evidence register
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
