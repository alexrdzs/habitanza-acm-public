// Draws the WhatsApp link-preview images: public/og/<colonia><tipo>.png (1200x630),
// one per colonia x property type. Run after adding a colonia:
//   npx tsx scripts/gen-og.tsx
// Needs Google Chrome (macOS path below) and internet (Figtree font).
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Building2, House, LandPlot } from 'lucide-react';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Logo } from '../src/components/Logo';
import { COLONIAS } from '../shared/shareLink';
import { PUBLIC_PROPERTY_TYPES } from '../shared/validation';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ICONS = { Casa: House, Departamento: Building2, Terreno: LandPlot } as const;
const dir = mkdtempSync(join(tmpdir(), 'og-'));

COLONIAS.forEach((colonia, ci) => {
  PUBLIC_PROPERTY_TYPES.forEach((tipo, ti) => {
    const icon = renderToStaticMarkup(createElement(ICONS[tipo], { size: 120, color: '#16A34A', strokeWidth: 1.5 }));
    const logo = renderToStaticMarkup(createElement(Logo, { className: 'logo' }));
    const html = `<!doctype html><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@500;800&display=swap');
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#fff;font-family:Figtree,system-ui,sans-serif;color:#171717;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative}
h1{font-size:68px;font-weight:800;line-height:1.1;margin-top:36px;max-width:1000px;letter-spacing:-0.02em}
p{font-size:34px;font-weight:500;color:#737373;margin-top:20px}
.logo{position:absolute;right:56px;bottom:44px;height:44px;color:#171717}
</style>${icon}<h1>${tipo} en ${colonia}</h1><p>Rango preliminar de tu propiedad</p>${logo}`;
    const file = join(dir, `${ci}${ti}.html`);
    writeFileSync(file, html);
    const out = `public/og/${(ci + 1).toString(36)}${ti + 1}.png`;
    execFileSync(CHROME, ['--headless=new', '--hide-scrollbars', '--window-size=1200,630', '--virtual-time-budget=4000', `--screenshot=${out}`, `file://${file}`], { stdio: 'ignore' });
    console.log(out);
  });
});
