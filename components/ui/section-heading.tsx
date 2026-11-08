import clsx from 'clsx'
import styles from './section-heading.module.css'

type SectionHeadingProps = {
  kicker: string
  title: string
  intro?: string
  /** Texte clair, pour les fonds sombres. */
  light?: boolean
  /** Titre, accroche et sur-titre centrés. */
  center?: boolean
}

// En-tête de section : sur-titre, titre et accroche optionnelle.
export function SectionHeading({ kicker, title, intro, light, center }: SectionHeadingProps) {
  return (
    <header className={clsx(styles.heading, center && styles.headingCenter)} data-reveal="up">
      <p className={clsx(styles.kicker, light && styles.light)}>{kicker}</p>
      <h2 className={clsx(styles.headingTitle, light && styles.light)}>{title}</h2>
      {intro && <p className={clsx(styles.intro, light && styles.light)}>{intro}</p>}
    </header>
  )
}
