import clsx from 'clsx'
import { CheckCircle2, Clock, Hourglass, Mail, MapPin, Phone } from 'lucide-react'
import { DualHeader } from '@/components/layout/dual-header'
import { ProposalForm, type ProposalField } from '@/components/features/lead/proposal-form'
import type { ProposalState } from '@/lib/proposal-schema'
import styles from './contact.module.css'

type ContactProps = {
  kicker: string
  title: string
  highlight: string
  description: string
  address?: string
  phone?: { label: string; href: string }
  email?: string
  hours?: string
  reassure: string[]
  labels: {
    hours: string
    response: string
    responseValue: string
    info: string
    form: string
    formIntro: string
  }
  followTitle: string
  social: { name: string; href: string; path: string }[]
  socialLabel: string
  fields: ProposalField[]
  note: string
  submit: string
  messages: Record<Exclude<ProposalState['status'], 'idle'>, string>
}

// Page contact : coordonnées et réseaux à gauche, carte blanche avec le formulaire de demande à droite.
// Sous 1025 px les deux blocs s'empilent.
export function Contact(p: ContactProps) {
  return (
    <section id="contact" data-section="contact" className={styles.root}>
      <div className={styles.info}>
        <DualHeader
          size="compact"
          align="left"
          kicker={p.kicker}
          title={p.title}
          highlight={p.highlight}
          description={p.description}
          className={styles.header}
        />
        <ul className={styles.reassure}>
          {p.reassure.map((r) => (
            <li key={r} className={styles.reassureItem}>
              <CheckCircle2 aria-hidden className={styles.reassureIcon} />
              {r}
            </li>
          ))}
        </ul>
        <h2 className={styles.heading}>{p.labels.info}</h2>
        <ul className={styles.details}>
          {p.address && (
            <li className={clsx(styles.item, styles.itemAddress)}>
              <MapPin className={styles.icon} aria-hidden />
              <span className={styles.text}>{p.address}</span>
            </li>
          )}
          {p.phone && (
            <li className={clsx(styles.item, styles.itemPhone)}>
              <a href={p.phone.href} className={styles.link}>
                <Phone className={styles.icon} aria-hidden />
                <span className={styles.linkText}>{p.phone.label}</span>
              </a>
            </li>
          )}
          {p.email && (
            <li className={styles.item}>
              <a href={`mailto:${p.email}`} className={styles.link}>
                <Mail className={styles.icon} aria-hidden />
                <span className={styles.linkText}>{p.email}</span>
              </a>
            </li>
          )}
          {p.hours && (
            <li className={styles.item}>
              <Clock className={styles.icon} aria-hidden />
              <span className={styles.text}>
                <span className="sr-only">{p.labels.hours} : </span>
                {p.hours}
              </span>
            </li>
          )}
          <li className={styles.item}>
            <Hourglass className={styles.icon} aria-hidden />
            <span className={styles.text}>
              {p.labels.response} : {p.labels.responseValue}
            </span>
          </li>
        </ul>
        {p.social.length > 0 && (
          <>
            <h4 className={styles.followHeading}>{p.followTitle}</h4>
            <ul aria-label={p.socialLabel} className={styles.social}>
              {p.social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} aria-label={s.name} className={styles.socialLink}>
                    <svg viewBox="0 0 24 24" className={styles.socialIcon} aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div id="devis" className={styles.card}>
        <span id="inquiry" aria-hidden className={styles.anchor} />
        <div>
          <h2 className={styles.cardTitle}>{p.labels.form}</h2>
          <p className={styles.cardIntro}>{p.labels.formIntro}</p>
        </div>
        <ProposalForm
          tone="forest"
          fields={p.fields}
          note={p.note}
          submit={p.submit}
          messages={p.messages}
        />
      </div>
    </section>
  )
}
