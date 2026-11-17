// Meta (Facebook / Instagram) Pixel helper — single source of truth for the
// pixel id + typed event tracking.
//
// Pixel/dataset id 1819341866020702 on the PGAK Meta ad account.
// Used for website traffic tracking, retargeting, and conversion-optimised ads.
//
// Replaced the "HNI" pixel (2995891480746659) on 2026-11-16. Custom audiences
// and conversion history built on that pixel stay with it — they do not carry
// over to this one, so retargeting audiences have to be rebuilt here.
export const FB_PIXEL_ID = "1819341866020702";

type PixelEvent =
  | "PageView"
  | "Lead"
  | "Contact"
  | "ViewContent"
  | "CompleteRegistration";

/** Queue early conversions until the deferred Meta library is available. */
export function fbTrack(event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (typeof w.fbq !== "function") {
    const queue: any = function (...args: unknown[]) {
      if (queue.callMethod) queue.callMethod.apply(queue, args);
      else queue.queue.push(args);
    };
    queue.queue = [];
    queue.push = queue;
    queue.loaded = true;
    queue.version = "2.0";
    w.fbq = queue;
    w._fbq = w._fbq || queue;
  }
  w.fbq("track", event, params);
}
