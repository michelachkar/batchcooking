import { ChefHat, X } from 'lucide-react'
import clsx from 'clsx'
import styles from './modal-shell.module.css'

type ModalShellProps = {
  /** Référence du <dialog> : le composant qui l'ouvre (showModal) la garde pour piloter l'ouverture. */
  dialogRef: React.RefObject<HTMLDialogElement | null>
  onClose: () => void
  /** Nom du service rappelé dans l'en-tête, et son sous-titre. */
  title: string
  subtitle: string
  closeLabel: string
  /** Libellé accessible de la fenêtre (sinon `labelledBy`). */
  ariaLabel?: string
  labelledBy?: string
  /** Fenêtre un peu plus étroite (modal de confirmation). */
  narrow?: boolean
  children: React.ReactNode
}

// Fenêtre native <dialog> commune à tous les modals (demande de rappel, devis, confirmation, choix du service) :
// fond, animation, en-tête terracotta avec le service concerné et bouton de fermeture. Échap, focus et piège de focus
// sont gérés par le navigateur ; un clic sur le fond ferme la fenêtre.
export function ModalShell({
  dialogRef,
  onClose,
  title,
  subtitle,
  closeLabel,
  ariaLabel,
  labelledBy,
  narrow,
  children,
}: ModalShellProps) {
  const close = () => dialogRef.current?.close()
  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && close()}
      className={clsx(styles.root, narrow && styles.narrow)}
    >
      <header className={styles.header}>
        <span className={styles.headerIcon}>
          <ChefHat aria-hidden className={styles.headerIconSvg} strokeWidth={1.75} />
        </span>
        <span className={styles.headerText}>
          <strong className={styles.headerTitle}>{title}</strong>
          <span className={styles.headerSub}>{subtitle}</span>
        </span>
        <button type="button" onClick={close} aria-label={closeLabel} className={styles.close}>
          <X aria-hidden className={styles.closeIcon} />
        </button>
      </header>
      {children}
    </dialog>
  )
}
