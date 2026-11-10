import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { ZonesMap } from '@/components/blocks/zones-map'
import type { ZoneId } from '@/lib/zones'
import { FaqSection } from '@/components/sections/faq-section'
import { ContactSection } from '@/components/sections/contact-section'
import { media } from '@/lib/media'
import { faqPage } from '@/lib/jsonld'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({
    title: p('contact.title'),
    description: s('contact'),
    path: '/contact',
  })
}

export default async function ContactPage() {
  const p = await getTranslations('pages')
  const z = await getTranslations('zonesPage')
  const c = await getTranslations('contact.zone')
  const f = await getTranslations('contact.faq')
  const faqItems = f.raw('items') as { question: string; answer: string }[]
  return (
    <main id="contenu">
      <PageJsonLd
        path="/contact"
        title={p('contact.title')}
        description={(await getTranslations('seo'))('contact')}
        crumbs={[{ label: p('contact.crumb') }]}
        extra={[faqPage(faqItems)]}
      />
      <PageHead
        title={p('contact.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('contact.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.contact}
        description={p('heads.contact')}
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
      <FaqSection
        name="contact-faq"
        tone="white"
        kicker={f('kicker')}
        title={f('title')}
        items={faqItems}
      />
    </main>
  )
}
