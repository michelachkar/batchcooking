import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import Link from 'next/link'
import { RealisationsGallery } from '@/components/blocks/realisations-gallery'
import { toRealisationCard } from '@/lib/content/project-card'
import { ZonesCta } from '@/components/blocks/zones-cta'
import { getProjects } from '@/lib/content/projects'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import styles from './page.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({
    title: p('portfolio.title'),
    description: s('portfolio'),
    path: '/realisations',
  })
}

// Les réalisations : index par service en cartes verticales (photo, puis zone blanche avec le texte), des plus récentes aux plus anciennes. Un service sans projet
// disparaît ; JSON-LD et sitemap suivent `content/projects/` (voir documentation/ajouter-une-realisation.md).
export default async function PortfolioPage() {
  const p = await getTranslations('pages')
  const r = await getTranslations('realisationsPage')
  const services = r.raw('services') as Record<string, string>
  const projects = getProjects().sort((a, b) => +b.data.date - +a.data.date)
  const items = projects.map((e) => toRealisationCard(e, services))
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
        type="CollectionPage"
        extra={[
          {
            '@type': 'ItemList',
            numberOfItems: projects.length,
            itemListElement: projects.map((e, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(`/realisations/${e.slug}`),
              name: e.data.title,
            })),
          },
        ]}
      />
      <PageHead
        title={p('portfolio.heading')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('portfolio.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.portfolio}
        description={p('heads.portfolio')}
        shortDescription={p('headsShort.portfolio')}
      />
      <Section name="realisations">
        <SectionHeading kicker={r('kicker')} title={r('title')} intro={r('intro')} />
        <RealisationsGallery
          items={items}
          services={Object.entries(services).map(([id, label]) => ({ id, label }))}
          labels={{
            all: r('all'),
            filter: r('filter'),
            empty: r('empty'),
            count: r('count'),
            reset: r('reset'),
            tags: r('filters.tags'),
            viewProject: r('lightbox.viewProject'),
            more: r('more'),
            progress: r('progress'),
            groups: r.raw('filters.groups') as Record<'small' | 'medium' | 'large', string>,
          }}
        />
        <p className={styles.inspiration}>
          {r('inspirationLead')}{' '}
          <Link href="/inspirations" className={styles.inspirationLink}>
            {r('inspirationLink')}
          </Link>
        </p>
      </Section>
      <ZonesCta
        kicker={r('cta.kicker')}
        title={r('cta.title')}
        text={r('cta.text')}
        button={r('cta.button')}
      />
    </main>
  )
}
