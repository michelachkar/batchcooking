import { CalendarClock, Car } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { center, type ZoneId, ZONE_COLOR } from '@/lib/zones'
import { SERVICE_ICONS, type ServiceIconName } from '@/components/ui/icon-registry'
import styles from './zone-services.module.css'

type ZoneCard = {
  id: ZoneId
  title: string
  badge: string
  travel: string
  delay: string
  services: { id: ServiceIconName; label: string; status: string }[]
  note?: string
}

// Services disponibles, délai de réservation et déplacement pour chaque zone.
export function ZoneServices(p: {
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  intro: string
  travelLabel: string
  delayLabel: string
  zones: ZoneCard[]
  center?: boolean
}) {
  return (
    <Section name="zone-services" tone={p.tone}>
      <SectionHeading kicker={p.kicker} title={p.title} intro={p.intro} center={p.center} />
      <ul className={styles.zoneList}>
        {p.zones.map((z, i) => (
          <li
            key={z.id}
            data-reveal="up"
            data-d={i + 1}
            className={styles.zoneCard}
            style={{ borderTopColor: ZONE_COLOR[z.id] }}
          >
            <p className={styles.zoneBadge} style={{ color: ZONE_COLOR[z.id] }}>
              {z.badge}
            </p>
            <h3 className={styles.zoneTitle}>{z.title}</h3>
            <ul className={styles.services}>
              {z.services.map((s) => {
                const Icon = SERVICE_ICONS[s.id]
                return (
                  <li key={s.id} className={styles.service}>
                    <Icon aria-hidden className={styles.serviceIcon} strokeWidth={1.7} />
                    <span>
                      <strong className={styles.serviceLabel}>{s.label}</strong>
                      <span className={styles.serviceStatus}> · {s.status}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <dl className={styles.details}>
              <div className={styles.detail}>
                <Car aria-hidden className={styles.serviceIcon} strokeWidth={1.7} />
                <div>
                  <dt className={styles.detailLabel}>{p.travelLabel}</dt>
                  <dd className={styles.detailValue}>{z.travel}</dd>
                </div>
              </div>
              <div className={styles.detail}>
                <CalendarClock aria-hidden className={styles.serviceIcon} strokeWidth={1.7} />
                <div>
                  <dt className={styles.detailLabel}>{p.delayLabel}</dt>
                  <dd className={styles.detailValue}>{z.delay}</dd>
                </div>
              </div>
            </dl>
            {z.note && <p className={styles.zoneNote}>{z.note}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
