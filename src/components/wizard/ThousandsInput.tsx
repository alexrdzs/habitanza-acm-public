import { inputClass } from './formStyles';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Same idea as the authenticated tool's NumericInput (comma-formatted while
// typing) but simplified to integers only, which is all m² values need.
export function ThousandsInput({ value, onChange, placeholder }: Props) {
  const display = value ? new Intl.NumberFormat('es-MX').format(Number(value)) : '';

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        className={`${inputClass} py-4 pr-12 text-xl font-semibold`}
        value={display}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base font-medium text-neutral-400">m²</span>
    </div>
  );
}
