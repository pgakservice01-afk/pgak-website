"use client";
import { useState } from "react";
import Image from "next/image";

/** Reserve layout space and download the animation only when explicitly requested. */
export default function HeroMedia() {
  const [play, setPlay] = useState(false);
  return <div className="relative aspect-video overflow-hidden rounded-[28px] border border-line bg-bg-2">
    {play ? <video className="h-full w-full object-cover" controls playsInline preload="metadata" poster="/hero/humanoid.webp" aria-label="PGAK illustrative product animation"><source src="/hero/humanoid.mp4" type="video/mp4" /></video> : <>
      <Image src="/hero/humanoid.webp" alt="Illustration of connecting CCTV feeds to the PGAK analytics layer" width={848} height={478} sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
      <button type="button" onClick={() => setPlay(true)} className="absolute bottom-4 left-4 btn btn-primary">Watch product animation</button>
    </>}
  </div>;
}
