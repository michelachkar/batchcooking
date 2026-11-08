// Structure du menu principal. Les libellés vivent dans messages/fr.json (clé "nav.*").
export type NavItem = {
  key: string
  href: string
  children?: readonly { key: string; href: string }[]
}

export const nav: readonly NavItem[] = [
  { key: 'about', href: '/a-propos' },
  {
    key: 'services',
    href: '/services',
    children: [
      { key: 'serviceBatch', href: '/services/batch-cooking' },
      { key: 'serviceChef', href: '/services/chef-prive' },
      { key: 'serviceCours', href: '/services/cours-de-cuisine' },
      { key: 'zones', href: '/zones' },
    ],
  },
  { key: 'pricing', href: '/tarifs' },
  { key: 'recipes', href: '/recettes' },
  { key: 'portfolio', href: '/realisations' },
  { key: 'faq', href: '/faq' },
]
