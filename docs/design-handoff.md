# Design handoff — Zona Esmeralda valuation wizard

Live at: https://habitanza-acm-public.vercel.app/ (no login needed — it's a public landing page). Best viewed on a phone-sized viewport; the whole flow is designed mobile-first inside a ~448px-wide column.

This doc explains **what each screen does today and why it's built the way it is**, so a designer (or an engineer picking this up cold) can react to intent, not just pixels. It's not a UI spec — it's the brief for a design review. For the *reasoning patterns* behind past feedback (tone, motion philosophy, how to interpret vague notes on this project), see `CLAUDE.md` at the repo root — that file is durable principles; this one is a snapshot of the current screens.

## What this actually is

A 6-step wizard for homeowners in specific fraccionamientos of "Zona Esmeralda" (Atizapán de Zaragoza) who want to know what their house is worth. It is **not** the real valuation tool — it's a public marketing funnel that sits in front of it.

The single business goal: **collect a name, WhatsApp number, and enough property detail that a human advisor (Rogelio or Tere) can follow up with a real, personalized Análisis Comparativo de Mercado (ACM)**. Every screen either moves someone toward giving that info, or reduces the anxiety that makes people abandon a lead form halfway through.

Two constraints shape almost every design decision below:
- **No fabrication.** The price range shown is a real (if rough) formula off real portfolio data, never invented. The testimonials are real client quotes. The team roster, advisor photos, listing photos, and colonia coordinates are all sourced from Habitanza's real inventory. If a screen ever looks like it's showing an invented number or a made-up quote, that's a bug, not a shortcut.
- **This page is deliberately honest that it isn't the final step.** An earlier version blurred the estimated price to signal "this is just a teaser" — feedback was that blurring reads as *hiding something*, which is worse than just saying it plainly. Copy does that job instead: future-tense phrasing ("tu propiedad **estaría** en un rango de..."), an explicit line that the range is a historical average, and naming the specific advisor who'll follow up with the real number.

## Visual identity, for quick reference

- **Font:** Figtree everywhere — it's the only family loaded (`src/index.css`). There's no separate mono face; numeric data (prices, m², counts, step numbers) is set in Figtree with `tabular-nums` (and usually `font-bold`) so figures align in a column and read like a ledger entry, not conversational text.
- **Palette:** not a generic SaaS palette — built around the literal meaning of "Esmeralda" (emerald).

  | Token | Hex | Use |
  |---|---|---|
  | `brand-500` | `#25D366` | The literal Habitanza logo/WhatsApp green — primary CTAs, active-state accents |
  | `emerald-deep` / `emerald-glow` | `#146C48` / `#4ADE80` | Rings, icon chips, the reveal card's ambient glow |
  | `ink` / `ink-soft` | `#0c0a09` / `#1c1917` | Dark panel background — the reveal screen's price card only. A near-black (matches the full ACM report's darkest surface); the green in this panel comes from the glow accent, not the surface (an earlier emerald-tinted ink read as "dark green" and was rejected) |
  | `parchment` / `parchment-card` | `#F5F6F6` / `#FDFCF8` | Page background / card background — deliberately a **cool light gray**, not the warm beige this used to be; a very subtle top-to-bottom gradient sits on `<body>` for depth |
  | `brass` / `brass-soft` | `#A9814F` / `#CDB07C` | Hairline trim, "valuation seal" accents |
  | `sky-400`, `amber-500` | Tailwind defaults | Condition-picker accent colors only (see Basics screen) — not part of the core brand palette |

