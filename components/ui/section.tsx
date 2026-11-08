import clsx from 'clsx'
import { RevealObserver } from '@/components/ui/reveal-observer'
import styles from './section.module.css'

type SectionProps = {
  /** Identifiant de la section (attribut `data-section`). */
  name: string
  tone?: 'white' | 'beige' | 'terracotta'
  children: React.ReactNode
}

// Bande de page pleine largeur : fond selon `tone`, contenu centré à la largeur du site.
export function Section({ name, tone = 'white', children }: SectionProps) {
  const bg =
    tone === 'beige' ? styles.beige : tone === 'terracotta' ? styles.terracotta : styles.white
  return (
    <section data-section={name} className={clsx(bg, styles.shell)}>
      <RevealObserver />
      <div className={styles.shellInner}>{children}</div>
    </section>
  )
}
