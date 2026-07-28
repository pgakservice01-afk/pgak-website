"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Scroll parallax wrapper — drifts (and optionally scales) its children as the
 * element moves through the viewport, for the cinematic "foreground/background
 * move at different speeds" feel. Content-safe: it only wraps, never changes
 * what's inside. Honors reduced-motion.
 */
export default function Parallax({
  children,
  className,
  speed = 40,
  scale = 0,
}: {
  children: ReactNode;
  className?: string;
  /** px of vertical drift across the scroll range */
  speed?: number;
  /** extra scale added at centre (0 = none) */
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + scale, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, scale: scale ? s : undefined }}
    >
      {children}
    </motion.div>
  );
}
