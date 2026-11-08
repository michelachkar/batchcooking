import Link from 'next/link'
import clsx from 'clsx'
import { RevealObserver } from '@/components/ui/reveal-observer'
import { ArrowIcon } from '@/components/ui/icon'
import styles from './tarifs-category.module.css'
import { SERVICE_ICONS, type ServiceIconName } from '@/components/ui/icon-registry'

// Bandeau de catégorie de la page Tarifs : nomme le service auquel se rapportent les tarifs qui suivent.
export function TarifCategory(p: {
  id: string
  icon: ServiceIconName
  tone: 'white' | 'beige' | 'sand'
  label: string
  title: string
  text: string
  link: { label: string; href: string }
}) {
  const Icon = SERVICE_ICONS[p.icon]
  return (
    <section
      id={p.id}
      data-section={`tarifs-${p.id}`}
      className={clsx(styles.root, styles[p.tone])}
    >
      <RevealObserver />
      <div className={styles.inner}>
        <div className={styles.intro} data-reveal="up">
          <span className={styles.badge}>
            <Icon aria-hidden className={styles.glyph} strokeWidth={1.6} />
          </span>
          <div>
            <p className={styles.label}>{p.label}</p>
            <h2 className={styles.title}>{p.title}</h2>
            <p className={styles.text}>{p.text}</p>
          </div>
        </div>
        <Link href={p.link.href} className={styles.link} data-reveal="up">
          {p.link.label}
          <ArrowIcon className={styles.arrow} />
        </Link>
      </div>
    </section>
  )
}
