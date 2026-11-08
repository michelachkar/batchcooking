import Image from 'next/image'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import { MenuDialog } from '@/components/blocks/menu-dialog'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'
import { rich } from '@/components/ui/rich-text'
import styles from './sample-menus.module.css'

export type SampleMenu = {
  image?: { src: string; width: number; height: number; unoptimized?: boolean; alt: string }
  icon: IconName
  label: string
  title: string
  meta: string
  tags: string[]
  courses: [string, string, ('yes' | 'no')?][]
  price: string
  priceNote: string
}

const bold = rich

// CTA de carte : bouton (ouvre le parcours de demande) ou lien selon le contexte.
function CtaTag({
  href,
  onClick,
  className,
  children,
}: {
  href: string
  onClick?: () => void
  className: string
  children: React.ReactNode
}) {
  return onClick ? (
    <button type="button" onClick={onClick} className={clsx(className, styles.cardCtaButton)}>
      {children}
    </button>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

type SampleMenusProps = {
  kicker: string
  title: string
  intro: string
  note: string
  menus: SampleMenu[]
  /** Nombre de plats montrés sur la carte. */
  preview?: number
  labels: {
    open: string
    close: string
    panelKicker: string
    cta: string
    more: (count: number) => string
  }
  ctaHref: string
  /** CTA affiché sous le prix de chaque carte (sinon, prix et « voir le détail » côte à côte). */
  cardCta?: string
  /** Si fourni, le CTA des cartes est un bouton qui appelle cette fonction (index de la carte) au lieu d'un lien. */
  onCardCta?: (index: number) => void
  /** Contenu facultatif entre l'en-tête et les cartes (ex. un sélecteur). */
  beforeCards?: React.ReactNode
  /** Colle le bloc à la section précédente : pas de bande crème ni de coins arrondis en haut. */
  flushTop?: boolean
  /** Fond de la section : beige (par défaut) ou bandeau terracotta (pages de service). */
  tone?: 'beige' | 'white' | 'terracotta'
  /** Masque kicker, titre et introduction (un titre de catégorie précède déjà le bloc). */
  hideHeader?: boolean
}

// Section « menus types » : trois cartes avec photo, aperçu des plats, prix et fenêtre « menu complet » (widget sample-menus).
export function SampleMenus({
  kicker,
  title,
  intro,
  note,
  menus,
  preview = 4,
  labels,
  ctaHref,
  cardCta,
  onCardCta,
  beforeCards,
  flushTop,
  hideHeader,
  tone = 'beige',
}: SampleMenusProps) {
  const dark = tone === 'terracotta'
  const bg = dark ? styles.toneTerracotta : tone === 'white' ? styles.toneWhite : styles.toneBeige
  return (
    <section data-section="menus" className={flushTop ? bg : styles.band}>
      <div className={clsx(styles.panel, bg, !flushTop && styles.panelRounded)}>
        <div
          className={clsx(
            styles.container,
            hideHeader ? styles.containerHeaderless : styles.containerWithHeader,
          )}
        >
          {!hideHeader && (
            <header className={styles.header}>
              <p className={clsx(styles.kicker, dark && styles.kickerDark)}>{kicker}</p>
              <h2 className={clsx(styles.title, dark && styles.titleDark)}>{title}</h2>
              <p className={clsx(styles.intro, dark && styles.introDark)}>{intro}</p>
            </header>
          )}
          {beforeCards}
          <div
            className={clsx(styles.cards, menus.length === 2 ? styles.cardsTwo : styles.cardsThree)}
          >
            {menus.map((m, mi) => {
              const shown = m.courses.slice(0, preview)
              const rest = m.courses.length - shown.length
              return (
                <article key={m.title} className={styles.card}>
                  {m.image ? (
                    <div className={styles.media}>
                      <Image
                        src={m.image.src}
                        alt={m.image.alt}
                        width={m.image.width}
                        height={m.image.height}
                        unoptimized={m.image.unoptimized}
                        sizes="(min-width: 1025px) 33vw, 640px"
                        className={styles.photo}
                      />
                      <span className={styles.iconBadge}>
                        <Icon name={m.icon} className={styles.iconBadgeSvg} />
                      </span>
                    </div>
                  ) : (
                    <div className={styles.spacer} />
                  )}
                  <h3 className={styles.cardTitle}>{m.title}</h3>
                  <p className={styles.meta}>
                    <Icon name="clock" className={styles.metaIcon} />
                    {m.meta}
                  </p>
                  <ul className={styles.tags}>
                    {m.tags.map((t) => (
                      <li key={t} className={styles.tag}>
                        <Icon name="leaf" className={styles.tagIcon} />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <ol className={styles.courses}>
                    {shown.map(([course, desc, mark]) => (
                      <li key={course} className={styles.course}>
                        <span className={styles.courseName}>
                          {mark && (
                            <span
                              className={clsx(
                                styles.mark,
                                mark === 'yes' ? styles.markYes : styles.markNo,
                              )}
                            >
                              {mark === 'yes' ? (
                                <Check aria-hidden className={styles.markIcon} strokeWidth={3} />
                              ) : (
                                <X aria-hidden className={styles.markIcon} strokeWidth={3} />
                              )}
                            </span>
                          )}
                          <span>{bold(course)}</span>
                        </span>
                        {desc && <span className={styles.courseDesc}>{bold(desc)}</span>}
                      </li>
                    ))}
                  </ol>
                  {rest > 0 && <p className={styles.more}>{labels.more(rest)}</p>}
                  <div
                    className={clsx(
                      styles.footer,
                      cardCta ? styles.footerStacked : styles.footerInline,
                    )}
                  >
                    <div className={styles.priceBlock}>
                      <strong className={clsx(styles.price, cardCta && styles.priceHighlight)}>
                        {m.price}
                      </strong>
                      <span className={styles.priceNote}>{m.priceNote}</span>
                    </div>
                    {cardCta && (
                      <CtaTag
                        href={ctaHref}
                        onClick={onCardCta ? () => onCardCta(mi) : undefined}
                        className={clsx(styles.cta, styles.cardCta)}
                      >
                        {cardCta}
                        <ArrowIcon className={styles.ctaArrow} />
                      </CtaTag>
                    )}
                    {!cardCta && (
                      <MenuDialog label={labels.open} closeLabel={labels.close} title={m.title}>
                        <p className={styles.dialogKicker}>{labels.panelKicker}</p>
                        <h3 className={styles.dialogTitle}>{m.title}</h3>
                        <p className={styles.dialogMeta}>
                          {m.meta} · {m.price}
                        </p>
                        <ol className={styles.dialogCourses}>
                          {m.courses.map(([course, desc], k) => (
                            <li key={course} className={styles.dialogCourse}>
                              <span className={styles.dialogNumber}>
                                {String(k + 1).padStart(2, '0')}
                              </span>
                              <div>
                                <span className={styles.dialogCourseName}>{course}</span>
                                {desc && <span className={styles.courseDesc}>{desc}</span>}
                              </div>
                            </li>
                          ))}
                        </ol>
                        <p className={styles.dialogNote}>{m.priceNote}</p>
                        <p className={styles.dialogNote}>{note}</p>
                        <div className={styles.dialogActions}>
                          <Link href={ctaHref} className={clsx(styles.cta, styles.dialogCta)}>
                            {labels.cta}
                            <ArrowIcon className={styles.ctaArrow} />
                          </Link>
                        </div>
                      </MenuDialog>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
          <p className={clsx(styles.note, dark && styles.noteDark)}>{note}</p>
        </div>
      </div>
    </section>
  )
}
