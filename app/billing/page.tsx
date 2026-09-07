import type { Metadata } from "next";
import BillingClient from "./BillingClient";

/**
 * /billing — where a customer buys PGAK AI Vision for their cameras, sees what
 * they pay for, and cancels.
 *
 * This is the shop. The Android app deliberately has none (Google Play's
 * payments policy — see lib/pgakBilling.ts), so the app shows status only and
 * every purchase comes through here. Reached from /live after sign-in, with
 * `?next=/billing` carrying the person back.
 *
 * noindex for the same reason /live and /wall are: a customer utility, not a
 * landing page, and it must not compete with /pricing for the query.
 */
export const metadata: Metadata = {
  title: "Billing — PGAK AI Vision | PGAK",
  description: "Add PGAK AI Vision to your cameras, see what you pay for, and cancel any time.",
  robots: { index: false, follow: false },
};

export default function BillingPage() {
  return <BillingClient />;
}
