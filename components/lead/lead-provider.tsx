'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import {
  ConfirmationDialog,
  type ConfirmService,
  type ConfirmSubmit,
} from '@/components/lead/confirmation-dialog'
import { LeadModal, type LeadPack, type LeadTexts } from '@/components/lead/lead-modal'
import type { Dinners, PackId, Period } from '@/lib/lead/pricing'

export type LeadOpenOptions = { pack?: PackId; period?: Period; dinners?: Dinners }

type Ctx = {
  open: (o?: LeadOpenOptions) => void
  /**
   * Ouvre le modal « étapes suivantes » du service. Avec `submit`, il demande l'e-mail (accusé de réception)
   * et n'envoie la demande qu'à la confirmation ; sans `submit`, la demande est déjà partie : confirmation directe.
   */
  confirm: (service: ConfirmService, submit?: ConfirmSubmit) => void
}

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
  const [confirmation, setConfirmation] = useState<{
    seq: number
    service: ConfirmService
    submit?: ConfirmSubmit
  } | null>(null)
  const [state, setState] = useState<{ seq: number; opts: LeadOpenOptions } | null>(null)
  const seq = useRef(0)
  const open = useCallback((opts: LeadOpenOptions = {}) => {
    seq.current += 1
    setState({ seq: seq.current, opts })
  }, [])
  const confirm = useCallback((service: ConfirmService, submit?: ConfirmSubmit) => {
    seq.current += 1
    setConfirmation({ seq: seq.current, service, submit })
  }, [])
  const value = useMemo(() => ({ open, confirm }), [open, confirm])
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
          onDone={() => {
            setState(null)
            confirm('batch')
          }}
        />
      )}
      {confirmation && (
        <ConfirmationDialog
          key={confirmation.seq}
          texts={texts.confirmation}
          service={confirmation.service}
          submit={confirmation.submit}
          close={texts.close}
          subtitle={texts.subtitle}
          onClose={() => setConfirmation(null)}
        />
      )}
    </LeadContext.Provider>
  )
}
