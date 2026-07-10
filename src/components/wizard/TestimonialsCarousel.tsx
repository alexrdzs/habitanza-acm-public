import { useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '@shared/testimonials';
import { cn } from '../../lib/utils';

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex w-[82%] flex-shrink-0 snap-center flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <Quote className="h-5 w-5 text-emerald-deep/40" />
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }, (_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-brass text-brass" />
          ))}
        </div>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-neutral-700">&ldquo;{t.quote}&rdquo;</p>
      <p className="text-xs font-bold text-neutral-900">{t.name}</p>
    </div>
  );
}

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
    <div className="space-y-4 rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
      <div>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-brass">
          ¿Qué dicen nuestros clientes?
        </p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">Conoce los testimonios de quienes ya trabajaron con nosotros</h3>
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 md:-mx-8 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
