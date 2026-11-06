import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './post-nav.module.css'
import { CptAnim } from '@/components/blocks/cpt-anim'

type Item = { label: string; title: string; href: string }

// Navigation « précédent / suivant » sous un contenu (services, membres, articles, réalisations).
export function PostNav({ prev, next }: { prev?: Item; next?: Item }) {
  if (!prev && !next) return null
  return (
    <nav>
      <div className="container-x">
        <CptAnim />
        <div data-cm-section="fade-up" className={styles.row}>
          {prev && (
            <Link href={prev.href} className={styles.link}>
              <span className={clsx(styles.arrow, styles.arrowPrev)}>
                <ArrowLeft className={styles.icon} aria-hidden />
              </span>
              <span className={styles.text}>
                <span className={styles.label}>{prev.label}</span>
                <span className={styles.title}>{prev.title}</span>
              </span>
            </Link>
          )}
          {next && (
            <Link href={next.href} className={clsx(styles.link, styles.next)}>
              <span className={styles.text}>
                <span className={styles.label}>{next.label}</span>
                <span className={styles.title}>{next.title}</span>
              </span>
              <span className={clsx(styles.arrow, styles.arrowNext)}>
                <ArrowRight className={styles.icon} aria-hidden />
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
