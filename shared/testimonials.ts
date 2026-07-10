// Real client testimonials supplied by Habitanza (public-facing marketing
// copy, not lead data) -- shown on the reveal screen in place of the
// property-listing carousel, for direct social-proof trust.
export interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Carmen R.',
    quote:
      'Trabajé con varias agencias inmobiliarias y desde el principio se notó la diferencia. Siempre buena comunicación y al final se hizo una gran operación.',
    rating: 5,
  },
  {
    name: 'Elizabeth M.',
    quote:
      'No sé qué hubiera hecho sin su ayuda. 🙌😅 Gracias a la buena asesoría de todo el equipo se logró concretar la venta de mi casa.',
    rating: 5,
  },
  {
    name: 'Alberto G.',
    quote: 'Desde el primer momento entendieron justo lo que necesitaba y en menos de una semana firmamos.',
    rating: 5,
  },
  {
    name: 'Rocío y Ulises T.',
    quote:
      'Todo el equipo de Habitanza son unos verdaderos profesionales. Te acompañan en todo momento y tienen las mejores herramientas para tomar decisiones informadas.',
    rating: 5,
  },
  {
    name: 'María Fernanda L.',
    quote:
      'Nos sentimos acompañados durante todo el proceso. Siempre hubo alguien disponible para resolver nuestras dudas y hacer que todo fuera mucho más sencillo.',
    rating: 5,
  },
  {
    name: 'Jorge C.',
    quote:
      'Su conocimiento del mercado y la atención personalizada hicieron toda la diferencia. Sin duda volvería a trabajar con Habitanza.',
    rating: 5,
  },
];
