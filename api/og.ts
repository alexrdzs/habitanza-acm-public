import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// The WhatsApp link-preview image for /<code>: colonia icon and "Casa en <colonia>"
// on two lines, plus the logo. 1200x630 PNG. No price on purpose: the range lives
// in the page, and a copy of the pricing here went stale (api/ can't import shared/).
//
// Vercel type-strips this file (no JSX, no imports from shared/), so the code
// format below is an inlined COPY of shared/shareLink.ts (COLONIAS, tipos, code
// layout). Icons/logo/fonts are static files in public/og
// (scripts/gen-og-assets.tsx makes the icons and the logo).
const COLONIAS = [
  'Condado de Sayavedra', 'Hacienda de Valle Escondido', 'Bosque Real', 'Club de Golf Chiluca', 'Prado Largo', 'Rancho San Juan',
  'Residencial Lago Esmeralda', 'Lomas de Valle Escondido', 'Bosque Esmeralda', 'Club de Golf Valle Escondido', 'Fincas de Sayavedra',
  'Interlomas y Hda. de las Palmas', 'La Estadía',
];
const TIPOS = ['Casa', 'Departamento', 'Terreno'];
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
  const m = /^([0-9a-z])([1-9])\d\d{1,5}$/.exec(url.searchParams.get('code') ?? '');
  const colonia = m && COLONIAS[parseInt(m[1], 36) - 1];
  const tipo = m && TIPOS[Number(m[2]) - 1];
  if (!m || !colonia || !tipo) return new Response('Not found', { status: 404 });

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

  const tree = h('div', { width: 1200, height: 630, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 80px', background: '#fff', fontFamily: 'Figtree', color: dark, position: 'relative' }, [
    h('img', {}, undefined, { src: dataUri(icon), width: 72, height: 72 }),
    h('div', { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: titleSize, fontWeight: 800, lineHeight: 1.1, marginTop: 16, whiteSpace: 'nowrap' }, [
      h('div', {}, `${tipo} en`),
      h('div', {}, colonia),
    ]),
    h('div', { fontSize: 36, fontWeight: 500, color: '#737373', marginTop: 24 }, 'Estimado preliminar'),
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
