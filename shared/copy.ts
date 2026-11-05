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

// Millions with one decimal at most: 8200000 -> $8.2, 12000000 -> $12.
const mdp = (n: number) => `$${Math.round(n / 1e5) / 10}`;

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

  // Home for the in-person event mode (?modo=evento): read from a meter away.
  heroEvent: {
    headline: '¿Cuánto vale tu propiedad?',
    tagline: 'Tu estimado en 2 minutos',
    body: 'Lo llenamos juntos con tu asesor y ves el resultado aquí mismo.',
    ctaLabel: 'Empezar',
    // Order-matched with TRUST_MARK_ICONS in WizardHero.tsx.
    bullets: ['Sin costo', 'Asesores locales de la zona', 'Con datos reales del mercado'],
  },

  // Event mode: the advisor is standing next to the visitor, so copy talks
  // about "now / here" instead of "soon / they'll contact you".
  share: {
    button: 'Compartir mi valuación',
    sheetTitle: 'Tu valuación',
    chip: 'Rango preliminar',
    // The text that travels with the image in the share sheet.
    message: (firstName: string) =>
      `Hola ${firstName}, tu propiedad está en este rango. Platiquemos uno a uno para llegar a un precio adecuado y que puedas tomar la mejor decisión.`,
    features: {
      construction: (n: number) => `${n} m² de construcción`,
      land: (n: number) => `${n} m² de terreno`,
      bedrooms: (n: number) => `${n} ${n === 1 ? 'recámara' : 'recámaras'}`,
      baths: (n: number) => `${n} ${n === 1 ? 'baño' : 'baños'}`,
      parking: (n: number) => `${n} ${n === 1 ? 'auto' : 'autos'}`,
    },
    low: 'Mínimo',
    high: 'Máximo',
    disclaimer: 'Estimación preliminar, no es el ACM final.',
    attended: 'Tu asesor',
    download: 'Descargar',
    share: 'Compartir',
    close: 'Cerrar',
    fileName: 'Valuacion.png',
    shareTitle: 'Mi valuación con Habitanza',
    error: 'No se pudo generar la imagen. Intenta de nuevo.',
  },
  event: {
    shareFab: 'Compartir estimado',
    contactDescription: 'Tu asesor está contigo. Déjanos tus datos para darte seguimiento después del evento.',
    revealSubtext: 'Este es un primer rango aproximado. Lo revisamos juntos ahora.',
    // Final card, spoken as "we" with the visitor sitting right there: no
    // named broker, no button, just the invitation to pick a day together.
    meeting: {
      title: 'Agendemos una reunión',
      subtitle: 'Este es un primer acercamiento. Elijamos juntos un día para armar tu ACM completo.',
      checklistFirstDetail:
        'Elegimos caso por caso las propiedades que sí compiten con la tuya, ajustadas por tamaño, condición y ubicación.',
    },
    broker: { label: 'Broker:', placeholder: 'Elige tu nombre' },
    advisorParagraph: (advisorFirstName: string, colonia: string) =>
      `${advisorFirstName} está contigo hoy y conoce muy bien ${colonia}. Después del evento te escribe por WhatsApp ` +
      'para armar la estrategia ideal para vender tu propiedad.',
    panelAdvisorSuffix: ', y está aquí para revisarlo contigo ahora.',
    panelCtaLabel: 'Seguir por WhatsApp',
    submittedBody: 'Tu asesor te da seguimiento por WhatsApp después del evento.',
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
    // The Pulppo mark itself is rendered inline by the PulppoLogo component
    // (currentColor + a transparent cut-out), so it needs no URL here and
    // adapts to light/dark on its own -- no external asset, no dark placeholder.
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
    subtitle: 'Cuatro pasos para llegar a un número que sí se defiende.',
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

  // Left panel of the tablet-landscape / desktop layout (see WizardSidebar).
  sidebar: {
    title: 'Conoce el valor de tu propiedad',
    subtitle: 'Te ayudamos a tomar una mejor decisión.',
    summaryLabel: 'Tu propiedad',
    fraccionamiento: 'Fraccionamiento',
    tipo: 'Tipo',
    construccion: 'Construcción',
    terreno: 'Terreno',
    recamaras: 'Recámaras',
    banos: 'Baños',
    estacionamientos: 'Autos',
    antiguedad: 'Antigüedad',
    destacado: 'Destacado',
    seguridad: 'Seguridad privada',
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
    sectionLabels: {
      tamanoEspacios: 'Tamaño y espacios',
    },
    fieldLabels: {
      tipoPropiedad: 'Tipo de propiedad *',
      m2Construccion: 'Construcción *',
      m2TerrenoRequired: 'Terreno *',
      recamaras: 'Recámaras',
      banos: 'Baños',
      estacionamientos: 'Estacionamientos',
      antiguedad: 'Antigüedad (opcional)',
    },
  },

  // The property "Datos" are four short screens so none needs scrolling.
  property: {
    title: 'Tu propiedad',
    description: 'Elige el tipo, escribe los metros cuadrados y la antigüedad.',
  },
  spaces: {
    title: '¿Cuántos espacios tiene?',
    description: 'Recámaras, baños y estacionamientos.',
  },
  age: {
    label: 'Antigüedad (opcional)',
    // Short display text per stored value (the values themselves are what the
    // server validates, so they stay as they are).
    short: {
      'A estrenar': 'A estrenar',
      'Menos de 5 años': 'Menos 5 años',
      'Entre 5 y 10 años': '5 a 10 años',
      'Entre 10 y 20 años': '10 a 20 años',
      'Más de 20 años': '+20 años',
    } as Record<string, string>,
  },

  // Top bar: progress line + step label, and the event-mode restart button.
  progress: {
    stepOf: (current: number, total: number) => `Paso ${current} de ${total}`,
    labels: {
      location: 'Ubicación',
      property: 'Tu propiedad',
      spaces: 'Espacios',
      age: 'Antigüedad',
      extras: 'Extras',
      contact: 'Contacto',
    },
    analyzing: 'Analizando',
    result: 'Tu estimado',
    restart: 'Volver a empezar',
    restartConfirm: 'Toca otra vez para borrar',
  },

  extras: {
    title: '¿Qué la hace especial?',
    description: 'Toca todo lo que aplique. Es opcional.',
  },

  contact: {
    title: 'Cuéntanos de ti',
    description: 'Un asesor te contactará para platicar la mejor estrategia para tu propiedad.',
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
    nextLabel: 'Ver mi estimado',
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
        detail: 'Tenemos inventario en tu zona y lo comparamos con propiedades que existen.',
      },
      {
        label: 'Ajustando por variables de la propiedad',
        detail: 'Las características únicas de cada proiedad se consideran desde el primer cálculo.',
      },
      {
        label: 'Preparando el análisis de zona',
        detail: 'A partir del estado actual del mercado y los comparables visibles actualmente..',
      },
    ],
  },

  reveal: {
    greeting: (firstName: string) => `Muchas gracias, ${firstName}.`,
    subtext: 'Con esta información podemos darte un rango aproximado.',
    panelChip: 'Rango preliminar',
    // Bullets in the first card. Each exists only when real data backs it
    // (see src/lib/propertyReading.ts).
    reading: {
      chip: '01 Tu propiedad en la zona',
      title: 'Fortalezas y retos de tu propiedad',
      prosTitle: 'Lo que juega a tu favor',
      consTitle: 'Retos en tu zona',
      conUp: 'Más m² de construcción que el promedio de la zona',
      conDown: 'Menos m² de construcción que el promedio de la zona',
      terUp: 'Terreno más amplio que el promedio de la zona',
      terDown: 'Terreno más pequeño que el promedio, lo que puede acotar su valor total',
      recUp: 'Más recámaras que el promedio, ayuda a destacar',
      recDown: 'Menos recámaras que el promedio, es más complejo destacar',
      banUp: 'Más baños que los comparables',
      banDown: 'Menos baños que los comparables',
      ageNew: 'Propiedad nueva o casi nueva',
      ageOld: 'Más de 20 años de antigüedad, algunos compradores esperan actualizaciones',
      feature: (name: string) => `Suma valor: ${name}`,
      challenge: (name: string) => `A considerar: ${name}`,
      competition: (count: number, colonia: string) =>
        `${count} ${count === 1 ? 'propiedad similar publicada' : 'propiedades similares publicadas'} hoy en ${colonia}, compiten por el mismo comprador`,
    },
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
      minLabel: 'Mínimo',
      maxLabel: 'Máximo',
      // Sits over the glass band in the middle: says WHERE the ideal price is
      // without naming a number.
      idealLabel: 'Tu precio ideal está en el rango:',
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
      // lot) and its recámaras/baños compare to the zone, returned as segments.
      // Each toned segment is a *complete concept* ("menos m² de construcción",
      // "más recámaras"), not a lone polarity word, so the highlight reads as a
      // finding rather than a stray colored word; the surrounding prose stays
      // plain. Only fields that stand out (up/down) get a clause; an in-line or
      // unknown field is omitted, so an empty array means "render no paragraph."
      // The size sentence leads because m² is the most fundamental comparison;
      // distribution (recámaras/baños) follows.
      analysisSegments: (
        con: 'up' | 'down' | 'equal' | null, // built m² vs the zone's typical built m²
        ter: 'up' | 'down' | 'equal' | null, // lot m² vs the zone's typical lot size
        rec: 'up' | 'down' | 'equal' | null,
        ban: 'up' | 'down' | 'equal' | null
      ): { t: string; tone?: 'pos' | 'neg' }[] => {
        const segs: { t: string; tone?: 'pos' | 'neg' }[] = [];
        const conRel = con === 'up' || con === 'down';
        const terRel = ter === 'up' || ter === 'down';

        // Size sentence: "Tu propiedad tiene [menos m² de construcción], en un
        // [terreno más pequeño] que el promedio de la zona." Each half only
        // shows when it actually stands out, so the sentence reads naturally
        // with one half or both.
        if (conRel || terRel) {
          segs.push({ t: 'Tu propiedad tiene ' });
          if (conRel) {
            const pos = con === 'up';
            segs.push({ t: `${pos ? 'más' : 'menos'} m² de construcción`, tone: pos ? 'pos' : 'neg' });
          }
          if (terRel) {
            const pos = ter === 'up';
            segs.push({ t: conRel ? ', en un ' : 'un ' });
            segs.push({ t: `terreno ${pos ? 'más grande' : 'más pequeño'}`, tone: pos ? 'pos' : 'neg' });
          }
          segs.push({ t: ' que el promedio de la zona.' });
        }
        const sizePresent = conRel || terRel;
        const recRel = rec === 'up' || rec === 'down';

        // Bridge off the size sentence: size is a headline buyer criterion.
        // When a recámaras read follows it runs straight into it ("...para los
        // compradores, también tiene [más recámaras]..."); on its own it closes
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
          // With the size bridge already carrying "también tiene", the concept
          // starts the clause; without it, it opens the paragraph itself.
          if (!sizePresent) segs.push({ t: 'Tu propiedad tiene ' });
          segs.push({ t: `${pos ? 'más' : 'menos'} recámaras`, tone: pos ? 'pos' : 'neg' });
          segs.push({
            t: pos
              ? ' que el promedio, lo que ayuda a destacar frente a la competencia.'
              : ' que el promedio, lo que hace más complejo destacar frente a la competencia.',
          });
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
            ? sizePresent
              ? ' Ofrece '
              : 'Tu propiedad ofrece '
            : sameDirection
              ? ' Además, ofrece '
              : ' Pero ofrece ';
          segs.push({ t: lead });
          segs.push({ t: `${pos ? 'más' : 'menos'} baños`, tone: pos ? 'pos' : 'neg' });
          segs.push({
            t: pos
              ? ' que los comparables, lo cual suele ser una ventaja para la mayoría de compradores.'
              : ' que los comparables, lo cual suele ser un inconveniente para la mayoría de compradores.',
          });
        }
        return segs;
      },
      // Terrenos have no rooms/baths, so their read is built on lot size vs the
      // zone's other terrenos. A larger lot is framed as value; a smaller one
      // stays honest (less total value) but notes the upside (easier to sell),
      // so the paragraph never reads as pure bad news. The lot-size concept is
      // the single highlighted finding.
      analysisSegmentsTerreno: (size: 'up' | 'down' | 'equal' | null): { t: string; tone?: 'pos' | 'neg' }[] => {
        if (size === 'up') {
          return [
            { t: 'Tu ' },
            { t: 'terreno es más amplio', tone: 'pos' },
            { t: ' que el promedio de la zona, lo que suele sumar valor y potencial de desarrollo.' },
          ];
        }
        if (size === 'down') {
          return [
            { t: 'Tu ' },
            { t: 'terreno es más pequeño', tone: 'neg' },
            { t: ' que el promedio de la zona, lo que puede acotar su valor total, aunque suele facilitar una venta más ágil.' },
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
      title: (colonia: string) => `Análisis del mercado en ${colonia}`,
      m2Label: 'Referencia por m²',
      m2SublineColonia: (colonia: string) => `Con base en listados reales de ${colonia}.`,
      m2SublineZona: 'Promedio de Zona Esmeralda mientras afinamos tu fraccionamiento.',
      listingsLabel: 'Referencias activas',
      listingsValue: (count: number) => `${count}`,
      listingsSubline: 'Propiedades publicadas hoy en portales de la zona.',
      rangeWidthLabel: 'Amplitud de tu rango',
      rangeWidthSubline: 'Tu ACM lo reduce a un precio exacto de salida.',
    },
    // Per-fraccionamiento read of the market. `precios` is a client-supplied
    // range, used only when the colonia has no comparables to derive one from.
    // A colonia without an entry shows no profile (never invented).
    zona: {
      title: (colonia: string) => `Perfil de ${colonia}`,
      perfilLabel: 'Perfil',
      mercadoLabel: 'Mercado',
      preciosLabel: 'Precios de referencia',
      // Derived from the comparables on screen, so it always matches them.
      preciosDerivados: (parts: string[]) => `En las referencias de abajo: ${parts.join(', ')}.`,
      rango: (label: string, min: number, max: number) => `${label} de ${mdp(min)} a ${mdp(max)} MDP`,
      tipos: { Casa: 'casas', Terreno: 'terrenos', Departamento: 'departamentos' } as const,
      profiles: {
        'Rancho San Juan': {
          perfil:
            'Uno de los desarrollos más exclusivos y recientes de la zona. Tiene terrenos muy amplios y un entorno boscoso, con vocación hípica.',
          mercado:
            'Muchos lotes superan los 1,000 m², así que es una opción frecuente para casas de autor hechas a la medida. ' +
            'Hay pocos lotes planos o con vistas privilegiadas, y esos se cotizan más alto.',
        },
        'Condado de Sayavedra': {
          perfil:
            'El fraccionamiento clásico de Zona Esmeralda. Tiene mucha vegetación de encinos, arquitectura tradicional de influencia inglesa, tradición hípica y un ambiente muy natural.',
          mercado:
            'El mercado de reventa es muy activo. Conviven casas con más de 20 años que piden remodelación y residencias totalmente nuevas. La comunidad está muy consolidada.',
        },
        'Hacienda de Valle Escondido': {
          perfil:
            'Fraccionamiento hermano de Lomas de Valle Escondido. Tiene alta seguridad, control de acceso estricto, calles bien cuidadas y terrenos muy amplios.',
          mercado:
            'Es un mercado maduro y de baja rotación: quien compra suele quedarse a largo plazo. Abundan los terrenos planos, y eso mantiene estable el valor por m².',
        },
        'Lomas de Valle Escondido': {
          perfil:
            'Fraccionamiento hermano de Hacienda de Valle Escondido. Tiene alta seguridad, control de acceso estricto, calles bien cuidadas y terrenos muy amplios.',
          mercado: 'Es un mercado maduro y de baja rotación: quien compra suele quedarse a largo plazo.',
        },
        'Bosque Esmeralda': {
          perfil:
            'Subzona de planeación más moderna. Combina cerradas de casas medianas y grandes con el centro comercial y de servicios de la zona: colegios, plazas y oficinas.',
          mercado:
            'Concentra buena parte de la oferta de entrega inmediata y de vivienda vertical premium. La buscan familias jóvenes que quieren la seguridad de Zona Esmeralda, con metrajes más eficientes y cerca de las salidas principales.',
          precios: 'Casas de $8.5 a $16 MDP y departamentos de lujo de $5 a $9 MDP.',
        },
        'Prado Largo': {
          perfil:
            'Subzona de planeación más moderna. Combina cerradas de casas medianas y grandes con el centro comercial y de servicios de la zona: colegios, plazas y oficinas.',
          mercado:
            'Concentra buena parte de la oferta de entrega inmediata. La buscan familias jóvenes que quieren la seguridad de Zona Esmeralda y cercanía a las salidas principales.',
        },
        'Residencial Lago Esmeralda': {
          perfil:
            'La zona de acceso y expansión más reciente de Zona Esmeralda. Tiene vivienda vertical y casas en clústeres compactos, con vista a la presa Madín.',
          mercado:
            'Es la zona con más transacciones de clase media alta y la más influida por la oferta de departamentos. Es una buena puerta de entrada a la región. Su precio se mueve más, porque depende de la vialidad y del suministro de agua.',
          precios: 'Departamentos y casas en condominio de $3.5 a $6.5 MDP.',
        },
      } as Record<string, { perfil: string; mercado: string; precios?: string }>,
    },
    // One card, two columns: the zone's numbers and the references behind them.
    market: {
      chip: '02 Qué dice el mercado',
      statsLabel: 'Cifras de tu zona',
    },
    mercadoChip: '02 Referencias del Mercado',
    mercadoTitle: 'Análisis del mercado',
    mercadoSubtitle: 'Lo que se publica hoy en tu zona.',
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
    // Last card: the whole point of this screen. The range is a first
    // approach; the meeting turns it into an exact exit price.
    meeting: {
      chip: '03 Siguiente paso',
      title: 'Agenda una reunión',
      subtitle: 'Este es un primer acercamiento. En una reunión armamos tu ACM completo.',
      ctaLabel: (advisorFirstName: string) => `Agendar reunión con ${advisorFirstName}`,
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
