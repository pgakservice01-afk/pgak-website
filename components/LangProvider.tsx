"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Lightweight bilingual (English / Hindi) layer.
 *
 * Usage in any client component:
 *   const { t, lang, setLang } = useLang();
 *   <h2>{t("How it works", "यह कैसे काम करता है")}</h2>
 *
 * The choice persists in localStorage and sets <html lang>. Both server and
 * first client render default to English, so there's no hydration mismatch;
 * a saved Hindi preference is applied right after mount.
 *
 * To translate more of the site, wrap strings in client components with
 * t("English", "हिन्दी"). Server components can be made client, or lifted.
 */
type Lang = "en" | "hi";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, hi: string) => string;
};

const LangCtx = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("pgak-lang");
    if (saved === "hi" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("pgak-lang", l);
    } catch {
      /* private mode / storage disabled — non-fatal */
    }
  };

  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);

/** EN / हिं pill toggle — drop into the nav (and anywhere else). */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex items-center rounded-full border border-line p-0.5 text-[0.78rem] font-semibold ${className ?? ""}`}
      role="group"
      aria-label="Language / भाषा"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-accent text-[#04201a]" : "text-ink-soft hover:text-ink"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        aria-pressed={lang === "hi"}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "hi" ? "bg-accent text-[#04201a]" : "text-ink-soft hover:text-ink"
        }`}
      >
        हिं
      </button>
    </div>
  );
}
