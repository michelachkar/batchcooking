'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { QuoteInquiry, type QuoteInquiryTexts } from '@/components/blocks/quote-inquiry'
import { useLead } from '@/components/lead/lead-provider'

type Service = 'batch' | 'chef' | 'cours'

export type QuoteTexts = {
  title: string
  intro: string
  close: string
  services: { id: Service; title: string; text: string }[]
}

// Pages de service : le lien « #devis » d'une page ouvre directement le formulaire de son service.
const BY_PATH: [string, Service][] = [
  ['/services/batch-cooking', 'batch'],
  ['/services/chef-prive', 'chef'],
  ['/services/cours-de-cuisine', 'cours'],
]

// Point d'entrée unique des demandes de devis : tout lien se terminant par #devis (header, footer, boutons des pages)
// ouvre le formulaire du service de sa page, ou un choix de service ailleurs (accueil, contact, blog…).
// Sans JavaScript, ces liens mènent à /contact#devis.
export function QuoteProvider({
  texts,
  chef,
  cours,
  children,
}: {
  texts: QuoteTexts
  chef: QuoteInquiryTexts
  cours: QuoteInquiryTexts
  children: React.ReactNode
}) {
  const { open: openBatch } = useLead()
  const [choice, setChoice] = useState('')
  const [view, setView] = useState<'picker' | 'chef' | 'cours' | null>(null)

  // La fermeture d'un modal ne remet à zéro que si c'est encore lui qui est affiché (sinon, on vient d'en ouvrir un autre).
  const closeIf = (v: 'picker' | 'chef' | 'cours') => setView((cur) => (cur === v ? null : cur))

  const start = (s: Service | null, pre = '') => {
    setChoice(pre)
    if (s === 'batch') {
      setView(null)
      openBatch()
    } else setView(s ?? 'picker')
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.(
        'a[href$="#devis"]',
      ) as HTMLAnchorElement | null
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const path = new URL(a.href, location.href).pathname
      e.preventDefault()
      e.stopPropagation()
      const d = a.dataset
      start(BY_PATH.find(([p]) => path.endsWith(p))?.[1] ?? null, a.dataset.quoteChoice)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {children}
      <Picker
        texts={texts}
        open={view === 'picker'}
        onClose={() => closeIf('picker')}
        onPick={(s) => start(s)}
      />
      <QuoteInquiry
        {...chef}
        source="chef-form"
        service="chef"
        choice={choice}
        open={view === 'chef'}
        onClose={() => closeIf('chef')}
      />
      <QuoteInquiry
        {...cours}
        source="course-form"
        service="cours"
        choice={choice}
        open={view === 'cours'}
        onClose={() => closeIf('cours')}
      />
    </>
  )
}

function Picker({
  texts,
  open,
  onClose,
  onPick,
}: {
  texts: QuoteTexts
  open: boolean
  onClose: () => void
  onPick: (s: Service) => void
}) {
  const [el, setEl] = useState<HTMLDialogElement | null>(null)
  useEffect(() => {
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open, el])
  return (
    <dialog
      ref={setEl}
      aria-label={texts.title}
      onClose={onClose}
      onClick={(e) => e.target === el && el?.close()}
      className="m-auto max-h-[calc(100vh-32px)] w-[min(560px,calc(100vw-24px))] overflow-auto rounded-[20px] border-0 bg-white p-0 text-[rgba(85,80,68,1)] shadow-[0_30px_80px_rgba(47,43,38,0.35)] backdrop:bg-[rgba(47,43,38,0.62)] open:animate-[dialog-in_0.35s_cubic-bezier(0.2,0.7,0.2,1)]"
    >
      <div className="relative px-9 pt-9 pb-8 max-md:px-5 max-md:pt-8 max-md:pb-6">
        <button
          type="button"
          onClick={() => el?.close()}
          aria-label={texts.close}
          className="absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#e3d9cc] bg-white hover:border-[#B04A2A] hover:text-[#B04A2A]"
        >
          <X aria-hidden className="size-[18px]" />
        </button>
        <h2 className="font-display m-0 pr-10 text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] max-md:text-[24px]">
          {texts.title}
        </h2>
        <p className="mt-3 mb-6 text-[15px] leading-[1.6] text-[rgba(85,80,68,0.88)]">
          {texts.intro}
        </p>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {texts.services.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onPick(s.id)}
                className="group w-full cursor-pointer rounded-[14px] border border-[#e3d9cc] bg-[rgba(240,235,227,0.5)] p-5 text-left [transition:border-color_0.25s_ease,background-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 hover:border-[#B04A2A] hover:bg-white"
              >
                <span className="font-display block text-[20px] font-semibold">{s.title}</span>
                <span className="mt-1 block text-[14px] leading-[1.5] text-[rgba(85,80,68,0.88)]">
                  {s.text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}
