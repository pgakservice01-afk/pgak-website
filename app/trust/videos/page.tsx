import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { VideoTile } from "@/components/trust/Media";
import { VIDEOS } from "@/lib/trust";

export const metadata: Metadata = {
  title: "Videos — PGAK | See the AI security in action",
  description:
    "Walkthroughs and live-detection clips showing PGAK intelligent security working on real camera feeds.",
  alternates: { canonical: "https://pgak.co.in/trust/videos" },
};

export default function VideosPage() {
  return (
    <>
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-[50px]">
          <div className="wrap">
            <Link
              href="/#trust"
              className="text-[0.85rem] text-ink-faint transition-colors hover:text-accent"
            >
              ← Back to Customer Trust
            </Link>
            <div className="mx-auto mt-8 max-w-[680px] text-center">
              <span className="eyebrow eyebrow-center mb-4">Videos</span>
              <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">
                Watch the intelligence work.
              </h1>
              <p className="mx-auto mt-4 max-w-[540px] text-[1.05rem] text-ink-soft">
                Live-detection clips and product walkthroughs — see exactly how
                PGAK turns ordinary cameras into intelligent guardians.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-[110px]">
          <div className="wrap">
            <div className="mx-auto grid max-w-[1000px] gap-5 md:grid-cols-2">
              {VIDEOS.map((v, i) => (
                <VideoTile
                  key={v.title + i}
                  src={v.src}
                  poster={v.poster}
                  title={v.title}
                  duration={v.duration}
                />
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link href="/#demo" className="btn btn-primary">
                Book a live demo →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
