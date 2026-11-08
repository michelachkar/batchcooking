'use client'

import { ArrowIcon, Icon } from '@/components/ui/icon'
import { SelectField, TextField, type FieldOption } from '@/components/ui/form/field'
import { useLead } from '@/components/features/lead/lead-provider'
import { submitLead } from '@/lib/lead/submit'
import styles from './meal-plan-inquiry.module.css'

type MealPlanInquiryProps = {
  kicker: string
  title: string
  action: string
  householdLabel: string
  householdPlaceholder: string
  householdOptions: FieldOption[]
  mealsLabel: string
  mealsPlaceholder: string
  mealsOptions: FieldOption[]
  phoneLabel: string
  phonePlaceholder: string
  button: string
}

// Demande rapide « batch cooking » : foyer, repas par semaine, téléphone. <form method="get"> vers la page contact, sans JS.
export function MealPlanInquiry(p: MealPlanInquiryProps) {
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
              <span className={styles.kicker}>{p.kicker}</span>
              <span id="qi-title" className={styles.title}>
                {p.title}
              </span>
            </span>
          </div>
          <SelectField
            id="qi-household"
            name="household"
            icon="users"
            label={p.householdLabel}
            placeholder={p.householdPlaceholder}
            options={p.householdOptions}
          />
          <SelectField
            id="qi-meals"
            name="meals"
            icon="calendar-event"
            label={p.mealsLabel}
            placeholder={p.mealsPlaceholder}
            options={p.mealsOptions}
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
      </div>
    </section>
  )
}
