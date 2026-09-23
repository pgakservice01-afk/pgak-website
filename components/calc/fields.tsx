"use client";

import { useId } from "react";

/**
 * Calculator inputs.
 *
 * Every value is typed directly: a slider alone cannot express "₹1,47,500",
 * and on a phone it is the worst possible control for a number someone is
 * reading off a quotation. Where a slider helps (coarse exploration) it is
 * offered ALONGSIDE the field, never instead of it.
 *
 * "Unknown" is a first-class answer. A cost nobody has yet is `null`, which
 * the engine treats as incomplete — not as zero.
 */

export function NumberField({
  label,
  unit,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  hint,
  error,
  allowUnknown = false,
  slider = false,
}: {
  label: string;
  unit: string;
  value: number | null;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  error?: string;
  allowUnknown?: boolean;
  slider?: boolean;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errId = `${id}-err`;
  const unknown = value === null;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.9rem] font-medium text-ink">
        {label} <span className="text-ink-soft">({unit})</span>
      </label>

      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className="field-input w-full"
          value={unknown ? "" : String(value)}
          min={min}
          max={max}
          step={step}
          placeholder={unknown ? "Not known yet" : undefined}
          aria-describedby={`${hint ? hintId : ""} ${error ? errId : ""}`.trim() || undefined}
          aria-invalid={error ? true : undefined}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") return onChange(allowUnknown ? null : 0);
            const n = Number(raw);
            onChange(Number.isFinite(n) ? n : 0);
          }}
        />
        {allowUnknown && (
          <label className="flex shrink-0 items-center gap-1.5 text-[0.82rem] text-ink-soft">
            <input
              type="checkbox"
              checked={unknown}
              onChange={(e) => onChange(e.target.checked ? null : 0)}
            />
            Not known
          </label>
        )}
      </div>

      {slider && !unknown && max !== undefined && (
        <input
          type="range"
          className="range w-full"
          min={min}
          max={max}
          step={step}
          value={value ?? 0}
          aria-label={`${label} slider`}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}

      {hint && (
        <p id={hintId} className="text-[0.82rem] text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="text-[0.82rem] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-b-0">
      <span className="text-[0.9rem] text-ink-soft">{label}</span>
      <span className={strong ? "text-[1.05rem] font-semibold text-ink" : "text-[0.95rem] text-ink"}>
        {value}
      </span>
    </div>
  );
}

/** Used wherever a number depends on an assumption the visitor can change. */
export function AssumptionNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 rounded-[10px] border border-line bg-panel-2 p-3 text-[0.85rem] leading-relaxed text-ink-soft">
      {children}
    </p>
  );
}
