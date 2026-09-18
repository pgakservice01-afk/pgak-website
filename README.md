# PGAK website

Next.js App Router marketing site for PGAK Innovations. Static HTML carries the SEO content; small client components handle lead forms, attribution and interactive product tools.

## Development

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env.local` only when configuring a backend. Never put ERP secrets in `NEXT_PUBLIC_` variables. See `DEPLOY.md` for the existing ERP relay and Vercel setup.

## Verification

```sh
npm test
npm run test:analytics
npm run test:lead-client
npm run build
npm run typecheck
```

Use `scripts/mock-lead-erp.cjs` with `ERP_LEADS_ENDPOINT=http://127.0.0.1:4319/success` and a local-only `ERP_WEBHOOK_SECRET` for form testing. The sink also exposes `/failure` for outage recovery tests. Never direct synthetic development leads to the live ERP.

## Design and content

- `app/page.tsx`: server-rendered homepage.
- `app/premium.css`: white design system and responsive layouts.
- `components/Nav.tsx`: native, crawlable navigation.
- `components/sections/Footer.tsx`: server-rendered information directory.
- `app/book-demo/page.tsx`: demo request page.
- `components/sections/QuickLead.tsx`, `DealerForm.tsx`: lead forms.
- `lib/lead-client.ts`, `app/api/leads/route.ts`: confirmed lead delivery and recovery.
- `lib/solutions.ts`, `lib/capabilities.ts`, `lib/locations.ts`, `content/insights`: detailed SEO content.

Production deployments are triggered by the existing GitHub–Vercel integration. `docs/redesign/REDESIGN.md` records changes, evidence and rollback; `docs/seo/` retains the prior SEO audit.
