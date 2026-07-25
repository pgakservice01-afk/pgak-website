import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { REVIEWS } from "@/lib/trust";

export const metadata: Metadata = {
  title: "Customer Reviews — PGAK | Real proof from sites we protect",
  description:
    "Verified reviews from home, shop, warehouse and factory owners across India who switched to PGAK intelligent security.",
  alternates: { canonical: "https://pgak.co.in/trust/reviews" },
};

export default function ReviewsPage() {
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
