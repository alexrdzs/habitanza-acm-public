import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// The WhatsApp link-preview image for /<code>: colonia icon, "Casa en <colonia>"
// on two lines ("Casa en" / colonia), the price range and the bar. 1200x630 PNG.
//
// Vercel type-strips this file (no JSX, no imports from shared/), so the code
// format and the pricing below are inlined COPIES. Keep them in sync with:
//   shared/shareLink.ts (COLONIAS, tipos, code layout), shared/pricing.ts
//   (price tables, 0.85/1.15 and 0.75/1.25 range, type factor), src/lib/utils.ts
//   (formatMillions). Icons/logo/fonts are static files in public/og
//   (scripts/gen-og-assets.tsx makes the icons and the logo).
const COLONIAS = [
  'Condado de Sayavedra', 'Hacienda de Valle Escondido', 'Bosque Real', 'Club de Golf Chiluca', 'Prado Largo', 'Rancho San Juan',
  'Residencial Lago Esmeralda', 'Lomas de Valle Escondido', 'Bosque Esmeralda', 'Club de Golf Valle Escondido', 'Fincas de Sayavedra',
  'Interlomas y Hda. de las Palmas', 'La Estadía',
];
const TIPOS = ['Casa', 'Departamento', 'Terreno'];
const PER_M2: Record<string, number | null> = {
  'Bosque Esmeralda': 40000, 'Residencial Lago Esmeralda': 48000, 'Lomas de Valle Escondido': 42000,
  'Hacienda de Valle Escondido': 48000, 'Rancho San Juan': 34000, 'Bosque Real': null, Interlomas: null,
};
const PER_M2_TERRENO: Record<string, number | null> = { 'Condado de Sayavedra': 6000, 'Bosque Real': null, Interlomas: null };

const round = (v: number) => Math.round(v / 10000) * 10000;
const millions = (v: number) => `$${(Math.ceil(v / 100000) / 10).toFixed(1)}M`;

function range(colonia: string, tipo: string, m2: number) {
  if (tipo === 'Terreno') {
    const base = m2 * (PER_M2_TERRENO[colonia] ?? 6000);
    return { low: round(base * 0.75), high: round(base * 1.25) };
  }
  const base = m2 * (PER_M2[colonia] ?? 42000) * (tipo === 'Departamento' ? 0.9 : 1);
  return { low: round(base * 0.85), high: round(base * 1.15) };
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

async function asset(origin: string, path: string) {
  return (await fetch(`${origin}${path}`)).arrayBuffer();
}
const dataUri = (buf: ArrayBuffer) => `data:image/svg+xml;base64,${Buffer.from(buf).toString('base64')}`;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const m = /^([0-9a-z])([1-9])\d(\d{1,5})$/.exec(url.searchParams.get('code') ?? '');
  const colonia = m && COLONIAS[parseInt(m[1], 36) - 1];
  const tipo = m && TIPOS[Number(m[2]) - 1];
  if (!m || !colonia || !tipo) return new Response('Not found', { status: 404 });

  const { low, high } = range(colonia, tipo, Number(m[3]));
  const [f500, f800, icon, logo] = await Promise.all([
    asset(origin, '/og/Figtree-500.ttf'),
    asset(origin, '/og/Figtree-800.ttf'),
    asset(origin, `/og/icons/${m[1]}.svg`),
    asset(origin, '/og/logo.svg'),
  ]);

  // Two lines: "Casa en" / colonia. The colonia always fits on ONE line: the
  // size shrinks with its length, so the title is never 3 lines.
  const titleSize = Math.max(34, Math.min(64, Math.floor(1040 / (colonia.length * 0.56))));
  const dark = '#171717';
  const grey = '#737373';

  const tree = h('div', { width: 1200, height: 630, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 80px', background: '#fff', fontFamily: 'Figtree', color: dark, position: 'relative' }, [
    h('img', {}, undefined, { src: dataUri(icon), width: 72, height: 72 }),
    h('div', { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: titleSize, fontWeight: 800, lineHeight: 1.1, marginTop: 16, whiteSpace: 'nowrap' }, [
      h('div', {}, `${tipo} en`),
      h('div', {}, colonia),
    ]),
    h('div', { fontSize: 28, fontWeight: 500, color: grey, marginTop: 32 }, 'Rango preliminar de tu propiedad'),
    h('div', { fontSize: 104, fontWeight: 800, marginTop: 6, letterSpacing: -2 }, `${millions(low)} - ${millions(high)}`),
    h('div', { width: 700, height: 26, borderRadius: 13, marginTop: 28, background: 'linear-gradient(90deg, #DC2626 0%, #DC2626 6%, #FBBF24 14%, #4ADE80 50%, #FBBF24 86%, #DC2626 94%, #DC2626 100%)' }),
    h('div', { display: 'flex', justifyContent: 'space-between', width: 700, marginTop: 12, fontSize: 24, fontWeight: 500, color: grey }, [
      h('div', {}, 'Mínimo'),
      h('div', {}, 'Máximo'),
    ]),
    h('img', { position: 'absolute', left: 974, top: 48 }, undefined, { src: dataUri(logo), width: 170, height: 44 }),
  ]);

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Figtree', data: f500, weight: 500, style: 'normal' },
      { name: 'Figtree', data: f800, weight: 800, style: 'normal' },
    ],
  });
  const png = new Resvg(svg).render().asPng();
  return new Response(png, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400, s-maxage=86400' } });
}
