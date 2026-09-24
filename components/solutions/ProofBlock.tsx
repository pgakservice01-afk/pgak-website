import Image from "next/image";

import type { SolutionProof } from "@/lib/solutions";

/**
 * Original PGAK material — the real thing, with its conditions stated.
 *
 * Everything else illustrative on this site is labelled as such, and that
 * labelling stays. This block is the opposite case and must be equally exact:
 * it says where the picture came from, what was true when it was taken, and
 * what it does not prove. A proof section that overclaims is worth less than
 * no proof section, because the first buyer who checks stops believing the
 * rest of the page too.
 *
 * `redaction` is rendered, not hidden in a tooltip. Number plates are personal
 * data; saying plainly that they were removed before publication is itself a
 * signal to a buyer weighing whether to trust us with their own site's footage.
 */
export default function ProofBlock({ proof }: { proof: SolutionProof }) {
  return (
    <section className="sec" aria-labelledby="proof-heading">
      <div className="wrap">
        <span className="eyebrow">From a working install</span>
        <h2
          id="proof-heading"
          className="display mt-4 max-w-[24ch] text-[clamp(1.6rem,3vw,2.3rem)]"
        >
          {proof.heading}
        </h2>
        <p className="mt-4 max-w-[68ch] text-ink-soft">{proof.intro}</p>

        <div className="mt-9 grid gap-8 lg:grid-cols-2">
          {proof.items.map((item, i) => (
            <figure key={item.src} className="m-0">
              <div className="overflow-hidden rounded-[18px] border border-line bg-panel">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  // Below the fold on every page that uses this block.
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-4">
                <span className="text-[1rem] font-semibold text-ink">
                  {item.title}
                </span>
                <span className="mt-2 block text-[0.94rem] leading-relaxed text-ink-soft">
                  {item.caption}
                </span>
                {item.conditions && (
                  <span className="mt-3 block text-[0.88rem] leading-relaxed text-ink-faint">
                    <span className="font-semibold">Conditions: </span>
                    {item.conditions}
                  </span>
                )}
                {item.redaction && (
                  <span className="mt-2 block text-[0.88rem] leading-relaxed text-ink-faint">
                    {item.redaction}
                  </span>
                )}
              </figcaption>
              {i === 0 && <span className="sr-only">Original PGAK photograph.</span>}
            </figure>
          ))}
        </div>

        <p className="mt-8 max-w-[68ch] text-[0.9rem] leading-relaxed text-ink-faint">
          {proof.limits}
        </p>
      </div>
    </section>
  );
}
