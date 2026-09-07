/**
 * Billing calls for /billing — the ONLY place PGAK AI Vision is sold.
 *
 * Why the website and not the app: Google Play's payments policy puts a cloud
 * AI subscription bought from inside the Android app under Play Billing at
 * 15%, and any in-app button, link or URL to another checkout is a policy
 * violation that ends in removal. Google explicitly allows the alternative at
 * 0%: a "consumption-only" app that shows what is on and lets a customer
 * cancel, while the purchase happens elsewhere. Hik-Connect, Ring, CP Plus and
 * EZVIZ all work this way, and so does PGAK from 2026-09-07. The app must never
 * link here.
 *
 * The cloud API is unchanged: these are the same routes the app used to call.
 * Every amount is in PAISE, as Razorpay reports it. The price is read from the
 * server on every visit and never hardcoded here — the Razorpay plan is the
 * only copy that actually charges a card, and a number in this file would
 * drift from it the first time the price changed.
 */
import { authedFetch } from "./pgakAuth";

export type Me = {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  organization_id: string;
};

export type Camera = {
  id: string;
  device_id: string;
  name: string;
  location: string | null;
  is_active: boolean;
  is_online: boolean;
  /** "face" while PGAK AI Vision is actually running on this camera. */
  mode: string;
};

export type Device = { id: string; name: string; status?: string };

/** One rung of a volume ladder. Absent until tiered pricing ships server-side. */
export type Tier = { min: number; max: number | null; unit_amount: number; plan_id?: string };

export type Pricing = {
  /** Per camera per period, in paise. With tiers present this is the 1-camera rate. */
  amount: number;
  currency: string;
  period: string;
  interval: number;
  name: string;
  /** "razorpay" = read live from the plan; "fallback" = the server could not reach it. */
  source: string;
  /** True whenever the figure is not a fresh read. */
  stale: boolean;
  tiers?: Tier[];
};

export type SubscribedCamera = { id: string; name: string; mode: string };

/**
 * One Razorpay mandate and the cameras it pays for. One of these is ONE debit
 * on the customer's statement; a checkout covering N cameras is one of these.
 */
export type Subscription = {
  razorpay_subscription_id: string;
  razorpay_plan_id: string | null;
  status: string;
  cameras: SubscribedCamera[];
  visible_camera_count: number;
  unit_amount_paise: number | null;
  currency: string;
  /** Present only when the server is willing to stand behind a renewal date. */
  renews_at: string | null;
  cancel_scheduled_at: string | null;
  created_at: string;
};

export type Checkout = {
  subscription_id: string;
  /** Razorpay's hosted checkout. Null only if Razorpay did not return one. */
  short_url: string | null;
  razorpay_key_id: string;
  /** The combined monthly amount Razorpay will actually charge, in paise. */
  amount: number;
  currency: string;
  /** The cameras the server accepted — already-paid ones are dropped silently. */
  camera_ids: string[];
};

export type CancelResult = {
  status: string;
  ends_at: string | null;
  cancelled_immediately: boolean;
};

export class ApiError extends Error {
  status: number;
  detail: string;
  constructor(status: number, detail: string) {
    super(detail || `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

async function json<T>(res: Response): Promise<T> {
  if (res.ok) return (await res.json()) as T;
  let detail = "";
  try {
    const body = (await res.json()) as { detail?: unknown };
    if (typeof body?.detail === "string") detail = body.detail;
  } catch {
    /* a gateway HTML page — no detail worth showing */
  }
  throw new ApiError(res.status, detail);
}

export const billingApi = {
  me: (): Promise<Me> => authedFetch("/users/me").then((r) => json<Me>(r)),

  cameras: async (): Promise<Camera[]> => {
    // CameraList is { items: [...] } — see api/app/schemas/camera.py.
    const data = await authedFetch("/cameras").then((r) => json<{ items?: Camera[] }>(r));
    return (data.items ?? []).filter((c) => c.is_active);
  },

  devices: async (): Promise<Device[]> => {
    const data = await authedFetch("/devices").then((r) => json<{ items?: Device[] }>(r));
    return data.items ?? [];
  },

  pricing: (): Promise<Pricing> => authedFetch("/billing/pricing").then((r) => json<Pricing>(r)),

  subscriptions: async (): Promise<Subscription[]> => {
    const data = await authedFetch("/billing/subscriptions").then((r) =>
      json<{ subscriptions: Subscription[] }>(r),
    );
    return data.subscriptions ?? [];
  },

  /** ONE Razorpay subscription covering every camera passed. */
  checkout: (cameraIds: string[]): Promise<Checkout> =>
    authedFetch("/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ camera_ids: cameraIds }),
    }).then((r) => json<Checkout>(r)),

  /** A paid mandate runs to the end of the period bought; an unpaid one dies now. */
  cancel: (razorpaySubscriptionId: string): Promise<CancelResult> =>
    authedFetch(`/billing/subscriptions/${encodeURIComponent(razorpaySubscriptionId)}/cancel`, {
      method: "POST",
    }).then((r) => json<CancelResult>(r)),
};

/**
 * The ONE place the page does price arithmetic. Picks the rung for N cameras
 * when the server sends a ladder, otherwise the flat rate. Whatever this says,
 * the server's own figure from /billing/checkout is what the customer is asked
 * to confirm before Razorpay opens — see BillingClient.
 */
export function quoteForCount(p: Pricing, n: number): { unit: number; total: number } {
  const tier = p.tiers?.find((t) => n >= t.min && (t.max === null || n <= t.max));
  const unit = tier ? tier.unit_amount : p.amount;
  return { unit, total: n > 0 ? unit * n : 0 };
}

/** Spending is a manager action; the server enforces the same rule (require_admin). */
export const canManageBilling = (me: Me | null): boolean =>
  me?.role === "owner" || me?.role === "admin";

/** Razorpay statuses under which the customer has a live, paid mandate. */
export const LIVE = new Set(["active", "authenticated", "charged"]);

const inrFmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Whole rupees from paise, Indian grouping: 120000 -> "₹1,200". */
export const inr = (paise: number): string => inrFmt.format(Math.round(paise / 100));

export const fmtDate = (iso: string | null | undefined): string =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";
