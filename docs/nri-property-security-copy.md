# /nri-property-security — final copy

For review without reading code. Build notes and the reasoning behind the
departures from the brief are in [`nri-property-security.md`](./nri-property-security.md).

Sections 6 (parents living alone) and 12 (testimonials) from the brief are
deliberately absent. Numbering below follows the brief so the two can be read
side by side.

---

## Metadata

**URL** `/nri-property-security`

**Title** (59 / 60)
> NRI Property Security Punjab | Watch Your Kothi From Abroad

**Meta description** (151 / 155)
> Empty kothi, farmhouse or plot in Punjab? PGAK turns the CCTV you already have into an AI guard that alerts your phone, wherever in the world you live.

**Social card** `/og-nri-property-security.webp`, 1200×630

---

## H1

> Your home in Punjab, protected while you're abroad

---

## 1. Hero

**Eyebrow** — For Punjabi families living abroad

**Positioning line**
> Your CCTV records the theft. PGAK tells you while it's happening.

**Subhead**
> An empty kothi, a farmhouse, a plot, or parents managing on their own. The cameras are already on the wall. PGAK is the part that watches them and sends an alert with a photo to your phone when someone is at your gate.

**CTAs** — `Chat on WhatsApp →` (primary) · `Free remote security check` (secondary)

**Pre-filled WhatsApp message**
> Hi PGAK, I'm an NRI and want to secure my property in Punjab.

Ad traffic appends a campaign marker, e.g. `[via: google/cpc/nri_doaba]`.

**Trust strip** — Works with the cameras you already have · Alerts on your phone, with a snapshot · Your rate quoted for your property, not printed here

---

## 2. The problem NRI families face

**Eyebrow** — What families actually deal with
**H2** — The distance is not the problem. Not knowing is.

**A locked kothi is a known address**
> A house that is dark every night, with no car in the gate and no lights on a festival, is readable from the street. The camera on the wall records whoever works that out. Nobody is watching it at 3am.

**Possession and encroachment**
> A boundary wall moved, a shed built on a corner of the plot, a tenant who stops leaving. These do not happen in one night — they happen slowly, and they are cheapest to deal with in the first week, not the first year.

**Caretakers you cannot check on**
> Most caretakers are honest. The problem is not dishonesty, it is verification: you are relying on a photo sent when someone chose to send it, and you have no way to know who came to the gate on a day nobody mentioned.

**Cameras that record but nobody watches**
> This is the real gap. The footage usually exists. It gets looked at after a neighbour phones — days later, when the only thing left to do is file a report. The recording was never the missing piece. Knowing in time was.

### Reported in Punjab, 2026

- Shots were fired at an NRI's locked house in Heran village, Ludhiana district, on 30 September 2026 — *Amar Ujala*.
- A locked NRI-owned house in Lakhan Ke Padda, Kapurthala district, was burgled in August 2026 — *Amar Ujala*.
- The Punjab and Haryana High Court has said cases of NRI property fraud cannot be treated lightly — *The Tribune*.

> We link these because they are current and documented, not to suggest any system would have changed what happened in them.

*(That closing line is a standing requirement, not decoration. Do not remove it.)*

---

## 3. How to protect NRI property in India from abroad

> Three steps, and the first one is usually already done.

**01 — Connect the cameras already on the wall**
> PGAK is software. It reads the streams from the DVR or NVR at your property over its internet connection, so the work starts with what is already installed rather than with a purchase.

**02 — Say what should count as unusual**
> A person at the gate after 10pm. Someone at the back door at all. A vehicle in the driveway when the house is meant to be empty. Your family and your caretaker are enrolled once, so the system stops reporting them and reports everyone else.

**03 — Get an alert on your phone, with a photo**
> The alert arrives in the PGAK app: the snapshot, which camera it came from and the time, so you can decide in ten seconds whether to call your cousin in the village or ignore it. Because it is an app notification rather than an SMS or a call, it reaches you the same way in Brampton as it would in Jalandhar — it does not depend on you keeping an Indian number alive.

---

## 4. Works with the CCTV you already have

> PGAK reads the streams from the recorder at your property, so the brand on the box matters less than whether the stream can be reached and what the camera can actually see. Hikvision, CP Plus, Dahua and most ONVIF or RTSP recorders are the common cases.

