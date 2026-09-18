# Lead capture and measurement

Phone + camera band remain the first-touch fields. Existing full forms collect optional site context. Existing server-side ERP relay, validation, honeypot, retry handling, idempotency reference, attribution and WhatsApp/phone fallbacks are preserved. Solution pages now offer an inline form and contextual WhatsApp action.

| Event | Trigger | Meaning |
|---|---|---|
| view_money_page | Render of marked home, solution or pricing page | Landing-page evaluation opportunity |
| cta_click | Element with data-cta clicked | Legacy named CTA intent |
| click_whatsapp | Any wa.me / API WhatsApp link clicked | Contact intent; not proof of a sent message |
| click_phone | tel link clicked | Contact intent; not proof of a completed call |
| click_book_demo | Explicit demo action clicked | Demo intent only |
| click_assessment | Assessment link clicked | Audit/assessment intent |
| form_start | First focus inside a marked lead form | One event per mounted form per route visit |
| form_submit | Server answers delivered:true | Successful website submission |
| generate_lead | Same confirmed submission, deduplicated by form reference | Existing GA4 lead event, not qualified-lead proof |
| pricing_request | Confirmed quick_quote_request | Quote request delivered |
| assessment_request | Other confirmed audit/attendance/checklist enquiry | Assessment/content enquiry delivered |
| download_asset | Explicit download link or PDF/CSV/XLSX/ZIP link | Asset access intent; not proof a PDF was saved |
| video_play | User plays non-autoplay video | Video engagement |

`demo_request` is intentionally not fabricated: the current forms request an assessment, not a confirmed booked demo. Track booked demos and qualification in the CRM after the sales team actually records them.

The helper uses one gtag command per event and queues early events in dataLayer before the lazy-loaded GA script. It no longer also pushes a duplicate GTM custom event. Existing GTM custom-event triggers should not be used to send the same events again. GA4 enhanced measurement can itself emit form_start/form_submit; when PGAK property access becomes available, disable its automatic form interaction collection or use an explicit custom-event mapping to prevent overlap. Dashboard delivery and configuration cannot be verified without property access.

Payloads contain path, CTA identifier, form name and camera/site category. No phone, email, name, full WhatsApp URL, message contents or camera credentials are sent by these new handlers. Existing attribution goes to the first-party lead relay. Device and acquisition attribution should be handled by GA4 rather than copied into extra fields.

Primary funnel: organic search → commercial page → contact/form intent → CRM-confirmed lead → sales-qualified lead → booked demo → sale. Use generate_lead as the website lead key event; do not add together form_submit + generate_lead as two leads. Keep click events secondary. Reconcile CRM records and first-touch attribution weekly; classify fit, camera/site count, use case, geography and sales outcome in the CRM.

Validation: analytics queue/deduplication unit tests; existing lead validation and spam-route tests; local production-build form delivery against a loopback mock CRM. A live health endpoint alone cannot verify the final CRM destination. See SEO_CHANGES.md for production delivery limitations and final checks.

Live DOM confirms both GTM and direct GA4 loaders reference G-6EMP9HSR2F. Custom-event duplicate dispatch was removed in code, but container-driven page-view/config overlap remains unverified until GTM/GA4 reporting access is available. Do not claim end-to-end deduplication from unit tests alone.
