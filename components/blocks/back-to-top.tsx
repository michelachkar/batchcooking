'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = { label: string }

// Bouton « retour en haut » (fonction globale du thème) : visible au-delà de 300 px de défilement.
// Comme dans Savrio, la transition (0,3 s) n'existe que sur l'état visible : l'apparition se fond, la disparition est immédiate.
export function BackToTop({ label }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Défilement vers le haut en 300 ms (jQuery animate, easing « swing »).
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
      className={cn(
        'fixed right-5 bottom-5 z-[999] flex size-11 items-center justify-center rounded-full bg-[#B04A2A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)]',
        visible
          ? 'pointer-events-auto opacity-100 transition-opacity duration-300 ease-[ease] motion-reduce:transition-none'
          : 'pointer-events-none opacity-0',
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-current">
        <path d="M12 5l-8 8h5v6h6v-6h5z" />
      </svg>
    </button>
  )
}
