"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
 * Razorpay opens in a NEW tab, deliberately: this tab stays put and keeps
 * polling, so the customer comes back to a page that already knows.
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

/** A checkout the customer has been handed to Razorpay for. */
type Order = { checkout: Checkout; names: string[]; startedAt: number };

/**
 * The open order survives a reload or an accidental navigation. sessionStorage
 * is per tab and dies with the browser, which is the right lifetime: a
 * customer who wanders back from Razorpay to a fresh copy of this page must
 * find it still waiting for their payment — not their cameras unticked and a
 * button offering a second checkout, which is exactly what the app once did.
 * An order older than an hour is stale by any definition and is dropped.
 */
function saveOrder(o: Order | null) {
  try {
    if (o) sessionStorage.setItem(ORDER_KEY, JSON.stringify(o));
    else sessionStorage.removeItem(ORDER_KEY);
  } catch {
    /* storage disabled — the page still works, it just cannot resume */
  }
}

function loadOrder(): Order | null {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as Order;
    if (!Array.isArray(o?.checkout?.camera_ids) || Date.now() - o.startedAt > ORDER_TTL_MS) {
      sessionStorage.removeItem(ORDER_KEY);
      return null;
    }
    return o;
  } catch {
    return null;
  }
}

type LoadState = "loading" | "ready" | "error";

