import { DualHeader } from '@/components/layout/dual-header'
import { ProjectsCarousel, type Project } from '@/components/blocks/projects-carousel'
import { CtaButton } from '@/components/blocks/cta-button'
import styles from './events-showcase.module.css'

type EventsShowcaseProps = {
  kicker: string
  title: string
  highlight: string
  description: string
  projects: Project[]
  carouselLabels: { prev: string; next: string; navigation: string }
  /** Bouton vers toutes les recettes, sous le carrousel. */
  cta?: { label: string; href: string }
}

// Recettes de l'accueil : titre et carrousel.
export function EventsShowcase({
  kicker,
  title,
  highlight,
  description,
  projects,
  carouselLabels,
  cta,
}: EventsShowcaseProps) {
  return (
    <section data-section="events" className={styles.root}>
      <div className={styles.spacer} aria-hidden />
      <DualHeader
        kicker={kicker}
        title={title}
        highlight={highlight}
        description={description}
        className={styles.header}
      />
      <ProjectsCarousel projects={projects} labels={carouselLabels} />
      {cta && (
        <div className={styles.cta}>
          <CtaButton href={cta.href} label={cta.label} />
        </div>
      )}
      <div className={styles.spacer} aria-hidden />
    </section>
  )
}
