import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import NumbersStrip from "@/components/sections/NumbersStrip";
import Icon, { type IconName } from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import DealerForm from "@/components/sections/DealerForm";
import { AUTHOR, BUSINESS, LEADERSHIP, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const PATH = "/about";

export const metadata: Metadata = pageMeta({
  title: "About PGAK — Intelligent CCTV Built for India",
  description:
    "PGAK turns the cameras India already owns into intelligent guardians — threats caught in seconds, fewer false alarms, video processed on site.",
  path: PATH,
  keywords: [
    "PGAK",
    "AI security company India",
    "AI CCTV company",
    "intelligent surveillance",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

const VALUES: { ic: IconName; t: string; d: string }[] = [
  {
    ic: "camera",
    t: "Retrofit-first",
    d: "We layer intelligence onto the CCTV, IP cameras and DVR/NVR you already own — no rip-and-replace, no wasted spend.",
  },
  {
    ic: "filter",
    t: "Alerts that matter",
    d: "The AI learns your routine and filters out wind, shadows and pets, so a notification always means something real.",
  },
  {
    ic: "shield-lock",
    t: "Private by design",
    d: "Your footage stays encrypted and under your control. Privacy is a starting principle, not an afterthought.",
  },
  {
    ic: "ai-node",
    t: "Built for India",
    d: "Made for Indian homes, shops, societies and factories, delivered through a verified dealer network across the country.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "About PGAK",
            description:
              "Who PGAK is and why we build retrofit AI security for the cameras India already owns.",
          }),
          breadcrumbSchema(TRAIL),
        ]}
      />
      <Nav />
      <main className="pt-[74px]">
        <section className="sec pb-[60px]">
          <div className="wrap">
            <div className="mx-auto max-w-[720px] text-center">
              <span className="eyebrow eyebrow-center mb-4">About PGAK</span>
              <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
                Security that thinks — not just records.
              </h1>
              <p className="mx-auto mt-5 max-w-[600px] text-[1.08rem] text-ink-soft">
                Most CCTV in India is an evidence machine: it captures the
                incident, but only after the loss has happened. PGAK exists to
                change that — turning ordinary cameras into an intelligent layer
                that detects threats in seconds and tells you before it&rsquo;s
                too late.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-[900px] gap-6 md:grid-cols-2">
              <div className="card p-8">
                <h2 className="font-display text-[1.4rem] font-medium text-ink">
                  The problem we set out to fix
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
                  People spend lakhs on cameras and still don&rsquo;t feel safe.
                  Systems record everything but understand nothing — so alerts
                  are either constant noise or arrive too late. The result is a
                  false sense of security that depends on luck.
                </p>
              </div>
              <div className="card p-8">
                <h2 className="font-display text-[1.4rem] font-medium text-ink">
                  How we think about it
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
                  Real security should be proactive and effortless. PGAK adds AI
                  that recognises people, spots the unusual and reaches you with
                  clear, contextual alerts — all on the hardware you already own,
                  with your data kept private.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec bg-bg-2 pt-0">
          <div className="wrap">
            <div className="mx-auto mb-12 max-w-[680px] text-center">
              <span className="eyebrow eyebrow-center mb-4">What we stand for</span>
              <h2 className="display mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)]">
                The principles behind the product.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {VALUES.map((v) => (
                <div key={v.t} className="glass p-8">
                  <div className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-[#04201a] shadow-[0_10px_24px_-12px_#7cf5c4]">
                    <Icon name={v.ic} size={24} strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-2 text-[1.2rem] font-semibold">{v.t}</h3>
                  <p className="text-[0.93rem] text-ink-soft">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <NumbersStrip />

        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[900px]">
              <div className="card p-8 sm:p-10">
                <span className="eyebrow mb-4">The company</span>
                <h2 className="display mt-4 text-[clamp(1.6rem,3vw,2.2rem)]">
                  Who is behind PGAK.
                </h2>
                <p className="mt-4 max-w-[68ch] text-[0.98rem] leading-relaxed text-ink-soft">
                  PGAK was founded in {BUSINESS.founded} by{" "}
                  <span className="text-ink">{AUTHOR.name}</span> in Ludhiana,
                  Punjab — a city of factories, mills and godowns whose owners
                  had all bought CCTV and were all still getting robbed. The
                  product came out of that gap: the cameras were already there;
                  the intelligence wasn&rsquo;t. Today PGAK runs on sites across
                  India through a verified partner network, while engineering
                  stays close to the factories it was built for.
                </p>
                <dl className="mt-7 grid gap-x-10 gap-y-4 text-[0.93rem] sm:grid-cols-2">
                  <div>
                    <dt className="text-ink-faint">Legal name</dt>
                    <dd className="mt-1 text-ink">{BUSINESS.legalName}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Founded</dt>
                    <dd className="mt-1 text-ink">
                      {BUSINESS.founded}, Ludhiana
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Registered office</dt>
                    <dd className="mt-1 text-ink">
                      {BUSINESS.address.street}, {BUSINESS.address.area},{" "}
                      {BUSINESS.address.locality}, {BUSINESS.address.region}{" "}
                      {BUSINESS.address.postalCode}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Leadership</dt>
                    <dd className="mt-1 text-ink">
                      {LEADERSHIP.map((p, i) => (
                        <span key={p.name}>
                          {i > 0 && " · "}
                          {p.name}{" "}
                          <span className="text-ink-soft">({p.role})</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                  {BUSINESS.cin && (
                    <div>
                      <dt className="text-ink-faint">CIN</dt>
                      <dd className="mt-1 text-ink">{BUSINESS.cin}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="sec pt-0">
          <div className="wrap text-center">
            <h2 className="display text-[clamp(1.6rem,3vw,2.2rem)]">
              Ready to make your cameras think?
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="#dealer" className="btn btn-primary">
                Book a free demo →
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