- **Glass chrome, used consistently.** The sticky header and the sticky bottom advisor CTA share one frosted-glass recipe (`bg-parchment-card/80` + `backdrop-blur-md` + a soft hairline border) — content visibly blurs behind them while scrolling. The same translucent treatment is applied to every card in the app (step shell, Metodología, Team, testimonial cards, the Hero's expertise marquee, form sections), so the whole page reads as one consistent system of frosted surfaces floating over the gradient background, not a mix of solid and glass cards.
- **Motif:** a thin brass hairline with a small rotated-square "facet" mark — a restrained nod to a cut gem — sits atop every step card (`WizardShell`) and once on the Hero, between the CTA and the trust-mark row.
- **The reveal screen's price card is deliberately staged like a certificate/appraisal being issued** (dark ink ground, brass trim, a slow breathing glow, and a very low-opacity rotating sheen) — distinct from every other (light, glass) card in the app, because it's the one moment meant to feel like a payoff, not a form.

## The flow

Six steps, tracked by a `step` state machine: `hero → location → basics → analyzing → contact → reveal`. A visual 1-2-3 stepper (filled circles connected by a line, checkmarks for completed steps) appears on **location, basics, and contact only** — hero, analyzing, and reveal intentionally don't show step count, since they aren't "fill out a field" steps. Every step change scrolls the window back to the top.

---

### 1. Hero

**Job:** Get a cold visitor (probably from an ad or WhatsApp share) to believe this is worth 90 seconds, and hand-hold them into starting.

**On screen, top to bottom:**
1. Eyebrow ("Zona Esmeralda · Atizapán de Zaragoza"), headline **"¿Cuánto vale mi casa hoy?"**, a short colored tagline ("Análisis de mercado y competencia"), and one line of body copy ("Conoce el valor real de tu propiedad hoy, con datos de tu zona.").
2. Primary CTA — **"Conoce el valor de tu propiedad."**
3. Three trust marks: **Sin ningún costo · Asesores locales · Con data actualizada.**
4. **Team section** (a glass card): eyebrow "Tu equipo en la zona," title "Tu equipo de profesionales," a subline naming the zones covered, a reverse-scrolling marquee of the full real team roster (photo + first/last name, no titles), a plain company-wide statement ("Más de 15 años de experiencia en Zona Esmeralda. Conocemos muy bien el mercado y qué lo hace único." — deliberately **not** attributed to any one person, no avatar or name attached to it), and a 3-item checklist (acompañamiento, tecnología, alianzas).
5. An auto-scrolling marquee of four "why us" expertise cards (Conocimiento local, Método basado en datos, Acompañamiento real, Portafolio activo) — scrolls the opposite direction from the team marquee above it so the two don't read as one continuous conveyor.
6. **Metodología** card (shared component, also reused on the reveal screen — see below).
7. Testimonials carousel (see reveal screen for detail — same component, appears here too).
8. Primary CTA again, repeated at the bottom.

**Current decisions:** Only one CTA action on the whole screen (repeated top and bottom, same label) — no secondary/ghost action. The team marquee and expertise marquee scroll in opposite directions on purpose. The "years of experience" line was originally styled as a quote attributed to one team member by name — that went through two corrections (see `CLAUDE.md`) and landed on plain, unattributed statement text, since it's a claim about the whole company, not one person's opinion.

**Open for feedback:** This screen now carries a lot of vertical real estate (headline block → CTA → trust marks → team card → expertise marquee → methodology → testimonials → CTA) before a first-time visitor reaches anything else. Does the order feel right, or should something further down (methodology, testimonials) move earlier/later? Is the team roster's reverse-marquee legible at a glance, or does it read as decoration you'd scroll past without registering?

---

### 2. Location — step 1/3

**Job:** Confirm the visitor is actually in the service area (so the lead is qualified) and start personalizing immediately.

**On screen:** A 2-column grid of the six primary fraccionamientos, each a photo card (real listing photo where available, a house-icon placeholder otherwise). **Tapping a card selects it and auto-advances to the next step** — no separate "Continuar" tap for this path; a brief checkmark/scale confirmation plays first so the transition doesn't feel abrupt. Below the grid, a "Ver más opciones" tile shows a small fanned stack of real listing photos (an Airbnb-style "show more photos" teaser) plus a count of additional fraccionamientos; tapping it expands a panel of full-width pills (one per row, not a grid) for five more real fraccionamientos plus a dashed "Otro fraccionamiento" pill. Picking one of those pills also auto-advances; picking "Otro fraccionamiento" instead reveals a free-text field and its own local "Continuar" button (since it needs typed input before it can proceed).

**Current decisions:** There is **no map on this step anymore** — an earlier version had a Google Map here; it was removed in favor of the photo grid, and the map now only appears later, as an animated visual on the Analyzing screen. The teaser photo stack on "Ver más opciones" is not tied to any specific hidden fraccionamiento — it's a decorative sample pulled from whatever listings exist (`shared/comparableListings.ts`'s `sampleListingPhotos()`), so it never needs to be hand-updated if listings change.

