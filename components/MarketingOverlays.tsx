"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The marketing site's floating furniture — chat bot, mobile Call/WhatsApp/
 * audit bar, WhatsApp button, back-to-top, sticky demo CTA — belongs on the
 * pages that sell to strangers. It does not belong on the pages a paying
 * customer uses: sign-in, the camera wall and billing. There it covers the
 * bottom of the screen on a phone (the invoice line and the checkout button
 * live down there), and a bot offering a "free camera audit" to someone
 * cancelling a subscription reads as a joke at their expense.
 *
 * One list, checked once, so adding a customer page is one line here.
 */
const APP_ROUTES = ["/live", "/wall", "/billing"];

export function isAppRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return APP_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

export default function MarketingOverlays({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isAppRoute(pathname)) return null;
  return <>{children}</>;
}
