import Image from 'next/image'
import { Check } from 'lucide-react'
import { rich } from '@/components/ui/rich-text'
import { CtaButton } from '@/components/blocks/cta-button'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import styles from './service-intro.module.css'

// 1. Définition + appel à l'action, avec photo.
export function ServiceIntro(p: {
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
    <Section name="batch-intro">
      <div className={styles.introGrid}>
        <div>
          <SectionHeading kicker={p.kicker} title={p.title} />
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
            <CtaButton href={p.primary.href} label={p.primary.label} lead={p.lead ?? true} />
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
    </Section>
  )
}
