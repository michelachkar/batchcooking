'use client'

import { useRef } from 'react'
import { rich, typo } from '@/components/ui/rich-text'
import styles from './faq-accordion.module.css'

export type FaqItem = { question: string; answer: string }

// Ligne « **Service :** texte » : un service par ligne, présenté avec une pastille.
const SERVICE_LINE = /^\*\*(.+?:)\*\*\s*(.+)$/

const DURATION = 400
const EASING = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'

// Anime la hauteur d'un <details> (ouverture ou fermeture). Safari iOS ne gère pas ::details-content,
// d'où l'animation en JS.
function toggle(el: HTMLDetailsElement, open: boolean) {
  const summary = el.querySelector('summary') as HTMLElement
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.getAnimations().forEach((a) => a.cancel())
  if (reduce) {
    el.open = open
    return
  }
  const start = el.offsetHeight
  if (open) el.open = true
  const end = open ? el.scrollHeight : summary.offsetHeight + 2
  el.style.overflow = 'hidden'
  if (open) delete el.dataset.closing
  else el.dataset.closing = 'true'
  const anim = el.animate(
    { height: [`${start}px`, `${end}px`] },
    { duration: DURATION, easing: EASING },
  )
  anim.onfinish = () => {
    if (!open) {
      el.open = false
      delete el.dataset.closing
    }
    el.style.overflow = ''
  }
  anim.oncancel = () => {
    el.style.overflow = ''
  }
}

// Accordéon <details> : une seule question ouverte à la fois par groupe.
export function FaqAccordion({
  items,
  name,
  openFirst = true,
}: {
  items: FaqItem[]
  name: string
  openFirst?: boolean
}) {
  const root = useRef<HTMLDivElement>(null)

  const onClick = (e: React.MouseEvent<HTMLDetailsElement>) => {
    if (!(e.target as HTMLElement).closest('summary')) return
    e.preventDefault()
    const el = e.currentTarget
    const willOpen = !el.open || el.dataset.closing === 'true'
    if (willOpen) {
      root.current
        ?.querySelectorAll<HTMLDetailsElement>('details[open]')
        .forEach((d) => d !== el && toggle(d, false))
    }
    toggle(el, willOpen)
  }

  return (
    <div ref={root}>
      {items.map((item, i) => (
        <details
          key={item.question}
          data-group={name}
          onClick={onClick}
          open={openFirst && i === 0}
          className={styles.item}
        >
          <summary className={styles.question}>
            <span>{typo(item.question)}</span>
            <span className={styles.toggle} aria-hidden>
              <svg viewBox="8 0 16 16" className={styles.icon}>
                <rect x="8" y="6.5" width="16" height="3" />
                <rect x="14.5" y="0" width="3" height="16" className={styles.plusBar} />
              </svg>
            </span>
          </summary>
          <div className={styles.answer}>
            {item.answer.split('\n').map((line, n) => {
              const service = SERVICE_LINE.exec(line)
              return service ? (
                <div key={n} className={styles.service}>
                  <span className={styles.serviceLabel}>
                    {rich(service[1].replace(/\s*:$/, ''))}
                  </span>
                  <span className={styles.serviceText}>{rich(service[2])}</span>
                </div>
              ) : (
                <p key={n} className={styles.answerText}>
                  {rich(line)}
                </p>
              )
            })}
          </div>
        </details>
      ))}
    </div>
  )
}
