import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { REVIEWS } from "@/lib/trust";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  reviewSchema,
  webPageSchema,
} from "@/lib/schema";

const PATH = "/trust/reviews";

export const metadata: Metadata = pageMeta({
  title: "PGAK Reviews — What Warehouse, Shop and Factory Owners Say",
  description:
    "Reviews from home, shop, warehouse and factory owners across India who switched to PGAK AI CCTV — what changed on their sites, in their own words.",
  path: PATH,
  keywords: [
    "PGAK reviews",
    "AI CCTV reviews India",
    "customer testimonials security",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Reviews", path: PATH },
];

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "PGAK customer reviews",
            description:
              "Customer reviews of PGAK AI CCTV from sites across India.",
          }),
          breadcrumbSchema(TRAIL),
          ...reviewSchema(REVIEWS),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-[50px]">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <Link
              href="/#trust"
              className="mt-4 inline-flex text-[0.85rem] text-ink-faint transition-colors hover:text-accent"
            >
              ← Back to Customer Trust
            </Link>
            <div className="mx-auto mt-8 max-w-[680px] text-center">
              <span className="eyebrow eyebrow-center mb-4">
                Customer reviews
              </span>
              <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">
                Real words from protected sites.
              </h1>
              <p className="mx-auto mt-4 max-w-[540px] text-[1.05rem] text-ink-soft">
                Owners of homes, shops, warehouses and factories across India on
                what changed after switching to PGAK.
              </p>

              {/* No aggregate-rating badge until real Google reviews exist:
                  we only show numbers a reader can verify. The testimonials
                  below carry the proof for now. */}
            </div>
          </div>
        </section>

        <section className="pb-[110px]">
          <div className="wrap">
            <div className="mx-auto grid max-w-[1000px] gap-5 md:grid-cols-2">
              {REVIEWS.map((r, i) => (
                <div
                  key={r.name + i}
                  className={`card flex flex-col gap-3 p-7 ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-accent/15 font-display text-[1.15rem] text-accent">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <div className="text-[0.98rem] font-semibold text-ink">
                        {r.name}
                      </div>
                      <div className="text-[0.78rem] text-ink-faint">
                        {r.context}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Stars n={r.stars} />
                    </div>
                  </div>
                  <p className="text-[0.98rem] leading-relaxed text-ink-soft">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link href="/#audit" className="btn btn-primary">
                Get your free site audit →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div
      className="flex gap-0.5 text-[1rem] leading-none"
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? "text-[#ffc24b]" : "text-ink-faint/40"}>
          ★
        </span>
      ))}
    </div>
  );
}
