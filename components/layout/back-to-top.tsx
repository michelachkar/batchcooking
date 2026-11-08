'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './back-to-top.module.css'

type BackToTopProps = { label: string }

// Bouton « retour en haut » (fonction globale du thème) : visible au-delà de 300 px de défilement.
// La transition (0,3 s) n'existe que sur l'état visible : l'apparition se fond, la disparition est immédiate.
export function BackToTop({ label }: BackToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Défilement vers le haut en 300 ms (easing « swing »).
  const toTop = () => {
    const from = window.scrollY
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return window.scrollTo(0, 0)
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / 300, 1)
      window.scrollTo(0, from * (1 - (0.5 - Math.cos(p * Math.PI) / 2)))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={toTop}
      className={clsx(styles.button, visible && styles.visible)}
    >
      <svg viewBox="0 0 24 24" aria-hidden className={styles.icon}>
        <path d="M12 5l-8 8h5v6h6v-6h5z" />
      </svg>
    </button>
  )
}
