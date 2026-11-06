// Draws the small SVG assets api/og.ts uses for the WhatsApp preview image:
// one neighborhood icon per colonia (public/og/icons/<colonia>.svg, named like
// the share code) and the logo. Run after adding a colonia or an icon:
//   npx tsx scripts/gen-og-assets.tsx
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync } from 'node:fs';
import { Logo } from '../src/components/Logo';
import { COLONIAS } from '../shared/shareLink';
import { neighborhoodIcon } from '../shared/neighborhoodIcons';

COLONIAS.forEach((colonia, i) => {
  const svg = renderToStaticMarkup(createElement(neighborhoodIcon(colonia), { size: 96, color: '#16A34A', strokeWidth: 1.5 }));
  writeFileSync(`public/og/icons/${(i + 1).toString(36)}.svg`, svg);
});
const logo = renderToStaticMarkup(createElement(Logo, {})).replaceAll('currentColor', '#171717');
writeFileSync('public/og/logo.svg', logo);
console.log(`${COLONIAS.length} icons + logo`);
