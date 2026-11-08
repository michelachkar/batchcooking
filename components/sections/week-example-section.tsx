import { CtaButton } from '@/components/blocks/cta-button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import styles from './week-example-section.module.css'

type WeekExampleSectionProps = {
  kicker: string
  title: string
  intro: string
  days: { day: string; dish: string }[]
  note: string
  cta: { label: string; href: string }
  tone?: 'white' | 'beige'
}

// Exemple de semaine type.
export function WeekExampleSection({
  kicker,
  title,
  intro,
  days,
  note,
  cta,
  tone,
}: WeekExampleSectionProps) {
  return (
    <Section name="week" tone={tone}>
      <div className={styles.week}>
        <div data-reveal="left">
          <SectionHeading kicker={kicker} title={title} intro={intro} />
          <p className={styles.weekNote}>{note}</p>
          <CtaButton href={cta.href} label={cta.label} lead />
        </div>
        <ol className={styles.days}>
          {days.map(({ day, dish }, i) => (
            <li key={day} data-reveal="up" data-d={Math.min(i + 1, 6)} className={styles.day}>
              <span className={styles.dayName}>{day}</span>
              <span className={styles.dayDish}>{dish}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
