import Link from 'next/link'
import clsx from 'clsx'
import styles from './animated-button.module.css'

// Bouton « solar » du widget animated-button : pilule verte, reflet qui balaie au survol, flèche qui s'envole.
export function AnimatedButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link href={href} className={clsx(styles.root, className)}>
      <span className={styles.label}>{children}</span>
      <span aria-hidden className={styles.arrow}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.arrowSvg}
        >
          <line x1="6" y1="18" x2="18" y2="6" />
          <polyline points="9 6 18 6 18 15" />
        </svg>
      </span>
    </Link>
  )
}
