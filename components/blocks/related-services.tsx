import Image from 'next/image'
import Link from 'next/link'
import { CptAnim } from '@/components/blocks/cpt-anim'
import { Icon, type IconName } from '@/components/ui/icon'
import styles from './related-services.module.css'

export type RelatedService = {
  title: string
  excerpt: string
  href: string
  icon: IconName
  image: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
}

// « Autres services » : cartes à pastille d'icône en haut à droite et photo 16/9 (widget « services core »).
export function RelatedServices({ title, items }: { title: string; items: RelatedService[] }) {
  if (items.length === 0) return null
  return (
    <section className={styles.root}>
      <div className="container-x">
        <CptAnim />
        <h2 data-cm-section="fade-up" className={styles.title}>
          {title}
        </h2>
        <div className={styles.band}>
          <div className={styles.inner}>
            <ul data-cm-grid className={styles.list}>
              {items.map((s) => (
                <li key={s.href} data-cm-item className={styles.item}>
                  <article className={styles.article}>
                    <span aria-hidden className={styles.corner} />
                    <span aria-hidden className={styles.circle}>
                      <Icon name={s.icon} className={styles.circleIcon} />
                    </span>
                    <div className={styles.card}>
                      <div className={styles.text}>
                        <h3 className={styles.cardTitle}>{s.title}</h3>
                        <p className={styles.excerpt}>{s.excerpt}</p>
                      </div>
                      <figure className={styles.figure}>
                        <Image
                          src={s.image.src}
                          alt={s.image.alt}
                          width={s.image.width}
                          height={s.image.height}
                          unoptimized={s.image.unoptimized}
                          sizes="(min-width: 1025px) 382px, 100vw"
                          className={styles.image}
                        />
                      </figure>
                    </div>
                    <Link href={s.href} aria-label={s.title} className={styles.link} />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
