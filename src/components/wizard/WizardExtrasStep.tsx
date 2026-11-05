import { PROPERTY_FEATURES } from '@shared/validation';
import type { Amenity, PublicPropertyType } from '@shared/validation';
import { COPY } from '@shared/copy';
import { WizardShell } from './WizardShell';
import { OptionTile } from './OptionTile';
import {
  Bot,
  BedSingle,
  Warehouse,
  Eye,
  Flame,
  Gamepad2,
  Mountain,
  Plug,
  RectangleHorizontal,
  Shapes,
  ShieldCheck,
  Sun,
  Trees,
  Waves,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

// Icons for every feature across all property types (see PROPERTY_FEATURES).
// Challenge features (irregular, pendiente) get a plain, neutral icon like the
// rest -- nothing flags them as negative in the form.
export const FEATURE_ICONS: Record<string, LucideIcon> = {
  'Casa inteligente': Bot,
  'Calefacción integrada': Flame,
  'Jardín muy amplio': Trees,
  'Salón de juegos': Gamepad2,
  'Alberca o Jacuzzi': Waves,
  'Vistas panorámicas': Eye,
  'Una sola planta': RectangleHorizontal,
  'Terraza o balcón': Sun,
  'Servicios completos': Plug,
  'En privada con seguridad': ShieldCheck,
  'Terreno irregular': Shapes,
  'Con pendiente': Mountain,
  'Bodega propia': Warehouse,
  'Cuarto de servicio': BedSingle,
};

interface Props {
  tipoPropiedad: string;
  amenidades: Amenity[];
  setAmenidades: (v: Amenity[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

// Step 3: optional amenities and extras, tailored to the property type (see
// PROPERTY_FEATURES). Plain, unbiased tiles: the polarity that moves the
// estimate is never shown here. Nothing is required, so Continuar is always
// enabled.
export function WizardExtrasStep({ tipoPropiedad, amenidades, setAmenidades, onBack, onContinue }: Props) {
  const features = PROPERTY_FEATURES[tipoPropiedad as PublicPropertyType] ?? [];

  function toggle(a: Amenity) {
    setAmenidades(amenidades.includes(a) ? amenidades.filter((x) => x !== a) : [...amenidades, a]);
  }

  return (
    <WizardShell
      title={COPY.extras.title}
      description={COPY.extras.description}
      onBack={onBack}
      onNext={onContinue}
    >
      <div>
        {/* Two columns on phones, three on tablet and up. Keyed on the type so
            the tiles fade in again if the type ever changes. */}
        <div key={tipoPropiedad} className="grid animate-in grid-cols-2 gap-3 duration-300 fade-in slide-in-from-bottom-2 md:grid-cols-3">
          {features.map(({ value }) => (
            <OptionTile
              key={value}
              label={value}
              icon={FEATURE_ICONS[value] ?? Sparkles}
              active={amenidades.includes(value)}
              onClick={() => toggle(value)}
            />
          ))}
        </div>
      </div>
    </WizardShell>
  );
}
