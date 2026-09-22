import { test } from "node:test";
import assert from "node:assert/strict";

import {
  LOCATIONS,
  NEARBY_MAX_KM,
  distanceKm,
  getLocation,
  resolveLocationName,
} from "./locations.ts";

/**
 * Run with:  npm run test:locations
 *
 * "Nearby" is a factual geographic claim on a public page. Before 2026-09-22
 * the Mumbai page listed Delhi NCR and Bengaluru as "near Mumbai" — both are
 * more than 800 km away. These tests keep that class of error from returning.
 */

test("every nearby entry resolves to a real location", () => {
  for (const l of LOCATIONS) {
    for (const n of l.nearby) {
      assert.ok(resolveLocationName(n), `${l.slug}: "${n}" does not resolve`);
    }
    for (const n of l.otherCities ?? []) {
      assert.ok(resolveLocationName(n), `${l.slug}: "${n}" does not resolve`);
    }
  }
});

test(`every nearby entry is within ${NEARBY_MAX_KM} km`, () => {
  for (const l of LOCATIONS) {
    for (const n of l.nearby) {
      const other = resolveLocationName(n)!;
      const km = distanceKm(l.geo, other.geo);
      assert.ok(
        km <= NEARBY_MAX_KM,
        `${l.city} → ${other.city} is ${Math.round(km)} km; move it to otherCities`
      );
    }
  }
});

test("a city is never nearby itself or listed twice", () => {
  for (const l of LOCATIONS) {
    const slugs = [...l.nearby, ...(l.otherCities ?? [])].map(
      (n) => resolveLocationName(n)!.slug
    );
    assert.ok(!slugs.includes(l.slug), `${l.slug} lists itself`);
    assert.equal(new Set(slugs).size, slugs.length, `${l.slug} lists a city twice`);
  }
});

test("Mumbai does not call Delhi NCR or Bengaluru nearby", () => {
  const mumbai = getLocation("mumbai")!;
  const near = mumbai.nearby.map((n) => resolveLocationName(n)!.slug);
  assert.ok(!near.includes("delhi-ncr"));
  assert.ok(!near.includes("bengaluru"));
  const other = (mumbai.otherCities ?? []).map((n) => resolveLocationName(n)!.slug);
  assert.deepEqual(other.sort(), ["bengaluru", "delhi-ncr"]);
  assert.ok(distanceKm(mumbai.geo, getLocation("delhi-ncr")!.geo) > 1000);
});

test("aliases and spellings resolve without substring guessing", () => {
  assert.equal(resolveLocationName("Bangalore")?.slug, "bengaluru");
  assert.equal(resolveLocationName("Gurgaon")?.slug, "gurugram");
  assert.equal(resolveLocationName("New Delhi")?.slug, "delhi-ncr");
  assert.equal(resolveLocationName("Chandigarh & Mohali")?.slug, "chandigarh-mohali");
  assert.equal(resolveLocationName("Chandigarh–Mohali")?.slug, "chandigarh-mohali");
  assert.equal(resolveLocationName("mandi gobindgarh")?.slug, "mandi-gobindgarh");
  // A state or region is not a city, and partial names must not match.
  assert.equal(resolveLocationName("Punjab"), undefined);
  assert.equal(resolveLocationName("Delhi NCR Noida"), undefined);
  assert.equal(resolveLocationName("Mandi"), undefined);
});

test("slugs and geo references are unique and plausible for India", () => {
  assert.equal(new Set(LOCATIONS.map((l) => l.slug)).size, LOCATIONS.length);
  for (const l of LOCATIONS) {
    assert.ok(l.geo.lat > 6 && l.geo.lat < 37, `${l.slug} lat`);
    assert.ok(l.geo.lng > 68 && l.geo.lng < 98, `${l.slug} lng`);
  }
});
