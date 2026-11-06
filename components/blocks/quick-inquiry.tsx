import clsx from 'clsx'
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
  note: string
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
  return (
    <section data-section="quick-inquiry" className={styles.root}>
      <div className={styles.inner}>
        <form method="get" action={p.action} aria-labelledby="qi-title" className={styles.form}>
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
            <input type="date" id="qi-date" name="event-date" className={styles.input} />
          </Field>
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
          <button type="submit" className={styles.submit}>
            {p.button}
            <ArrowIcon className={styles.submitArrow} />
          </button>
        </form>
        <p className={styles.note}>{p.note}</p>
      </div>
    </section>
  )
}
