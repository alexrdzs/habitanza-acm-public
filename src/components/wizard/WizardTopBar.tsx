import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { COPY } from '@shared/copy';
import { cn } from '../../lib/utils';

interface Props {
  label: string;
  // 0-1 share of the flow completed.
  fraction: number;
  // Event mode only: starts a new valuation for the next visitor.
  onRestart?: () => void;
  // Mid-flow a restart throws away typed answers, so it asks for a second tap.
  needsConfirm: boolean;
}

// Progress line + step label (+ restart in event mode). Scales a full-width
// bar with transform, never width.
export function WizardTopBar({ label, fraction, onRestart, needsConfirm }: Props) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = window.setTimeout(() => setArmed(false), 3500);
    return () => window.clearTimeout(t);
  }, [armed]);

  function handleRestart() {
    if (needsConfirm && !armed) return setArmed(true);
    setArmed(false);
    onRestart?.();
  }

  return (
    <div>
      <div className="h-1 bg-neutral-200">
        <div
          className="h-full origin-left bg-gradient-to-r from-brand-400 to-brand-500 transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${fraction})` }}
        />
      </div>
      <div className="flex min-h-12 items-center justify-between gap-3 px-4 py-1 md:px-8">
        <p className="text-sm font-medium text-neutral-600">{label}</p>
        {onRestart && (
          <button
            type="button"
            onClick={handleRestart}
            className={cn(
              'flex min-h-10 items-center gap-2 rounded-pill px-4 text-sm font-semibold transition-colors',
              armed ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'text-neutral-500 hover:text-neutral-800'
            )}
          >
            <RotateCcw className="h-4 w-4" />
            {armed ? COPY.progress.restartConfirm : COPY.progress.restart}
          </button>
        )}
      </div>
    </div>
  );
}
