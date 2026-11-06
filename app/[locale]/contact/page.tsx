import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { ZonesMap } from '@/components/blocks/zones-page'
import type { ZoneId } from '@/lib/zones'
import { ContactSection } from '@/components/sections/contact-section'
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
    title: p('contact.title'),
    description: s('contact'),
    path: '/contact',
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const z = await getTranslations('zonesPage')
  const c = await getTranslations('contact.zone')
  return (
    <main id="contenu">
      <PageJsonLd
        path="/contact"
        title={p('contact.title')}
        description={(await getTranslations('seo'))('contact')}
        crumbs={[{ label: p('contact.crumb') }]}
      />
      <PageHead
        title={p('contact.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('contact.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.contact}
      />
      <ContactSection />
      <ZonesMap
        heading={{ kicker: c('kicker'), title: c('title'), intro: c('intro') }}
        link={{ label: c('button'), href: '/zones' }}
        text={{
          label: z('map.label'),
          legend: z.raw('map.legend') as Record<ZoneId, string>,
          sea: z('map.sea'),
          note: z('map.note'),
        }}
      />
    </main>
  )
}
