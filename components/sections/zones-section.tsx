import { MapPin } from 'lucide-react'
import { CtaButton } from '@/components/blocks/cta-button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import styles from './zones-section.module.css'

type ZonesSectionProps = {
  kicker: string
  title: string
  intro: string
  areas: { name: string; text: string }[]
  note: string
  link?: { label: string; href: string }
  tone?: 'white' | 'beige'
}

// Zones couvertes.
export function ZonesSection({ kicker, title, intro, areas, note, link, tone }: ZonesSectionProps) {
  return (
    <Section name="zones" tone={tone}>
      <SectionHeading kicker={kicker} title={title} intro={intro} />
      <ul className={styles.zones}>
        {areas.map(({ name, text }, i) => (
          <li key={name} data-reveal="up" data-d={i + 1} className={styles.zone}>
            <span className={styles.zoneBadge}>
              <MapPin aria-hidden className={styles.zoneIcon} strokeWidth={1.7} />
            </span>
            <span>
              <h3 className={styles.zoneName}>{name}</h3>
              <p className={styles.zoneText}>{text}</p>
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.zonesNote} data-reveal="up">
        {note}
      </p>
      {link && (
        <div className={styles.zonesLink} data-reveal="up">
          <CtaButton href={link.href} label={link.label} />
        </div>
      )}
    </Section>
  )
}
