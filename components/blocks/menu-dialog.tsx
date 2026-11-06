'use client'

import { useRef } from 'react'
import { ArrowIcon } from '@/components/ui/icon'

type Props = { label: string; closeLabel: string; title: string; children: React.ReactNode }

// Bouton + fenêtre native <dialog> : Échap, focus et piège de focus sont gérés par le navigateur.
// Le contenu (menu complet) est rendu côté serveur ; seul l'ouverture et la fermeture passent par le client.
export function MenuDialog({ label, closeLabel, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        className="group/open text-ink border-forest-mid hover:text-forest-mid focus-visible:text-forest-mid inline-flex cursor-pointer items-center gap-2 border-0 border-b bg-transparent py-1 text-[16px] leading-[1.3] font-semibold"
      >
        {label}
        <ArrowIcon className="size-[17px] [transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover/open:translate-x-[5px] in-[article:hover]:translate-x-[5px]" />
      </button>
      <dialog
        ref={ref}
        aria-label={title}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="text-ink m-auto max-h-[calc(100vh-48px)] w-[min(640px,calc(100vw-32px))] overflow-auto rounded-[20px] border-0 bg-[#FAF7F2] p-0 shadow-[0_30px_80px_rgba(47,43,38,0.35)] backdrop:bg-[rgba(47,43,38,0.62)] open:animate-[dialog-in_0.35s_cubic-bezier(0.2,0.7,0.2,1)]"
      >
        <div className="relative px-11 pt-11 pb-9 max-md:px-[22px] max-md:pt-9 max-md:pb-7">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={closeLabel}
            className="text-ink hover:text-forest-mid hover:border-forest-mid focus-visible:text-forest-mid focus-visible:border-forest-mid absolute top-4 right-4 inline-flex size-[42px] cursor-pointer items-center justify-center rounded-full border border-[#E3D9CC] bg-white p-0"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {children}
        </div>
      </dialog>
    </>
  )
}
