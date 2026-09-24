import Image from "next/image";

import { PEOPLE } from "@/lib/people";
import { BUSINESS } from "@/lib/seo";

/**
 * The three faces, on the homepage, immediately before the proof section.
 *
 * Most CCTV vendors in this market are a phone number and a website, and the
 * cheapest way to look different is to be a company with named people whose
 * faces you are willing to show. The photographs are treated identically
 * (greyscale, edges to black) but not retouched or regenerated — see the note
 * on Person.photo in lib/people.ts.
 */
export default function FoundersStrip() {
  return (
    // No .wrap here, matching every other premium-section on this page: the
    // section supplies the max-width and padding, the content sits in a plain
    // div.
    //
    // A correction, because the commit that removed .wrap says otherwise. It
    // claimed the avatars were rendering 51px wide on the live site. They were
    // not. That measurement came from an automated browser whose pane was
    // hidden, so window.innerWidth was 0; with a zero-width containing block
    // every percentage width collapses and `w-full` leaves only the 48px of
    // padding. Measured against a real 1280px viewport, before and after, the
    // avatars are 118x118 and the section is 1200px wide. The change is a
    // consistency tidy, not a bug fix, and the layout was never broken for a
    // human visitor.
    <section className="premium-section" aria-labelledby="founders-heading" id="founders">
      <div>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="kicker">THE PEOPLE BEHIND IT</p>
          <h2 id="founders-heading" className="display mt-3 text-[clamp(1.6rem,3.4vw,2.3rem)]">
            A registered company, with names and faces.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[1rem] leading-relaxed text-ink-soft">
            Founded in {BUSINESS.founded} in Ludhiana. The company number is
            published, and so is everyone who runs it.
          </p>
        </div>

        <ul className="mx-auto mt-11 flex max-w-[660px] flex-wrap items-start justify-center gap-x-12 gap-y-9">
          {PEOPLE.map((p) => (
            <li key={p.slug} className="w-[148px] text-center">
              <a href={`/leadership#${p.slug}`} className="group block">
                {p.photo && (
                  <Image
                    src={p.photo}
                    alt={`${p.name}, ${p.role} of ${BUSINESS.legalName}`}
                    width={296}
                    height={296}
                    className="mx-auto h-[118px] w-[118px] rounded-full object-cover ring-1 ring-line transition-all group-hover:ring-accent"
                  />
                )}
                <span className="mt-4 block font-display text-[1rem] font-medium text-ink group-hover:text-accent">
                  {p.name}
                </span>
                <span className="mt-1 block text-[0.84rem] text-accent">{p.role}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[0.95rem]">
          <a
            href="/leadership"
            className="text-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
          >
            Who they are, and the company number to check us on →
          </a>
        </p>
      </div>
    </section>
  );
}
