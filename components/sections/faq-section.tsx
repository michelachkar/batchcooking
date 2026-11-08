import { FaqAccordion } from '@/components/ui/faq-accordion'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import styles from './faq-section.module.css'

type FaqSectionProps = {
  /** Identifiant de l'accordéon (un par section pour que leurs ouvertures soient indépendantes). */
  name?: string
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  items: { question: string; answer: string }[]
}

// Questions fréquentes (accordéon natif).
export function FaqSection({
  name = 'faq',
  tone = 'white',
  kicker,
  title,
  items,
}: FaqSectionProps) {
  return (
    <Section name={name} tone={tone}>
      <SectionHeading kicker={kicker} title={title} />
      <div className={styles.faq} data-reveal="up">
        <FaqAccordion items={items} name={name} />
      </div>
    </Section>
  )
}
