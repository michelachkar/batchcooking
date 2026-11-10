import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { CalendarDays } from 'lucide-react'
import { LeadTrigger } from '@/components/features/lead/lead-trigger'
import { rich } from '@/components/ui/rich-text'
import { StepCards, type StepCard } from '@/components/blocks/step-cards'
import { RevealObserver } from '@/components/ui/reveal-observer'
import styles from './story-block.module.css'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }

type StoryBlockProps = {
  label: string
  title: string
  intro?: string
  /** Photos, pastille et liste de points : inutiles avec `stepCards`. */
  images?: [Img & { alt: string }, Img & { alt: string }, Img & { alt: string }]
  badge?: { icon: React.ReactNode; value: string; text: string; accent?: boolean }
  quality?: { icon: React.ReactNode; title: string; text: string; note: string }
  question?: string
  /** Étapes en cartes (3), sous la section. */
  stepCards?: StepCard[]
  features?: string[]
  /** Absent : seul le bouton secondaire est affiché. */
  /** `accent` : action principale, en terracotta foncé comme les autres CTA principaux. */
  button?: { label: string; href: string; accent?: boolean }
  secondaryButton?: { label: string; href: string }
  /** Bouton supplémentaire (ex. recettes, tarifs), après les autres. */
  extraButton?: { label: string; href: string }
}

function Cover({ img, sizes }: { img: Img & { alt: string }; sizes: string }) {
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      unoptimized={img.unoptimized}
      sizes={sizes}
      className={styles.cover}
    />
  )
}

// Section « À propos » : deux photos superposées avec pastille d'ancienneté, carte qualité, liste de points, bouton et photo d'ambiance.
// Reprise du widget « about-us » ; le texte alternatif de chaque photo est porté par l'image.
export function StoryBlock({
  label,
  title,
  intro,
  images,
  badge,
  quality,
  question,
  stepCards,
  features,
  button,
  secondaryButton,
  extraButton,
}: StoryBlockProps) {
  const buttons = (
    <div className={styles.buttons}>
      {secondaryButton && (
        <LeadTrigger
          fallbackHref={secondaryButton.href}
          data-reveal="up"
          data-d="5"
          className={clsx(styles.button, styles.buttonSecondary)}
        >
          <CalendarDays aria-hidden size={20} strokeWidth={2} />
          {secondaryButton.label}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={styles.buttonSecondaryIcon}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </LeadTrigger>
      )}
      {button &&
        (button.accent ? (
          <Link
            href={button.href}
            data-reveal="up"
            data-d="4"
            className={clsx(styles.button, styles.buttonSecondary)}
          >
            {button.label}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className={styles.buttonSecondaryIcon}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        ) : (
          <Link
            href={button.href}
            data-reveal="up"
            data-d="4"
            className={clsx(styles.button, styles.buttonPrimary)}
          >
            {button.label}
            <span className={styles.buttonArrow} aria-hidden>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.buttonArrowIcon}
              >
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </span>
          </Link>
        ))}
      {extraButton && (
        <Link
          href={extraButton.href}
          data-reveal="up"
          data-d="6"
          className={clsx(styles.button, styles.buttonPrimary)}
        >
          {extraButton.label}
          <span className={styles.buttonArrow} aria-hidden>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.buttonArrowIcon}
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </span>
        </Link>
      )}
    </div>
  )

  if (stepCards && stepCards.length > 0) {
    // Variante « processus » : titre, étapes en cartes, puis les boutons en dessous.
    return (
      <section data-section="about" className={styles.root}>
        <RevealObserver />
        <noscript>
          <style>{'[data-reveal]{opacity:1!important}'}</style>
        </noscript>
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.stepsHead}>
              <div data-reveal="up" data-d="1" className={styles.label}>
                {label}
              </div>
              <h2 data-reveal="up" data-d="2" className={styles.title}>
                {title}
              </h2>
              {intro && (
                <p data-reveal="up" data-d="3" className={styles.intro}>
                  {intro}
                </p>
              )}
            </div>
            <div className={styles.stepCards}>
              <StepCards steps={stepCards} />
            </div>
            <div className={styles.stepsActions}>{buttons}</div>
          </div>
        </div>
      </section>
    )
  }

  if (!images || !badge) return null

  return (
    <section data-section="about" className={styles.root}>
      <RevealObserver />
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.layout}>
            <div className={styles.visual}>
              <div data-reveal="left" data-d="1" className={clsx(styles.photo, styles.photoMain)}>
                <Cover img={images[0]} sizes="(min-width: 1025px) 30vw, 70vw" />
              </div>
              <div
                data-reveal="left"
                data-d="3"
                className={clsx(styles.photo, styles.photoSecondary)}
              >
                <Cover img={images[1]} sizes="(min-width: 1025px) 25vw, 55vw" />
              </div>
              <div
                data-reveal="badge"
                className={clsx(styles.badge, badge.accent && styles.badgeAccent)}
              >
                {!badge.accent && (
                  <div className={clsx(styles.disc, styles.badgeIcon)}>{badge.icon}</div>
                )}
                <div className={styles.badgeBody}>
                  <div className={clsx(styles.badgeValue, badge.accent && styles.badgeValueAccent)}>
                    {badge.value}
                  </div>
                  <div className={clsx(styles.badgeText, badge.accent && styles.badgeTextAccent)}>
                    {badge.text}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div data-reveal="up" data-d="1" className={styles.label}>
                {label}
              </div>
              <h2 data-reveal="up" data-d="2" className={styles.title}>
                {title}
              </h2>
              {question && (
                <p data-reveal="up" data-d="3" className={styles.question}>
                  {question}
                </p>
              )}
              {intro && (
                <p data-reveal="up" data-d="3" className={styles.intro}>
                  {intro}
                </p>
              )}
              {quality && (
                <div data-reveal="up" data-d="4" className={styles.quality}>
                  <div className={styles.qualityHead}>
                    <div className={clsx(styles.disc, styles.qualityIcon)}>{quality.icon}</div>
                    <h3 className={styles.qualityTitle}>{quality.title}</h3>
                  </div>
                  <p className={styles.qualityText}>{quality.text}</p>
                  <hr className={styles.qualityRule} />
                  <div className={styles.qualityNote}>{quality.note}</div>
                </div>
              )}
              <div className={clsx(styles.actions, secondaryButton && styles.actionsSingle)}>
                <div>
                  <div className={styles.features}>
                    {(features ?? []).map((f, i) => (
                      <div
                        key={f}
                        data-reveal="up"
                        data-d={Math.min(i + 1, 6)}
                        className={styles.feature}
                      >
                        <span className={styles.featureTick} aria-hidden>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={styles.featureTickIcon}
                          >
                            <polyline points="5 12 10 17 19 7" />
                          </svg>
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                  {buttons}
                </div>
                {!secondaryButton && (
                  <div data-reveal="right" data-d="5" className={styles.ambiance}>
                    <Cover img={images[2]} sizes="(min-width: 1025px) 280px, 100vw" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
