"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero's background loop — desktop and tablet only.
 *
 * Phones never request the file. The <video> is not rendered until this has run
 * in the browser and confirmed a wide screen, no reduced-motion preference and
 * no Data Saver. Until then — and always, on a phone — the poster <img> that the
 * page renders underneath is what shows, so first paint and LCP never wait on
 * 3.6 MB of video. The poster is the loop's own first frame, so the moment the
 * video starts is invisible.
 *
 * The clip is licensed stock (Pexels 39457313, a city at night), used for mood.
 * It is aria-hidden and uncaptioned on purpose: it is not a PGAK site and must
 * never be presented as one. Master file and licence note live outside the repo
 * in pgak-website-graphics/hero-video/.
 */
const WANTS_MOTION = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

type NetworkInformation = { saveData?: boolean };

export default function HeroVideo() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(WANTS_MOTION);
    const saveData =
      (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData === true;
    const update = () => setShow(mq.matches && !saveData);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // React sets `muted` as a property, not an attribute, and some browsers check
  // the attribute before allowing autoplay. Setting it here and calling play()
  // makes the start deterministic; a refusal just leaves the poster showing.
  useEffect(() => {
    const v = ref.current;
    if (!show || !v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [show]);

  if (!show) return null;

  return (
    <video
      ref={ref}
      className="h-vhero__video"
      src="/hero/city-night.mp4"
      poster="/hero/city-night-1920.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
