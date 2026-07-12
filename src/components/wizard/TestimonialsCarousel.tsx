import { useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '@shared/testimonials';
import { COPY } from '@shared/copy';
import { cn } from '../../lib/utils';

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex w-[78%] flex-shrink-0 snap-center flex-col gap-2.5 rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 text-left backdrop-blur-md">
      <div className="flex items-center justify-between">
        <Quote className="h-4 w-4 text-emerald-deep/40" />
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }, (_, i) => (
            <Star key={i} className="h-3 w-3 fill-brass text-brass" />
          ))}
        </div>
      </div>
      <p className="flex-1 text-[13px] leading-relaxed text-neutral-600">&ldquo;{t.quote}&rdquo;</p>
      <p className="text-xs font-bold text-neutral-800">{t.name}</p>
    </div>
  );
}

// Deliberately a secondary, lower-weight module (no bordered card, muted
// heading) -- lives on the Hero as one more trust signal before someone
// commits to starting the wizard, not as the reveal screen's payoff.
export function TestimonialsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / TESTIMONIALS.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
          {COPY.testimonials.eyebrow}
        </p>
        <h3 className="mt-1 text-sm font-bold text-neutral-600">{COPY.testimonials.title}</h3>
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>

      <div className="flex justify-center gap-1.5">
        {TESTIMONIALS.map((_, i) => (
          <div
            key={i}
            className={cn('h-1.5 rounded-full transition-all', i === activeIndex ? 'w-4 bg-brand-500' : 'w-1.5 bg-neutral-300')}
          />
        ))}
      </div>
    </div>
  );
}
