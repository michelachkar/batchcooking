'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { LeadModal, type LeadPack, type LeadTexts } from '@/components/lead/lead-modal'
import type { Dinners, PackId, Period } from '@/lib/lead/pricing'

export type LeadOpenOptions = { pack?: PackId; period?: Period; dinners?: Dinners }

type Ctx = { open: (o?: LeadOpenOptions) => void }

const LeadContext = createContext<Ctx | null>(null)

/** Ouvre le modal de demande de rappel depuis n'importe quel composant client. */
export function useLead() {
  const ctx = useContext(LeadContext)
  if (!ctx) throw new Error('useLead doit être utilisé dans <LeadProvider>')
  return ctx
}

// Monté une seule fois dans le layout : un seul modal pour tout le site.
export function LeadProvider({
  texts,
  packs,
  children,
}: {
  texts: LeadTexts
  packs: LeadPack[]
  children: React.ReactNode
}) {
  const [state, setState] = useState<{ seq: number; opts: LeadOpenOptions } | null>(null)
  const seq = useRef(0)
  const open = useCallback((opts: LeadOpenOptions = {}) => {
    seq.current += 1
    setState({ seq: seq.current, opts })
  }, [])
  const value = useMemo(() => ({ open }), [open])
  return (
    <LeadContext.Provider value={value}>
      {children}
      {state && (
        <LeadModal
          key={state.seq}
          opts={state.opts}
          texts={texts}
          packs={packs}
          onClose={() => setState(null)}
        />
      )}
    </LeadContext.Provider>
  )
}
