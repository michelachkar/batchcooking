import Image from 'next/image'
import {
  Baby,
  Calendar,
  CalendarCheck,
  CalendarDays,
  Check,
  Microwave,
  Refrigerator,
  Snowflake,
  WheatOff,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import { rich } from '@/components/ui/rich-text'
import { Cta, Heading, Shell } from '@/components/blocks/home-v2'
import styles from './batch-page.module.css'

const ICONS: Record<string, LucideIcon> = {
  fridge: Refrigerator,
  freezer: Snowflake,
  reheat: Microwave,
  once: Calendar,
  weekly: CalendarCheck,
  monthly: CalendarDays,
  gluten: WheatOff,
  veg: Sprout,
  kids: Baby,
}

// 1. Définition + appel à l'action, avec photo.
export function BatchIntro(p: {
  kicker: string
  title: string
  paragraphs: string[]
  highlights: string[]
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  image: { src: string; alt: string }
  /** Le bouton principal ouvre le modal de rappel (batch cooking) ; false : simple lien. */
  lead?: boolean
}) {
  return (
    <Shell name="batch-intro">
      <div className={styles.introGrid}>
        <div>
          <Heading kicker={p.kicker} title={p.title} />
          <div className={styles.introText} data-reveal="up" data-d="2">
            {p.paragraphs.map((t, i) => (
              <p key={i} className={styles.introParagraph}>
                {rich(t)}
              </p>
            ))}
          </div>
          <ul className={styles.highlights} data-reveal="up" data-d="3">
            {p.highlights.map((h) => (
              <li key={h} className={styles.highlight}>
                <span className={styles.highlightMark}>
                  <Check aria-hidden className={styles.highlightIcon} strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
          <div className={styles.actions} data-reveal="up" data-d="4">
            <Cta href={p.primary.href} label={p.primary.label} lead={p.lead ?? true} />
            <a href={p.secondary.href} className={styles.secondaryLink}>
              {p.secondary.label}
            </a>
          </div>
        </div>
        <figure data-reveal="right" className={styles.photo}>
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            priority
            sizes="(min-width: 1025px) 40vw, 100vw"
            className={styles.photoImage}
          />
        </figure>
      </div>
    </Shell>
  )
}

// 3. Déroulé, de la première prise de contact à la dernière boîte rangée.
export function Timeline(p: {
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  intro: string
  steps: { title: string; text: string }[]
}) {
  return (
    <Shell name="timeline" tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
      <ol className={styles.timeline}>
        {p.steps.map((s, i) => (
          <li key={s.title} data-reveal="up" data-d={Math.min(i + 1, 6)} className={styles.step}>
            <span className={styles.stepNumber}>{i + 1}</span>
            <div className={styles.stepCard}>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{rich(s.text)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Shell>
  )
}

// 4. Ce qui est inclus.
export function Included(p: {
  kicker: string
  title: string
  listTitle: string
  items: string[]
  asideTitle: string
  asideText: string
  cta: { label: string; href: string }
  lead?: boolean
}) {
  return (
    <Shell name="batch-included" tone="white">
      <Heading kicker={p.kicker} title={p.title} />
      <div className={styles.includedGrid}>
        <div data-reveal="up" className={styles.includedCard}>
          <h3 className={styles.includedLabel}>{p.listTitle}</h3>
          <ul className={styles.includedList}>
            {p.items.map((it) => (
              <li key={it} className={styles.includedItem}>
                <span className={styles.includedMark}>
                  <Check aria-hidden className={styles.includedIcon} strokeWidth={3} />
                </span>
                {rich(it)}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="up" data-d="2" className={styles.aside}>
          <div>
            <h3 className={styles.asideTitle}>{p.asideTitle}</h3>
            <p className={styles.asideText}>{p.asideText}</p>
          </div>
          <div>
            <Cta href={p.cta.href} label={p.cta.label} lead={p.lead ?? true} />
          </div>
        </div>
      </div>
    </Shell>
  )
}

type IconCard = { icon: string; title: string; text: string }

function IconCards({ items }: { items: IconCard[] }) {
  return (
    <ul className={styles.iconCards}>
      {items.map(({ icon, title, text }, i) => {
        const Icon = ICONS[icon] ?? Check
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
    <Shell name={p.name} tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
      <IconCards items={p.items} />
      {p.note && (
        <p className={styles.note} data-reveal="up">
          {p.note}
        </p>
      )}
    </Shell>
  )
}
