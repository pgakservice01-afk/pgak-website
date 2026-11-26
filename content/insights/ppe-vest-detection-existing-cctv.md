---
title: "Safety vest detection with existing CCTV: what it can see"
metaTitle: "Safety Vest Detection on CCTV: What It Can See"
date: "2026-11-26"
category: "Monitoring"
excerpt: "Thinking of checking reflective jackets and safety vests with the cameras you already have? Here is what a vest check needs from the camera view, and how to test it before you rely on it."
metaDescription: "Can existing CCTV check safety vests and reflective jackets? See what camera angle, distance and light a vest check needs, and how to test it on your site."
readTime: 5
image: "/insights/covers/ppe-vest-detection-existing-cctv.webp"
faqs:
  - q: "Can existing CCTV cameras detect safety vests?"
    a: "Sometimes. It depends on the camera angle, the distance to people, the lighting and the video quality. A vest check needs a clear view of the upper body. Test it on your own cameras at the agreed spot before you rely on it for any safety decision."
  - q: "Does vest detection replace a safety supervisor?"
    a: "No. A vest alert is a prompt for a person to look at the video and act. Supervisors still decide what a missing vest means, because a worker may be in a permitted area or may have just removed it. The software only points to where to look."
  - q: "What conditions make vest detection harder?"
    a: "Distance, a camera mounted too high, backlight at a gate, dust, rain, night footage, and people overlapping each other can all reduce clarity. Vests in unusual colours or covered by another layer can also be difficult. Run the test in the worst conditions you expect, not only in the best."
---

## The question behind the camera

A supervisor walks the yard and sees a worker without a reflective jacket near moving vehicles. He tells the worker. Ten minutes later it happens again at another gate. Nobody can stand at every gate all day.

So the question comes up: can the cameras we already have check for safety vests? The honest answer is "it depends on the view". This guide explains what a vest check needs, where it struggles, and how to test it before you rely on it.

## What a vest check actually does

The software looks at each person in the video and decides whether a vest or reflective jacket is visible on the upper body. If the rule says a vest is required in that zone and none is seen, it can raise an alert for a person to review.

Two things matter here.

- It is a visual guess about what the camera sees, not a fact about the worker.
- It runs on a chosen zone and a chosen rule. "Vest required at the loading gate" is a rule. "Check everyone everywhere" is not a good rule to start with.

PGAK's published PPE demonstration covers one class, gloves, on an existing overhead line camera, and states its conditions. See the [PPE detection guide](/features/guides/ppe-detection) for what that recording does and does not show. It is not a claim about vests on your site, and any vest check needs its own test.

## What the camera view must give you

Most vest-check problems are camera problems, not software problems. Look at one frame from the camera and ask these questions.

- **Can you see the upper body clearly?** If people appear as small figures far away, the vest may be only a few pixels wide.
- **Is the angle reasonable?** A camera looking straight down from a high pole shows heads and shoulders, not chests. A camera at about head height or a little above, looking along the path people walk, usually shows more.
- **What is behind the person?** A bright sky or open gate behind a walking person can turn them into a dark shape.
- **How many people overlap?** At shift change, workers walk in a group and cover each other.

You can estimate how far a camera can see useful detail with the [resolution and distance guide](/insights/camera-resolution-vs-distance). It is a good first filter before you test anything.

## Where vest detection struggles

Plan for these cases before you trust any alert.

- **Night and low light.** Infrared video loses colour. Reflective material can glare in an infrared picture and look different from daytime. See [how to test CCTV night vision](/insights/how-to-test-cctv-night-vision) for a way to check your own cameras after dark.
- **Rain, dust and fog.** A dirty lens or heavy dust softens the picture.
- **Other layers.** A coat over a vest, or a vest worn under a jacket, may hide it.
- **Colour and style.** Vests come in different colours and designs. Tell the supplier which ones your site uses, and test those exact ones.
- **Look-alikes.** An orange or yellow shirt may be taken for a vest in some scenes.

None of this means the idea is poor. It means the first test should include your hardest conditions, not your easiest.

## How to test a vest check on your site

Keep the test small and written down.

1. **Pick one place.** A gate, a loading bay or a walkway where the rule is clear and the camera is fixed.
2. **Write the rule.** For example: "Anyone walking on this path between 6 am and 8 pm must wear a vest."
3. **Collect real video.** At least one full shift in normal light, and some footage in the worst light you expect.
4. **Note what a person sees.** Have a supervisor review a sample of the video and mark who wore a vest and who did not.
5. **Compare with the alerts.** Count the alerts that were right, the alerts that were wrong, and the people without vests that raised no alert.
6. **Decide what you will accept.** Agree in advance what level of wrong alerts and missed cases is workable for your team.

The [evaluation method](/resources/evaluation-method) page describes how PGAK approaches testing in general. For safety rules, never treat a clean test day as proof that every future day will be the same.

## Who looks at the alert, and what happens next

An alert that nobody reads is no better than no alert. Decide these points early.

- Who gets the alert, and on which device?
- How quickly should they look at the video?
- What do they do if a vest is truly missing? Speak to the worker, call a supervisor, stop vehicles?
- What do they do if the alert is wrong? Is there a simple way to note it so the rule can be reviewed?

Workers should also know the cameras are used for this purpose. If you record people at work, read [what you may and may not record](/insights/cctv-workplace-privacy-india) and decide who may view the footage. A safety check should help workers, not feel like a trap.

## Should you do it with the cameras you have?

Often a feasibility check can tell you quickly. The deciding facts are the camera model, mounting position, distance, light and how the video reaches the analytics software. If one gate camera gives a clear view of people walking towards it, a pilot may be reasonable. If your cameras look down from high poles across a wide yard, a vest check is unlikely to work well there, and a better camera position may be needed first.

Start with one gate, one rule and one shift of video. Learn from that before you extend it.

## Frequently asked questions

### Can existing CCTV cameras detect safety vests?

Sometimes. It depends on the camera angle, the distance to people, the lighting and the video quality. A vest check needs a clear view of the upper body. Test it on your own cameras at the agreed spot before you rely on it for any safety decision.

### Does vest detection replace a safety supervisor?

No. A vest alert is a prompt for a person to look at the video and act. Supervisors still decide what a missing vest means, because a worker may be in a permitted area or may have just removed it. The software only points to where to look.

### What conditions make vest detection harder?

Distance, a camera mounted too high, backlight at a gate, dust, rain, night footage, and people overlapping each other can all reduce clarity. Vests in unusual colours or covered by another layer can also be difficult. Run the test in the worst conditions you expect, not only in the best.

[Ask for a free feasibility check](#dealer).
