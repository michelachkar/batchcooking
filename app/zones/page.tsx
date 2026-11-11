import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { CityHubs } from '@/components/blocks/city-hubs'
import { ZoneCallout } from '@/components/blocks/zone-callout'
import { ZoneServices } from '@/components/blocks/zone-services'
import { ZonesCta } from '@/components/blocks/zones-cta'
import { ZonesMap } from '@/components/blocks/zones-map'
import { FaqSection } from '@/components/sections/faq-section'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage } from '@/lib/jsonld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'
import type { ZoneId } from '@/lib/zones'

export async function generateMetadata(): Promise<Metadata> {
  const z = await getTranslations('zonesPage.seo')
  return pageMetadata({ title: z('title'), description: z('description'), path: '/zones' })
}

// Page « Zones d'intervention » : carte, villes principales, services/délais/déplacements par zone.
export default async function ZonesPage() {
  const p = await getTranslations('pages')
  const z = await getTranslations('zonesPage')
  const faqItems = z.raw('faq.items') as { question: string; answer: string }[]
  const zoneLabels = z.raw('zoneLabels') as Record<ZoneId, string>
  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path="/zones"
        title={z('seo.title')}
        description={z('seo.description')}
        crumbs={[{ label: p('zones.crumb') }]}
        extra={[faqPage(faqItems)]}
      />
      <PageHead
        title={p('zones.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('zones.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.services}
        description={p('heads.zones')}
        shortDescription={p('headsShort.zones')}
      />
      <ZonesMap
        text={{
          label: z('map.label'),
          legend: z.raw('map.legend') as Record<ZoneId, string>,
          sea: z('map.sea'),
          note: z('map.note'),
        }}
      />
      <ZoneCallout
        title={z('callout.title')}
        text={z('callout.text')}
        cta={{ label: z('callout.link'), href: '/contact#devis' }}
      />
      <CityHubs
        kicker={z('cities.kicker')}
        title={z('cities.title')}
        intro={z('cities.intro')}
        zoneLabels={zoneLabels}
        hubs={z.raw('cities.hubs') as Parameters<typeof CityHubs>[0]['hubs']}
      />
      <ZoneServices
        kicker={z('services.kicker')}
        title={z('services.title')}
        intro={z('services.intro')}
        travelLabel={z('services.travelLabel')}
        delayLabel={z('services.delayLabel')}
        zones={z.raw('services.zones') as Parameters<typeof ZoneServices>[0]['zones']}
      />
      <FaqSection
        name="zones-faq"
        tone="beige"
        kicker={z('faq.kicker')}
        title={z('faq.title')}
        items={faqItems}
      />
      <ZonesCta
        kicker={z('cta.kicker')}
        title={z('cta.title')}
        text={z('cta.text')}
        button={z('cta.button')}
        tone="white"
      />
    </main>
  )
}
