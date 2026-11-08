import Image from 'next/image'
import { CalendarDays, Clock, MapPin, Quote, Users, UtensilsCrossed } from 'lucide-react'
import { CtaButton } from '@/components/blocks/cta-button'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import styles from './realisation-detail.module.css'

type Img = { src: string; width: number; height: number; alt: string; unoptimized?: boolean }

export type Fact = {
  icon: 'service' | 'date' | 'place' | 'duration' | 'guests'
  label: string
  value: string
}

const ICONS = {
  service: UtensilsCrossed,
  date: CalendarDays,
  place: MapPin,
  duration: Clock,
  guests: Users,
} as const

// Contexte de la réalisation (texte de la fiche) et carte « En bref ».
export function Context(p: {
  kicker: string
  title: string
  factsTitle: string
  facts: Fact[]
  children: React.ReactNode
}) {
  return (
    <Section name="real-context">
      <div className={styles.contextLayout}>
        <div>
          <SectionHeading kicker={p.kicker} title={p.title} />
          <div data-reveal="up" className={styles.contextBody}>
            {p.children}
          </div>
        </div>
        <aside data-reveal="up" data-d="2" className={styles.facts}>
          <h3 className={styles.factsTitle}>{p.factsTitle}</h3>
          <dl className={styles.factList}>
            {p.facts.map((f) => {
              const Icon = ICONS[f.icon]
              return (
                <div key={f.label} className={styles.fact}>
                  <Icon aria-hidden className={styles.factIcon} strokeWidth={1.7} />
                  <div>
                    <dt className={styles.factLabel}>{f.label}</dt>
                    <dd className={styles.factValue}>{f.value}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </aside>
      </div>
    </Section>
  )
}

// Menu servi, dîners préparés ou programme du cours.
export function MenuList(p: { kicker: string; title: string; items: string[] }) {
  if (p.items.length === 0) return null
  return (
    <Section name="real-menu" tone="beige">
      <SectionHeading kicker={p.kicker} title={p.title} />
      <ol className={styles.menu} data-reveal="up">
        {p.items.map((m, i) => (
          <li key={m} className={styles.menuItem}>
            <span className={styles.menuNumber}>{i + 1}</span>
            {m}
          </li>
        ))}
      </ol>
    </Section>
  )
}

// Photos de la réalisation.
export function Photos(p: { kicker: string; title: string; photos: Img[] }) {
  if (p.photos.length === 0) return null
  return (
    <Section name="real-photos">
      <SectionHeading kicker={p.kicker} title={p.title} />
      <ul className={styles.photoList}>
        {p.photos.map((ph, i) => (
          <li key={ph.src + i} data-reveal="up" data-d={(i % 3) + 1} className={styles.photo}>
            <Image
              src={ph.src}
              alt={ph.alt}
              fill
              unoptimized={ph.unoptimized}
              sizes="(min-width: 768px) 33vw, 100vw"
              className={styles.photoImage}
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}

// Avis du client.
export function ClientReview(p: { kicker: string; title: string; quote: string; author: string }) {
  return (
    <Section name="real-review" tone="beige">
      <SectionHeading kicker={p.kicker} title={p.title} />
      <figure data-reveal="up" className={styles.review}>
        <Quote aria-hidden className={styles.reviewIcon} strokeWidth={1.5} />
        <blockquote className={styles.reviewQuote}>{p.quote}</blockquote>
        <figcaption className={styles.reviewAuthor}>{p.author}</figcaption>
      </figure>
    </Section>
  )
}

// Appel à l'action vers le devis du service concerné.
export function QuoteCta(p: {
  kicker: string
  title: string
  text: string
  button: string
  href: string
}) {
  return (
    <Section name="real-cta">
      <div className={styles.cta} data-reveal="up">
        <SectionHeading kicker={p.kicker} title={p.title} intro={p.text} />
        <CtaButton href={p.href} label={p.button} />
      </div>
    </Section>
  )
}
