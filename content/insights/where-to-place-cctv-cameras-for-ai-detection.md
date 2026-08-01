---
title: "Where to place CCTV cameras so AI detection actually works"
date: "2026-07-25"
category: "Camera Setup"
excerpt: "The most common reason AI detection underperforms isn't the software — it's a camera mounted four metres up in a corner, seeing everything and identifying nothing."
readTime: 5
---

We audit a lot of camera estates. The pattern is consistent enough to be predictable: cameras high, cameras in corners, cameras covering the maximum floor area possible.

That layout was rational when the goal was recording. It is close to the worst possible layout when the goal is recognition.

## The height problem

A camera mounted four metres up looking down at a 45° angle sees the tops of heads.

For motion detection that's fine — a person is a moving blob whether you're looking at their face or their hair. For anything involving identity, it's fatal. Face recognition needs to see a face, and no increase in resolution recovers an angle that was never there.

The general rule: the further a camera is from eye level, the more it can tell you *that* someone is there and the less it can tell you *who*.

## Two jobs, two camera types

The fix is not to remount everything. It's to accept that cameras do two different jobs and to stop asking one camera to do both.

**Overview cameras** go high and wide. They cover area, detect presence, track movement across a space, and answer "was anyone in the yard last night". Your existing estate is probably already good at this.

**Identity cameras** go at roughly 1.6–2m, facing the direction people approach from, covering a narrow choke point. One per entrance is usually enough. This is the camera most sites are missing, and it's typically the only hardware we recommend adding.

## Choke points beat coverage

For recognition, you want people funnelled through a predictable path facing a predictable direction. Gates, doorways, turnstiles, corridor ends, the top of a staircase.

A camera covering a wide-open yard will catch people at every angle and identify almost none of them. The same camera at the single gate everyone enters through will identify nearly all of them. Coverage area is the wrong metric here; approach angle is the right one.

## Lighting, and the mistake everyone makes

The most common lighting error is pointing a camera at a doorway with bright daylight behind it. Every person walking in becomes a silhouette. The camera is working perfectly and the footage is useless.

Where possible, point identity cameras *away* from windows and open shutters, so faces are lit from the front. Where that isn't possible, an inexpensive light above the door — aimed at faces, not at the lens — fixes it more reliably than a better camera would.

At night, check what your infrared actually reaches. Many installed cameras claim 30m IR and produce a usable image at eight. Walk your own site at 11pm and look at the feeds; it's a fifteen-minute exercise that changes what you buy.

## Perimeters want a side view

For boundary detection, mount cameras so they see *along* the fence rather than straight at it.

A camera facing a wall head-on gets a few frames of someone crossing. A camera looking down the line of the fence sees the whole approach — which gives detection more to work with, and gives you a loitering signal before anyone actually crosses.

## The five-minute audit you can do yourself

For each area you care about, pull up the live feed and ask:

1. Can I see a face at the point where people enter? If no, that's an identity gap.
2. Is there a bright window or shutter directly behind that entry point?
3. At night, is the image usable at the distance that matters, or just at three metres?
4. On perimeter cameras, am I looking along the boundary or at it?
5. Is anything permanently blocking a corner of the frame — a shelf, a banner, a stack of pallets that arrived last year?

That last one catches more problems than you'd expect. Camera views drift as sites change, and nobody is watching the feeds to notice.

## What this means before you buy anything

Almost every site we deploy on reuses its existing cameras and adds one. The overview estate is fine; the identity camera at the gate was never there.

That's a cheaper answer than replacing everything, and it's also the more effective one — because the failure was never resolution. It was angle.

---

**Related reading:** [Face recognition](/features/face-recognition) · [Smart perimeter protection](/smart-perimeter-protection) · [How many of your cameras can actually recognise a face?](/insights/how-many-of-your-cameras-can-actually-recognize-a-face)
