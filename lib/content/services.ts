import { collection } from '@/lib/content'
import { serviceSchema } from '@/lib/content/schemas'

/**
 * Pages de service du site : trois pages dédiées (`app/[locale]/services/<adresse>/page.tsx`) dont les textes sont dans messages/fr.json (espace `ns`).
 * Le dossier `content/services/` est vide : le gabarit `/services/[slug]` ne sert plus qu'au build de test visuel (contenus de la démo).
 */
export const servicePages = [
  { slug: 'batch-cooking', ns: 'batchPage' },
  { slug: 'chef-prive', ns: 'chefPage' },
  { slug: 'cours-de-cuisine', ns: 'coursPage' },
] as const

/** Services triés par rang. */
export function getServices() {
  return collection('services', serviceSchema).sort((a, b) => a.data.order - b.data.order)
}

/** Un service avec ses voisins : « précédent » = le suivant dans la liste (le plus ancien), « suivant » = le précédent, en boucle ; « autres » = les trois premiers autres services. */
export function getService(slug: string) {
  const all = getServices()
  const i = all.findIndex((s) => s.slug === slug)
  if (i < 0) return undefined
  return {
    entry: all[i],
    prev: all.length > 1 ? all[(i + 1) % all.length] : undefined,
    next: all.length > 1 ? all[(i - 1 + all.length) % all.length] : undefined,
    others: all.filter((s) => s.slug !== slug).slice(0, 3),
  }
}
