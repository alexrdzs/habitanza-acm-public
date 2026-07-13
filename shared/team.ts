// The full active Habitanza roster (sourced 2026-07-10 via the internal
// agent directory), shown on the Hero's "meet the team" module.
//
// Deliberately kept separate from shared/advisors.ts -- that file is the
// smaller pool actually used for the randomized WhatsApp CTA / "firma"
// attribution on the reveal screen. Expanding who appears there is a
// lead-routing decision (who actually fields inbound leads), not a display
// one, so this file only affects what's shown, never who gets contacted.
export interface TeamMember {
  name: string;
  firstName: string;
  roleLabel: string;
  imageUrl: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alex Rodríguez',
    firstName: 'Alex',
    roleLabel: 'Director',
    imageUrl: 'https://images.pulppo.com/property/contact/659c5eb000856100c56e800e/profile_picture/Alex_Habitanza_Perfil.jpg',
  },
  {
    name: 'André Bertrán',
    firstName: 'André',
    roleLabel: 'Asesor comercial',
    imageUrl: 'https://images.pulppo.com/property/contact/69a7ae8d045f68775827e857/profile_picture/Avatar_Andre.jpg',
  },
  {
    name: 'Martina Croce',
    firstName: 'Martina',
    roleLabel: 'Asesora comercial',
    imageUrl: 'https://images.pulppo.com/property/contact/69a7a692045f688c5b086d61/profile_picture/Avatar_Marti.jpg',
  },
  {
    name: 'Paola Bertrán',
    firstName: 'Paola',
    roleLabel: 'Asesora comercial',
    imageUrl: 'https://images.pulppo.com/property/contact/680581e32804984158a731c1/profile_picture/Paola_Habitanza_2025.jpg',
  },
  {
    name: 'Rogelio Bertrán',
    firstName: 'Rogelio',
    roleLabel: 'Asesor comercial',
    imageUrl: 'https://images.pulppo.com/property/contact/659c5f5d008561d99319b5c4/profile_picture/Rogelio_Looks_3.jpg',
  },
  {
    name: 'Tere López',
    firstName: 'Tere',
    roleLabel: 'Asesora comercial',
    imageUrl: 'https://images.pulppo.com/property/contact/659c5f19008561d99319b5c2/profile_picture/Tere_Habitanza_Look.jpg',
  },
];
