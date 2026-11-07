import { getPosts } from '@/lib/content/blog'
import { getProjects } from '@/lib/content/projects'
import { getTeam } from '@/lib/content/team'

// Structure du menu de la démo (menus.json). Les libellés vivent dans messages/fr.json (clé "nav.*").
export type NavItem = {
  key: string
  href: string
  children?: readonly { key: string; href: string }[]
}

export const nav: readonly NavItem[] = [
  {
    key: 'services',
    href: '/services',
    children: [
      { key: 'serviceBatch', href: '/services/batch-cooking' },
      { key: 'serviceChef', href: '/services/chef-prive' },
      { key: 'serviceCours', href: '/services/cours-de-cuisine' },
    ],
  },
  { key: 'pricing', href: '/tarifs' },
  { key: 'recipes', href: '/recettes' },
  { key: 'portfolio', href: '/realisations' },
  { key: 'journal', href: '/blog' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
]

// Les entrées « exemple » du menu de la démo (un service, un membre, une réalisation, un article) pointent vers le premier contenu réel ; sans contenu, elles pointent vers la liste, pour que le menu garde toujours les mêmes entrées que la démo.
const examples: Record<string, () => string> = {
  singleMember: () => first(getTeam(), '/equipe'),
  singlePortfolio: () => first(getProjects(), '/realisations'),
  article: () => first(getPosts(), '/blog'),
}

function first(list: { slug: string }[], base: string) {
  return list[0] ? `${base}/${list[0].slug}` : base
}

export function resolveNav(): NavItem[] {
  return nav.map((item) => ({
    ...item,
    children: item.children?.map((c) =>
      c.key in examples ? { ...c, href: examples[c.key]() } : c,
    ),
  }))
}
