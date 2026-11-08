import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { Suspense } from 'react'
import { PageHead } from '@/components/blocks/page-head'
import { SiteSearch, type SearchEntry } from '@/components/blocks/site-search'
import { getProjects } from '@/lib/content/projects'
import { servicePages } from '@/lib/content/services'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({
    title: p('search.title'),
    description: s('search'),
    path: '/recherche',
    noindex: true,
  })
}

// Recherche : index des contenus construit ici, filtre exécuté dans le navigateur selon « ?s= ».
export default async function SearchPage() {
  const p = await getTranslations('pages')
  const t = await getTranslations('search')
  // Titre et description du `seo` de chaque page de service (messages/fr.json).
  const services: SearchEntry[] = await Promise.all(
    servicePages.map(async ({ slug, ns }) => {
      const seo = await getTranslations(`${ns}.seo`)
      return {
        type: 'service',
        title: seo('title'),
        text: seo('description'),
        href: `/services/${slug}`,
      } as const
    }),
  )
  const entries: SearchEntry[] = [
    ...services,
    ...getProjects().map((x) => ({
      type: 'project',
      title: x.data.title,
      text: x.data.excerpt,
      href: `/realisations/${x.slug}`,
    })),
  ]
  return (
    <main id="contenu">
      <PageHead
        title={p('search.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('search.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.page}
        inset
      />
      <div data-section="body">
        <Suspense>
          <SiteSearch
            entries={entries}
            action="/recherche"
            typeLabels={t.raw('types') as Record<string, string>}
            labels={{
              label: t('label'),
              button: t('button'),
              empty: t('empty'),
              none: t('none'),
              results: t('results'),
              resultOne: t('resultOne'),
              resultNone: t('resultNone'),
            }}
          />
        </Suspense>
      </div>
    </main>
  )
}
