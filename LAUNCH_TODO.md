# Launch checklist — what's left on your side

Everything in the codebase is built and working. The items below are the
**manual steps only you can do** — external accounts, secrets, legal sign-off,
real market data, brand assets, and DNS. Each item says exactly *what file /
where*, *what to put*, and *how to check it worked*.

Ordered by priority. The 🚦 **Blockers** section must be done or the tool
either doesn't function or isn't safe to launch. Everything below that makes it
better/more accurate but won't stop a launch.

---

## 🚦 Blockers — the tool doesn't work / isn't safe without these

- [ ] **Connect where leads go — `MAKE_WEBHOOK_URL`**
  Set this env var in Vercel (Project → Settings → Environment Variables).
  Without it, `/api/lead` returns a 500 and no lead is captured — the form
  looks like it submits but nothing lands.
  - **What to put:** the incoming-webhook URL of your Make.com scenario.
  - **Verify:** submit a test lead on the live site → the Make scenario runs
    and you receive the row/notification.

- [ ] **Build the Make.com scenario (store lead + team WhatsApp alert)**
  V1 has no Pulppo integration by design — Make is responsible for saving the
  lead somewhere (sheet/CRM/DB) and firing the team WhatsApp notification.
  - **Verify:** the test submission above shows up wherever you chose, and the
    team WhatsApp message actually arrives.

- [ ] **Legal review of the Aviso de Privacidad**
  File: `src/components/PrivacyNoticeContent.tsx` (single source — powers both
  the `/aviso-de-privacidad` page and the modal on the contact step).
  It's a **starting draft, not reviewed by counsel**, and the contact email
  `privacidad@habitanza.com` is a placeholder.
  - **What to do:** have counsel confirm the responsible-party details and
    swap in the real ARCO contact email.
  - **Verify:** open the aviso from the contact step — details are correct and
    the email is real.

---

## 🎨 Brand assets & keys you still need to supply

- [x] **White Pulppo logo for dark mode** — done.
  The mark is now rendered inline by `src/components/PulppoLogo.tsx`: the
  octopus is a transparent cut-out and the whole logo fills with `currentColor`,
  so it's ink on the light team card and white in dark mode automatically. No
  external asset, no `<picture>` swap, and the dashed placeholder is gone.

- [ ] **Google Maps API key — `VITE_GOOGLE_MAPS_API_KEY`**
  Set in Vercel. Restrict it to this domain in Google Cloud Console →
  Credentials. Without it the maps fall back to a static illustrative card
  (never a broken map).
  - **Verify:** on the analyzing + reveal screens the real map renders (and,
    thanks to the recent work, it's dark-themed in dark mode).

---

## 📊 Real market data to fill in (pricing accuracy)

> Never publish zeros or approximate coordinates as real comparables — the
> code already hides un-researched entries as "en investigación" until you
> complete them.

- [ ] **Verified $/m² for the two campaign zones**
  File: `shared/pricing.ts`. Replace the four `null` research markers with
  verified local prices:
  - `PRICE_PER_M2_CONSTRUCCION` → `Bosque Real`, `Interlomas`
  - `PRICE_PER_M2_TERRENO` → `Bosque Real`, `Interlomas`
  - Until filled, these colonias use the blended zone default (still works,
    just less precise).

- [ ] **Real comparables for Bosque Real & Interlomas**
  File: `shared/comparableListings.ts` — the "RESEARCH QUEUE" blocks.
  Each has 5 `isPlaceholder: true` stubs. Fill in real `tipo/precio/m2/
  recamaras/banos/lat/lng` (plus a Pulppo/CDN `photo` where available), then
  **delete `isPlaceholder`** on each completed one.
  - **Verify:** for those colonias the reveal screen shows real comp cards +
    map pins instead of the "en investigación" progress state.

- [ ] *(Ongoing)* **Re-derive the per-m² baselines as more sales close**
  Most colonias in `shared/pricing.ts` currently rest on a single comp
  (documented inline). Refresh periodically for accuracy.

---

## 🌐 Domain, SEO & deploy

- [ ] **Point the subdomain at the Vercel project** (e.g. `valua.habitanza.com`).

- [ ] **Update the URLs to match the real domain** once DNS is live:
  - `index.html` — `<link rel="canonical">` and the OG/Twitter URL/image tags
    (currently `https://habitanza-acm-public.vercel.app/`)
  - `public/robots.txt`
  - `public/sitemap.xml`

- [ ] **Re-render `public/og-image.png` if the domain changes** — it's a
  static PNG, not generated from the live URL.
  - **Verify:** paste the live URL into a link-preview tester → correct title,
    description, and image.

- [ ] *(Optional)* **Richer local-business SEO** — add real `telephone` /
  `streetAddress` to the `RealEstateAgent` JSON-LD in `index.html`.

---

## 🔒 Hardening (recommended before real public traffic)

- [ ] **`MAKE_WEBHOOK_SECRET`** (Vercel) — shared secret sent as
  `X-Webhook-Secret` so your Make scenario can verify requests genuinely came
  from this endpoint.

- [ ] **Durable rate limiting — `UPSTASH_REDIS_REST_URL` +
  `UPSTASH_REDIS_REST_TOKEN`** (Vercel). Without these, rate limiting is
  best-effort in-memory only (resets on cold starts / across instances).

---

## 🔁 Ongoing / maintenance

- [ ] **Keep `shared/advisors.ts` current** — advisor phone/photo changes, or
  adding/removing who's in the WhatsApp CTA rotation.

- [ ] **Refresh `shared/testimonials.ts`** whenever you want to rotate in newer
  client quotes.

---

### Quick reference — every env var to set in Vercel

| Variable | Required? | Purpose |
|---|---|---|
| `MAKE_WEBHOOK_URL` | **Yes** | Where validated leads are forwarded |
| `VITE_GOOGLE_MAPS_API_KEY` | Strongly recommended | Real maps (falls back gracefully) |
| `MAKE_WEBHOOK_SECRET` | Recommended | Authenticates the webhook call |
| `UPSTASH_REDIS_REST_URL` | Recommended | Durable rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Recommended | Durable rate limiting |

See `env.example` for the annotated source of truth on each variable.
