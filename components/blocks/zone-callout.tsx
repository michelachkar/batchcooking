import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import { Section } from '@/components/ui/section'
import styles from './zone-callout.module.css'

// Rappel bien visible : une commune non citée est desservie dès qu'elle est dans la zone.
export function ZoneCallout(p: {
  title: string
  text: string
  cta: { label: string; href: string }
}) {
  return (
    <Section name="zone-callout" tone="white">
      <div className={styles.callout} data-reveal="up">
        <span className={styles.calloutIcon}>
          <CircleCheck aria-hidden strokeWidth={1.75} />
        </span>
        <div>
          <h2 className={styles.calloutTitle}>{p.title}</h2>
          <p className={styles.calloutText}>{p.text}</p>
          <Link href={p.cta.href} className={styles.link}>
            {p.cta.label}
          </Link>
        </div>
      </div>
    </Section>
  )
}
