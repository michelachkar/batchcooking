// Recettes proposées au choix. Chaque fiche donne au client de quoi choisir (saveurs, ingrédients clés, régimes,
// allergènes, origine, piment, conservation, prix des ingrédients) sans la recette : ni quantités, ni étapes, ni temps de cuisson.
// Pour ajouter une recette : ajouter une entrée ci-dessous (et sa photo dans `media.events` si besoin).

export const DISH_TYPES = {
  viande: 'Viande',
  poisson: 'Poisson',
  vegetarien: 'Végétarien',
} as const
export type DishType = keyof typeof DISH_TYPES

export const DIETS = {
  vegetarien: 'Végétarien',
  vegan: 'Vegan',
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

// Niveau de piment : toujours affiché, y compris « Non pimenté ».
export const SPICE = {
  doux: 'Non pimenté',
  releve: 'Légèrement pimenté',
  epice: 'Pimenté',
} as const
export type Spice = keyof typeof SPICE

// Libellés de la fiche recette, communs à tous les endroits où une recette s'affiche.
export const RECIPE_LABELS = {
  signature: 'Signature',
  allergens: 'Allergènes',
  allergenNone: 'Aucun allergène majeur',
  origin: 'Cuisine',
  storage: 'Conservation',
  freezing: 'Congélation',
  reheat: 'Réchauffage',
  spice: 'Piment',
  mainIngredients: 'Ingrédients principaux',
  ingredients: 'Prix des ingrédients',
  priceLevel: 'Prix des ingrédients : {n} sur 4',
  freezable: 'Possible',
  notFreezable: 'Déconseillée',
} as const

/** Prix approximatif des ingrédients : de € (économique) à €€€€ (élevé), hors prestation de la cheffe. */
export const ingredientPrice = (cost: Recipe['cost']) => '€'.repeat(cost)

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
  /** Origine du plat (pays). */
  origin: string
  spice: Spice
  /** Prix approximatif des ingrédients : de € (économique) à €€€€ (élevé), hors prestation de la cheffe. */
  cost: 1 | 2 | 3 | 4
  /** Saison idéale ; vide si la recette se prépare toute l'année. */
  season?: string
  /** Durée de conservation au réfrigérateur, en jours. */
  fridgeDays: number
  /** Le plat peut-il être congelé ? */
  freezable: boolean
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
    diets: [],
    allergens: [],
    origin: 'Française',
    spice: 'doux',
    cost: 2,
    fridgeDays: 3,
    freezable: true,
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
    diets: ['vegetarien', 'vegan'],
    allergens: [],
    origin: 'Indienne',
    spice: 'releve',
    cost: 1,
    season: 'Automne et hiver',
    fridgeDays: 4,
    freezable: true,
    reheat: 'Au micro-ondes ou à la casserole',
  },
  {
    title: 'Gratin de pâtes aux légumes',
    alt: 'Gratin de pâtes aux légumes',
    type: 'vegetarien',
    pack: 'classiques',
    description:
      'Pâtes gratinées à la crème légère avec des légumes de saison, croustillant dessus et fondant dedans.',
    ingredients: ['Pâtes', 'Légumes de saison', 'Béchamel', 'Fromage'],
    diets: ['vegetarien'],
    allergens: ['gluten', 'lait'],
    origin: 'Française',
    spice: 'doux',
    cost: 1,
    fridgeDays: 3,
    freezable: true,
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
    diets: [],
    allergens: ['poisson', 'lait'],
    origin: 'Française',
    spice: 'doux',
    cost: 3,
    fridgeDays: 2,
    freezable: false,
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
    diets: [],
    allergens: ['gluten', 'lait', 'oeufs'],
    origin: 'Italienne',
    spice: 'doux',
    cost: 2,
    season: 'Automne et hiver',
    fridgeDays: 3,
    freezable: true,
    reheat: 'Au four ou au micro-ondes',
  },
]
