# Original PGAK assets — provenance

Everything listed here is PGAK's own material. Everything *not* listed here and
moving on this site is third-party reference footage and is labelled as such on
the page; that labelling does not get removed because we now have some of our
own.

| File | What it is | Supplied | Published | Notes |
| --- | --- | --- | --- | --- |
| `public/proof/anpr-camera-mount.webp` | Photograph of a PGAK ANPR camera fitted to a gate pillar, with the mounting height and angle annotated on the image | Owner, 2026-09-24 | `/anpr-number-plate-recognition` | 1000×1501, 135 KB |
| `public/proof/anpr-gate-console.webp` | Screenshot of the PGAK Gate Console — live vehicle reads, approve/deny, allow-list labels, per-read diagnostics | Owner, 2026-09-24 | `/anpr-number-plate-recognition` | 1440×1000, 44 KB. **Plates redacted** |

| `public/proof/dock-count.webp` | Frame from PGAK dock-counting footage — counting line with live in/out counters, evening unload | Owner, 2026-09-24 | `/ai-cctv-for-warehouses` | 1400×787, 120 KB. **Transport company name and phone numbers blurred** |

## The redaction, and why it matters

Two versions of the console screenshot were supplied: one with readable number
plates and one with them blurred. **Only the redacted version is published.**

An Indian registration number identifies a vehicle and through it a person, so
it is personal data. Publishing four of them on a marketing page would be a
disclosure of other people's data — on a page that tells buyers to take DPDP
seriously, which would be a poor advertisement for our judgement.

The redaction was checked before publishing rather than assumed: both the plate
text and the plate crop thumbnails are blurred on every visible card, including
the partially cut-off one at the bottom. No character is recoverable.

**The unredacted version is not in this repository and should not be added.**

The dock frame required the same treatment for a different reason. The lorry
carries a transport association's name and three telephone numbers painted
along its side, legible in the footage. Those belong to a third party who has
no relationship with this website, so they are blurred. Verified after
blurring: no lettering or digits are recoverable.

### The source video is not published

`stock counter.mp4` is H.264 and would play in a browser, but it is **not**
published, for three reasons:

1. The phone numbers are legible for the whole 57 seconds. Blurring a still is
   a one-line operation; blurring video needs a re-encode.
2. 52 MB for 57 seconds — about 7.4 Mbps. That is a heavy download for a
   marketing page even behind `preload="none"`.
3. Its `moov` atom sits after `mdat`, so it is not fast-start and cannot begin
   playing until the container index has been fetched from the end.

A trimmed, blurred, fast-start H.264 export of roughly 10-15 seconds would be
publishable. That needs an encoder this machine does not have.

## What these two images do and do not establish

They show the system exists, is installed on a real gate and is in daily use —
which nothing on this site previously did. They are one gate, one camera
position and one set of lighting conditions. They are not a measurement of read
accuracy, and the page says so.

## Still outstanding

`DEMO_RECORDING_BRIEF.md` still applies: there is no moving footage of an event
being detected, an alert arriving and an operator acting on it. These two
images cover ANPR only. The other 17 featured solutions still have no original
material, and five feature cards still have no illustration at all.
