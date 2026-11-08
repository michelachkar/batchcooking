import { DualHeader } from '@/components/blocks/dual-header'
import { ProjectsCarousel, type Project } from '@/components/blocks/projects-carousel'
import styles from './events-showcase.module.css'

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  projects: Project[]
  carouselLabels: { prev: string; next: string; navigation: string }
}

// Recettes de l'accueil : titre et carrousel.
export function EventsShowcase({
  kicker,
  title,
  highlight,
  description,
  projects,
  carouselLabels,
}: Props) {
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
      <div className={styles.spacer} aria-hidden />
    </section>
  )
}
