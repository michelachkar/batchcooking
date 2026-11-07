import Image from 'next/image'
import Link from 'next/link'
import { BadgePercent } from 'lucide-react'
import { LeadTrigger } from '@/components/lead/lead-trigger'
import { ArrowIcon } from '@/components/ui/icon'
import { RevealObserver } from '@/components/blocks/reveal-observer'
import styles from './hero.module.css'
import { HeroReviews, type HeroReview } from '@/components/blocks/hero-reviews'

export type HeroPhoto = { src: string; width: number; height: number; alt: string }

// CTA principal : lien classique, ou déclencheur du modal de demande de rappel.
function PrimaryTag({
  lead,
  href,
  ...rest
}: { lead?: boolean; href: string } & Omit<React.ComponentProps<typeof Link>, 'href'>) {
  return lead ? <LeadTrigger fallbackHref={href} {...rest} /> : <Link href={href} {...rest} />
}

type Cta = { label: string; href: string }

type Props = {
  label: string
  headline: string
  accent: string
  description: string
  gallery?: HeroPhoto[]
  googleReviews?: string
  taxCredit?: string
  creditNote?: { value: string; title: string; note: string }
  heroReviews?: { label: string; items: HeroReview[] }
  /** `lead` : le CTA ouvre le modal de demande de rappel (href sert de repli sans JavaScript). */
  primary: Cta & { lead?: boolean }
  secondary: Cta
  meta: { text: string }
  image: { src: string; width: number; height: number; alt: string }
  caption: { kicker: string; title: string; text?: string }
}

// Hero éditorial en deux colonnes (texte / photo), repris du widget « dining-hero » de Savrio.
// Server Component : aucun JS client. La photo est l'image LCP (priority + fetchPriority="high").
export function Hero({
  label,
  headline,
  accent,
  description,
  gallery,
  googleReviews,
  taxCredit,
  creditNote,
  heroReviews,
  primary,
  secondary,
  meta,
  image,
  caption,
}: Props) {
  return (
    <section data-section="hero" className={styles.root}>
      <RevealObserver />
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <div className={styles.frame}>
        <div className={styles.content}>
          {googleReviews && (
            <div className={styles.topBar}>
              <div className={styles.google}>
                <span className={styles.googleLogo}>
                  <svg aria-hidden viewBox="0 0 24 24" className={styles.googleSvg}>
                    <path
                      fill="#4285F4"
                      d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.1A12 12 0 0 0 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.28a12 12 0 0 0 0 10.8l4.01-3.1Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.76c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.6l4.01 3.1C6.23 6.87 8.88 4.76 12 4.76Z"
                    />
                  </svg>
                </span>
                <span className={styles.googleRating}>
                  <span aria-hidden className={styles.stars}>
                    ★★★★★
                  </span>
                  <span className={styles.googleText}>{googleReviews}</span>
                </span>
              </div>
              {taxCredit && (
                <>
                  <span aria-hidden className={styles.topBarDivider} />
                  <span className={styles.taxCredit}>
                    <BadgePercent aria-hidden className={styles.taxCreditIcon} strokeWidth={1.75} />
                    {taxCredit}
                  </span>
                </>
              )}
            </div>
          )}
          <h1 className={styles.title}>
            <em className={styles.accent}>{accent}</em>
            {headline}
          </h1>
          {gallery?.length ? (
            <ul className={styles.gallery}>
              {gallery.map(({ alt, ...img }, i) => (
                <li key={img.src + i} data-reveal="up" data-d={i + 1} className={styles.galleryItem}>
                  <Image
                    {...img}
                    alt={alt}
                    sizes="(min-width: 1025px) 15vw, 30vw"
                    className={styles.galleryImg}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.description}>{description}</p>
          )}
          <div className={styles.actions}>
            <PrimaryTag href={primary.href} lead={primary.lead} className={styles.primary}>
              {primary.label}
              <ArrowIcon className={styles.arrow} />
            </PrimaryTag>
            <Link href={secondary.href} className={styles.secondary}>
              {secondary.label}
              <ArrowIcon className={styles.arrow} />
            </Link>
          </div>
          {creditNote && (
            <div data-reveal="up" data-d="5" className={styles.creditNote}>
              <span aria-hidden className={styles.creditValue}>
                {creditNote.value}
              </span>
              <span className={styles.creditText}>
                <strong className={styles.creditTitle}>{creditNote.title}</strong>
                <span className={styles.creditSub}>{creditNote.note}</span>
              </span>
            </div>
          )}
        </div>

        <div className={styles.media}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            fetchPriority="high"
            sizes="(min-width: 1025px) 55vw, 100vw"
            className={styles.photo}
          />

        </div>
      </div>
    </section>
  )
}
