# PGAK leads — Google Sheet + Gmail

**The lead system is one Google Sheet and one email to each of you.** Every valid
enquiry on the website writes a row in **PGAK — Master Leads** and emails
**director@securedengineers.com** and **mittaladitya18@gmail.com**. That is all
you have to look at.

| Piece | Where |
|---|---|
| The sheet | https://docs.google.com/spreadsheets/d/1u0tDeTWSvmOO-J7i917EgdhIqDQP6meQ3T6K6KNyizk/edit |
| Who can open it | director@securedengineers.com (owner) and mittaladitya18@gmail.com (Editor). Private — no link sharing. |
| What sends the row and the emails | A Google Apps Script bound to that sheet, running as the sheet's owner: [`integrations/pgak-leads-appsscript.gs`](../../integrations/pgak-leads-appsscript.gs) |
| Website side | [`lib/leadRegister.ts`](../../lib/leadRegister.ts), called from `app/api/leads/route.ts` |

## Turn it on — three steps

1. **Authorise the script.** Open the sheet → Extensions → Apps Script → choose
   `setupSheet` → **Run** → Review permissions → pick director@securedengineers.com
   → Advanced → "Go to … (unsafe)" → **Allow**. It builds the Leads tab.
2. **Deploy it.** Deploy → New deployment → **Web app** → Execute as **Me**,
   Who has access **Anyone** → Deploy → copy the URL ending `/exec`.
3. **Tell the website.** In Vercel → Settings → Environment Variables add
   `LEAD_REGISTER_URL` (that `/exec` URL) and `LEAD_REGISTER_SECRET` (the same
   value as the script's `SECRET` property), then redeploy.

Check it worked: `https://www.pgak.co.in/api/leads` should say
`"register": true`. Then send me a message and I will run a labelled test
enquiry and show you the row and both emails.

**"Anyone" does not make your sheet public.** It only means the website's server
can POST to that one URL without a Google login. The sheet stays private to you
two, and the script writes nothing unless the request carries the right
signature.

## About the ERP

The ERP relay is **optional**. Leave its variables set and every lead goes to
both the ERP and the sheet; clear them and the sheet plus the two emails are the
whole system (`/api/leads` then reports `"mode":"sheet-and-email"`). Either way
the customer sees the same thing, and nothing about the forms changes.

## Flow

```
customer submits
  → /api/leads validates (phone required, honeypot, rate limit, origin)
  → [optional] ERP relay, if its variables are set
  → signed POST to the Apps Script web app
        → one sheet row per lead id
        → alert email to director@ and to mittaladitya18@
  → the customer sees success once the lead is actually held somewhere
```

**Failure behaviour**

| What fails | What happens |
|---|---|
| Register (down, refused, slow) | Lead is unaffected: ERP has it, owner gets the Telegram alert, `LEAD_REGISTER_FAILED` is logged with the reason. Recover with the replay endpoint. |
| ERP | The register still takes the row and sends both emails; the row's **ERP delivery status** says `failed: …`. The customer is not asked to submit again. |
| Both | The customer sees the WhatsApp fallback with their details prefilled, exactly as before. |
| One email only | The row still exists; that recipient's column says `failed`, the other says accepted. |

**Duplicates.** One row per Lead ID. A retry (same lead id) returns
`row: "duplicate"`, adds no row and sends no second email. A *different*
enquiry from the same phone number is a separate row on purpose — it may be a
new opportunity; sales can spot it by sorting on the phone column.

## One-time setup

1. **Script properties** (Apps Script → ⚙ Project Settings → Script properties):
   - `SECRET` — a long random string (`openssl rand -hex 24`)
   - `RECIPIENTS` — `director@securedengineers.com,mittaladitya18@gmail.com`
2. **Authorise and build the sheet**: in the editor choose `setupSheet` → **Run**
   → Review permissions → pick director@securedengineers.com → Advanced → "Go to
   … (unsafe)" → **Allow**. (It is your own script; the warning is Google's
   standard notice for scripts it has not reviewed.) Scopes requested:
   spreadsheets (write the row) and send-email-as-you (the alerts).
3. **Deploy**: Deploy → New deployment → type **Web app** → Execute as **Me**,
   Who has access **Anyone** → Deploy → copy the `/exec` URL.
   "Anyone" is required because Vercel calls it without a Google session; the
   signature is what authorises the request, not the caller.
4. **Vercel → Settings → Environment Variables** (Production *and* Preview):
   - `LEAD_REGISTER_URL` = the `/exec` URL
   - `LEAD_REGISTER_SECRET` = the same value as `SECRET`
   - `LEAD_REPLAY_SECRET` = another random string (optional)
   Redeploy, then check `GET /api/leads` → `{"register":true}`.
5. **Prove it end to end** (after deploy): submit one enquiry on the live site
   with a phone number you control and `ref` starting `test-`, then confirm the
   row, the `TEST` flag and both email columns.

## Re-deploying the script after a code change

Edit `integrations/pgak-leads-appsscript.gs` in the repo, paste it into the
editor, save, then **Deploy → Manage deployments → edit → New version**. The
`/exec` URL stays the same. Changing the columns means also updating
`REGISTER_COLUMNS` in `lib/leadRegister.ts`.

## Recovering a missed lead

The owner alert (Telegram) and the Vercel log both carry the lead. To put it
into the register afterwards:

```bash
curl -X POST https://www.pgak.co.in/api/leads/replay \
  -H 'Content-Type: application/json' \
  -H "X-Replay-Secret: $LEAD_REPLAY_SECRET" \
  -d '{"lead_id":"<the ref>","received_at":"2026-09-23T07:40:00Z","name":"…","phone":"+91…","city":"…","requirement":"New installation","cameras":"16–50","erp_status":"delivered"}'
```

Replaying something that did land returns `row: "duplicate"` and changes
nothing. The endpoint never touches the ERP.

## Security

- `LEAD_REGISTER_URL` / `LEAD_REGISTER_SECRET` / `LEAD_REPLAY_SECRET` are
  server-only. Never give them a `NEXT_PUBLIC_` prefix.
- Requests are HMAC-SHA256 signed over `timestamp.body`, rejected outside a
  5-minute window — so a copied request cannot be replayed later, and someone
  who learns the URL still cannot write rows.
- Customer text is written as literal values (a leading `=`, `+`, `-` or `@` is
  prefixed with `'`), so nothing in a lead can execute as a spreadsheet formula.
- Email bodies HTML-escape every customer-supplied value.
- No name, phone, email or city is sent to GA4 or Meta — analytics carries only
  the journey type and a random lead reference.
- The sheet stays private. Do not enable "anyone with the link".

## For Aditya — using the sheet

You own the middle block of columns; the integration never overwrites them:

| Column | What to put |
|---|---|
| **Assigned owner** | who is calling this lead |
| **Lead status** | pick from the dropdown. "New — not contacted" is the starting point; *not contacted yet* is different from *Unqualified* |
| **First contact (IST)** | when you actually spoke to them |
| **Next follow-up (IST)** | when you will call again |
| **Last follow-up notes** | what they said, in your words |
| **Outcome / lost reason** | only when it is decided |
| **Company** | fill it in when you learn it — no form asks for it |

Everything else (Lead ID, timestamps, contact details, attribution, ERP and
email statuses) is written automatically and shows a warning if edited.

- Rows marked **TEST** in the last column are ours, not customers.
- **Enquiry category** separates *Customer* from *Checklist* researchers; both
  land here, but a checklist download is not a qualified enquiry.
- Sort and filter freely: rows are keyed by Lead ID, so nothing overwrites
  anyone else's record.
