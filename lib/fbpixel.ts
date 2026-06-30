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

/** Fire a standard Pixel event if fbq has loaded. No-ops on the server. */
export function fbTrack(event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    (window as any).fbq("track", event, params);
  }
}
