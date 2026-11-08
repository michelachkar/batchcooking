'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail } from 'lucide-react'
import clsx from 'clsx'
import { ModalShell } from '@/components/ui/modal-shell'
import styles from './confirmation-dialog.module.css'

export type ConfirmService = 'batch' | 'chef' | 'cours'

/** Envoie la demande avec l'e-mail saisi ; renvoie true si elle est acceptée. */
export type ConfirmSubmit = (email: string) => Promise<boolean>

export type ConfirmationTexts = {
  title: string
  subtitle: string
  nextLabel: string
  button: string
  ask: {
    title: string
    intro: string
    emailLabel: string
    emailPlaceholder: string
    emailHelp: string
    confirm: string
    sending: string
    error: string
  }
  services: Record<ConfirmService, { name: string; steps: { title: string; text: string }[] }>
}

// Modal ouvert au clic sur « Être rappelé(e) sous 24h ».
// 1. « ask » : les étapes suivantes et l'e-mail pour l'accusé de réception ; la demande n'est envoyée qu'à la confirmation.
// 2. « done » : confirmation animée (coche tracée, étapes qui apparaissent une à une).
// Sans `submit`, la demande est déjà partie : le modal s'ouvre directement sur la confirmation.
export function ConfirmationDialog({
  texts,
  service,
  close,
  subtitle,
  submit,
  onClose,
}: {
  texts: ConfirmationTexts
  service: ConfirmService
  /** Libellé accessible du bouton ✕. */
  close: string
  /** Sous-titre de l'en-tête (le même que sur les formulaires). */
  subtitle: string
  submit?: ConfirmSubmit
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [phase, setPhase] = useState<'ask' | 'done'>(submit ? 'ask' : 'done')
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const s = texts.services[service]

  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!submit) return
    const email = String(new FormData(e.currentTarget).get('email') ?? '')
    setStatus('sending')
    const ok = await submit(email)
    if (ok) setPhase('done')
    setStatus(ok ? 'idle' : 'error')
  }

  const done = phase === 'done'

  return (
    <ModalShell
      dialogRef={ref}
      onClose={onClose}
      title={s.name}
      subtitle={subtitle}
      closeLabel={close}
      labelledBy="confirm-title"
      narrow
    >
      <div className={styles.panel} role={done ? 'status' : undefined}>
        {done ? (
          <div className={styles.hero}>
            <span className={styles.badge}>
              <span aria-hidden className={styles.pulse} />
              <svg viewBox="0 0 52 52" aria-hidden className={styles.badgeSvg}>
                <circle className={styles.badgeCircle} cx="26" cy="26" r="23" />
                <path className={styles.badgeCheck} d="M15 27.5l7.5 7.5L37.5 19" />
              </svg>
            </span>
            <h2 id="confirm-title" className={styles.title}>
              {texts.title}
            </h2>
            <p className={styles.subtitle}>{texts.subtitle}</p>
          </div>
        ) : (
          <div className={styles.askHead}>
            <h2 id="confirm-title" className={clsx(styles.title, styles.titleAsk)}>
              {texts.ask.title}
            </h2>
            <p className={styles.subtitle}>{texts.ask.intro}</p>
          </div>
        )}

        <p className={clsx(styles.nextLabel, !done && styles.still)}>{texts.nextLabel}</p>
        <ol className={clsx(styles.steps, !done && styles.still)}>
          {s.steps.map((st, i) => (
            <li
              key={st.title}
              className={styles.step}
              data-state={done ? (i === 0 ? 'done' : i === 1 ? 'now' : 'next') : 'next'}
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className={styles.marker} aria-hidden>
                {done && i === 0 ? (
                  <svg viewBox="0 0 24 24" className={styles.markerCheck}>
                    <path d="M6 12.5l4 4 8-9" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className={styles.stepBody}>
                <strong className={styles.stepTitle}>{st.title}</strong>
                <span className={styles.stepText}>{st.text}</span>
              </span>
            </li>
          ))}
        </ol>

        {done ? (
          <button type="button" onClick={() => ref.current?.close()} className={styles.button}>
            {texts.button}
          </button>
        ) : (
          <form onSubmit={onSubmit} className={styles.ask}>
            <label htmlFor="confirm-email" className={styles.emailLabel}>
              {texts.ask.emailLabel}
            </label>
            <span className={styles.control}>
              <Mail aria-hidden className={styles.fieldIcon} />
              <input
                id="confirm-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={texts.ask.emailPlaceholder}
                aria-describedby="confirm-help"
                className={styles.input}
              />
            </span>
            <p id="confirm-help" className={styles.help}>
              {texts.ask.emailHelp}
            </p>
            {status === 'error' && (
              <p role="alert" className={styles.error}>
                {texts.ask.error}
              </p>
            )}
            <button type="submit" disabled={status === 'sending'} className={styles.button}>
              {status === 'sending' ? texts.ask.sending : texts.ask.confirm}
            </button>
          </form>
        )}
      </div>
    </ModalShell>
  )
}
