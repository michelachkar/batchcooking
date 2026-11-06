import { z } from 'zod'

// Champs du formulaire de devis : un seul schéma pour le serveur (validation) et le type des valeurs.
export const proposalSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  date: z.string().trim().max(20).optional(),
  location: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(80).optional(),
  occasion: z.string().trim().max(80).optional(),
  guests: z.string().trim().max(80).optional(),
  budget: z.string().trim().max(80).optional(),
  experience: z.string().trim().max(80).optional(),
  message: z.string().trim().max(3000).optional(),
})

export type ProposalValues = z.infer<typeof proposalSchema>

export type ProposalState = {
  status: 'idle' | 'success' | 'invalid' | 'unavailable' | 'error'
  /** Noms des champs invalides, pour afficher une erreur à côté. */
  fields?: string[]
}
