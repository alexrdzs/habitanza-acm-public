# Habitanza — Zona Esmeralda Valuation Landing

Public, anonymous lead-capture wizard ("¿Cuánto vale hoy tu casa en Zona Esmeralda?"). No live AI call and no real comparables lookup happens on this page — every submission creates a lead a broker builds the actual, authenticated Análisis Comparativo de Mercado (ACM) for by hand, async.

Flow: hero → location (colonia + map) → property specifics (type, size/lot, rooms, condition, amenities) → a styled "analyzing" transition → contact info (name, WhatsApp, consent) → a **teaser** reveal — a plainly-shown reference price range, an explicit note that this isn't the final ACM, the methodology behind it, real client testimonials, and a CTA to talk to an advisor now. The teaser exists so submitting contact info doesn't feel like a one-way data grab, without pretending the client-side formula is the real ACM — the copy says so directly instead of blurring the number.

Visually and structurally reuses pieces of [Habitanza-ACM](https://github.com/alexrdzs/Habitanza-ACM)'s authenticated report UI (dark hero price card, metric cards, brand tokens, logo) but deliberately does **not** include the real homologation engine, Anthropic calls, PDF export, Firestore/report flow, or Firebase auth.

For a screen-by-screen breakdown of what each step is trying to accomplish and why it's designed the way it is (written for design review, not engineering), see [`docs/design-handoff.md`](docs/design-handoff.md).

## Preliminary estimate — how it works and its limits

`shared/pricing.ts` computes the range shown on the reveal step from a simple formula: a per-colonia average price/m² × the visitor's stated size, adjusted by property type and the condition they picked on `ConditionQuickPicker`. It does **not** query real comparables at request time — it exists purely to make the post-submit moment feel personalized, and is labeled "estimación preliminar" on screen precisely because it isn't a real ACM.

The per-colonia baselines and the `ZONA_ESMERALDA_COLONIAS` list are derived from real, currently-published listings in Habitanza's own portfolio (sampled 2026-07-10 via the internal inventory search), not guessed — but most colonias only had one or two comps available, so they're directional, not precise. Re-derive periodically as more sales close; see the comments in `shared/pricing.ts`.

## Testimonials

The reveal step closes with a swipeable carousel of real client testimonials (`shared/testimonials.ts`), as a trust/social-proof signal. These are real quotes supplied by Habitanza, not fabricated — if more are added later, keep that the same.

## Neighborhood map

`shared/neighborhoods.ts` maps each colonia to a real coordinate sampled from a published listing there (not a precise centroid). `NeighborhoodMap.tsx` renders an actual Google Map (same styling as the authenticated ACM tool) when `VITE_GOOGLE_MAPS_API_KEY` is set, and falls back to a static illustrative pin card when it isn't — the location step never breaks or shows a broken map, it just degrades.

## Advisor CTA

The teaser screen ends with a "Hablemos ahora" WhatsApp CTA featuring a real Habitanza advisor (`shared/advisors.ts`) — randomized per visit between the two configured advisors so the team can compare inbound WhatsApp volume between them. The wa.me message is pre-filled with the visitor's property type and colonia for context.

## Team vs. advisors — two separate data files, on purpose

`shared/advisors.ts` (Rogelio, Tere) is the pool actually used for the WhatsApp CTA rotation and the reveal screen's "firma" attribution — who's in it is a lead-routing decision. `shared/team.ts` is the full active roster (pulled from the internal agent directory) shown on the Hero's photo/name marquee purely as a "real people work here" trust signal. Adding someone to `team.ts` does **not** put them in the CTA rotation; that's a separate, deliberate change to `advisors.ts`.

## Link previews (Open Graph)

`public/og-image.png` is a static 1200×630 image (rendered once from a one-off HTML mockup styled to match the app's ink/emerald/brass palette, not generated from the live page) so links shared in WhatsApp/iMessage/etc. show a real image and title instead of a bare URL. If the brand visuals change meaningfully, re-render and replace this file — it won't update itself.

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
- [ ] Add more/refresh `shared/testimonials.ts` if Habitanza wants to rotate in newer client quotes
- [ ] Re-derive `PRICE_PER_M2_CONSTRUCCION` / `PRICE_PER_M2_TERRENO` in `shared/pricing.ts` as more of the portfolio's sales close — most colonias currently rest on a single comp
- [ ] Point the subdomain (e.g. `valua.habitanza.com`) at this Vercel project, then update the canonical/OG URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml` to match -- and re-render `public/og-image.png` if the domain changes before launch (it's a static PNG, not generated from the live URL)
- [ ] Consider adding real `telephone`/`streetAddress` to the `RealEstateAgent` JSON-LD in `index.html` if Habitanza wants richer local-business search results
- [ ] Set `VITE_GOOGLE_MAPS_API_KEY` in Vercel and restrict it to this domain in Google Cloud Console for the real map to render on the location step (falls back gracefully to a static pin card without it)
- [ ] Keep `shared/advisors.ts` current if Rogelio or Tere's number/photo changes, or if the team wants to add/remove who appears in the CTA rotation
