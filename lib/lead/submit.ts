import type { Dinners, PackId, Period } from '@/lib/lead/pricing'

export type LeadPayload = {
  source: 'formula-modal' | 'quick-form' | 'chef-form' | 'course-form'
  /** Service demandé : permet de router la demande. */
  service?: 'batch' | 'chef' | 'cours'
  phone: string
  firstName?: string
  email?: string
  pack?: PackId
  period?: Period
  dinners?: Dinners
  price?: string
  household?: string
  meals?: string
  eventDate?: string
  choice?: string
  guests?: string
  location?: string
  occasion?: string
  formula?: string
  message?: string
  /** Champ piège anti-spam : doit rester vide. */
  website?: string
}

/** Envoie une demande de rappel à /api/lead ; true si elle est acceptée. */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch {
    return false
  }
}
