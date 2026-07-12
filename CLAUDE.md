# Design & Product Principles — Zona Esmeralda Valuation Landing

This file captures the **reasoning** behind design and copy decisions made
on this project through many rounds of real feedback, not just the current
state of the code. Read it before making visual, copy, or UX changes — it's
meant to save you from re-deriving conclusions that were already reached
(and in a few cases, reached the hard way, by shipping the wrong thing
first). Project mechanics (stack, commands, file layout, data sourcing
rules) live in `README.md`; this file is about *taste and judgment*.

When a new request seems to rhyme with something below, apply the
principle proactively instead of waiting to be told again.

## Visual language

- **Cool neutral tones, not warm/beige.** The page background is a very
  subtle top-to-bottom gradient within a cool gray range
  (`--color-parchment`), not a cream/beige tone — beige read as dated.
  Keep any gradient "very subtle" — a hint of depth for glass surfaces to
  pick up while scrolling, not a visible band.
- **Glass chrome is a deliberate, consistent system, not a one-off.** The
  sticky header and the sticky bottom advisor CTA share one frosted-glass
  recipe (`bg-parchment-card/80 backdrop-blur-md` + a soft hairline
  border). Once a treatment like this is established for one surface, it
  was extended to *every* card in the app (`WizardShell`, `Methodology`,
  `TeamSection`, testimonial cards, the Hero's expertise marquee, form
  sections) — apply new visual systems site-wide once you introduce them,
  don't leave some cards on the old treatment.
- **Alignment follows the content grid, not habit.** The header logo is
  left-aligned and width-matched to `main`'s container so it sits on the
  literal same left edge as the content below it. Don't default to
  centering something just because it's alone at the top of the page —
  check what it should visually line up with.
- **A dividing line is not the same as "its own space."** A bare `<hr>`-
  style divider under the logo was rejected as feeling redundant/floating.
  What fixed it was giving the element real chrome (its own bar, its own
  background treatment, its own padding) — if something "feels weird" as a
  thin rule, the fix is usually structural (give it a container), not a
  thicker rule.
- **Mobile-first means single-column and centered once content length is
  unpredictable.** The reveal screen's advisor block (photo, name, job
  title) moved from a left-aligned row sharing space with a CTA button to
  a centered, stacked column with a full-width CTA below it — a row that
  has to fit a name + a real job title (e.g. "Director Comercial") + a CTA
  label will not reliably fit on one line at 390px, and forcing it either
  truncates or looks cramped. When two pieces of variable-length text and
  a button all want the same row, stack them instead of shrinking fonts to
  make them fit.
- **"More options" patterns should use full-width pills on mobile**, not a
  cramped multi-column grid — a 2-column grid of pill buttons wastes space
  and makes longer labels wrap awkwardly. A vertical stack of full-width
  pills reads cleaner and is easier to tap.

## Motion

