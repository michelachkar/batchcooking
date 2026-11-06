'use client'

import { useActionState } from 'react'
import { submitProposal } from '@/app/actions'
import type { ProposalState } from '@/lib/proposal-schema'
import clsx from 'clsx'
import styles from './proposal-form.module.css'

export type ProposalField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea'
  placeholder?: string
  options?: string[]
  required?: boolean
  full?: boolean
  /** Un tiers de la largeur (sinon la moitié). */
  third?: boolean
}

type Props = {
  fields: ProposalField[]
  note: string
  submit: string
  messages: Record<Exclude<ProposalState['status'], 'idle'>, string>
  /** Teinte : « wine » (cadre bordeaux de l'accueil) ou « forest » (page contact). */
  tone?: 'wine' | 'forest'
}

// Formulaire de devis : Server Action, fonctionne sans JavaScript ; le client ne fait qu'afficher le résultat.
export function ProposalForm({ fields, note, submit, messages, tone = 'wine' }: Props) {
  const [state, action, pending] = useActionState<ProposalState, FormData>(submitProposal, {
    status: 'idle',
  })
  const invalid = new Set(state.fields)

  return (
    <form action={action} noValidate={false} className={clsx(styles.form, styles[tone])}>
      {fields.map((f) => (
        <label
          key={f.name}
          className={clsx(
            styles.field,
            f.full ? styles.full : f.third ? styles.third : styles.half,
          )}
        >
          {f.label}
          {f.type === 'select' ? (
            <select
              name={f.name}
              defaultValue=""
              required={f.required}
              aria-invalid={invalid.has(f.name) || undefined}
              className={clsx(styles.control, styles.select)}
            >
              <option value="">{f.placeholder}</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : f.type === 'textarea' ? (
            <textarea
              name={f.name}
              placeholder={f.placeholder}
              aria-invalid={invalid.has(f.name) || undefined}
              className={clsx(styles.control, styles.textarea)}
            />
          ) : (
            <input
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              required={f.required}
              autoComplete={
                f.type === 'email'
                  ? 'email'
                  : f.name === 'name'
                    ? 'name'
                    : f.type === 'tel'
                      ? 'tel'
                      : undefined
              }
              aria-invalid={invalid.has(f.name) || undefined}
              className={styles.control}
            />
          )}
        </label>
      ))}
      {/* Champ piège : invisible pour les personnes, rempli par les robots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className={styles.trap}
      />
      <div className={styles.actions}>
        <p className={styles.note}>{note}</p>
        <button type="submit" disabled={pending} className={styles.submit}>
          {submit}
        </button>
      </div>
      <p
        role="status"
        className={clsx(
          styles.status,
          state.status === 'success' && styles.statusSuccess,
          state.status === 'idle' && styles.statusIdle,
        )}
      >
        {state.status !== 'idle' && messages[state.status]}
      </p>
    </form>
  )
}
