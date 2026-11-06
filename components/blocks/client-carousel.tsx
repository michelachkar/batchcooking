import Image from 'next/image'
import clsx from 'clsx'
import styles from './client-carousel.module.css'

export type Logo = {
  src: string
  width: number
  height: number
  unoptimized?: boolean
  alt: string
}

type Props = {
  logos: Logo[]
  /** Hauteur d'affichage des logos, en px. */
  height?: number
  grayscale?: boolean
  className?: string
}

// Bandeau de logos partenaires en défilement continu (CSS seul, en pause au survol). À n'afficher qu'avec de vrais partenaires.
// Chaque moitié de la piste répète la liste jusqu'à dépasser la largeur d'écran ; la piste glisse de 50 % en boucle.
export function ClientCarousel({ logos, height = 54, grayscale = false, className }: Props) {
  if (logos.length === 0) return null
  const reps = Math.max(1, Math.ceil(1920 / (logos.length * 256)))
  // Savrio : 30 s pour parcourir un jeu de logos ; la piste en répète `reps`, d'où la durée proportionnelle.
  const half = Array.from({ length: reps }, () => logos).flat()
  return (
    <div className={clsx(styles.root, className)}>
      <div style={{ animationDuration: `${30 * reps}s` }} className={styles.track}>
        {[0, 1].flatMap((copy) =>
          half.map((l, i) => (
            <div
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 || i >= logos.length || undefined}
              className={clsx(styles.item, copy === 1 && styles.copy)}
            >
              <Image
                src={l.src}
                alt={copy === 1 || i >= logos.length ? '' : l.alt}
                width={l.width}
                height={l.height}
                unoptimized={l.unoptimized}
                style={{ height }}
                className={clsx(styles.logo, grayscale && styles.grayscale)}
              />
            </div>
          )),
        )}
      </div>
    </div>
  )
}
