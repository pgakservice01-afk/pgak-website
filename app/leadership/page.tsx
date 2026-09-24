import type { Metadata } from "next";
import Link from "next/link";

import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import DealerForm from "@/components/sections/DealerForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, SITE_URL, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { PEOPLE, founders } from "@/lib/people";

const PATH = "/leadership";

export const metadata: Metadata = pageMeta({
  title: "Leadership — the founders and CEO of PGAK Innovations",
  description:
    "Who runs PGAK Innovations Pvt. Ltd.: founders Puneet Garg and Ankur Kaplesh, and CEO Aditya Mittal — with the company's registration details so you can check us.",
  path: PATH,
  keywords: [
    "PGAK founders",
    "PGAK Innovations leadership",
    "who owns PGAK",
    "Aditya Mittal PGAK",
    "AI CCTV company India founders",
  ],
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Company", path: "/about" },
  { name: "Leadership", path: PATH },
];

/** Initials, for people whose photograph PGAK has not published. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function LeadershipPage() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({
            path: PATH,
            name: "Leadership — PGAK Innovations",
            description:
              "The founders and CEO of PGAK Innovations Pvt. Ltd., with company registration details.",
          }),
          breadcrumbSchema(TRAIL),
          // One Person node each, so an assistant asked "who founded PGAK" has
          // something structured to read rather than inferring from prose.
          ...PEOPLE.map((p) => ({
            "@type": "Person",
            "@id": `${SITE_URL}${PATH}#${p.slug}`,
            name: p.name,
            jobTitle: p.role,
            worksFor: { "@type": "Organization", name: BUSINESS.legalName },
            ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
          })),
        ]}
      />
      <Nav />
      <main id="main-content" className="pt-[74px]">
        <section className="sec pb-[50px]">
          <div className="wrap">
            <Breadcrumbs trail={TRAIL} />
            <div className="mx-auto mt-6 max-w-[720px] text-center">
              <span className="eyebrow eyebrow-center mb-4">Leadership</span>
              <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.4rem)]">
                The people you are actually buying from.
              </h1>
              <p className="mx-auto mt-5 max-w-[620px] text-[1.05rem] leading-relaxed text-ink-soft">
                Plenty of security companies in India are a phone number and a
                website. PGAK is a registered private limited company with named
                people behind it, and everything on this page — the company
                number, the incorporation year, the profiles — is something you
                can check yourself before you spend a rupee.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- the people */}
        <section className="sec bg-bg-2 pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[900px]">
              <div className="mb-10 text-center">
                <h2 className="display text-[clamp(1.5rem,3vw,2.1rem)]">
                  Founders and CEO
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {PEOPLE.map((person) => (
                  <div key={person.slug} id={person.slug} className="card scroll-mt-24 p-8">
                    <div className="flex flex-wrap items-center gap-5">
                      <span
                        aria-hidden="true"
                        className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-accent/10 font-display text-[1.25rem] font-medium text-accent"
                      >
                        {initials(person.name)}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.35rem] font-medium text-ink">
                          {person.name}
                        </h3>
                        <p className="mt-1 text-[0.95rem] text-accent">{person.role}</p>
                      </div>
                    </div>

                    {person.bio.map((para) => (
                      <p
                        key={para.slice(0, 32)}
                        className="mt-4 max-w-[68ch] text-[0.98rem] leading-relaxed text-ink-soft"
                      >
                        {para}
                      </p>
                    ))}

                    {person.credentials.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {person.credentials.map((c) => (
                          <li
                            key={c}
                            className="rounded-full border border-line px-3 py-1 text-[0.85rem] text-ink-soft"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem]">
                      {person.linkedin && (
                        <a
                          href={person.linkedin}
                          rel="noopener noreferrer me"
                          target="_blank"
                          className="text-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
                        >
                          {person.name} on LinkedIn ↗
                        </a>
                      )}
                      {person.source && (
                        <a
                          href={person.source}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                        >
                          Where these credentials come from ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- checkable company facts */}
        <section className="sec pt-0">
          <div className="wrap">
            <div className="mx-auto max-w-[900px]">
              <div className="card p-8 sm:p-10">
                <span className="eyebrow mb-4">Check us</span>
                <h2 className="display mt-4 text-[clamp(1.4rem,2.6vw,1.9rem)]">
                  Everything here is on the public record.
                </h2>
                <p className="mt-4 max-w-[68ch] text-[0.98rem] leading-relaxed text-ink-soft">
                  The company number below is issued by the Ministry of
                  Corporate Affairs. You can look it up on the MCA portal and
                  see the incorporation date, the registered office and the
                  directors on file — without asking us for anything.
                </p>
                <dl className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.85rem] text-ink-faint">Registered name</dt>
                    <dd className="mt-1 text-ink">{BUSINESS.legalName}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.85rem] text-ink-faint">CIN</dt>
                    <dd className="mt-1 font-mono text-[0.95rem] text-ink">{BUSINESS.cin}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.85rem] text-ink-faint">Incorporated</dt>
                    <dd className="mt-1 text-ink">{BUSINESS.founded}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.85rem] text-ink-faint">Founded by</dt>
                    <dd className="mt-1 text-ink">
                      {founders()
                        .map((p) => p.name)
                        .join(" and ")}
                    </dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/about" className="btn btn-ghost">
                    More about the company
                  </Link>
                  <Link href="/contact" className="btn btn-primary">
                    Talk to us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
