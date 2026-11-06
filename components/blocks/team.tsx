import Image from 'next/image'
import Link from 'next/link'
import { DualHeader } from '@/components/blocks/dual-header'
import clsx from 'clsx'
import styles from './team.module.css'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type TeamMember = {
  name: string
  role: string
  /** Portrait détouré (PNG/WebP transparent) : il dépasse de la forme sombre. */
  image: Img
  alt: string
  href: string
  social?: { label: string; href: string; type: 'linkedin' | 'mail' }[]
}

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  /** Mot décoratif, très pâle, écrit à la verticale dans la forme sombre. */
  vertical: string
  members: TeamMember[]
  profileLabel: (name: string) => string
  /** Hauteur de l'espace au-dessus du titre (85 px par défaut, 95 px sur la page équipe). */
  spacer?: number
  /** Hauteur de l'espace sous la grille (15 px par défaut, aucun sur la page équipe). */
  tail?: number
  /** Marge haute de la grille en tablette (60 px par défaut, 50 px sur la page À propos). */
  tabletTop?: number
  /** false : pas de titre, la grille remonte sur l'espace du haut (page équipe). */
  header?: boolean
}

// Cartes d'équipe : forme sombre, portrait détouré qui dépasse, nom et fonction ; réseaux au survol (widget « savrio-our-team »).
// La grille remonte de 83 px sous le titre pour que les têtes chevauchent le texte d'introduction.
export function Team({
  kicker,
  title,
  highlight,
  description,
  vertical,
  members,
  profileLabel,
  spacer = 85,
  tail = 15,
  tabletTop = 60,
  header = true,
}: Props) {
  return (
    <section data-section="team" className={styles.root}>
      <div className={styles.inner}>
        <div
          style={{ '--spacer': `${spacer}px` } as React.CSSProperties}
          className={clsx(styles.spacer, !header && styles.spacerBare)}
          aria-hidden
        />
        {header && (
          <DualHeader
            size="compact"
            kicker={kicker}
            title={title}
            highlight={highlight}
            description={description}
            className={styles.header}
          />
        )}
        <div
          style={{ '--tt': `${tabletTop}px` } as React.CSSProperties}
          className={header ? styles.gridWrap : styles.gridWrapBare}
        >
          <TeamGrid
            members={members}
            vertical={vertical}
            profileLabel={profileLabel}
            className={styles.overlap}
          />
        </div>
        {tail > 0 && <div style={{ height: tail }} aria-hidden />}
      </div>
    </section>
  )
}

// Grille de cartes membres (partagée avec « Autres membres » des fiches).
export function TeamGrid({
  members,
  vertical,
  profileLabel,
  className,
  tall,
  animate,
}: {
  members: TeamMember[]
  vertical: string
  profileLabel: (name: string) => string
  className?: string
  /** Cartes de 620 px au lieu de 605 px (bloc « autres membres »). */
  tall?: boolean
  /** Révélation en cascade au défilement (script des pages CPT) : « autres membres » des fiches. */
  animate?: boolean
}) {
  return (
    <ul data-cm-grid={animate ? '' : undefined} className={clsx(styles.grid, className)}>
      {members.map((m) => (
        <li key={m.name} className={styles.item}>
          <article
            data-cm-item={animate ? '' : undefined}
            className={clsx(styles.card, tall && styles.tall)}
          >
            <Link href={m.href} aria-label={profileLabel(m.name)} className={styles.link} />
            <div aria-hidden className={styles.shape}>
              <span className={styles.vertical}>{vertical}</span>
            </div>
            <Image
              src={m.image.src}
              alt={m.alt}
              width={m.image.width}
              height={m.image.height}
              unoptimized={m.image.unoptimized}
              sizes="(min-width: 1024px) 285px, 320px"
              className={styles.portrait}
            />
            <div className={styles.caption}>
              <h3 className={styles.name}>{m.name}</h3>
              <p className={styles.role}>{m.role}</p>
            </div>
            {m.social && m.social.length > 0 && (
              <div className={styles.socials}>
                {m.social.map((s) => (
                  <a key={s.type} href={s.href} aria-label={s.label} className={styles.social}>
                    <SocialIcon type={s.type} />
                  </a>
                ))}
              </div>
            )}
          </article>
        </li>
      ))}
    </ul>
  )
}

function SocialIcon({ type }: { type: 'linkedin' | 'mail' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={styles.socialIcon}>
      {type === 'linkedin' ? (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.222 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      ) : (
        <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.6 7H4v.4l8 5.6 8-5.6V7h-.6L12 12.2z" />
      )}
    </svg>
  )
}
