import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import styles from './audience-section.module.css'

type AudienceSectionProps = {
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  items: { title: string; text: string }[]
}

// « Pour qui » : grille de cartes.
export function AudienceSection({ tone = 'beige', kicker, title, items }: AudienceSectionProps) {
  return (
    <Section name="audience" tone={tone}>
      <SectionHeading kicker={kicker} title={title} />
      <ul className={styles.audienceList}>
        {items.map(({ title, text }, i) => (
          <li key={title} data-reveal="up" data-d={(i % 3) + 1} className={styles.audienceCard}>
            <h3 className={styles.audienceTitle}>{title}</h3>
            <p className={styles.audienceText}>{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
