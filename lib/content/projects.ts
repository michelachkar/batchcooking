import { collection } from '@/lib/content'
import { projectSchema } from '@/lib/content/schemas'

/** Réalisations triées par rang. */
export function getProjects() {
  return collection('projects', projectSchema).sort((a, b) => a.data.order - b.data.order)
}

/** Une réalisation avec ses voisines (« précédent » = la suivante dans la liste, « suivant » = la précédente, en boucle) et trois projets liés. */
export function getProject(slug: string) {
  const all = getProjects()
  const i = all.findIndex((p) => p.slug === slug)
  if (i < 0) return undefined
  const entry = all[i]
  const others = all.filter((p) => p.slug !== slug)
  const chosen = entry.data.related.flatMap((r) => others.filter((p) => p.slug === r))
  const rest = [
    ...others.filter((p) => p.data.categories.some((c) => entry.data.categories.includes(c))),
    ...others,
  ].filter((p, k, a) => a.indexOf(p) === k && !chosen.includes(p))
  return {
    entry,
    prev: all.length > 1 ? all[(i + 1) % all.length] : undefined,
    next: all.length > 1 ? all[(i - 1 + all.length) % all.length] : undefined,
    related: [...chosen, ...rest].slice(0, 3),
  }
}
