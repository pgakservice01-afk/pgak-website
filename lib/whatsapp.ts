import { BUSINESS } from "@/lib/seo";

/**
 * One place for the WhatsApp deep link. Every CTA that opens WhatsApp should
 * build its href here so the number can never drift between components — it
 * already did once (the old contact page carried a different number from the
 * mobile bar).
 *
 * `encodeURIComponent` on purpose, not URLSearchParams: wa.me treats a literal
 * `+` in the text as a plus sign, not a space, so form-encoded spaces come out
 * as "Hi+PGAK" on some clients.
 */
export function waHref(message: string): string {
  const number = BUSINESS.phoneE164.replace("+", "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
