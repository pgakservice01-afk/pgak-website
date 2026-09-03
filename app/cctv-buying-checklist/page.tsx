import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import PrintButton from "@/components/PrintButton";
import { BUSINESS, pageMeta } from "@/lib/seo";

/**
 * The printable buying checklist — the asset behind the "Send me the
 * checklist" ask on the guides. Same pattern as /brochure: an HTML page so it
 * never drifts, and the browser's "Save as PDF" is the download.
 *
 * Unlisted on purpose (noindex, not in the sitemap): the page is what a
 * visitor gets after leaving a number, not a page to rank. The questions are
 * the same twelve as the guide post, which stays indexable.
 */
export const metadata: Metadata = pageMeta({
  title: "12 Questions Before Buying an Attendance System (Checklist)",
  description:
    "A vendor-neutral, printable checklist: the twelve questions to put to every attendance-system supplier, including PGAK, before you buy.",
  path: "/cctv-buying-checklist",
  keywords: ["attendance system checklist", "CCTV buying checklist"],
  noIndex: true,
});

const GROUPS: { h: string; items: { q: string; why: string }[] }[] = [
  {
    h: "Coverage and hardware",
    items: [
      { q: "How many entrances does this cover, and what does each additional one cost?", why: "Quotes are per device; sites have several doors. Get the whole-site number." },
      { q: "What happens on the doors you are not quoting for?", why: "If the loading bay and side gate stay uncovered, the record has a hole in it. Know its size now." },
      { q: "What percentage of our workforce will this fail on, and why?", why: "For fingerprint on manual-labour sites the answer is not small. A vendor who says “none” is not being straight." },
    ],
  },
  {
    h: "The rules layer",
    items: [
      { q: "How are rotating shifts handled, and how is a night shift crossing midnight attributed?", why: "If it lands on two calendar dates, budget for monthly manual corrections." },
      { q: "Show me where grace period, half-day threshold and overtime bands are configured.", why: "In the product, not in a slide." },
      { q: "How does a shift swap get recorded?", why: "Real workforces swap constantly. No workflow means a supervisor fixes it by hand every month." },
    ],
  },
  {
    h: "Exceptions and evidence",
    items: [
      { q: "What is the exact path for a missed punch?", why: "Who raises it, who approves it, what reason is captured. “The admin edits it” produces next year's disputes." },
      { q: "If an employee disputes a mark three weeks later, what can you show them?", why: "A timestamp is an assertion. A stored image is evidence." },
      { q: "What percentage of entries are manual on your typical customer's site?", why: "Ask for a real number. It is the honest measure of how well the system works in the field." },
    ],
  },
  {
    h: "Payroll and data",
    items: [
      { q: "Show me an actual payroll export file.", why: "Not the dashboard. The file, with hours already split into regular and overtime." },
      { q: "Where is biometric data stored, and what happens to it when someone leaves?", why: "Under the DPDP Act, templates should not outlive their purpose. No deletion answer means no compliance thinking." },
      { q: "What is the total five-year cost — all doors, hardware, software, AMC and replacement?", why: "Not the device price. The number you will actually spend." },
    ],
  },
];

export default function ChecklistPage() {
  let n = 0;
  return (
    <>
      <div className="print:hidden">
        <Nav />
      </div>

      <main className="pt-[74px] print:pt-0">
        <section className="sec">
          <div className="wrap max-w-[880px]">
            <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
              <p className="eyebrow">Checklist</p>
              <PrintButton />
            </div>

            <article className="mt-8 rounded-[22px] border border-line bg-panel p-10 print:rounded-none print:border-0 print:bg-transparent print:p-0">
              <h1 className="display text-[clamp(1.8rem,4vw,2.6rem)]">
                Twelve questions to ask before buying any attendance system
              </h1>
              <p className="mt-4 max-w-[68ch] leading-relaxed text-ink-soft">
                Attendance demos all look identical, and none of them show the
                part that matters. Everything expensive happens after the punch:
                in the rules layer, the exception path and the payroll export.
                Ask every supplier the same twelve questions — including us —
                and compare the answers instead of the presentations.
              </p>

              {GROUPS.map((g) => (
                <div key={g.h} className="mt-9">
                  <h2 className="display text-[1.25rem]">{g.h}</h2>
                  <ol className="mt-4 grid gap-4">
                    {g.items.map((it) => {
                      n += 1;
                      return (
                        <li key={it.q} className="grid grid-cols-[2.2rem_1fr] gap-3">
                          <span className="font-display text-[1.3rem] font-semibold leading-none text-accent">
                            {n}
                          </span>
                          <div>
                            <p className="font-medium text-ink">{it.q}</p>
                            <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">{it.why}</p>
                            <div className="mt-2 h-8 border-b border-dashed border-line print:h-10" aria-hidden="true" />
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}

              <div className="mt-10 rounded-[12px] border border-line p-5 text-[0.92rem] leading-relaxed text-ink-soft print:border-0 print:p-0">
                <p>
                  <strong className="text-ink">Two closing notes.</strong> Ask every
                  vendor to name the conditions where their system performs worst;
                  anyone claiming none is describing a product that does not exist.
                  And apply all twelve to us — our answers are on the{" "}
                  <Link href="/biometric-attendance" className="text-accent underline underline-offset-4">
                    biometric attendance
                  </Link>{" "}
                  and{" "}
                  <Link href="/face-recognition-attendance-system" className="text-accent underline underline-offset-4">
                    face recognition attendance
                  </Link>{" "}
                  pages, and we will put them in writing on a call.
                </p>
                <p className="mt-3 text-[0.85rem] text-ink-faint">
                  {BUSINESS.legalName} · {BUSINESS.address.locality}, {BUSINESS.address.region} · {BUSINESS.phone} · www.pgak.co.in
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
