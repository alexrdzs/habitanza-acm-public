// Real Habitanza advisors featured on the "Hablemos ahora" CTA. Which one
// appears is randomized client-side per visit (see AdvisorCTA.tsx) so the
// team can see whether Rogelio or Tere gets more inbound WhatsApp contact.
export interface Advisor {
  name: string;
  phone: string; // "55 3049 4822" format
  imageUrl: string;
  roleLabel: string; // grammatically correct for this person — "asesor"/"asesora" isn't interchangeable in Spanish
}

export const ADVISORS: Advisor[] = [
  {
    name: 'Rogelio Bertrán',
    phone: '55 3049 4822',
    imageUrl: 'https://images.pulppo.com/property/contact/659c5f5d008561d99319b5c4/profile_picture/Rogelio_Looks_3.jpg',
    roleLabel: 'Tu asesor en la zona',
  },
  {
    name: 'Tere López B.',
    phone: '55 8024 4872',
    imageUrl: 'https://images.pulppo.com/property/contact/659c5f19008561d99319b5c2/profile_picture/Tere_Habitanza_Look.jpg',
    roleLabel: 'Tu asesora en la zona',
  },
];

export function whatsappLink(advisor: Advisor, message: string): string {
  const digits = advisor.phone.replace(/\D/g, '');
  const withCountryCode = digits.startsWith('52') ? digits : `52${digits}`;
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`;
}
