import type { VercelRequest, VercelResponse } from '@vercel/node';
// Type-only import — erased entirely at build time, so it carries no
// runtime module resolution risk (see the note below on why the runtime
// values it would otherwise pull in must be inlined instead).
import type { LeadSubmission, Amenity, ReferralSource } from '../shared/validation';

// Vercel compiles this function with Node's native TypeScript type-stripping
// (types erased, syntax otherwise untouched) rather than bundling — it does
// not inline or transpile sibling files outside api/, and Node's ESM
// resolver won't guess extensions for a relative import like
// '../shared/validation'. So the runtime values shared/validation.ts
// exports are duplicated here rather than imported; keep them in sync with
// that file if they change. shared/validation.ts remains the source of
// truth for the client wizard, which Vite bundles normally.
const ZONA_ESMERALDA_COLONIAS = [
  'Bosque Esmeralda',
  'Residencial Lago Esmeralda',
  'Condado de Sayavedra',
  'Lomas de Valle Escondido',
  'Hacienda de Valle Escondido',
  'Rancho San Juan',
] as const;
// Keep in sync with ZONA_ESMERALDA_COLONIAS_EXTENDED in shared/validation.ts.
const ZONA_ESMERALDA_COLONIAS_EXTENDED = [
  'Fincas de Sayavedra',
  'Club de Golf Valle Escondido',
  'Club de Golf Chiluca',
  'La Estadía',
  'Prado Largo',
  // Keep temporary campaign areas in sync with shared/validation.ts.
  'Bosque Real',
  'Interlomas',
] as const;
const OTHER_COLONIA_VALUE = 'otra';
const PUBLIC_PROPERTY_TYPES = ['Casa', 'Departamento', 'Terreno'] as const;
// Keep in sync with PROPERTY_AGE_RANGES in shared/validation.ts.
const PROPERTY_AGE_RANGES = [
  'A estrenar',
  'Menos de 5 años',
  'Entre 5 y 10 años',
  'Entre 10 y 20 años',
  'Más de 20 años',
] as const;
// Keep in sync with AMENITIES in shared/validation.ts.
const AMENITIES = [
  'Casa inteligente',
  'Calefacción integrada',
  'Jardín muy amplio',
  'Salón de juegos',
  'Alberca o Jacuzzi',
  'Vistas panorámicas',
] as const;
// Keep in sync with REFERRAL_SOURCES in shared/validation.ts.
const REFERRAL_SOURCES = ['publicidad', 'redes_sociales', 'recomendacion', 'otro'] as const;

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith('52')) return digits.slice(2);
  if (digits.length === 13 && digits.startsWith('521')) return digits.slice(3);
  return null;
}

function sanitizeText(input: unknown, maxLen: number): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').trim().slice(0, maxLen);
}

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600;

// Keep in sync with the client-side rule in WizardBasicsStep. These are
// deliberately conservative guards against incompatible property details.
function minimumConstructionM2(recamaras?: number, banos?: number): number {
  const bedrooms = recamaras ?? 0;
  const bathrooms = banos ?? 0;

  if (bedrooms >= 4 || bathrooms >= 4) return 70;
  if (bedrooms >= 3 || bathrooms >= 3) return 50;
  if (bedrooms >= 2 && bathrooms >= 2) return 35;
  return 1;
}

