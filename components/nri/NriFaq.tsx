"use client";

import { trackConversion } from "@/lib/analytics";

export type NriQa = { q: string; a: string };

/**
 * The NRI FAQ accordion.
 *
 * Deliberately `<details>`/`<summary>` and not a state-driven accordion, for
 * the same reason LocationPage does it: the answers are in the HTML, open or
 * closed, so a crawler reading the FAQPage JSON-LD can find the same text on
 * the page. Google treats structured data describing content it cannot see as
 * a mismatch, and an accordion that mounts its answers in JavaScript is the
 * usual way that happens.
 *
 * The list is passed in from the page, which also builds the JSON-LD from it —
 * one array, so the schema can never claim an answer the page doesn't show.
 *
 * `faq_open_nri` fires on open only, never on collapse, and once per question
 * per page view: a visitor toggling the same question shut and open again is
 * not new interest, and counting it twice would quietly inflate the only
 * engagement signal this section produces.
 */
export default function NriFaq({ faqs }: { faqs: NriQa[] }) {
  const seen = new Set<string>();

  return (
    <div className="mt-8 max-w-[76ch]">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group border-b border-line py-5 [&_summary::-webkit-details-marker]:hidden"
          onToggle={(e) => {
            if (!(e.currentTarget as HTMLDetailsElement).open) return;
            if (seen.has(f.q)) return;
            seen.add(f.q);
            trackConversion("faq_open_nri", { question: f.q });
          }}
        >
          <summary className="flex cursor-pointer items-start justify-between gap-6">
            <h3 className="text-[1.02rem] font-medium">{f.q}</h3>
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-accent transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[68ch] leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
