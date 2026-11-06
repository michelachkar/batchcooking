import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { CityHubs, ZoneServices, ZonesMap } from '@/components/blocks/zones-page'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'
import type { ZoneId } from '@/lib/zones'

export async function generateMetadata(): Promise<Metadata> {
  const z = await getTranslations('zonesPage.seo')
  return pageMetadata({ title: z('title'), description: z('description'), path: '/zones' })
}

// Page « Zones d'intervention » : carte, villes principales, services/délais/déplacements par zone.
export default async function ZonesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const z = await getTranslations('zonesPage')
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
      />
      <PageHead
        title={p('zones.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('zones.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.services}
      />
      <ZonesMap
        text={{
          label: z('map.label'),
          legend: z.raw('map.legend') as Record<ZoneId, string>,
          sea: z('map.sea'),
          note: z('map.note'),
        }}
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
    </main>
  )
}
