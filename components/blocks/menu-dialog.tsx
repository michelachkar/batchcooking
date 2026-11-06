'use client'

import { useRef } from 'react'
import { ArrowIcon } from '@/components/ui/icon'
import styles from './menu-dialog.module.css'

type Props = { label: string; closeLabel: string; title: string; children: React.ReactNode }

// Bouton + fenêtre native <dialog> : Échap, focus et piège de focus sont gérés par le navigateur.
// Le contenu (menu complet) est rendu côté serveur ; seul l'ouverture et la fermeture passent par le client.
export function MenuDialog({ label, closeLabel, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        className={styles.open}
      >
        {label}
        <ArrowIcon className={styles.openArrow} />
      </button>
      <dialog
        ref={ref}
        aria-label={title}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className={styles.dialog}
      >
        <div className={styles.panel}>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={closeLabel}
            className={styles.close}
          >
            <svg viewBox="0 0 24 24" aria-hidden className={styles.closeIcon}>
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {children}
        </div>
      </dialog>
    </>
  )
}
