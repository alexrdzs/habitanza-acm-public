# Habitanza — Zona Esmeralda Valuation Landing

Public, anonymous lead-capture page ("¿Cuánto vale hoy tu casa en Zona Esmeralda?"). No AI, no login, no live valuation shown — every submission becomes a lead a broker works manually.

Seeded from [Habitanza-ACM](https://github.com/alexrdzs/Habitanza-ACM) (Tailwind brand tokens, logo, property-type conventions) but deliberately does **not** include the ACM homologation engine, Anthropic calls, PDF export, Firestore/report flow, or Firebase auth — see the reuse map in the PRD this repo implements.

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint      # tsc --noEmit
```

## Environment variables

See `env.example`. At minimum, set `MAKE_WEBHOOK_URL` in Vercel before this can accept real submissions — without it `/api/lead` returns a 500 and logs the drop server-side rather than silently discarding leads.

## Before going live

- [ ] Set `MAKE_WEBHOOK_URL` (and optionally `MAKE_WEBHOOK_SECRET`) in Vercel
- [ ] Point the Make.com scenario at wherever leads should land (V1 has no Pulppo integration by design) and confirm the team WhatsApp notification fires
- [ ] Set `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` for durable rate limiting before a real public launch
- [ ] Legal review of `src/pages/PrivacyNoticePage.tsx` — the aviso de privacidad shipped here is a starting draft (not reviewed by counsel) and has a placeholder contact email
- [ ] Confirm/expand `ZONA_ESMERALDA_COLONIAS` in `shared/validation.ts` against the actual campaign target colonias
- [ ] Point the subdomain (e.g. `valua.habitanza.com`) at this Vercel project
