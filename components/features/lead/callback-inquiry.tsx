'use client'

import clsx from 'clsx'
import { useLead } from '@/components/features/lead/lead-provider'
import { submitLead } from '@/lib/lead/submit'
import { ArrowIcon, Icon } from '@/components/ui/icon'
import { SelectField, TextField } from '@/components/ui/form/field'
import styles from './callback-inquiry.module.css'

type CallbackInquiryProps = {
  kicker: string
  title: string
  /** Page de repli du formulaire (GET) sans JavaScript. */
  action: string
  dateLabel: string
  serviceLabel: string
  servicePlaceholder: string
  serviceOptions: { value: string; label: string }[]
  phoneLabel: string
  phonePlaceholder: string
  button: string
  note?: string
  /** Motif d'aliments en filigrane, comme sur le formulaire de l'accueil. */
  pattern?: boolean
  /** Provenance de la demande (défaut : chef-form). */
  source?: 'chef-form' | 'course-form'
  /** `choice` : la liste précise un choix dans un service fixé (ex. un cours) au lieu de choisir le service. */
  selectKey?: 'service' | 'choice'
  fixedService?: 'batch' | 'chef' | 'cours'
}

// Demande de rappel : date, service, téléphone. Le clic ouvre le modal « étapes suivantes + e-mail » ;
// la demande part à /api/lead à la confirmation. Sans JavaScript, le formulaire GET renvoie vers la page contact.
export function CallbackInquiry(p: CallbackInquiryProps) {
  const { confirm } = useLead()
  const selectKey = p.selectKey ?? 'service'
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const picked = String(f.get('service'))
    const service: 'batch' | 'chef' | 'cours' =
      selectKey === 'choice'
        ? (p.fixedService ?? 'chef')
        : picked === 'batch' || picked === 'cours'
          ? picked
          : 'chef'
    confirm(service, async (email) => {
      const ok = await submitLead({
        source: p.source ?? 'chef-form',
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
              <span className={styles.kicker}>{p.kicker}</span>
              <span id="qi-title" className={styles.title}>
                {p.title}
              </span>
            </span>
          </div>
          <TextField
            id="qi-date"
            name="event-date"
            type="date"
            icon="calendar-event"
            label={p.dateLabel}
            required
          />
          <SelectField
            id="qi-service"
            name={selectKey}
            icon="chef-hat"
            label={p.serviceLabel}
            placeholder={p.servicePlaceholder}
            options={p.serviceOptions}
            required
          />
          <TextField
            id="qi-phone"
            name="phone"
            type="tel"
            icon="phone"
            label={p.phoneLabel}
            required
            autoComplete="tel"
            placeholder={p.phonePlaceholder}
          />
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
