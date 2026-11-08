import clsx from 'clsx'
import { BadgePercent } from 'lucide-react'
import { GoogleLogo } from '@/components/ui/google-logo'
import { CreditTrigger } from '@/components/blocks/credit-note'
import styles from './trust-bar.module.css'

// Barre de confiance : avis Google + crédit d'impôt (ouvre le modal du crédit d'impôt).
// Partagée par le hero de l'accueil et la page « À propos ».
export function TrustBar({
  googleReviews,
  taxCredit,
  className,
}: {
  googleReviews: string
  taxCredit?: string
  className?: string
}) {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.google}>
        <span className={styles.googleLogo}>
          <GoogleLogo className={styles.googleSvg} />
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
          <CreditTrigger className={styles.taxCredit}>
            <BadgePercent aria-hidden className={styles.taxCreditIcon} strokeWidth={1.75} />
            {taxCredit}
          </CreditTrigger>
        </>
      )}
    </div>
  )
}
