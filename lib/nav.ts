// Structure du menu principal. Les libellés vivent dans messages/fr.json (clé "nav.*").
export type NavItem = {
  key: string
  href: string
  children?: readonly { key: string; href: string; mega?: boolean }[]
}

export const nav: readonly NavItem[] = [
  { key: 'about', href: '/a-propos' },
  {
    key: 'services',
    href: '/services',
    children: [
      { key: 'serviceBatch', mega: true, href: '/services/batch-cooking' },
      { key: 'serviceChef', mega: true, href: '/services/chef-prive' },
      { key: 'serviceCours', mega: true, href: '/services/cours-de-cuisine' },
      { key: 'zones', href: '/zones' },
    ],
  },
  { key: 'pricing', href: '/tarifs' },
  {
    key: 'recipes',
    href: '/recettes',
    children: [
      { key: 'recipeClassiques', mega: true, href: '/recettes?formule=classiques' },
      { key: 'recipeSignature', mega: true, href: '/recettes?formule=signature' },
    ],
  },
  { key: 'portfolio', href: '/realisations' },
  { key: 'faq', href: '/faq' },
]
