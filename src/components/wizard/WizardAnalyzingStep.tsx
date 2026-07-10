import { useEffect, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { WizardShell } from './WizardShell';

const STATUS_MESSAGES = [
  'Consultando promedios de la zona...',
  'Comparando tamaño de construcción y terreno...',
  'Ajustando por estado y tipo de propiedad...',
  'Preparando tu estimación preliminar...',
];

const MESSAGE_INTERVAL_MS = 800;

interface Props {
  onDone: () => void;
}

export function WizardAnalyzingStep({ onDone }: Props) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setStatusIndex((prev) => Math.min(prev + 1, STATUS_MESSAGES.length - 1));
    }, MESSAGE_INTERVAL_MS);
    const doneTimeout = setTimeout(onDone, STATUS_MESSAGES.length * MESSAGE_INTERVAL_MS + 400);
    return () => {
      clearInterval(messageInterval);
      clearTimeout(doneTimeout);
    };
  }, [onDone]);

  return (
    <WizardShell title="Analizando tu zona" description="Estamos preparando tu primera referencia de valor.">
      <div className="flex flex-col items-center justify-center space-y-8 py-16">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-brand-500/20 blur-xl" />
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-neutral-100 bg-white shadow-lg">
            <Sparkles className="h-9 w-9 animate-bounce text-brand-500" />
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col items-center gap-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full bg-brand-500 transition-all duration-700 ease-out"
              style={{ width: `${((statusIndex + 1) / STATUS_MESSAGES.length) * 100}%` }}
            />
          </div>

          <div className="flex min-w-[280px] items-center justify-center gap-3 rounded-pill border border-brand-100 bg-brand-50 px-6 py-3 text-center text-sm font-medium text-brand-600">
            <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin" />
            {STATUS_MESSAGES[statusIndex]}
          </div>
        </div>
      </div>
    </WizardShell>
  );
}
