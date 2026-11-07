import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { COPY } from '@shared/copy';
import { WizardShell } from './WizardShell';
import { AnalyzingComparables } from './AnalyzingComparables';
import { cn } from '../../lib/utils';

const STAGES = COPY.analyzing.stages;

const STAGE_DURATION_MS = 2200;
const COMPLETE_HOLD_MS = 1400;
const EXIT_DURATION_MS = 800;

type Phase = 'running' | 'complete' | 'exiting';

export function WizardAnalyzingStep({
  colonia,
  onDone,
  onStage,
  showGrid,
}: {
  colonia: string;
  onDone: () => void;
  /** Reports the current stage (3 once complete) so the side map can follow along. */
  onStage?: (stage: number) => void;
  /** Wide screens show the comparables as photos on the side map instead. */
  showGrid: boolean;
}) {
  // Latest callbacks, so a parent re-render can't restart the timers below.
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const stageRef = useRef(onStage);
  stageRef.current = onStage;
  const [stageIndex, setStageIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('running');

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1));
    }, STAGE_DURATION_MS);

    const completeAt = STAGES.length * STAGE_DURATION_MS;
    const completeTimeout = setTimeout(() => setPhase('complete'), completeAt);
    const exitTimeout = setTimeout(() => setPhase('exiting'), completeAt + COMPLETE_HOLD_MS);
    const doneTimeout = setTimeout(() => doneRef.current(), completeAt + COMPLETE_HOLD_MS + EXIT_DURATION_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(doneTimeout);
    };
  }, []);

  const isComplete = phase !== 'running';
  const stage = isComplete ? 3 : stageIndex;
  useEffect(() => stageRef.current?.(stage), [stage]);

  return (
    <div
      className={cn(
        'transition-all duration-700 ease-out',
        phase === 'exiting' ? '-translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
      )}
    >
      <WizardShell title={COPY.analyzing.title} description={COPY.analyzing.description}>
        <div className="flex flex-col items-center gap-8 py-4">
          {/* The comparables being reviewed, then narrowed to the selection.
              On wide screens these are photos on the wizard's right-panel map instead. */}
          {showGrid && <AnalyzingComparables colonia={colonia} stage={stage} />}

          {/* Stage checklist — each item narrates what's happening and why it
              matters, not a generic "cargando..." message. */}
          <div className="w-full space-y-3">
            {STAGES.map((stage, i) => {
              const isDone = i < stageIndex || isComplete;
              const isActive = i === stageIndex && !isComplete;
              return (
              <div
                key={stage.label}
                className={`flex items-start gap-3 rounded-xl border p-3 transition-all duration-1000 ${
                  isActive
                    ? 'border-brand-200 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10'
                    : isDone
                      ? 'border-neutral-200 bg-parchment-card opacity-60'
                      : 'border-transparent opacity-0'
                }`}
                style={{ maxHeight: i <= stageIndex ? '120px' : '0px', overflow: 'hidden' }}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    isDone ? 'bg-brand-500' : isActive ? 'border-2 border-brand-500' : 'border border-neutral-300'
                  }`}
                >
                  {isDone && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  {isActive && <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">{stage.label}</p>
                  {isActive && <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{stage.detail}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </WizardShell>
    </div>
  );
}
