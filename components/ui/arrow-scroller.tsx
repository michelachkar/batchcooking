'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './arrow-scroller.module.css'

// Liste horizontale à défilement par flèches (précédent / suivant), une carte à la fois.
// Le défilement tactile et clavier reste possible ; les flèches se désactivent aux extrémités.
export function ArrowScroller({
  label,
  prev,
  next,
  children,
}: {
  label: string
  prev: string
  next: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false, current: 1, total: 0 })

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const total = el.children.length
    const card = el.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = card ? card.offsetWidth + gap : 1
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
    setEdge({
      start: el.scrollLeft <= 1,
      end,
      // Numéro de la première carte visible ; au bout de la liste, la dernière.
      current: end ? total : Math.min(total, Math.round(el.scrollLeft / step) + 1),
      total,
    })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = ref.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <div className={styles.root}>
      <ul ref={ref} className={styles.track} aria-label={label} onScroll={update}>
        {children}
      </ul>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={() => go(-1)}
          disabled={edge.start}
          aria-label={prev}
        >
          <ChevronLeft aria-hidden className={styles.icon} />
        </button>
        <p
          className={styles.counter}
          aria-live="polite"
          aria-atomic="true"
          style={edge.total ? undefined : { visibility: 'hidden' }}
        >
          <span className={styles.current}>{edge.current}</span>
          <span className={styles.separator} aria-hidden>
            /
          </span>
          <span>{edge.total}</span>
        </p>
        <button
          type="button"
          className={styles.button}
          onClick={() => go(1)}
          disabled={edge.end}
          aria-label={next}
        >
          <ChevronRight aria-hidden className={styles.icon} />
        </button>
      </div>
    </div>
  )
}
