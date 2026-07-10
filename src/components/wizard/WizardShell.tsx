import type { ReactNode, RefObject } from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

function StepTimeline({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-3 flex items-center" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
        const isDone = n < current;
        const isActive = n === current;
        return (
          <div key={n} className={cn('flex items-center', n < total && 'flex-1')}>
            <div
              className={cn(
                'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-all duration-300',
                isActive
                  ? 'bg-brand-500 text-white ring-4 ring-brand-100'
                  : isDone
                    ? 'bg-emerald-deep text-white'
                    : 'border border-neutral-300 text-neutral-400'
              )}
            >
              {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : n}
            </div>
            {n < total && (
              <div
                className={cn(
                  'mx-1.5 h-0.5 flex-1 rounded-full transition-colors duration-300',
                  isDone ? 'bg-emerald-deep' : 'bg-neutral-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  isNextLoading?: boolean;
  step?: { current: number; total: number };
  formRef?: RefObject<HTMLFormElement | null>;
}

export function WizardShell({
  title,
  description,
  children,
  onBack,
  onNext,
  nextLabel = 'Continuar',
  nextDisabled = false,
  isNextLoading = false,
  step,
  formRef,
}: Props) {
  const handleNext = () => {
    if (formRef?.current) {
      formRef.current.requestSubmit();
    } else {
      onNext?.();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
      <div className="overflow-hidden rounded-card-lg border border-neutral-200 bg-parchment-card shadow-[0_1px_2px_rgba(16,32,26,0.04),0_12px_28px_-16px_rgba(16,32,26,0.18)]">
        <div className="facet-rule" />
        <div className="border-b border-neutral-200/70 p-6 md:p-8">
          {step && <StepTimeline current={step.current} total={step.total} />}
          <h2 className="text-xl font-bold text-neutral-900 md:text-2xl">{title}</h2>
          <p className="mt-1.5 text-neutral-500">{description}</p>
        </div>
        <div className="p-6 md:p-8">{children}</div>
      </div>

      {(onBack || onNext || formRef) && (
        <div className="flex items-center justify-between px-2">
          <div>
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 font-medium text-neutral-500 transition-colors hover:text-neutral-800"
              >
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
            )}
          </div>

          {(onNext || formRef) && (
            <button
              onClick={handleNext}
              disabled={nextDisabled || isNextLoading}
              className="flex items-center gap-2 rounded-pill bg-brand-500 px-8 py-3 font-medium text-white shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-brand-600"
            >
              {isNextLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {nextLabel} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
