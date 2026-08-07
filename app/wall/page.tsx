import type { Metadata } from "next";
import WallClient from "./WallClient";

/**
 * /wall — the camera wall itself.
 *
 * Reached from /live after sign-in (LiveClient redirects here). Everything is
 * client-side and behind a token, so there is nothing here to render on the
 * server and nothing for a crawler to see.
 *
 * noindex for the same reason /live is: a customer utility, not a landing page.
 */
export const metadata: Metadata = {
  title: "Live view | PGAK",
  description: "Your cameras across every site on one screen.",
  robots: { index: false, follow: false },
};

export default function WallPage() {
  return <WallClient />;
}