> Compatible cameras and recorders you already own are reused wherever they are suitable. Detection runs on an on-site processing unit, and camera suitability, stream access, processing hardware and network are all confirmed at the assessment — with anything extra itemised in the quote before you commit.

*(Second paragraph is `HARDWARE_NOTE_LONG` from `lib/offer.ts`. It replaces the brief's "no new hardware", which the repo forbids as an absolute.)*

### No Wi-Fi at the village house? — **[CONFIRM 1]**

> Then the question is what the cameras use instead. At a kothi standing empty or a farmhouse out by the tubewell, that is usually a 4G router or a SIM camera rather than a broadband line.

> What decides it is whether that connection has enough upload speed, steadily enough, for the number of cameras you want covered. It depends on the signal at that exact spot. We would rather establish it before you spend anything than guess on a web page.

> Send a photo of your recorder and the village name on WhatsApp. That is normally enough for us to tell you where you stand.

---

## 5. For every type of property

- **The empty kothi** — Months of nobody there, then three weeks of a full house. The rules can follow that: strict while the house is shut, relaxed when the family lands.
- **Farmhouse and tubewell** — Motors, cable, panels and pipe, usually out of sight of any neighbour. Theft here is quiet and repeat — the same place gets visited twice because the first visit went unnoticed.
- **Plot or agricultural land** — Nothing to steal, everything to lose. What matters on a vacant plot is a record of who came, what was unloaded and when a wall started moving.
- **A rented house** — Common areas, the gate and the boundary — so you know the property is being lived in as agreed. Cameras inside a tenant's home are not something we will help you set up; the law and the tenancy both say that space is theirs.
- **Your parents' home** — Here the point is usually the gate, not the people inside. Who rang the bell, which delivery actually arrived, whether the maid came on the day she said. Enrolled faces mean you are not pinged every time your own mother walks to the gate.

**Closing note (replaces the brief's Section 6)**
> One thing PGAK does not do: it is not a medical or fall-detection system, and it will not tell you that someone indoors has had a fall. It watches gates, doors, yards and boundaries. If what worries you is a parent's health rather than their gate, say so on WhatsApp and we will tell you honestly that this is not the product for it.

---

## 7. What decides your price

**No figure appears on this page.** See the build notes.

> Billing is per camera per month. We quote your rate on a call or on WhatsApp once we know the camera count — not because it is a secret, but because the number that would fit on this page would be wrong for most of the people reading it. Three things move it:

1. **How many cameras** you want watched — not how many are installed. Most people start with the gate, the main door and the boundary, and leave the indoor ones recording as they are.
2. **Whether the site needs a processing unit** on-site, and whether your recorder and connection can carry what you want. Confirmed at the check, itemised in the quote.
3. **One property or several** — a kothi and a farmhouse on the same account are not priced as two unrelated jobs.

> Setup, support, taxes and the contract term are written down before you commit, and you will have them in front of you in your own time zone rather than on a phone call you had to take at 6am.

Followed by the existing **guard-cost comparison** component, which asks the
visitor for the rate they were quoted and prints none of ours.

---

## 8. Normal CCTV and AI CCTV, side by side

| | CCTV on its own | The same cameras, with PGAK |
|---|---|---|
| **Who watches the footage** | Nobody, in practice. The recorder fills up and overwrites itself. | Software checks every frame on every camera and only involves you when a rule you set is broken. |
| **When you find out** | After someone tells you — a neighbour, a caretaker, or the damage itself. | While it is happening, as an alert on your phone with a snapshot attached. |
| **False alarms** | Motion alerts on wind, shadows, cats and headlights. Most people switch them off within a week. | Moving objects are classified before anything is sent, and your own family and staff are enrolled so they stop being reported. |
| **What you can do about it** | Export a clip and file a complaint. | Make a phone call while the person is still at the gate, with a photo you can forward to whoever goes to look. |

---

## 9. Areas we cover in Punjab

> Doaba first — Jalandhar, Hoshiarpur, Kapurthala, Phagwara and Nawanshahr — because that is where most NRI-owned property in Punjab sits. Because PGAK connects to a recorder over the internet, the district matters far less for setting it up than it does for physical work on a camera.

| District | Belt | City page |
|---|---|---|
| Jalandhar | Doaba | linked |
| Hoshiarpur | Doaba | linked |
| Kapurthala | Doaba | — |
| Phagwara | Doaba | — |
| Nawanshahr (SBS Nagar) | Doaba | — |
| Moga | Malwa | linked |
| Ludhiana | Malwa | linked |
| Amritsar | Majha | linked |
| Patiala | Malwa | linked |
| Bathinda | Malwa | linked |
| Mohali | Malwa | linked |

---

## 10. Families we serve abroad

Canada (Brampton, Surrey, Calgary) · United Kingdom (Southall, Birmingham,
Wolverhampton) · United States (California, New York, New Jersey) · Australia
(Melbourne, Sydney) · New Zealand (Auckland) · Italy (Reggio Emilia, Brescia)

> Alerts come through the PGAK app, so they reach you the same way wherever you are — nothing depends on you keeping an Indian number running, and there is no international SMS to pay for or miss. More than one person can be on the same property, which is how most families use it: you, your brother, and whoever is closest to the house.

> For talking to us rather than to the cameras, WhatsApp works across time zones. Write when it suits you and a reply will be waiting.

---

## 11. Who does the work at the property

**Eyebrow** — Being straight with you

> Most of what PGAK needs happens without anybody going to your house. It is software: it connects to the recorder already installed, over the connection already there, and the rules are set with you on a call.

> Physical work is a different thing, and we would rather tell you now than at the point it matters. If a camera needs re-aiming, a cable replacing or a power supply changing, somebody has to stand in front of it. That happens one of three ways:

- **The installer who fitted your system.** Usually the cheapest and quickest, because they know the cabling. We can talk to them directly about what we need.
- **A PGAK partner, where one covers your district.** Our dealer network is growing across Punjab, and we are signing partners in Doaba now. Ask what covers your district today — if the answer is nobody yet, we will say so.
- **Family or your caretaker, guided by us.** More of this is possible than people expect. Re-pointing a camera or restarting a recorder is usually a video call, not a technician.

> What we will not do is tell you someone is standing by in your village when they are not. If getting a person to the property is the hard part of your situation, say that first and we will be honest about what we can and cannot arrange.

---

## 13. FAQ

The eight questions below are also the FAQPage structured data — one array in
the code feeds both, so the schema cannot describe an answer the page does not
show.

**How do I protect my NRI property in India?**
> Start with what is already there. Most NRI-owned houses in Punjab already have CCTV; what they do not have is anyone watching it. PGAK connects to the cameras and recorder you already own and turns them into something that contacts you — an alert on your phone, with a photo, when a person is at the gate at an hour you said was unusual. Alongside that, the ordinary things still matter: papers in order, mutation records current, a trusted person who visits, and a boundary you can show was in one place on a particular date.

**Can I watch my Punjab house CCTV from Canada or the UK on my mobile?**
> Yes. You get live view in the PGAK app on your phone, the same as you would standing in the house. But the part that actually matters is the other direction: instead of you remembering to open an app and look, the app contacts you when something you told it to care about happens. Most people check live view constantly in the first month and almost never after that, which is exactly why the alert matters more than the access. Because it arrives as an app notification, it reaches you on your Canadian, British or Australian number just as it would on an Indian one.

**Can CCTV work without Wi-Fi at my village house or farmhouse?** — **[CONFIRM 1]**
> The cameras need some way to reach the internet, and at a village house or farmhouse that is usually a 4G router or a SIM camera rather than a fixed broadband line. Whether a particular setup carries enough upload speed, steadily enough, is the part that decides it — and it depends on the signal at that spot, the number of cameras and how the recorder is configured. That is precisely what the free remote security check is for: send us a photo of the recorder and tell us where the property is, and we will tell you whether your connection is enough before you spend anything.

**How much does CCTV monitoring cost?**
> Billing is per camera per month, and we quote your exact rate on a call or on WhatsApp once we know how many cameras you want covered and whether it is one property or several. We do not print a rate on the website, because the honest number depends on your camera count and what the site needs — and a figure on a page is the one thing nobody can give you a straight answer about later. Setup, any on-site processing hardware, support and taxes are itemised in writing before you commit.

**What is AI CCTV, and how is it different from normal CCTV?**
> Normal CCTV records. If something happens, the footage is there to look at afterwards. AI CCTV also looks at the footage as it arrives, and decides whether what it is seeing is a person, a vehicle or just wind in a tree. That one difference changes what the system is for: a recorder is evidence after the event, and alerts are a chance to do something during it. It is the same cameras either way — what changes is whether anything is paying attention between your visits.

**Who installs or repairs cameras if I am not in India?**
> Connecting PGAK does not usually need anyone at the property, because it is software reading streams from the recorder that is already installed. Physical work is different, and we will not pretend otherwise: a camera that needs re-aiming or a power supply that has died needs a person standing in front of it. In practice that is the installer who originally fitted your system, a PGAK partner where one covers your district, or a family member or caretaker working through it with us on a video call. We are adding partners across Doaba — ask us what covers your district today and we will tell you plainly, including when the answer is nobody yet.

**Will I get false alarms from animals or wind?**
> Far fewer than with the motion alerts built into most recorders, because moving objects are classified before anything is sent to you — a dog crossing the yard and a person climbing the gate are not the same event. You also enrol the faces of family, staff and your caretaker once, after which they stop being reported. No system is perfect, and the right way to find out what yours will do is to watch it on your own footage for a couple of weeks and tune the zones and hours before you rely on it.

**Is CCTV monitoring legal in India?**
> Recording your own property is lawful, and so is being alerted about it. The limits are about other people. Cameras covering the inside of a tenant's home, or a space a caretaker would reasonably treat as private, are not something we will help you set up. Tell the people who live and work at the property that cameras are there and what they cover — it is both the decent thing and what India's Digital Personal Data Protection Act points towards, since the footage is personal data about identifiable people. This is a general explanation, not legal advice; for a dispute over possession or a Power of Attorney, use a property lawyer in the district.

---

## 14. Punjabi and Hindi

**ਪੰਜਾਬੀ**
> ਤੁਹਾਡਾ ਘਰ ਪੰਜਾਬ ਵਿੱਚ, ਤੇ ਤੁਸੀਂ ਵਿਦੇਸ਼ ਵਿੱਚ।
> PGAK ਤੁਹਾਡੇ ਪੁਰਾਣੇ CCTV ਨੂੰ ਹੀ ਸਮਝਦਾਰ ਬਣਾ ਦਿੰਦਾ ਹੈ — ਨਵੇਂ ਕੈਮਰੇ ਲਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ।
> ਜੇ ਗੇਟ 'ਤੇ ਕੋਈ ਅਜਨਬੀ ਆਵੇ, ਤਾਂ ਤੁਹਾਡੇ ਫ਼ੋਨ 'ਤੇ ਐਪ ਵਿੱਚ ਫ਼ੋਟੋ ਸਮੇਤ ਉਸੇ ਵੇਲੇ ਪਤਾ ਲੱਗ ਜਾਂਦਾ ਹੈ — ਤੁਸੀਂ ਦੁਨੀਆਂ ਵਿੱਚ ਕਿਤੇ ਵੀ ਹੋਵੋ।

**हिन्दी**
> आपका घर पंजाब में, आप विदेश में — गेट पर कोई अजनबी आए तो आपके फ़ोन पर ऐप में फ़ोटो के साथ उसी समय पता चल जाता है।

Button — ਵਟਸਐਪ 'ਤੇ ਗੱਲ ਕਰੋ →

*Both blocks need a native read before launch.*

---

## 15. Final CTA — Free remote security check

> Find out what your cameras could already be telling you

> No visit, no cost, and nobody has to be at the property. Send us a photo of your DVR or NVR, the village or town, and roughly how many cameras there are. We will tell you which of them PGAK could watch, whether the connection can carry it, and what it would cost for your property — and if the answer is that your setup is not suitable, we will tell you that instead of selling you something.

**CTAs** — `Chat on WhatsApp →` · `Call +91 62839 93600`

> Write in English, Punjabi or Hindi — whichever is easier. If you would rather someone in the family in Punjab handled the call, send us their number and tell us when suits them.
