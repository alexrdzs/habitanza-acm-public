// Draws the site's link-preview image (public/og-image.png, 1200x630): the home
// headline on the left, the logo (big) on the right. Nothing else. Run after changing the headline:
//   npx tsx scripts/gen-og-image.tsx
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';

const font = (w: 500 | 800) => ({ name: 'Figtree', data: readFileSync(`public/og/Figtree-${w}.ttf`), weight: w, style: 'normal' as const });
const svgUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

type N = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): N => ({ type, props: { style, children, ...extra } });

const logo = svgUri(readFileSync('public/og/logo.svg', 'utf8'));

// Two-column grid (satori only does flex, so each column has a fixed width):
// headline | hairline divider | logo centered in the right column.
const tree = h('div', { width: 1200, height: 630, display: 'flex', alignItems: 'center', background: 'linear-gradient(180deg, #F9FAFC 0%, #F3F5F8 45%, #ECEFF3 100%)', fontFamily: 'Figtree', color: '#19202A' }, [
  h('div', { display: 'flex', width: 744, height: 630, alignItems: 'center', paddingLeft: 80 },
    h('div', { display: 'flex', flexDirection: 'column', fontSize: 100, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3.5, whiteSpace: 'nowrap', width: 620 }, [
      h('div', {}, '¿Cuánto vale'),
      h('div', {}, 'tu propiedad?'),
    ])
  ),
  h('div', { width: 1, height: 260, background: '#E3E7EC' }),
  h('div', { display: 'flex', width: 455, height: 630, alignItems: 'center', justifyContent: 'center' },
    h('img', {}, undefined, { src: logo, width: 310, height: 80 })
  ),
]);

const svg = await satori(tree as never, { width: 1200, height: 630, fonts: [font(500), font(800)] });
writeFileSync('public/og-image.png', new Resvg(svg).render().asPng());
console.log('public/og-image.png');
