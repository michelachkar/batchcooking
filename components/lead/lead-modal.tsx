'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Mail, Phone, User, X } from 'lucide-react'
import { ArrowIcon } from '@/components/ui/icon'
import type { LeadOpenOptions } from '@/components/lead/lead-provider'
import { submitLead } from '@/lib/lead/submit'
import { Switch } from '@/components/lead/switch'
import {
  DINNERS,
  euro,
  fromPrice,
  priceAfter,
  type Dinners,
  type PackId,
  type Period,
} from '@/lib/lead/pricing'

export type LeadPack = { id: PackId; title: string; label: string; features: string[] }

export type LeadTexts = {
  title: string
  step: string
  close: string
  compareTitle: string
  compareIntro: string
  from: string
  perWeek: string
  afterCredit: string
  periods: { week: string; month: string }
  dinners: string
  periodLabel: string
  dinnersLabel: string
  engagement: { week: string; month: string }
  configTitle: string
  contactTitle: string
  contactIntro: string
  firstNameLabel: string
  firstNamePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  submit: string
  sending: string
  back: string
  consent: string
  error: string
  doneTitle: string
  doneText: string
  doneButton: string
}

const field =
  'h-[54px] w-full rounded-xl border border-transparent bg-[rgba(240,235,227,1)] pr-4 pl-11 text-[15px] text-[rgba(85,80,68,1)] placeholder:text-[rgba(85,80,68,0.5)] [transition:border-color_0.2s_ease,background-color_0.2s_ease] hover:border-[#e3c4b6] focus:border-[#B04A2A] focus:bg-white focus:outline-none'
const labelCls = 'text-[11px] leading-[1.3] font-bold tracking-[0.14em] text-[#B04A2A] uppercase'
const h3Cls =
  'font-display m-0 text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] max-md:text-[24px]'

