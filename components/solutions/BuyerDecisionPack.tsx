import Link from "next/link";

import type { BuyerDecision } from "@/lib/buyerDecision";

/**
 * The deciding facts, in crawlable HTML.
 *
 * Buyers ask what is supported, what the site must provide, what is excluded,
 * what moves the price and how a pilot is judged — before they enquire. The
 * same questions are what search-grounded answers quote, and they can only
 * quote text that is actually on the page (not a video, not a gated PDF).
 *
 * The opening `answer` is deliberately a self-contained paragraph: it has to
 * make sense lifted out of the page and put beside a competitor's.
 */
export default function BuyerDecisionPack({
  decision,
  heading,
  planHref,
  ctaLabel,
}: {
  decision: BuyerDecision;
  heading: string;
  /** Where the page's primary enquiry action lives. */
  planHref: string;
  ctaLabel: string;
}) {
  const { supported, notSupported, requirements, scope, priceFactors, quoteIncludes, pilot, afterEnquiry } =
    decision;

  return (
    <section className="sec" id="what-to-know">
      <div className="wrap">
        <h2 className="display text-[clamp(1.6rem,3vw,2.3rem)]">{heading}</h2>
        <p className="mt-5 max-w-[72ch] text-[1.03rem] leading-relaxed text-ink-soft">
          {decision.answer}
        </p>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          <div className="card p-6 sm:p-7">
            <h3 className="text-[1.05rem] font-semibold">What it does</h3>
            <ul className="mt-3 grid gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {supported.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-accent">
                    +
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-7">
            <h3 className="text-[1.05rem] font-semibold">What it does not do</h3>
            <ul className="mt-3 grid gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {notSupported.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-ink-faint">
                    −
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-7">
            <h3 className="text-[1.05rem] font-semibold">What your site needs</h3>
            <ul className="mt-3 grid gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-7">
            <h3 className="text-[1.05rem] font-semibold">Scope</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Included: </span>
              {scope.included.join(" ")}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Not included: </span>
              {scope.excluded.join(" ")}
            </p>
          </div>

          <div className="card p-6 sm:p-7">
            <h3 className="text-[1.05rem] font-semibold">What affects the price</h3>
            <ul className="mt-3 grid gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {priceFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-[0.9rem] text-ink-faint">
              PGAK quotes per site rather than publishing a rate.{" "}
              <Link href="/pricing" className="text-accent underline underline-offset-2">
                How pricing works
              </Link>
              .
            </p>
          </div>

          <div className="card p-6 sm:p-7">
            <h3 className="text-[1.05rem] font-semibold">What the written quote should list</h3>
            <ul className="mt-3 grid gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {quoteIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-7">
            <h3 className="text-[1.05rem] font-semibold">How to judge a pilot</h3>
            <ul className="mt-3 grid gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {pilot.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-7">
            <h3 className="text-[1.05rem] font-semibold">What happens after you enquire</h3>
            <ol className="mt-3 grid gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {afterEnquiry.map((item, i) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-accent">
                    {i + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4">
              <Link
                href={planHref}
                data-cta="buyer-pack-enquiry"
                className="text-accent underline underline-offset-2"
              >
                {ctaLabel} →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
