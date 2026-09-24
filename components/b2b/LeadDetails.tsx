"use client";
import { useRef, useState } from "react";
export default function LeadDetails({
  receiptRef,
  token,
}: {
  receiptRef: string;
  token: string;
}) {
  const [state, setState] = useState("idle"),
    busy = useRef(false);
  return (
    <details className="mt-6">
      <summary className="cursor-pointer font-semibold">
        Add project details (optional)
      </summary>
      <p className="my-4">
        Your enquiry is already received. Leaving now will not erase it. Do not
        include passwords, footage or access links.
      </p>
      <form
        method="post"
        action="/api/lead-details"
        aria-label="Optional project details"
        onSubmit={async (e) => {
          e.preventDefault();
          if (busy.current) return;
          busy.current = true;
          setState("sending");
          const data = new FormData(e.currentTarget);
          try {
            const res = await fetch("/api/lead-details", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ref: receiptRef,
                token,
                details: Object.fromEntries(data),
              }),
              keepalive: true,
            });
            const body = await res.json();
            setState(res.ok && body.ok ? "done" : "error");
          } catch {
            setState("error");
          } finally {
            busy.current = false;
          }
        }}
      >
        {[
          ["company", "Company"],
          ["location", "Site location"],
          ["equipment", "Camera / recorder model (no credentials)"],
          ["timeline", "Proposed timeline"],
        ].map(([name, label]) => (
          <label className="buyer-field" key={name}>
            {label}
            <input
              name={name}
              maxLength={180}
              autoComplete={name === "company" ? "organization" : "off"}
            />
          </label>
        ))}
        <button
          className="btn btn-ghost"
          disabled={state === "sending" || state === "done"}
        >
          {state === "sending" ? "Saving…" : "Save optional details"}
        </button>
        <p role={state === "error" ? "alert" : "status"}>
          {state === "done"
            ? "Details saved with your original enquiry."
            : state === "error"
              ? "Details were not saved. Keep these fields and try again. Your original enquiry remains received."
              : ""}
        </p>
      </form>
    </details>
  );
}