// Modal de demande de rappel (rendu une seule fois par <LeadProvider>).
// Ouvert avec une formule : coordonnées directement. Sans formule : comparaison des formules, puis coordonnées.
export function LeadModal({
  opts,
  texts,
  packs,
  onClose,
}: {
  opts: LeadOpenOptions
  texts: LeadTexts
  packs: LeadPack[]
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const direct = Boolean(opts.pack)
  const [step, setStep] = useState<1 | 2 | 3>(direct ? 2 : 1)
  const [pickId, setPickId] = useState<PackId>(opts.pack ?? packs[0].id)
  // Par défaut : 1 mois et 3 dîners, la combinaison la plus avantageuse.
  const [period, setPeriod] = useState<Period>(opts.period ?? 'month')
  const [dinners, setDinners] = useState<Dinners>(opts.dinners ?? DINNERS[0])
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
  }, [])

  const pick = packs.find((p) => p.id === pickId) ?? packs[0]
  // Étape 1 : prix d'appel ; étape 2 : prix exact de la combinaison choisie.
  const priceText = (id: PackId) =>
    step === 1
      ? `${texts.from} ${euro(fromPrice(id))} € ${texts.perWeek}`
      : `${euro(priceAfter(id, period, dinners))} € ${texts.perWeek}`

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setStatus('sending')
    const ok = await submitLead({
      source: 'formula-modal',
      service: 'batch',
      firstName: String(f.get('firstName') ?? ''),
      email: String(f.get('email') ?? ''),
      phone: String(f.get('phone') ?? ''),
      website: String(f.get('website') ?? ''),
      pack: pick.id,
      period,
      dinners,
      price: euro(priceAfter(pick.id, period, dinners)),
    })
    setStatus(ok ? 'idle' : 'error')
    if (ok) setStep(3)
  }

  return (
    <dialog
      ref={ref}
      aria-label={texts.title}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto max-h-[calc(100vh-32px)] w-[min(560px,calc(100vw-24px))] overflow-auto rounded-[20px] border-0 bg-white p-0 text-[rgba(85,80,68,1)] shadow-[0_30px_80px_rgba(47,43,38,0.35)] backdrop:bg-[rgba(47,43,38,0.62)] open:animate-[dialog-in_0.35s_cubic-bezier(0.2,0.7,0.2,1)]"
    >
      <div className="relative px-9 pt-9 pb-8 max-md:px-5 max-md:pt-8 max-md:pb-6">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={texts.close}
          className="absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#e3d9cc] bg-white text-[rgba(85,80,68,1)] hover:border-[#B04A2A] hover:text-[#B04A2A]"
        >
          <X aria-hidden className="size-[18px]" />
        </button>

        {step < 3 && !direct && (
          <div className="mb-6">
            <p className={labelCls}>{texts.step.replace('{n}', String(step))}</p>
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

        {step === 1 && (
          <div>
            <h3 className={h3Cls}>{texts.compareTitle}</h3>
            <p className="mt-2 text-[15px] leading-[1.5] text-[rgba(85,80,68,0.88)]">
              {texts.compareIntro}
            </p>
            <div role="radiogroup" aria-label={texts.compareTitle} className="mt-6 grid gap-3">
              {packs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={pickId === p.id}
                  onClick={() => {
                    setPickId(p.id)
                    setStep(2)
                  }}
                  className="group flex w-full cursor-pointer flex-col gap-3 rounded-[16px] border-2 border-[#e3d9cc] bg-white p-5 text-left transition-colors hover:border-[#B04A2A]"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-[22px] leading-[1.15] font-semibold">
                        {p.title}
                      </span>
                      <span className="text-[14px] text-[rgba(85,80,68,0.88)]">{p.label}</span>
                    </span>
                    <span className="flex flex-none flex-col items-end text-right">
                      <strong className="text-[17px] font-bold whitespace-nowrap text-[#B04A2A]">
                        {priceText(p.id)}
                      </strong>
                      <span className="text-[12px] text-[rgba(85,80,68,0.7)]">
                        {texts.afterCredit}
                      </span>
                    </span>
                  </span>
                  <ul className="m-0 grid list-none gap-1.5 p-0">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[14px] leading-[1.4]">
                        <Check
                          aria-hidden
                          className="mt-0.5 size-4 flex-none text-[#7D472C]"
                          strokeWidth={3}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ArrowIcon className="size-[18px] self-end text-[#B04A2A] [transition:translate_0.3s_ease] group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={submit}>
            <h3 className={h3Cls}>{texts.configTitle}</h3>
            <p className="mt-2 inline-block rounded-full bg-[#B04A2A]/10 px-3 py-1 text-[13px] font-semibold text-[#B04A2A]">
              {pick.title} · {priceText(pick.id)}
            </p>
            <div className="mt-4 flex flex-wrap items-start gap-x-6 gap-y-3">
              <Switch
                label={texts.periodLabel}
                value={period}
                onChange={setPeriod}
                options={[
                  { value: 'week', text: texts.periods.week },
                  { value: 'month', text: texts.periods.month },
                ]}
              />
              <Switch
                label={texts.dinnersLabel}
                value={dinners}
                onChange={setDinners}
                options={DINNERS.map((n) => ({
                  value: n,
                  text: texts.dinners.replace('{n}', String(n)),
                }))}
              />
            </div>
            <p className="mt-3 text-[14px] leading-[1.5] font-semibold">
              {texts.engagement[period]}
            </p>
            <h4 className="font-display mt-6 mb-0 border-t border-[#eadfd3] pt-6 text-[22px] leading-[1.2] font-semibold">
              {texts.contactTitle}
            </h4>
            <p className="mt-2 text-[15px] leading-[1.5]">{texts.contactIntro}</p>
            <div className="mt-5 grid gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-firstname" className={labelCls}>
                  {texts.firstNameLabel}
                </label>
                <span className="relative block">
                  <User
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-[15px] size-[19px] -translate-y-1/2 text-[#B04A2A]"
                  />
                  <input
                    id="lead-firstname"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    maxLength={60}
                    placeholder={texts.firstNamePlaceholder}
                    className={field}
                  />
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-email" className={labelCls}>
                  {texts.emailLabel}
                </label>
                <span className="relative block">
                  <Mail
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-[15px] size-[19px] -translate-y-1/2 text-[#B04A2A]"
                  />
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={texts.emailPlaceholder}
                    className={field}
                  />
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-phone" className={labelCls}>
                  {texts.phoneLabel}
                </label>
                <span className="relative block">
                  <Phone
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-[15px] size-[19px] -translate-y-1/2 text-[#B04A2A]"
                  />
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    required
                    minLength={8}
                    autoComplete="tel"
                    placeholder={texts.phonePlaceholder}
                    className={field}
                  />
                </span>
              </div>
              {/* Champ piège anti-spam : invisible pour les personnes. */}
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] size-px opacity-0"
              />
            </div>
            {status === 'error' && (
              <p role="alert" className="mt-4 text-[14px] font-semibold text-[#B04A2A]">
                {texts.error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group rounded-pill mt-6 inline-flex h-[54px] w-full cursor-pointer items-center justify-center gap-[10px] border-0 bg-[#B04A2A] px-7 text-base font-semibold text-white [transition:background-color_0.25s_ease] hover:bg-[#8F3B20] disabled:opacity-70"
            >
              {status === 'sending' ? texts.sending : texts.submit}
              <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[5px]" />
            </button>
            <p className="mt-3 text-[12px] leading-[1.5] text-[rgba(85,80,68,0.7)]">
              {texts.consent}
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-3 cursor-pointer border-0 border-b border-current bg-transparent p-0 py-1 text-[14px] font-semibold text-[rgba(85,80,68,1)] hover:text-[#B04A2A]"
            >
              {texts.back}
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="py-4 text-center">
            <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-[#7D472C] text-white">
              <Check aria-hidden className="size-8" strokeWidth={3} />
            </span>
            <h3 className={`${h3Cls} mt-5`}>{texts.doneTitle}</h3>
            <p className="mx-auto mt-3 max-w-[26rem] text-[16px] leading-[1.6]">{texts.doneText}</p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="rounded-pill mt-6 inline-flex h-[50px] cursor-pointer items-center justify-center border-0 bg-[#B04A2A] px-8 text-base font-semibold text-white hover:bg-[#8F3B20]"
            >
              {texts.doneButton}
            </button>
          </div>
        )}
      </div>
    </dialog>
  )
}
