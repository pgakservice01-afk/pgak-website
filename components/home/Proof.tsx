import { publishedProjects, projectsReady } from "@/lib/proof/projects";
import {
  homepageTestimonials,
  clientLogos,
  testimonialsReady,
  initialsOf,
} from "@/lib/proof/testimonials";

/**
 * The sections of the homepage that make claims about real people and real
 * sites, and the only ones that can hide themselves.
 *
 * All are server components. The records they read never reach the browser
 * bundle, so a draft or withdrawn testimonial cannot be recovered from the
 * page source by a curious visitor — it is filtered before any HTML exists.
 * The quotes in lib/proof/testimonials.ts are attributed to named, findable
 * businesspeople, and "it was only in the JavaScript bundle" would be no
 * defence if one of them had not agreed.
 */

/* ------------------------------------------------------------------ work */

export function RealWork() {
  // Brief: "If real project media is not available, hide the public gallery."
  if (!projectsReady()) return null;
  const projects = publishedProjects();

  return (
    <section className="h-work" id="real-work" aria-labelledby="work-heading">
      <div className="h-wrap">
        <p className="h-eyebrow">See it working</p>
        <h2 id="work-heading">Recorded by our team, on real sites.</h2>

        <div className="h-work__grid">
          {projects.map((p) => (
            <figure className="h-work__item" key={p.id}>
              {p.media.kind === "video" ? (
                <video
                  // No autoplay, no sound, and nothing loads until the visitor
                  // asks: preload="none" means the poster is the only byte
                  // fetched on a phone that never presses play.
                  controls
                  playsInline
                  muted
                  preload="none"
                  poster={p.media.poster}
                  width={1600}
                  height={1000}
                  aria-label={p.alt}
                >
                  <source src={p.media.src} type="video/mp4" />
                  <a href={p.media.src}>Download the clip ({p.title})</a>
                </video>
              ) : (
                <img
                  src={p.media.src}
                  width={p.media.width}
                  height={p.media.height}
                  loading="lazy"
                  decoding="async"
                  alt={p.alt}
                />
              )}

              <figcaption>
                <p className="h-work__tag">{p.category}</p>
                <h3>{p.title}</h3>
                {/*
                  A clip without its circumstances shows more than it should, so
                  every one still carries its conditions and what it does not
                  prove (lib/proof/projects.ts) — one click away here, instead
                  of two paragraphs under each video on the homepage.
                */}
                <details className="h-work__how">
                  <summary>How this was recorded</summary>
                  <p>{p.description}</p>
                  <p>
                    <b>Conditions.</b> {p.conditions}
                  </p>
                  <p>
                    <b>What it does not show.</b> {p.limits}
                  </p>
                  <p>
                    <a href={p.href} className="underline">
                      More on this →
                    </a>
                  </p>
                </details>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- logo row */

export function ClientLogos() {
  /**
   * "Businesses we've helped" — logos only, straight under the hero.
   *
   * Every mark comes from clientLogos(): approved clients who gave logo
   * permission and have a mark on file, with any related party left out
   * because a bare logo has no room for the disclosure. Fewer than three and
   * the row hides — two lonely logos read as a gap, not as proof.
   */
  const logos = clientLogos();
  if (logos.length < 3) return null;

  return (
    <section className="h-logos" aria-labelledby="logos-heading">
      <div className="h-wrap">
        <h2 id="logos-heading" className="h-logos__label">
          Businesses we&rsquo;ve helped
        </h2>
        {/* The name sits under each mark, so the image is decorative (alt="")
            and a screen reader hears each company once, not twice. */}
        <ul className="h-logos__row">
          {logos.map((t) => (
            <li key={t.id}>
              <img src={t.logo} alt="" loading="lazy" decoding="async" />
              <span className="h-logos__name">{t.company}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- client voices */

export function ClientVoices() {
  /**
   * The owner's three quotes (HOMEPAGE_TESTIMONIAL_IDS), or nothing.
   *
   * Hidden until two clients have approved, and hidden again if withdrawals
   * leave fewer than two of the chosen three. Not a placeholder, not a
   * "testimonials coming soon" strip, not a greyed-out card: an empty promise
   * of proof is still a promise of proof.
   */
  const quotes = homepageTestimonials();
  if (!testimonialsReady() || quotes.length < 2) return null;

  return (
    <section className="h-sec" id="clients" aria-labelledby="voices-heading">
      <div className="h-wrap">
        <p className="h-eyebrow">Client voices</p>
        <h2 id="voices-heading">
          What business leaders value about our approach.
        </h2>
        {/* Approved, not "confirmed in writing": every approval on file is the
            owner's attestation, with nothing in writing yet (see the `source`
            of each record). Say "in writing" again only once it is true. */}
        <p className="h-lede">
          Each quote below was approved for publication by the client it is
          attributed to.
        </p>

        <div className="h-quotes">
          {quotes.map((t) => {
            // A client may be quoted as themselves or as the company. Both are
            // legitimate; what is not is a card that looks like a person said
            // it when no person agreed to it.
            const attribution = t.person ?? t.company;
            const role = t.person
              ? [t.designation, t.company].filter(Boolean).join(", ")
              : t.context;

            return (
              <figure className="h-quote" key={t.id}>
                <p>{t.quote}</p>

                {/* Only ever the mark the client said we could use. Agreeing to
                    a quote is not agreeing to hand over a trademark. */}
                {t.logo && t.approval.logoPermission ? (
                  <img
                    className="h-quote__logo"
                    src={t.logo}
                    loading="lazy"
                    decoding="async"
                    alt={`${t.company} logo`}
                  />
                ) : null}

                <figcaption className="h-quote__who">
                  <span className="h-avatar" aria-hidden={t.portrait ? undefined : true}>
                    {/* A face only when the client sent us one and ticked the
                        portrait permission. Otherwise initials — never a stock
                        headshot, which reads as this person and is not. */}
                    {t.portrait && t.approval.portraitPermission ? (
                      <img
                        src={t.portrait}
                        width={96}
                        height={96}
                        loading="lazy"
                        decoding="async"
                        alt={`${attribution}, ${role}`}
                      />
                    ) : (
                      initialsOf(attribution)
                    )}
                  </span>
                  <span>
                    <strong style={{ display: "block", fontSize: 15 }}>
                      {attribution}
                    </strong>
                    <span className="h-note" style={{ margin: 0, display: "block" }}>
                      {role}
                    </span>
                    {t.person ? (
                      <span className="h-note" style={{ margin: 0, display: "block" }}>
                        {t.context}
                      </span>
                    ) : null}
                    {/* Disclosed, not buried: a reader weighing this quote is
                        entitled to know the client is not at arm's length. */}
                    {t.relationship ? (
                      <span className="h-quote__relationship">{t.relationship}</span>
                    ) : null}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
