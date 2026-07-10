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
    <input
      type="text"
      inputMode="numeric"
      className={inputClass}
      value={display}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
    />
  );
}
