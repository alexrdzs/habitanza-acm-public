# Design handoff — Zona Esmeralda valuation wizard

Live at: https://habitanza-acm-public.vercel.app/ (no login needed — it's a public landing page). Best viewed on a phone-sized viewport; the whole flow is designed mobile-first inside a ~448px-wide column.

This doc explains **what each screen is trying to do and why it's built the way it is today**, so a designer can react to intent, not just pixels. It's not a UI spec — it's the brief for a design review.

## What this actually is

A 6-step wizard for homeowners in specific colonias of "Zona Esmeralda" (Atizapán de Zaragoza) who want to know what their house is worth. It is **not** the real valuation tool — it's a public marketing funnel that sits in front of it.

The single business goal: **collect a name, WhatsApp number, and enough property detail that a human advisor (Rogelio or Tere) can follow up with a real, personalized Análisis Comparativo de Mercado (ACM)**. Every screen either moves someone toward giving that info, or reduces the anxiety that makes people abandon a lead form halfway through.

Two constraints shape almost every design decision below:
- **No fabrication.** The price range shown is a real (if rough) formula off real portfolio data — never invented. The testimonials are real client quotes. If a screen ever looks like it's showing you a finished, authoritative number, that's a bug in the messaging, not a feature.
- **This page is deliberately honest that it isn't the final step.** Early versions blurred the estimated price to signal "this is just a teaser" — user feedback was that blurring reads as *hiding something*, which is worse than just saying it plainly. So instead, copy does that job: "esto todavía no es el paso final," future-tense phrasing ("tu propiedad **estaría** en un rango de..."), naming the specific advisor who'll follow up.

## Visual identity, for quick reference