**Open for feedback:** With auto-advance now the default interaction, is the brief confirmation animation (~400ms) long enough to feel intentional but not sluggish? Is a 2-column grid still the right density for six options, or does the "Ver más" panel's five additional fraccionamientos deserve more visual weight given they have no listing photos of their own yet?

---

### 3. Property specifics — step 2/3

**Job:** Collect just enough structural detail (type, size, rooms, condition, features) that the formula on the reveal screen feels personalized, and that a broker has a real starting point later.

**On screen:** A "bento grid" of glass-card sections inside one step: tipo de propiedad (segmented control: Casa/Departamento/Terreno), m² construcción + m² terreno, recámaras + baños (quick-pick pills 1–5+), condition, and "Características especiales."

**Condition picker** — three expandable pills, each with its own accent color when active: **Nueva (light blue) / Buen estado (brand green, default) / Necesita renovación (amber).** Clicking one expands it (grows, shows a one-line description, switches to its color) while the other two shrink and fade. This maps to the same 4-value canonical scale used internally (`Necesita renovación` stores as `'Para reformar'`) — the 4th value, `Remodelada`, is intentionally not offered here; a quick public form doesn't need that much nuance.

**Características especiales** — a 2-column grid of icon chips: **Casa inteligente, Calefacción integrada, Jardín muy amplio, Salón de juegos, Alberca o Jacuzzi, Vistas panorámicas.** (This section used to be labeled "Amenidades" with a different, more generic list — Seguridad 24h, Estacionamiento techado, etc. — and was renamed and re-scoped to feel more like differentiating features than a checklist of standard amenities.)

**Open for feedback:** The condition picker's three distinct accent colors are new — do green/blue/amber read as intuitive at-a-glance signals (good/new/needs-work), or does adding color risk implying something about market value that the copy doesn't actually claim? Also worth an eye on the "Características especiales" 2-column grid at longer label lengths ("Calefacción integrada" wraps to two lines next to a one-line "Casa inteligente") — does the uneven wrap read as a real checklist, or as visually uneven?

---

### 4. Analyzing (transition, no step count)

**Job:** Bridge the "I just answered a bunch of questions" moment and the "now give me your phone number" ask, without feeling like a fake loading spinner.

**On screen:** A narrated 4-stage checklist (each stage explains *why* it matters, e.g. "Revisando nuestro portafolio activo: tenemos inventario real en tu zona, comparamos contra propiedades que existen, no las adivinamos"), paired with a real animated Google Map — not an abstract loading animation. The map starts zoomed out, centered on the visitor's own fraccionamiento with the rest of the zone's fraccionamientos scattered around it as small gray dots for context, then narrows and zooms into that fraccionamiento's real comps (green pins) once the second stage begins. When the last stage finishes, the map cross-fades into a checkmark "stamp" (**"Referencia lista"**) with the full checklist checked off, holds briefly, then the whole screen fades/slides out before the contact form appears.

**Current decisions:** Total duration is ~5.1 seconds (4 stages × 950ms + an 850ms hold on the completion stamp + a 500ms exit transition). This is copy doing real work — it's the one place the flow explicitly says "no un algoritmo genérico" / "lo arma un asesor humano," seeding the idea that a human is involved before contact info is even asked for. Falls back to a static "Comparando contra propiedades reales en tu zona" panel if no Google Maps API key is configured, so this step never visibly breaks.

**Open for feedback:** Is ~5 seconds too long for a screen with no user input? Does the map's zoom-out-then-narrow motion read clearly as "we're focusing in on your area," or does it need a clearer visual cue for what's happening?

---

### 5. Contact — step 3/3

**Job:** The actual conversion event — name, WhatsApp number, an optional referral-source question, and consent.

