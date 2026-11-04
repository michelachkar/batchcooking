import { collection } from '@/lib/content'
import { teamSchema } from '@/lib/content/schemas'

/** Équipe triée par rang. */
export function getTeam() {
  return collection('team', teamSchema).sort((a, b) => a.data.order - b.data.order)
}

/** Un membre avec ses voisins (précédent / suivant dans l'ordre) et quatre autres membres. */
export function getMember(slug: string) {
  const all = getTeam()
  const i = all.findIndex((m) => m.slug === slug)
  if (i < 0) return undefined
  return {
    entry: all[i],
    prev: i > 0 ? all[i - 1] : undefined,
    next: i < all.length - 1 ? all[i + 1] : undefined,
    others: all.filter((m) => m.slug !== slug).slice(-4),
  }
}