// Best-effort fallback only — holds within a single warm serverless
// instance. Set UPSTASH_REDIS_REST_URL/TOKEN for durable, cross-instance
// rate limiting in production.
const memoryStore = new Map<string, { count: number; resetAt: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    const key = `ratelimit:lead:${ip}`;
    const incrRes = await fetch(`${url}/incr/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { result: count } = (await incrRes.json()) as { result: number };
    if (count === 1) {
      await fetch(`${url}/expire/${key}/${RATE_LIMIT_WINDOW_SECONDS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    return count <= RATE_LIMIT_MAX;
  }

  const now = Date.now();
  const entry = memoryStore.get(ip);
  if (!entry || entry.resetAt < now) {
    memoryStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_SECONDS * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_LIMIT_MAX;
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  return req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const body = req.body as Partial<LeadSubmission>;

  // Honeypot: bots that fill hidden fields get a fake success, no processing.
  if (body.empresa) {
    return res.status(200).json({ ok: true });
  }

  const ip = getClientIp(req);
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' });
  }

  const nombre = sanitizeText(body.nombre, 120);
  const telefono = normalizePhone(sanitizeText(body.telefono, 20));
  const colonia = sanitizeText(body.colonia, 120);
  const coloniaOtra = sanitizeText(body.colonia_otra, 120);
  const tipoPropiedad = body.tipoPropiedad;
  const antiguedad = (PROPERTY_AGE_RANGES as readonly string[]).includes(body.antiguedad ?? '')
    ? (body.antiguedad as LeadSubmission['antiguedad'])
    : undefined;
  const m2Construccion =
    typeof body.m2Construccion === 'number' && body.m2Construccion > 0 && body.m2Construccion < 100000
      ? Math.round(body.m2Construccion)
      : undefined;
  const m2Terreno =
    typeof body.m2Terreno === 'number' && body.m2Terreno >= 50 && body.m2Terreno < 1000000
      ? Math.round(body.m2Terreno)
      : undefined;
  const recamaras =
    typeof body.recamaras === 'number' && body.recamaras >= 0 && body.recamaras <= 50
      ? Math.round(body.recamaras)
      : undefined;
  // Baños allow half steps (a baño completo plus a medio baño, e.g. 2.5), so
  // snap to the nearest 0.5 rather than the nearest whole number.
  const banos =
    typeof body.banos === 'number' && body.banos >= 0 && body.banos <= 50
      ? Math.round(body.banos * 2) / 2
      : undefined;
  const amenidades = Array.isArray(body.amenidades)
    ? body.amenidades.filter((a): a is Amenity => (AMENITIES as readonly string[]).includes(a))
    : undefined;
  const comoNosConociste = (REFERRAL_SOURCES as readonly string[]).includes(body.comoNosConociste ?? '')
    ? (body.comoNosConociste as ReferralSource)
    : undefined;
  const comoNosConocisteOtro =
    comoNosConociste === 'otro' ? sanitizeText(body.comoNosConocisteOtro, 120) || undefined : undefined;
  const consentimiento = body.consentimiento === true;

  const isKnownColonia =
    (ZONA_ESMERALDA_COLONIAS as readonly string[]).includes(colonia) ||
    (ZONA_ESMERALDA_COLONIAS_EXTENDED as readonly string[]).includes(colonia);
  const isOtherColonia = colonia === OTHER_COLONIA_VALUE;
  const isTerreno = tipoPropiedad === 'Terreno';

  const errors: string[] = [];
  if (!nombre) errors.push('nombre');
  if (!telefono) errors.push('telefono');
  if (!isKnownColonia && !isOtherColonia) errors.push('colonia');
  if (isOtherColonia && !coloniaOtra) errors.push('colonia_otra');
  if (!tipoPropiedad || !(PUBLIC_PROPERTY_TYPES as readonly string[]).includes(tipoPropiedad)) {
    errors.push('tipoPropiedad');
  }
  if (!m2Terreno) errors.push('m2Terreno');
  if (!isTerreno && (!m2Construccion || m2Construccion < minimumConstructionM2(recamaras, banos))) {
    errors.push('m2Construccion');
  }
  if (!consentimiento) errors.push('consentimiento');

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Faltan datos requeridos', fields: errors });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('MAKE_WEBHOOK_URL no está configurado; lead descartado.');
    return res.status(500).json({ error: 'No se pudo procesar tu solicitud. Intenta de nuevo más tarde.' });
  }

  const payload = {
    nombre,
    telefono,
    colonia: isOtherColonia ? coloniaOtra : colonia,
    tipoPropiedad,
    antiguedad,
    m2Construccion,
    m2Terreno,
    recamaras,
    banos,
    amenidades,
    comoNosConociste,
    comoNosConocisteOtro,
    fuente: 'landing-valuacion',
    zona: 'zona-esmeralda',
    creadoEn: new Date().toISOString(),
    ip,
  };

  try {
    const webhookRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.MAKE_WEBHOOK_SECRET ? { 'X-Webhook-Secret': process.env.MAKE_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      console.error('Make webhook respondió con error:', webhookRes.status);
      return res.status(502).json({ error: 'No se pudo procesar tu solicitud. Intenta de nuevo más tarde.' });
    }
  } catch (err) {
    console.error('Error al enviar lead a Make:', err);
    return res.status(502).json({ error: 'No se pudo procesar tu solicitud. Intenta de nuevo más tarde.' });
  }

  return res.status(200).json({ ok: true });
}
