import { test } from "node:test";
import assert from "node:assert/strict";
import { contentDate, latestContentDate } from "./content-dates.ts";
import { pageMeta } from "./seo.ts";

test("hub lastmod reflects a refresh of an older post, independently of publication order", () => {
  assert.equal(latestContentDate([
    { date: "2026-10-20" },
    { date: "2026-07-31", updated: "2026-10-27" },
  ])?.toISOString(), "2026-10-27T00:00:00.000Z");
});

test("revision dates use UTC and empty/invalid collections do not invent freshness", () => {
  assert.equal(contentDate({ date: "2026-09-01" }).toISOString(), "2026-09-01T00:00:00.000Z");
  assert.equal(latestContentDate([]), undefined);
  assert.equal(latestContentDate([{ date: "invalid" }]), undefined);
});

test("historically excluded routes retain exact self canonicals and matching Open Graph URLs", () => {
  for (const path of [
    "/insights/dvr-vs-nvr-which-do-you-have",
    "/insights/face-recognition-low-light-gate",
    "/insights/ip-vs-analogue-cameras-india",
    "/insights/multi-location-attendance-management",
    "/ai-cctv-batala", "/ai-cctv-bathinda", "/ai-cctv-patiala",
  ]) {
    const meta = pageMeta({ title: "Test", description: "Test", path });
    assert.equal(meta.alternates?.canonical, `https://www.pgak.co.in${path}`);
    assert.equal(meta.openGraph?.url, `https://www.pgak.co.in${path}`);
  }
});
