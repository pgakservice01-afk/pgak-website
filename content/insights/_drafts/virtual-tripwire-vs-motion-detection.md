---
title: "Virtual tripwire versus motion detection: choose the right rule"
metaTitle: "Line crossing detection vs motion detection: which rule?"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "Motion detection asks whether pixels changed. A virtual tripwire asks whether something crossed a line, in which direction, at what hour. One scene, both rules, a week of logs — and how to read the result."
metaDescription: "Line crossing (virtual tripwire) alerts when an object crosses a drawn line in a set direction; motion fires on any pixel change. Test both on one scene."
readTime: 6
draft: true
reviewStatus: "Awaiting PGAK engineer review. Perimeter/intrusion and line crossing are UNVERIFIED for PGAK (no evidence record); the article describes how to evaluate rules and claims no PGAK performance. All test results are hypothetical. Engineer to confirm the description of how recorders implement line crossing (pixel-based versus class-filtered) is fair as general information. Sibling drafts (person-vehicle-detection-alert-design, ai-cctv-alert-response-sop) are not linked because they are not live yet; add links on promotion."
faqs:
  - q: "What is a virtual tripwire on a CCTV camera?"
    a: "A line you draw on the camera view. The system raises an event when an object crosses it, optionally only in one direction and only during set hours. On better systems the object must first be classified as a person or vehicle; on simpler ones any moving blob that crosses the line counts."
  - q: "Is line crossing detection better than motion detection?"
    a: "For a boundary or doorway, usually yes: it ignores movement that does not cross the line and can ignore one direction, so it produces far fewer alerts. Motion detection still suits places where any movement at all is the event, such as a locked store room. Test both on the same scene before deciding."
  - q: "How do I set the direction of a line-crossing rule?"
    a: "Direction is defined by how the line is drawn — usually from point A to point B, with crossings counted as left-to-right or right-to-left of that line. Check it with a staged walk in each direction rather than trusting the arrow on screen; reversed directions are a common setup mistake."
---

**Straight answer: motion detection fires whenever enough pixels change anywhere in its area; a virtual tripwire (line crossing) fires only when an object crosses a line you drew, in the direction you chose, during the hours you armed. For boundaries, gates and doorways a tripwire is usually the better rule because it ignores everything that does not cross. Motion still fits where any movement at all is the event. The reliable way to choose is to run both on the same scene for a week and keep a log.**

The mechanics of classification are covered in [how AI intrusion detection works](/insights/how-does-ai-intruder-detection-work). This article is narrower: given one camera and one opening, which rule should you arm, and how do you prove it?

## Three rule types, side by side

| | Motion detection | Zone intrusion | Line crossing (tripwire) |
|---|---|---|---|
| Fires when | Pixels change in the area | An object is inside the zone (often for a minimum time) | An object crosses the line |
| Knows direction? | No | No | Yes, if set |
| Ignores weather and shadows? | No | If class-filtered | If class-filtered |
| Good for | A locked room where nothing should move | Areas nobody should be in at all — a yard, a roof | Thresholds: gates, wall tops, bay mouths, doorways |
| Typical weakness | Rain, insects, headlights, trees | Person skirting the zone edge | Person crossing beyond the end of the line, or where the line is too short |

**Check whether your tripwire is class-filtered.** On some recorders, "line crossing" is still pixel-based underneath: a moving shadow that crosses the line counts. Others offer a person/vehicle filter on the same rule. The test below will show you which you have.

## Where to put the line

- **Across the path, not along it.** A line drawn along a wall top in a camera looking down the wall is crossed by every bird and swaying creeper. A line across the gap a person must pass through is crossed only by things that pass through it.
- **Longer than the opening.** Extend it a metre or two past each gatepost, so someone cannot step round the end.
- **Where people are large enough.** Put it at a point where a person is clearly recognisable in the frame, not at the far edge — see [resolution versus distance](/insights/camera-resolution-vs-distance).
- **Away from the frame edge.** Objects entering at the edge are often cut off and tracked poorly.
- **On the ground where feet fall.** Many systems judge crossing by the bottom of the object's box; a line drawn at waist height in the image can behave unexpectedly.

## The test: one scene, two rules

