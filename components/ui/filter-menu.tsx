'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

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
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] font-semibold [transition:border-color_0.2s_ease] ${p.selected.length ? 'border-[#B04A2A] text-[#B04A2A]' : 'border-[#e3d9cc] text-[rgba(85,80,68,1)] hover:border-[rgba(85,80,68,0.4)]'}`}
      >
        {p.label}
        {p.selected.length > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-[#B04A2A] text-[13px] text-white">
            {p.selected.length}
          </span>
        )}
        <ChevronDown
          aria-hidden
          className={`size-4 [transition:rotate_0.2s_ease] ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className="absolute top-[calc(100%+8px)] left-0 z-20 min-w-[230px] rounded-[14px] border border-[#e3d9cc] bg-white p-2 shadow-[0_18px_40px_rgba(85,80,68,0.16)]">
          {p.options.map((o) => {
            const on = p.selected.includes(o.value)
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => p.onChange(o.value)}
                  className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[15px] text-[rgba(85,80,68,1)] hover:bg-[rgba(240,235,227,1)]"
                >
                  <span
                    className={`flex size-[18px] flex-none items-center justify-center rounded-[5px] border ${on ? 'border-[#B04A2A] bg-[#B04A2A] text-white' : 'border-[#cfc3b3]'}`}
                  >
                    {on && <Check aria-hidden className="size-3" strokeWidth={3.5} />}
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
