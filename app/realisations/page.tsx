import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { PhotoWall, type WallPhoto } from '@/components/blocks/photo-wall'
import { ProjectCard, type ProjectCardData } from '@/components/blocks/project-card'
import { ZonesCta } from '@/components/blocks/zones-cta'
import { getProjects } from '@/lib/content/projects'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'
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

// Galerie des réalisations, filtrable par service (batch cooking, dîner privé, cours de cuisine).
export default async function PortfolioPage() {
  const p = await getTranslations('pages')
  const r = await getTranslations('realisationsPage')
  const services = r.raw('services') as Record<string, string>
  // Toutes les photos de toutes les réalisations (la photo de couverture si le projet n'a pas de galerie).
  const projects = getProjects()
  const photos: WallPhoto[] = projects.flatMap((e) =>
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
  const cards = new Map<string, ProjectCardData>(
    projects.map((e) => {
      const img = e.data.thumbnail ?? e.data.image
      return [
        e.slug,
        {
          title: e.data.title,
          href: `/realisations/${e.slug}`,
          excerpt: e.data.excerpt,
          serviceLabel: services[e.data.service],
          location: e.data.location,
          guests: e.data.guests,
          duration: e.data.duration,
          image: img,
        },
      ]
    }),
  )
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
        description={p('heads.portfolio')}
      />
      <Section name="realisations">
        <SectionHeading kicker={r('kicker')} title={r('title')} intro={r('intro')} />
        <nav aria-label={r('index.title')} className={styles.index}>
          {Object.entries(services).map(([id, label]) => (
            <div key={id}>
              <h3 className={styles.indexTitle}>{label}</h3>
              <ul className={styles.indexList}>
                {projects
                  .filter((e) => e.data.service === id)
                  .map((e) => (
                    <ProjectCard
                      key={e.slug}
                      project={cards.get(e.slug)!}
                      cta={r('lightbox.viewProject')}
                      compact
                      as="h4"
                    />
                  ))}
              </ul>
            </div>
          ))}
        </nav>
        <h3 className={styles.wallTitle}>{r('featured.wall')}</h3>
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
            dialog: r('lightbox.dialog'),
          }}
        />
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
