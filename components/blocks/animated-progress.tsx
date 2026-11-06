'use client'

import { useEffect, useRef, useState } from 'react'

export type ProgressStat = { label: string; value: number }

type Props = { stats: ProgressStat[]; className?: string }

// Barres de progression (widget « animated-progress ») : remplissage échelonné au premier passage à l'écran.
export function AnimatedProgress({ stats, className }: Props) {
  const ref = useRef<HTMLUListElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <ul ref={ref} className={className}>
      {stats.map((s, i) => (
        <li key={s.label} className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs leading-[1px] font-semibold text-[#1A1A1A] uppercase">
              {s.label}
            </span>
            <span className="font-bold text-[#1A1A1A]">{s.value}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={s.value}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={s.label}
            className="relative h-[5px] overflow-hidden rounded-full bg-black"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#B04A2A] shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-[width] duration-[1200ms] ease-out motion-reduce:transition-none motion-reduce:duration-0"
              style={{ width: visible ? `${s.value}%` : '0%', transitionDelay: `${i * 150}ms` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