- **Font:** Figtree everywhere for UI/copy. IBM Plex Mono is reserved for *data only* — step numbers, m², prices — so numbers read like a ledger entry, not conversational text.
- **Palette:** not a generic SaaS palette — built around the literal meaning of "Esmeralda" (emerald).

  | Token | Hex | Use |
  |---|---|---|
  | `brand-500` | `#25D366` | The literal Habitanza logo/WhatsApp green — primary CTAs only |
  | `emerald-deep` / `emerald-glow` | `#146C48` / `#4ADE80` | Rings, accents, icon chips |
  | `ink` / `ink-soft` | `#10201A` / `#17281F` | Dark panel backgrounds (currently just the reveal screen's first card) |
  | `parchment` / `parchment-card` | `#F6F4ED` / `#FDFCF8` | Page background / card background |
  | `brass` / `brass-soft` | `#A9814F` / `#CDB07C` | Hairline trim, "valuation seal" accents |

- **Motif:** a thin brass hairline with a small rotated-square "facet" mark sits atop every step card — a restrained nod to a cut gem, tying back to "Esmeralda" as a place name rather than decorating for its own sake.
- **The reveal screen's first card is deliberately staged like a certificate/appraisal being issued** (dark ground, brass trim, glassy highlight) — distinct from the light, form-like cards everywhere else, because it's the one moment meant to feel like a payoff.

## The flow

Six steps, tracked by a `step` state machine: `hero → location → basics → analyzing → contact → reveal`. A visual 1-2-3 stepper (filled circles connected by a line, checkmarks for completed steps) appears on **location, basics, and contact only** — hero, analyzing, and reveal intentionally don't show step count, since they aren't "fill out a field" steps.

---

### 1. Hero

**Job:** Get a cold visitor (probably from an ad or WhatsApp share) to believe this is worth 90 seconds, and hand-hold them into starting.

**On screen:** Headline "¿Cuánto vale hoy tu casa?", one line of supporting copy, three trust marks (sin costo / respuesta en 48h / especialistas en la zona), a "+10 propiedades activas" social-proof pill, the single CTA button "Conoce el valor de tu propiedad," and below the fold, an auto-scrolling marquee of four "why us" cards (local knowledge, data-driven method, real WhatsApp support, active portfolio).

**Current decisions:** Only one CTA on the whole screen — no secondary/ghost action, nothing else clickable, to avoid decision paralysis. The expertise marquee auto-scrolls continuously (pauses on hover/tap) rather than requiring a manual swipe, so the "we're real professionals" framing is seen passively without asking for interaction before the visitor has even committed to starting.

**Open for feedback:** Is the marquee too "look how modern we are" for this audience (likely 35–65, homeowners, not a tech-savvy demo)? Does the CTA button read as the obvious next action against the trust-mark row above it?

---

### 2. Location — step 1/3

**Job:** Confirm the visitor is actually in the service area (so the lead is qualified) and start personalizing immediately.

**On screen:** A Google Map that starts zoomed out showing all 6 colonias as small dots, then a 2×3 grid of colonia pills plus a dashed "Otra colonia" pill for anyone outside the list (with a free-text follow-up field). Picking a colonia pans/zooms the map into that colonia specifically (Google Maps doesn't animate zoom natively, so this is simulated by stepping `setZoom` once per tick).

**Current decisions:** Grid layout (not flex-wrap) so every colonia pill is the same width regardless of name length — "Rancho San Juan" and "Residencial Lago Esmeralda" shouldn't visually compete by size. Map falls back to a static illustrative pin card if no Google Maps API key is configured, so this step never visibly breaks.

**Open for feedback:** With only 6 real colonias plus a catch-all, is a fixed pill grid the right density, or would this benefit from being an autocomplete/search field if the colonia list grows later?

---

### 3. Property specifics — step 2/3

**Job:** Collect just enough structural detail (type, size, rooms, condition, amenities) that the formula on the reveal screen feels personalized, and that a broker has a real starting point later.

**On screen:** A "bento grid" of bordered cards inside one step: tipo de propiedad (segmented control: Casa/Departamento/Terreno), m² construcción + m² terreno, recámaras + baños (quick-pick pills 1–5+), condition, and amenities.

**Condition picker** — three expandable pills: **Nueva / Buen estado (default) / Necesita renovación**. Clicking one expands it (grows, shows a one-line description) while the other two shrink and fade to ~55% opacity. This maps to the same 4-value canonical scale used internally (`Necesita renovación` stores as `'Para reformar'`) — the 4th value, `Remodelada`, is intentionally not offered here since a quick public form doesn't need that much nuance.

**Amenities** — a 2-column grid of chips (Jardín, Alberca, Seguridad 24h, Estacionamiento techado, Cuarto de servicio, Terraza), each with an icon, so it reads as a real checklist rather than a wall of text buttons. Recently changed from a wrapped flex row (each chip's width driven by its label length) to a fixed 2-col grid so every chip is equal width.

**Open for feedback:** The equal-width grid means short labels like "Terraza" now sit inside a box with a lot of empty space next to a wrapped two-line label like "Estacionamiento techado" — does that read as intentional (a checklist) or just uneven? Also worth an eye on the condition picker's expand/recede motion — is 3 pills at rest-width vs. 1 expanded pill a legible pattern, or does it read as "broken layout" mid-animation on a slow phone?

---

### 4. Analyzing (transition, no step count)

**Job:** Bridge the "I just answered a bunch of questions" moment and the "now give me your phone number" ask, without feeling like a fake loading spinner.

**On screen:** A narrated 4-stage checklist (each stage explains *why* it matters, e.g. "Revisando nuestro portafolio activo — tenemos inventario real en tu zona, comparamos contra propiedades que existen, no las adivinamos"), paired with a radar-scan animation over three property-card silhouettes that visibly sharpen as stages complete. When the last stage finishes, the radar cross-fades into a checkmark "stamp" (Referencia lista) with the full checklist checked off, holds briefly, then the whole screen fades/slides out before the contact form appears — a deliberate beat rather than an abrupt cut.

**Current decisions:** Total duration is ~5.1 seconds (4 stages × 950ms + an 850ms hold on the completion stamp + a 500ms exit transition). This is copy doing real work — it's the one place we explicitly say "no un algoritmo genérico" / "lo arma un asesor humano," seeding the idea that a human is involved before we even ask for contact info.

**Open for feedback:** Is ~5 seconds too long for a screen with no user input? Does the completion "stamp" moment feel earned, or is it an animation for animation's sake?

---

### 5. Contact — step 3/3

**Job:** The actual conversion event — name, WhatsApp number, optional timeline, and consent.

**On screen:** Plain form: nombre completo, teléfono/WhatsApp, an optional "¿cuándo te gustaría vender?" select, a required consent checkbox linking the aviso de privacidad, and a submit button labeled "Ver mi estimación" (not "Enviar" — framed as unlocking something, not submitting a form). A hidden honeypot field catches bots.

**Current decisions:** Deliberately the plainest, most form-like screen in the flow — no illustrations, no persuasion copy beyond the title "Ya casi está." The persuasion work was already done by the previous four screens; this screen's only job is to not introduce friction.

**Open for feedback:** Nothing especially novel here — this is the screen most worth a conventional "reduce form friction" pass (field order, error state clarity, whether the consent checkbox copy is scannable).

---

### 6. Reveal (teaser — no step count)

**Job:** Reward the visitor immediately (so handing over contact info didn't feel like a one-way data grab), while being unmistakable that this is a preliminary teaser, not the final ACM, and driving them to WhatsApp an advisor *now* if they want to skip the wait.

**On screen, top to bottom:**
1. **Reassurance + advisor + price card** (dark "ink" panel — the one screen that breaks from the light form aesthetic): a "Recibimos tu información" eyebrow, the **assigned advisor's real photo and name** (randomized once per visit between Rogelio and Tere, so the team can compare inbound WhatsApp volume), a thank-you headline naming the visitor, a callout box stating explicitly *"Esto todavía no es el paso final"* and that the team will build a personalized ACM, then — inside the same card — the price range itself: "Tu propiedad estaría en un rango de $X a $Y," a line about the colonia's typical range, and a horizontal min/max/estimado positioning bar.
2. **Metodología** — a light card, 3-step numbered list (homologamos tu propiedad → cruzamos contra portafolio activo → un asesor humano lo revisa), explaining *how* the number was produced without pretending it's a full ACM.
3. **Testimonials carousel** — a swipeable row of real client quotes (5-star ratings, name + quote, no avatars) for social proof.
4. **A persistent WhatsApp CTA bar** — fixed to the bottom of the viewport (not a card at the end of the scroll), showing the same advisor's photo/name and a "Hablemos ahora" button, reachable no matter how far the visitor has scrolled.

**Current decisions, and why they changed recently:**
- The price used to be **blurred** ("teaser" framing) with a separate reveal card below the reassurance panel. Both changed: blur felt "suspicious, like we're hiding something" (direct user feedback), so numbers are now shown plainly with future-tense phrasing to keep the *teaser* framing without visual obfuscation. And the price range was folded into the same first card as the advisor photo, so the "here's your human contact" and "here's your number" moments read as one beat instead of two separate cards competing for attention.
- The advisor photo moved from a card at the very bottom (easy to miss on a long scroll) to (a) the top card, for an immediate human face, and (b) a sticky bar, so the CTA is never more than a thumb-reach away regardless of scroll position.
- Testimonials replaced what used to be a carousel of real property listings — the listings proved the portfolio was real, but a stranger's WhatsApp-review-style quote does more to counter "is this just a lead-gen form" skepticism than a listing card does.

**Open for feedback:** This is the screen most worth scrutiny — it's carrying the most jobs (reassurance, human warmth, the actual payoff number, methodology, social proof, and a live CTA) in one scroll:
- Does stacking advisor photo + thank-you + "not the final step" disclaimer + price range into **one** dark card feel dense/overloaded for the first thing someone reads after submitting a form, or does it work as one coherent "here's what just happened" moment?
- Does the persistent bottom CTA bar feel helpful or intrusive on a real phone (especially stacked against iOS Safari's own bottom chrome)?
- Is 4 stacked sections (card + methodology + testimonials + sticky bar) the right length for this screen, or does it dilute the "you got your answer" payoff by asking for more scrolling right after the ask that mattered (contact info) is already done?

## Known technical constraints worth knowing before proposing changes

- Everything is built mobile-first inside a centered `max-w-md` (~448px) column; there's no distinct desktop layout today.
- Advisor and colonia data (photos, coordinates, pricing baselines) come from Habitanza's real, live portfolio — changing *what* is shown (e.g. adding advisors, colonias) is a content change in `shared/advisors.ts` / `shared/neighborhoods.ts` / `shared/pricing.ts`, not a design constraint.
- The Google Map on the location step requires a configured API key in production; it degrades gracefully to a static pin card without one, so that's not a case a redesign needs to special-case.
