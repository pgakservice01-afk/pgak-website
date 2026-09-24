"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function MobileActions() {
  const [hidden, setHidden] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const tracked = new Set<Element>(),
      visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target),
        );
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px 100px 0px" },
    );
    const sync = () => {
      tracked.forEach((f) => {
        if (!f.isConnected) {
          observer.unobserve(f);
          tracked.delete(f);
          visible.delete(f);
        }
      });
      document
        .querySelectorAll(
          'form[data-lead-form],form[aria-label="Optional project details"]',
        )
        .forEach((f) => {
          if (!tracked.has(f)) {
            tracked.add(f);
            observer.observe(f);
          }
        });
      setHidden(visible.size > 0);
    };
    sync();
    const mutations = new MutationObserver(sync);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [path]);
  if (["/live", "/wall", "/billing"].includes(path)) return null;
  return (
    <nav
      aria-label="Mobile project actions"
      className="buyer-mobile-actions"
      hidden={hidden}
    >
      <a
        href="/free-audit"
        className="btn btn-primary"
        data-cta="mobile-camera-check"
      >
        Check my cameras
      </a>
      <a
        href="/book-demo"
        className="btn btn-ghost"
        data-cta="mobile-demo"
        data-intent="demo"
      >
        Request demo
      </a>
    </nav>
  );
}
