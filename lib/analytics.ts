/**
 * Conversion tracking helper.
 *
 * Two sinks, one call: GTM's dataLayer (so tags can be configured without a
 * code deploy) and gtag directly (so GA4 records the event even if GTM is
 * blocked or not yet configured). Both are no-ops on the server and safe to
 * call when the scripts haven't loaded.
 *
 * Click-level tracking is handled globally in app/layout.tsx via [data-cta].
 * Use `trackConversion` for things a click can't tell you — a form that
 * actually succeeded, not just a button that was pressed.
 */

type Params = Record<string, unknown>;

export function trackConversion(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    ...params,
    page_path: window.location.pathname,
  };

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });

  if (typeof w.gtag === "function") {
    w.gtag("event", event, payload);
  }
}

/** A lead form was successfully submitted (not merely clicked). */
export function trackLead(formName: string, params: Params = {}) {
  trackConversion("generate_lead", {
    form_name: formName,
    ...params,
  });
}
