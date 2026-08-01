"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";

/**
 * Photo / Video tiles for the Customer Trust proof pages.
 *
 * Both fall back to a premium on-brand placeholder when no real file is set, so
 * the pages look intentional today and "just work" the moment you add media:
 * drop a file in /public/trust/... and set its `src` (and `poster` for video)
 * in lib/trust.ts.
 */

function Placeholder({
  icon,
  label,
}: {
  icon: "photo" | "video";
  label: string;
}) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_100%_at_50%_0%,rgba(62,216,224,0.14),transparent_60%),linear-gradient(160deg,#10222b,#0a1014)]">
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(159,180,182,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(159,180,182,0.06)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="relative grid place-items-center gap-2 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_12px_30px_-12px_#7cf5c4]">
          <Icon name={icon} size={26} strokeWidth={1.7} />
        </span>
        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
          {label}
        </span>
      </div>
    </div>
  );
}

export function PhotoTile({
  src,
  caption,
  sub,
}: {
  src?: string;
  caption: string;
  sub?: string;
}) {
  const [err, setErr] = useState(false);
  const showImg = src && !err;
  return (
    <figure className="card group relative overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        {showImg ? (
          <Image
            src={src}
            // Caption plus context — a screen-reader user should learn what
            // the installation photo shows, not just read a filename.
            alt={sub ? `${caption} — ${sub}` : `PGAK installation: ${caption}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            loading="lazy"
            onError={() => setErr(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Placeholder icon="photo" label="Photo sample" />
        )}
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4">
          <div className="text-[0.95rem] font-semibold text-ink">{caption}</div>
          {sub && <div className="text-[0.78rem] text-ink-soft">{sub}</div>}
        </figcaption>
      </div>
    </figure>
  );
}

export function VideoTile({
  src,
  poster,
  title,
  duration,
}: {
  src?: string;
  poster?: string;
  title: string;
  duration?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [err, setErr] = useState(false);
  const available = !!src && !err;

  return (
    <figure className="card overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-black">
        {playing && available ? (
          <video
            src={src}
            poster={poster}
            className="h-full w-full"
            autoPlay
            controls
            onError={() => {
              setErr(true);
              setPlaying(false);
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => available && setPlaying(true)}
            aria-label={available ? `Play ${title}` : `${title} — coming soon`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {poster ? (
              <Image
                src={poster}
                alt={`Video thumbnail: ${title}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            ) : (
              <Placeholder
                icon="video"
                label={available ? "Video sample" : "Video coming soon"}
              />
            )}
            <span className="absolute inset-0 grid place-items-center">
              <span
                className={`grid h-16 w-16 place-items-center rounded-full text-[#04201a] transition-transform duration-300 group-hover:scale-110 ${
                  available
                    ? "bg-accent/90 shadow-[0_12px_34px_-8px_#7cf5c4]"
                    : "bg-white/15 text-ink"
                }`}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
                </svg>
              </span>
            </span>
            {duration && (
              <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-[0.72rem] font-medium text-ink">
                {duration}
              </span>
            )}
          </button>
        )}
      </div>
      <figcaption className="p-4 text-[0.98rem] font-semibold text-ink">
        {title}
      </figcaption>
    </figure>
  );
}
