import { ShieldCheck, Award, Database, MapPin, LineChart, MessageCircle, Building2 } from 'lucide-react';
import { COPY } from '@shared/copy';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { TeamSection } from './TeamSection';
import { MethodologySection } from './MethodologySection';

interface Props {
  onStart: () => void;
}

// Order-matched with COPY.hero.trustMarks.
const TRUST_MARK_ICONS = [ShieldCheck, Award, Database];

// Order-matched with COPY.hero.expertiseCards.
const EXPERTISE_CARD_ICONS = [MapPin, LineChart, MessageCircle, Building2];

function CtaButton({ onStart }: { onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="rounded-pill bg-brand-500 px-9 py-4 text-base font-semibold text-white shadow-[0_10px_24px_-8px_rgba(37,211,102,0.55)] transition-all hover:bg-brand-600 active:scale-95"
    >
      {COPY.hero.ctaLabel}
    </button>
  );
}

export function WizardHero({ onStart }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 py-6 text-center duration-700">
      <div className="space-y-5">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-deep">
          {COPY.hero.eyebrow}
        </p>
        <div className="space-y-1.5">
          <h1 className="text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-neutral-900 md:text-5xl">
            {COPY.hero.headline}
          </h1>
          <p className="text-sm font-semibold text-emerald-deep md:text-base">{COPY.hero.tagline}</p>
        </div>
        <p className="mx-auto max-w-sm text-base leading-relaxed text-neutral-600 md:text-lg">{COPY.hero.body}</p>
      </div>

      <CtaButton onStart={onStart} />

      <div className="facet-rule mx-auto max-w-xs" />

      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-neutral-300">
        {COPY.hero.trustMarks.map((label, i) => {
          const Icon = TRUST_MARK_ICONS[i];
          return (
            <div key={label} className={`flex items-center gap-2 px-5 ${i === 0 ? 'sm:pl-0' : ''}`}>
              <Icon className="h-4 w-4 flex-shrink-0 text-brass" />
              <p className="text-left text-[13px] font-medium leading-snug text-neutral-600">{label}</p>
            </div>
          );
        })}
      </div>

      <TeamSection />

      <div
        className="-mx-4 overflow-hidden pb-2 pt-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="marquee-track flex w-max gap-3">
          {[...COPY.hero.expertiseCards, ...COPY.hero.expertiseCards].map(({ title, detail }, i) => {
            const Icon = EXPERTISE_CARD_ICONS[i % EXPERTISE_CARD_ICONS.length];
            return (
              <div
                key={`${title}-${i}`}
                className="flex w-[168px] flex-shrink-0 flex-col gap-2.5 rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 text-left shadow-[0_8px_20px_-10px_rgba(16,32,26,0.25)] backdrop-blur-md"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-deep/10">
                  <Icon className="h-4 w-4 text-emerald-deep" />
                </div>
                <p className="text-[13px] font-bold leading-snug text-neutral-900">{title}</p>
                <p className="text-[11.5px] leading-relaxed text-neutral-500">{detail}</p>
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
