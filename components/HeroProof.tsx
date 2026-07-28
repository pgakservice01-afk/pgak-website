"use client";

import { SOCIAL_PROOF } from "@/lib/socialProof";
import Icon from "@/components/Icon";
import { useLang } from "@/components/LangProvider";

/**
 * Hero trust pills — quantified social proof + a Google star rating, sitting
 * right under the hero CTAs (the highest-conversion spot). Each pill only
 * renders when its number is set, so zeroing a value in lib/socialProof.ts
 * hides it — never a fake "0".
 */
export default function HeroProof() {
  const { t } = useLang();
  const { sitesProtected, rating, ratingCount } = SOCIAL_PROOF;
  const showRating = rating > 0 && ratingCount > 0;
  const showSites = sitesProtected > 0;
  if (!showRating && !showSites) return null;

  const filled = Math.round(rating);

  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      {showRating && (
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-2 text-[0.85rem]">
          <span className="flex gap-0.5 text-[0.9rem] leading-none" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < filled ? "text-[#ffc24b]" : "text-ink-faint/40"}>
                ★
              </span>
            ))}
          </span>
          <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
          <span className="text-ink-faint">
            · {ratingCount} {t("Google reviews", "Google समीक्षाएँ")}
          </span>
        </span>
      )}

      {showSites && (
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3.5 py-2 text-[0.85rem] text-ink-soft">
          <span className="text-accent">
            <Icon name="shield-lock" size={16} strokeWidth={1.8} />
          </span>
          <b className="font-semibold text-ink">{sitesProtected}+</b>{" "}
          {t("sites protected across India", "साइट्स भारत भर में सुरक्षित")}
        </span>
      )}
    </div>
  );
}
