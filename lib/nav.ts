import { getPosts } from '@/lib/content/blog'
import { getProjects } from '@/lib/content/projects'
import { getServices } from '@/lib/content/services'
import { getTeam } from '@/lib/content/team'

// Structure du menu de la démo (menus.json). Les libellés vivent dans messages/fr.json (clé "nav.*").
export type NavItem = {
  key: string
  href: string
  children?: readonly { key: string; href: string }[]
}

export const nav: readonly NavItem[] = [
  {
    key: 'home',
    href: '/',
    children: [
      { key: 'homeMain', href: '/' },
      { key: 'homeAlt', href: '/formule-evenement' },
    ],
  },
  { key: 'about', href: '/a-propos' },
  {
    key: 'services',
    href: '/services',
    children: [
      { key: 'allServices', href: '/services' },
      { key: 'singleService', href: '/services/exemple' },
    ],
  },
  {
    key: 'pages',
    href: '#',
    children: [
      { key: 'team', href: '/equipe' },
      { key: 'singleMember', href: '/equipe/exemple' },
      { key: 'portfolio', href: '/realisations' },
      { key: 'singlePortfolio', href: '/realisations/exemple' },
      { key: 'pricing', href: '/tarifs' },
      { key: 'faq', href: '/faq' },
    ],
  },
  {
    key: 'journal',
    href: '/blog',
    children: [
      { key: 'blogGrid', href: '/blog/grille' },
      { key: 'blog', href: '/blog' },
      { key: 'blogLeft', href: '/blog/sidebar-gauche' },
      { key: 'article', href: '/blog/exemple' },
    ],
  },
  { key: 'contact', href: '/contact' },
]

// Les entrées « exemple » du menu de la démo (un service, un membre, une réalisation, un article) pointent vers le premier contenu réel ; sans contenu, elles pointent vers la liste, pour que le menu garde toujours les mêmes entrées que la démo.
const examples: Record<string, () => string> = {
  singleService: () => first(getServices(), '/services'),
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
