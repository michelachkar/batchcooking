import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { DualHeader } from '@/components/blocks/dual-header'
import { AnimatedButton } from '@/components/ui/animated-button'
import styles from './occasions.module.css'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type Occasion = { href: string; image: Img; popup?: Img; name: string; description: string }

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  occasions: Occasion[]
  button: { label: string; href: string }
  /** Espace au-dessus du titre, en px (80 sur l'accueil). */
  topSpacer?: number
  /** Titre sur toute la largeur en tablette (page équipe) au lieu de 476 px (accueil). */
  wideHeader?: boolean
}

// Section « occasions » : titre, quatre cartes photo (une image découpée surgit au survol) et bouton.
export function Occasions({
  kicker,
  title,
  highlight,
  description,
  occasions,
  button,
  topSpacer = 80,
  wideHeader = false,
}: Props) {
  return (
    <section data-section="occasions" className={styles.root}>
      <div className={styles.inner}>
        <div style={{ height: topSpacer }} aria-hidden />
        <DualHeader
          size="compact"
          kicker={kicker}
          title={title}
          highlight={highlight}
          description={description}
          className={clsx(styles.header, wideHeader ? styles.headerWide : styles.headerNarrow)}
        />
        <div className={styles.spacerSm} aria-hidden />
        <div className={styles.grid}>
          {occasions.map((o) => (
            <Link key={o.name} href={o.href} className={styles.card}>
              <div className={styles.frame}>
                <Image
                  src={o.image.src}
                  alt=""
                  width={o.image.width}
                  height={o.image.height}
                  unoptimized={o.image.unoptimized}
                  sizes="(min-width: 1025px) 25vw, 50vw"
                  className={styles.photo}
                />
                <div className={styles.shade} />
                <div className={styles.caption}>
                  <h3 className={styles.name}>{o.name}</h3>
                  <p className={styles.description}>{o.description}</p>
                </div>
              </div>
              {o.popup && (
                <Image
                  src={o.popup.src}
                  alt=""
                  width={o.popup.width}
                  height={o.popup.height}
                  unoptimized={o.popup.unoptimized}
                  sizes="25vw"
                  className={styles.popup}
                />
              )}
            </Link>
          ))}
        </div>
        <div className={styles.spacerMd} aria-hidden />
        <div className={styles.cta}>
          <AnimatedButton href={button.href}>{button.label}</AnimatedButton>
        </div>
        <div className={styles.spacerLg} aria-hidden />
      </div>
    </section>
  )
}
