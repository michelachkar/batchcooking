import { vrSite } from '@/tests/visual/fixtures/vr-site'

// Valeurs provisoires : nom, coordonnées et zone seront remplacés quand la marque sera décidée.
const realSite = {
  name: 'Table&Tribu',
  phone: '01 23 45 67 89',
  phoneHref: 'tel:+33123456789',
  email: 'bonjour@exemple.fr',
  address: '12 rue Exemple, 75000 Ville',
  area: 'Ville et alentours',
  hours: 'Lun - Sam, 9h00 - 19h00',
  social: [
    {
      name: 'Instagram',
      href: '#',
      path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm5.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z',
    },
    {
      name: 'Facebook',
      href: '#',
      path: 'M14 8V6a1 1 0 0 1 1-1h2V2h-3a4 4 0 0 0-4 4v2H7v3h3v11h4V11h3l1-3h-4Z',
    },
    {
      name: 'Pinterest',
      href: '#',
      path: 'M12 2a10 10 0 0 0-3.64 19.31c-.09-.82-.17-2.07.04-2.97l1.2-5.1s-.3-.61-.3-1.52c0-1.42.83-2.48 1.85-2.48.87 0 1.29.65 1.29 1.44 0 .88-.56 2.19-.85 3.4-.24 1.01.51 1.84 1.5 1.84 1.8 0 3.19-1.9 3.19-4.64 0-2.43-1.74-4.12-4.24-4.12-2.89 0-4.59 2.17-4.59 4.41 0 .87.33 1.8.75 2.31.08.1.09.19.07.29l-.28 1.15c-.04.18-.14.22-.32.13-1.21-.56-1.96-2.32-1.96-3.74 0-3.05 2.21-5.85 6.38-5.85 3.35 0 5.96 2.39 5.96 5.58 0 3.33-2.1 6.01-5.01 6.01-.98 0-1.9-.51-2.22-1.11l-.6 2.3c-.22.84-.81 1.89-1.2 2.53A10 10 0 1 0 12 2Z',
    },
    {
      name: 'TikTok',
      href: '#',
      path: 'M16 3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1.200V15a6 6 0 1 1-6-6v3.200A2.800 2.800 0 1 0 13 15V3h3Z',
    },
  ],
}

/** Tant que les coordonnées ci-dessus sont provisoires, elles ne sont pas publiées dans les données structurées. */
export const provisional = true

// Build de test visuel uniquement (NEXT_PUBLIC_VR=1) : mêmes textes que la référence pour mesurer la mise en page seule.
export const site: typeof realSite =
  process.env.NEXT_PUBLIC_VR === '1' ? { ...realSite, ...vrSite } : realSite
