import Link from 'next/link'
import { site } from '@/lib/site'
import clsx from 'clsx'
import styles from './logo.module.css'

// Marque : une table ronde vue de dessus, entourée de six convives (la tribu).
function Mark() {
  const people = Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180
    return { x: 48 + 27 * Math.cos(a), y: 48 + 27 * Math.sin(a) }
  })
  return (
    <svg viewBox="12 12 72 72" aria-hidden className={styles.mark}>
      <circle cx="48" cy="48" r="15" className={styles.markFill} />
      <circle
        cx="48"
        cy="48"
        r="9.5"
        fill="none"
        stroke="#FAF7F2"
        strokeWidth="1.6"
        opacity="0.9"
      />
      {people.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5.2" className={styles.markFill} />
      ))}
    </svg>
  )
}

// Logo : marque, nom (affiché avec « & », écrit « et » dans le texte du site) et, si demandé, la signature. Le fichier autonome est dans public/assets/logo/table-et-tribu.svg.
export function Logo({ className, tagline }: { className?: string; tagline?: string }) {
  return (
    <Link
      href="/"
      aria-label={tagline ? `${site.name} : ${tagline}` : site.name}
      className={clsx(styles.root, className)}
    >
      <Mark />
      <span className={styles.text}>
        <span className={styles.name}>
          {site.name.split(' et ').map((part, i) => (
            <span key={i}>
              {i > 0 && <span className={styles.amp}>&amp;</span>}
              {part}
            </span>
          ))}
        </span>
        {tagline && <span className={styles.tagline}>{tagline}</span>}
      </span>
    </Link>
  )
}
