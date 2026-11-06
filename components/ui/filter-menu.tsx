'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import styles from './filter-menu.module.css'

// Menu déroulant à cases à cocher (fermé par clic extérieur ou Échap).
export function FilterMenu<T extends string>(p: {
  label: string
  options: { value: T; text: string }[]
  selected: T[]
  onChange: (v: T) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const out = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', out)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', out)
      document.removeEventListener('keydown', esc)
    }
  }, [open])
  return (
    <div ref={ref} className={styles.root}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={clsx(styles.trigger, p.selected.length > 0 && styles.active)}
      >
        {p.label}
        {p.selected.length > 0 && <span className={styles.count}>{p.selected.length}</span>}
        <ChevronDown aria-hidden className={clsx(styles.chevron, open && styles.open)} />
      </button>
      {open && (
        <ul className={styles.panel}>
          {p.options.map((o) => {
            const on = p.selected.includes(o.value)
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => p.onChange(o.value)}
                  className={styles.option}
                >
                  <span className={clsx(styles.box, on && styles.checked)}>
                    {on && <Check aria-hidden className={styles.check} strokeWidth={3.5} />}
                  </span>
                  {o.text}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
