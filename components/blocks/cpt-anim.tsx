'use client'

import { useEffect, useRef } from 'react'

// Révélations des pages « CPT » du thème (script mt-cpt-page-animations, GSAP ScrollTrigger) en Web Animations API :
//  - `data-cm-section="fade-up|fade-left|fade-in"` (+ `data-cm-dist`, `data-cm-delay`) : la section entre seule ;
//    avec `data-cm-children`, ses éléments `[data-cm-child]` entrent en cascade (`data-cm-stagger`, 0,08 s par défaut) ;
//  - `data-cm-grid` : les `[data-cm-item]` entrent en cascade de 0,1 s (50 px, déclenchement à 88 %).
// Durée 0,7 s, easing « power2.out », déclenchement quand le haut atteint 90 % de la fenêtre, une seule fois.
// Comme l'original, réservé aux écrans de 992 px et plus ; ignoré avec « réduire les animations ».
// À placer comme premier enfant du conteneur qui porte les éléments animés.
const EASE = 'cubic-bezier(0.5, 1, 0.89, 1)'

function from(preset: string, d: number): Keyframe {
  switch (preset) {
    case 'fade-left':
      return { opacity: 0, transform: `translateX(${d}px)` }
    case 'fade-in':
      return { opacity: 0 }
    default:
      return { opacity: 0, transform: `translateY(${d}px)` }
  }
}

export function CptAnim() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const scope = ref.current?.parentElement
    if (!scope) return
    const all = [
      ...scope.querySelectorAll<HTMLElement>('[data-cm-section],[data-cm-child],[data-cm-item]'),
    ]
    const enabled =
      window.matchMedia('(min-width: 992px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!enabled) {
      all.forEach((el) => el.setAttribute('data-cm-done', ''))
      return
    }

    const play = (
      els: HTMLElement[],
      preset: string,
      dist: number,
      delay: number,
      stagger: number,
    ) =>
      els.forEach((el, i) => {
        el.setAttribute('data-cm-done', '')
        el.animate([from(preset, dist), { opacity: 1, transform: 'none' }], {
          duration: 700,
          delay: (delay + i * stagger) * 1000,
          easing: EASE,
          fill: 'backwards',
        })
      })

    const watch = (el: HTMLElement, triggerPct: number, run: () => void) => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            // Déclenche aussi si l'élément est déjà passé au-dessus de la fenêtre (rechargement en milieu de page).
            if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
              run()
              io.disconnect()
            }
          }
        },
        { rootMargin: `0px 0px -${100 - triggerPct}% 0px` },
      )
      io.observe(el)
      return io
    }

    const observers: IntersectionObserver[] = []
    scope.querySelectorAll<HTMLElement>('[data-cm-section]').forEach((el) => {
      const preset = el.dataset.cmSection || 'fade-up'
      const dist = parseFloat(el.dataset.cmDist ?? '') || (el.dataset.cmDist === '0' ? 0 : 40)
      const delay = parseFloat(el.dataset.cmDelay ?? '') || 0
      const kids = el.hasAttribute('data-cm-children')
        ? [...el.querySelectorAll<HTMLElement>('[data-cm-child]')]
        : null
      const stagger = parseFloat(el.dataset.cmStagger ?? '') || 0.08
      observers.push(
        watch(el, 90, () =>
          kids ? play(kids, preset, dist, delay, stagger) : play([el], preset, dist, delay, 0),
        ),
      )
    })
    scope.querySelectorAll<HTMLElement>('[data-cm-grid]').forEach((el) => {
      const items = [...el.querySelectorAll<HTMLElement>('[data-cm-item]')]
      observers.push(watch(el, 88, () => play(items, 'fade-up', 50, 0, 0.1)))
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return <span ref={ref} hidden />
}
