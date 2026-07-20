// Single source of truth for every user-facing string in the wizard.
// Components import from here instead of hardcoding text, so a copy change
// is a one-file edit (plain strings/functions, nothing that can break JSX)
// instead of a hunt across component files. Icons, colors, and other
// presentation concerns stay in the components -- this file is text only.
//
// Enum-like value/label pairs that are also validated server-side
// (REFERRAL_SOURCES, PROPERTY_FEATURES, PROPERTY_AGE_RANGES, PUBLIC_PROPERTY_TYPES)
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
    // The default (light-background) Pulppo mark. TeamSection swaps to
    // backingLogoUrlDark under prefers-color-scheme: dark via <picture>.
    backingLogoUrl: 'https://pulppo.com/images/logo_claro.svg',
    // PLACEHOLDER -- replace with the real white/light Pulppo logo for dark
    // backgrounds when it's available. The default logo_claro.svg is a
    // colored mark that reads dim on the dark surface, so until the white
    // version lands this stands in as an obvious dashed placeholder.
    backingLogoUrlDark:
      'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22160%22%20height%3D%2248%22%20viewBox%3D%220%200%20160%2048%22%3E%3Crect%20x%3D%221%22%20y%3D%221%22%20width%3D%22158%22%20height%3D%2246%22%20rx%3D%227%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%220.35%22%20stroke-dasharray%3D%225%204%22/%3E%3Ctext%20x%3D%2280%22%20y%3D%2231%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22700%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EPulppo%3C/text%3E%3C/svg%3E',
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
        detail: 'Alguien que conoce tu fraccionamiento valida el análisis antes de darte una recomendación.',
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
      adicionales: 'Características',
    },
    fieldLabels: {
      tipoPropiedad: 'Tipo de propiedad *',
      m2Construccion: 'Construcción *',
      m2TerrenoRequired: 'Terreno *',
      recamaras: 'Recámaras',
      banos: 'Baños',
      estacionamientos: 'Estacionamientos',
    },
  },

  contact: {
    title: 'Cuéntanos de ti',
    description: 'Así un asesor puede contactarte para platicar la mejor estrategia para tu propiedad.',
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
    // "Tu propiedad" -- the bridge between the zone-average price panel above
    // and the numbered market chapters below. Every value here is the
    // visitor's own answer, echoed back so the estimate reads as grounded in
    // their specifics rather than a generic average. Unnumbered on purpose:
    // it's their inputs, not one of the market chapters.
    propertyCard: {
      chip: 'Análisis individual',
      title: 'Análisis de tu propiedad',
      labels: {
        ubicacion: 'Ubicación',
        construccion: 'Construcción',
        terreno: 'Terreno',
        recamaras: 'Recámaras',
        banos: 'Baños',
        // Shorter than the form's "Estacionamientos": the card cell is
        // half-width, and "cajones" is the standard term for parking spaces.
        estacionamientos: 'Cajones',
        antiguedad: 'Antigüedad',
        amenidades: 'Características',
      },
      m2Value: (m2: number) => `${new Intl.NumberFormat('es-MX').format(m2)} m²`,
      // A single derived number so the card does analysis, not just recap:
      // the estimate's aprox spread across the visitor's own built m².
      perM2Label: 'Precio aprox por m²',
      perM2Subline: (m2: number, isTerreno: boolean) =>
        `Tu estimación entre tus ${new Intl.NumberFormat('es-MX').format(m2)} m² de ${
          isTerreno ? 'terreno' : 'construcción'
        }.`,
      // Above/below/in-line with the zone's typical, from real comparables.
      compareUp: 'Arriba del promedio de la zona',
      compareDown: 'Debajo del promedio de la zona',
      compareEqual: 'En línea con el promedio de la zona',
      // Small title + closing takeaway wrapping the derived read, which opens
      // the card so it's the first thing the visitor reads.
      analysisTitle: 'Fortalezas y debilidades',
      analysisClosing: 'Esto será importante considerarlo al momento de crear tu estrategia.',
      // A short, self-adapting read of how the property's size (built m² and
      // lot) and its recámaras/baños compare to the zone, returned as segments
      // so the component can shout the conditional keywords (green for a plus,
      // red for a drag). Only fields that stand out (up/down) get a clause; an
      // in-line or unknown field is omitted, so an empty array means "render no
      // paragraph." The size sentence leads because m² is the most fundamental
      // comparison; distribution (recámaras/baños) follows.
      analysisSegments: (
        con: 'up' | 'down' | 'equal' | null, // built m² vs the zone's typical built m²
        ter: 'up' | 'down' | 'equal' | null, // lot m² vs the zone's typical lot size
        rec: 'up' | 'down' | 'equal' | null,
        ban: 'up' | 'down' | 'equal' | null
      ): { t: string; tone?: 'pos' | 'neg' }[] => {
        const segs: { t: string; tone?: 'pos' | 'neg' }[] = [];
        const conRel = con === 'up' || con === 'down';
        const terRel = ter === 'up' || ter === 'down';

        // Size sentence: "Tu propiedad tiene más m² de construcción, en un
        // terreno más grande que el promedio de la zona." Each half only shows
        // when it actually stands out, so the sentence reads naturally with one
        // half or both.
        if (conRel || terRel) {
          segs.push({ t: 'Tu propiedad tiene ' });
          if (conRel) {
            const pos = con === 'up';
            segs.push({ t: pos ? 'más' : 'menos', tone: pos ? 'pos' : 'neg' });
            segs.push({ t: ' m² de construcción' });
          }
          if (terRel) {
            const pos = ter === 'up';
            segs.push({ t: conRel ? ', en un terreno ' : 'un terreno ' });
            segs.push({ t: pos ? 'más grande' : 'más pequeño', tone: pos ? 'pos' : 'neg' });
          }
          segs.push({ t: ' que el promedio de la zona.' });
        }
        const sizePresent = conRel || terRel;
        const recRel = rec === 'up' || rec === 'down';

        // Bridge off the size sentence: size is a headline buyer criterion.
        // When a recámaras read follows it runs straight into it ("...para los
        // compradores, también tiene más recámaras..."); on its own it closes
        // as a full sentence.
        if (sizePresent) {
          segs.push({
            t: recRel
              ? ' Esto suele ser uno de los principales criterios para los compradores, también tiene '
              : ' Esto suele ser uno de los principales criterios para los compradores.',
          });
        }

        if (recRel) {
          const pos = rec === 'up';
          // With the size bridge already carrying "también tiene", the clause
          // starts at the keyword; without it, it opens the paragraph itself.
          if (!sizePresent) segs.push({ t: 'Tu propiedad tiene ' });
          segs.push({ t: pos ? 'más' : 'menos', tone: pos ? 'pos' : 'neg' });
          segs.push({ t: ' recámaras que el promedio, lo que ' });
          segs.push({ t: pos ? 'ayuda a destacar' : 'hace más complejo destacar', tone: pos ? 'pos' : 'neg' });
          segs.push({ t: ' frente a la competencia.' });
        }
        if (ban === 'up' || ban === 'down') {
          const pos = ban === 'up';
          // Connector reflects the relationship to the recámaras read:
          // "Además" only when both clauses point the same way; "Pero" when the
          // baths contrast the recámaras read (a plus followed by a minus, or
          // vice versa). With no recámaras clause before it, the baths open a
          // clean new sentence (leading space only when something preceded it).
          const sameDirection = recRel && (rec === 'up') === pos;
          const lead = !recRel
            ? (sizePresent ? ' La cantidad de baños que ofrece es ' : 'La cantidad de baños que ofrece es ')
            : sameDirection
              ? ' Además, la cantidad de baños que ofrece es '
              : ' Pero la cantidad de baños que ofrece es ';
          segs.push({ t: lead });
          segs.push({ t: pos ? 'mayor' : 'menor', tone: pos ? 'pos' : 'neg' });
          segs.push({ t: ' que la de los comparables, lo cual suele ser ' });
          segs.push({ t: pos ? 'una ventaja' : 'un inconveniente', tone: pos ? 'pos' : 'neg' });
          segs.push({ t: ' para la mayoría de compradores.' });
        }
        return segs;
      },
      // Terrenos have no rooms/baths, so their read is built on lot size vs the
      // zone's other terrenos. A larger lot is framed as value; a smaller one
      // stays honest (less total value) but notes the upside (easier to sell),
      // so the paragraph never reads as pure bad news.
      analysisSegmentsTerreno: (size: 'up' | 'down' | 'equal' | null): { t: string; tone?: 'pos' | 'neg' }[] => {
        if (size === 'up') {
          return [
            { t: 'Tu terreno es ' },
            { t: 'más amplio', tone: 'pos' },
            { t: ' que el promedio de la zona, lo que suele ' },
            { t: 'sumar valor', tone: 'pos' },
            { t: ' y potencial de desarrollo.' },
          ];
        }
        if (size === 'down') {
          return [
            { t: 'Tu terreno es ' },
            { t: 'menos amplio', tone: 'neg' },
            { t: ' que el promedio de la zona, lo que puede ' },
            { t: 'acotar su valor total', tone: 'neg' },
            { t: ', aunque suele facilitar una venta más ágil.' },
          ];
        }
        return [];
      },
    },
    // Section numbering mirrors the chaptered structure of the full ACM
    // ("01 Pulso del Mercado"...) so this screen reads as a preview of the
    // real document, not a standalone widget.
    pulse: {
      chip: '01 Pulso del Mercado',
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
    mercadoTitle: 'Análisis del mercado',
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
    body: 'Un asesor te contacta por WhatsApp para ayudarte a tomar la mejor decisión sobre tu propiedad.',
  },
} as const;
