import clsx from 'clsx'
import styles from './reviews.module.css'
import { DualHeader } from '@/components/layout/dual-header'
import { ReviewsSlider, type Review } from '@/components/blocks/reviews-slider'
import { StackedPhotos } from '@/components/blocks/stacked-photos'

export type { Review }
type Img = { src: string; width: number; height: number; unoptimized?: boolean }

type ReviewsProps = {
  kicker: string
  title: string
  highlight: string
  description: string
  reviews: Review[]
  labels: { prev: string; next: string; navigation: string }
  faces?: Img[]
  proof?: { long: React.ReactNode; short: React.ReactNode }
  /** Encart arrondi dans la page (pages tarifs et FAQ) au lieu du bandeau pleine largeur de l'accueil. */
  inset?: boolean
  /** Avis actif au chargement. */
  initial?: number
  /** Encart serré en mobile (10 px de marge et de remplissage au lieu de 15 px et 0), comme sur la FAQ. */
  tight?: boolean
}

// Avis clients : bandeau gris avec titre, curseur d'avis et ligne de preuve (visages + appel).
export function Reviews({
  kicker,
  title,
  highlight,
  description,
  reviews,
  labels,
  faces,
  proof,
  inset = false,
  initial,
  tight = false,
}: ReviewsProps) {
  return (
    <section
      data-section="reviews"
      className={inset ? clsx(styles.inset, tight && styles.tight) : styles.band}
    >
      <div className={inset ? clsx(styles.insetFrame, tight && styles.tight) : styles.bandFrame}>
        <div className={styles.spacer} aria-hidden />
        <DualHeader
          size="compact"
          kicker={kicker}
          title={title}
          highlight={highlight}
          description={description}
        />
        <ReviewsSlider reviews={reviews} labels={labels} initial={initial} />
        {proof && (
          <div className={styles.proof}>
            {faces?.length ? <StackedPhotos photos={faces} /> : null}
            <p className={clsx(styles.proofText, styles.proofLong)}>{proof.long}</p>
            <p className={clsx(styles.proofText, styles.proofShort)}>{proof.short}</p>
          </div>
        )}
        <div className={styles.spacer} aria-hidden />
      </div>
    </section>
  )
}
