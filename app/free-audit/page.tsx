import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import WhoIsPgak from "@/components/sections/WhoIsPgak";
import QuickLead from "@/components/sections/QuickLead";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, pageMeta } from "@/lib/seo";
import { AUDIT_ITEMS, AUDIT_TOTAL_VALUE, AUDIT_TURNAROUND_HOURS } from "@/lib/audit";
import { waHref } from "@/lib/whatsapp";
import { breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from "@/lib/schema";

/**
 * The dedicated landing page for the one offer every button sells.
 *
 * Exists so ads, the Business Profile and directory listings have a single
 * page to point at whose only job is this offer — the homepage has twenty
 * sections; this has one. Same two-field ask as the hero, same promise, and
 * the five deliverables spelled out with what each is worth.
 */
const PATH = "/free-audit";

export const metadata: Metadata = pageMeta({
  title: "Free AI Readiness Audit of Your CCTV Cameras | PGAK",
  description:
    "Send your number and camera count. We audit your existing cameras remotely and send a report within 48 hours: placement scores, blind spots, false alarms, attendance feasibility. Free.",
  path: PATH,
  keywords: ["free CCTV audit", "AI camera audit", "CCTV readiness check", "camera placement audit"],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Free audit", path: PATH },
];

const STEPS = [
  {
    h: "Send your number and camera count",
    d: "Thirty seconds, above. Or WhatsApp us. Name and site details come on the call.",
  },
  {
    h: "We call within one working hour",
    d: "9 am to 7 pm, Monday to Saturday. We ask what you want watched and arrange remote access to your DVR, NVR or a few short clips per camera.",
  },
  {
    h: `Your report in ${AUDIT_TURNAROUND_HOURS} hours`,
    d: "Camera by camera: what your setup can already do, what it cannot, and what to change if you want more. Yours to keep whatever you decide.",
  },
];

const FAQS = [
  {
    q: "Is the audit really free, and what is the catch?",
    a: "It is free and there is no obligation. The audit is how we find out whether your cameras can run PGAK well; if they cannot, we say so and you keep the report. We only earn if you later choose to switch the AI on.",
  },
  {
    q: "Do you need to visit my site?",
    a: "Usually not. The audit is done remotely from your existing feeds: temporary DVR or NVR access, or three to five short clips per camera that you send us. A site visit is arranged only if the feeds cannot be reached.",
  },
  {
    q: "What do I get in the report?",
    a: "Five things: a 0–100 placement and feed-quality score for each camera, a face-recognition readiness report, a blind-spot and coverage map, a false-alarm analysis, and a CCTV-based attendance feasibility check.",
  },
  {
    q: "Will you tell me if my cameras are not good enough?",
    a: "Yes. Low cameras, backlit gates and poor night feeds are common, and the report says exactly which cameras fall short and what a fix would involve. Telling you that up front costs less than a bad deployment later.",
  },
  {
    q: "Do I need to buy new cameras or hardware first?",
    a: "No. The audit runs on the cameras you already own, and so does PGAK. Where a camera genuinely cannot do the job the report says so, and the decision stays with you.",
  },
];

export default function FreeAuditPage() {
  const wa = waHref("Hi PGAK, I'd like a free audit of my existing cameras.");
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "Free AI readiness audit",
            description: "A free remote audit of your existing CCTV cameras with a report within 48 hours.",
          }),
          serviceSchema({
            name: "Free AI readiness audit of existing CCTV cameras",
            description:
              "Remote audit of a site's existing cameras: placement scores, face-recognition readiness, blind spots, false-alarm analysis and attendance feasibility. Free, report within 48 hours.",
            path: PATH,
          }),
          breadcrumbSchema(TRAIL),
          faqSchema(FAQS),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-10">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <p className="eyebrow mt-6">Free — no obligation</p>
            <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.1rem,4.8vw,3.3rem)]">
              A free AI readiness audit of the cameras you already have
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Before you spend a rupee, know exactly what your existing setup can
              do. We analyse your feeds remotely, camera by camera, and send a
              clear report within {AUDIT_TURNAROUND_HOURS} hours. Worth{" "}
              {AUDIT_TOTAL_VALUE}. Costs nothing. No new hardware.
            </p>
            <div className="mt-8 max-w-[640px]">
              <QuickLead cta="free-audit-hero" offer="audit" />
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener"
                  data-cta="free-audit-whatsapp"
                  className="link-more"
                >
                  Or WhatsApp us
                </a>
                <a href={`tel:${BUSINESS.phoneE164}`} data-cta="free-audit-call" className="link-more">
                  Call {BUSINESS.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="sec pt-6">
          <div className="wrap">
            <h2 className="display text-[clamp(1.6rem,3.2vw,2.3rem)]">What you get</h2>
            <ul className="mt-7 grid gap-4 md:grid-cols-2">
              {AUDIT_ITEMS.map((it) => (
                <li key={it.t} className="flex gap-4 rounded-[16px] border border-line bg-panel p-5">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/[0.08] text-[0.85rem] font-semibold text-accent">
                    ✓
                  </span>
                  <div>
                    <p className="font-medium text-ink">{it.t}</p>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">{it.d}</p>
                    <p className="mt-2 text-[0.8rem] text-ink-faint">
                      Worth <span className="line-through">{it.v}</span> · free
                    </p>
                  </div>
                </li>
              ))}
              <li className="flex items-center justify-between gap-4 rounded-[16px] border border-accent/25 bg-accent/[0.06] p-5">
                <div>
                  <p className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">Total value</p>
                  <p className="font-display text-[1.5rem] text-ink">
                    <span className="text-ink-faint line-through">{AUDIT_TOTAL_VALUE}</span>{" "}
                    <span className="text-accent">→ free</span>
                  </p>
                </div>
                <a href="#dealer" data-cta="free-audit-total-cta" className="btn btn-primary">
                  Get my free audit →
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="sec pt-0">
          <div className="wrap">
            <h2 className="display text-[clamp(1.6rem,3.2vw,2.3rem)]">How it works</h2>
            <ol className="mt-7 grid gap-4 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.h} className="rounded-[16px] border border-line bg-panel p-6">
                  <span className="font-display text-[1.6rem] font-semibold leading-none text-accent">{i + 1}</span>
                  <h3 className="mt-3 text-[1.05rem] font-semibold text-ink">{s.h}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{s.d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[16px] border border-line p-6">
                <h3 className="text-[1.05rem] font-semibold text-ink">Who it is for</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                  Factories, warehouses, shops, offices, schools and housing
                  societies with four or more cameras already installed, anywhere
                  in India. If you have a DVR or NVR, you qualify.
                </p>
              </div>
              <div className="rounded-[16px] border border-line p-6">
                <h3 className="text-[1.05rem] font-semibold text-ink">What it is not</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                  Not a sales visit and not a quote in disguise. Nothing is
                  installed, nothing is bought, and if your cameras cannot do the
                  job the report says so plainly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec pt-0">
          <div className="wrap">
            <h2 className="display text-[clamp(1.6rem,3.2vw,2.3rem)]">Questions people ask first</h2>
            <div className="mt-6 max-w-[760px]">
              {FAQS.map((f) => (
                <details key={f.q} className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-[1.02rem] font-medium text-ink">
                    {f.q}
                    <span className="mt-0.5 shrink-0 text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-[0.9rem] text-ink-soft">
              Want the full picture of what the software does after the audit?{" "}
              <Link href="/solutions" className="text-accent underline underline-offset-4">
                See the solutions
              </Link>{" "}
              or{" "}
              <Link href="/pricing" className="text-accent underline underline-offset-4">
                how pricing works
              </Link>
              .
            </p>
          </div>
        </section>

        <WhoIsPgak />
        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
