"use client";

import { useState } from "react";

import type { DemoTask } from "@/lib/proof/demo-guide";

/**
 * Filters the server-rendered demo cards by task. Every card stays in the
 * HTML (crawlable, works without JavaScript); this only hides the others.
 */
export default function DemoTaskFilter({ tasks }: { tasks: { id: DemoTask; label: string }[] }) {
  const [on, setOn] = useState<DemoTask | "all">("all");
  const apply = (t: DemoTask | "all") => {
    setOn(t);
    document.querySelectorAll<HTMLElement>("[data-demo-task]").forEach((el) => {
      el.hidden = t !== "all" && el.dataset.demoTask !== t;
    });
  };
  return (
    <div role="group" aria-label="Choose a task" className="action-row" style={{ flexWrap: "wrap" }}>
      {[{ id: "all" as const, label: "All demonstrations" }, ...tasks].map((t) => (
        <button
          key={t.id}
          type="button"
          aria-pressed={on === t.id}
          className={on === t.id ? "btn btn-primary" : "btn btn-ghost"}
          onClick={() => apply(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
