import type { ReactNode, RefObject } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

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
      <div className="overflow-hidden rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 shadow-[0_1px_2px_rgba(16,32,26,0.04),0_12px_28px_-16px_rgba(16,32,26,0.18)] backdrop-blur-md">
        <div className="border-b border-neutral-200/70 p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="min-w-0 text-xl font-bold text-neutral-900 md:text-2xl">{title}</h2>
            {step && <p className="shrink-0 text-xs font-medium tracking-wide text-neutral-400">Paso {step.current} de {step.total}</p>}
          </div>
          <p className="mt-1.5 text-neutral-500">{description}</p>
        </div>
        <div className="p-6 md:p-8">{children}</div>
      </div>

      {(onBack || onNext || formRef) && (
        <div className="px-2">
          {(onBack || onNext || formRef) && (
            <div className="flex items-center justify-between">
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
                  className="flex items-center gap-2 rounded-pill bg-brand-500 px-8 py-3 font-medium text-white shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
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
      )}
    </div>
  );
}
