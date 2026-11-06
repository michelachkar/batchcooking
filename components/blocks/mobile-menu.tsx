'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type MobileNavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

type Props = {
  items: MobileNavItem[]
  brand: string
  labels: { open: string; close: string; toggle: string }
}

// Seul composant client du header : le panneau latéral du menu mobile (≤ 1024 px).
// <dialog> natif : piège à focus, Échap et fond inerte sans dépendance (voir DEPENDENCIES.md).
export function MobileMenu({ items, brand, labels }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const close = () => dialog.current?.close()

  return (
    <>
      <button
        type="button"
        aria-label={labels.open}
        aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.showModal()
          setOpen(true)
        }}
        className="relative mt-[4.8px] block h-[22.5px] w-[30px] before:absolute before:-inset-3 before:content-[''] md:mt-0"
      >
        {/* Ouvert, les trois traits deviennent une croix (visible sous le fond, comme dans la démo). */}
        <span aria-hidden className="grid gap-[8.25px]">
          <span
            className={cn(
              'bg-ink h-[2px] transition-transform duration-300 ease-[ease]',
              open && 'translate-y-[10.25px] rotate-45',
            )}
          />
          <span
            className={cn(
              'bg-ink h-[2px] transition-opacity duration-300 ease-[ease]',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'bg-ink h-[2px] transition-transform duration-300 ease-[ease]',
              open && '-translate-y-[10.25px] -rotate-45',
            )}
          />
        </span>
      </button>
      <dialog
        ref={dialog}
        aria-label={brand}
        onClose={() => setOpen(false)}
        // un clic sur le fond (le <dialog> lui-même) ferme le panneau
        onClick={(e) => e.target === e.currentTarget && close()}
        className="mtsh-drawer m-0 h-full max-h-none w-[300px] max-w-none overflow-y-auto bg-[#111] px-[30px] pt-[70px] pb-[30px] text-white shadow-[5px_0_15px_rgba(0,0,0,0.5)]"
      >
        <button
          type="button"
          aria-label={labels.close}
          onClick={close}
          className="absolute top-5 left-[263px] block h-[18px] w-[17px] transition-transform duration-300 ease-[ease] before:absolute before:-inset-3 before:content-[''] hover:rotate-90"
        >
          <svg viewBox="0 0 17 18" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden>
            <path d="M2.2 2.2 14.8 15.8M14.8 2.2 2.2 15.8" />
          </svg>
        </button>
        <div className="font-display mb-10 h-[56px] w-full border-b border-white/15 pb-5 text-[34px] leading-[35px] font-semibold tracking-tight">
          {brand}
        </div>
        <nav>
          <ul>
            {items.map((item) => (
              <li key={item.label} className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="block flex-1 py-[10px] text-base leading-6 text-white"
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`${labels.toggle} ${item.label}`}
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="grid h-[44px] w-9 place-items-center pt-[5px]"
                    >
                      <svg
                        width="9"
                        height="7"
                        viewBox="0 0 9 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden
                        className={cn(
                          'transition-transform duration-300 ease-[ease]',
                          expanded === item.label && 'rotate-180',
                        )}
                      >
                        <path d="M.75 2.25 4.5 6 8.25 2.25" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && (
                  // slideDown/slideUp jQuery de 200 ms (easing swing), rendu par grid-rows
                  <div
                    className={cn(
                      'grid transition-[grid-template-rows,visibility] duration-200 ease-[cubic-bezier(0.445,0.05,0.55,0.95)]',
                      expanded === item.label
                        ? 'visible grid-rows-[1fr]'
                        : 'invisible grid-rows-[0fr]',
                    )}
                  >
                    <ul className="overflow-hidden pl-5">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            tabIndex={expanded === item.label ? undefined : -1}
                            className="block py-[6px] text-[15px] leading-[22.5px] font-medium text-white"
                            onClick={close}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </>
  )
}
