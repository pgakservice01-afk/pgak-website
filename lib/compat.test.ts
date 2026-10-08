import { test } from "node:test";
import assert from "node:assert/strict";

import { assess, type Answers } from "./compat.ts";

/** Run with:  npm run test:compat */

const base: Answers = {
  recorder: "nvr",
  cameras: "ip",
  stream: "yes",
  lan: "yes",
  power: "yes",
  useCase: "intrusion",
  dedicatedView: "yes",
  nightLight: "yes",
  internet: "yes",
};

test("never declares compatibility, even with every good answer", () => {
  const r = assess(base);
  assert.ok(r.findings.every((f) => f.level === "good"));
  assert.match(r.summary, /still confirmed on your actual cameras/);
  assert.ok(!/\bcompatible\b/i.test(JSON.stringify(r).replace(/Compatibility/g, "")));
});

test("no stream is a blocker", () => {
  const r = assess({ ...base, stream: "no" });
  assert.ok(r.findings.some((f) => f.area === "Stream" && f.level === "blocker"));
  assert.match(r.summary, /blocker/);
});

test("ANPR without a plate-facing camera is a blocker; intrusion is only a check", () => {
  assert.equal(assess({ ...base, useCase: "anpr", dedicatedView: "no" }).findings.find((f) => f.area === "Scene")!.level, "blocker");
  assert.equal(assess({ ...base, dedicatedView: "no" }).findings.find((f) => f.area === "Scene")!.level, "check");
});

test("app-only and cloud-only cameras are flagged, not rejected by brand", () => {
  const r = assess({ ...base, recorder: "cloud-only", cameras: "wifi-app" });
  assert.equal(r.findings.find((f) => f.area === "Recorder")!.level, "blocker");
  assert.equal(r.findings.find((f) => f.area === "Cameras")!.level, "check");
  assert.match(r.findings.find((f) => f.area === "Cameras")!.text, /model does/);
});

test("no internet blocks remote viewing but not on-site detection", () => {
  assert.equal(assess({ ...base, internet: "no", useCase: "remote" }).findings.find((f) => f.area === "Internet")!.level, "blocker");
  assert.equal(assess({ ...base, internet: "no" }).findings.find((f) => f.area === "Internet")!.level, "check");
});

test("never asks for credentials or stream addresses", () => {
  const text = JSON.stringify(assess({ ...base, stream: "unsure", recorder: "unsure" }));
  assert.match(text, /Do not send passwords/);
  assert.match(text, /not its login screen/);
});
