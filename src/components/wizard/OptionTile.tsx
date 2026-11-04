import type { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  className?: string;
}

// Big, touch-friendly choice tile (min 92px tall) with an icon and a
// checkmark badge when selected. Used for property type and features.
export function OptionTile({ label, active, onClick, icon: Icon, className }: Props) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center rounded-2xl border-2 text-center font-semibold leading-tight transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        'min-h-[92px] flex-col gap-2 px-3 py-4 text-sm md:text-base',
        active
          ? 'border-brand-500 bg-selected-gradient text-neutral-900'
          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:bg-neutral-100 dark:hover:bg-neutral-200',
        className
      )}
    >
      {Icon && <Icon className={cn('h-8 w-8 shrink-0', active ? 'text-brand-500' : 'text-neutral-400')} strokeWidth={1.75} />}
      <span>{label}</span>
      {active && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white animate-in zoom-in-50 duration-200">
          <Check className="h-3 w-3" strokeWidth={3.5} />
        </span>
      )}
    </button>
  );
}
