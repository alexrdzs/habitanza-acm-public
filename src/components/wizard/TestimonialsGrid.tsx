import { Building2, Database, MapPin, MessageCircle, Quote, Star, type LucideIcon } from 'lucide-react';
import { TESTIMONIALS } from '@shared/testimonials';
import { COPY } from '@shared/copy';

// Order-matched with COPY.hero.expertiseCards.
const SERVICE_ICONS: LucideIcon[] = [MapPin, Database, MessageCircle, Building2];

// Short quotes first so the small cards stay compact.
const QUOTE_ORDER = ['Alberto G.', 'Elizabeth M.', 'Jorge C.'];
const quotes = QUOTE_ORDER.map((n) => TESTIMONIALS.find((t) => t.name === n)).filter((t) => !!t);

type Item = { kind: 'service'; i: number } | { kind: 'quote'; i: number };

// Checkerboard: service / quote, then quote / service, so the mix reads evenly.
// Three rows only, so it also fits shorter tablets without clipping.
const ITEMS: Item[] = [
  { kind: 'service', i: 0 }, { kind: 'quote', i: 0 },
  { kind: 'quote', i: 1 }, { kind: 'service', i: 1 },
  { kind: 'service', i: 2 }, { kind: 'quote', i: 2 },
];

// Right panel of the event home: small service + testimonial cards, same card
// language as the traditional home. Same outer spacing and radius as the map
// panel so the layout doesn't shift when the flow starts.
export function TestimonialsGrid() {
  const card = 'flex animate-in flex-col gap-2 rounded-2xl p-3.5 duration-500 fade-in slide-in-from-bottom-2 [animation-fill-mode:both]';
  return (
    <div className="h-full p-2.5 pl-0">
      <div className="flex h-full flex-col justify-center gap-3 overflow-hidden rounded-[1.5rem] bg-neutral-50 p-4">
        <p className="relative px-1 text-xs font-bold uppercase tracking-wider text-emerald-deep">{COPY.testimonials.eyebrow}</p>
        <div className="relative grid grid-cols-2 gap-2.5">
          {ITEMS.map((it, n) => {
            const style = { animationDelay: `${300 + n * 70}ms` };
            if (it.kind === 'service') {
              const s = COPY.hero.expertiseCards[it.i];
              const Icon = SERVICE_ICONS[it.i];
              return (
                <div key={s.title} style={style} className={`${card} border border-neutral-200/70 bg-parchment-card`}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <p className="text-[13px] font-bold leading-tight text-neutral-900">{s.title}</p>
                  <p className="text-xs leading-relaxed text-neutral-600">{s.detail}</p>
                </div>
              );
            }
            const t = quotes[it.i]!;
            return (
              <div key={t.name} style={style} className={`${card} border border-neutral-200/60 bg-parchment-card/85 shadow-[0_8px_24px_-14px_rgba(15,23,42,0.25)]`}>
                <div className="flex items-center justify-between">
                  <Quote className="h-3.5 w-3.5 text-emerald-deep/40" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }, (_, k) => (
                      <Star key={k} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="flex-1 text-xs leading-relaxed text-neutral-600">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-bold text-neutral-800">{t.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
