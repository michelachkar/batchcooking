'use client'

import { useEffect } from 'react'

// Déclencheur d'entrée du widget « dual-header » : pose `data-in` sur le bloc quand il apparaît (une seule fois),
// avec les réglages du thème (IntersectionObserver, rootMargin 0 0 -8 % 0, seuil 0,1). Ne rend rien.
export function DualHeaderObserver() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-dh]:not([data-in])')]
    if (els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            ;(e.target as HTMLElement).setAttribute('data-in', '')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
