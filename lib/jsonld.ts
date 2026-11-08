import { absoluteUrl, siteUrl } from '@/lib/seo'
import { provisional, site } from '@/lib/site'

type Node = Record<string, unknown>

const orgId = `${siteUrl}/#organization`
const siteId = `${siteUrl}/#website`

/** Organisation et site : présents sur toutes les pages. Les coordonnées ne sont publiées que lorsqu'elles sont définitives. */
export function baseGraph(): Node[] {
  return [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: site.name,
      url: absoluteUrl('/'),
      ...(provisional
        ? {}
        : {
            email: site.email,
            telephone: site.phone,
            address: site.address,
            areaServed: site.area,
          }),
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: absoluteUrl('/'),
      name: site.name,
      inLanguage: 'fr-FR',
      publisher: { '@id': orgId },
    },
  ]
}

export const ref = (id: string) => ({ '@id': id })
export const organizationRef = ref(orgId)

type Crumb = { label: string; path?: string }

/** Fil d'Ariane (BreadcrumbList) ; le dernier niveau est la page courante. */
export function breadcrumb(crumbs: Crumb[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.path && { item: absoluteUrl(c.path) }),
    })),
  }
}

/** Page web décrite dans le graphe, rattachée au site. */
export function webPage(o: {
  path: string
  title: string
  description: string
  type?: string
  modified?: string
}): Node {
  return {
    '@type': o.type ?? 'WebPage',
    '@id': `${absoluteUrl(o.path)}#webpage`,
    url: absoluteUrl(o.path),
    name: o.title,
    description: o.description,
    inLanguage: 'fr-FR',
    isPartOf: ref(siteId),
    ...(o.modified && { dateModified: o.modified }),
  }
}

export function faqPage(items: { question: string; answer: string }[]): Node | null {
  if (items.length === 0) return null
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }
}

export function serviceNode(o: {
  path: string
  name: string
  description: string
  image?: string
}): Node {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(o.path)}#service`,
    name: o.name,
    description: o.description,
    provider: organizationRef,
    ...(o.image && { image: absoluteUrl(o.image) }),
  }
}

export function projectNode(o: {
  path: string
  name: string
  description: string
  created: string
  image?: string
}): Node {
  return {
    '@type': 'CreativeWork',
    '@id': `${absoluteUrl(o.path)}#project`,
    name: o.name,
    description: o.description,
    dateCreated: o.created,
    creator: organizationRef,
    ...(o.image && { image: absoluteUrl(o.image) }),
  }
}
