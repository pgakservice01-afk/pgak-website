"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { useLang } from "@/components/LangProvider";
import {
  clearSession,
  ensureRefreshToken,
  getAccessToken,
  SessionExpired,
} from "@/lib/pgakAuth";
import {
  ApiError,
  billingApi,
  canManageBilling,
  fmtDate,
  inr,
  LIVE,
  quoteForCount,
  type Camera,
  type Checkout,
  type Device,
  type Me,
  type Pricing,
  type Subscription,
} from "@/lib/pgakBilling";

/**
 * The billing page: what you pay for, what you can add, and the way out.
 * Built phone-first — most customers will open this from a WhatsApp link.
 *
 * Three things this page is built around, all learned the hard way in the app
 * before the shop moved here (payment-flow audit, 2026-09-04):
 *
 *  1. THE SERVER'S TOTAL IS THE ONLY TOTAL. The page shows unit × count so the
 *     customer can see what a tick costs, but before Razorpay opens the figure
 *     from /billing/checkout is compared with what was on screen. The server
 *     silently drops cameras that are already paid for, so the two can differ;
 *     a number that changes between our page and Razorpay's is the fastest way
 *     to lose a customer's trust, so it is shown and confirmed first.
 *
 *  2. PAYMENT IS CONFIRMED BY WHAT ACTUALLY HAPPENED. Razorpay's webhook flips
 *     each camera to mode "face" a few seconds after the mandate is approved.
 *     This page polls the cameras until every accepted one has flipped, and
 *     only then says "paid". There is no button anywhere that could re-run a
 *     checkout while a payment is in flight — the cart in the app once had one,
 *     and tapping it cancelled the mandate the customer had just paid for.
 *
 *  3. CANCEL IS PLAIN TEXT, NEVER HIDDEN. A paid mandate runs to the end of the
 *     period bought; an unpaid checkout dies at once. The server decides which.
 *
 * The hand-off to Razorpay differs by device. On a phone this tab navigates to
 * Razorpay and the customer comes back with the Back button: a second tab is
 * easy to lose on a phone, popup blockers there refuse window.open after an
 * awaited fetch, and WhatsApp's in-app browser cannot open tabs at all. On a
 * desktop Razorpay opens beside this page, which keeps polling. Either way the
 * open order is persisted, so a fresh copy of this page resumes the wait.
 */

const SIGN_IN = "/live?next=/billing";
const POLL_MS = 3000;
const SLOW_AFTER_MS = 90_000;
const ORDER_KEY = "pgak_billing_order";
const ORDER_TTL_MS = 60 * 60 * 1000;

type Data = {
  me: Me;
  cameras: Camera[];
  devices: Device[];
  pricing: Pricing;
  subs: Subscription[];
};

/**
 * A checkout the customer has been handed to Razorpay for. `handoff` records
 * HOW: "tab" = Razorpay opened beside this page (desktop), "same" = this tab
 * navigated to Razorpay and the customer comes back with the Back button
 * (phone). The waiting panel's copy depends on it.
 */
type Order = {
  checkout: Checkout;
  names: string[];
  startedAt: number;
  handoff?: "tab" | "same";
};

/**
 * The open order survives a reload, the Back button and an accidental
 * navigation. localStorage rather than sessionStorage on purpose: on a phone
 * the tab that opened Razorpay is often not the tab that comes back (an
 * in-app browser handing over to Chrome, a tab evicted while the UPI app was
 * in front), and the order holds nothing secret — a subscription id, an
 * amount, camera names. An order older than an hour is stale by any definition
 * and is dropped. Without this a customer who wanders back to a fresh copy of
 * the page would find their cameras unticked and a button offering a second
 * checkout, which is exactly what the app once did.
 */
function orderStore(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    try {
      return window.sessionStorage;
    } catch {
      return null;
    }
  }
}

function saveOrder(o: Order | null) {
  try {
    const s = orderStore();
    if (!s) return;
    if (o) s.setItem(ORDER_KEY, JSON.stringify(o));
    else s.removeItem(ORDER_KEY);
  } catch {
    /* storage disabled — the page still works, it just cannot resume */
  }
}

