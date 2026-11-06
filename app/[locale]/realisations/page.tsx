import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { Heading, Shell } from '@/components/blocks/home-v2'
import { RealisationsGallery } from '@/components/blocks/realisations-gallery'
import { ZonesCta } from '@/components/blocks/zones-page'
import { toRealisationCard } from '@/lib/content/project-card'
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

// Galerie des réalisations, filtrable par service (batch cooking, dîner privé, cours de cuisine).
export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const r = await getTranslations('realisationsPage')
  const services = r.raw('services') as Record<string, string>
  const items = getProjects().map((e) => toRealisationCard(e, services))
  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
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
      />
      <Shell name="realisations">
        <Heading kicker={r('kicker')} title={r('title')} intro={r('intro')} />
        <RealisationsGallery
          items={items}
          services={Object.entries(services).map(([id, label]) => ({ id, label }))}
          labels={{
            all: r('all'),
            filter: r('filter'),
            empty: r('empty'),
            count: r.raw('count') as string,
            reset: r('reset'),
            tags: r('filters.tags'),
            groups: r.raw('filters.groups') as Record<'small' | 'medium' | 'large', string>,
          }}
        />
      </Shell>
      <ZonesCta
        kicker={r('cta.kicker')}
        title={r('cta.title')}
        text={r('cta.text')}
        button={r('cta.button')}
      />
    </main>
  )
}
