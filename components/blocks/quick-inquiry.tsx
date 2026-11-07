'use client'

import { Phone } from 'lucide-react'
import clsx from 'clsx'
import { useLead } from '@/components/lead/lead-provider'
import { submitLead } from '@/lib/lead/submit'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'
import styles from './quick-inquiry.module.css'

type Props = {
  kicker: string
  title: string
  action: string
  dateLabel: string
  guestsLabel: string
  guestsPlaceholder: string
  guestsOptions: string[]
  locationLabel: string
  locationPlaceholder: string
  button: string
  note?: string
  /** Motif d'aliments en filigrane, comme sur le formulaire de l'accueil. */
  pattern?: boolean
  /** Mode « rappel » (comme l'accueil) : un téléphone remplace le lieu, la demande part à /api/lead. */
  lead?: {
    /** Provenance de la demande (défaut : chef-form). */
    source?: 'chef-form' | 'course-form'
    /** `choice` : la liste précise un choix dans un service fixé (ex. un cours) au lieu de choisir le service. */
    selectKey?: 'service' | 'choice'
    fixedService?: 'batch' | 'chef' | 'cours'
    serviceLabel: string
    servicePlaceholder: string
    serviceOptions: { value: string; label: string }[]
    phoneLabel: string
    phonePlaceholder: string
    success: string
    error: string
  }
}

function Field({
  id,
  name,
  icon,
  text,
  children,
}: {
  id: string
  name: string
  icon: IconName
  text: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {text}
      </label>
      <span className={styles.control}>
        <Icon name={icon} className={styles.fieldIcon} />
        {children}
      </span>
    </div>
  )
}

// Formulaire de demande rapide : un <form method="get"> vers la page contact (aucun JS, fonctionne sans script).
export function QuickInquiry(p: Props) {
  const { confirm } = useLead()
  // Mode « rappel » : le clic ouvre le modal « étapes suivantes + e-mail » ; la demande part à /api/lead à la confirmation.
  // Sans JavaScript, le formulaire GET renvoie vers la page contact.
  const selectKey = p.lead?.selectKey ?? 'service'
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!p.lead) return
    e.preventDefault()
    const lead = p.lead
    const form = e.currentTarget
    const f = new FormData(form)
    const picked = String(f.get('service'))
    const service: 'batch' | 'chef' | 'cours' =
      selectKey === 'choice'
        ? (lead.fixedService ?? 'chef')
        : picked === 'batch' || picked === 'cours'
          ? picked
          : 'chef'
    confirm(service, async (email) => {
      const ok = await submitLead({
        source: lead.source ?? 'chef-form',
        service,
        ...(selectKey === 'choice' ? { choice: String(f.get('choice') ?? '') } : {}),
        phone: String(f.get('phone') ?? ''),
        email,
        eventDate: String(f.get('event-date') ?? ''),
      })
      if (ok) form.reset()
      return ok
    })
  }
  return (
    <section
      data-section="quick-inquiry"
      className={clsx(styles.root, !p.note && styles.noNote, p.pattern && styles.pattern)}
    >
      <div className={styles.inner}>
        <form
          method="get"
          action={p.action}
          onSubmit={onSubmit}
          aria-labelledby="qi-title"
          className={styles.form}
        >
          <div className={styles.intro}>
            <span className={styles.badge}>
              <Icon name="chef-hat" />
            </span>
            <span className={styles.heading}>
              <span className={styles.label}>{p.kicker}</span>
              <span id="qi-title" className={styles.title}>
                {p.title}
              </span>
            </span>
          </div>
          <Field id="qi-date" name="event-date" icon="calendar-event" text={p.dateLabel}>
            <input
              type="date"
              id="qi-date"
              name="event-date"
              required={!!p.lead}
              className={styles.input}
            />
          </Field>
          {p.lead ? (
            <Field id="qi-service" name={selectKey} icon="chef-hat" text={p.lead.serviceLabel}>
              <select
                id="qi-service"
                name={selectKey}
                required
                defaultValue=""
                className={clsx(styles.input, styles.select)}
              >
                <option value="" disabled>
                  {p.lead.servicePlaceholder}
                </option>
                {p.lead.serviceOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
          ) : (
            <Field id="qi-guests" name="guests" icon="users" text={p.guestsLabel}>
              <select id="qi-guests" name="guests" className={clsx(styles.input, styles.select)}>
                <option value="">{p.guestsPlaceholder}</option>
                {p.guestsOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          )}
          {p.lead ? (
            <div className={styles.field}>
              <label htmlFor="qi-phone" className={styles.label}>
                {p.lead.phoneLabel}
              </label>
              <span className={styles.control}>
                <Phone aria-hidden className={styles.fieldIcon} />
                <input
                  type="tel"
                  id="qi-phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder={p.lead.phonePlaceholder}
                  className={styles.input}
                />
              </span>
            </div>
          ) : (
            <Field id="qi-location" name="location" icon="map-pin" text={p.locationLabel}>
              <input
                type="text"
                id="qi-location"
                name="location"
                placeholder={p.locationPlaceholder}
                autoComplete="address-level2"
                className={styles.input}
              />
            </Field>
          )}
          <button type="submit" className={styles.submit}>
            {p.button}
            <ArrowIcon className={styles.submitArrow} />
          </button>
        </form>
        {p.note && <p className={styles.note}>{p.note}</p>}
      </div>
    </section>
  )
}
