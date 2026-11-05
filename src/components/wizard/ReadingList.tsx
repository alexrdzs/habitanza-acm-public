import type { ReadingItem } from '../../lib/propertyReading';

// Subtle tinted box: soft green for what helps, soft red for the challenges.
// Each bullet brings its own icon (ruler, bed, bath...), never one repeated.
export function ReadingList({ title, items, tone }: { title: string; items: ReadingItem[]; tone: 'green' | 'red' }) {
  const green = tone === 'green';
  return (
    <div className={`rounded-2xl border p-4 md:p-5 ${green ? 'border-brand-500/20 bg-brand-500/5' : 'border-red-200/60 bg-red-50/50'}`}>
      <p className={`text-[11px] font-bold uppercase tracking-wider md:text-xs ${green ? 'text-brand-600' : 'text-red-600'}`}>{title}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-2.5 text-sm leading-snug text-neutral-700">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${green ? 'text-brand-600' : 'text-red-500'}`} strokeWidth={1.75} />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
