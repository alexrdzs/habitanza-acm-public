import { Search, ListChecks, UserCheck } from 'lucide-react';
import { COPY } from '@shared/copy';
import { SectionChip } from './SectionChip';

// Order-matched with COPY.methodology.steps.
const STEP_ICONS = [Search, ListChecks, UserCheck];

// Shared between the Hero (as one more reason to trust the process before
// starting) and the reveal screen (explaining how the number was reached).
export function MethodologySection() {
  const steps = COPY.methodology.steps;

  return (
    <div className="space-y-5 rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 p-6 text-left backdrop-blur-md md:p-8">
      <div className="space-y-3">
        <SectionChip label={COPY.methodology.eyebrow} variant="neutral" />
        <h3 className="text-base font-bold text-neutral-900">{COPY.methodology.title}</h3>
      </div>
      <ol className="space-y-4">
        {steps.map(({ title, detail }, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <li key={title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-deep/10">
                  <Icon className="h-4 w-4 text-emerald-deep" />
                </div>
                {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-neutral-200" />}
              </div>
              <div className="pb-1">
                <p className="text-sm font-bold text-neutral-900">{title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-neutral-500">{detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