export default function BillingClient() {
  const { t } = useLang();
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
  const [tick, setTick] = useState(0);
  const [cancelFor, setCancelFor] = useState<string | null>(null);
  const [cancelBusy, setCancelBusy] = useState(false);
  const [cancelNote, setCancelNote] = useState<string | null>(null);

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
  // camera has actually switched on — not that a tab was opened.
  useEffect(() => {
    if (!order) return;
    let stopped = false;
    let timer = 0;
    const poll = async () => {
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
        // A transient failure while the customer is on Razorpay's tab is not
        // news. Keep polling.
      }
      if (!stopped) {
        setTick((n) => n + 1);
        timer = window.setTimeout(poll, POLL_MS);
      }
    };
    timer = window.setTimeout(poll, POLL_MS);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [order, toSignIn]);

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
          "These cameras are already covered. Refresh the page to see the latest.",
          "ये कैमरे पहले से कवर हैं। ताज़ा स्थिति के लिए पेज रीफ़्रेश करें।",
        );
      if (e.status === 403)
        return t(
          "Only the account owner or an admin can buy this.",
          "इसे सिर्फ़ अकाउंट ओनर या एडमिन ही खरीद सकते हैं।",
        );
      if (e.status === 409 && e.detail) return e.detail;
      return t(
        "We could not reach the payment provider. Nothing has been charged — please try again in a moment.",
        "पेमेंट प्रोवाइडर तक नहीं पहुँच सके। कोई शुल्क नहीं लगा है — कृपया थोड़ी देर में फिर कोशिश करें।",
      );
    }
    return t(
      "No connection. Nothing has been charged — check your internet and try again.",
      "कनेक्शन नहीं है। कोई शुल्क नहीं लगा है — इंटरनेट जाँचकर फिर कोशिश करें।",
    );
  };

  /** Hand the customer to Razorpay and start watching for the result. */
  const openRazorpay = (o: Order) => {
    setQuoteToConfirm(null);
    setSelected(new Set());
    const live: Order = { ...o, startedAt: Date.now() };
    setOrder(live);
    saveOrder(live);
    setPopupBlocked(false);
    const url = o.checkout.short_url;
    if (!url) {
      setPopupBlocked(true);
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
    } finally {
      setBusy(false);
    }
  };

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
              `You keep PGAK AI Vision until ${fmtDate(r.ends_at)}, the end of the period you have already paid for. You will not be charged again.`,
              `${fmtDate(r.ends_at)} तक PGAK AI Vision चलता रहेगा — यह अवधि आपने पहले ही चुका दी है। अब कोई शुल्क नहीं लगेगा।`,
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

  return (
    <main className="min-h-screen bg-bg">
      <header className="sticky top-0 z-30 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur">
        <a href="/" aria-label="PGAK — home">
          <Logo variant="compact" className="text-[1.05rem]" />
        </a>
        <span className="font-display text-[0.95rem] tracking-tight text-ink-soft">
          {t("Billing", "बिलिंग")}
        </span>
        <span className="hidden text-[0.8rem] text-ink-faint sm:inline">{data.me.email}</span>
        <a
          href="/wall"
          className="ml-auto text-[0.82rem] text-ink-soft underline-offset-2 hover:text-ink hover:underline"
        >
          {t("Live view", "लाइव व्यू")}
        </a>
        <button
          type="button"
          onClick={signOut}
          className="text-[0.82rem] text-ink-soft underline-offset-2 hover:text-ink hover:underline"
        >
          {t("Sign out", "साइन आउट")}
        </button>
      </header>

      <div className="mx-auto max-w-[820px] px-4 pb-24 pt-8">
        {/* ── An order in flight, or just completed ─────────────────────── */}
        {paid && (
          <section className="card mb-8 border-accent/40 p-6">
            <h2 className="font-display text-[1.4rem] tracking-tight text-ink">
              {t("Payment received", "भुगतान मिल गया")}
            </h2>
            <p className="mt-2 text-ink-soft">
              {t("PGAK AI Vision is now on for", "PGAK AI Vision अब चालू है:")}{" "}
              <b className="text-ink">{paid.names.join(", ")}</b>.{" "}
              {t(
                `${inr(paid.checkout.amount)} per month, renews automatically until you cancel. Razorpay has emailed you the receipt.`,
                `${inr(paid.checkout.amount)} प्रति माह, जब तक आप रद्द न करें अपने-आप रिन्यू होगा। रसीद Razorpay ने ईमेल कर दी है।`,
              )}
            </p>
            <button type="button" onClick={() => setPaid(null)} className="btn btn-ghost mt-5">
              {t("Done", "ठीक है")}
            </button>
          </section>
        )}

        {order && (
          <section className="card mb-8 border-accent/40 p-6">
            <h2 className="font-display text-[1.4rem] tracking-tight text-ink">
              {t("Finish paying in the Razorpay tab", "Razorpay वाले टैब में भुगतान पूरा करें")}
            </h2>
            <p className="mt-2 text-ink-soft">
              {t(
                "Razorpay opened in a new tab. Approve the autopay mandate there, then come back here — this page updates itself.",
                "Razorpay एक नए टैब में खुला है। वहाँ ऑटोपे मैंडेट मंज़ूर करें, फिर यहाँ लौटें — यह पेज अपने-आप अपडेट होगा।",
              )}
            </p>
            <p className="mt-3 text-[0.95rem] text-ink">
              <b>{order.names.join(", ")}</b> · {inr(order.checkout.amount)}
              {t(" / month", " / माह")}
            </p>
            {(popupBlocked || !order.checkout.short_url) && (
              <p className="mt-4">
                {order.checkout.short_url ? (
                  <a
                    href={order.checkout.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {t("Open Razorpay", "Razorpay खोलें")}
                  </a>
                ) : (
                  <span className="text-danger">
                    {t(
                      "Razorpay did not return a payment page. Nothing has been charged — please try again.",
                      "Razorpay ने भुगतान पेज नहीं दिया। कोई शुल्क नहीं लगा — कृपया फिर कोशिश करें।",
                    )}
                  </span>
                )}
              </p>
            )}
            <p className="mt-4 flex items-center gap-2 text-[0.9rem] text-ink-soft">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 animate-pulseDot rounded-full bg-accent"
              />
              {slow
                ? t(
                    "Taking longer than usual. If you have paid, face recognition switches on within a few minutes — you will not be charged twice.",
                    "सामान्य से ज़्यादा समय लग रहा है। अगर आपने भुगतान कर दिया है तो कुछ मिनटों में चेहरा पहचान चालू हो जाएगी — दोबारा शुल्क नहीं लगेगा।",
                  )
                : t("Waiting for Razorpay…", "Razorpay की प्रतीक्षा…")}
            </p>
            <button
              type="button"
              onClick={abandonOrder}
              className="mt-4 text-[0.85rem] text-ink-soft underline-offset-2 hover:text-ink hover:underline"
            >
              {t("I didn't complete the payment", "मैंने भुगतान पूरा नहीं किया")}
            </button>
          </section>
        )}

        {quoteToConfirm && (
          <section className="card mb-8 border-accent/40 p-6">
            <h2 className="font-display text-[1.4rem] tracking-tight text-ink">
              {t("The total changed", "कुल राशि बदल गई")}
            </h2>
            <p className="mt-2 text-ink-soft">
              {t(
                "Some cameras were already covered, so Razorpay will charge",
                "कुछ कैमरे पहले से कवर थे, इसलिए Razorpay लेगा",
              )}{" "}
              <b className="text-ink">
                {inr(quoteToConfirm.checkout.amount)}
                {t(" / month", " / माह")}
              </b>{" "}
              {t("for", "इनके लिए:")} <b className="text-ink">{quoteToConfirm.names.join(", ")}</b>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openRazorpay(quoteToConfirm)}
                className="btn btn-primary"
              >
                {t("Continue to Razorpay", "Razorpay पर जाएँ")}
              </button>
              <button
                type="button"
                onClick={() => setQuoteToConfirm(null)}
                className="btn btn-ghost"
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
          <section className="card mt-4 p-6">
            <p className="text-ink">{t("You're on the free tier.", "आप फ़्री टियर पर हैं।")}</p>
            <p className="mt-1.5 text-[0.95rem] text-ink-soft">
              {t(
                "Live view, boundary alerts and tamper detection are included on every camera. PGAK AI Vision adds face recognition and name alerts — add it below.",
                "लाइव व्यू, बाउंड्री अलर्ट और टैम्पर डिटेक्शन हर कैमरे पर शामिल हैं। PGAK AI Vision चेहरा पहचान और नाम अलर्ट जोड़ता है — नीचे से जोड़ें।",
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
                "Face recognition and name alerts on the cameras you choose. Live view, boundary alerts and tamper detection stay free.",
                "आपके चुने कैमरों पर चेहरा पहचान और नाम अलर्ट। लाइव व्यू, बाउंड्री अलर्ट और टैम्पर डिटेक्शन मुफ़्त रहते हैं।",
              )}
            </p>

            <p className="mt-4 text-[0.95rem] text-ink">
              {priceOk ? (
                <>
                  <b>{inr(data.pricing.amount)}</b>
                  {t(" per camera per month", " प्रति कैमरा प्रति माह")}
                  {data.pricing.stale &&
                    t(
                      " · shown price may be slightly out of date; the exact amount is confirmed before payment",
                      " · दिखाई कीमत थोड़ी पुरानी हो सकती है; भुगतान से पहले सही राशि दिखेगी",
                    )}
                </>
              ) : (
                <span className="text-danger">
                  {t(
                    "The price could not be loaded right now. Refresh in a moment.",
                    "कीमत अभी लोड नहीं हो सकी। थोड़ी देर में रीफ़्रेश करें।",
                  )}
                </span>
              )}
            </p>

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
                <div key={g.id} className="p-4">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                    {g.name}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {g.cams.map((c) => {
                      const on = c.mode === "face" || paidIds.has(c.id);
                      const checked = selected.has(c.id);
                      return (
                        <li key={c.id}>
                          <label
                            className={`flex items-center gap-3 rounded-lg px-2 py-2 ${
                              on || !mayManage || !priceOk ? "" : "cursor-pointer hover:bg-panel-2"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 accent-[rgb(var(--c-accent))]"
                              checked={on || checked}
                              disabled={on || !mayManage || !priceOk}
                              onChange={() => toggle(c.id)}
                              aria-label={c.name}
                            />
                            <span
                              aria-hidden="true"
                              className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                                c.is_online ? "bg-accent" : "bg-danger"
                              }`}
                              title={c.is_online ? "online" : "offline"}
                            />
                            <span className="flex-1 text-ink">
                              {c.name}
                              {c.location && (
                                <span className="text-ink-faint"> · {c.location}</span>
                              )}
                            </span>
                            {on && (
                              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.06em] text-accent">
                                {c.mode === "face" ? "FACE ON" : t("PAID", "भुगतान हो चुका")}
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
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => void startCheckout()}
                    disabled={selected.size === 0 || busy}
                    data-cta="billing-checkout"
                    className="btn btn-primary disabled:opacity-50"
                  >
                    {busy
                      ? t("Starting checkout…", "चेकआउट शुरू हो रहा है…")
                      : selected.size === 0
                        ? t("Choose cameras above", "ऊपर कैमरे चुनें")
                        : t(
                            `Continue to Razorpay · ${inr(quote.total)} / month`,
                            `Razorpay पर जाएँ · ${inr(quote.total)} / माह`,
                          )}
                  </button>
                  {selected.size > 0 && (
                    <span className="text-[0.9rem] text-ink-soft">
                      {selected.size} × {inr(quote.unit)}
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-[60ch] text-[0.82rem] text-ink-faint">
                  {t(
                    "Charged today and every month until you cancel, per camera. Payment is handled by Razorpay (UPI autopay or card) and opens in a new tab — come back here when done.",
                    "आज और हर महीने, जब तक आप रद्द न करें, प्रति कैमरा शुल्क। भुगतान Razorpay (UPI ऑटोपे या कार्ड) से होता है और नए टैब में खुलता है — पूरा करके यहाँ लौटें।",
                  )}
                </p>
              </div>
            )}
          </section>
        )}

        <p className="mt-12 text-[0.85rem] text-ink-faint">
          {t("Need an invoice or help? Email", "इनवॉइस या मदद चाहिए? ईमेल करें")}{" "}
          <a href="mailto:billing@pgak.co.in" className="text-accent hover:underline">
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
  const { t } = useLang();
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
    <section className="card mt-4 p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[1.05rem] text-ink">PGAK AI Vision</p>
        <span className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.06em] ${badge.cls}`}>
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
          {t("Ends", "समाप्त")} {fmtDate(sub.cancel_scheduled_at)} ·{" "}
          {t("you keep it until then", "तब तक चलता रहेगा")}
        </p>
      ) : sub.renews_at ? (
        <p className="mt-1 text-[0.95rem] text-ink-soft">
          {t("Renews", "रिन्यू")} {fmtDate(sub.renews_at)}
        </p>
      ) : broken ? (
        <p className="mt-1 text-[0.95rem] text-danger">
          {t(
            "The last payment didn't go through, so face recognition is off. Check your bank's autopay mandate, or contact us.",
            "पिछला भुगतान नहीं हुआ, इसलिए चेहरा पहचान बंद है। बैंक का ऑटोपे मैंडेट जाँचें या हमसे संपर्क करें।",
          )}
        </p>
      ) : null}

      {notOn.length > 0 && (
        <p className="mt-4 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-[0.9rem] text-ink">
          {t(
            `You're paying for ${notOn.map((c) => c.name).join(", ")}, but face recognition isn't running there yet. If this doesn't clear in a few minutes, email billing@pgak.co.in — we'll fix it and you won't be charged for the gap.`,
            `आप ${notOn.map((c) => c.name).join(", ")} के लिए भुगतान कर रहे हैं, पर वहाँ चेहरा पहचान अभी चालू नहीं है। कुछ मिनटों में ठीक न हो तो billing@pgak.co.in पर ईमेल करें — हम ठीक करेंगे और इस अंतराल का शुल्क नहीं लगेगा।`,
          )}
        </p>
      )}

      <dl className="mt-5 grid grid-cols-[6rem_1fr] gap-y-2 text-[0.9rem]">
        <dt className="text-ink-soft">{sub.visible_camera_count === 1 ? t("Camera", "कैमरा") : t("Cameras", "कैमरे")}</dt>
        <dd className="text-ink">{names || "—"}</dd>
        <dt className="text-ink-soft">{t("Started", "शुरू")}</dt>
        <dd className="text-ink">{fmtDate(sub.created_at)}</dd>
        <dt className="text-ink-soft">{t("Payment", "भुगतान")}</dt>
        <dd className="text-ink">
          Razorpay autopay
          <span className="block text-[0.8rem] text-ink-faint">
            {t(
              "Your bank notifies you before each charge. Revoking the mandate at your bank is not the same as cancelling here — it leaves the subscription failing rather than closed.",
              "हर शुल्क से पहले आपका बैंक सूचित करता है। बैंक में मैंडेट रद्द करना यहाँ रद्द करने जैसा नहीं है — उससे सब्सक्रिप्शन बंद नहीं, विफल होता है।",
            )}
          </span>
        </dd>
      </dl>

      {mayManage && !cancelling && sub.status !== "cancelled" && (
        <div className="mt-5">
          {confirming ? (
            <div className="rounded-lg border border-line bg-panel-2 p-4">
              <p className="text-[0.95rem] text-ink">
                {t("Cancel PGAK AI Vision?", "PGAK AI Vision रद्द करें?")}
              </p>
              <p className="mt-1.5 text-[0.9rem] text-ink-soft">
                {t(
                  `Face recognition will stop on ${names || "these cameras"}. Live view, boundary alerts and tamper detection are free and keep working.`,
                  `${names || "इन कैमरों"} पर चेहरा पहचान बंद हो जाएगी। लाइव व्यू, बाउंड्री अलर्ट और टैम्पर डिटेक्शन मुफ़्त हैं और चलते रहेंगे।`,
                )}
                {sub.renews_at &&
                  " " +
                    t(
                      `You keep it until ${fmtDate(sub.renews_at)}, the end of the period you have already paid for.`,
                      `${fmtDate(sub.renews_at)} तक यह चलता रहेगा — यह अवधि आपने पहले ही चुका दी है।`,
                    )}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={onKeep} className="btn btn-ghost" disabled={busy}>
                  {t("Keep it", "रहने दें")}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={busy}
                  className="btn border border-danger/50 bg-transparent text-danger hover:bg-danger/10 disabled:opacity-60"
                >
                  {busy ? t("Cancelling…", "रद्द हो रहा…") : t("Cancel subscription", "सब्सक्रिप्शन रद्द करें")}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onAskCancel}
              className="text-[0.9rem] text-danger underline-offset-2 hover:underline"
            >
              {t("Cancel subscription", "सब्सक्रिप्शन रद्द करें")}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
