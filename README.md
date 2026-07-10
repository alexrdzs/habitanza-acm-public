# Habitanza — Zona Esmeralda Valuation Landing

Public, anonymous lead-capture wizard ("¿Cuánto vale hoy tu casa en Zona Esmeralda?"). No live AI call and no real comparables lookup happens on this page — every submission creates a lead a broker builds the actual, authenticated Análisis Comparativo de Mercado (ACM) for by hand, async.

Flow: hero → property basics (type, colonia, size/lot, rooms, condition) → a styled "analyzing" transition → contact info (name, WhatsApp, consent) → an immediate, report-styled reveal of a **preliminary** price range. The reveal exists so submitting contact info doesn't feel like a one-way data grab — visitors get something back immediately, and the real ACM follows from a broker within ~48h.

Visually and structurally reuses pieces of [Habitanza-ACM](https://github.com/alexrdzs/Habitanza-ACM)'s authenticated report UI (dark hero price card, metric cards, `ConditionToggle`, brand tokens, logo) but deliberately does **not** include the real homologation engine, Anthropic calls, PDF export, Firestore/report flow, or Firebase auth.

## Preliminary estimate — how it works and its limits

`shared/pricing.ts` computes the range shown on the reveal step from a simple formula: a per-colonia average price/m² (placeholder data, see below) × the visitor's stated size, adjusted by property type and the condition they picked on `ConditionToggle`. It does **not** query real comparables — it exists purely to make the post-submit moment feel personalized, and is labeled "estimación preliminar" on screen precisely because it isn't a real ACM.

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
- [ ] Calibrate `PRICE_PER_M2_CONSTRUCCION` / `PRICE_PER_M2_TERRENO` in `shared/pricing.ts` against real recent closing prices per colonia — the seeded numbers are placeholders, not verified market data
- [ ] Point the subdomain (e.g. `valua.habitanza.com`) at this Vercel project
