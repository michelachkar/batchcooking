import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { ServicesCompare } from '@/components/blocks/services-compare'
import { ExperiencesSection } from '@/components/sections/experiences-section'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({
    title: p('services.title'),
    description: s('services'),
    path: '/services',
  })
}

export default async function ServicesPage() {
  const p = await getTranslations('pages')
  const v = await getTranslations('servicesPage')
  return (
    <main id="contenu">
      <PageJsonLd
        path="/services"
        title={p('services.title')}
        description={(await getTranslations('seo'))('services')}
        crumbs={[{ label: p('services.crumb') }]}
      />
      <PageHead
        title={p('services.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('services.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.services}
      />
      <ExperiencesSection />
      <ServicesCompare
        kicker={v('compare.kicker')}
        title={v('compare.title')}
        columns={v.raw('compare.columns') as string[]}
        rows={v.raw('compare.rows') as { label: string; values: string[] }[]}
        note={v('compare.note')}
      />
    </main>
  )
}
