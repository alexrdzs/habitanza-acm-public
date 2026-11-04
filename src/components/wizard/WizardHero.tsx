import { ArrowRight, Search, ListChecks, Sparkles, UserCheck, ShieldCheck, Award, Database, MapPin, LineChart, MessageCircle, Building2 } from 'lucide-react';
import { COPY } from '@shared/copy';
import { Logo } from '../Logo';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { TeamSection } from './TeamSection';
import { MethodologySection } from './MethodologySection';

interface Props {
  onStart: () => void;
  /** Event mode: no team loop, the brokers are right there. */
  eventMode?: boolean;
  wide?: boolean;
}

// Order-matched with COPY.hero.trustMarks.
const TRUST_MARK_ICONS = [ShieldCheck, Award, Database];

// Order-matched with COPY.methodology.steps.
const METHOD_ICONS = [Search, ListChecks, Sparkles, UserCheck];

// Order-matched with COPY.hero.expertiseCards.
const EXPERTISE_CARD_ICONS = [MapPin, LineChart, MessageCircle, Building2];

// One set of 4 cards is only ~740px wide. The marquee translates by half
// the track, so the track must be at least one viewport plus one set wide
// or wide screens see the content run out and a blank stretch scroll by.
// Four copies (~2.9k px) covers desktop with margin, and an even count
// keeps the -50% loop point exactly at a set boundary.
const EXPERTISE_MARQUEE_COPIES = 4;

function CtaButton({ onStart }: { onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="rounded-pill bg-brand-500 bg-brand-gradient px-9 py-4 text-base font-semibold text-white transition-all active:scale-95 "
    >
      {COPY.hero.ctaLabel}
    </button>
  );
}

