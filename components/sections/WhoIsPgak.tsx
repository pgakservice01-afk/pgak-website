import Link from "next/link";
import { BUSINESS, LEADERSHIP } from "@/lib/seo";

/**
 * "Who you are dealing with" — the trust strip that sits directly above the
 * lead form on commercial pages.
 *
 * Security is bought on trust, and on 2026-09-02 the site had a Gmail
 * address, no phone number in the desktop header and no company facts near
 * the form. This block carries only facts that can be checked against the
 * MCA record: legal name, incorporation year, registered office, CIN and the
 * named directors. Nothing here is a claim about customers or outcomes.
 */
export default function WhoIsPgak() {
  const a = BUSINESS.address;
  return (
    <section className="sec pb-0">
      <div className="wrap">
        <div className="grid gap-8 rounded-[22px] border border-line bg-panel p-7 sm:p-9 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow mb-4">Who you are dealing with</span>
            <h2 className="display mt-4 text-[clamp(1.5rem,3vw,2rem)]">
              A registered Ludhiana company that builds the software it sells.
            </h2>
            <p className="mt-3.5 max-w-[60ch] text-ink-soft">
              {BUSINESS.legalName} is incorporated in Punjab, engineers its own
              AI layer, and runs the free camera audit itself — the people who
              answer the phone are the people who built the product.{" "}
              <Link href="/about" className="text-accent underline underline-offset-4">
                About the company →
              </Link>
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-4 text-[0.92rem] sm:grid-cols-2">
            <div>
              <dt className="text-ink-faint">Founded</dt>
              <dd className="mt-1 text-ink">{BUSINESS.founded}, Ludhiana</dd>
            </div>
            <div>
              <dt className="text-ink-faint">Registered office</dt>
              <dd className="mt-1 text-ink">
                {a.street}, {a.locality} {a.postalCode}
              </dd>
            </div>
            {BUSINESS.cin && (
              <div>
                <dt className="text-ink-faint">CIN</dt>
                <dd className="mt-1 font-mono text-[0.85rem] text-ink">{BUSINESS.cin}</dd>
              </div>
            )}
            <div>
              <dt className="text-ink-faint">Leadership</dt>
              <dd className="mt-1 text-ink">
                {LEADERSHIP.map((p, i) => (
                  <span key={p.name}>
                    {i > 0 && " · "}
                    {p.name}
                  </span>
                ))}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-ink-faint">Talk to us</dt>
              <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-ink">
                <a href={`tel:${BUSINESS.phoneE164}`} data-cta="who-call" className="hover:text-accent">
                  {BUSINESS.phone}
                </a>
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener"
                  data-cta="who-whatsapp"
                  className="hover:text-accent"
                >
                  WhatsApp
                </a>
                <span className="text-ink-faint">
                  Open {BUSINESS.openingHours.replace("Mo-Sa", "Mon–Sat")}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
