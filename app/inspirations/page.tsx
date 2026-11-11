import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { PhotoWall, type WallPhoto } from '@/components/blocks/photo-wall'
import { ZonesCta } from '@/components/blocks/zones-cta'
import { getProjects } from '@/lib/content/projects'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({
    title: p('inspirations.title'),
    description: s('inspirations'),
    path: '/inspirations',
  })
}

// Galerie d'inspiration : uniquement des photos, filtrables par service, chacune renvoyant vers sa réalisation.
export default async function InspirationsPage() {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  const r = await getTranslations('realisationsPage')
  const i = await getTranslations('inspirationsPage')
  const services = r.raw('services') as Record<string, string>
  // Toutes les photos de toutes les réalisations (la photo de couverture si le projet n'a pas de galerie).
  const photos: WallPhoto[] = getProjects().flatMap((e) =>
    (e.data.gallery.length > 0 ? e.data.gallery : [e.data.image]).map((img) => ({
      ...img,
      title: e.data.title,
      href: `/realisations/${e.slug}`,
      service: e.data.service,
      serviceLabel: services[e.data.service],
      location: e.data.location,
      excerpt: e.data.excerpt,
      guests: e.data.guests,
      duration: e.data.duration,
    })),
  )
  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path="/inspirations"
        title={p('inspirations.title')}
        description={s('inspirations')}
        crumbs={[{ label: p('inspirations.crumb') }]}
      />
      <PageHead
        title={p('inspirations.heading')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('inspirations.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.inspirations}
        description={p('heads.inspirations')}
        shortDescription={p('headsShort.inspirations')}
      />
      <Section name="inspirations">
        <SectionHeading kicker={i('kicker')} title={i('title')} intro={i('intro')} />
        <PhotoWall
          photos={photos}
          services={Object.entries(services).map(([id, label]) => ({ id, label }))}
          labels={{
            all: r('all'),
            filter: r('filter'),
            empty: r('empty'),
            open: r('lightbox.open'),
            close: r('lightbox.close'),
            prev: r('lightbox.prev'),
            next: r('lightbox.next'),
            viewProject: r('lightbox.viewProject'),
            counter: r('lightbox.counter'),
            dialog: i('lightbox.dialog'),
          }}
        />
      </Section>
      <ZonesCta
        kicker={i('cta.kicker')}
        title={i('cta.title')}
        text={i('cta.text')}
        button={i('cta.button')}
      />
    </main>
  )
}
