import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { PortfolioArchive } from '@/components/blocks/portfolio-archive'
import { toProjectCard } from '@/lib/content/project-card'
import { getProjects } from '@/lib/content/projects'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
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
    title: p('portfolio.title'),
    description: s('portfolio'),
    path: '/realisations',
  })
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const items = getProjects().map(toProjectCard)
  return (
    <main id="contenu">
      <PageJsonLd
        path="/realisations"
        title={p('portfolio.title')}
        description={(await getTranslations('seo'))('portfolio')}
        crumbs={[{ label: p('portfolio.crumb') }]}
      />
      <PageHead
        title={p('portfolio.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('portfolio.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.portfolio}
        inset
      />
      <div data-section="body">{items.length > 0 && <PortfolioArchive items={items} />}</div>
    </main>
  )
}
