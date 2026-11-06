import Link from 'next/link'
import {
  BadgePercent,
  Clock,
  Feather,
  ChefHat,
  Sparkles,
  MapPin,
  Star,
  ShieldCheck,
  Mail,
} from 'lucide-react'
import { RevealObserver } from '@/components/blocks/reveal-observer'
import { FaqAccordion } from '@/components/blocks/faq-accordion'
import { LeadTrigger } from '@/components/lead/lead-trigger'
import { ArrowIcon } from '@/components/ui/icon'
import clsx from 'clsx'
import styles from './home-v2.module.css'

// Sections de la page d'accueil « v2 » (comparaison avec l'accueil actuel). Palette du hero : terracotta, beige, brun-gris.
const ICONS = {
  time: Clock,
  mind: Feather,
  homemade: ChefHat,
  clean: Sparkles,
  tax: BadgePercent,
  pin: MapPin,
  star: Star,
  secure: ShieldCheck,
  mail: Mail,
} as const
export type V2Icon = keyof typeof ICONS

export function Shell({
  name,
  tone = 'white',
  children,
}: {
  name: string
  tone?: 'white' | 'beige' | 'terracotta'
  children: React.ReactNode
}) {
  const bg =
    tone === 'beige' ? styles.beige : tone === 'terracotta' ? styles.terracotta : styles.white
  return (
    <section data-section={name} className={clsx(bg, styles.shell)}>
      <RevealObserver />
      <div className={styles.shellInner}>{children}</div>
    </section>
  )
}

export function Heading({
  kicker,
  title,
  intro,
  light,
}: {
  kicker: string
  title: string
  intro?: string
  light?: boolean
}) {
  return (
    <header className={styles.heading} data-reveal="up">
      <p className={clsx(styles.kicker, light && styles.light)}>{kicker}</p>
      <h2 className={clsx(styles.headingTitle, light && styles.light)}>{title}</h2>
      {intro && <p className={clsx(styles.intro, light && styles.light)}>{intro}</p>}
    </header>
  )
}

// Bouton principal. Avec `lead`, il ouvre le modal de demande de rappel (href sert de repli sans JavaScript).
export function Cta({
  href,
  label,
  light,
  lead,
  attrs,
}: {
  href: string
  label: string
  light?: boolean
  lead?: boolean
  /** Attributs data-* ajoutés au lien (ex. pré-remplissage du formulaire de devis). */
  attrs?: Record<`data-${string}`, string>
}) {
  const cls = clsx(styles.cta, light ? styles.ctaLight : styles.ctaPrimary)
  const inner = (
    <>
      {label}
      <ArrowIcon className={styles.ctaArrow} />
    </>
  )
  return lead ? (
    <LeadTrigger fallbackHref={href} className={cls}>
      {inner}
    </LeadTrigger>
  ) : (
    <Link href={href} className={cls} {...attrs}>
      {inner}
    </Link>
  )
}

// 6. Pour qui.
export function Audience(p: {
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  items: { title: string; text: string }[]
}) {
  return (
    <Shell name="audience" tone={p.tone ?? 'beige'}>
      <Heading kicker={p.kicker} title={p.title} />
      <ul className={styles.audienceList}>
        {p.items.map(({ title, text }, i) => (
          <li key={title} data-reveal="up" data-d={(i % 3) + 1} className={styles.audienceCard}>
            <h3 className={styles.audienceTitle}>{title}</h3>
            <p className={styles.audienceText}>{text}</p>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

// 8. Exemple de semaine type.
export function WeekExample(p: {
  kicker: string
  title: string
  intro: string
  days: { day: string; dish: string }[]
  note: string
  cta: { label: string; href: string }
  tone?: 'white' | 'beige'
}) {
  return (
    <Shell name="week" tone={p.tone}>
      <div className={styles.week}>
        <div data-reveal="left">
          <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
          <p className={styles.weekNote}>{p.note}</p>
          <Cta href={p.cta.href} label={p.cta.label} lead />
        </div>
        <ol className={styles.days}>
          {p.days.map(({ day, dish }, i) => (
            <li key={day} data-reveal="up" data-d={Math.min(i + 1, 6)} className={styles.day}>
              <span className={styles.dayName}>{day}</span>
              <span className={styles.dayDish}>{dish}</span>
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  )
}

// 12. Zones couvertes.
export function Zones(p: {
  kicker: string
  title: string
  intro: string
  areas: { name: string; text: string }[]
  note: string
  link?: { label: string; href: string }
  tone?: 'white' | 'beige'
}) {
  return (
    <Shell name="zones" tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
      <ul className={styles.zones}>
        {p.areas.map(({ name, text }, i) => (
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
        {p.note}
      </p>
      {p.link && (
        <div className={styles.zonesLink} data-reveal="up">
          <Cta href={p.link.href} label={p.link.label} />
        </div>
      )}
    </Shell>
  )
}

// 13. Questions fréquentes (accordéon natif).
export function FaqList(p: {
  /** Identifiant de l'accordéon (un par section pour que leurs ouvertures soient indépendantes). */
  name?: string
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  items: { question: string; answer: string }[]
}) {
  return (
    <Shell name={p.name ?? 'faq-v2'} tone={p.tone ?? 'white'}>
      <Heading kicker={p.kicker} title={p.title} />
      <div className={styles.faq} data-reveal="up">
        <FaqAccordion items={p.items} name={p.name ?? 'faq-v2'} />
      </div>
    </Shell>
  )
}
