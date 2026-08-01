"use client";

/** Triggers the browser print dialog — "Save as PDF" is the download path. */
export default function PrintButton() {
  return (
    <button
      type="button"
      data-cta="print-brochure"
      onClick={() => window.print()}
      className="btn btn-ghost"
    >
      Print / save as PDF
    </button>
  );
}
