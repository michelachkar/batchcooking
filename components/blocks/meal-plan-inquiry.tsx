'use client'

import { Phone } from 'lucide-react'
import clsx from 'clsx'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'
import { useLead } from '@/components/lead/lead-provider'
import { submitLead } from '@/lib/lead/submit'
import styles from './meal-plan-inquiry.module.css'

type Option = { value: string; label: string }

type Props = {
  kicker: string
  title: string
  action: string
  householdLabel: string
  householdPlaceholder: string
  householdOptions: Option[]
  mealsLabel: string
  mealsPlaceholder: string
  mealsOptions: Option[]
  phoneLabel: string
  phonePlaceholder: string
  button: string
  note: string
  success: string
  error: string
}

function SelectField({
  id,
  name,
  icon,
  text,
  placeholder,
  options,
}: {
  id: string
  name: string
  icon: IconName
  text: string
  placeholder: string
  options: Option[]
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {text}
      </label>
      <span className={styles.control}>
        <Icon name={icon} className={styles.fieldIcon} />
        <select
          id={id}
          name={name}
          required
          defaultValue=""
          className={clsx(styles.input, styles.select)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </span>
    </div>
  )
}

// Demande rapide « batch cooking » : foyer, repas par semaine, téléphone. <form method="get"> vers la page contact, sans JS.
export function MealPlanInquiry(p: Props) {
  const { confirm } = useLead()
  // Avec JavaScript, le clic ouvre le modal « étapes suivantes + e-mail » ; la demande part à /api/lead à la confirmation.
  // Sans JavaScript, le formulaire GET renvoie vers la page contact.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const data = {
      phone: String(f.get('phone') ?? ''),
      household: String(f.get('household') ?? ''),
      meals: String(f.get('meals') ?? ''),
    }
    confirm('batch', async (email) => {
      const ok = await submitLead({ source: 'quick-form', service: 'batch', email, ...data })
      if (ok) form.reset()
      return ok
    })
  }
  return (
    <section data-section="quick-inquiry" className={styles.root}>
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
          <SelectField
            id="qi-household"
            name="household"
            icon="users"
            text={p.householdLabel}
            placeholder={p.householdPlaceholder}
            options={p.householdOptions}
          />
          <SelectField
            id="qi-meals"
            name="meals"
            icon="calendar-event"
            text={p.mealsLabel}
            placeholder={p.mealsPlaceholder}
            options={p.mealsOptions}
          />
          <div className={styles.field}>
            <label htmlFor="qi-phone" className={styles.label}>
              {p.phoneLabel}
            </label>
            <span className={styles.control}>
              <Phone aria-hidden className={styles.fieldIcon} />
              <input
                id="qi-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder={p.phonePlaceholder}
                className={styles.input}
              />
            </span>
          </div>
          <button type="submit" className={styles.submit}>
            {p.button}
            <ArrowIcon className={styles.submitArrow} />
          </button>
        </form>
      </div>
    </section>
  )
}
