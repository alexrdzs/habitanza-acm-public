import { PROPERTY_AGE_RANGES } from '@shared/validation';
import type { PropertyAge } from '@shared/validation';
import { inputClass } from './formStyles';

interface Props {
  value: PropertyAge | '';
  onChange: (value: PropertyAge | '') => void;
  label: string;
}

// Kept as a reusable control for other wizard surfaces. The property step
// renders the same native select inline so its label aligns with the other fields.
export function PropertyAgeSelect({ value, onChange, label }: Props) {
  return (
    <label className="block text-sm font-medium text-neutral-700">
      {label}
      <select className={`${inputClass} mt-2`} value={value} onChange={(event) => onChange(event.target.value as PropertyAge | '')}>
        <option value="">Seleccionar...</option>
        {PROPERTY_AGE_RANGES.map((age) => (
          <option key={age} value={age}>
            {age}
          </option>
        ))}
      </select>
    </label>
  );
}
