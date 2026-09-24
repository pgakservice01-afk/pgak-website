/**
 * A clip of the product working, with its conditions attached.
 *
 * `preload="none"` with a poster is deliberate and load-bearing: these files
 * are around 3 MB, and a visitor who never presses play should never pay for
 * them. The poster is a still from the clip itself, so the card looks like the
 * thing it plays rather than a stock image standing in for it.
 *
 * No autoplay. A security page that starts moving at you is the same trick the
 * vendors this site argues against use, and a muted autoplaying clip also robs
 * the viewer of the decision to look.
 *
 * Both source clips were re-encoded before publishing — one of them could not
 * be played by any browser as supplied. `docs/proof/ASSET_MANIFEST.md` records
 * what was changed and why, including what was blurred out.
 */
export default function ProofVideo({
  src,
  poster,
  title,
  caption,
  conditions,
  redaction,
  durationSeconds,
}: {
  src: string;
  poster: string;
  title: string;
  caption: string;
  conditions?: string;
  redaction?: string;
  durationSeconds?: number;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[18px] border border-line bg-panel">
        <video
          className="block h-auto w-full"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
          // No audio track exists on either clip — a customer's floor is not
          // ours to record conversations from.
          muted
          aria-label={title}
        />
      </div>
      <figcaption className="mt-4">
        <span className="text-[1rem] font-semibold text-ink">{title}</span>
        {typeof durationSeconds === "number" && (
          <span className="ml-2 text-[0.85rem] text-ink-faint">
            {durationSeconds}s · no sound
          </span>
        )}
        <span className="mt-2 block text-[0.94rem] leading-relaxed text-ink-soft">
          {caption}
        </span>
        {conditions && (
          <span className="mt-3 block text-[0.88rem] leading-relaxed text-ink-faint">
            <span className="font-semibold">Conditions: </span>
            {conditions}
          </span>
        )}
        {redaction && (
          <span className="mt-2 block text-[0.88rem] leading-relaxed text-ink-faint">
            {redaction}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
