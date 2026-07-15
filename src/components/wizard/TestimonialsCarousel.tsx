import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '@shared/testimonials';
import { COPY } from '@shared/copy';
import { SectionChip } from './SectionChip';

function TestimonialCard({ t, isDuplicate = false }: { t: Testimonial; isDuplicate?: boolean }) {
  return (
    <div
      aria-hidden={isDuplicate || undefined}
      className="flex w-[78vw] max-w-[324px] flex-shrink-0 flex-col gap-2.5 rounded-2xl border border-neutral-200/70 bg-parchment-card/80 p-4 text-left backdrop-blur-md"
    >
      <div className="flex items-center justify-between">
        <Quote className="h-4 w-4 text-emerald-deep/40" />
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }, (_, i) => (
            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
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
  return (
    <div className="space-y-3 pt-4">
      <div className="mb-3 space-y-2 text-center">
        <SectionChip label={COPY.testimonials.eyebrow} variant="neutral" center />
        <h3 className="text-sm font-bold text-neutral-600">{COPY.testimonials.title}</h3>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden pb-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track-testimonials flex w-max gap-3">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} isDuplicate={i >= TESTIMONIALS.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
