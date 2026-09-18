"use client";

import { useState } from "react";

/** Load the silent reference film only after a deliberate play action. */
export default function ReferenceFilm({
  file,
  label,
  captionId,
}: {
  file: string;
  label: string;
  captionId: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      {playing ? (
        <video
          controls
          playsInline
          muted
          autoPlay
          preload="none"
          width="986"
          height="720"
          poster={`/media/${file}.webp`}
          aria-label={label}
          aria-describedby={captionId}
          tabIndex={0}
          ref={(node) => node?.focus()}
        >
          <source src={`/media/${file}.mp4`} type="video/mp4" />
          Your browser does not support video.{" "}
          <a href={`/media/${file}.mp4`}>Open the illustrative film</a>.
        </video>
      ) : (
        <button
          type="button"
          className="film-launch"
          onClick={() => setPlaying(true)}
          aria-label={`Play film: ${label}`}
          aria-describedby={captionId}
        >
          <img
            src={`/media/${file}.webp`}
            width="986"
            height="720"
            loading="lazy"
            decoding="async"
            alt=""
          />
          <span className="film-play-icon" aria-hidden="true">
            ▶
          </span>
          <span className="film-play-label">Play film</span>
        </button>
      )}
      <noscript>
        <a href={`/media/${file}.mp4`}>Watch the illustrative film: {label}</a>
      </noscript>
    </>
  );
}
