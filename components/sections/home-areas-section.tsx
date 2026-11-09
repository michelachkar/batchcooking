import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { getTranslations } from '@/lib/i18n'
import { CtaButton } from '@/components/blocks/cta-button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { rich } from '@/components/ui/rich-text'
import { communes, type ZoneId } from '@/lib/zones'
import styles from './home-areas-section.module.css'

const ZONES: ZoneId[] = ['z1', 'z2', 'z3']

// Communes desservies (liste de lib/zones.ts, textes home.areas) avec liens vers les services et la page des zones.
export async function HomeAreasSection() {
  const a = await getTranslations('home.areas')
  return (
    <Section name="home-areas" tone="beige">
      <div className={styles.head}>
        <SectionHeading kicker={a('kicker')} title={a('title')} intro={undefined} />
        <p className={styles.intro}>{rich(a('intro'))}</p>
      </div>
      <div className={styles.grid} data-reveal="up">
        {ZONES.map((z) => (
          <div key={z} className={styles.card} data-zone={z}>
            <h3 className={styles.cardTitle}>
              <MapPin size={18} aria-hidden />
              {a(`zones.${z}.title`)}
            </h3>
            <p className={styles.cardText}>{a(`zones.${z}.text`)}</p>
            <ul className={styles.list}>
              {communes
                .filter((c) => c.zone === z)
                .map((c) => (
                  <li key={c.name}>
                    <Link href="/zones" className={styles.pill}>
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <p className={styles.note}>{a('note')}</p>
      <div className={styles.more}>
        <CtaButton href={a('ctaHref')} label={a('cta')} />
      </div>
    </Section>
  )
}
