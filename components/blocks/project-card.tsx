import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Users } from 'lucide-react'
import styles from './project-card.module.css'

export type ProjectCardData = {
  title: string
  href: string
  excerpt: string
  serviceLabel: string
  location?: string
  guests?: string
  duration?: string
  image: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
}

// Fiche de réalisation mise en avant : photo, service, titre, accroche, infos clés et lien. Toute la carte est cliquable.
// `compact` : version réduite (vignette, titre, service et lieu) pour les index.
export function ProjectCard({
  project: p,
  cta,
  compact = false,
  as: Heading = 'h3',
  hidden = false,
}: {
  project: ProjectCardData
  cta: string
  compact?: boolean
  as?: 'h2' | 'h3' | 'h4'
  /** Garde la carte dans le HTML sans l'afficher (liste paginée). */
  hidden?: boolean
}) {
  return (
    <li className={compact ? styles.compact : styles.card} hidden={hidden}>
      <div className={styles.media}>
        <Image
          src={p.image.src}
          alt={p.image.alt}
          fill
          unoptimized={p.image.unoptimized}
          sizes={compact ? '(min-width: 768px) 12rem, 30vw' : '(min-width: 1025px) 33vw, 100vw'}
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <span className={styles.service}>{p.serviceLabel}</span>
        <Heading className={styles.title}>
          <Link href={p.href} className={styles.link}>
            {p.title}
          </Link>
        </Heading>
        {!compact && <p className={styles.excerpt}>{p.excerpt}</p>}
        {compact ? (
          p.location && <span className={styles.meta}>{p.location}</span>
        ) : (
          <ul className={styles.facts}>
            {p.location && (
              <li>
                <MapPin aria-hidden /> {p.location}
              </li>
            )}
            {p.guests && (
              <li>
                <Users aria-hidden /> {p.guests}
              </li>
            )}
            {p.duration && (
              <li>
                <Clock aria-hidden /> {p.duration}
              </li>
            )}
          </ul>
        )}
        {!compact && (
          <span className={styles.cta} aria-hidden>
            {cta}
            <ArrowRight />
          </span>
        )}
      </div>
    </li>
  )
}
