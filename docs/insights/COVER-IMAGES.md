# Insight cover images

Every article under `content/insights` now sets `image:` in its frontmatter.
Two kinds of cover exist, and they are not interchangeable.

## 1. Bespoke covers (6 articles)

`/public/insights/*.webp` — `attendance`, `camera-setup`, `control-room`,
`false-alarms`, `reactive-vs-proactive`, `security-basics`.

These carry a baked-in headline and PGAK branding ("YOUR TEAM CAN ONLY WATCH A
FEW", "RECORDS THEFT. IT DOESN'T STOP IT"). Each was made for one specific
article, so **do not reuse them on other posts** — the headline would argue
something the article does not.

## 2. Category covers (74 articles)

`/public/insights/category/<slug>.webp`, one per category, 1600×900 WebP:

| Category | Files | Source |
| --- | --- | --- |
| Attendance | `attendance.webp`, `-2`, `-3` | Pexels 37538043, 13657444, 7824263 |
| Security Basics | `security-basics.webp`, `-2` | Pexels 12689714, 29280895 |
| Camera Setup | `camera-setup.webp`, `-2`, `-3` | Pexels 10143239, 31306020, 19653611 |
| Buying Guide | `buying-guide.webp`, `-2`, `-3` | Canva AI image (design `DAHWA5BoWvA`), Pexels 4483555, 4487363 |
| Compliance | `compliance.webp`, `-2`, `-3` | Pexels 7658352, 7735769, 8296977 |
| Warehouse Security | `warehouse-security.webp` | Pexels 36398150 |
| Retail | `retail.webp` | Pexels 26861411 |

Categories with many articles carry two or three variants. The insights index
is date-sorted, so each category's articles are assigned round-robin in that
same order — which is what stops three identical covers landing side by side
in the grid. If you add an article, re-run that distribution rather than
picking a variant by hand.

Alerts, Monitoring and Proactive Security have one article each, and each of
those already has a bespoke cover, so they need no category image.

### What these images are, and are not

They are stock photographs (Pexels Licence: free for commercial use, no
attribution required) and one AI-generated image. **None of them is a
photograph of a PGAK installation**, and none should be captioned or described
as one. They were chosen to be neutral: no readable third-party branding, no
signage, and no text, so one image can sit above eleven different articles
without contradicting any of them.

Candidates rejected for exactly those reasons: a dome camera with a legible
manufacturer name, a street scene with a shopfront's name in frame, and an
office shot with another company's logo on the glass.

### Replacing one

Drop a new 1600×900 WebP at the same path — no frontmatter changes needed. If
you ever commission real photography of a PGAK site, prefer it over these, and
record on this page which deployment it shows.
