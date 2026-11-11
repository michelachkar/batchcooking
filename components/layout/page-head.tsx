import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { CtaButton } from '@/components/blocks/cta-button'
import {
  CreditDialog,
  CreditTrigger,
  type CreditDialogTexts,
} from '@/components/blocks/credit-note'
import styles from './page-head.module.css'

type PageHeadProps = {
  title: string
  /** Fil d'Ariane : tous les niveaux sauf le dernier portent un lien ; le dernier est la page courante. */
  crumbs: { label: string; href?: string }[]
  navLabel: string
  /** Court texte sous le titre (SEO). */
  description?: string
  /** Photo d'arrière-plan (facultative) : le bandeau reste sombre sans elle. */
  background?: { src: string; unoptimized?: boolean }
  /** Marge de 10 px de chaque côté en mobile (réalisations). */
  inset?: boolean
  /** Bandeau seul, sans fil d'Ariane ni titre (page 404, dont le titre est dans le corps). */
  bare?: boolean
  /** Bouton d'appel à l'action sous le titre ; `lead` ouvre le modal de rappel (href sert de repli sans JavaScript). */
  cta?: { label: string; href: string; lead?: boolean }
  /** Le passage en **gras** de `description` devient un lien qui ouvre le modal du crédit d'impôt. */
  credit?: { value: string; dialog: CreditDialogTexts }
}

// Bandeau de titre des pages intérieures : photo voilée de vert, pastille de fil d'Ariane et titre.
export function PageHead({
  title,
  crumbs,
  navLabel,
  description,
  background,
  inset,
  bare,
  cta,
  credit,
}: PageHeadProps) {
  return (
    <section data-section="head" className={clsx(styles.root, inset && styles.inset)}>
      {background && (
        <Image
          src={background.src}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized={background.unoptimized}
          className={styles.background}
        />
      )}
      <div className={styles.inner}>
        {!bare && (
          <div className={styles.content}>
            <nav aria-label={navLabel} className={styles.crumbs}>
              <ol className={styles.list}>
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1
                  return (
                    <li key={c.label} className={styles.item}>
                      {i > 0 && (
                        <span aria-hidden className={styles.separator}>
                          ›
                        </span>
                      )}
                      {last || !c.href ? (
                        <span aria-current="page" className={styles.current}>
                          {c.label}
                        </span>
                      ) : (
                        <Link href={c.href} className={styles.link}>
                          {c.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
            <h1 className={styles.title}>{title}</h1>
            {description && (
              <p className={styles.description}>
                {credit
                  ? description.split(/\*\*(.+?)\*\*/).map((part, i) =>
                      i % 2 ? (
                        <CreditTrigger key={i} className={styles.creditLink}>
                          {part}
                          <ChevronRight aria-hidden className={styles.creditIcon} />
                        </CreditTrigger>
                      ) : (
                        part
                      ),
                    )
                  : description}
              </p>
            )}
            {credit && <CreditDialog value={credit.value} dialog={credit.dialog} />}
            {cta && (
              <div className={styles.cta}>
                <CtaButton href={cta.href} label={cta.label} lead={cta.lead} light />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
