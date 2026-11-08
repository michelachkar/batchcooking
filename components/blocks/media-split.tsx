import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'
import clsx from 'clsx'
import { TrustBar } from '@/components/blocks/trust-bar'
import { rich } from '@/components/ui/rich-text'
import styles from './media-split.module.css'

type Img = {
  src: string
  width: number
  height: number
  unoptimized?: boolean
  position?: string
}

export type MediaSplitProps = {
  name: string
  tone?: 'dark' | 'light'
  imageSide?: 'left' | 'right'
  /** Largeur de la colonne image (défaut 46 %). */
  imageWidth?: number
  image: Img & { alt: string }
  inset?: Img & { alt: string }
  caption?: string
  badge?: { icon?: IconName; value: string; text: string }
  /** Barre de confiance (avis Google + crédit d'impôt) sur la photo, comme dans le hero. */
  trustBar?: { googleReviews: string; taxCredit?: string }
  kicker?: string
  title: string
  subtitle?: string
  paragraphs?: string[]
  stats?: { icon?: IconName; value: string; label: string; href?: string }[]
  quote?: { text: string; author?: string }
  listTitle?: string
  listStyle?: 'line' | 'check'
  items?: (string | { icon: IconName; text: string })[]
  columns?: 1 | 2
  extras?: { title: string; items: { icon: IconName; label: string; value: string }[] }
  note?: string
  linkStyle?: 'underline' | 'button'
  link?: { label: string; href: string }
}

// Widget « media-split » : photo (avec photo incrustée, pastille, légende) + récit (chiffres, citation, liste).
// Les variables --ms-* reprennent celles du widget ; le ton sombre est celui de la section « présentation du chef ».
const tones = { dark: styles.dark, light: styles.light }

function Photo({
  img,
  className,
  sizes,
}: {
  img: Img & { alt: string }
  className?: string
  sizes: string
}) {
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      unoptimized={img.unoptimized}
      sizes={sizes}
      className={className}
      style={img.position ? { objectPosition: img.position } : undefined}
    />
  )
}

export function MediaSplit(p: MediaSplitProps) {
  const right = p.imageSide === 'right'
  const w = p.imageWidth ?? 46
  const inset = Boolean(p.inset)
  return (
    <div
      className={clsx(styles.root, tones[p.tone ?? 'light'])}
      style={{
        ['--ms-cols' as string]: right ? `minmax(0,1fr) ${w}%` : `${w}% minmax(0,1fr)`,
        ['--ms-img-w' as string]: `${w}%`,
      }}
    >
      <figure className={clsx(styles.figure, right && styles.figureRight)}>
        <Photo img={p.image} sizes="(min-width: 1025px) 44vw, 100vw" className={styles.photo} />
        {p.caption && (
          <figcaption className={clsx(styles.caption, inset && styles.captionHidden)}>
            {p.caption}
          </figcaption>
        )}
        {p.badge && (
          <span className={styles.badge}>
            {p.badge.icon && (
              <span className={styles.badgeIcon}>
                <Icon name={p.badge.icon} className={styles.badgeIconSvg} />
              </span>
            )}
            <span>
              <strong className={styles.badgeValue}>{p.badge.value}</strong>
              <small className={styles.badgeText}>{p.badge.text}</small>
            </span>
          </span>
        )}
        {p.trustBar && (
          <TrustBar
            googleReviews={p.trustBar.googleReviews}
            taxCredit={p.trustBar.taxCredit}
            className={styles.trustBar}
          />
        )}
      </figure>
      {p.inset && (
        <span
          className={styles.inset}
          style={{
            ['--ms-inset-l' as string]: right ? 'auto' : `calc(${w}% - 230px)`,
            ['--ms-inset-r' as string]: right ? `calc(${w}% - 230px)` : 'auto',
          }}
        >
          <Photo img={p.inset} sizes="230px" className={styles.insetPhoto} />
        </span>
      )}
      <div className={styles.body}>
        {p.kicker && <p className={styles.kicker}>{p.kicker}</p>}
        <h2 className={styles.title}>{p.title}</h2>
        {p.subtitle && <p className={styles.subtitle}>{p.subtitle}</p>}
        {p.paragraphs?.map((t, i) => (
          <p key={i} className={clsx(styles.paragraph, i === 0 && styles.paragraphFirst)}>
            {rich(t)}
          </p>
        ))}
        {p.stats && (
          <div className={styles.stats}>
            {p.stats.map((s) => {
              const content = (
                <>
                  {s.icon && (
                    <span className={styles.statIcon}>
                      <Icon name={s.icon} className={styles.statIconSvg} />
                    </span>
                  )}
                  <strong className={styles.statValue}>{s.value}</strong>
                  <span className={styles.statLabel}>{s.label}</span>
                </>
              )
              return s.href ? (
                <Link key={s.value} href={s.href} className={clsx(styles.stat, styles.statLink)}>
                  {content}
                </Link>
              ) : (
                <div key={s.value} className={styles.stat}>
                  {content}
                </div>
              )
            })}
          </div>
        )}
        {p.quote && (
          <blockquote className={styles.quote}>
            <Icon name="quote" className={styles.quoteIcon} />
            <p className={styles.quoteText}>{p.quote.text}</p>
            {p.quote.author && <cite className={styles.quoteAuthor}>{p.quote.author}</cite>}
          </blockquote>
        )}
        {p.items && (
          <>
            {p.listTitle && <ListTitle>{p.listTitle}</ListTitle>}
            <ul
              className={clsx(
                styles.list,
                p.listStyle === 'line' && styles.listLine,
                p.columns === 2 && styles.listTwoColumns,
              )}
            >
              {p.items.map((it) => {
                const text = typeof it === 'string' ? it : it.text
                const icon = typeof it === 'string' ? undefined : it.icon
                return (
                  <li
                    key={text}
                    className={clsx(
                      styles.item,
                      icon && styles.itemWithIcon,
                      p.listStyle === 'line' && styles.itemLine,
                    )}
                  >
                    {icon ? (
                      <Icon name={icon} className={styles.itemIcon} />
                    ) : (
                      p.listStyle !== 'line' && (
                        <svg viewBox="0 0 24 24" aria-hidden className={styles.itemCheck}>
                          <path
                            d="M5 12.5l4.2 4.2L19 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )
                    )}
                    <span>{text}</span>
                  </li>
                )
              })}
            </ul>
          </>
        )}
        {p.extras && (
          <div className={styles.extras}>
            <ListTitle>{p.extras.title}</ListTitle>
            <dl className={styles.extraList}>
              {p.extras.items.map((x) => (
                <div key={x.label} className={styles.extra}>
                  <dt className={styles.extraLabel}>
                    <Icon name={x.icon} className={styles.extraIcon} />
                    {x.label}
                  </dt>
                  <dd className={styles.extraValue}>{x.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {p.note && <p className={styles.note}>{p.note}</p>}
        {p.link && (
          <Link
            href={p.link.href}
            className={clsx(
              styles.link,
              p.linkStyle === 'button' ? styles.linkButton : styles.linkUnderline,
            )}
          >
            {p.link.label}
            <ArrowIcon className={styles.linkArrow} />
          </Link>
        )}
      </div>
    </div>
  )
}

function ListTitle({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.listTitle}>{children}</h3>
}
