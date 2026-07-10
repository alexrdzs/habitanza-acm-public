# Habitanza — Zona Esmeralda Valuation Landing

Public, anonymous lead-capture wizard ("¿Cuánto vale hoy tu casa en Zona Esmeralda?"). No live AI call and no real comparables lookup happens on this page — every submission creates a lead a broker builds the actual, authenticated Análisis Comparativo de Mercado (ACM) for by hand, async.

Flow: hero → location (colonia + map) → property specifics (type, size/lot, rooms, condition, amenities) → a styled "analyzing" transition → contact info (name, WhatsApp, consent) → a **teaser** reveal — a blurred reference price, the methodology behind it, a few real portfolio listings, and a CTA to talk to an advisor now. The teaser exists so submitting contact info doesn't feel like a one-way data grab, without pretending the client-side formula is the real ACM — that's the whole point of blurring the number instead of showing it plainly.

Visually and structurally reuses pieces of [Habitanza-ACM](https://github.com/alexrdzs/Habitanza-ACM)'s authenticated report UI (dark hero price card, metric cards, `ConditionToggle`, brand tokens, logo) but deliberately does **not** include the real homologation engine, Anthropic calls, PDF export, Firestore/report flow, or Firebase auth.

## Preliminary estimate — how it works and its limits

`shared/pricing.ts` computes the range shown on the reveal step from a simple formula: a per-colonia average price/m² × the visitor's stated size, adjusted by property type and the condition they picked on `ConditionToggle`. It does **not** query real comparables at request time — it exists purely to make the post-submit moment feel personalized, and is labeled "estimación preliminar" on screen precisely because it isn't a real ACM.

The per-colonia baselines and the `ZONA_ESMERALDA_COLONIAS` list are derived from real, currently-published listings in Habitanza's own portfolio (sampled 2026-07-10 via the internal inventory search), not guessed — but most colonias only had one or two comps available, so they're directional, not precise. Re-derive periodically as more sales close; see the comments in `shared/pricing.ts`.

## Property showcase

The reveal step shows three real, currently-published listings from Habitanza's portfolio (`shared/showcaseProperties.ts`) in a swipeable carousel, as a credibility signal — proof of real active inventory in the zone, not the comparables behind the visitor's estimate (the copy on-screen makes that distinction explicit). Listings sell; refresh this file periodically so it doesn't go stale or show a property that's no longer available.

## Neighborhood map

`shared/neighborhoods.ts` maps each colonia to a real coordinate sampled from a published listing there (not a precise centroid). `NeighborhoodMap.tsx` renders an actual Google Map (same styling as the authenticated ACM tool) when `VITE_GOOGLE_MAPS_API_KEY` is set, and falls back to a static illustrative pin card when it isn't — the location step never breaks or shows a broken map, it just degrades.

## Advisor CTA

The teaser screen ends with a "Hablemos ahora" WhatsApp CTA featuring a real Habitanza advisor (`shared/advisors.ts`) — randomized per visit between the two configured advisors so the team can compare inbound WhatsApp volume between them. The wa.me message is pre-filled with the visitor's property type and colonia for context.

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
- [ ] Refresh `shared/showcaseProperties.ts` before launch and periodically after — these are real listings that will eventually sell or come off market
- [ ] Re-derive `PRICE_PER_M2_CONSTRUCCION` / `PRICE_PER_M2_TERRENO` in `shared/pricing.ts` as more of the portfolio's sales close — most colonias currently rest on a single comp
- [ ] Point the subdomain (e.g. `valua.habitanza.com`) at this Vercel project, then update the canonical/OG URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml` to match
- [ ] Add a real Open Graph image (`og:image`) once one exists — omitted for now rather than referencing a broken asset
- [ ] Consider adding real `telephone`/`streetAddress` to the `RealEstateAgent` JSON-LD in `index.html` if Habitanza wants richer local-business search results
- [ ] Set `VITE_GOOGLE_MAPS_API_KEY` in Vercel and restrict it to this domain in Google Cloud Console for the real map to render on the location step (falls back gracefully to a static pin card without it)
- [ ] Keep `shared/advisors.ts` current if Rogelio or Tere's number/photo changes, or if the team wants to add/remove who appears in the CTA rotation
