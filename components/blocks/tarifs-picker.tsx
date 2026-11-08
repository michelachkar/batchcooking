import { ArrowDown } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import styles from './tarifs-picker.module.css'
import { SERVICE_ICONS, type ServiceIconName } from '@/components/ui/icon-registry'

export type PickerOption = {
  /** Ancre de la catégorie dans la page (id de la section). */
  id: string
  icon: ServiceIconName
  title: string
  text: string
  /** « Dès 49,50 € » */
  price: string
  /** « par semaine » */
  unit: string
  /** Précision facultative : « après crédit d'impôt de 50 % » */
  note?: string
}

// Choix du service en tête de la page Tarifs : une grande carte par service, qui mène au bloc de tarifs.
export function TarifsPicker(p: {
  kicker: string
  title: string
  intro: string
  cta: string
  options: PickerOption[]
}) {
  return (
    <Section name="tarifs-picker" tone="white">
      <SectionHeading kicker={p.kicker} title={p.title} intro={p.intro} center />
      <ul className={styles.list}>
        {p.options.map((o, i) => {
          const Icon = SERVICE_ICONS[o.icon]
          return (
            <li key={o.id} data-reveal="up" data-d={i + 1} className={styles.item}>
              <a href={`#${o.id}`} className={styles.card}>
                <span className={styles.badge}>
                  <Icon aria-hidden className={styles.glyph} strokeWidth={1.6} />
                </span>
                <span className={styles.title}>{o.title}</span>
                <span className={styles.text}>{o.text}</span>
                <span className={styles.price}>
                  <strong>{o.price}</strong> {o.unit}
                  {o.note && <small className={styles.note}>{o.note}</small>}
                </span>
                <span className={styles.cta}>
                  {p.cta}
                  <ArrowDown aria-hidden className={styles.arrow} strokeWidth={2.25} />
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
