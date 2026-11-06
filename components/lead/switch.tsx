'use client'

import styles from './switch.module.css'

// Sélecteur à bascule (radio) partagé : page des formules et modal de demande de rappel.
export function Switch<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; text: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className={styles.root}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={styles.option}
        >
          {o.text}
        </button>
      ))}
    </div>
  )
}
