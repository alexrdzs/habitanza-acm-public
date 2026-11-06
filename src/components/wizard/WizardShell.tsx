import type { ReactNode, RefObject } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  isNextLoading?: boolean;
  formRef?: RefObject<HTMLFormElement | null>;
  // Stretch the card (and whatever the child fills) to the free vertical space.
  fill?: boolean;
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
  formRef,
  fill = false,
}: Props) {
  const handleNext = () => {
    if (formRef?.current) {
      formRef.current.requestSubmit();
    } else {
      onNext?.();
    }
  };

  return (
    <div className="flex flex-1 animate-in flex-col duration-300 fade-in slide-in-from-bottom-2">
      <div className={`mb-6 overflow-hidden ${fill ? 'flex flex-1 flex-col' : ''} rounded-card-lg border border-neutral-200/70 bg-parchment-card/80 shadow-[0_1px_2px_rgba(16,32,26,0.04),0_12px_28px_-16px_rgba(16,32,26,0.18)] backdrop-blur-md lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none`}>
        <div className="border-b border-neutral-200/70 p-6 md:p-8 lg:pt-4">
          <h2 className="text-xl font-bold text-neutral-900 md:text-2xl">{title}</h2>
          {description && <p className="mt-1.5 text-neutral-500">{description}</p>}
        </div>
        <div className={`p-6 md:p-8 ${fill ? 'flex flex-1 flex-col' : ''}`}>{children}</div>
      </div>

      {/* Back / Continue always sit in the same spot: pinned to the bottom of
          the screen, full-bleed, as a frosted-glass bar the content blurs
          under while it scrolls. `--gutter` is the page's side padding. */}
      {(onBack || onNext || formRef) && (
        <div className="sticky bottom-0 z-20 -mx-[var(--gutter)] mt-auto border-t border-white/60 bg-parchment-card/50 px-[var(--gutter)] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-2xl md:pb-10 md:pt-5 backdrop-saturate-150 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-3 font-medium text-neutral-500 transition-colors hover:text-neutral-800"
                >
                  <ArrowLeft className="h-4 w-4" /> Atrás
                </button>
              )}
            </div>

            {(onNext || formRef) && (
              <button
                onClick={handleNext}
                disabled={nextDisabled || isNextLoading}
                className="flex items-center gap-2 rounded-pill bg-brand-500 bg-brand-gradient px-8 py-3 font-medium text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 "
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
        </div>
      )}
    </div>
  );
}
