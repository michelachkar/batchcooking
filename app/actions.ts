'use server'

import { proposalSchema, type ProposalState } from '@/lib/proposal-schema'

// Demande de devis. La livraison se fait vers PROPOSAL_WEBHOOK_URL (à définir une fois le canal de réception choisi) :
// sans elle, on le dit franchement au lieu de simuler un envoi.
export async function submitProposal(
  _prev: ProposalState,
  formData: FormData,
): Promise<ProposalState> {
  // Champ piège invisible : un robot le remplit, une personne non.
  if (formData.get('website')) return { status: 'success' }

  const parsed = proposalSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { status: 'invalid', fields: parsed.error.issues.map((i) => String(i.path[0])) }
  }

  const url = process.env.PROPOSAL_WEBHOOK_URL
  if (!url) return { status: 'unavailable' }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })
    return res.ok ? { status: 'success' } : { status: 'error' }
  } catch {
    return { status: 'error' }
  }
}