- **Premium means restrained, not flashy.** A digit-scramble "numbers roll
  like a slot machine before landing" reveal was implemented, tested, and
  explicitly rejected as "old school" / "not premium" — even though it
  technically satisfied the literal request ("random numbers landing on
  the final number"). The fix was to satisfy the *underlying intent*
  (build anticipation before the price appears) with a different
  mechanism: numbers fade/slide in with a short stagger, the pricing bar
  draws itself in left-to-right with an ease-out-expo curve
  (`cubic-bezier(0.16, 1, 0.3, 1)`), and the highlighted number lands last
  as the payoff. **Lesson: if a literal implementation of a user's own
  suggestion turns out low-quality once built, don't defend it — propose
  what actually satisfies the goal.**
- Ambient "processing" motion (the ink-panel price card's breathing glow +
  slow rotating sheen) is intentionally very low-opacity and slow (5–9s
  cycles) — it should read as "alive," not as a loading state. If an
  animation could be mistaken for "still working," it's too fast or too
  opaque.
- All custom keyframe animations respect `prefers-reduced-motion` (either
  via the global override in `index.css`, or by skipping straight to the
  end state, as `AnimatedCurrency`-style components did).
- Auto-advancing a step (e.g. selecting a neighborhood card immediately
  continues to the next screen) is good UX when the action is
  unambiguous — pair it with a brief (~300–400ms) visual confirmation
  (checkmark, scale) so the transition doesn't feel abrupt, and always
  leave a manual path (a real Continuar button) for the one sub-case that
  needs typed input (e.g. "Otro fraccionamiento").

## Copy & tone

- **No em dashes.** They read as an AI-writing tic. Use the punctuation
  the sentence actually calls for — period for two separate thoughts,
  comma for a soft pause, colon before an explanation, or a plain
  connector word ("así que", "pero") for a contrastive/causal link.
- **Never let a company-wide claim read as one person's opinion.** A
  15-years-of-experience statement went through three iterations: (1) a
  quote bubble attributed to one team member by first name only — wrong,
  read as personal; (2) full name + job title + a "Validado por
  Habitanza" tag — still wrong, still visually a personal endorsement;
  (3) plain, unattributed statement text, no avatar, no name. **When a
  claim belongs to the company, don't attach a person to it at all** —
  partial attribution (a title, a badge) still reads as personal framing.
- **Prefer real source material over invented narrative.** When Habitanza
  supplied their own "Presentación de Servicios" deck, its actual
  headline, service checklist, and stats were used directly rather than
  writing new copy from scratch — real company positioning beats a
  plausible-sounding rewrite.
- **Terminology: "fraccionamiento," not "colonia,"** in all user-facing
  copy (labels, descriptions, pill text). This was a deliberate,
  wholesale swap — check any new copy against it.
- **No pressure tactics, no unnecessary friction late in the funnel.** A
  "¿Cuándo te gustaría vender?" question was removed from the contact step
  entirely for feeling pushy — every optional field on the last step has
  a real conversion cost, so only keep ones that clearly earn their place.
  Select-field defaults should read as neutral UI convention
  ("Seleccionar...") rather than a value-laden default like "Prefiero no
  decir," which implies the visitor is dodging the question.
- **Real people get real titles.** Advisor role labels are actual job
  titles ("Director Comercial," "Directora de ventas"), not generic
  placeholders like "Tu asesor en la zona." Spanish grammatical gender
  agreement (asesor/asesora, experto/experta) is driven by an explicit
  `gender: 'm' | 'f'` field on the `Advisor` type, not inferred from a
  name or hardcoded per string — any new copy that needs to agree with an
  advisor's gender should read that field.
- **CTA copy should be as specific as the context allows without breaking
  layout.** The reveal screen's primary CTA became "Platicar con
  {advisor's first name}" once it had a full-width row to itself. The
  persistent sticky bottom bar, which has much less horizontal room
  (avatar + name + title + button all in one row), deliberately kept the
  shorter static "Chatear ahora" — match copy length to the space it
  actually has, don't apply the same wording everywhere by default.
- Keep the same overall voice when tightening copy: warm, direct,
  benefit-led, no invented urgency or scarcity. When asked to apply a
  copywriting pass, the brief was explicitly "mantén la misma narrativa" —
  tighten mechanics (lead with the reader's benefit, cut vague filler like
  "Hecho por expertos" in favor of something concrete like "Asesores
  locales"), don't change the personality.

## How to receive feedback on this project

- **Vague or subjective feedback ("feels weird," "feels redundant," "it's
  worst") is a request to diagnose, not to make a superficial tweak.**
  When told a divider "feels weird," the right move was to ask what the
  underlying goal was (give the logo its own space, make it feel crafted)
  and design from there — not to nudge the same divider's opacity.
- **When explicitly told "esto es tu decisión,"** make the structural call
  decisively and explain the reasoning in the commit/response — this
  project's owner delegates implementation architecture readily but is
  decisive and specific about outcomes (exact wording, exact colors,
  personal-vs-institutional framing) once articulated. Don't hedge with
  half-measures when given real latitude.
- **Open-ended or strategic questions ("¿qué propones?", "tiene sentido
  la narrativa...?") get a short recommendation plus the main tradeoff,
  not an immediate implementation.** Wait for explicit go-ahead before
  building.
- Corrections sometimes arrive in stages on the same element (see the
  "Alex quote" example above) — that's the owner iterating toward the
  right framing by reacting to what's actually on screen, not a sign the
  earlier fix was sloppy. Treat each round as authoritative over the
  previous one.

## Technical patterns worth reusing

- **One file per content type is the single source of truth; components
  never hardcode a copy of it.**
  - `shared/copy.ts` — every user-facing string in the wizard, organized
    by screen, plain strings/functions only (no JSX). A copy change is a
    one-file edit. Enum-like value/label pairs that are *also* validated
    server-side (`REFERRAL_SOURCES`, `AMENITIES`, `PROPERTY_CONDITIONS`,
    `PUBLIC_PROPERTY_TYPES`) stay in `shared/validation.ts` instead, since
    that's already their source of truth — don't duplicate them into
    `copy.ts` just for consistency's sake.
  - `shared/comparableListings.ts` — every comparable listing (photo,
    price, m², coordinates), plus the only sanctioned lookup helpers
    (`coloniaPhoto`, `sampleListingPhotos`). A component that wants a
    listing photo should never hardcode a colonia name to pick one from —
    that goes stale silently. Derive from the data instead.
  - `shared/testimonials.ts`, `shared/team.ts`, `shared/advisors.ts` —
    same pattern, one array each.
  - When you introduce a new piece of content that's reused or likely to
    be edited again, put it in a `shared/*.ts` file the first time, not
    inline in a component — retrofitting this later means hunting down
    every place a string got duplicated.
- **`api/lead.ts` cannot import runtime values from `shared/*.ts`.**
  Vercel type-strips this function rather than bundling it, so a relative
  import like `../shared/validation` resolves for types (`import type`,
  erased at build time) but not for runtime values. Any runtime constant
  the endpoint needs (colonia lists, amenity lists, referral sources) has
  to be a manually-kept-in-sync inlined copy at the top of `api/lead.ts`,
  with a comment pointing back to the real source. Keep them in sync when
  you change either side.
- **`shared/advisors.ts` and `shared/team.ts` are separate on purpose.**
  `advisors.ts` is the small pool actually used for WhatsApp CTA rotation
  and the reveal screen's "firma" — who's in it is a lead-routing
  decision. `team.ts` is the full roster shown on the Hero's marquee,
  display-only. Don't merge them; adding someone to the marquee should
  never silently put them in the CTA rotation.
- **Never fabricate real estate or personnel data.** Every colonia,
  listing photo, price, coordinate, team member, and testimonial on this
  page is sourced from Habitanza's real portfolio (via the Habitanza MCP
  tools) or supplied directly by the client — never invented to fill a
  gap. If the real data is sparse for something (e.g. an extended colonia
  with no active listings), say so in the UI/copy rather than padding it.

## Verification checklist (do this every round, not just at the end)

1. `npm run lint` (`tsc --noEmit`) and `npm run build` must both pass
   clean before you consider a change done.
2. Start a dev server on a fresh port and drive the **actual flow** with
   Playwright at a mobile viewport (~390×844) — screenshot the screens you
   touched, not just the one component in isolation. Several real bugs in
   this project were only caught this way (a missing `onError` image
   fallback, a server-side validation gap, absolutely-positioned elements
   overflowing their container, text truncation).
3. **Any time you change CTA/label copy, an avatar layout, or anything
   that sits next to a name or title, stress-test truncation against the
   longest realistic content** — the longest advisor name, the longest
   real job title ("Director Comercial" / "Directora de ventas"), the
   longest CTA label — using a programmatic
   `element.scrollWidth > element.clientWidth` check across a few runs,
   not just eyeballing one screenshot. This bit twice in one session
   (once when "Chatear" became "Chatear ahora," again when advisor role
   labels became real job titles) purely because the check wasn't run
   until after the fact.
4. Don't trust "should be fine" for text-adjacent layout changes. Screenshot it.
