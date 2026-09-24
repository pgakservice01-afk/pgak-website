import { WHY_PGAK, WHY_PGAK_HEADING, WHY_PGAK_INTRO } from "@/lib/whyPgak";

/**
 * The "why choose this" block. Content and its rules live in lib/whyPgak.ts.
 *
 * Each reason may carry a `limit` — the thing it is deliberately not claiming.
 * Those are rendered, not hidden behind a tooltip or dropped on mobile: a
 * qualification a reader has to go looking for is not a qualification. It is
 * also the part a competitor's page never has, which is rather the point.
 */
export default function WhyPgak() {
  return (
    <section className="sec-band sec" aria-labelledby="why-pgak">
      <div className="wrap">
        <span className="eyebrow">Why PGAK</span>
        <h2
          id="why-pgak"
          className="display mt-4 max-w-[24ch] text-[clamp(1.6rem,3vw,2.3rem)]"
        >
          {WHY_PGAK_HEADING}, in the terms you are buying on
        </h2>
        <p className="mt-4 max-w-[60ch] text-ink-soft">{WHY_PGAK_INTRO}</p>

        <ol className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY_PGAK.map((p, i) => (
            <li key={p.heading} className="card flex flex-col p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="text-[0.78rem] font-semibold tracking-[0.2em] text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.1rem] font-semibold">{p.heading}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                {p.body}
              </p>
              {p.limit && (
                <p className="mt-4 border-t border-line pt-4 text-[0.88rem] leading-relaxed text-ink-faint">
                  <span className="font-semibold text-ink-soft">
                    What this does not mean:{" "}
                  </span>
                  {p.limit}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
