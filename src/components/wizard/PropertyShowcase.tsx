import { useState } from 'react';
import { Bed, Bath, Maximize, Home } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { SHOWCASE_PROPERTIES, type ShowcaseProperty } from '@shared/showcaseProperties';

function PropertyCard({ p }: { p: ShowcaseProperty }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100">
            <Home className="h-8 w-8 text-neutral-300" />
          </div>
        ) : (
          <img
            src={p.photo}
            alt={`${p.tipo} en ${p.colonia}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-3">
          <p className="font-mono text-sm font-semibold tabular-nums text-white">{formatCurrency(p.precio)}</p>
        </div>
        <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          {p.tipo}
        </span>
      </div>
      <div className="space-y-1.5 p-3">
        <p className="truncate text-xs font-semibold text-neutral-800">{p.colonia}</p>
        <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <Maximize className="h-3 w-3" />
            {p.m2}m²
          </span>
          {p.recamaras && (
            <span className="flex items-center gap-1">
              <Bed className="h-3 w-3" />
              {p.recamaras}
            </span>
          )}
          {p.banos && (
            <span className="flex items-center gap-1">
              <Bath className="h-3 w-3" />
              {p.banos}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function PropertyShowcase() {
  return (
    <div className="space-y-4 rounded-card-lg border border-neutral-200 bg-parchment-card p-6 md:p-8">
      <div>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-brass">
          Portafolio activo
        </p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">Así es lo que ya tenemos en la zona</h3>
        <p className="mt-1 text-sm leading-relaxed text-neutral-500">
          Algunas propiedades reales de nuestro portafolio en Zona Esmeralda — no son los comparables de tu
          estimación, son prueba de que conocemos el terreno.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SHOWCASE_PROPERTIES.map((p) => (
          <PropertyCard key={p.photo} p={p} />
        ))}
      </div>
    </div>
  );
}
