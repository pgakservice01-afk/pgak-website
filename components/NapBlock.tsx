import { BUSINESS } from "@/lib/seo";

/**
 * NAP (name / address / phone) block.
 *
 * Local SEO depends on this text being byte-identical everywhere it appears —
 * the site, the Google Business Profile, and every directory listing. It is
 * rendered from lib/seo.ts for exactly that reason: change it in one place and
 * every surface follows.
 *
 * Marked up with hCard-style microdata so crawlers can associate the address
 * with the Organization node emitted in JSON-LD.
 */
export default function NapBlock({ compact = false }: { compact?: boolean }) {
  const a = BUSINESS.address;

  return (
    <address
      className={`not-italic ${compact ? "text-[0.9rem]" : "text-[0.95rem]"} text-ink-soft`}
    >
      <p className="font-semibold text-ink">{BUSINESS.legalName}</p>
      <p className="mt-1.5 leading-relaxed">
        {a.street}
        <br />
        {a.area}
        <br />
        {a.locality}, {a.region} {a.postalCode}
        <br />
        India
      </p>
      <p className="mt-3 flex flex-col gap-1">
        <a
          href={`tel:${BUSINESS.phoneE164}`}
          data-cta="phone"
          className="transition-colors hover:text-accent"
        >
          {BUSINESS.phone}
        </a>
        <a
          href={`mailto:${BUSINESS.email}`}
          data-cta="email"
          className="transition-colors hover:text-accent [overflow-wrap:anywhere]"
        >
          {BUSINESS.email}
        </a>
      </p>
      {!compact && (
        <p className="mt-3 text-[0.86rem] text-ink-faint">
          Open {BUSINESS.openingHours.replace("Mo-Sa", "Mon–Sat")}
        </p>
      )}
    </address>
  );
}
