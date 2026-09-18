// Meta (Facebook / Instagram) Pixel helper — single source of truth for the
// pixel id + typed event tracking.
//
// Pixel/dataset "HNI" (id 2995891480746659) on the PGAK Meta ad account.
// Used for website traffic tracking, retargeting, and conversion-optimised ads.
export const FB_PIXEL_ID = "2995891480746659";

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
