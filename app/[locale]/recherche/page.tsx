import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { PageHead } from '@/components/blocks/page-head'
import { SiteSearch, type SearchEntry } from '@/components/blocks/site-search'
import { getPosts } from '@/lib/content/blog'
import { getProjects } from '@/lib/content/projects'
import { getServices } from '@/lib/content/services'
import { getTeam } from '@/lib/content/team'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const p = await getTranslations({ locale, namespace: 'pages' })
  const s = await getTranslations({ locale, namespace: 'seo' })
  return pageMetadata({
    title: p('search.title'),
    description: s('search'),
    path: '/recherche',
    noindex: true,
  })
}

// Recherche : index des contenus construit ici, filtre exécuté dans le navigateur selon « ?s= ».
export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const t = await getTranslations('search')
  const entries: SearchEntry[] = [
    ...getServices().map((s) => ({
      type: 'service',
      title: s.data.title,
      text: s.data.excerpt,
      href: `/services/${s.slug}`,
    })),
    ...getPosts().map((x) => ({
      type: 'post',
      title: x.data.title,
      text: x.data.excerpt,
      href: `/blog/${x.slug}`,
    })),
    ...getProjects().map((x) => ({
      type: 'project',
      title: x.data.title,
      text: x.data.excerpt,
      href: `/realisations/${x.slug}`,
    })),
    ...getTeam().map((m) => ({
      type: 'member',
      title: m.data.name,
      text: m.data.role,
      href: `/equipe/${m.slug}`,
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
