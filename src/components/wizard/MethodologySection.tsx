import { Search, ListChecks, Sparkles, UserCheck } from 'lucide-react';
import { COPY } from '@shared/copy';
import { SlideBullets, SlideCard } from './SlideCard';

// Order-matched with COPY.methodology.steps.
const STEP_ICONS = [Search, ListChecks, Sparkles, UserCheck];

// Shared between the Hero (as one more reason to trust the process before
// starting) and the reveal screen (explaining how the number was reached).
export function MethodologySection() {
  const { eyebrow, title, subtitle, steps } = COPY.methodology;

  return (
    <SlideCard chip={eyebrow} chipVariant="neutral" title={title} subtitle={subtitle}>
      <SlideBullets items={steps.map((s, i) => ({ ...s, icon: STEP_ICONS[i] }))} />
    </SlideCard>
  );
}
