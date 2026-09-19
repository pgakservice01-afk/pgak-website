import { pageMeta } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Architecture from "@/components/b2b/Architecture";
import ReadinessAssessment from "@/components/b2b/ReadinessAssessment";
import { PROOF_NOTICE } from "@/lib/b2b/claims";
export const metadata = pageMeta({
  title: "AI Video Analytics for Existing CCTV Cameras | PGAK",
  description:
    "Evaluate AI video analytics for compatible existing CCTV at factories, warehouses and multi-site businesses in India. Prepare a camera readiness brief with PGAK.",
  path: "/",
});
const questions = [
  [
    "Can I keep my existing cameras and recorder?",
    "Often that is the starting point, but compatibility is not inferred from a brand name. The camera/recorder model, firmware, authorised stream, placement, lighting, network and processing requirements need technical review.",
  ],
  [
    "Is PGAK a replacement VMS?",
    "This website positions PGAK as an analytics layer for compatible existing CCTV. Replacement recording, playback, retention and permission workflows are not verified as a complete VMS offering. Keep your existing recorder responsibilities in scope.",
  ],
  [
    "What happens to footage and identification data?",
    "Agree the processing location, authorised users, permitted purpose, retention, deletion and review procedure before a pilot. Do not send footage or camera credentials through the marketing form.",
  ],
  [
    "What does a quote need to cover?",
    "Software scope, enabled cameras and use cases, processing hardware, setup, integration, support, taxes and contract terms. A written scope should name customer and supplier responsibilities, including who responds to alerts.",
  ],
  [
    "Can AI miss an event or raise a false alert?",
    "Yes. Lighting, camera angle, occlusion, motion and connectivity affect results. Test representative conditions and record useful alerts, false alerts, missed events and delays. Analytics supplements human review and site safety procedures.",
  ],
];
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" className="buyer-home" data-money-page="home">
        <div className="buyer-wrap">
          <section className="buyer-hero" id="top">
            <div>
              <p className="kicker">AI VIDEO ANALYTICS FOR EXISTING CCTV</p>
              <h1>
                Turn existing CCTV into <span>useful alerts</span> for your
                business.
              </h1>
              <p className="buyer-lede">
                Evaluate security and operational use cases for your factory,
                warehouse or multi-site business. Check camera compatibility and
                deployment requirements before choosing a pilot.
              </p>
              <div className="action-row">
                <a
                  href="#camera-readiness"
                  className="btn btn-primary"
                  data-cta="hero-camera-check"
                >
                  Check my cameras <span aria-hidden="true">→</span>
                </a>
                <a href="/book-demo" className="text-link" data-cta="hero-demo">
                  See a product demonstration ↗
                </a>
              </div>
              <p className="buyer-micro">
                Camera compatibility and processing requirements are assessed
                first.
              </p>
            </div>
            <Architecture compact />
          </section>
          <nav className="buyer-strip" aria-label="Business settings">
            <span>START WITH YOUR SETTING</span>
            <a href="/factory-security">Factories ↗</a>
            <a href="/ai-cctv-for-warehouses">Warehouses ↗</a>
            <a href="/multi-site-cctv-monitoring">Multi-site businesses ↗</a>
          </nav>
          <section className="buyer-section" id="features">
            <div className="buyer-section-head">
              <div>
                <p className="kicker">01 / CHOOSE THE PROBLEM</p>
                <h2>
                  Focus on what needs
                  <br />
                  your team’s attention.
                </h2>
              </div>
              <p>
                Start with a defined event and a practical response. These are
                evaluation areas; site-specific support is confirmed through
                technical review.
              </p>
            </div>
            <div className="buyer-links">
              {[
                [
                  "Perimeter events",
                  "Restricted zones, after-hours movement and legitimate deliveries. Define the difference before testing.",
                  "/ai-intruder-detection",
                ],
                [
                  "Attendance exceptions",
                  "Entrance events, ambiguous matches and missing records. Keep authorised enrolment and human correction in the workflow.",
                  "/face-recognition-attendance-system",
                ],
                [
                  "Camera-feed health",
                  "A lost feed needs an owner. Test interruption, notification and recovery across your sites.",
                  "/multi-site-cctv-monitoring",
                ],
              ].map(([title, body, href], i) => (
                <article key={href}>
                  <span className="index">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <a href={href}>Explore requirements →</a>
                </article>
              ))}
            </div>
          </section>
        </div>
        <section className="buyer-surface" id="how">
          <div className="buyer-wrap buyer-section">
            <div className="buyer-section-head">
              <div>
                <p className="kicker">02 / DEFINE THE WORKFLOW</p>
                <h2>
                  An event is a starting point.
                  <br />A response needs an owner.
                </h2>
              </div>
              <p>
                A proposed operating process, to verify in your demonstration.
                Confirm the supported evidence format and notification
                destination before rollout.
              </p>
            </div>
            <ol className="buyer-steps">
              {[
                ["Observe", "Define a zone, event and operating hours."],
                [
                  "Review evidence",
                  "Check what happened and whether the event is useful.",
                ],
                [
                  "Notify",
                  "Test delivery to the agreed, authorised recipient.",
                ],
                [
                  "Handle",
                  "A named person reviews, responds and records the outcome.",
                ],
              ].map(([title, body], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <p className="buyer-micro mt-8">
              False alerts and missed events belong in the evaluation, alongside
              successful detections.
            </p>
            <a href="/resources/evaluation-method" className="text-link">
              Use the pilot evaluation worksheet →
            </a>
          </div>
        </section>
        <div className="buyer-wrap">
          <section className="buyer-section buyer-split" id="how-compatible">
            <div>
              <p className="kicker">03 / CHECK WHETHER IT FITS</p>
              <h2>
                Keep what works.
                <br />
                Verify what needs to change.
              </h2>
              <p className="buyer-lede">
                Your existing recorder can remain part of the system. Stream
                access, processing and the scene itself determine what can be
                evaluated.
              </p>
              <ul className="buyer-list">
                <li>Camera and DVR/NVR model, firmware and stream format</li>
                <li>Placement, distance, lighting and occlusion</li>
                <li>Network, power and processing hardware</li>
                <li>Access, retention and response responsibilities</li>
              </ul>
              <a href="/platform/compatibility" className="text-link">
                Read compatibility requirements →
              </a>
            </div>
            <div className="buyer-notice">
              <p className="kicker">TECHNICAL REVIEW, NOT A BRAND CHECK</p>
              <h3>“RTSP” alone is not a compatibility result.</h3>
              <p className="mt-4">
                Codec, resolution, frame rate, stream stability and the specific
                task all matter. No model or firmware is marked compatible
                without a verified record.
              </p>
              <a className="text-link block mt-6" href="/platform/deployment">
                Explore deployment responsibilities →
              </a>
            </div>
          </section>
          <section
            className="buyer-section buyer-split border-t border-line"
            id="trust"
          >
            <div>
              <p className="kicker">04 / INSPECT THE EVIDENCE</p>
              <h2>
                Proof should be specific
                <br />
                to the claim.
              </h2>
            </div>
            <div>
              <p>{PROOF_NOTICE}</p>
              <p className="mt-4">
                Ask for a dated demonstration of your intended function, the
                conditions it was tested under and what did not work.
              </p>
              <div className="action-row mt-6">
                <a href="/resources/evidence" className="text-link">
                  Evidence & limitations →
                </a>
                <a href="/platform/capabilities" className="text-link">
                  Capability register →
                </a>
              </div>
            </div>
          </section>
          <section className="buyer-section border-t border-line">
            <p className="kicker">05 / A CLEAR COMMERCIAL PATH</p>
            <h2>Assess. Pilot. Then decide.</h2>
            <div className="buyer-links mt-10">
              {[
                [
                  "Assessment",
                  "Document your cameras, intended events, requirements and open questions.",
                ],
                [
                  "Scoped pilot",
                  "Agree the feeds, conditions, responsibilities and acceptance criteria in writing.",
                ],
                [
                  "Rollout",
                  "Use the pilot findings to scope cameras, processing, support and contract terms.",
                ],
              ].map(([t, b]) => (
                <article key={t}>
                  <h3>{t}</h3>
                  <p>{b}</p>
                </article>
              ))}
            </div>
            <a href="/pricing" className="text-link">
              Understand the cost drivers →
            </a>
          </section>
          <section className="buyer-section border-t border-line">
            <p className="kicker">BEFORE PROCUREMENT</p>
            <h2>Good questions. Clear boundaries.</h2>
            <div className="buyer-faq mt-8">
              {questions.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="buyer-section border-t border-line" id="dealer">
            <span id="audit" />
            <span id="demo" />
            <ReadinessAssessment />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
