import Image from "next/image";

import ProofVideo from "@/components/ProofVideo";

/**
 * PGAK's own material, on the page that actually gets the traffic.
 *
 * Everything else on this homepage is an argument — "your cameras can do
 * more", "a clearer picture". The films below this are a competitor's
 * reference footage, correctly labelled as theirs. A visitor who reads the
 * whole page and never sees the product working has been asked to take all
 * of it on faith.
 *
 * So this sits ABOVE the reference films deliberately. A borrowed
 * illustration after the real thing is context; a borrowed illustration
 * before it is all a scrolling visitor ever sees.
 *
 * Each item carries the same conditions as the deeper page it links to, and
 * nothing is reframed here to sound better than it is there.
 */
export default function HomeProof() {
  return (
    <section
      className="premium-section"
      id="our-own-footage"
      aria-labelledby="home-proof-heading"
    >
      <p className="kicker">OUR OWN INSTALLS</p>
      <h2 id="home-proof-heading">
        This is our equipment,
        <br />
        running on real sites.
      </h2>
      <p className="max-w-[64ch] text-ink-soft">
        Not a rendering and not a stock library. Two clips and a pair of
        photographs from PGAK installations, each with the conditions it was
        recorded under and what it does not prove.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <ProofVideo
          src="/proof/ppe-gloves.mp4"
          poster="/proof/ppe-gloves-poster.webp"
          durationSeconds={14}
          title="Bare hands flagged on an assembly line"
          caption="A vehicle-chassis line. The box is drawn on the hand, not the person, and the number beside each label is the model's confidence. Two workers are flagged here at 0.75 and 0.27 — the low one is left in, because that is the sort of detection a supervisor should be checking rather than a system acting on by itself."
          conditions="Recorded 1 April 2025 on an existing overhead line camera. Gloves are one PPE class; which classes apply to a site is confirmed before anything is quoted."
        />

        <ProofVideo
          src="/proof/dock-count.mp4"
          poster="/proof/dock-count-poster.webp"
          durationSeconds={16}
          title="Sacks counted in and out at a loading bay"
          caption="An evening unload. Each sack crossing the line is detected, given a tracking number so the same one is not counted twice, and added to the running total — the count climbs from four to seven while you watch. It counts a known item type across a line; it is not an inventory system and does not reconcile a ledger."
          conditions="Recorded 19 December 2022 on an existing dock camera with one counting line. The transport company's name and telephone numbers are blurred throughout — they belong to a third party."
        />
      </div>

      <figure className="m-0 mt-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              src: "/proof/anpr-camera-mount.webp",
              alt: "A PGAK number plate recognition camera mounted on a pillar at a site entrance",
              cap: "The camera on its pillar, at the height plate reading actually needs.",
            },
            {
              src: "/proof/anpr-gate-console.webp",
              alt: "The gate console a security guard uses, showing a captured vehicle record",
              cap: "The console a guard works, rather than a dashboard built for a slide.",
            },
          ].map((p) => (
            <div key={p.src}>
              <Image
                className="h-auto w-full rounded-[18px] border border-line"
                src={p.src}
                alt={p.alt}
                width={1400}
                height={787}
                sizes="(min-width: 640px) 45vw, 100vw"
              />
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
                {p.cap}
              </p>
            </div>
          ))}
        </div>
        <figcaption className="mt-4 text-[0.88rem] leading-relaxed text-ink-faint">
          Number plates are blurred. They are personal data, and they are not
          ours to publish.
        </figcaption>
      </figure>

      <p className="mt-10">
        <a className="text-link" href="/anpr-number-plate-recognition">
          See the number plate install in full <span aria-hidden="true">↗</span>
        </a>
      </p>
    </section>
  );
}
