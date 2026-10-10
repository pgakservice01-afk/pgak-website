# Live-claims correction pass (2026-10-08)

Minimal edits to user-facing strings in lib/capabilities.ts (face-recognition, false-alarm-filtering, intrusion-alerts, attendance-automation, loitering-detection, vehicle-and-anpr), lib/solutions.ts (remote-cctv-monitoring, anpr-number-plate-recognition, ai-intruder-detection, ai-cctv-for-warehouses, factory-security, face-recognition-attendance-system, video-analytics-software, attendance-system-for-schools, commercial-cctv, industrial-cctv, retail-shop-security, school-security, hospital-security) and four live articles (does-ai-cctv-work-without-internet, cctv-camera-offline-how-to-know, cctv-amc-what-should-it-include, does-ai-work-with-tapo-imou-qubo-cameras).

Pattern: "PGAK does X in N seconds / 90%+ / reliably" → "can be configured and tested at your site, confirmed in the written scope" or "PGAK has published no measured figure; it is measured at your site". No numbers or features added. ANPR auto-admission contradiction resolved: admission without stopping is something a site may configure and test, not a default. Schools: no student face templates. Hospitals: security tool, not clinical/patient monitoring.

Left for the owner (product/pricing facts that may be true):
1. "Billed per camera per month" remains in lib/faq.ts, lib/schema.ts (unitText), lib/whyPgak.ts, lib/buyerDecision.ts, app/brochure, lib/solutions.ts (~4 places) — confirm or retract the billing basis.
2. "Feasibility check and quote are free", "no hardware licence or per-feature surcharge".
3. multi-site-cctv-monitoring: "accounts in the region of ninety-plus cameras"; IPv6 handling.
4. Phone-based face enrolment (face-recognition-attendance-system, schools).
5. Automatic camera discovery (Tapo article).
6. ANPR captions: "No new pole, no civil work, one cable run", "tilted roughly 20 degrees".
7. Outcome-leaning titles/H1s (retail "Catches Theft", loitering "Spot It Before the Theft", school "knows who belongs").
8. ai-intruder-detection: "virtually every DVR/NVR installed in the last decade… PGAK connects", "24×7 every camera watched".
9. "Alerting continues through an internet outage" (industrial, remote) — not separately evidenced.
