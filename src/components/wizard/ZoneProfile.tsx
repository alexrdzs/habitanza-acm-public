import { COPY } from '@shared/copy';
import { comparablePriceRanges } from '@shared/comparableListings';

// Profile of the fraccionamiento. Shows nothing when the colonia has neither
// a written profile nor comparables to derive a price range from.
export function ZoneProfile({ colonia }: { colonia: string }) {
  const z = COPY.reveal.zona;
  const profile = z.profiles[colonia];
  const ranges = comparablePriceRanges(colonia);
  const derived = (Object.keys(ranges) as (keyof typeof ranges)[]).map((k) => z.rango(z.tipos[k], ranges[k]![0], ranges[k]![1]));
  const precios = derived.length > 0 ? z.preciosDerivados(derived) : profile?.precios;
  if (!profile && !precios) return null;

  const rows: { label: string; text: string }[] = [];
  if (profile) rows.push({ label: z.perfilLabel, text: profile.perfil }, { label: z.mercadoLabel, text: profile.mercado });
  if (precios) rows.push({ label: z.preciosLabel, text: precios });

  return (
    <div className="space-y-3 rounded-xl bg-neutral-50 p-4 lg:p-5">
      <p className="text-sm font-semibold text-neutral-900">{z.title(colonia)}</p>
      {/* One column per row, so a colonia with fewer than 3 rows (e.g. only prices) fills the whole line. */}
      <div className="space-y-3 lg:grid lg:gap-8 lg:space-y-0" style={{ gridTemplateColumns: `repeat(${rows.length}, minmax(0, 1fr))` }}>
      {rows.map((r) => (
        <div key={r.label}>
          <p className="text-xs font-medium text-neutral-500">{r.label}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-neutral-700">{r.text}</p>
        </div>
      ))}
      </div>
    </div>
  );
}
