import Link from 'next/link'
import clsx from 'clsx'
import { DualHeader } from '@/components/blocks/dual-header'
import { ProjectsCarousel, type Project } from '@/components/blocks/projects-carousel'
import { ArrowIcon } from '@/components/ui/icon'
import { StackedPhotos } from '@/components/blocks/stacked-photos'
import styles from './events-showcase.module.css'

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  projects: Project[]
  /** Bouton sous le carrousel (facultatif). */
  cta?: { label: string; href: string }
  carouselLabels: { prev: string; next: string; navigation: string }
  faces?: { src: string; width: number; height: number; unoptimized?: boolean }[]
  proof: { long: React.ReactNode; short: React.ReactNode }
  /** Espace au-dessus du titre (70 px sur l'accueil, 50 px sur la FAQ). */
  topSpacer?: number
  /** Marge sous la ligne de preuve (68 px sur l'accueil, 90 px sur la FAQ). */
  bottomGap?: number
  /** Titres des cartes à 24 px en mobile (FAQ). */
  smallTitleMobile?: boolean
}

// Réalisations récentes : titre, carrousel et ligne de preuve (visages + appel). Deux phrases, selon la largeur.
export function EventsShowcase({
  kicker,
  title,
  highlight,
  description,
  projects,
  carouselLabels,
  cta,
  faces,
  proof,
  topSpacer = 70,
  bottomGap = 68,
  smallTitleMobile,
}: Props) {
  return (
    <section data-section="events" className={styles.root}>
      <div style={{ height: topSpacer }} aria-hidden />
      <DualHeader
        kicker={kicker}
        title={title}
        highlight={highlight}
        description={description}
        className={styles.header}
      />
      <ProjectsCarousel
        projects={projects}
        labels={carouselLabels}
        smallTitleMobile={smallTitleMobile}
      />
      {cta && (
        <div className={styles.cta}>
          <Link href={cta.href} className={styles.button}>
            {cta.label}
            <ArrowIcon />
          </Link>
        </div>
      )}
      <div style={{ marginBottom: bottomGap }} className={styles.proof}>
        {faces?.length ? <StackedPhotos photos={faces} /> : null}
        <p className={clsx(styles.proofText, styles.proofLong)}>{proof.long}</p>
        <p className={clsx(styles.proofText, styles.proofShort)}>{proof.short}</p>
      </div>
    </section>
  )
}
