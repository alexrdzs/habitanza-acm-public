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
    tagline: 'Descubre si te conviene vender hoy',
    body: 'Recibe un análisis preliminar en menos de 2 minutos.',
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
    // Backing/accelerator credibility line -- not a quote or endorsement,
    // just an institutional fact, so it sits with experienceStatement
    // rather than inside the checklist below.
    backingStatement: 'Somos parte de la aceleradora inmobiliaria más importante de LATAM.',
    backingLogoUrl: 'https://pulppo.com/images/logo_claro.svg',
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
        title: 'Analizamos el volumen de datos con IA',
        detail: 'Procesamos miles de referencias de mercado para detectar patrones que un análisis manual pasaría por alto.',
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
      suffix: ' y autorizo que me contacten.',
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
    panelChip: 'Rango preliminar',
    headlinePrefix: 'Tu propiedad podría estar en un rango de:',
    headlineJoiner: 'a',
    caption: (colonia: string) => `Esto es un promedio de ${colonia} basado en datos históricos y nuestra experiencia en la zona.`,
    researchCaption: (colonia: string) =>
      `Este es un rango preliminar de ${colonia}, basado en datos históricos y nuestra experiencia en la zona.`,
    advisorParagraph: (advisorFirstName: string, gender: 'm' | 'f', colonia: string) =>
      `${advisorFirstName} será tu ${gender === 'f' ? 'asesora experta' : 'asesor experto'} en ${colonia}. Muy pronto se ` +
      'pondrá en contacto para platicar personalmente sobre ' +
      'la estrategia ideal para vender tu propiedad.',
    // Advisor note inside the price panel, one paragraph. Split into
    // segments because the component bolds the first name and colonia
    // around them (this file stays JSX-free). Reads: "{firstName} es
    // {roleLabel} en nuestro equipo y conoce muy bien {colonia}, por eso
    // estará trabajando directamente contigo." "estará" is gender-neutral,
    // so no agreement branch is needed here.
    panelAdvisorNote: {
      middle: (roleLabel: string) => ` es ${roleLabel} en nuestro equipo y conoce muy bien `,
      suffix: ', por eso estará trabajando directamente contigo.',
    },
    // WhatsApp CTA inside the price panel, under the advisor note. Kept
    // short ("Chatear ahora") like the sticky bar; the longer "Completar mi
    // ACM con {nombre}" is reserved for the closing card at the bottom.
    panelCtaLabel: 'Chatear ahora',
    // Bottom edge of the price panel: tells the visitor the range is the
    // opening of a longer analysis, not the whole answer.
    panelScrollCue: 'Tu análisis continúa',
    // Positioning bar labels. The bar reads red-yellow-green-yellow-red:
    // the glass pill floats over the recommended range in the middle and the
    // red margins at both ends fall outside it, summarized by the note below
    // the bar.
    bar: {
      estimateLabel: 'Precio aprox',
      minLabel: 'Mín',
      maxLabel: 'Máx',
      outOfMarketNote: 'Los extremos en rojo quedan fuera de mercado.',
    },
    // Section numbering mirrors the chaptered structure of the full ACM
    // ("01 Pulso del Mercado"...) so this screen reads as a preview of the
    // real document, not a standalone widget.
    pulse: {
      chip: '01 Pulso de la Zona',
      title: 'Lo que el mercado ya nos dice',
      m2Label: 'Referencia por m²',
      m2SublineColonia: (colonia: string) => `Con base en listados reales de ${colonia}.`,
      m2SublineZona: 'Promedio de Zona Esmeralda mientras afinamos tu fraccionamiento.',
      listingsLabel: 'Referencias activas',
      listingsValue: (count: number) => `${count}`,
      listingsSubline: 'Propiedades publicadas hoy en nuestro portafolio de la zona.',
      rangeWidthLabel: 'Amplitud de tu rango',
      rangeWidthSubline: 'Tu ACM lo reduce a un precio exacto de salida.',
    },
    mercadoChip: '02 Referencias del Mercado',
    mercadoTitleWithComps: (colonia: string) => `Referencias reales en ${colonia}`,
    mercadoTitleNoComps: (colonia: string) => `Armando referencias para ${colonia}`,
    // Shown when real comparables render below: the same "oferta pública"
    // caveat the full ACM opens its comparables chapter with.
    notaOfertaTag: 'Nota sobre estas referencias',
    notaOfertaBody:
      'Son precios de oferta pública, no de cierre. El precio final suele negociarse entre 5 y 10% por debajo de ' +
      'estos valores, y tu estrategia debe contemplarlo.',
    notaPlaceholderTag: 'Nota sobre la zona',
    notaPlaceholderBody: (colonia: string) =>
      `Estamos reuniendo referencias específicas de ${colonia}. Tu Master Broker las revisará contigo para completar el análisis comparativo.`,
    researchCardsLabel: (count: number) => `${count} referencias en investigación`,
    noCompsBody: (colonia: string) =>
      `Todavía no tenemos comparables específicos de ${colonia} en nuestro sistema, pero tu asesor los incluirá al ` +
      'preparar tu Análisis Comparativo de Mercado completo.',
    acm: {
      chip: '03 Tu ACM Completo',
      title: 'De un rango a un precio de salida',
      gapIntro: (rangeWidth: string) =>
        `Entre el mínimo y el máximo de tu rango hay ${rangeWidth} de diferencia. Tu Análisis Comparativo de ` +
        'Mercado lo convierte en un precio de salida exacto, con comparables homologados a tu propiedad.',
      marketTruth:
        'Un precio fuera de mercado no vende más caro, solo tarda más. El número correcto se defiende con datos, ' +
        'no con corazonadas.',
      checklist: [
        {
          title: 'Comparables homologados',
          detail: 'Tu asesor selecciona caso por caso las propiedades que sí compiten con la tuya, ajustadas por tamaño, condición y ubicación.',
        },
        {
          title: 'Precio sugerido de salida',
          detail: 'Un número exacto con estrategia de posicionamiento, no un rango.',
        },
        {
          title: 'Plan de acción',
          detail: 'Los pasos concretos para llegar al comprador correcto y cerrar en tiempo.',
        },
      ],
      // "ACM" and not "análisis" on purpose: the full phrase wraps this
      // full-width pill to two lines at 390px with the longest advisor first
      // names, and the term is established by this section's own chip and
      // intro copy right above the button.
      ctaLabel: (advisorFirstName: string) => `Completar mi ACM con ${advisorFirstName}`,
    },
    // Closing card at the very bottom: the assigned advisor gets a full
    // profile + CTA here (the only inline CTA on the screen now that
    // section 03 is value-only), followed by the rest of the team so the
    // "a real team is behind this" claim lands right before the visitor
    // decides whether to reach out.
    closing: {
      chip: 'Tu asesor asignado',
      teamLabel: 'Y el resto del equipo que te respalda',
    },
  },

  // Static, deliberately shorter than reveal.ctaLabel -- this is the
  // persistent bottom bar, which has much less room (name + role + button
  // all in one row) than the inline card's now full-width button.
  advisorCta: {
    ctaLabel: 'Chatear ahora',
  },

  submittedFallback: {
    title: (firstName: string) => `Gracias, ${firstName}`,
    body: 'Un asesor te contacta por WhatsApp con el valor estimado de tu propiedad.',
  },
} as const;
