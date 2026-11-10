'use client'

import { useRef } from 'react'
import { CalendarDays, ChevronRight, X } from 'lucide-react'
import { useLead } from '@/components/features/lead/lead-provider'
import { euro, priceAfter, priceBefore } from '@/lib/lead/pricing'
import styles from './credit-note.module.css'

export type CreditNoteTexts = { value: string; title: string; note: string; cta: string }
export type CreditDialogTexts = {
  close: string
  title: string
  intro: string
  exampleKicker: string
  exampleTitle: string
  rows: { full: string; credit: string; pay: string }
  perWeek: string
  stepsTitle: string
  steps: { title: string; text: string }[]
  button: string
}

export const CREDIT_DIALOG_ID = 'credit-dialog'

// Ouvre le modal d'explication du crédit d'impôt (rendu une fois par <Hero>), depuis n'importe quel déclencheur.
export function CreditTrigger({
  children,
  ...rest
}: Omit<React.ComponentProps<'button'>, 'onClick' | 'type'>) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => document.querySelector<HTMLDialogElement>(`#${CREDIT_DIALOG_ID}`)?.showModal()}
      {...rest}
    >
      {children}
    </button>
  )
}

// Pastille « −50 % » du hero (sous les CTA).
export function CreditNote({ note }: { note: CreditNoteTexts }) {
  return (
    <CreditTrigger data-reveal="up" data-d="5" className={styles.note}>
      <span aria-hidden className={styles.value}>
        {note.value}
      </span>
      <span className={styles.text}>
        <strong className={styles.title}>{note.title}</strong>
        <span className={styles.sub}>{note.note}</span>
      </span>
      <span className={styles.more}>
        {note.cta}
        <ChevronRight aria-hidden className={styles.moreIcon} />
      </span>
    </CreditTrigger>
  )
}

// Modal explicatif. L'exemple chiffré lit les prix dans lib/lead/pricing (Signature, 3 dîners, 1 mois).
export function CreditDialog({ value, dialog }: { value: string; dialog: CreditDialogTexts }) {
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = useLead()
  const full = priceBefore('signature', 'month', 3)
  const pay = priceAfter('signature', 'month', 3)
  return (
    <dialog
      ref={ref}
      id={CREDIT_DIALOG_ID}
      aria-label={dialog.title}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className={styles.dialog}
    >
      <button
        type="button"
        onClick={() => ref.current?.close()}
        aria-label={dialog.close}
        className={styles.close}
      >
        <X aria-hidden className={styles.closeIcon} />
      </button>
      <div className={styles.panel}>
        <span aria-hidden className={styles.stamp}>
          {value}
        </span>
        <h3 className={styles.dialogTitle}>{dialog.title}</h3>
        <p className={styles.intro}>{dialog.intro}</p>

        <div className={styles.example}>
          <p className={styles.kicker}>{dialog.exampleKicker}</p>
          <p className={styles.exampleTitle}>{dialog.exampleTitle}</p>
          <dl className={styles.rows}>
            <div className={styles.row}>
              <dt>{dialog.rows.full}</dt>
              <dd>{euro(full)} €</dd>
            </div>
            <div className={styles.row}>
              <dt>{dialog.rows.credit}</dt>
              <dd className={styles.minus}>−{euro(full - pay)} €</dd>
            </div>
            <div className={`${styles.row} ${styles.total}`}>
              <dt>{dialog.rows.pay}</dt>
              <dd>
                {euro(pay)} € <span className={styles.per}>{dialog.perWeek}</span>
              </dd>
            </div>
          </dl>
        </div>

        <p className={styles.kicker}>{dialog.stepsTitle}</p>
        <ol className={styles.steps}>
          {dialog.steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.marker}>{i + 1}</span>
              <span className={styles.stepBody}>
                <strong className={styles.stepTitle}>{s.title}</strong>
                <span className={styles.stepText}>{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={styles.cta}
          onClick={() => {
            ref.current?.close()
            open({})
          }}
        >
          <CalendarDays aria-hidden size={20} strokeWidth={2} />
          {dialog.button}
        </button>
      </div>
    </dialog>
  )
}
