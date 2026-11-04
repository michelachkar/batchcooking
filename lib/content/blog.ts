import { collection } from '@/lib/content'
import { postSchema } from '@/lib/content/schemas'

/** Articles dans l'ordre de la liste. */
export function getPosts() {
  return collection('blog', postSchema).sort((a, b) => a.data.order - b.data.order)
}

export function getPost(slug: string) {
  const all = getPosts()
  const i = all.findIndex((p) => p.slug === slug)
  if (i < 0) return undefined
  return { entry: all[i], prev: all[i - 1], next: all[i + 1] }
}

/** Catégories (ordre alphabétique) avec leur identifiant d'adresse et leur nombre d'articles. */
export function getCategories() {
  const all = getPosts().flatMap((p) => p.data.categories)
  const names = [...new Set(all)].sort((a, b) => a.localeCompare(b, 'fr'))
  return names.map((name) => ({
    name,
    slug: slugify(name),
    count: all.filter((n) => n === name).length,
  }))
}

/** Mois d'archive (le plus récent d'abord), au format « 2026-10 ». */
export function getArchives() {
  const months = new Set(getPosts().map((p) => p.data.date.toISOString().slice(0, 7)))
  return [...months].sort().reverse()
}

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'et')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Mots-clés (ordre alphabétique) avec leur identifiant d'adresse et leur nombre d'articles. */
export function getTags() {
  const all = getPosts().flatMap((p) => p.data.tags)
  const names = [...new Set(all)].sort((a, b) => a.localeCompare(b, 'fr'))
  return names.map((name) => ({
    name,
    slug: slugify(name),
    count: all.filter((n) => n === name).length,
  }))
}
