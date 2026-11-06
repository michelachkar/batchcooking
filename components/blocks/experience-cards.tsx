import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { BadgePercent } from 'lucide-react'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'
import styles from './experience-cards.module.css'

export type ExperienceCard = {
  title: string
  text: string
  meta: string
  tag?: string
  icon?: IconName
  linkText: string
  href: string
  image: { src: string; width: number; height: number; unoptimized?: boolean }
  alt: string
}

type Props = { kicker: string; title: string; intro: string; cards: ExperienceCard[] }

// Cartes d'expériences : grandes cartes photo (3 colonnes, 2 en tablette, 1 en mobile), reprises du widget « experience-cards ».
// Chaque carte est cliquable en entier via le lien (zone étirée).
export function ExperienceCards({ kicker, title, intro, cards }: Props) {
  return (
    <section data-section="experiences" className={styles.root}>
      <div className={styles.band}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div>
              <p className={styles.kicker}>{kicker}</p>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <p className={styles.intro}>{intro}</p>
          </header>
          <div className={styles.grid}>
            {cards.map((c, i) => (
              <article key={c.title} className={styles.card}>
                <Image
                  src={c.image.src}
                  alt={c.alt}
                  width={c.image.width}
                  height={c.image.height}
                  unoptimized={c.image.unoptimized}
                  sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.image}
                />
                {c.icon && (
                  <span className={styles.iconBadge}>
                    <Icon name={c.icon} className={styles.iconBadgeSvg} />
                  </span>
                )}
                <div className={styles.chips}>
                  <span className={clsx(styles.chip, styles.meta)}>{c.meta}</span>
                  {c.tag && (
                    <span className={clsx(styles.chip, styles.tag)}>
                      <BadgePercent aria-hidden className={styles.tagIcon} strokeWidth={2} />
                      {c.tag}
                    </span>
                  )}
                </div>
                <div className={styles.content}>
                  <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.text}>{c.text}</p>
                  <Link href={c.href} className={styles.link}>
                    {c.linkText}
                    <ArrowIcon className={styles.linkArrow} />
                    <span aria-hidden className={styles.stretch} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
