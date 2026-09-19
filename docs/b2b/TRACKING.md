# Tracking and commercial outcomes

Stable `data-cta` identifiers cover header, hero, mobile actions, page assessments, phone, WhatsApp and pricing/demo forms. `data-lead-form` identifies each short form. Forms share the same submission contract.

| Outcome                                           | Evidence                                       | Event                                                                 |
| ------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| CTA / phone / WhatsApp click                      | Explicit click, not a sent message or lead     | cta_click / click_phone / click_whatsapp                              |
| Form start                                        | First focus in that form                       | form_start                                                            |
| Enquiry received                                  | Durable intake receipt, or legacy CRM row id   | form_submit + generate_lead; one per submission ref in client session |
| Requested intent                                  | Received enquiry and form identity             | assessment_request / demo_request / pricing_request                   |
| Qualified / sales accepted                        | CRM owner confirms fit and qualification date  | CRM integration required; never inferred from click                   |
| Demo held / pilot / won                           | CRM record, actual stage date and owner        | CRM integration required                                              |
| Recurring revenue / contribution / collected cash | Reliable commercial ledger, agreed calculation | Not inferred or emitted by this website                               |

Only enumerated form names, action ids, camera bands, page paths and non-contact categories enter client analytics. Free-text project briefs and optional details go only to intake. WhatsApp URLs carry no contact field values. Do not treat opening WhatsApp as sending a message. No monetary value is assigned to speculative calculator output.

Attribution keeps first landing/source separately from latest campaign context in session storage; existing site consent behaviour remains unchanged. This is not a consent-compliance certification. Campaign strings resembling contact details or credentials are omitted. Page-query contact data must never be used for personalisation. Production GA4/Meta are disabled in local/preview by the established environment gate.

CRM stage ingestion and commercial records are not connected by this branch. Configure an authenticated server-to-server integration, schema, consent/legal review where applicable, and idempotent event ids before reporting downstream conversions. Tag Assistant / GA4 account acceptance and Search Console property verification are separate checks, not implied by unit tests.

## Experiments

H1 hypothesis: task-oriented business language improves qualified-enquiry share compared with broad AI wording. Offer hypothesis: a useful ungated readiness brief improves technically actionable enquiries. Form-path hypothesis: phone-first receipt followed by optional details reduces loss while preserving qualification context.

Record variant, date range, lead cohort, qualified count, demos actually held, pilots and won records. At low volume use buyer usability reviews and descriptive cohorts; do not claim significance or optimise on clicks alone. Do not change experiments mid-cohort or count synthetic QA.
