"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

/**
 * ScrollyHero — 500vh scroll track with a sticky h-screen stage.
 * The scroll progress across the track drives both the canvas playhead
 * (ScrollyCanvas) and the parallax copy (Overlay).
 */
export default function ScrollyHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="top" ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">
        <ScrollyCanvas targetRef={ref} />
        {/* blend the bottom of the stage into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
        <Overlay progress={scrollYProgress} />
      </div>
    </section>
  );
}
