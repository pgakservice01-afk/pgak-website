/** GA4 events use one gtag/dataLayer command, including before the loader is ready.
 * ConversionEvents handles clicks; submitLead records only CRM-confirmed leads. */

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

  // One GA4 dispatch. gtag commands queue in dataLayer even before the loader.
  // Do not also push a GTM custom event: that can double-count configured tags.
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag === "function") {
    w.gtag("event", event, payload);
  } else {
    const queue = function (..._args: unknown[]) { w.dataLayer!.push(arguments); };
    queue("event", event, payload);
  }
}

/** A lead form was successfully submitted (not merely clicked). */
export function trackLead(formName: string, params: Params = {}) {
  trackConversion("generate_lead", {
    form_name: formName,
    ...params,
  });
}
