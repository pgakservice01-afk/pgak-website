# Recording brief: one PGAK demonstration clip

**Status: blocked on PGAK. No code can produce this.**

The three commercial pages can say what PGAK does, what it costs to scope, and
what happens after an enquiry. What they cannot do is *show* it. Every moving
image on the site today is Spot AI reference footage, correctly labelled as
such on the page. That label is the right thing to do and it also tells every
visitor that we have not shown them our own product.

## What exists in the repository today

| Asset | What it is | Usable as product proof? |
| --- | --- | --- |
| `public/media/real-time-response.mp4`, `camera-intelligence.mp4`, `event-context.mp4` | Spot AI reference footage | **No.** Third-party. The existing disclosure must stay exactly as it is. |
| `public/social/pgak-app-reel.mp4` | PGAK's own app-download reel for Instagram/Facebook. 1080×1920 vertical, H.264 | **No.** It is a promo for downloading the app, not a demonstration of detection, and it is the wrong shape for an on-page proof block. |
| `lib/reviews.ts` | Deliberately empty | Correct — no invented ratings. |
| `lib/caseStudies.ts` | 4 scenarios, visibly labelled illustrative | Correct as scenarios. Not evidence. |

So: **there is no original asset that shows the product working.**

## The one clip worth recording

Ninety seconds, one continuous story, on a site PGAK already has permission to
film. Four beats, in this order — the order is the point, because it is the
order the buyer experiences:

1. **The camera event.** Wide shot of the real scene: a person crossing a
   boundary line after hours, or a vehicle at a gate. Whatever the site
   actually has. Do not stage a break-in.
2. **PGAK processing it.** Screen recording of the interface as the event is
   classified — the detection box, the zone that was crossed, the timestamp.
3. **The alert arriving.** The phone, in hand, as the notification lands, with
   the clip attached. Show the real latency, whatever it is. If it takes eleven
   seconds, show eleven seconds.
4. **What the operator does next.** The person on duty opening the alert and
   taking the actual next step — calling the guard, checking the adjacent
   camera. This beat is the one competitors skip and the one buyers care about.

### Recording notes

- **Landscape, 1920×1080.** The vertical reel cannot be reused here.
- **Faces:** either enrolled staff who have consented on the record, or blur
  them. Do not publish a member of the public's face.
- **The site's identity:** no company signage, gate names or number plates in
  frame unless that customer has given written permission to be identified. A
  clip that has to be captioned "a customer in Ludhiana" is still proof.
- **No overlay text claiming a figure.** No "99% accurate", no "alerts in 2
  seconds". The clip is evidence of the mechanism, not a benchmark.
- **Capture the setup**, so the page can state it: camera model and position,
  lighting, distance to the subject, what was enabled. A demonstration whose
  conditions are stated is worth several that are not.

## What we must be able to write under it

Once the clip exists, the page states plainly:

> Recorded at **[site type, city]** on **[date]**, with **[n]** existing
> cameras. Shown: **[which analytic]**. Conditions: **[daylight/night, distance,
> camera height]**. Detection quality depends on the view a camera has; your
> own footage is tested before anything is quoted.

If any of that cannot be filled in truthfully, the clip does not go up.

## Until it exists

- No "video coming soon" block. An empty promise is worse than an honest gap.
- No synthetic screenshots, no mocked-up alerts, no invented customer results.
- The Spot AI footage keeps its existing disclosure and is not relabelled.

The pages ship without it and work without it. They just work less well, and
that is the cost of not having recorded it yet — not a reason to fake it.
