'use client'

import { useEffect, useRef, useState } from 'react'
import { ChefHat, X } from 'lucide-react'
import clsx from 'clsx'
import { ArrowIcon } from '@/components/ui/icon'
import { useLead } from '@/components/lead/lead-provider'
import { submitLead } from '@/lib/lead/submit'
import styles from './quote-inquiry.module.css'

export type QuoteOption = { value: string; label: string; text?: string; price?: string }

export function Field({
  id,
  text,
  className,
  children,
}: {
  id: string
  text: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {text}
      </label>
      {children}
    </div>
  )
}

export type QuoteInquiryTexts = {
  /** Service concerné et sous-titre : repris dans l'en-tête, comme le modal du batch cooking. */
  serviceName: string
  subtitle: string
  kicker: string
  title: string
  intro: string
  fields: Record<string, string>
  /** Formules proposées à l'étape 1 (la dernière peut être « autre », sans prix). */
  options: QuoteOption[]
  step: string
  pickTitle: string
  pickIntro: string
  infoTitle: string
  back: string
  button: string
  sending: string
  note: string
  success: string
  error: string
  close: string
}

// Demande de devis en deux étapes, commune aux cours et au chef privé :
// 1. choix de la formule (sauté si elle vient du bouton d'une carte) ; 2. participants, lieu, prénom, téléphone, email.
export function QuoteInquiry(
  p: QuoteInquiryTexts & {
    /** Origine de la demande et service concerné, transmis à /api/lead. */
    source: 'chef-form' | 'course-form'
    service: 'chef' | 'cours'
    /** Formule pré-sélectionnée (valeur de `options`), venant du bouton cliqué. */
    choice?: string
    open: boolean
    onClose: () => void
  },
) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [step, setStep] = useState<1 | 2>(1)
  const [pick, setPick] = useState<string>('')
  const { confirm } = useLead()
  const ref = useRef<HTMLDialogElement>(null)
  const f = p.fields
  const direct = Boolean(p.choice)
  const picked = p.options.find((o) => o.value === pick)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (p.open && !d.open) {
      setStatus('idle')
      setPick(p.choice ?? '')
      setStep(p.choice ? 2 : 1)
      d.showModal()
    }
    if (!p.open && d.open) d.close()
  }, [p.open, p.choice])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    const get = (k: string) => String(d.get(k) ?? '')
    setStatus('sending')
    const ok = await submitLead({
      source: p.source,
      service: p.service,
      choice: pick,
      guests: get('guests'),
      location: get('location'),
      firstName: get('firstName'),
      phone: get('phone'),
      email: get('email'),
      website: get('website'),
    })
    setStatus(ok ? 'idle' : 'error')
    if (ok) {
      form.reset()
      ref.current?.close()
      confirm(p.service) // modal de confirmation : les étapes suivantes
    }
  }

  return (
    <dialog
      ref={ref}
      aria-label={p.title}
      onClose={p.onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className={styles.root}
    >
      <header className={styles.header}>
        <span className={styles.headerIcon}>
          <ChefHat aria-hidden className={styles.headerIconSvg} strokeWidth={1.75} />
        </span>
        <span className={styles.headerText}>
          <strong className={styles.headerService}>{p.serviceName}</strong>
          <span className={styles.headerSub}>{p.subtitle}</span>
        </span>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={p.close}
          className={styles.close}
        >
          <X aria-hidden className={styles.closeIcon} />
        </button>
      </header>
      <div className={styles.panel}>
        {!direct && (
          <div className={styles.progress}>
            <p className={styles.label}>{p.step.replace('{n}', String(step))}</p>
            <div className={styles.bars} aria-hidden>
              {[1, 2].map((n) => (
                <span key={n} className={clsx(styles.bar, n <= step && styles.barActive)} />
              ))}
            </div>
          </div>
        )}

        {step === 1 ? (
          <div>
            <h2 className={styles.title}>{p.pickTitle}</h2>
            <p className={clsx(styles.pickIntro, styles.soft)}>{p.pickIntro}</p>
            <div role="radiogroup" aria-label={p.pickTitle} className={styles.options}>
              {p.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={pick === o.value}
                  onClick={() => {
                    setPick(o.value)
                    setStep(2)
                  }}
                  className={styles.option}
                >
                  <span className={styles.optionText}>
                    <span className={styles.optionTitle}>{o.label}</span>
                    {o.text && (
                      <span className={clsx(styles.optionDesc, styles.soft)}>{o.text}</span>
                    )}
                  </span>
                  {o.price && <strong className={styles.optionPrice}>{o.price}</strong>}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className={styles.title}>{p.infoTitle}</h2>
            {picked && (
              <div className={styles.picked}>
                <span className={styles.pickedBody}>
                  <span className={styles.pickedLabel}>{picked.label}</span>
                  {picked.price && <span className={styles.pickedPrice}>{picked.price}</span>}
                </span>
                <button type="button" onClick={() => setStep(1)} className={styles.change}>
                  {p.back}
                </button>
              </div>
            )}
            <p className={clsx(styles.intro, styles.soft)}>{p.intro}</p>
            <form onSubmit={onSubmit} className={styles.form}>
              <Field id="cc-guests" text={f.guests}>
                <input
                  id="cc-guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={50}
                  inputMode="numeric"
                  required
                  className={styles.control}
                />
              </Field>
              <Field id="cc-location" text={f.location}>
                <input
                  id="cc-location"
                  name="location"
                  type="text"
                  required
                  autoComplete="address-level2"
                  placeholder={f.locationPlaceholder}
                  className={styles.control}
                />
              </Field>
              <Field id="cc-name" text={f.name}>
                <input
                  id="cc-name"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder={f.namePlaceholder}
                  className={styles.control}
                />
              </Field>
              <Field id="cc-phone" text={f.phone}>
                <input
                  id="cc-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder={f.phonePlaceholder}
                  className={styles.control}
                />
              </Field>
              <Field id="cc-email" text={f.email} className={styles.fieldFull}>
                <input
                  id="cc-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={f.emailPlaceholder}
                  className={styles.control}
                />
              </Field>
              {/* Champ piège anti-spam : invisible, doit rester vide. */}
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className={styles.trap}
              />
              <div className={styles.actions}>
                <button type="submit" disabled={status === 'sending'} className={styles.submit}>
                  {status === 'sending' ? p.sending : p.button}
                  <ArrowIcon className={styles.submitArrow} />
                </button>
                <p
                  role="status"
                  className={clsx(
                    styles.status,
                    status === 'error' ? styles.statusError : styles.soft,
                  )}
                >
                  {status === 'error' ? p.error : p.note}
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </dialog>
  )
}
