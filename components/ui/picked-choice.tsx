import styles from './picked-choice.module.css'

// Choix déjà fait (formule, cours), rappelé en tête de l'étape 2 des modals, avec un bouton pour le changer.
export function PickedChoice({
  label,
  detail,
  changeLabel,
  onChange,
}: {
  label: string
  detail?: React.ReactNode
  changeLabel: string
  onChange: () => void
}) {
  return (
    <div className={styles.root}>
      <span className={styles.body}>
        <span className={styles.label}>{label}</span>
        {detail && <span className={styles.detail}>{detail}</span>}
      </span>
      <button type="button" onClick={onChange} className={styles.change}>
        {changeLabel}
      </button>
    </div>
  )
}