Pick one camera that watches an opening — a rear gate, a dock, a wicket door. Arm **Rule A** (motion) and **Rule B** (line crossing) on the same scene for the same week, sending both to a log rather than to the guard's phone during the trial.

**Set-up (illustrative example).** A hypothetical rear gate, viewed from inside the plot.

| | Rule A — motion | Rule B — line crossing |
|---|---|---|
| Area / line | The gate and the road beyond it | A line on the ground across the gateway, extended 1.5 m past each pillar |
| Direction | — | Inward only (road → plot) |
| Class | — (motion has none) | Person and vehicle |
| Schedule | 21:00–06:00 | 21:00–06:00 |
| Sensitivity / minimum time | Recorder default | None |

**Staged passes.** With the guard informed, a staff member makes 10 crossings inward and 10 outward, spread over two nights, including two that cross close to a pillar.

**False-alarm log.** Every event from both rules, every night:

| Night | Time | Rule | What caused it | Wanted? |
|---|---|---|---|---|
| 1 | 21:42 | A | Headlights on the road | No |
| 1 | 21:42 | B | — | — |
| 1 | 23:10 | A | Staged inward crossing | Yes |
| 1 | 23:10 | B | Staged inward crossing | Yes |
| 1 | 23:20 | A | Staged outward crossing | No — leaving is not the event |
| … | … | … | … | … |

**Results after seven nights (illustrative example).**

| | Rule A — motion | Rule B — line crossing |
|---|---|---|
| Events logged | 212 | 9 |
| Staged inward crossings alerted | 10 of 10 | 9 of 10 |
| Staged outward crossings alerted | 10 of 10 (unwanted) | 0 of 10 (correct by design) |
| Other events | 192: headlights, rain, dogs, the road | 0 |
| Events a guard would have had to check per night | 212 ÷ 7 ≈ 30 | 9 ÷ 7 ≈ 1.3 |

**Reading it.** Rule A caught every inward crossing, but buried them in about 30 events a night; nobody would keep reading those. Rule B produced about one event a night and missed one staged crossing — the one that went past the end of the line at the left pillar. The fix is to **extend the line**, then repeat the 10 inward passes, not to fall back to motion. Ten passes cannot give an accuracy figure; they can show a rule is broken, which is what you need.

If Rule B had logged headlights and rain too, that would tell you your recorder's line crossing is pixel-based. A class-filtered rule, or better camera placement, would then be the next thing to evaluate.

## Direction and schedule: the two settings people get wrong

- **Direction is defined by how the line was drawn**, usually A→B with crossings counted to one side. Always confirm with a staged walk each way.
- **Schedule by the site's real routine.** Shift ends, Sundays, festival closures and night dispatches all change the armed hours. A line that is armed while the night shift walks through it will be muted in a day.

## When motion detection is still the right rule

- A locked store room, server room or cash office after hours, where *any* movement is the event and weather does not reach the camera.
- A scene where people may enter from any direction and there is no threshold to draw.
- As a cheap first step on an old recorder, provided someone actually reads the alerts.

And sometimes neither: if the opening can simply be locked and lit, do that first.

## Limitations

- A line only sees what the camera sees. Blind spots and poor night images defeat any rule; see the [blind-spot site-plan exercise](/insights/cctv-blind-spots-where-thieves-look).
- Crowded scenes break tracking, and two people crossing together may count once.
- **No PGAK figure.** Perimeter and line-crossing detection have no PGAK evidence record; they can be evaluated at your site with this test, which is equally the fair test for a recorder's built-in rule or any supplier's analytics.
- An alert still needs a person to look and a person to act. Track your false and missed events separately, as described in [reducing false alarms without hiding real incidents](/insights/ai-cctv-false-alarms-how-to-reduce).

## Next step

Put your Rule A and Rule B event counts into the [Intrusion and line crossing calculator](/features/intrusion-alerts#scenario-C07) and the [false-alarm cost calculator](/calculators/false-alarm-cost) to see the review time each would cost; the [intrusion alerts](/features/intrusion-alerts) page covers lines, zones and schedules. If you would like the two-rule test set up on your own camera and read with you, [ask for a site-specific assessment](/free-audit).
