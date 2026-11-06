import { DhObserve } from '@/components/blocks/dh-observe'
import clsx from 'clsx'
import styles from './dual-header.module.css'

type Props = {
  /** Étiquette au-dessus du titre. */
  kicker: string
  /** Début du titre ; le mot mis en avant est affiché en gras à la suite. */
  title: string
  highlight: string
  description?: string
  /** Variante à étiquette 14 px et texte 16 px (section « occasions »). */
  size?: 'default' | 'compact'
  /** Alignement du bloc (centré par défaut ; à gauche sur la page contact). */
  align?: 'center' | 'left'
  /** Entrée : rideau « ltr » (défaut du widget) ou « up » (fade-up 150 ms, réglage de « derniers articles »). */
  animation?: 'ltr' | 'up'
  className?: string
}

// Titre de section « mot normal + mot mis en avant » avec pastille d'étiquette (widget « dual-header »).
export function DualHeader({
  kicker,
  title,
  highlight,
  description,
  size = 'default',
  align = 'center',
  animation = 'ltr',
  className,
}: Props) {
  const compact = size === 'compact'
  return (
    <div
      data-dh={animation}
      className={clsx(styles.root, align === 'left' && styles.alignLeft, className)}
    >
      <DhObserve />
      <p data-dh-t="kicker" className={clsx(styles.kicker, compact && styles.compact)}>
        {kicker}
      </p>
      <h2 data-dh-t="title" className={styles.title}>
        {title} <span className={styles.highlight}>{highlight}</span>
      </h2>
      {description && (
        <p
          className={clsx(
            styles.description,
            compact && styles.compact,
            align === 'center' && styles.centered,
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
