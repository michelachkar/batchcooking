// Images de page. Tant que /public/assets est vide, des visuels provisoires prennent la place.
const placeholder = (width: number, height: number) => ({
  src: '/assets/placeholders/card.svg',
  width,
  height,
})

export const media = {
  hero: { src: '/assets/hero/chef.jpg', width: 1280, height: 853 },
  // 3 photos sous le titre du hero (accueil).
  heroGallery: [1, 2, 3].map(() => placeholder(768, 1024)),
  // Photos des cartes d'expériences.
  cards: [1, 2, 3].map(() => placeholder(768, 1024)),
  chef: { src: '/assets/hero/chef.jpg', width: 1280, height: 853, position: '68% center' },
  chefInset: placeholder(768, 768),
  about: [1, 2, 3].map(() => placeholder(768, 1024)),
  // Photos de la page « chef privé » (déroulé de la soirée).
  included: placeholder(768, 1024),
  includedInset: placeholder(768, 768),
  // Photos du carrousel de recettes de l'accueil.
  events: [1, 2, 3, 4, 5, 6].map(() => placeholder(768, 1024)),
  // Photos des 3 étapes du batch cooking (page batch cooking).
  batchSteps: [1, 2, 3].map(() => placeholder(768, 576)),
  // Photos des 3 étapes du chef privé (page chef privé).
  chefSteps: [1, 2, 3].map(() => placeholder(768, 576)),
  // Images du méga-menu « Services » (une image par carte, clé = clé du sous-menu de lib/nav.ts). Remplacez par de vraies photos 4:3.
  navMega: {
    serviceBatch: placeholder(640, 480),
    serviceChef: placeholder(640, 480),
    serviceCours: placeholder(640, 480),
    recipeClassiques: placeholder(640, 480),
    recipeSignature: placeholder(640, 480),
  } as Record<string, { src: string; width: number; height: number }>,
  // Photos des auteurs d'avis (vraies photos uniquement).
  reviews: [1, 2, 3].map(() => placeholder(768, 1024)),
  // Photos des bandeaux de page (facultatives) : sans elles le bandeau reste uni.
  heads: {
    services: undefined,
    pricing: undefined,
    faq: undefined,
    contact: undefined,
    service: undefined,
    recipes: undefined,
    page: undefined,
    notFound: undefined,
    portfolio: undefined,
    inspirations: undefined,
  },
}
