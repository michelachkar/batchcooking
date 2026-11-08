import { Check, X } from 'lucide-react'
import clsx from 'clsx'
import styles from './mark-badge.module.css'

// Pastille « inclus » (coche verte) ou « non inclus » (croix) des comparatifs de formules.
export function MarkBadge({ mark }: { mark: 'yes' | 'no' }) {
  const Icon = mark === 'yes' ? Check : X
  return (
    <span className={clsx(styles.root, mark === 'yes' ? styles.yes : styles.no)}>
      <Icon aria-hidden className={styles.icon} strokeWidth={3} />
    </span>
  )
}
