'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'
import { SOFT } from '@/components/blocks/home-v2'
import { ArrowIcon } from '@/components/ui/icon'
import { submitLead } from '@/lib/lead/submit'

export type QuoteOption = { value: string; label: string; text?: string; price?: string }

export const label = 'text-[11px] font-bold tracking-[0.14em] text-[#B04A2A] uppercase'
export const control =
  'h-[54px] w-full rounded-xl border border-transparent bg-[rgba(240,235,227,1)] px-4 text-[15px] text-[rgba(85,80,68,1)] placeholder:text-[rgba(85,80,68,0.5)] [transition:border-color_0.2s_ease,background-color_0.2s_ease] hover:border-[#e3c4b6] focus:border-[#B04A2A] focus:bg-white focus:outline-none'

export function Field({
  id,
  text,
  className = '',
  children,
}: {
  id: string
  text: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <label htmlFor={id} className={label}>
        {text}
      </label>
      {children}
    </div>
  )
}

export type QuoteInquiryTexts = {
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
    setStatus(ok ? 'done' : 'error')
    if (ok) form.reset()
  }

  const done = status === 'done'

  return (
    <dialog
      ref={ref}
      aria-label={p.title}
      onClose={p.onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto max-h-[calc(100vh-32px)] w-[min(560px,calc(100vw-24px))] overflow-auto rounded-[20px] border-0 bg-white p-0 text-[rgba(85,80,68,1)] shadow-[0_30px_80px_rgba(47,43,38,0.35)] backdrop:bg-[rgba(47,43,38,0.62)] open:animate-[dialog-in_0.35s_cubic-bezier(0.2,0.7,0.2,1)]"
    >
      <div className="relative px-9 pt-9 pb-8 max-md:px-5 max-md:pt-8 max-md:pb-6">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={p.close}
          className="absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#e3d9cc] bg-white hover:border-[#B04A2A] hover:text-[#B04A2A]"
        >
          <X aria-hidden className="size-[18px]" />
        </button>

        {!done && !direct && (
          <div className="mb-6 pr-10">
            <p className={label}>{p.step.replace('{n}', String(step))}</p>
            <div className="mt-2 flex gap-1.5" aria-hidden>
              {[1, 2].map((n) => (
                <span
                  key={n}
                  className={`h-1 flex-1 rounded-full ${n <= step ? 'bg-[#B04A2A]' : 'bg-[#eadfd3]'}`}
                />
              ))}
            </div>
          </div>
        )}

        {done ? (
          <div className="flex flex-col items-start gap-4 py-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#7D472C] text-white">
              <Check aria-hidden className="size-6" strokeWidth={3} />
            </span>
            <h2 className="font-display m-0 text-[28px] leading-[1.15] font-semibold">
              {p.kicker}
            </h2>
            <p className={`text-[15px] leading-[1.6] ${SOFT}`}>{p.success}</p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="rounded-pill h-[48px] cursor-pointer bg-[#B04A2A] px-7 text-[15px] font-semibold text-white hover:bg-[#8F3B20]"
            >
              {p.close}
            </button>
          </div>
        ) : step === 1 ? (
          <div>
            <h2 className="font-display m-0 pr-10 text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] max-md:text-[24px]">
              {p.pickTitle}
            </h2>
            <p className={`mt-2 mb-6 text-[15px] leading-[1.5] ${SOFT}`}>{p.pickIntro}</p>
            <div role="radiogroup" aria-label={p.pickTitle} className="grid gap-3">
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
                  className="flex w-full cursor-pointer items-start justify-between gap-4 rounded-[16px] border-2 border-[#e3d9cc] bg-white p-5 text-left transition-colors hover:border-[#B04A2A]"
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-[20px] leading-[1.15] font-semibold">
                      {o.label}
                    </span>
                    {o.text && <span className={`text-[14px] ${SOFT}`}>{o.text}</span>}
                  </span>
                  {o.price && (
                    <strong className="flex-none text-[16px] font-bold whitespace-nowrap text-[#B04A2A]">
                      {o.price}
                    </strong>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="font-display m-0 pr-10 text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] max-md:text-[24px]">
              {p.infoTitle}
            </h2>
            {picked && (
              <p className="mt-3 inline-flex items-center gap-3 rounded-full bg-[#B04A2A]/10 py-1.5 pr-2 pl-4 text-[14px] font-semibold text-[#B04A2A]">
                {picked.label}
                {picked.price && <span className="font-normal">· {picked.price}</span>}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="cursor-pointer rounded-full bg-white px-3 py-1 text-[12px] font-semibold hover:bg-[#B04A2A] hover:text-white"
                >
                  {p.back}
                </button>
              </p>
            )}
            <p className={`mt-3 mb-6 text-[15px] leading-[1.6] ${SOFT}`}>{p.intro}</p>
            <form
              onSubmit={onSubmit}
              className="relative grid grid-cols-2 gap-4 max-md:grid-cols-1"
            >
              <Field id="cc-guests" text={f.guests}>
                <input
                  id="cc-guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={50}
                  inputMode="numeric"
                  required
                  className={control}
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
                  className={control}
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
                  className={control}
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
                  className={control}
                />
              </Field>
              <Field id="cc-email" text={f.email} className="col-span-2 max-md:col-span-1">
                <input
                  id="cc-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={f.emailPlaceholder}
                  className={control}
                />
              </Field>
              {/* Champ piège anti-spam : invisible, doit rester vide. */}
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="col-span-2 flex flex-col gap-3 max-md:col-span-1">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group rounded-pill inline-flex h-[54px] items-center justify-center gap-[10px] bg-[#B04A2A] px-8 text-base font-semibold whitespace-nowrap text-white [transition:background-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 hover:bg-[#8F3B20] disabled:opacity-70"
                >
                  {status === 'sending' ? p.sending : p.button}
                  <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[5px]" />
                </button>
                <p
                  role="status"
                  className={`text-[13px] leading-[1.5] ${status === 'error' ? 'font-semibold text-[#B04A2A]' : SOFT}`}
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
