'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './mobile-menu.module.css'

export type MobileNavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

type MobileMenuProps = {
  items: MobileNavItem[]
  brand: string
  labels: { open: string; close: string; toggle: string }
}

// Seul composant client du header : le panneau latéral du menu mobile (≤ 1024 px).
// <dialog> natif : piège à focus, Échap et fond inerte sans dépendance (voir DEPENDENCIES.md).
export function MobileMenu({ items, brand, labels }: MobileMenuProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const close = () => dialog.current?.close()

  return (
    <>
      <button
        type="button"
        aria-label={labels.open}
        aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.showModal()
          setOpen(true)
        }}
        className={styles.burger}
      >
        {/* Ouvert, les trois traits deviennent une croix. */}
        <span aria-hidden className={styles.bars}>
          <span className={clsx(styles.bar, styles.barTop, open && styles.open)} />
          <span className={clsx(styles.bar, styles.barMiddle, open && styles.open)} />
          <span className={clsx(styles.bar, styles.barBottom, open && styles.open)} />
        </span>
      </button>
      <dialog
        ref={dialog}
        aria-label={brand}
        onClose={() => setOpen(false)}
        // un clic sur le fond (le <dialog> lui-même) ferme le panneau
        onClick={(e) => e.target === e.currentTarget && close()}
        className={styles.drawer}
      >
        <button type="button" aria-label={labels.close} onClick={close} className={styles.close}>
          <svg viewBox="0 0 17 18" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden>
            <path d="M2.2 2.2 14.8 15.8M14.8 2.2 2.2 15.8" />
          </svg>
        </button>
        <div className={styles.brand}>{brand}</div>
        <nav>
          <ul>
            {items.map((item) => (
              <li key={item.label} className={styles.item}>
                <div className={styles.row}>
                  <Link href={item.href} className={styles.link} onClick={close}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`${labels.toggle} ${item.label}`}
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className={styles.toggle}
                    >
                      <svg
                        width="9"
                        height="7"
                        viewBox="0 0 9 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden
                        className={clsx(styles.chevron, expanded === item.label && styles.open)}
                      >
                        <path d="M.75 2.25 4.5 6 8.25 2.25" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && (
                  // ouverture/fermeture en 200 ms, rendue par grid-rows
                  <div className={clsx(styles.sub, expanded === item.label && styles.open)}>
                    <ul className={styles.subList}>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            tabIndex={expanded === item.label ? undefined : -1}
                            className={styles.subLink}
                            onClick={close}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </>
  )
}
