'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { QuoteInquiry, type QuoteInquiryTexts } from '@/components/blocks/quote-inquiry'
import { useLead } from '@/components/lead/lead-provider'
import styles from './quote-provider.module.css'

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
      className={styles.root}
    >
      <div className={styles.panel}>
        <button
          type="button"
          onClick={() => el?.close()}
          aria-label={texts.close}
          className={styles.close}
        >
          <X aria-hidden className={styles.closeIcon} />
        </button>
        <h2 className={styles.title}>{texts.title}</h2>
        <p className={styles.intro}>{texts.intro}</p>
        <ul className={styles.list}>
          {texts.services.map((s) => (
            <li key={s.id}>
              <button type="button" onClick={() => onPick(s.id)} className={styles.service}>
                <span className={styles.serviceTitle}>{s.title}</span>
                <span className={styles.serviceText}>{s.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}
