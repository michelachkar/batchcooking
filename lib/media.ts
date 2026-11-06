// Images de page. Tant que /public/assets est vide, des visuels provisoires prennent la place.

export const media = {
  hero: { src: '/assets/hero/chef.jpg', width: 1280, height: 853 },
  // Photos des cartes d'expériences.
  cards: [1, 2, 3].map(() => ({ src: '/assets/placeholders/card.svg', width: 768, height: 1024 })),
  chef: { src: '/assets/hero/chef.jpg', width: 1280, height: 853, position: '68% center' },
  chefInset: { src: '/assets/placeholders/card.svg', width: 768, height: 768 },
  about: [1, 2, 3].map(() => ({ src: '/assets/placeholders/card.svg', width: 768, height: 1024 })),
  menus: [1, 2, 3].map(() => ({ src: '/assets/placeholders/card.svg', width: 768, height: 576 })),
  strip: [
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  ],
  included: { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
  includedInset: { src: '/assets/placeholders/card.svg', width: 768, height: 768 },
  events: [1, 2, 3, 4, 5, 6].map(() => ({
    src: '/assets/placeholders/card.svg',
    width: 768,
    height: 1024,
  })),
  faces: [1, 2, 3, 4].map(() => ({
    src: '/assets/placeholders/card.svg',
    width: 768,
    height: 1024,
  })),
  // Photos des auteurs d'avis (vraies photos uniquement ; vide tant qu'il n'y a pas de vrais avis).
  reviews: [1, 2, 3].map(() => ({
    src: '/assets/placeholders/card.svg',
    width: 768,
    height: 1024,
  })),
  // Photos des articles de l'accueil (les vraies viendront du frontmatter MDX, étape 5).
  posts: [1, 2, 3].map((n) => ({ src: `/assets/blog/post-${n}.jpg`, width: 1024, height: 576 })),
  // Photos des bandeaux de page (facultatives) : sans elles le bandeau reste uni.
  heads: {
    about: undefined,
    services: undefined,
    pricing: undefined,
    team: undefined,
    faq: undefined,
    contact: undefined,
    service: undefined,
    member: undefined,
    blog: undefined,
    page: undefined,
    notFound: undefined,
    portfolio: undefined,
  },
  // Photos des formules et des réalisations en accordéon (vraies photos uniquement).
  plans: [1, 2, 3].map(() => ({ src: '/assets/placeholders/card.svg', width: 768, height: 1024 })),
  // Photo d'arrière-plan du cadre de devis : facultative, le cadre reste bordeaux sans elle.
  proposal: undefined,
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
  occasions: [1, 2, 3, 4].map(() => ({
    image: { src: '/assets/placeholders/card.svg', width: 768, height: 1024 },
    popup: undefined,
  })),
}

// La page « Mobile Bar & Cocktails » utilise les mêmes visuels provisoires que l'accueil.
export const barMedia = media

export type Landing = 'home' | 'bar'
/** Photos d'une page d'accueil : celles de l'accueil ou celles de la page « Mobile Bar & Cocktails ». */
export const mediaOf = (ns: Landing) => (ns === 'bar' ? barMedia : media)
