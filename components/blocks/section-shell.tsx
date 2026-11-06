import clsx from 'clsx'
import styles from './section-shell.module.css'

type Props = {
  name: string
  /** Fond et arrondi du bloc, pleine largeur avec 40/26/16 px de marge de chaque côté. */
  className?: string
  children: React.ReactNode
}

// Enveloppe commune des sections « bloc coloré » : fine bande de fond de page au-dessus, puis le bloc (padding vertical 100/72/56 px, contenu 1320 px).
export function SectionShell({ name, className, children }: Props) {
  return (
    <section data-section={name} className={styles.root}>
      <div className={clsx(styles.block, className)}>
        <div className={styles.inner}>{children}</div>
      </div>
    </section>
  )
}
