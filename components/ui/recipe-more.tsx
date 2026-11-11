'use client'

import { createContext, useContext, useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './recipe-card.module.css'

const OpenContext = createContext<[boolean, (open: boolean) => void] | null>(null)

// Regroupe des fiches (carrousel, grille) : un seul « Voir plus » ouvre ou ferme les détails de toutes.
export function RecipeMoreGroup({ children }: { children: React.ReactNode }) {
  const state = useState(false)
  return <OpenContext.Provider value={state}>{children}</OpenContext.Provider>
}

// Détails supplémentaires d'une recette, repliés par défaut (animation par grid-template-rows, compatible Safari).
export function RecipeMore({
  more,
  less,
  children,
}: {
  more: string
  less: string
  children: React.ReactNode
}) {
  const local = useState(false)
  const [open, setOpen] = useContext(OpenContext) ?? local
  const id = useId()
  return (
    <>
      <div id={id} className={styles.more} data-open={open} inert={!open}>
        <div className={styles.moreInner}>{children}</div>
      </div>
      <button
        type="button"
        className={styles.moreButton}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {open ? less : more}
        <ChevronDown aria-hidden className={styles.moreIcon} />
      </button>
    </>
  )
}
