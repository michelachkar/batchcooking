import { Check } from 'lucide-react'
import clsx from 'clsx'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { contentIcon } from '@/components/ui/icon-registry'
import styles from './formula-cards.module.css'

type IconCard = { icon: string; title: string; text: string; tag?: string }

// Formules (menu sur mesure, dégustation, buffet, cocktail) et accords mets-vins : cartes à pictogramme.
export function FormulaCards(p: {
  name: string
  tone?: 'white' | 'beige' | 'terracotta'
  kicker: string
  title: string
  intro?: string
  items: IconCard[]
  columns?: 2 | 3 | 4
  /** Contenu sous les cartes (bouton, remarque…). */
  footer?: React.ReactNode
}) {
  return (
    <Section name={p.name} tone={p.tone}>
      <SectionHeading
        kicker={p.kicker}
        title={p.title}
        intro={p.intro}
        light={p.tone === 'terracotta'}
      />
      <ul className={clsx(styles.cards, p.columns === 3 ? styles.cols3 : styles.cols4)}>
        {p.items.map(({ icon, title, text, tag }, i) => {
          const Icon = contentIcon(icon) ?? Check
          return (
            <li key={title} data-reveal="up" data-d={Math.min(i + 1, 6)} className={styles.card}>
              {tag && <span className={styles.tag}>{tag}</span>}
              <span className={styles.badge}>
                <Icon aria-hidden className={styles.glyph} strokeWidth={1.7} />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
            </li>
          )
        })}
      </ul>
      {p.footer && (
        <div className={styles.footer} data-reveal="up">
          {p.footer}
        </div>
      )}
    </Section>
  )
}
