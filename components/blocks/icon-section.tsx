import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { contentIcon } from '@/components/ui/icon-registry'
import styles from './icon-section.module.css'

type IconCard = { icon: string; title: string; text: string }

function IconCards({ items }: { items: IconCard[] }) {
  return (
    <ul className={styles.iconCards}>
      {items.map(({ icon, title, text }, i) => {
        const Icon = contentIcon(icon) ?? Check
        return (
          <li key={title} data-reveal="up" data-d={i + 1} className={styles.iconCard}>
            <span className={styles.iconBadge}>
              <Icon aria-hidden className={styles.iconGlyph} strokeWidth={1.7} />
            </span>
            <h3 className={styles.iconCardTitle}>{title}</h3>
            <p className={styles.iconCardText}>{text}</p>
          </li>
        )
      })}
    </ul>
  )
}

// 5-7. Section de trois cartes à pictogramme (régimes, conservation, fréquence).
export function IconSection(p: {
  name: string
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  intro?: string
  items: IconCard[]
  note?: string
}) {
  return (
    <Section name={p.name} tone={p.tone}>
      <SectionHeading kicker={p.kicker} title={p.title} intro={p.intro} />
      <IconCards items={p.items} />
      {p.note && (
        <p className={styles.note} data-reveal="up">
          {p.note}
        </p>
      )}
    </Section>
  )
}
