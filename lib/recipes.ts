// Recettes proposées au choix. Chaque fiche donne au client de quoi choisir (saveurs, ingrédients clés, régimes,
// allergènes, conservation) sans la recette : ni quantités, ni étapes, ni temps de cuisson.
// Pour ajouter une recette : ajouter une entrée ci-dessous (et sa photo dans `media.events` si besoin).

export const DISH_TYPES = {
  viande: 'Viande',
  poisson: 'Poisson',
  vegetarien: 'Végétarien',
  complet: 'Plat complet',
} as const
export type DishType = keyof typeof DISH_TYPES

export const DIETS = {
  vegetarien: 'Végétarien',
  vegan: 'Vegan',
  'sans-porc': 'Sans porc',
} as const
export type Diet = keyof typeof DIETS

// Les 14 allergènes à déclaration obligatoire (UE), sous leur nom usuel.
export const ALLERGENS = {
  gluten: 'Gluten',
  crustaces: 'Crustacés',
  oeufs: 'Œufs',
  poisson: 'Poisson',
  arachides: 'Arachides',
  soja: 'Soja',
  lait: 'Lait',
  'fruits-a-coque': 'Fruits à coque',
  celeri: 'Céleri',
  moutarde: 'Moutarde',
  sesame: 'Sésame',
  sulfites: 'Sulfites',
  lupin: 'Lupin',
  mollusques: 'Mollusques',
} as const
export type Allergen = keyof typeof ALLERGENS

// Séries de recettes : classiques (plats maison du quotidien) et Signature (plats de la cheffe, plus travaillés).
export const RECIPE_PACKS = { classiques: 'Classiques', signature: 'Signature' } as const
export type RecipePack = keyof typeof RECIPE_PACKS
export const isRecipePack = (v: unknown): v is RecipePack => v === 'classiques' || v === 'signature'

export const SPICE = { doux: 'Doux', releve: 'Relevé', epice: 'Épicé' } as const
export type Spice = keyof typeof SPICE

export type Recipe = {
  title: string
  /** Texte alternatif de la photo. */
  alt: string
  type: DishType
  /** Série de recettes : classiques du quotidien ou Signature (plats de la cheffe plus travaillés). */
  pack: RecipePack
  /** Une ou deux phrases : saveurs, texture, style. */
  description: string
  /** Trois ou quatre ingrédients clés, sans quantités. */
  ingredients: string[]
  diets: Diet[]
  /** Allergènes présents dans la recette de base (la cheffe adapte sur demande). */
  allergens: Allergen[]
  cuisine: string
  spice: Spice
  /** Coût des ingrédients, de 1 (€) à 4 (€€€€). */
  cost: 1 | 2 | 3 | 4
  /** Saison idéale ; vide si la recette se prépare toute l'année. */
  season?: string
  /** Conservation au frais et congélation. */
  storage: string
  /** Réchauffage. */
  reheat: string
}

// À vérifier par la cheffe, en particulier les allergènes, les régimes et le coût des ingrédients (1 à 4), avant publication.
export const recipes: Recipe[] = [
  {
    title: 'Poulet rôti aux herbes',
    alt: 'Poulet rôti aux herbes et légumes de saison',
    type: 'viande',
    pack: 'classiques',
    description:
      'Poulet fermier rôti, doré et fondant, parfumé aux herbes fraîches et servi avec des légumes de saison.',
    ingredients: ['Poulet fermier', 'Herbes fraîches', 'Légumes de saison'],
    diets: ['sans-porc'],
    allergens: [],
    cuisine: 'Française',
    spice: 'doux',
    cost: 2,
    storage: '3 jours au frigo · congélation possible',
    reheat: 'Au four ou à la poêle',
  },
  {
    title: 'Curry de lentilles',
    alt: 'Curry de lentilles et riz basmati',
    type: 'vegetarien',
    pack: 'signature',
    description:
      'Lentilles mijotées dans un lait de coco onctueux, épices chaudes et riz basmati parfumé.',
    ingredients: ['Lentilles', 'Lait de coco', 'Épices douces', 'Riz basmati'],
    diets: ['vegetarien', 'vegan', 'sans-porc'],
    allergens: [],
    cuisine: 'Indienne',
    spice: 'releve',
    cost: 1,
    season: 'Automne et hiver',
    storage: '4 jours au frigo · congélation possible',
    reheat: 'Au micro-ondes ou à la casserole',
  },
  {
    title: 'Gratin de pâtes aux légumes',
    alt: 'Gratin de pâtes aux légumes',
    type: 'complet',
    pack: 'classiques',
    description:
      'Pâtes gratinées à la crème légère avec des légumes de saison, croustillant dessus et fondant dedans.',
    ingredients: ['Pâtes', 'Légumes de saison', 'Béchamel', 'Fromage'],
    diets: ['vegetarien', 'sans-porc'],
    allergens: ['gluten', 'lait'],
    cuisine: 'Française',
    spice: 'doux',
    cost: 1,
    storage: '3 jours au frigo · congélation possible',
    reheat: 'Au four ou au micro-ondes',
  },
  {
    title: 'Poisson au four, purée maison',
    alt: 'Poisson au four avec purée maison',
    type: 'poisson',
    pack: 'signature',
    description:
      'Filet de poisson blanc cuit au four, citron et herbes, accompagné d’une purée maison onctueuse.',
    ingredients: ['Poisson blanc', 'Citron', 'Herbes', 'Pommes de terre'],
    diets: ['sans-porc'],
    allergens: ['poisson', 'lait'],
    cuisine: 'Française',
    spice: 'doux',
    cost: 3,
    storage: '2 jours au frigo · congélation déconseillée',
    reheat: 'Au four doux ou à la vapeur',
  },
  {
    title: 'Lasagnes maison',
    alt: 'Lasagnes maison',
    type: 'viande',
    pack: 'classiques',
    description:
      'Lasagnes généreuses : ragù de bœuf mijoté, béchamel soyeuse et gratin doré, comme à la maison.',
    ingredients: ['Bœuf', 'Sauce tomate', 'Pâtes à lasagnes', 'Béchamel'],
    diets: ['sans-porc'],
    allergens: ['gluten', 'lait', 'oeufs'],
    cuisine: 'Italienne',
    spice: 'doux',
    cost: 2,
    season: 'Automne et hiver',
    storage: '3 jours au frigo · congélation possible',
    reheat: 'Au four ou au micro-ondes',
  },
]
