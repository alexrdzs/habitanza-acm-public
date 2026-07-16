// Single source of truth for every user-facing string in the wizard.
// Components import from here instead of hardcoding text, so a copy change
// is a one-file edit (plain strings/functions, nothing that can break JSX)
// instead of a hunt across component files. Icons, colors, and other
// presentation concerns stay in the components -- this file is text only.
//
// Enum-like value/label pairs that are also validated server-side
// (REFERRAL_SOURCES, AMENITIES, PROPERTY_AGE_RANGES, PUBLIC_PROPERTY_TYPES)
// live in shared/validation.ts instead, since that file is already the
// single source of truth for those and duplicating them here would create a
// second place to keep in sync. Testimonials live in shared/testimonials.ts
// for the same reason.

export const COPY = {
  hero: {
    headline: '¿Cuánto vale mi propiedad?',
    tagline: 'Te ayudamos a saber si te conviene vender hoy y en cuánto',
    body: 'En menos de 2 minutos, sin costo ni compromiso.',
    ctaLabel: 'Quiero conocer el valor de mi propiedad',
    // Order-matched with the icon array in WizardHero.tsx.
    trustMarks: ['Sin ningún costo para ti', 'Profesionales expertos en la zona', 'Con data actualizada a 2026'],
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
    description: 'Sabemos que cada zona es diferente, por eso ajustamos el cálculo según dónde esté tu propiedad.',
    moreOptionsTitle: 'Ver más opciones',
    moreOptionsSubtitle: (count: number) => `${count} fraccionamientos más cerca de ti`,
    expandedPanelLabel: 'Otros fraccionamientos cercanos',
    otherLabel: 'Otro fraccionamiento',
    otherInputLabel: '¿Cuál?',
    continueLabel: 'Continuar',
  },

  basics: {
    title: 'Cuéntanos de tu propiedad',
    description: 'Así podemos compararla con otras similares.',
    sectionLabels: {
      tamanoEspacios: 'Tamaño y espacios',
      adicionales: 'Adicionales',
    },
    fieldLabels: {
      tipoPropiedad: 'Tipo de propiedad *',
      m2Construccion: 'Construcción *',
      m2TerrenoRequired: 'Terreno *',
      recamaras: 'Recámaras',
      banos: 'Baños',
    },
  },

  contact: {
    title: 'Cuéntanos de ti',
    description: 'Así podremos ponernos en contacto y compartir el estimado de valor detallado.',
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
    title: 'Analizando la zona',
    description: 'Estamos preparando un primer estimado de valor.',
    completeLabel: 'Todo listo',
    stages: [
      {
        label: 'Ubicando tu propiedad',
        detail: 'Cruzamos tu fraccionamiento con el mapa de la zona para entender el entorno exacto que mueve tu valor.',
      },
      {
        label: 'Revisando portafolio y similares',
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
    headlinePrefix: 'Tu propiedad podría estar en un rango de:',
    headlineRangePrefix: 'Entre',
    headlineJoiner: 'y',
    caption: (colonia: string) => `Esto es un promedio de ${colonia} basado en datos históricos y nuestra experiencia en la zona.`,
    researchCaption: (colonia: string) =>
      `Este es un rango preliminar de ${colonia}, basado en datos históricos y nuestra experiencia en la zona.`,
    advisorParagraph: (advisorFirstName: string, gender: 'm' | 'f', colonia: string) =>
      `${advisorFirstName} será tu ${gender === 'f' ? 'asesora experta' : 'asesor experto'} en ${colonia}. Muy pronto se ` +
      'pondrá en contacto para platicar personalmente sobre ' +
      'la estrategia ideal para vender tu propiedad.',
    ctaLabel: (advisorFirstName: string) => `Enviar mensaje a ${advisorFirstName}`,
    mercadoEyebrow: 'Mercado de la zona',
    mercadoTitleWithComps: (colonia: string) => `Referencias reales en ${colonia}`,
    mercadoTitleNoComps: (colonia: string) => `Armando referencias para ${colonia}`,
    notaPlaceholderTag: 'Nota sobre la zona',
    notaPlaceholderBody: (colonia: string) =>
      `Estamos reuniendo referencias específicas de ${colonia}. Tu Master Broker las revisará contigo para completar el análisis comparativo.`,
    researchCardsLabel: (count: number) => `${count} referencias en investigación`,
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
