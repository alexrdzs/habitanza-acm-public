import type { VercelRequest, VercelResponse } from '@vercel/node';

// /<code> (see vercel.json) lands here. It serves the normal index.html with
// the link-preview tags swapped, so WhatsApp shows the colonia image
// (public/og/<colonia><tipo>.png, made by scripts/gen-og.tsx). The page itself
// is the same app: it reads the code from the URL. No runtime imports from
// shared/ (see api/lead.ts); the code format lives in shared/shareLink.ts.
const TITLE = 'Tu valuación | Habitanza';
const DESCRIPTION = 'Estimación preliminar, no es el ACM final.';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = String(req.query.code ?? '');
  const host = String(req.headers['x-forwarded-host'] ?? req.headers.host ?? '');
  const origin = `https://${host}`;
  let html = await (await fetch(`${origin}/index.html`)).text();

  const m = /^([0-9a-z])([1-9])\d\d{1,5}(?:[tarbe]\d{1,5})*$/.exec(code);
  if (m) {
    const image = `${origin}/api/og?code=${code}&v=2`; // v=2 busts WhatsApp's cached preview
    const set = (re: RegExp, value: string) => (html = html.replace(re, (_m, prefix = '') => prefix + value));
    set(/(<title>)[^<]*/, TITLE);
    set(/(<meta property="og:title" content=")[^"]*/, `${TITLE}`);
    set(/(<meta name="twitter:title" content=")[^"]*/, `${TITLE}`);
    set(/(property="og:description"\s+content=")[^"]*/, `${DESCRIPTION}`);
    set(/(name="twitter:description"\s+content=")[^"]*/, `${DESCRIPTION}`);
    set(/(<meta property="og:image" content=")[^"]*/, `${image}`);
    set(/(<meta name="twitter:image" content=")[^"]*/, `${image}`);
    set(/(<meta property="og:image:type" content=")[^"]*/, `image/png`);
    set(/(<meta property="og:url" content=")[^"]*/, `${origin}/${code}`);
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600');
  res.status(200).send(html);
}
