// Real Habitanza advisors featured on the "Hablemos ahora" CTA. Which one
// appears is randomized client-side per visit (see AdvisorCTA.tsx) so the
// team can see whether Rogelio or Tere gets more inbound WhatsApp contact.
export interface Advisor {
  name: string;
  phone: string; // "55 3049 4822" format
  imageUrl: string;
  roleLabel: string; // job title, shown in the firma block
  gender: 'm' | 'f'; // drives grammatical agreement ("asesor"/"asesora", "experto"/"experta") in copy that names them
}

// Default pool for Zona Esmeralda and any non-specialized campaign area.
export const ADVISORS: Advisor[] = [
  {
    name: 'Rogelio Bertrán',
    phone: '55 3049 4822',
    imageUrl: 'https://images.pulppo.com/property/contact/659c5f5d008561d99319b5c4/profile_picture/Rogelio_Looks_3.jpg',
    roleLabel: 'Director Comercial',
    gender: 'm',
  },
  {
    name: 'Tere López B.',
    phone: '55 8024 4872',
    imageUrl: 'https://images.pulppo.com/property/contact/659c5f19008561d99319b5c2/profile_picture/Tere_Habitanza_Look.jpg',
    roleLabel: 'Directora de ventas',
    gender: 'f',
  },
];

// Bosque Real and Interlomas are deliberately routed only to this pool.
// Contacts were provided by the team for the temporary expansion campaign.
export const BOSQUE_REAL_INTERLOMAS_ADVISORS: Advisor[] = [
  {
    name: 'André Bertrán',
    phone: '527298885497',
    imageUrl: 'https://images.pulppo.com/property/contact/69a7ae8d045f68775827e857/profile_picture/Avatar_Andre.jpg',
    roleLabel: 'Master Broker',
    gender: 'm',
  },
  {
    name: 'Martina Croce',
    phone: '527298885412',
    imageUrl: 'https://images.pulppo.com/property/contact/69a7a692045f688c5b086d61/profile_picture/Avatar_Marti.jpg',
    roleLabel: 'Master Broker',
    gender: 'f',
  },
];

const BOSQUE_REAL_INTERLOMAS_COLONIAS = new Set(['Bosque Real', 'Interlomas']);

export function advisorsForColonia(colonia: string): Advisor[] {
  return BOSQUE_REAL_INTERLOMAS_COLONIAS.has(colonia) ? BOSQUE_REAL_INTERLOMAS_ADVISORS : ADVISORS;
}

export function whatsappLink(advisor: Advisor, message: string): string {
  const digits = advisor.phone.replace(/\D/g, '');
  const withCountryCode = digits.startsWith('52') ? digits : `52${digits}`;
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`;
}

// Shared by every WhatsApp CTA on the reveal screen (the inline button next
// to the firma block and the sticky bottom bar) so the pre-filled message
// can't drift between the two.
export function buildWhatsAppMessage(advisor: Advisor, nombre: string, tipoPropiedad: string, colonia: string): string {
  const homeownerName = nombre.trim();
  const introduction = homeownerName ? `soy ${homeownerName}. ` : '';
  return `Hola ${advisor.name.split(' ')[0]}, ${introduction}Acabo de recibir la estimación preliminar de mi ${tipoPropiedad.toLowerCase()} en ${colonia} y me gustaría platicarla contigo. https://habitanza.com/vender`;
}
