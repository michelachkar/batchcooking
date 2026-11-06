import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { LeadTrigger } from '@/components/lead/lead-trigger'
import { RevealObserver } from '@/components/blocks/reveal-observer'
import styles from './about-us.module.css'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }

type Props = {
  label: string
  title: string
  intro?: string
  images: [Img & { alt: string }, Img & { alt: string }, Img & { alt: string }]
  badge: { icon: React.ReactNode; value: string; text: string; accent?: boolean }
  quality?: { icon: React.ReactNode; title: string; text: string; note: string }
  question?: string
  steps?: { title: string; text: string }[]
  stepsTitle?: string
  features: string[]
  button: { label: string; href: string }
  secondaryButton?: { label: string; href: string }
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
export function AboutUs({
  label,
  title,
  intro,
  images,
  badge,
  quality,
  question,
  steps,
  stepsTitle,
  features,
  button,
  secondaryButton,
}: Props) {
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
              {steps && steps.length > 0 && (
                <div className={styles.steps}>
                  {stepsTitle && (
                    <h3 data-reveal="up" data-d="4" className={styles.stepsTitle}>
                      {stepsTitle}
                    </h3>
                  )}
                  <ol className={styles.stepList}>
                    {steps.map((st, i) => (
                      <li
                        key={st.title}
                        data-reveal="up"
                        data-d={Math.min(i + 1, 6)}
                        className={styles.step}
                      >
                        <span className={clsx(styles.disc, styles.stepNumber)} aria-hidden>
                          {i + 1}
                        </span>
                        <span className={styles.stepBody}>
                          <strong className={styles.stepTitle}>{st.title}</strong>
                          <span className={styles.stepText}>{st.text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
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
                    {(steps?.length ? [] : features).map((f, i) => (
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
                  <div className={styles.buttons}>
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
                    {secondaryButton && (
                      <LeadTrigger
                        fallbackHref={secondaryButton.href}
                        data-reveal="up"
                        data-d="5"
                        className={clsx(styles.button, styles.buttonSecondary)}
                      >
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
                  </div>
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
