import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { Compare } from '@/components/blocks/services-page'
import { ExperiencesSection } from '@/components/sections/experiences-section'
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
    title: p('services.title'),
    description: s('services'),
    path: '/services',
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
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
      <Compare
        kicker={v('compare.kicker')}
        title={v('compare.title')}
        columns={v.raw('compare.columns') as string[]}
        rows={v.raw('compare.rows') as { label: string; values: string[] }[]}
        note={v('compare.note')}
      />
    </main>
  )
}
