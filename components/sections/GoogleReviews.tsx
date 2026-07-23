import Reveal from "@/components/Reveal";
import { REVIEWS_CONFIG } from "@/lib/reviews";

/**
 * Google Reviews — social proof straight from the platform Indian buyers
 * trust most. Fully driven by lib/reviews.ts:
 *   - real reviews configured → rating summary + cards + "read all" link
 *   - only reviewUrl set      → honest "be our first review" band
 *   - nothing configured      → renders nothing
 */
export default function GoogleReviews() {
  const { reviewUrl, mapsUrl, rating, count, reviews } = REVIEWS_CONFIG;

  if (!reviews.length && !reviewUrl) return null;

  return (
    <section id="reviews" className="sec bg-bg-2">
      <div className="wrap">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <span className="eyebrow eyebrow-center mb-4">Google reviews</span>
          {reviews.length ? (
            <>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
                Rated {rating.toFixed(1)} on Google
              </h2>
              <div className="mt-4 flex items-center justify-center gap-3">
                <Stars n={5} />
                <span className="text-[0.95rem] text-ink-soft">
                  {rating.toFixed(1)}/5 · {count} Google review
                  {count === 1 ? "" : "s"}
                </span>
              </div>
            </>
          ) : (
            <>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
                Protected by PGAK? Tell India.
              </h2>
              <p className="mt-4 text-[1.02rem] text-ink-soft">
                We&rsquo;re collecting our first public Google reviews. If PGAK
                watches over your home, shop or factory, two minutes of your
                time helps other owners choose real security.
              </p>
            </>
          )}
        </Reveal>

        {reviews.length > 0 && (
          <div className="mx-auto mb-10 grid max-w-[1000px] gap-5 md:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <Reveal
                key={r.name + i}
                delay={i * 0.08}
                className="card flex flex-col gap-3 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-accent/15 font-display text-[1.05rem] text-accent">
                    {r.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <div className="text-[0.92rem] font-semibold text-ink">
                      {r.name}
                    </div>
                    {r.context && (
                      <div className="text-[0.76rem] text-ink-faint">
                        {r.context}
                      </div>
                    )}
                  </div>
                </div>
                <Stars n={r.stars} />
                <p className="text-[0.92rem] leading-relaxed text-ink-soft">
                  &ldquo;{r.text}&rdquo;
                </p>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="flex flex-wrap items-center justify-center gap-3">
          {reviewUrl && (
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              ★ Write a review on Google
            </a>
          )}
          {mapsUrl && reviews.length > 0 && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
            >
              Read all reviews on Google
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-[0.95rem] leading-none" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? "text-[#ffc24b]" : "text-ink-faint/40"}>
          ★
        </span>
      ))}
    </div>
  );
}
