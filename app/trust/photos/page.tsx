import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { PhotoTile } from "@/components/trust/Media";
import { PHOTOS } from "@/lib/trust";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const PATH = "/trust/photos";

export const metadata: Metadata = pageMeta({
  title: "AI CCTV Installation Photos — Real Deployments Across India | PGAK",
  description:
    "See exactly how PGAK AI CCTV and edge devices are fitted on real homes, shops, warehouses and factories across India — on hardware customers already owned.",
  path: PATH,
  keywords: [
    "CCTV installation photos",
    "AI CCTV deployment India",
    "security camera installation",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Installation photos", path: PATH },
];

export default function PhotosPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK installation photos",
            description:
              "Photos of real PGAK AI CCTV deployments across India.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-[50px]">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <Link
              href="/#trust"
              className="text-[0.85rem] text-ink-faint transition-colors hover:text-accent"
            >
              ← Back to Customer Trust
            </Link>
            <div className="mx-auto mt-8 max-w-[680px] text-center">
              <span className="eyebrow eyebrow-center mb-4">
                Installation photos
              </span>
              <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">
                See it fitted on real sites.
              </h1>
              <p className="mx-auto mt-4 max-w-[540px] text-[1.05rem] text-ink-soft">
                How PGAK cameras and edge devices go in — on the hardware
                customers already owned, with no rip-and-replace.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-[110px]">
          <div className="wrap">
            <div className="mx-auto grid max-w-[1080px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PHOTOS.map((p, i) => (
                <PhotoTile
                  key={p.caption + i}
                  src={p.src}
                  caption={p.caption}
                  sub={p.sub}
                />
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link href="/#demo" className="btn btn-primary">
                Book a free demo →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
