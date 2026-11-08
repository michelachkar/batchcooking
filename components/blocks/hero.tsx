import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { LeadTrigger } from '@/components/features/lead/lead-trigger'
import { ArrowIcon } from '@/components/ui/icon'
import { RevealObserver } from '@/components/ui/reveal-observer'
import { TrustBar } from '@/components/blocks/trust-bar'
import styles from './hero.module.css'
import {
  CreditDialog,
  CreditNote,
  type CreditDialogTexts,
  type CreditNoteTexts,
} from '@/components/blocks/credit-note'

export type HeroPhoto = { src: string; width: number; height: number; alt: string; badge?: string }

// CTA principal : lien classique, ou déclencheur du modal de demande de rappel.
function PrimaryTag({
  lead,
  href,
  ...rest
}: { lead?: boolean; href: string } & Omit<React.ComponentProps<typeof Link>, 'href'>) {
  return lead ? <LeadTrigger fallbackHref={href} {...rest} /> : <Link href={href} {...rest} />
}

type Cta = { label: string; href: string }

type HeroProps = {
  headline: string
  accent: string
  description: string
  gallery?: HeroPhoto[]
  tagline?: string[]
  googleReviews?: string
  taxCredit?: string
  /** Une phrase discrète sur la zone desservie, avec un lien vers la page Zones. */
  zone?: { text: string; label: string; href: string }
  creditNote?: { note: CreditNoteTexts; dialog: CreditDialogTexts }
  /** `lead` : le CTA ouvre le modal de demande de rappel (href sert de repli sans JavaScript). */
  primary: Cta & { lead?: boolean }
  secondary: Cta
  image: { src: string; width: number; height: number; alt: string }
}

// Hero éditorial en deux colonnes (texte / photo).
// Server Component : aucun JS client. La photo est l'image LCP (priority + fetchPriority="high").
export function Hero({
  headline,
  accent,
  description,
  gallery,
  tagline,
  googleReviews,
  taxCredit,
  zone,
  creditNote,
  primary,
  secondary,
  image,
}: HeroProps) {
  return (
    <section data-section="hero" className={styles.root}>
      <RevealObserver />
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <div className={styles.frame}>
        <div className={styles.content}>
          {googleReviews && (
            <TrustBar
              googleReviews={googleReviews}
              taxCredit={taxCredit}
              className={styles.topBar}
            />
          )}
          <h1 className={styles.title}>
            <em className={styles.accent}>{accent}</em>
            {headline}
          </h1>
          {zone && (
            <div className={styles.zone}>
              <p className={styles.zoneText}>
                <MapPin aria-hidden className={styles.zoneIcon} strokeWidth={1.75} />
                {zone.text}
              </p>
              <Link href={zone.href} className={styles.zoneLink}>
                {zone.label}
                <ArrowIcon className={styles.zoneArrow} />
              </Link>
            </div>
          )}
          {gallery?.length ? (
            <ul className={styles.gallery}>
              {gallery.map(({ alt, badge, ...img }, i) => (
                <li
                  key={img.src + i}
                  data-reveal="up"
                  data-d={i + 1}
                  className={styles.galleryItem}
                >
                  <Image
                    {...img}
                    alt={alt}
                    sizes="(min-width: 1025px) 15vw, 30vw"
                    className={styles.galleryImg}
                  />
                  {badge && <span className={styles.galleryBadge}>{badge}</span>}
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
            <>
              <CreditNote note={creditNote.note} />
              <CreditDialog value={creditNote.note.value} dialog={creditNote.dialog} />
            </>
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
