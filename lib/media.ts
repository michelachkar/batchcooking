// Images de page. Tant que /public/assets est vide, des visuels provisoires prennent la place.
// Build de test visuel : les photos de la démo, copiées localement dans public/vr (non versionné).
import { vr } from '@/lib/flags'

export const media = {
  hero: vr
    ? { src: '/vr/hero.jpg', width: 2000, height: 2000 }
    : { src: '/assets/placeholders/hero.svg', width: 1200, height: 1400 },
  // Photos des cartes d'expériences ; en test visuel, les fichiers de la démo servis tels quels (sans AVIF) pour comparer les mêmes pixels.
  cards: [1, 2, 3].map((n) =>
    vr
      ? { src: `/vr/card-${n}.jpg`, width: 768, height: 1024, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ),
  chef: vr
    ? { src: '/vr/chef.jpg', width: 768, height: 1024, unoptimized: true }
    : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  chefInset: vr
    ? { src: '/vr/chef-inset.jpg', width: 768, height: 768, unoptimized: true }
    : { src: '/assets/placeholders/card.svg', width: 768, height: 768 },
  about: [1, 2, 3].map((n) =>
    vr
      ? { src: `/vr/about-${n}.jpg`, width: 1600, height: 1067, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ),
  menus: [1, 2, 3].map((n) =>
    vr
      ? { src: `/vr/menu-${n}.jpg`, width: 768, height: 576, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 576 },
  ),
  strip: [
    vr
      ? { src: '/vr/strip-1.jpg', width: 768, height: 768, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-2.jpg', width: 768, height: 576, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-3.jpg', width: 768, height: 768, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-4.jpg', width: 768, height: 768, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-5.jpg', width: 768, height: 768, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-6.jpg', width: 768, height: 768, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-7.jpg', width: 768, height: 576, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-8.jpg', width: 768, height: 768, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-9.jpg', width: 768, height: 1024, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    vr
      ? { src: '/vr/strip-10.jpg', width: 768, height: 1024, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ],
  included: vr
    ? { src: '/vr/included.jpg', width: 768, height: 1024, unoptimized: true }
    : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  includedInset: vr
    ? { src: '/vr/included-inset.jpg', width: 768, height: 768, unoptimized: true }
    : { src: '/assets/placeholders/card.svg', width: 768, height: 768 },
  events: [1, 2, 3, 4, 5, 6].map((n) =>
    vr
      ? { src: `/vr/event-${n}.jpg`, width: 1024, height: 576, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ),
  faces: [1, 2, 3, 4].map((n) =>
    vr
      ? { src: `/vr/face-${n}.jpg`, width: 300, height: 300, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ),
  // Photos des auteurs d'avis (vraies photos uniquement ; vide tant qu'il n'y a pas de vrais avis).
  reviews: [1, 2, 3].map((n) =>
    vr
      ? { src: `/vr/face-${n}.jpg`, width: 300, height: 300, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ),
  // Photos des articles de l'accueil (les vraies viendront du frontmatter MDX, étape 5).
  posts: [1, 2, 3].map((n) => ({ src: `/assets/blog/post-${n}.jpg`, width: 1024, height: 576 })),
  // Photos des bandeaux de page (facultatives) : sans elles le bandeau reste uni.
  heads: {
    about: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    services: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    pricing: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    team: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    faq: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    contact: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    service: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    member: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    blog: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    page: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    notFound: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
    portfolio: vr ? { src: '/vr/about-3.jpg', unoptimized: true } : undefined,
  },
  // Photos en forme de la FAQ (vraies photos uniquement).
  faq: ['faq-1', 'faq-2'].map((n) =>
    vr
      ? { src: `/vr/${n}.jpg`, width: 1024, height: 1536, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ),
  // Photos des formules et des réalisations en accordéon (vraies photos uniquement).
  plans: [1, 2, 3].map((n) =>
    vr
      ? { src: `/vr/event-${n}.jpg`, width: 1024, height: 576, unoptimized: true }
      : { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ),
  // Photo d'arrière-plan du cadre de devis : facultative, le cadre reste bordeaux sans elle.
  proposal: vr ? { src: '/vr/proposal-bg.jpg', unoptimized: true } : undefined,
  // Logos partenaires (bandeaux sous « Comment ça marche » et sous l'équipe).
  partners: [
    {
      src: '/assets/partners/partner-magnolia-hall.png',
      width: 300,
      height: 90,
      unoptimized: true,
      alt: 'Magnolia Hall',
    },
    {
      src: '/assets/partners/partner-oak-and-ember.png',
      width: 300,
      height: 90,
      unoptimized: true,
      alt: 'Oak & Ember',
    },
    {
      src: '/assets/partners/partner-tidewater-oyster-co.png',
      width: 300,
      height: 90,
      unoptimized: true,
      alt: 'Tidewater Oyster Co.',
    },
    {
      src: '/assets/partners/partner-palmetto-events.png',
      width: 300,
      height: 90,
      unoptimized: true,
      alt: 'Palmetto Events',
    },
    {
      src: '/assets/partners/partner-the-rutledge-inn.png',
      width: 300,
      height: 90,
      unoptimized: true,
      alt: 'The Rutledge Inn',
    },
    {
      src: '/assets/partners/partner-harbor-and-vine.png',
      width: 300,
      height: 90,
      unoptimized: true,
      alt: 'Harbor & Vine',
    },
  ],
  occasions: [1, 2, 3, 4].map((n) =>
    vr
      ? {
          image: { src: `/vr/occasion-${n}.jpg`, width: 768, height: 1024, unoptimized: true },
          popup: {
            src: `/vr/occasion-${n}-popup.webp`,
            width: 600,
            height: 600,
            unoptimized: true,
          },
        }
      : {
          image: { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
          popup: undefined,
        },
  ),
}

// Photos de la page « Mobile Bar & Cocktails » (mêmes emplacements que l'accueil) : en test visuel, celles de la démo ; sinon les visuels provisoires de l'accueil.
const vrPhoto = (name: string, width: number, height: number) => ({
  src: `/vr/${name}`,
  width,
  height,
  unoptimized: true,
})

export const barMedia = vr
  ? {
      ...media,
      hero: vrPhoto('bar-hero.jpg', 1800, 1800),
      cards: [
        vrPhoto('bar-card-1.jpg', 1024, 576),
        vrPhoto('bar-card-2.jpg', 1024, 576),
        vrPhoto('bar-card-3.jpg', 1024, 576),
      ],
      chef: vrPhoto('bar-chef.jpg', 768, 1024),
      chefInset: vrPhoto('bar-chef-inset.jpg', 768, 1024),
      about: [
        vrPhoto('bar-about-1.jpg', 1600, 1067),
        vrPhoto('bar-about-2.jpg', 1600, 1067),
        vrPhoto('bar-about-3.jpg', 1600, 1067),
      ],
      menus: [
        vrPhoto('bar-menu-1.jpg', 768, 1024),
        vrPhoto('bar-menu-2.jpg', 768, 1024),
        vrPhoto('bar-menu-3.jpg', 768, 1024),
      ],
      strip: [
        vrPhoto('bar-strip-1.jpg', 768, 1024),
        vrPhoto('bar-strip-2.jpg', 768, 768),
        vrPhoto('bar-strip-3.jpg', 768, 1024),
        vrPhoto('bar-strip-4.jpg', 768, 1024),
        vrPhoto('bar-strip-5.jpg', 768, 432),
        vrPhoto('bar-strip-6.jpg', 768, 432),
        vrPhoto('bar-strip-7.jpg', 768, 1024),
        vrPhoto('bar-strip-8.jpg', 768, 432),
        vrPhoto('bar-strip-9.jpg', 768, 512),
        vrPhoto('bar-strip-10.jpg', 768, 432),
      ],
      included: vrPhoto('bar-included.jpg', 768, 1024),
      includedInset: vrPhoto('bar-included-inset.jpg', 768, 1024),
    }
  : media

export type Landing = 'home' | 'bar'
/** Photos d'une page d'accueil : celles de l'accueil ou celles de la page « Mobile Bar & Cocktails ». */
export const mediaOf = (ns: Landing) => (ns === 'bar' ? barMedia : media)
