import Image from "next/image";
import Link from "next/link";

import type { SolutionCoverage } from "@/lib/solutions";

/**
 * "Where the cameras go, and what each one is for."
 *
 * A worked coverage example, not a customer. The distinction is the whole
 * point of this component and is stated on the page rather than buried: the
 * scene is an illustration, the positions are the ones we would actually
 * argue for, and no house in it belongs to anyone.
 *
 * Why this exists at all: a homeowner cannot picture "AI video analytics", but
 * they can picture their own gate, their own boundary wall and the lane beside
 * their house. Walking a plausible building position by position does the work
 * that a feature list does not — and every position carries what it cannot do,
 * because the fastest way to lose a residential buyer is to let them believe a
 * camera stops an intrusion rather than telling them about it sooner.
 */
export default function CoverageWalkthrough({ coverage }: { coverage: SolutionCoverage }) {
  return (
    <section className="sec-band sec" aria-labelledby="coverage-heading">
      <div className="wrap">
        <span className="eyebrow">A worked example</span>
        <h2
          id="coverage-heading"
          className="display mt-4 max-w-[26ch] text-[clamp(1.6rem,3vw,2.3rem)]"
        >
          {coverage.heading}
        </h2>
        <p className="mt-4 max-w-[68ch] text-ink-soft">{coverage.intro}</p>

        <figure className="mt-8 m-0">
          <div className="overflow-hidden rounded-[18px] border border-line">
            <Image
              src={coverage.image.src}
              alt={coverage.image.alt}
              width={coverage.image.width}
              height={coverage.image.height}
              sizes="(max-width: 1024px) 100vw, 1000px"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-[0.86rem] leading-relaxed text-ink-faint">
            {coverage.image.caption}
          </figcaption>
        </figure>

        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {coverage.positions.map((p, i) => (
            <li key={p.place} className="card flex flex-col p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="text-[0.78rem] font-semibold tracking-[0.2em] text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.05rem] font-semibold">{p.place}</h3>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
                {p.detects}
              </p>
              <p className="mt-3 border-t border-line pt-3 text-[0.88rem] leading-relaxed text-ink-faint">
                <span className="font-semibold text-ink-soft">Needs: </span>
                {p.needs}
              </p>
              {p.href && (
                <Link
                  href={p.href}
                  data-cta="coverage-feature"
                  className="mt-4 text-[0.9rem] font-semibold text-accent underline underline-offset-4"
                >
                  {p.linkLabel ?? "How this works"} →
                </Link>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 max-w-[70ch] rounded-[16px] border border-line bg-panel p-6">
          <h3 className="text-[1rem] font-semibold">What this does not do</h3>
          <ul className="mt-3 grid gap-2 text-[0.94rem] leading-relaxed text-ink-soft">
            {coverage.limits.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
