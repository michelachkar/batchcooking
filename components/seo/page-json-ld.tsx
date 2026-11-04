import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/seo/json-ld'
import { baseGraph, breadcrumb, webPage } from '@/lib/jsonld'

type Node = Record<string, unknown>

// Graphe d'une page : organisation, site, page, fil d'Ariane (accueil ajouté) et nœuds propres au type de page.
export async function PageJsonLd({
  path,
  title,
  description,
  crumbs = [],
  type,
  modified,
  extra = [],
}: {
  path: string
  title: string
  description: string
  /** Niveaux après l'accueil ; le dernier est la page courante. */
  crumbs?: { label: string; path?: string }[]
  type?: string
  modified?: string
  extra?: (Node | null)[]
}) {
  const p = await getTranslations('pages')
  return (
    <JsonLd
      graph={[
        ...baseGraph(),
        webPage({ path, title, description, type, modified }),
        crumbs.length > 0 ? breadcrumb([{ label: p('home'), path: '/' }, ...crumbs]) : null,
        ...extra,
      ]}
    />
  )
}
