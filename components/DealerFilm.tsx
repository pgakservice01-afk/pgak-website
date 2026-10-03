/**
 * One of PGAK's own vertical films, played with its sound on.
 *
 * ── Why this is not `ProofVideo` ──
 * `ProofVideo` exists for CCTV evidence: landscape, silent, shot on a
 * customer's floor. These two are the opposite of that on every axis. They are
 * 9:16 phone films made by PGAK, and the *speech is the content* — one is a
 * Hinglish pitch reel with burnt-in captions, the other is an engineer talking
 * through a fitting. Reusing a component built to drop audio and fill the
 * column width would have produced a silent, stretched version of neither.
 *
 * ── Why it stays muted-by-default-off, not autoplaying ──
 * `preload="none"` behind a poster, same rule as every other clip on this
 * site: these files are 4-6 MB and a dealer opening this page on mobile data
 * should pay nothing until they choose to watch. And nothing autoplays — a
 * film that starts talking at you on a page asking for your money is the
 * behaviour this site argues against everywhere else.
 *
 * `controls` is the whole interface on purpose. The reader may be on a bus
 * with the sound off, so they need the scrubber and the volume control that
 * their own phone already taught them, not a custom player we invented.
 */
export default function DealerFilm({
  src,
  poster,
  title,
  blurb,
  seconds,
  language,
}: {
  src: string;
  poster: string;
  title: string;
  blurb: string;
  seconds: number;
  language: string;
}) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    // No card of its own: this always sits inside a panel on /partners, and a
    // second border plus a second padding stole 40px from a 375px screen —
    // enough to drop the film to 217px wide, which is not a film any more.
    <figure className="m-0 flex flex-col items-center">
      {/* Capped rather than fluid: a 9:16 film stretched to a desktop column
          would be taller than the viewport and the reader would never see the
          caption under it. */}
      <div className="w-full max-w-[320px] overflow-hidden rounded-[14px] border border-line bg-black">
        <video
          className="block h-auto w-full"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
          aria-label={title}
        />
      </div>
      <figcaption className="mt-5 w-full max-w-[380px] text-center">
        <span className="block text-[1.02rem] font-semibold text-ink">{title}</span>
        <span className="mt-1 block text-[0.82rem] text-ink-faint">
          {mins}:{secs} · {language} · please turn your sound on
        </span>
        <span className="mt-3 block text-[0.94rem] leading-relaxed text-ink-soft">
          {blurb}
        </span>
      </figcaption>
    </figure>
  );
}
