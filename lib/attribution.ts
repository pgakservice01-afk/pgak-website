/**
 * Visit attribution — which page, button and campaign produced a lead.
 *
 * ── Why this exists ──
 * On 2026-09-02 the CRM held 33 website leads and not one of them said which
 * page, button or ad had produced it; every lead looked identical. With paid
 * search and Meta lead ads starting, an unattributable lead is money spent
 * that can never be judged — so the forms now send this alongside the lead.
 *
 * ── What is stored ──
 * The landing path, the referrer's HOSTNAME (never the full URL), the campaign
 * tags Google Ads and Meta append (`utm_*`, `gclid`, `fbclid`) and nothing
 * else. None of it identifies the visitor. `gclid` is kept whole because it is
 * the key Google Ads needs to import an offline conversion later.
 *
 * ── Rules ──
 *   - First touch wins for organic and direct visits.
 *   - A later URL carrying campaign tags or a click id OVERWRITES the record,
 *     so a visitor who came back through an ad is credited to the ad.
 *   - `sessionStorage` can be unavailable (private mode, blocked site data) or
 *     throw on access. Every read and write is guarded, and a visit with no
 *     storage still submits a perfectly good lead — attribution is a bonus,
 *     never a precondition.
 */
import type { Attribution } from "./leads";

const KEY = "pgak-touch";

const TAG_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

type Touch = Partial<Record<(typeof TAG_KEYS)[number], string>> & {
  landing?: string;
  referrer?: string;
};

/** In-memory copy, used when storage is unavailable or throws. */
let memory: Touch | null = null;

function cap(value: string | null | undefined, max = 160): string {
  return (value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function read(): Touch | null {
  if (memory) return memory;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
}

function write(touch: Touch): void {
  memory = touch;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(touch));
  } catch {
    // The in-memory copy above is the fallback; nothing else to do.
  }
}

/** The referrer's hostname, or "" when it is this site or unreadable. */
function referrerHost(): string {
  try {
    if (!document.referrer) return "";
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? "" : cap(host, 80);
  } catch {
    return "";
  }
}

/**
 * Record the visit's touch. Call on every page view; it is idempotent for an
 * untagged visit and only rewrites when a campaign tag or click id is present.
 */
export function captureTouch(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const tags: Touch = {};
  for (const key of TAG_KEYS) {
    const value = cap(params.get(key));
    if (value) tags[key] = value;
  }
  const tagged = Object.keys(tags).length > 0;

  const existing = read();
  if (existing && !tagged) return; // first touch stands

  write({
    ...tags,
    landing: cap(window.location.pathname),
    referrer: referrerHost(),
  });
}

/**
 * What a lead form sends: the current page and button, plus whatever the
 * visit's first touch recorded. Safe to call when nothing was recorded.
 */
export function readAttribution(cta: string): Attribution {
  if (typeof window === "undefined") return { cta: cap(cta, 60) };

  const touch = read() ?? {};
  const out: Attribution = {
    page: cap(window.location.pathname),
    cta: cap(cta, 60),
  };
  if (touch.landing && touch.landing !== out.page) out.landing = touch.landing;
  if (touch.referrer) out.referrer = touch.referrer;
  for (const key of TAG_KEYS) {
    if (touch[key]) out[key] = touch[key];
  }
  return out;
}
