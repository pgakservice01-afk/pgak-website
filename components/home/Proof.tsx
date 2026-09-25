import { publishedProjects, projectsReady } from "@/lib/proof/projects";
import {
  publishedTestimonials,
  testimonialsReady,
  initialsOf,
} from "@/lib/proof/testimonials";

/**
 * The two sections of the homepage that make claims about real people and real
 * sites, and the only two that can hide themselves.
 *
 * Both are server components. The records they read never reach the browser
 * bundle, so a draft testimonial cannot be recovered from the page source by a
 * curious visitor — it is filtered before any HTML exists. That matters more
 * than it sounds: the three quotes currently in lib/proof/testimonials.ts are
 * attributed to named, findable businesspeople who have not yet agreed to
 * them, and "it was only in the JavaScript bundle" would be no defence.
 */

/* ------------------------------------------------------------------ work */

export function RealWork() {
  // Brief: "If real project media is not available, hide the public gallery."
  if (!projectsReady()) return null;
  const projects = publishedProjects();

  return (
    <section className="h-sec" id="real-work" aria-labelledby="work-heading">
      <div className="h-wrap">
        <p className="h-eyebrow">Real work. Real sites.</p>
        <h2 id="work-heading">Built on site. Checked on site.</h2>
        <p className="h-lede">
          Technology creates value only when it works in the actual
          environment. Our work begins with the physical site, the cameras
          already installed and the operational reality of your business.
        </p>
        <p className="h-note">
          Everything below was recorded by our own team on a working site. Each
          one carries the conditions it was captured under and what it does not
          prove, because a clip without its circumstances shows more than it
          should.
        </p>

        <div className="h-grid h-grid--3">
          {projects.map((p) => (
            <article className="h-project" key={p.id}>
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
                  style={{ display: "block", width: "100%", height: "auto" }}
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
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              )}

              <div className="h-project__meta">
                <p className="h-project__tag">{p.category}</p>
                <h3>{p.title}</h3>
                <p className="h-body">{p.description}</p>
                <p className="h-project__caveat">
                  <b>Conditions.</b> {p.conditions}
                </p>
                <p className="h-project__caveat">
                  <b>What it does not show.</b> {p.limits}
                </p>
                <p className="h-body" style={{ marginTop: "auto", paddingTop: 8 }}>
                  <a href={p.href} className="underline">
                    More on this →
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- client voices */

export function ClientVoices() {
  /**
   * Renders nothing until two clients have approved in writing.
   *
   * Not a placeholder, not a "testimonials coming soon" strip, not a greyed-out
   * card. An empty promise of proof is still a promise of proof, and a visitor
   * who sees three blurred cards concludes the quotes exist. They do not yet.
   */
  if (!testimonialsReady()) return null;
  const quotes = publishedTestimonials();

  return (
    <section className="h-sec h-sec--tint" id="clients" aria-labelledby="voices-heading">
      <div className="h-wrap">
        <p className="h-eyebrow">Client voices</p>
        <h2 id="voices-heading">
          What business leaders value about our approach.
        </h2>
        <p className="h-lede">
          Every quote below was confirmed in writing by the client it is
          attributed to, who approved this exact wording for publication.
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
