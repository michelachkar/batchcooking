import { CalendarHeart, Check } from 'lucide-react'
import clsx from 'clsx'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { contentIcon } from '@/components/ui/icon-registry'
import styles from './practical-info.module.css'

// Informations pratiques : invités, matériel, attentes envers l'hôte.
export function PracticalInfo(p: {
  tone?: 'white' | 'beige'
  /** Nombre de colonnes (3 par défaut). */
  columns?: 2 | 3
  kicker: string
  title: string
  cols: { icon: string; title: string; items: string[] }[]
}) {
  return (
    <Section name="practical" tone={p.tone ?? 'beige'}>
      <SectionHeading kicker={p.kicker} title={p.title} />
      <div className={clsx(styles.practical, p.columns === 2 && styles.practicalTwo)}>
        {p.cols.map(({ icon, title, items }, i) => {
          const Icon = contentIcon(icon) ?? CalendarHeart
          return (
            <div key={title} data-reveal="up" data-d={i + 1} className={styles.column}>
              <span className={styles.columnBadge}>
                <Icon aria-hidden className={styles.glyph} strokeWidth={1.7} />
              </span>
              <h3 className={styles.columnTitle}>{title}</h3>
              <ul className={styles.items}>
                {items.map((it) => (
                  <li key={it} className={styles.item}>
                    <Check aria-hidden className={styles.check} strokeWidth={3} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
