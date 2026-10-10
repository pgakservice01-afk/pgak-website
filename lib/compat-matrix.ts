/**
 * PGAK's tested camera/recorder matrix — the only source of a "Known tested"
 * verdict in the compatibility self-check.
 *
 * Empty on purpose: as of the date below PGAK has not published a dated test
 * record for any model and firmware. An entry may be added only with the
 * test's date, firmware, stream used, the use case tested and who tested it,
 * and it applies to that combination only — never to a brand, never to every
 * ONVIF device. Until then every model answers "Needs verification".
 */
export type MatrixEntry = {
  make: string;
  model: string;
  firmware: string;
  stream: "RTSP" | "ONVIF Profile S" | "ONVIF Profile T" | "Recorder channel";
  useCases: string[];
  testedOn: string; // YYYY-MM-DD
  testedBy: string;
  notes: string;
};

export const MATRIX_VERSION = "2026-10-10";
export const COMPAT_MATRIX: MatrixEntry[] = [];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Exact make+model match only. Partial or brand-only text never matches. */
export function findTested(makeModel: string, useCase: string, matrix: MatrixEntry[] = COMPAT_MATRIX) {
  const q = norm(makeModel);
  if (q.length < 4) return null;
  return (
    matrix.find((e) => norm(`${e.make}${e.model}`) === q && e.useCases.includes(useCase)) ?? null
  );
}
