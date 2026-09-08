import Reveal from "@/components/Reveal";
import { BUSINESS } from "@/lib/seo";
import { waHref } from "@/lib/whatsapp";

/**
 * Pricing without a price.
 *
 * We quote per site on a call or WhatsApp rather than publishing a rate, so
 * this section does the job a price table used to do — sets expectations about
 * what moves the number, offers the sensible starting package, and says what
 * can never appear on the invoice — and then hands the visitor the two ways to
 * actually get quoted.
 */

const DRIVERS = [
  {
    t: "How many cameras",
    d: "Billing is per camera per month, so the count you want made intelligent is the biggest single factor. You choose which cameras — it doesn't have to be the whole estate.",
  },
  {
    t: "How many sites",
    d: "One shop is a different conversation from eleven branches on one dashboard. Multi-site deployments are quoted together.",
  },
  {
    t: "What you switch on",
    d: "Intrusion, face recognition, attendance, perimeter lines, vehicle detection. Most sites start with two and grow.",
  },
];

const STARTER = [
  "The gate or main entrance — who came in, and when",
  "The cash counter or dispatch desk — where money and stock change hands",
  "The stock room or godown — where losses actually happen",
  "One perimeter line — the wall, the yard, the loading bay after hours",
];

const NEVER_EXTRA = [
  "New cameras — it runs on the ones you already own",
  "A separate software licence",
  "Software updates, for as long as you're with us",
  "Per-employee or per-enrolment charges on attendance",
  "The camera audit before you decide anything",
];

const WA_TEXT =
  "Hi PGAK! I'd like a price for AI CCTV on my existing cameras. Here's my setup:";

export default function Pricing() {
  const wa = waHref(WA_TEXT);

  return (
    <section id="pricing" className="sec pt-6">
      <div className="wrap">
        <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
          <span className="eyebrow eyebrow-center mb-4">What it costs</span>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
            We quote your site, not a list price.
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-ink-soft">
            Tell us your camera count and what you want watched, and you get a
            firm per-camera number the same day — on the phone or on WhatsApp,
            whichever you prefer. No form maze, no &ldquo;request a
            demo&rdquo; before anyone will talk numbers.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-[22px] lg:grid-cols-3">
          <Reveal className="rounded-2xl border border-line bg-panel p-8">
            <h3 className="text-[1.3rem] font-semibold">
              What decides your number
            </h3>
            <ul className="mt-6 flex list-none flex-col gap-5">
              {DRIVERS.map((d) => (
                <li key={d.t}>
                  <p className="font-medium text-ink">{d.t}</p>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">
                    {d.d}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.04} className="rounded-2xl border border-line bg-panel p-8">
            <span className="eyebrow mb-3">Where most sites start</span>
            <h3 className="mt-3 text-[1.3rem] font-semibold">
              Four to six cameras that matter, not every feed
            </h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
              Most sites do not need analytics on every camera. Start with the
              handful that watch the places where money, stock and people move,
              and add cameras later at the same per-camera structure.
            </p>
            <ul className="mt-5 flex list-none flex-col gap-2.5">
              {STARTER.map((s) => (
                <li key={s} className="flex gap-3 text-[0.92rem] text-ink-soft">
                  <span className="text-accent">→</span>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.08}
            className="panel-dark flex flex-col rounded-2xl border border-accent bg-gradient-to-b from-[#13332b] to-[#0c1a17] p-8"
          >
            <h3 className="text-[1.3rem] font-semibold">
              What never appears on the invoice
            </h3>
            <ul className="my-6 flex-1 list-none">
              {NEVER_EXTRA.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 py-2 text-[0.92rem] text-ink-soft"
                >
                  <span className="text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener"
                data-cta="pricing-whatsapp"
                className="btn btn-primary w-full justify-center"
              >
                Get my price on WhatsApp →
              </a>
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                data-cta="pricing-call"
                className="btn btn-ghost w-full justify-center"
              >
                Call {BUSINESS.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <p className="mt-7 text-center text-[0.85rem] text-ink-faint">
          Running many cameras or several sites? Volume is quoted differently —
          say so when you call and we&rsquo;ll price the whole estate together.
        </p>
      </div>
    </section>
  );
}
