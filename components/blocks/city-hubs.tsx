import { MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { communes, type ZoneId, ZONE_COLOR } from '@/lib/zones'
import styles from './city-hubs.module.css'

type Hub = {
  title: string
  text: string
  communes: { name: string; zone: ZoneId }[]
}

// Une section par ville principale : la ville, ses quartiers ou communes proches, avec la zone de chacune.
export function CityHubs(p: {
  kicker: string
  title: string
  intro: string
  zoneLabels: Record<ZoneId, string>
  hubs: Hub[]
}) {
  return (
    <Section name="cities" tone="beige">
      <SectionHeading kicker={p.kicker} title={p.title} intro={p.intro} />
      <ul className={styles.cityList}>
        {p.hubs.map((h, i) => (
          <li key={h.title} data-reveal="up" data-d={(i % 2) + 1} className={styles.cityCard}>
            <h3 className={styles.cityTitle}>
              <MapPin aria-hidden className={styles.cityIcon} strokeWidth={1.7} />
              {h.title}
            </h3>
            <p className={styles.cityText}>{h.text}</p>
            <ul className={styles.communes}>
              {h.communes.map((c) => (
                <li key={c.name} className={styles.commune}>
                  <span
                    aria-hidden
                    className={styles.communeDot}
                    style={{ background: ZONE_COLOR[c.zone] }}
                  />
                  {c.name}
                  <span className="sr-only"> ({p.zoneLabels[c.zone]})</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