**On screen:** Title **"Cuéntanos de ti,"** description "Te enviamos tu rango de valor y el contacto de tu asesor." Fields: nombre completo, teléfono/WhatsApp, an optional **"¿Cómo nos conociste?"** select (Publicidad / Redes Sociales / Recomendación / Otro, with a free-text field that appears if "Otro" is picked; the default option reads "Seleccionar...", a neutral placeholder), a required consent checkbox linking the aviso de privacidad, and a submit button labeled **"Ver mi estimación"** (framed as unlocking something, not submitting a form). A hidden honeypot field catches bots.

**Current decisions:** A previous version also asked "¿Cuándo te gustaría vender?" — that field was removed entirely (client, shared types, and the API payload) for feeling like unnecessary pressure this late in the funnel; every optional field on the last step has a real conversion cost. Still deliberately the plainest, most form-like screen in the flow — the persuasion work was already done by the previous screens.

**Open for feedback:** Nothing especially novel here — this is the screen most worth a conventional "reduce form friction" pass (field order, error state clarity, whether the consent checkbox copy is scannable).

---

### 6. Reveal (teaser — no step count)

**Job:** Reward the visitor immediately (so handing over contact info didn't feel like a one-way data grab), while being unmistakable that this is a preliminary teaser, not the final ACM, and driving them to WhatsApp an advisor *now* if they want to skip the wait.

The whole screen is deliberately staged as a **preview of the real ACM**: the numbered chapters below (01/02/03) mirror the authenticated report's own structure so this reads as the opening of a longer document, not a one-off widget.

**On screen, top to bottom:**
1. **Plain-text greeting** (not a card): "Muchas gracias, {nombre}." / "Con esta información podemos darte un rango aproximado." Centered on mobile, left-aligned at desktop widths.
2. **The price panel** — the one dark "ink" panel that breaks from the light glass aesthetic everywhere else, staged like a certificate: a slow breathing glow (ambient "this is alive" motion, not a loading indicator), a **"Rango preliminar"** chip, the prefix "Tu propiedad podría estar en un rango de:", the headline low–high range (the two numbers fade/slide in with a short stagger), the horizontal min/máx/"Precio aprox" positioning bar (see the implementation section — a red-amber-green plausible range that draws itself in, a frosted-glass "likely" band pill, and the estimate pin landing last), the **assigned advisor's** face + a short note (randomized once per visit between Rogelio and Tere, with correct gender agreement), a **"Chatear ahora"** CTA, a fine-print disclaimer that the range is a historical average, and a **"Tu análisis continúa"** scroll cue so the panel never reads as the end of the screen.
3. **"Análisis de tu propiedad"** (chip: "Análisis individual") — the visitor's own data turned into a read. It opens with a **"Fortalezas y debilidades"** box: a plain-language paragraph that leads with size (built m² + lot vs the zone) then bridges into recámaras/baños, with each standout concept highlighted green (a strength) or red (a drag). Below it, a 3-column recap of their inputs carries the same comparison as up/down/in-line trend arrows, the característica chips, and a derived **"precio aprox por m²."** (See the implementation section for how the highlighting and benchmarks work.)
4. **"01 Pulso del Mercado"** — three stat tiles (referencia por m², referencias activas, amplitud de tu rango), all derived from real portfolio data or the visitor's own estimate.
5. **"02 Referencias del Mercado"** — an "oferta pública, no de cierre" note, plus a small map + a scroll of mini listing cards where real comps exist for the fraccionamiento; falls back to an honest "todavía no tenemos comparables específicos…" / "en investigación" message where they don't.
6. **"03 Tu ACM Completo"** — quantifies the gap between the range's mín and máx and names exactly what the full ACM adds on top (a 3-item checklist), so "the range is all I needed" isn't the exit thought.
7. **Metodología** — same shared card as the Hero, a 3-step numbered list explaining how the number was produced without claiming it's a full ACM.
8. **Testimonials carousel**, repeated from the Hero — one more nudge of social proof right before deciding whether to reach out.
9. **Advisor closing section + a persistent WhatsApp CTA bar.** The closing card carries the advisor's photo/name/title again and the longer inline CTA; the sticky bottom bar (shorter static **"Chatear ahora"** — it has much less horizontal room) only slides into view once the price panel has scrolled away and yields while the closing card's own CTA is on screen, so two green buttons never stack.

**Current decisions, and why they changed:**
- The screen now mirrors the full ACM's **chaptered structure** (numbered 01/02/03) so the teaser reads as a preview of the real document, and a per-property **"Fortalezas y debilidades"** analysis leads the individual card — size first, because m² is the most fundamental buyer criterion, then distribution.
- The price used to be **blurred**; feedback was that blurring reads as "hiding something," so the range is shown plainly, with future-tense phrasing and a "historical average" caption doing the honesty work instead.
- The advisor's identity block was originally a left-aligned row sharing space with the CTA button — a real name plus a real job title plus a CTA don't reliably fit one row at 390px. It's now a centered, stacked block (photo → name → title → full-width CTA).
- The reveal screen's original first-person "cuando platiquemos, te armo un cálculo..." paragraph was rewritten to third person, naming the advisor directly, once the identity block below it made clear who's speaking.
- Testimonials now appear **twice** (Hero and Reveal) — a deliberate repeat, not an oversight.

**Open for feedback:** This screen still carries the most jobs (reassurance, the payoff number, a named human, methodology, market context, social proof, a live CTA) across one scroll. Does the price card's ambient glow/sheen animation read as "premium" or as a distraction from the number itself? Is six stacked sections (price card + market card + methodology + testimonials + sticky bar) still the right length, or does it dilute the payoff by asking for more scrolling right after the thing that mattered (contact info) is already submitted?

## How the surfaces are built — cards, values, and the price panel

This is the implementation companion to the visual identity above: the concrete recipes behind the recurring surfaces, so a change to one card is made the same way everywhere and a new element inherits the existing system instead of inventing a parallel one. All tokens referenced here live in the `@theme` block of `src/index.css`.

### The glass card — one recipe, used everywhere

Every light card in the app is the same lockup:

```
rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 backdrop-blur-md md:p-8
```

- `bg-parchment-card/80` + `backdrop-blur-md` **is** the frosted glass: the near-white card surface at 80% opacity, with the page's subtle background gradient blurring through it as you scroll. The identical recipe is on the sticky header and the sticky bottom CTA, so chrome and content read as one system of frosted surfaces, not a mix of solid and glass.
- `rounded-card-lg` = `--radius-card-lg` (2rem). Radii are tokens (`--radius-card`, `--radius-card-lg`, `--radius-input`, `--radius-pill`), never magic numbers.
- The standard in-card header is a `SectionChip` (small pill label — numbered "01…/02…/03…" for the reveal chapters, neutral/uncentered elsewhere) followed by a `text-base font-bold` title.

### Subtle inner boxes — "back sutil que facilita la lectura"

When a block *inside* a card needs to read as its own callout, it gets a flat, **non-glass** inner box — deliberately the opposite of the card, a quiet solid ground that lifts reading text off the surface:

```
rounded-xl border border-neutral-100 bg-neutral-50 p-4
```

Reused for: the reveal's "01" stat tiles, the "02" market note (with a `border-l-4 border-brand-500` accent stripe), and the "Fortalezas y debilidades" analysis box. If you add a new "read this" block, use this box — don't stack another glass layer inside a glass card.

### Values — how numbers and the analysis read

- **Numerals:** Figtree with `tabular-nums` (+ usually `font-bold`), so prices/m²/counts align in a column. There is no separate mono font.
- **Spec recap** (`PropertySummaryCard`): a 3-column `<dl>` echoing the visitor's own inputs; each cell can carry a trend arrow vs the zone's real listings — `ArrowUpRight` (brand green = above the zone), `ArrowDownRight` (red = a drag), `Equal` (blue = in line). Benchmarks are medians of real comps (`zoneTypicalSpecs()` / `zoneTypicalTerrenoM2()` in `shared/comparableListings.ts`); a field with no benchmark shows no arrow rather than compare against a fabricated number.
- **The analysis paragraph is data, not prose-with-color.** `COPY.reveal.propertyCard.analysisSegments()` returns an array of `{ t, tone? }` segments; the component renders a toned segment as a soft highlighter (`bg-brand-500/10` green for a strength, `bg-red-500/10` red for a drag) and a plain segment as normal text. Each toned segment is a **complete concept** ("menos m² de construcción", "más recámaras"), held on one line with `whitespace-nowrap`, so a finding reads as an annotation rather than a stray colored word. The paragraph leads with size (built m² + lot), then bridges into rooms/baths; a `analysisTitle` opens the box and a `analysisClosing` line points at strategy.
- **Derived per-m²:** the estimate's mid spread across the visitor's own built (or lot) m², rounded to a clean step so it stays directional, not falsely precise.

### The price panel and its glass "range" bar

The reveal's price card is the **one** surface that breaks the light-glass system — the dark `bg-ink` (#0c0a09) panel, staged like a certificate being issued:

- **Ambient motion, not loading:** a low-opacity brand-green blob runs `animate-glow-pulse` (a 5s breathing scale/opacity cycle, defined in `index.css`) — reads as "alive," never as a spinner.
- **The range bar (`PreliminaryPricingBar`)** reads in three layers:
  1. A full-width **gradient bar = the plausible range**: red at both ends (fuera de mercado), easing through amber into green in the middle. It `animate-draw-line`s in from the left (an ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)` scaleX) so it reads as being plotted, not just fading in.
  2. A **frosted-glass "likely band" pill** floating over the middle — `bg-white/15 border border-white/45 backdrop-blur-[2px]` — the same glass idea as the app's cards, here as a translucent band that rides with the estimate and is clamped so it never crosses into the red.
  3. The **"Precio aprox" pin** lands last (delayed fade/zoom) at the estimate's real position within `[low, high]`, as the payoff.

  The staggered delays (bar → ticks → pill → pin) are the "premium means restrained" reveal; every custom animation collapses to its end state under `prefers-reduced-motion` (global override in `index.css`).

### Light/dark without `dark:` everywhere

The theme flips by **remapping the semantic tokens** under `prefers-color-scheme: dark` in `index.css`, not by sprinkling `dark:` on every element: the green-grey neutral ramp inverts (so `text-neutral-900` becomes near-white, `bg-neutral-50`/`border-neutral-200` go dark) and `parchment`/`parchment-card` darken. The `bg-ink` price panel is deliberately **left out** of the remap so it stays the deepest black in both themes. Practical consequence for new work: use the neutral ramp semantically (low numbers = surfaces/borders, high numbers = text) and it themes itself — only reach for a `dark:` override for the few direction-dependent accents (a literal `bg-white`, deep-green icons that would vanish on a dark card, the modal scrim). The inline `PulppoLogo` component follows the same idea: it fills with `currentColor` and masks its octopus mark as a transparent cut-out, so one component is ink on the light team card and white on the dark one, with no `<picture>` swap or second asset.

## Known technical constraints worth knowing before proposing changes

- Everything is built mobile-first inside a centered `max-w-md` (~448px) column, widening slightly at `md`/`lg` breakpoints; there's no distinct desktop layout today.
- **All user-facing copy lives in one file:** `shared/copy.ts`. A wording change anywhere in the wizard is a one-file edit — no component hardcodes its own strings. Value/label pairs that are also validated server-side (referral sources, property condition, características especiales, property type) live in `shared/validation.ts` instead, since that file is their real source of truth.
- **All comparable-listing data and photos live in `shared/comparableListings.ts`,** including the helper functions any component should use to look up a photo (`coloniaPhoto`, `sampleListingPhotos`) — no component should hardcode a fraccionamiento name to pick a photo from.
- Advisor and team data (photos, job titles, gender for grammar agreement) come from Habitanza's real roster — `shared/advisors.ts` (the small pool used for WhatsApp CTA rotation) and `shared/team.ts` (the full roster shown on the Hero marquee) are intentionally separate files; adding someone to one does not add them to the other.
- The Google Map on the analyzing screen requires a configured API key in production; it degrades gracefully to a static illustrative panel without one, so that's not a case a redesign needs to special-case.
- See `CLAUDE.md` for the reasoning behind recurring design/motion/copy decisions (glass chrome, animation restraint, attribution rules, truncation testing) — it's meant to be read before proposing changes that might repeat a path already tried and rejected.
