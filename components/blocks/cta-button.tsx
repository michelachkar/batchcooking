import Link from 'next/link'
import clsx from 'clsx'
import { LeadTrigger } from '@/components/features/lead/lead-trigger'
import { ArrowIcon } from '@/components/ui/icon'
import styles from './cta-button.module.css'

type CtaButtonProps = {
  href: string
  label: string
  light?: boolean
  /** Ouvre le modal de demande de rappel (`href` sert de repli sans JavaScript). */
  lead?: boolean
  /** Attributs data-* ajoutés au lien (ex. pré-remplissage du formulaire de devis). */
  attrs?: Record<`data-${string}`, string>
}

// Bouton principal de la page. Avec `lead`, il ouvre le modal de demande de rappel.
export function CtaButton({ href, label, light, lead, attrs }: CtaButtonProps) {
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
