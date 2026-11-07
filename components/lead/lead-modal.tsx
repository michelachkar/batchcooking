'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChefHat, Phone, User, X } from 'lucide-react'
import clsx from 'clsx'
import { ArrowIcon } from '@/components/ui/icon'
import type { LeadOpenOptions } from '@/components/lead/lead-provider'
import { submitLead } from '@/lib/lead/submit'
import { Switch } from '@/components/lead/switch'
import type { ConfirmationTexts, ConfirmSubmit } from '@/components/lead/confirmation-dialog'
import styles from './lead-modal.module.css'
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
  /** Service concerné, rappelé en tête de chaque étape. */
  service: string
  subtitle: string
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
  confirmation: ConfirmationTexts
}

// Modal de demande de rappel (rendu une seule fois par <LeadProvider>).
// Ouvert avec une formule : coordonnées directement. Sans formule : comparaison des formules, puis coordonnées.
export function LeadModal({
  opts,
  texts,
  packs,
  onClose,
  onConfirm,
}: {
  opts: LeadOpenOptions
  texts: LeadTexts
  packs: LeadPack[]
  onClose: () => void
  /** Clic sur le CTA : le provider ferme ce modal et ouvre « étapes suivantes + e-mail » ; la demande part à la confirmation. */
  onConfirm: (submit: ConfirmSubmit) => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const direct = Boolean(opts.pack)
  const [step, setStep] = useState<1 | 2>(direct ? 2 : 1)
  const [pickId, setPickId] = useState<PackId>(opts.pack ?? packs[0].id)
  // Par défaut : 1 mois et 3 dîners, la combinaison la plus avantageuse.
  const [period, setPeriod] = useState<Period>(opts.period ?? 'month')
  const [dinners, setDinners] = useState<Dinners>(opts.dinners ?? DINNERS[0])

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

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const data = {
      firstName: String(f.get('firstName') ?? ''),
      phone: String(f.get('phone') ?? ''),
      website: String(f.get('website') ?? ''),
      pack: pick.id,
      period,
      dinners,
      price: euro(priceAfter(pick.id, period, dinners)),
    }
    onConfirm((email) => submitLead({ source: 'formula-modal', service: 'batch', email, ...data }))
  }

  return (
    <dialog
      ref={ref}
      aria-label={texts.title}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className={styles.root}
    >
      <header className={styles.header}>
        <span className={styles.headerIcon}>
          <ChefHat aria-hidden className={styles.headerIconSvg} strokeWidth={1.75} />
        </span>
        <span className={styles.headerText}>
          <strong className={styles.headerService}>{texts.service}</strong>
          <span className={styles.headerSub}>{texts.subtitle}</span>
        </span>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={texts.close}
          className={styles.close}
        >
          <X aria-hidden className={styles.closeIcon} />
        </button>
      </header>
      <div className={styles.panel}>
        {!direct && (
          <div className={styles.progress}>
            <p className={styles.label}>{texts.step.replace('{n}', String(step))}</p>
            <div className={styles.bars} aria-hidden>
              {[1, 2].map((n) => (
                <span key={n} className={clsx(styles.bar, n <= step && styles.barActive)} />
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className={styles.title}>{texts.compareTitle}</h3>
            <p className={styles.intro}>{texts.compareIntro}</p>
            <div role="radiogroup" aria-label={texts.compareTitle} className={styles.packs}>
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
                  className={styles.pack}
                >
                  <span className={styles.packHead}>
                    <span className={styles.packName}>
                      <span className={styles.packTitle}>{p.title}</span>
                      <span className={styles.packLabel}>{p.label}</span>
                    </span>
                    <span className={styles.packPrice}>
                      <strong className={styles.packPriceValue}>{priceText(p.id)}</strong>
                      <span className={styles.packNote}>{texts.afterCredit}</span>
                    </span>
                  </span>
                  <ul className={styles.features}>
                    {p.features.map((f) => (
                      <li key={f} className={styles.feature}>
                        <Check aria-hidden className={styles.featureCheck} strokeWidth={3} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ArrowIcon className={styles.packArrow} />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={submit}>
            <h3 className={styles.title}>{texts.configTitle}</h3>
            <p className={styles.pick}>
              {pick.title} · {priceText(pick.id)}
            </p>
            <div className={styles.switches}>
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
            <p className={styles.engagement}>{texts.engagement[period]}</p>
            <h4 className={styles.contactTitle}>{texts.contactTitle}</h4>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="lead-firstname" className={styles.label}>
                  {texts.firstNameLabel}
                </label>
                <span className={styles.control}>
                  <User aria-hidden className={styles.fieldIcon} />
                  <input
                    id="lead-firstname"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    maxLength={60}
                    placeholder={texts.firstNamePlaceholder}
                    className={styles.input}
                  />
                </span>
              </div>
              <div className={styles.field}>
                <label htmlFor="lead-phone" className={styles.label}>
                  {texts.phoneLabel}
                </label>
                <span className={styles.control}>
                  <Phone aria-hidden className={styles.fieldIcon} />
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    required
                    minLength={8}
                    autoComplete="tel"
                    placeholder={texts.phonePlaceholder}
                    className={styles.input}
                  />
                </span>
              </div>
              {/* Champ piège anti-spam : invisible pour les personnes. */}
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className={styles.trap}
              />
            </div>
            <button type="submit" className={styles.submit}>
              {texts.submit}
              <ArrowIcon className={styles.submitArrow} />
            </button>
            <p className={styles.consent}>{texts.consent}</p>
            <button type="button" onClick={() => setStep(1)} className={styles.back}>
              {texts.back}
            </button>
          </form>
        )}
      </div>
    </dialog>
  )
}
