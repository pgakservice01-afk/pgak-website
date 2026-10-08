/**
 * Camera compatibility self-check — the rules behind the wizard on
 * /platform/compatibility. Pure, no I/O (`npm run test:compat`).
 *
 * It never says "compatible". PGAK has no published model-and-firmware
 * approval list, so the honest output is a set of findings — good sign, check
 * needed, likely blocker — and what to bring to an assessment. It never asks
 * for passwords, stream URLs, IP addresses or footage.
 */

export type Answers = {
  recorder: "nvr" | "dvr" | "hybrid" | "cloud-only" | "unsure";
  cameras: "ip" | "analogue" | "wifi-app" | "mixed" | "unsure";
  stream: "yes" | "no" | "unsure";
  lan: "yes" | "no" | "unsure";
  power: "yes" | "no" | "unsure";
  useCase: "intrusion" | "anpr" | "face" | "ppe" | "counting" | "health" | "remote";
  dedicatedView: "yes" | "no" | "unsure";
  nightLight: "yes" | "no" | "na";
  internet: "yes" | "no";
};

export type Level = "good" | "check" | "blocker";
export type Finding = { area: string; level: Level; text: string };

export const USE_CASE_LABEL: Record<Answers["useCase"], string> = {
  intrusion: "After-hours intrusion alerts",
  anpr: "Number plates at a gate (ANPR)",
  face: "Face-recognition attendance",
  ppe: "PPE / safety checks",
  counting: "Counting sacks, cartons or people",
  health: "Camera health and recording checks",
  remote: "Viewing several sites remotely",
};

/** What the chosen use case needs from the scene, in one sentence. */
const SCENE_NEED: Record<Answers["useCase"], string> = {
  intrusion: "a view of the boundary or zone, covering where a person would actually walk",
  anpr: "a camera placed for plates — lane-facing, near plate height, where vehicles slow down; an overview camera rarely reads plates",
  face: "a camera at roughly face height where people pass one at a time, such as a gate or door, with even light on faces",
  ppe: "a clear view of the work area at enough resolution to see the item being checked (gloves, helmet)",
  counting: "a view across the line items cross, from above or at an angle where items do not hide each other",
  health: "nothing extra from the scene; it checks whether each stream is live and recording",
  remote: "nothing extra from the scene; it depends on the recorder being reachable through the site's internet connection",
};

export function assess(a: Answers): { findings: Finding[]; summary: string; bring: string[] } {
  const f: Finding[] = [];
  const add = (area: string, level: Level, text: string) => f.push({ area, level, text });

  // Recorder and cameras.
  if (a.recorder === "cloud-only")
    add("Recorder", "blocker", "Cameras that record only to an app or cloud often expose no local stream for an on-site processing unit. Some models do; it is model-specific.");
  else if (a.recorder === "unsure")
    add("Recorder", "check", "Photograph the recorder's label (make and model) — that decides which streams are available.");
  else if (a.recorder === "dvr")
    add("Recorder", "good", "Many DVRs provide a network stream per channel. Analogue resolution can still limit detail-heavy tasks such as plates and faces.");
  else add("Recorder", "good", "A network recorder usually provides a stream per camera; the exact model and firmware are still checked.");

  if (a.cameras === "wifi-app")
    add("Cameras", "check", "App-based Wi-Fi cameras vary: some models offer a standard local stream, many do not. A brand name does not settle it; the model does.");
  else if (a.cameras === "unsure" || a.cameras === "mixed")
    add("Cameras", "check", "List each camera's location and, if you can, its model. Mixed systems are common and are assessed camera by camera.");
  else add("Cameras", "good", a.cameras === "ip" ? "IP cameras normally provide a stream the processing unit can read." : "Analogue cameras are read through the recorder's channels.");

  // Stream and network.
  if (a.stream === "no")
    add("Stream", "blocker", "Without a standard stream (RTSP/ONVIF) the analytics cannot read the video. Options include enabling it, a firmware update, an encoder or a different recorder — each costs something and is quoted separately.");
  else if (a.stream === "unsure")
    add("Stream", "check", "Ask your installer whether the recorder offers RTSP or ONVIF streams. Do not send passwords or stream addresses to anyone in a message or form.");
  else add("Stream", "good", "A standard stream is the main prerequisite. It is tested on site, never collected over chat.");

  if (a.lan === "no")
    add("Network", "blocker", "The processing unit sits on the same local network as the recorder. If they cannot be connected, network work comes first.");
  else if (a.lan === "unsure") add("Network", "check", "Note where the recorder is and whether there is a network switch or router beside it.");
  else add("Network", "good", "A local connection to the recorder is available.");

  if (a.power === "no")
    add("Processing unit", "check", "Detection runs on a small on-site processing unit that needs power and a ventilated spot near the recorder. Some small works may be needed.");
  else if (a.power === "unsure") add("Processing unit", "check", "Check for a spare power point and shelf space near the recorder.");
  else add("Processing unit", "good", "Power and space for the on-site processing unit are available.");

  // Scene for the use case.
  const needsScene = a.useCase !== "health" && a.useCase !== "remote";
  if (needsScene) {
    if (a.dedicatedView === "no")
      add("Scene", a.useCase === "anpr" || a.useCase === "face" ? "blocker" : "check", `This needs ${SCENE_NEED[a.useCase]}. Without such a view, a camera may need moving or adding.`);
    else if (a.dedicatedView === "unsure") add("Scene", "check", `This needs ${SCENE_NEED[a.useCase]}. A still image of the current view settles it at the assessment.`);
    else add("Scene", "good", `You have a view for this; whether it is good enough (${SCENE_NEED[a.useCase]}) is checked on a still image.`);

    if (a.nightLight === "no")
      add("Lighting", "check", "If the event matters at night, the scene must be lit enough for the camera to see it. Do not reduce lighting people need for safety.");
  }

  if (a.internet === "no")
    add("Internet", a.useCase === "remote" ? "blocker" : "check", "Without internet at the site, detection and local recording can continue, but alerts to phones and remote viewing cannot reach anyone off site.");

  const blockers = f.filter((x) => x.level === "blocker").length;
  const checks = f.filter((x) => x.level === "check").length;
  const summary =
    blockers > 0
      ? `${blockers} likely blocker${blockers > 1 ? "s" : ""} to resolve first. An assessment can say what each would cost to fix, or whether another approach fits better.`
      : checks > 0
        ? `No obvious blocker, ${checks} point${checks > 1 ? "s" : ""} to check. A short assessment can settle these.`
        : "No obvious blocker on these answers. Compatibility is still confirmed on your actual cameras before anything is quoted.";

  const bring = [
    "A photo of the recorder's label (make and model) — not its login screen",
    "A list of camera locations and, where known, camera models",
    "One still image from each camera relevant to the use case",
    `What you want to happen: ${USE_CASE_LABEL[a.useCase].toLowerCase()}, when, and who should be told`,
    "Whether the site has internet, and who manages the network",
  ];
  return { findings: f, summary, bring };
}