function loadOrder(): Order | null {
  try {
    const s = orderStore();
    const raw = s?.getItem(ORDER_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as Order;
    if (!Array.isArray(o?.checkout?.camera_ids) || Date.now() - o.startedAt > ORDER_TTL_MS) {
      s?.removeItem(ORDER_KEY);
      return null;
    }
    return o;
  } catch {
    return null;
  }
}

type LoadState = "loading" | "ready" | "error";

export default function BillingClient() {
  const { t, lang } = useLang();
  const [state, setState] = useState<LoadState>("loading");
  const [data, setData] = useState<Data | null>(null);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [busy, setBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  // The server quoted a different total or camera list than was on screen.
  const [quoteToConfirm, setQuoteToConfirm] = useState<Order | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [paid, setPaid] = useState<Order | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);
  // Bumped to poll right now ("I have paid — keep checking"), and to re-render
  // the "taking longer" line on the polling cadence.
  const [pollNonce, setPollNonce] = useState(0);
  const [tick, setTick] = useState(0);
  const [cancelFor, setCancelFor] = useState<string | null>(null);
  const [cancelBusy, setCancelBusy] = useState(false);
  const [cancelNote, setCancelNote] = useState<string | null>(null);
  // Whichever notice card is showing (order / paid / total changed). On a
  // phone the tap that raises it is at the bottom of a long page and the card
  // renders at the top — scroll to it, or nothing visibly happens.
  const noticeRef = useRef<HTMLElement>(null);

  const toSignIn = useCallback(() => {
    clearSession();
    window.location.replace(SIGN_IN);
  }, []);

  const load = useCallback(async () => {
    try {
      await ensureRefreshToken();
      const [me, cameras, devices, pricing, subs] = await Promise.all([
        billingApi.me(),
        billingApi.cameras(),
        billingApi.devices(),
        billingApi.pricing(),
        billingApi.subscriptions(),
      ]);
      setData({ me, cameras, devices, pricing, subs });
      setState("ready");
    } catch (e) {
      if (e instanceof SessionExpired) {
        toSignIn();
        return;
      }
      setState("error");
    }
  }, [toSignIn]);

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.replace(SIGN_IN);
      return;
    }
    const resumed = loadOrder();
    if (resumed) setOrder(resumed);
    void load();
  }, [load]);

  // While an order is open, watch the cameras. "Paid" means every accepted
  // camera has actually switched on — not that a tab was opened. Polls at
  // once, then every few seconds, and again the moment the page becomes
  // visible: a phone browser throttles background timers to once a minute
  // and suspends them entirely while the UPI app is in front, so the return
  // is what triggers the check, not the clock.
  useEffect(() => {
    if (!order) return;
    let stopped = false;
    let timer = 0;
    const poll = async () => {
      window.clearTimeout(timer);
      try {
        const cameras = await billingApi.cameras();
        if (stopped) return;
        const want = new Set(order.checkout.camera_ids);
        const on = cameras.filter((c) => want.has(c.id) && c.mode === "face").length;
        if (want.size > 0 && on === want.size) {
          saveOrder(null);
          setData((d) => (d ? { ...d, cameras } : d));
          setPaid(order);
          setOrder(null);
          billingApi
            .subscriptions()
            .then((subs) => setData((d) => (d ? { ...d, subs } : d)))
            .catch(() => {
              /* the plan card refreshes on the next load; the success is real either way */
            });
          return;
        }
      } catch (e) {
        if (e instanceof SessionExpired) {
          toSignIn();
          return;
        }
        // A transient failure while the customer is on Razorpay's side is not
        // news. Keep polling.
      }
      if (!stopped) {
        setTick((n) => n + 1);
        timer = window.setTimeout(poll, POLL_MS);
      }
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") void poll();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onVisible);
    void poll();
    return () => {
      stopped = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onVisible);
    };
  }, [order, pollNonce, toSignIn]);

  // `state` is a dependency on purpose: a resumed order is set before the
  // data arrives, and the card it belongs to only mounts once the page is
  // "ready" — without it the restored notice would never receive focus.
  useEffect(() => {
    if (state !== "ready" || (!quoteToConfirm && !order && !paid)) return;
    const el = noticeRef.current;
    if (!el) return;
    el.scrollIntoView({ block: "start", behavior: "smooth" });
    el.focus({ preventScroll: true });
  }, [quoteToConfirm, order, paid, state]);

  const mayManage = canManageBilling(data?.me ?? null);

  // Cameras a live mandate already covers, whether or not the webhook has
  // flipped them yet. The server drops these from a checkout anyway; hiding the
  // tick box is the honest version of that.
  const paidIds = useMemo(() => {
    const s = new Set<string>();
    for (const sub of data?.subs ?? []) {
      if (LIVE.has(sub.status)) for (const c of sub.cameras) s.add(c.id);
    }
    return s;
  }, [data]);

  const buyable = useMemo(
    () => (data?.cameras ?? []).filter((c) => c.mode !== "face" && !paidIds.has(c.id)),
    [data, paidIds],
  );

  const groups = useMemo(() => {
    if (!data) return [];
    const byDevice = new Map<string, Camera[]>();
    for (const c of data.cameras) {
      const list = byDevice.get(c.device_id) ?? [];
      list.push(c);
      byDevice.set(c.device_id, list);
    }
    const name = (id: string) => data.devices.find((d) => d.id === id)?.name ?? t("Other", "अन्य");
    return [...byDevice.entries()]
      .map(([id, cams]) => ({ id, name: name(id), cams }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data, t]);

  const priceOk = data?.pricing.source === "razorpay";
  const quote = data ? quoteForCount(data.pricing, selected.size) : { unit: 0, total: 0 };

  const nameOf = useCallback(
    (id: string) => data?.cameras.find((c) => c.id === id)?.name ?? t("Camera", "कैमरा"),
    [data, t],
  );

  const toggle = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const describeCheckoutError = (e: unknown): string => {
    if (e instanceof ApiError) {
      if (e.status === 400)
        return t(
          "These cameras already have PGAK AI Vision. Nothing has been charged — your list has been updated.",
          "इन कैमरों पर PGAK AI Vision पहले से है। कोई शुल्क नहीं लगा — सूची अपडेट कर दी गई है।",
        );
      if (e.status === 403)
        return t(
          "Only the account owner or an admin can buy this. Nothing has been charged.",
          "इसे सिर्फ़ अकाउंट ओनर या एडमिन ही खरीद सकते हैं। कोई शुल्क नहीं लगा।",
        );
      if (e.status === 409 && e.detail) return e.detail;
      return t(
        "We could not reach the payment provider. Nothing has been charged — please try again in a moment.",
        "पेमेंट प्रोवाइडर तक नहीं पहुँच सके। कोई शुल्क नहीं लगा — कृपया थोड़ी देर में फिर कोशिश करें।",
      );
    }
    return t(
      "No connection. Nothing has been charged — check your internet and try again.",
      "कनेक्शन नहीं है। कोई शुल्क नहीं लगा — इंटरनेट जाँचकर फिर कोशिश करें।",
    );
  };

  /** Hand the customer to Razorpay and start watching for the result. */
  const openRazorpay = (o: Order) => {
    setQuoteToConfirm(null);
    setSelected(new Set());
    const phone = window.matchMedia("(pointer: coarse)").matches;
    const live: Order = { ...o, startedAt: Date.now(), handoff: phone ? "same" : "tab" };
    setOrder(live);
    saveOrder(live);
    setPopupBlocked(false);
    const url = o.checkout.short_url;
    if (!url) {
      setPopupBlocked(true);
      return;
    }
    if (phone) {
      window.location.assign(url);
      return;
    }
    // Without "noopener" the call returns the new window (or null when a
    // blocker ate it) — that is the only way to know whether to show the
    // fallback link. The opener is then severed by hand.
    const w = window.open(url, "_blank");
    if (w) {
      try {
        w.opener = null;
      } catch {
        /* cross-origin already — nothing to sever */
      }
    } else {
      setPopupBlocked(true);
    }
  };

  const startCheckout = async () => {
    if (!data || selected.size === 0 || busy) return;
    const ids = [...selected];
    const shownTotal = quote.total;
    setBusy(true);
    setCheckoutError(null);
    try {
      const checkout = await billingApi.checkout(ids);
      const names = checkout.camera_ids.map(nameOf);
      const o: Order = { checkout, names, startedAt: Date.now() };
      const sameCameras =
        checkout.camera_ids.length === ids.length && checkout.camera_ids.every((id) => ids.includes(id));
      if (checkout.amount !== shownTotal || !sameCameras) {
        setQuoteToConfirm(o);
        return;
      }
      openRazorpay(o);
    } catch (e) {
      if (e instanceof SessionExpired) {
        toSignIn();
        return;
      }
      setCheckoutError(describeCheckoutError(e));
      // "Already covered" means the list on screen is behind the server:
      // refresh it so the ticked cameras show their real state.
      if (e instanceof ApiError && e.status === 400) {
        setSelected(new Set());
        void load();
      }
    } finally {
      setBusy(false);
    }
  };

  /** "I didn't pay — start over": forget the order, reload the real state. */
  const abandonOrder = () => {
    saveOrder(null);
    setOrder(null);
    setState("loading");
    void load();
  };

  const doCancel = async (sub: Subscription) => {
    setCancelBusy(true);
    setCancelNote(null);
    try {
      const r = await billingApi.cancel(sub.razorpay_subscription_id);
      setCancelNote(
        r.cancelled_immediately || !r.ends_at
          ? t(
              "PGAK AI Vision has been switched off. You will not be charged again.",
              "PGAK AI Vision बंद कर दिया गया है। अब कोई शुल्क नहीं लगेगा।",
            )
          : t(
              `You keep PGAK AI Vision until ${fmtDate(r.ends_at, lang)}, the end of the period you have already paid for. You will not be charged again.`,
              `${fmtDate(r.ends_at, lang)} तक PGAK AI Vision चलता रहेगा — इस अवधि का भुगतान आप पहले ही कर चुके हैं। अब कोई शुल्क नहीं लगेगा।`,
            ),
      );
      const [subs, cameras] = await Promise.all([billingApi.subscriptions(), billingApi.cameras()]);
      setData((d) => (d ? { ...d, subs, cameras } : d));
    } catch (e) {
      if (e instanceof SessionExpired) {
        toSignIn();
        return;
      }
      setCancelNote(
        e instanceof ApiError && e.status === 403
          ? t(
              "Only the account owner or an admin can cancel this.",
              "इसे सिर्फ़ अकाउंट ओनर या एडमिन ही रद्द कर सकते हैं।",
            )
          : t(
              "We could not cancel it just now. Nothing has changed — please try again in a moment.",
              "अभी रद्द नहीं हो सका। कुछ नहीं बदला — कृपया थोड़ी देर में फिर कोशिश करें।",
            ),
      );
    } finally {
      setCancelBusy(false);
      setCancelFor(null);
    }
  };

  const signOut = () => {
    clearSession();
    window.location.href = "/live";
  };

  if (state === "loading" && !data) {
    return (
      <main className="grid min-h-screen place-items-center bg-bg text-ink-soft">
        {t("Loading your account…", "आपका अकाउंट लोड हो रहा है…")}
      </main>
    );
  }

  if (state === "error" || !data) {
    return (
      <main className="grid min-h-screen place-items-center bg-bg px-6 text-center">
        <div>
          <p className="text-ink">
            {t(
              "Couldn't load your account. Check your connection and try again.",
              "आपका अकाउंट लोड नहीं हो सका। कनेक्शन जाँचकर फिर कोशिश करें।",
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              setState("loading");
              void load();
            }}
            className="btn btn-ghost mt-5"
          >
            {t("Try again", "फिर कोशिश करें")}
          </button>
        </div>
      </main>
    );
  }

  const slow = order ? Date.now() - order.startedAt > SLOW_AFTER_MS : false;
  void tick; // re-render cadence for `slow` while polling

  // Header text controls: ≥44px hit areas without changing the look.
  // px-1, not px-2: logo + "Billing" + two links must fit one 360px row.
  const headerLink =
    "inline-flex min-h-11 items-center px-1 text-[0.9rem] text-ink-soft underline-offset-2 hover:text-ink hover:underline";

  return (
    <main className="min-h-screen bg-bg">
      <header className="sticky top-0 z-30 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-line bg-bg/95 px-3 py-1.5 backdrop-blur sm:px-4">
        <a href="/" aria-label="PGAK — home" className="inline-flex min-h-11 items-center px-1">
          <Logo variant="compact" className="text-[1.05rem]" />
        </a>
        <span className="font-display text-[0.95rem] tracking-tight text-ink-soft">
          {t("Billing", "बिलिंग")}
        </span>
        <span className="hidden text-[0.8rem] text-ink-faint md:inline">{data.me.email}</span>
        <a href="/wall" className={`ml-auto ${headerLink}`}>
          {t("Live view", "लाइव व्यू")}
        </a>
        <button type="button" onClick={signOut} className={`${headerLink} -mr-1`}>
          {t("Sign out", "साइन आउट")}
        </button>
      </header>

      <div className="mx-auto max-w-[820px] px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-6 sm:pt-8">
        {/* ── An order in flight, or just completed ─────────────────────── */}
        {paid && (
          <section
            ref={noticeRef}
            tabIndex={-1}
            role="status"
            className="card mb-8 scroll-mt-20 border-accent/40 p-5 outline-none sm:p-6"
          >
            <h2 className="font-display text-[1.4rem] tracking-tight text-ink">
              {t("Payment received", "भुगतान मिल गया")}
            </h2>
            <p className="mt-2 text-ink-soft">
              {t(
                `PGAK AI Vision is now on for ${paid.names.join(", ")}. ${inr(paid.checkout.amount)} a month in total, taken automatically every month until you cancel.`,
                `${paid.names.join(", ")} पर PGAK AI Vision अब चालू है। कुल ${inr(paid.checkout.amount)} प्रति माह, जब तक आप रद्द न करें हर महीने अपने-आप कटेगा।`,
              )}
            </p>
            <p className="mt-2 text-[0.9rem] text-ink-soft">
              {t(
                `Razorpay has emailed a payment confirmation to ${data.me.email}. That is not a GST invoice — for one, email billing@pgak.co.in.`,
                `Razorpay ने ${data.me.email} पर भुगतान की पुष्टि ईमेल की है। यह GST इनवॉइस नहीं है — इनवॉइस के लिए billing@pgak.co.in पर ईमेल करें।`,
              )}
            </p>
            <button type="button" onClick={() => setPaid(null)} className="btn btn-ghost mt-5">
              {t("Done", "ठीक है")}
            </button>
          </section>
        )}

        {order && (
          <section
            ref={noticeRef}
            tabIndex={-1}
            className="card mb-8 scroll-mt-20 border-accent/40 p-5 outline-none sm:p-6"
          >
            <h2 className="font-display text-[1.4rem] tracking-tight text-ink">
              {order.handoff === "same"
                ? t("Finish paying with Razorpay", "Razorpay से भुगतान पूरा करें")
                : popupBlocked
                  ? t("Open Razorpay to pay", "भुगतान के लिए Razorpay खोलें")
                  : t("Finish paying in the Razorpay tab", "Razorpay वाले टैब में भुगतान पूरा करें")}
            </h2>
            <p className="mt-2 text-ink-soft">
              {order.handoff === "same"
                ? t(
                    "You were taken to Razorpay to approve the AutoPay request in your UPI app. If you finished there, this page updates in a moment. If not, open it again below.",
                    "आपको अपने UPI ऐप में AutoPay मंज़ूर करने के लिए Razorpay पर भेजा गया था। अगर वहाँ पूरा हो गया है तो यह पेज कुछ ही पलों में अपडेट होगा। नहीं तो नीचे से फिर खोलें।",
                  )
                : popupBlocked
                  ? t(
                      "Razorpay could not open by itself. Tap the button below, approve the AutoPay request there, then come back here — this page updates itself.",
                      "Razorpay अपने-आप नहीं खुल सका। नीचे का बटन दबाएँ, वहाँ AutoPay मंज़ूर करें, फिर यहाँ लौटें — यह पेज अपने-आप अपडेट होगा।",
                    )
                  : t(
                      "Razorpay opened in a new tab. Approve the AutoPay request there, then come back here — this page updates itself.",
                      "Razorpay एक नए टैब में खुला है। वहाँ AutoPay मंज़ूर करें, फिर यहाँ लौटें — यह पेज अपने-आप अपडेट होगा।",
                    )}
            </p>
            <p className="mt-3 text-[0.95rem] text-ink">
              <b>{order.names.join(", ")}</b> · {inr(order.checkout.amount)}
              {t(" / month", " / माह")}
            </p>
            {(popupBlocked || order.handoff === "same") && order.checkout.short_url && (
              <p className="mt-4">
                <a
                  href={order.checkout.short_url}
                  target={order.handoff === "same" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  {t("Open Razorpay", "Razorpay खोलें")}
                </a>
              </p>
            )}
            {!order.checkout.short_url && (
              <div className="mt-4">
                <p className="text-danger">
                  {t(
                    "Razorpay did not return a payment page. Nothing has been charged.",
                    "Razorpay ने भुगतान पेज नहीं दिया। कोई शुल्क नहीं लगा।",
                  )}
                </p>
                <button type="button" onClick={abandonOrder} className="btn btn-ghost mt-3">
                  {t("Try again", "फिर कोशिश करें")}
                </button>
              </div>
            )}
            <p aria-live="polite" className="mt-4 flex items-start gap-2 text-[0.9rem] text-ink-soft">
              <span
                aria-hidden="true"
                className="mt-[7px] inline-block h-2 w-2 shrink-0 animate-pulseDot rounded-full bg-accent"
              />
              <span>
                {slow
                  ? t(
                      "Taking longer than usual. If you have paid, face recognition switches on within a few minutes — you will not be charged twice.",
                      "सामान्य से ज़्यादा समय लग रहा है। अगर आपने भुगतान कर दिया है तो कुछ मिनटों में चेहरे की पहचान चालू हो जाएगी — दोबारा शुल्क नहीं लगेगा।",
                    )
                  : t("Waiting for Razorpay…", "Razorpay का इंतज़ार है…")}
              </span>
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4">
              <button
                type="button"
                onClick={() => setPollNonce((n) => n + 1)}
                className="inline-flex min-h-11 items-center text-[0.9rem] text-ink underline-offset-2 hover:underline"
              >
                {t("I have paid — check again", "मैंने भुगतान कर दिया — फिर जाँचें")}
              </button>
              <button
                type="button"
                onClick={abandonOrder}
                className="inline-flex min-h-11 items-center text-[0.9rem] text-ink-soft underline-offset-2 hover:text-ink hover:underline"
              >
                {t("I didn't pay — start over", "मैंने भुगतान नहीं किया — फिर से शुरू करें")}
              </button>
            </div>
          </section>
        )}

        {quoteToConfirm && (
          <section
            ref={noticeRef}
            tabIndex={-1}
            className="card mb-8 scroll-mt-20 border-accent/40 p-5 outline-none sm:p-6"
          >
            <h2 className="font-display text-[1.4rem] tracking-tight text-ink">
              {t("The total changed", "कुल राशि बदल गई")}
            </h2>
            <p className="mt-2 text-ink-soft">
              {t(
                `Some cameras already have PGAK AI Vision, so Razorpay will charge ${inr(quoteToConfirm.checkout.amount)} a month for ${quoteToConfirm.names.join(", ")}.`,
                `कुछ कैमरों पर PGAK AI Vision पहले से है, इसलिए Razorpay ${quoteToConfirm.names.join(", ")} के लिए ${inr(quoteToConfirm.checkout.amount)} प्रति माह लेगा।`,
              )}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openRazorpay(quoteToConfirm)}
                className="btn btn-primary w-full sm:w-auto"
              >
                {t("Continue to Razorpay", "Razorpay पर जाएँ")}
              </button>
              <button
                type="button"
                onClick={() => setQuoteToConfirm(null)}
                className="btn btn-ghost w-full sm:w-auto"
              >
                {t("Go back", "वापस")}
              </button>
            </div>
          </section>
        )}

        {/* ── Your plan ─────────────────────────────────────────────────── */}
        <h1 className="font-display text-[1.7rem] tracking-tight text-ink">
          {t("Your plan", "आपका प्लान")}
        </h1>

        {cancelNote && (
          <p
            role="status"
            className="mt-4 rounded-lg border border-line bg-panel px-4 py-3 text-[0.9rem] text-ink"
          >
            {cancelNote}
          </p>
        )}

        {data.subs.length === 0 ? (
          <section className="card mt-4 p-5 sm:p-6">
            <p className="text-ink">
              {t(
                "You're on the free plan — nothing is being charged.",
                "आप मुफ़्त प्लान पर हैं — कोई शुल्क नहीं लग रहा।",
              )}
            </p>
            <p className="mt-1.5 text-[0.95rem] text-ink-soft">
              {t(
                "Live view, boundary alerts and tamper detection are included on every camera. PGAK AI Vision adds face recognition — alerts tell you who it was, by name. Add it below.",
                "लाइव व्यू, बाउंड्री अलर्ट और टैम्पर डिटेक्शन हर कैमरे पर शामिल हैं। PGAK AI Vision चेहरे की पहचान जोड़ता है — अलर्ट में नाम आता है कि कौन दिखा। नीचे से जोड़ें।",
              )}
            </p>
          </section>
        ) : (
          data.subs.map((sub) => (
            <PlanCard
              key={sub.razorpay_subscription_id}
              sub={sub}
              mayManage={mayManage}
              confirming={cancelFor === sub.razorpay_subscription_id}
              busy={cancelBusy && cancelFor === sub.razorpay_subscription_id}
              onAskCancel={() => {
                setCancelNote(null);
                setCancelFor(sub.razorpay_subscription_id);
              }}
              onKeep={() => setCancelFor(null)}
              onCancel={() => void doCancel(sub)}
            />
          ))
        )}

        {/* ── Add cameras ───────────────────────────────────────────────── */}
        {buyable.length > 0 && !order && (
          <section className="mt-12">
            <h2 className="font-display text-[1.4rem] tracking-tight text-ink">
              {t("Add PGAK AI Vision", "PGAK AI Vision जोड़ें")}
            </h2>
            <p className="mt-1.5 text-[0.95rem] text-ink-soft">
              {t(
                "Face recognition on the cameras you choose — alerts tell you who it was, by name. Live view, boundary alerts and tamper detection stay free.",
                "आपके चुने कैमरों पर चेहरे की पहचान — अलर्ट में नाम आता है कि कौन दिखा। लाइव व्यू, बाउंड्री अलर्ट और टैम्पर डिटेक्शन मुफ़्त रहते हैं।",
              )}
            </p>

            {priceOk ? (
              <>
                <p className="mt-4 text-[0.95rem] text-ink">
                  <b>{inr(data.pricing.amount)}</b>
                  {t(" per camera / month", " प्रति कैमरा / माह")}
                </p>
                {data.pricing.stale && (
                  <p className="mt-1 text-[0.82rem] text-ink-soft">
                    {t(
                      "The exact amount is confirmed before you pay.",
                      "सही राशि भुगतान से पहले दिखेगी।",
                    )}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-4 text-[0.95rem] text-danger">
                {t(
                  "The price could not be loaded right now. Refresh in a moment.",
                  "कीमत अभी लोड नहीं हो सकी। थोड़ी देर में रीफ़्रेश करें।",
                )}
              </p>
            )}

            {!mayManage && (
              <p className="mt-3 rounded-lg border border-line bg-panel px-4 py-3 text-[0.9rem] text-ink-soft">
                {t(
                  "Only the account owner or an admin can buy this. Ask them to sign in here.",
                  "इसे सिर्फ़ अकाउंट ओनर या एडमिन ही खरीद सकते हैं। उनसे यहाँ साइन इन करने को कहें।",
                )}
              </p>
            )}

            <div className="card mt-4 divide-y divide-line">
              {groups.map((g) => (
                <div key={g.id} className="p-3 sm:p-4">
                  <p className="px-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                    {g.name}
                  </p>
                  <ul className="mt-1">
                    {g.cams.map((c) => {
                      const on = c.mode === "face" || paidIds.has(c.id);
                      const canTick = !on && mayManage && priceOk;
                      const checked = selected.has(c.id);
                      return (
                        <li key={c.id}>
                          <label
                            className={`flex min-h-11 items-center gap-3 rounded-lg px-2 py-2.5 ${
                              canTick ? "cursor-pointer [@media(hover:hover)]:hover:bg-panel-2" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="h-5 w-5 shrink-0 accent-[rgb(var(--c-accent))]"
                              checked={on || checked}
                              disabled={!canTick}
                              onChange={() => toggle(c.id)}
                              // The full row, spelled out: name, place, whether
                              // it is online, and whether it is already paid
                              // for. A bare camera name told a screen-reader
                              // user nothing about what the tick would buy.
                              aria-label={[
                                c.name,
                                c.location,
                                c.is_online ? t("online", "ऑनलाइन") : t("offline", "ऑफ़लाइन"),
                                on
                                  ? c.mode === "face"
                                    ? t("face recognition on", "चेहरे की पहचान चालू")
                                    : t("paid", "भुगतान हुआ")
                                  : null,
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            />
                            <span
                              aria-hidden="true"
                              className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                                c.is_online ? "bg-accent" : "bg-danger"
                              }`}
                            />
                            <span className="min-w-0 flex-1 break-words text-ink">
                              {c.name}
                              {c.location && <span className="text-ink-soft"> · {c.location}</span>}
                              {!c.is_online && (
                                <span className="text-[0.85rem] text-danger">
                                  {" "}
                                  · {t("offline", "ऑफ़लाइन")}
                                </span>
                              )}
                              {c.is_online && (
                                <span className="sr-only"> · {t("online", "ऑनलाइन")}</span>
                              )}
                            </span>
                            {on && (
                              <span className="shrink-0 whitespace-nowrap rounded-full bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.06em] text-accent">
                                {c.mode === "face" ? t("FACE ON", "चालू") : t("PAID", "भुगतान हुआ")}
                              </span>
                            )}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {mayManage && priceOk && (
              <div className="mt-5">
                {checkoutError && (
                  <p
                    role="alert"
                    className="mb-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2.5 text-[0.85rem] text-danger"
                  >
                    {checkoutError}
                  </p>
                )}
                {/* The amount lives OUTSIDE the button: .btn never wraps, and
                    "Continue to Razorpay · ₹12,000 / month" does not fit a
                    360px phone. The total is the one line that must never be
                    cut off, so it gets its own. */}
                {selected.size > 0 && (
                  <p className="mb-3 text-[1.05rem] text-ink">
                    <b>{inr(quote.total)}</b>
                    {t(" / month", " / माह")}
                    <span className="text-ink-soft">
                      {" "}
                      · {selected.size} × {inr(quote.unit)}
                    </span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => void startCheckout()}
                  disabled={selected.size === 0 || busy}
                  data-cta="billing-checkout"
                  className="btn btn-primary w-full disabled:opacity-70 sm:w-auto"
                >
                  {busy
                    ? t("Opening Razorpay…", "Razorpay खुल रहा है…")
                    : selected.size === 0
                      ? t("Choose cameras above", "ऊपर कैमरे चुनें")
                      : t("Continue to Razorpay", "Razorpay पर जाएँ")}
                </button>
                <p className="mt-3 max-w-[60ch] text-[0.85rem] text-ink-soft">
                  {selected.size > 0
                    ? t(
                        `${inr(quote.total)} is taken today, then the same amount every month until you cancel (${inr(quote.unit)} per camera). Razorpay takes the payment by UPI AutoPay or card. When you are done, come back to this page — it picks up where you left off.`,
                        `आज ${inr(quote.total)} कटेगा, फिर हर महीने यही राशि जब तक आप रद्द न करें (${inr(quote.unit)} प्रति कैमरा)। भुगतान Razorpay से UPI AutoPay या कार्ड द्वारा होता है। पूरा होने पर इस पेज पर लौटें — यह वहीं से आगे बढ़ेगा।`,
                      )
                    : t(
                        "Charged today and then every month until you cancel, per camera. Razorpay takes the payment by UPI AutoPay or card.",
                        "आज और फिर हर महीने, जब तक आप रद्द न करें, प्रति कैमरा शुल्क। भुगतान Razorpay से UPI AutoPay या कार्ड द्वारा होता है।",
                      )}
                </p>
              </div>
            )}
          </section>
        )}

        <p className="mt-12 text-[0.85rem] text-ink-soft">
          {t("Need an invoice or help? Email", "इनवॉइस या मदद चाहिए? ईमेल करें")}{" "}
          <a
            href="mailto:billing@pgak.co.in"
            className="inline-flex min-h-11 items-center text-accent hover:underline"
          >
            billing@pgak.co.in
          </a>
        </p>
      </div>
    </main>
  );
}

/* ────────────────────────────── one mandate ─────────────────────────────── */

function PlanCard({
  sub,
  mayManage,
  confirming,
  busy,
  onAskCancel,
  onKeep,
  onCancel,
}: {
  sub: Subscription;
  mayManage: boolean;
  confirming: boolean;
  busy: boolean;
  onAskCancel: () => void;
  onKeep: () => void;
  onCancel: () => void;
}) {
  const { t, lang } = useLang();
  const cancelling = sub.cancel_scheduled_at !== null;
  const live = LIVE.has(sub.status);
  const broken = sub.status === "halted" || sub.status === "paused";
  // Paid for, but not actually running: a lost webhook. The one screen the
  // customer comes to check is the right place to notice.
  const notOn = live && !cancelling ? sub.cameras.filter((c) => c.mode !== "face") : [];
  const names = sub.cameras.map((c) => c.name).join(", ");

  const badge = cancelling
    ? { text: t("CANCELLING", "रद्द हो रहा"), cls: "bg-panel-2 text-ink-soft" }
    : broken
      ? { text: t("PAYMENT FAILED", "भुगतान विफल"), cls: "bg-danger/10 text-danger" }
      : live
        ? { text: t("ACTIVE", "चालू"), cls: "bg-accent/10 text-accent" }
        : { text: sub.status.toUpperCase(), cls: "bg-panel-2 text-ink-soft" };

  return (
    <section className="card mt-4 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[1.05rem] text-ink">PGAK AI Vision</p>
        <span
          className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.06em] ${badge.cls}`}
        >
          {badge.text}
        </span>
      </div>

      {/* Per camera, never a computed total: a member with camera-level access
          sees fewer cameras than the mandate covers. */}
      <p className="mt-2 font-display text-[1.5rem] tracking-tight text-ink">
        {sub.unit_amount_paise === null ? "—" : inr(sub.unit_amount_paise)}
        <span className="font-sans text-[0.95rem] text-ink-soft">
          {t(" per camera / month", " प्रति कैमरा / माह")}
        </span>
      </p>

      {cancelling ? (
        <p className="mt-1 text-[0.95rem] text-ink-soft">
          {t("Ends", "अंतिम दिन:")} {fmtDate(sub.cancel_scheduled_at, lang)} ·{" "}
          {t("you keep it until then", "तब तक चलता रहेगा")}
        </p>
      ) : sub.renews_at ? (
        <p className="mt-1 text-[0.95rem] text-ink-soft">
          {t("Next payment", "अगला भुगतान:")} {fmtDate(sub.renews_at, lang)}
        </p>
      ) : broken ? (
        <p className="mt-1 text-[0.95rem] text-danger">
          {t(
            "The last payment didn't go through, so face recognition is off. Open the AutoPay in your UPI app (GPay, PhonePe, Paytm) — if it is paused or cancelled there, email billing@pgak.co.in and we'll set it up again.",
            "पिछला भुगतान नहीं हुआ, इसलिए चेहरे की पहचान बंद है। अपने UPI ऐप (GPay, PhonePe, Paytm) में AutoPay देखें — अगर वहाँ रुका या रद्द है तो billing@pgak.co.in पर ईमेल करें, हम फिर से चालू कर देंगे।",
          )}
        </p>
      ) : null}

      {notOn.length > 0 && (
        <p className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-[0.9rem] text-ink">
          {t(
            `You're paying for ${notOn.map((c) => c.name).join(", ")}, but face recognition isn't running there yet. If this doesn't clear in a few minutes, email billing@pgak.co.in and we'll fix it.`,
            `आप ${notOn.map((c) => c.name).join(", ")} के लिए भुगतान कर रहे हैं, पर वहाँ चेहरे की पहचान अभी चालू नहीं है। कुछ मिनटों में ठीक न हो तो billing@pgak.co.in पर ईमेल करें — हम ठीक कर देंगे।`,
          )}
        </p>
      )}

      <dl className="mt-5 grid grid-cols-[5.5rem_1fr] gap-y-2 text-[0.9rem]">
        <dt className="text-ink-soft">
          {sub.visible_camera_count === 1 ? t("Camera", "कैमरा") : t("Cameras", "कैमरे")}
        </dt>
        <dd className="min-w-0 break-words text-ink">{names || "—"}</dd>
        <dt className="text-ink-soft">{t("Started", "शुरू")}</dt>
        <dd className="text-ink">{fmtDate(sub.created_at, lang)}</dd>
        <dt className="text-ink-soft">{t("Payment", "भुगतान")}</dt>
        <dd className="text-ink">{t("UPI AutoPay via Razorpay", "Razorpay से UPI AutoPay")}</dd>
      </dl>
      <p className="mt-2 text-[0.82rem] text-ink-soft">
        {t(
          "Your UPI app or bank reminds you a day before each payment. To stop paying, cancel here — pausing or deleting the AutoPay in your UPI app only makes the payments fail; it does not cancel your plan.",
          "हर भुगतान से एक दिन पहले आपका UPI ऐप या बैंक याद दिलाता है। भुगतान रोकने के लिए यहीं रद्द करें — UPI ऐप में AutoPay रोकने या हटाने से सिर्फ़ भुगतान विफल होते हैं, प्लान रद्द नहीं होता।",
        )}
      </p>

      {mayManage && !cancelling && sub.status !== "cancelled" && (
        <div className="mt-4">
          {confirming ? (
            <div className="rounded-lg border border-line bg-panel-2 p-4">
              <p className="text-[0.95rem] text-ink">
                {t("Cancel PGAK AI Vision?", "PGAK AI Vision रद्द करें?")}
              </p>
              <p className="mt-1.5 text-[0.9rem] text-ink-soft">
                {t(
                  `Face recognition will stop on ${names || "these cameras"}. Live view, boundary alerts and tamper detection are free and keep working.`,
                  `${names || "इन कैमरों"} पर चेहरे की पहचान बंद हो जाएगी। लाइव व्यू, बाउंड्री अलर्ट और टैम्पर डिटेक्शन मुफ़्त हैं और चलते रहेंगे।`,
                )}
                {sub.renews_at &&
                  " " +
                    t(
                      `You keep it until ${fmtDate(sub.renews_at, lang)}, the end of the period you have already paid for.`,
                      `${fmtDate(sub.renews_at, lang)} तक यह चलता रहेगा — इस अवधि का भुगतान आप पहले ही कर चुके हैं।`,
                    )}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onKeep}
                  className="btn btn-ghost w-full sm:w-auto"
                  disabled={busy}
                >
                  {t("Keep it", "रहने दें")}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={busy}
                  className="btn w-full border border-danger/50 bg-transparent text-danger hover:bg-danger/10 disabled:opacity-60 sm:w-auto"
                >
                  {busy
                    ? t("Cancelling…", "रद्द हो रहा…")
                    : t("Cancel subscription", "सब्सक्रिप्शन रद्द करें")}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onAskCancel}
              className="inline-flex min-h-11 items-center text-[0.9rem] text-danger underline-offset-2 hover:underline"
            >
              {t("Cancel subscription", "सब्सक्रिप्शन रद्द करें")}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
