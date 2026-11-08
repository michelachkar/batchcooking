'use client'

import { useEffect, useRef } from 'react'

// Révélation au défilement du widget « about-us » : ajoute `in-view` à chaque [data-reveal] de la section
// quand il entre à l'écran (mêmes seuils que le script du widget), une seule fois.
export function RevealObserver() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const scope = ref.current?.closest('section')
    if (!scope) return
    const targets = scope.querySelectorAll<HTMLElement>('[data-reveal]:not(.in-view)')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return <span ref={ref} hidden />
}
