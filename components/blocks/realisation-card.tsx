import Image from 'next/image'
import Link from 'next/link'
import styles from './realisation-card.module.css'

export type RealisationCardData = {
  title: string
  href: string
  excerpt: string
  service: string
  serviceLabel: string
  location?: string
  duration?: string
  guests?: string
  /** Filtres. */
  occasion?: string
  city?: string
  group?: 'small' | 'medium' | 'large'
  diets?: string[]
  /** Tags libres du projet. */
  tags?: string[]
  image: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
}

// Vignette photo d'une réalisation : image pleine, 3 tags maximum (service en premier) et titre en surimpression (lien vers la fiche si `linked`).
export function RealisationCard({
  r,
  tags = r.tags ?? [],
  linked = false,
  hidden = false,
}: {
  r: RealisationCardData
  tags?: string[]
  /** Rend toute la carte cliquable vers la fiche (lien étiré sur le titre). */
  linked?: boolean
  /** Garde la fiche dans le HTML sans l'afficher (liste paginée). */
  hidden?: boolean
}) {
  return (
    <li className={styles.card} hidden={hidden}>
      <Image
        src={r.image.src}
        alt={r.image.alt}
        width={r.image.width}
        height={r.image.height}
        unoptimized={r.image.unoptimized}
        sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw"
        className={styles.image}
      />
      <div aria-hidden className={styles.shade} />
      <div className={styles.caption}>
        <ul className={styles.tags}>
          {[r.serviceLabel, ...tags].slice(0, 3).map((t) => (
            <li key={t} className={styles.tag}>
              {t}
            </li>
          ))}
        </ul>
        <h3 className={styles.title}>
          {linked ? (
            <Link href={r.href} className={styles.link}>
              {r.title}
            </Link>
          ) : (
            r.title
          )}
        </h3>
      </div>
    </li>
  )
}
