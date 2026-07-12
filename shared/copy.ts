// Single source of truth for every user-facing string in the wizard.
// Components import from here instead of hardcoding text, so a copy change
// is a one-file edit (plain strings/functions, nothing that can break JSX)
// instead of a hunt across component files. Icons, colors, and other
// presentation concerns stay in the components -- this file is text only.
//
// Enum-like value/label pairs that are also validated server-side
// (REFERRAL_SOURCES, AMENITIES, PROPERTY_CONDITIONS, PUBLIC_PROPERTY_TYPES)
// live in shared/validation.ts instead, since that file is already the
// single source of truth for those and duplicating them here would create a
// second place to keep in sync. Testimonials live in shared/testimonials.ts
// for the same reason.

export const COPY = {
  hero: {
    eyebrow: 'Zona Esmeralda · Atizapán de Zaragoza',
    headline: '¿Cuánto vale mi casa hoy?',
    tagline: 'Análisis de mercado y competencia',
    body: 'Conoce el valor real de tu propiedad hoy, con datos de tu zona.',
    ctaLabel: 'Conoce el valor de tu propiedad',
    // Order-matched with the icon array in WizardHero.tsx.
    trustMarks: ['Sin ningún costo', 'Asesores locales', 'Con data actualizada'],
    expertiseCards: [
      {
        title: 'Conocimiento local',
        detail: 'Asesores que viven y trabajan la zona todos los días, no un call center genérico.',
      },
      {
        title: 'Método basado en datos',
        detail: 'Homologamos metros, condición y ubicación antes de sugerir un precio.',
      },
      {
        title: 'Acompañamiento real',
        detail: 'Un asesor te guía por WhatsApp desde el primer mensaje hasta el cierre.',
      },
      {
        title: 'Portafolio activo',
        detail: 'Inventario real en la zona ahora mismo, no solo un formulario.',
      },
    ],
  },

  team: {
    eyebrow: 'Tu equipo en la zona',
    title: 'Tu equipo de profesionales',
    subline: 'Expertos en Zona Esmeralda, Bosque Real, Satélite, Lomas Verdes y sus alrededores.',
    // Plain statement about Habitanza as a team -- not a quote or an
    // endorsement attributed to any one person, so it carries no name,
    // avatar, or "signed by" framing.
    experienceStatement:
      'Más de 15 años de experiencia en Zona Esmeralda. Conocemos muy bien el mercado y qué lo hace único.',
    checklist: [
      {
        title: 'Estaremos contigo en todo el proceso',
        detail: 'Desde la estrategia hasta firmar escrituras.',
      },
      {
        title: 'Tecnología trabajando a tu favor',
        detail: 'Las mejores herramientas para mejores resultados.',
      },
      {
        title: 'Alianzas clave con toda la industria',
        detail: 'Desde brokers hasta notarías.',
      },
    ],
  },

  methodology: {
    eyebrow: '¿Cómo lo hacemos?',
    title: 'Metodología',
    steps: [
      {
        title: 'Homologamos tu propiedad',
        detail: 'Tamaño, condición y ubicación, frente al mercado real de tu zona, no un promedio genérico de internet.',
      },
      {
        title: 'Cruzamos contra portafolio activo',
        detail: 'Comparamos contra propiedades que existen hoy en Zona Esmeralda, no listados viejos o de otras zonas.',
      },
      {
        title: 'Un asesor humano lo revisa',
        detail: 'Antes de compartirte el número final, alguien que conoce tu fraccionamiento lo valida.',
      },
    ],
  },

  testimonials: {
    eyebrow: '¿Qué dicen nuestros clientes?',
    title: 'Testimonios de quienes ya trabajaron con nosotros',
  },

  location: {
    title: '¿Dónde está tu propiedad?',
    description: 'Cada zona es diferente, así que ajustamos el cálculo según la tuya.',
    fieldLabel: 'Fraccionamiento *',
    moreOptionsTitle: 'Ver más opciones',
    moreOptionsSubtitle: (count: number) => `${count} fraccionamientos más cerca de ti`,
    expandedPanelLabel: 'Otros fraccionamientos cercanos',
    otherLabel: 'Otro fraccionamiento',
    otherInputLabel: '¿Cuál?',
    continueLabel: 'Continuar',
  },

  basics: {
    title: 'Cuéntanos de tu propiedad',
    description: 'Así comparamos tu propiedad con las correctas.',
    fieldLabels: {
      tipoPropiedad: 'Tipo de propiedad *',
      m2Construccion: 'm² construcción *',
      m2TerrenoRequired: 'm² terreno *',
      m2TerrenoOptional: 'm² terreno (opcional)',
      recamaras: 'Recámaras',
      banos: 'Baños',
      condicion: 'Estado general de la propiedad',
      caracteristicas: 'Características especiales (opcional)',
    },
    conditionOptions: {
      nueva: { label: 'Nueva', detail: 'Nunca habitada o recién construida' },
      buenEstado: { label: 'Buen estado', detail: 'Lista para habitar, mantenimiento al día' },
      necesitaRenovacion: { label: 'Necesita renovación', detail: 'Requiere trabajo antes de habitarse' },
    },
  },

  contact: {
    title: 'Cuéntanos de ti',
    description: 'Te enviamos tu rango de valor y el contacto de tu asesor.',
    fieldLabels: {
      nombre: 'Nombre completo *',
      telefono: 'Teléfono / WhatsApp *',
      comoNosConociste: '¿Cómo nos conociste? (opcional)',
      comoNosConocisteSelectPlaceholder: 'Seleccionar...',
      comoNosConocisteOtroPlaceholder: '¿Cómo nos conociste?',
    },
    consent: {
      prefix: 'Acepto el ',
      linkLabel: 'aviso de privacidad',
      suffix: ' y autorizo que un asesor de Habitanza me contacte por WhatsApp. *',
    },
    nextLabel: 'Ver mi estimación',
  },

  analyzing: {
    title: 'Analizando tu zona',
    description: 'Estamos preparando tu primera referencia de valor.',
    completeLabel: 'Referencia lista',
    stages: [
      {
        label: 'Ubicando tu propiedad',
        detail: 'Cruzamos tu fraccionamiento con el mapa de la zona para entender el entorno exacto que mueve tu valor.',
      },
      {
        label: 'Revisando nuestro portafolio activo',
        detail: 'Tenemos inventario real en tu zona: comparamos contra propiedades que existen, no las adivinamos.',
      },
      {
        label: 'Ajustando por el estado de tu propiedad',
        detail: 'Una casa remodelada no vale lo mismo que una para renovar: lo consideramos desde el primer cálculo.',
      },
      {
        label: 'Preparando tu estimación',
        detail: 'Tu Análisis Comparativo de Mercado completo lo arma un asesor humano, no un algoritmo genérico.',
      },
    ],
  },

  reveal: {
    greeting: (firstName: string) => `Muchas gracias, ${firstName}.`,
    subtext: 'Con esta información podemos darte un rango aproximado.',
    rangoEyebrow: 'Rango de precio',
    headlinePrefix: 'Tu propiedad estaría en un rango de',
    headlineJoiner: 'a',
    caption: (colonia: string) => `Es un promedio de ${colonia} basado en datos históricos y nuestra experiencia en la zona.`,
    advisorParagraph: (advisorFirstName: string, gender: 'm' | 'f') =>
      `${advisorFirstName} es tu ${gender === 'f' ? 'asesora experta' : 'asesor experto'} en la zona y muy pronto se ` +
      'pondrá en contacto contigo para resolver cualquier duda o agendar una cita. Así podrán platicar en persona y ' +
      'definir el valor ideal para tu propiedad.',
    ctaLabel: (advisorFirstName: string) => `Platicar con ${advisorFirstName}`,
    mercadoEyebrow: 'Mercado de la zona',
    mercadoTitleWithComps: (colonia: string) => `Referencias reales en ${colonia}`,
    mercadoTitleNoComps: (colonia: string) => `Armando referencias para ${colonia}`,
    notaPlaceholderTag: 'Nota sobre la zona [placeholder]',
    notaPlaceholderBody: (colonia: string) => `Espacio reservado para una nota específica sobre ${colonia}: texto por definir.`,
    noCompsBody: (colonia: string) =>
      `Todavía no tenemos comparables específicos de ${colonia} en nuestro sistema, pero tu asesor los incluirá al ` +
      'preparar tu Análisis Comparativo de Mercado completo.',
  },

  // Static, deliberately shorter than reveal.ctaLabel -- this is the
  // persistent bottom bar, which has much less room (name + role + button
  // all in one row) than the inline card's now full-width button.
  advisorCta: {
    ctaLabel: 'Chatear ahora',
  },

  submittedFallback: {
    title: (firstName: string) => `Gracias, ${firstName}`,
    body: 'Un asesor te contacta por WhatsApp en menos de 48 horas con el valor estimado de tu propiedad.',
  },
} as const;