// Methodology, short: the four step titles with their icons, regular-bold weight.
function MethodList({ className = '' }: { className?: string }) {
  const { eyebrow, steps } = COPY.methodology;
  return (
    <div className={`space-y-3 ${className}`}>
      <p className="text-sm font-bold uppercase tracking-wider text-neutral-500">{eyebrow}</p>
      <ul className="space-y-2.5">
        {steps.map((st, i) => {
          const Icon = METHOD_ICONS[i];
          return (
            <li key={st.title} className="flex items-center gap-3 text-base font-semibold text-neutral-800 md:text-lg">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/12 text-brand-700">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              {st.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Event mode home: one screen, no scroll. Headline on the left; subtitle,
// benefits and the button, inside a glass card, on the right. Stacks on
// narrow screens.
function EventHero({ onStart, wide }: { onStart: () => void; wide: boolean }) {
  const H = COPY.heroEvent;
  const rise = 'animate-in duration-700 fade-in slide-in-from-bottom-4 [animation-fill-mode:both]';
  // Wide: the subtitle and benefits live in the side panel (the same panel the
  // steps use), so only the headline and the button stay here.
  if (wide) {
    return (
      <div className="relative flex flex-1 flex-col justify-between py-4">
        <Logo className={`h-12 self-start text-neutral-900 ${rise}`} />
        <div className="space-y-10 pl-8 xl:pl-12">
          <h1
            className={`pb-2 text-neutral-900 text-7xl font-extrabold leading-[1.02] tracking-[-0.04em] text-balance xl:text-8xl ${rise} [animation-delay:120ms]`}
          >
            {H.headline}
          </h1>
          <MethodList className={`${rise} [animation-delay:260ms]`} />
          <button
            onClick={onStart}
            className={`flex items-center gap-3 rounded-pill bg-brand-500 bg-brand-gradient px-10 py-5 text-xl font-semibold text-white transition-all active:scale-95 ${rise} [animation-delay:380ms]`}
          >
            {H.ctaLabel}
            <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
        <div />
      </div>
    );
  }
  return (
    <div className="relative flex flex-1 flex-col justify-center gap-10 py-8">
      <div className="space-y-8 lg:flex-1">
        <Logo className={`hidden h-12 text-neutral-900 lg:block ${rise}`} />
        <h1
          className={`pb-2 text-neutral-900 text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-balance md:text-7xl lg:text-8xl ${rise} [animation-delay:120ms]`}
        >
          {H.headline}
        </h1>
        <MethodList />
      </div>

      <div
        className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-parchment-card/55 p-7 shadow-[0_40px_90px_-40px_rgba(20,83,45,0.45),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 md:p-9 lg:flex-[1.3] ${rise} [animation-delay:260ms]`}
      >
        {/* Specular sheen: light catching the top-left edge of the glass. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-white/0 to-white/0" />
        <div className="relative space-y-7">
          <div className="space-y-3">
            <p className="text-2xl font-bold tracking-tight text-emerald-deep md:text-3xl">{H.tagline}</p>
            <p className="max-w-xl text-lg leading-relaxed text-neutral-700 md:text-xl">{H.body}</p>
          </div>
          <ul className="space-y-4">
            {H.bullets.map((label, i) => {
              const Icon = TRUST_MARK_ICONS[i];
              return (
                <li key={label} className="flex items-center gap-4 text-lg font-medium text-neutral-900 md:text-xl">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-300/50 to-brand-500/25 text-brand-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-brand-500/20">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  {label}
                </li>
              );
            })}
          </ul>
          <button
            onClick={onStart}
            className="w-full rounded-pill bg-brand-500 bg-brand-gradient px-12 py-5 text-xl font-semibold text-white transition-all active:scale-95 sm:w-auto sm:min-w-[280px]"
          >
            {H.ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function WizardHero({ onStart, eventMode, wide = false }: Props) {
  if (eventMode) return <EventHero onStart={onStart} wide={wide} />;
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 py-6 text-center duration-700">
      <div className="space-y-5">
        <div className="space-y-1.5">
          <h1 className="text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-neutral-900 md:text-5xl">
            {COPY.hero.headline}
          </h1>
          <p className="text-sm font-semibold text-emerald-deep md:text-base">{COPY.hero.tagline}</p>
        </div>
        <p className="mx-auto max-w-sm text-base leading-relaxed text-neutral-600 md:text-lg">{COPY.hero.body}</p>
      </div>

      <CtaButton onStart={onStart} />

      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-neutral-300">
        {COPY.hero.trustMarks.map((label, i) => {
          const Icon = TRUST_MARK_ICONS[i];
          return (
            <div key={label} className={`flex items-center gap-2 px-5 ${i === 0 ? 'sm:pl-0' : ''}`}>
              <Icon className="h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-400" />
              <p className="text-left text-[13px] font-medium leading-snug text-neutral-600">{label}</p>
            </div>
          );
        })}
      </div>

      <TeamSection />

      <div
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden lg:left-0 lg:w-full lg:translate-x-0 pb-2 pt-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {/* Spacing lives on each card (mr-4), not as a flex gap on the
            track: the repeating unit must have uniform width or the -50%
            loop point lands mid-gap and the loop visibly jumps. */}
        <div className="marquee-track flex w-max">
          {Array.from({ length: EXPERTISE_MARQUEE_COPIES }, () => COPY.hero.expertiseCards).flat().map(({ title, detail }, i) => {
            const Icon = EXPERTISE_CARD_ICONS[i % EXPERTISE_CARD_ICONS.length];
            return (
              <div
                key={`${title}-${i}`}
                aria-hidden={i >= COPY.hero.expertiseCards.length || undefined}
                className="mr-4 flex w-[168px] flex-shrink-0 flex-col gap-2.5 rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 text-left shadow-[0_8px_20px_-10px_rgba(16,32,26,0.25)] backdrop-blur-md"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-deep/10">
                  <Icon className="h-4 w-4 text-emerald-deep" />
                </div>
                <p className="text-[13px] font-bold leading-snug text-neutral-900">{title}</p>
                <p className="text-[11.5px] md:text-xs leading-relaxed text-neutral-500">{detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      <MethodologySection />

      {/* Secondary trust module -- real client testimonials, moved here from
          the reveal screen so people have this reassurance before handing
          over contact info, not after. */}
      <TestimonialsCarousel />

      <CtaButton onStart={onStart} />
    </div>
  );
}
