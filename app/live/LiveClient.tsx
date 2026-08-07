"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import { useLang } from "@/components/LangProvider";

/**
 * Customer sign-in for the camera wall.
 *
 * Note for whoever runs the deployment: a display left switched on in a room
 * signs in as a real user, so give each such screen its own view-only account
 * rather than reusing a manager's login.
 */

// Where the wall itself lives. Kept in one place so it can move to a subdomain
// (wall.pgak.co.in) without touching this component.
const WALL_URL = process.env.NEXT_PUBLIC_PGAK_WALL_URL || "/wall/";

// The cloud API that issues the session. Set NEXT_PUBLIC_PGAK_API in the
// environment; there is no sensible default worth shipping.
const API = process.env.NEXT_PUBLIC_PGAK_API || "";

type Mode = "signin" | "signup";

export default function LiveClient() {
  const { t } = useLang();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function switchTo(next: Mode) {
    setMode(next);
    setError("");
    setPassword("");
  }

  const netError = () =>
    setError(t("Couldn't reach the server. Check your connection and try again.",
               "सर्वर तक नहीं पहुँच सके। अपना कनेक्शन जाँचकर दोबारा कोशिश करें।"));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const signup = mode === "signup";

    // Say what is missing and what to do about it — never "invalid input".
    if (signup && !name.trim()) {
      setError(t("Enter your name so your admin knows who to approve.",
                 "अपना नाम दर्ज करें ताकि एडमिन जान सके किसे मंज़ूरी देनी है।"));
      return;
    }
    if (!email.trim()) {
      setError(signup
        ? t("Enter your work email.", "अपना वर्क ईमेल दर्ज करें।")
        : t("Enter the work email your account was set up with.",
            "जिस वर्क ईमेल से अकाउंट बना है वह दर्ज करें।"));
      return;
    }
    // Accounts follow a site installation, so a code ties the new user to an
    // organisation that actually has cameras. Drop this block for open signup.
    if (signup && !invite.trim()) {
      setError(t("Enter the invite code your admin shared with you.",
                 "अपने एडमिन से मिला इनवाइट कोड दर्ज करें।"));
      return;
    }
    if (!password) {
      setError(t("Enter your password to continue.",
                 "जारी रखने के लिए अपना पासवर्ड दर्ज करें।"));
      return;
    }
    if (signup && password.length < 8) {
      setError(t("Use at least 8 characters for your password.",
                 "पासवर्ड में कम से कम 8 अक्षर रखें।"));
      return;
    }
    if (!API) {
      setError(t("Sign-in isn't connected yet. Contact PGAK support.",
                 "साइन-इन अभी कनेक्ट नहीं है। PGAK सपोर्ट से संपर्क करें।"));
      return;
    }

    setError("");
    setBusy(true);
    try {
      // Redeem endpoint is /auth/member/signup — an invited person joining an
      // EXISTING org, with role and device visibility frozen on the invite.
      // Field names below match MemberSignupRequest exactly.
      // The two endpoints do NOT take the same shape, and the difference is
      // easy to miss because only one of them is ours.
      //
      // Sign-up is our own MemberSignupRequest: JSON, fields exactly
      // {invite_code, name, email, password}.
      //
      // Sign-in is fastapi-users' OAuth2 password flow. It wants FORM data,
      // and the email goes in a field called `username`. Posting JSON there
      // answers 422 "field required: username" — never 401 — so a wrong shape
      // does not look like bad credentials, it looks like the server is down,
      // which is the worst possible way for this to fail. Verified against
      // production 2026-08-07.
      const res = signup
        ? await fetch(`${API}/auth/member/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              invite_code: invite.trim(),
              name: name.trim(),
              email: email.trim(),
              password,
            }),
          })
        : await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username: email.trim(), password }),
          });

      // fastapi-users answers a bad sign-in with 400 LOGIN_BAD_CREDENTIALS,
      // not 401 (verified against production 2026-08-07). Matching only 401
      // sent a wrong password down the "couldn't reach the server" path, which
      // has the customer checking their wifi instead of their password.
      if (!signup && (res.status === 400 || res.status === 401)) {
        const detail = await res.json().then((d) => d?.detail).catch(() => null);
        if (detail === "LOGIN_USER_NOT_VERIFIED") {
          setError(t("This account hasn't been activated yet. Ask your admin to approve it.",
                     "यह अकाउंट अभी सक्रिय नहीं हुआ है। एडमिन से मंज़ूरी लेने को कहें।"));
        } else {
          setError(t("That email and password don't match. Check both and try again.",
                     "ईमेल और पासवर्ड मेल नहीं खाते। दोनों जाँचकर दोबारा कोशिश करें।"));
        }
        return;
      }
      if (signup && (res.status === 400 || res.status === 404)) {
        setError(t("That invite code isn't valid or has expired. Ask your admin for a new one.",
                   "यह इनवाइट कोड मान्य नहीं है। एडमिन से नया कोड लें।"));
        return;
      }
      if (signup && res.status === 409) {
        setError(t("An account already exists for this email. Sign in instead.",
                   "इस ईमेल का अकाउंट पहले से है। इसके बजाय साइन इन करें।"));
        return;
      }
      if (!res.ok) { netError(); return; }

      const data = await res.json();
      if (data?.access_token) {
        sessionStorage.setItem("pgak_token", data.access_token);
        window.location.href = WALL_URL;
        return;
      }
      // Signup that needs admin approval returns no token — say so plainly
      // rather than dropping the person on an empty wall.
      setError(t("Account created. Your admin needs to approve it before you can watch cameras.",
                 "अकाउंट बन गया। कैमरे देखने से पहले आपके एडमिन को इसे मंज़ूरी देनी होगी।"));
    } catch {
      netError();
    } finally {
      setBusy(false);
    }
  }

  const signup = mode === "signup";

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      {/* Left: what you are signing in to. Hidden on small screens, where the
          form should own the viewport rather than share it.
          pb clears the global ChatBot launcher, which is fixed bottom-left. */}
      <section className="relative hidden overflow-hidden bg-bg-2 p-12 pb-28 lg:flex lg:flex-col">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--c-ink-faint)/0.5) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgb(var(--c-ink-faint)/0.5) 1px, transparent 1px)",
            backgroundSize: "72px 41px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-bg-2/40 to-bg-2"
        />

        <a href="/" className="relative" aria-label="PGAK — home">
          <Logo variant="compact" className="text-[1.35rem]" />
        </a>

        <div className="relative mt-auto">
          <h1 className="font-display text-[2.4rem] leading-[1.12] tracking-tight text-ink">
            {t("Every camera. Every site. One screen.",
               "हर कैमरा। हर साइट। एक स्क्रीन।")}
          </h1>
          <p className="mt-4 max-w-[38ch] text-[0.98rem] leading-relaxed text-ink-soft">
            {t(
              "Your whole estate on the wall, refreshing continuously. Anything that stops reporting turns red before you have to go looking for it.",
              "आपकी पूरी साइटें एक दीवार पर, लगातार अपडेट होती हुईं। जो कैमरा बंद होगा वह खुद लाल हो जाएगा — आपको ढूँढना नहीं पड़ेगा।"
            )}
          </p>
        </div>
      </section>

      {/* Right: the form */}
      <section className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-[360px]">
          <div className="mb-8 lg:hidden">
            <a href="/" aria-label="PGAK — home">
              <Logo variant="compact" className="text-[1.2rem]" />
            </a>
          </div>

          <form onSubmit={submit} noValidate>
            <h2 className="font-display text-[1.6rem] tracking-tight text-ink">
              {signup ? t("Create your account", "अपना अकाउंट बनाएँ") : t("Live view", "लाइव व्यू")}
            </h2>
            <p className="mt-1.5 text-[0.9rem] text-ink-soft">
              {signup
                ? t("You'll need the invite code your admin shared with you.",
                    "आपको अपने एडमिन से मिला इनवाइट कोड चाहिए होगा।")
                : t("Sign in with the account set up for you.",
                    "आपके लिए बनाए गए अकाउंट से साइन इन करें।")}
            </p>

            {error && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2.5 text-[0.85rem] text-danger"
              >
                {error}
              </p>
            )}

            {signup && (
              <>
                <label
                  htmlFor="name"
                  className="mt-6 block text-[0.8rem] font-semibold text-ink-soft"
                >
                  {t("Full name", "पूरा नाम")}
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line bg-panel px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-accent"
                />
              </>
            )}

            <label
              htmlFor="email"
              className={`${signup ? "mt-4" : "mt-6"} block text-[0.8rem] font-semibold text-ink-soft`}
            >
              {t("Work email", "वर्क ईमेल")}
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-1.5 w-full rounded-lg border border-line bg-panel px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-accent"
            />

            {signup && (
              <>
                <label
                  htmlFor="invite"
                  className="mt-4 block text-[0.8rem] font-semibold text-ink-soft"
                >
                  {t("Invite code", "इनवाइट कोड")}
                </label>
                <input
                  id="invite"
                  type="text"
                  autoCapitalize="characters"
                  value={invite}
                  onChange={(e) => setInvite(e.target.value.toUpperCase())}
                  placeholder="PG-XXXX-XXXX"
                  maxLength={16}
                  className="mt-1.5 w-full rounded-lg border border-line bg-panel px-3 py-2.5 font-mono text-[0.95rem] tracking-[0.08em] text-ink outline-none transition-colors focus:border-accent"
                />
              </>
            )}

            <label
              htmlFor="password"
              className="mt-4 block text-[0.8rem] font-semibold text-ink-soft"
            >
              {t("Password", "पासवर्ड")}
            </label>
            <input
              id="password"
              type="password"
              autoComplete={signup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-panel px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-accent"
            />
            {signup && (
              <p className="mt-1.5 text-[0.78rem] text-ink-faint">
                {t("At least 8 characters.", "कम से कम 8 अक्षर।")}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              data-cta={signup ? "live-signup" : "live-signin"}
              className="btn btn-primary mt-6 w-full justify-center disabled:opacity-60"
            >
              {busy
                ? (signup ? t("Creating account…", "अकाउंट बन रहा है…")
                          : t("Signing in…", "साइन इन हो रहा है…"))
                : (signup ? t("Create account", "अकाउंट बनाएँ")
                          : t("Sign in", "साइन इन"))}
            </button>
          </form>

          <p className="mt-6 text-center text-[0.85rem] text-ink-soft">
            {signup ? (
              <>
                {t("Already have an account?", "पहले से अकाउंट है?")}{" "}
                <button
                  type="button"
                  onClick={() => switchTo("signin")}
                  className="text-accent hover:underline"
                >
                  {t("Sign in", "साइन इन")}
                </button>
              </>
            ) : (
              <>
                {t("Got an invite code?", "इनवाइट कोड मिला है?")}{" "}
                <button
                  type="button"
                  onClick={() => switchTo("signup")}
                  className="text-accent hover:underline"
                >
                  {t("Create an account", "अकाउंट बनाएँ")}
                </button>
              </>
            )}
          </p>

          <p className="mt-4 text-center text-[0.82rem] text-ink-faint">
            {t("Not a customer yet?", "अभी ग्राहक नहीं हैं?")}{" "}
            <a href="/#demo" data-cta="live-to-demo" className="text-accent hover:underline">
              {t("Book a demo", "डेमो बुक करें")}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
