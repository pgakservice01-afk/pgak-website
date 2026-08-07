import type { Metadata } from "next";
import LiveClient from "./LiveClient";

/**
 * /live — customer sign-in for the camera wall.
 *
 * Reached from the nav slot that used to book demos. The demo booking action
 * still exists in StickyDemoCTA, MobileActionBar, ChatBot, FinalCTA and the
 * footer, so lead capture is unaffected by this route existing.
 *
 * Deliberately noindex: this is a customer utility, not a landing page, and it
 * would otherwise compete with the pages that are meant to rank.
 */
export const metadata: Metadata = {
  title: "Live view — sign in | PGAK",
  description:
    "Sign in to watch your cameras across every site on one screen.",
  robots: { index: false, follow: false },
};

export default function LivePage() {
  return <LiveClient />;
}
