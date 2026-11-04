import { collection } from '@/lib/content'
import { pageSchema } from '@/lib/content/schemas'

/** Pages de texte (conditions, mentions légales...) : `content/pages/<adresse>.mdx`. */
export function getPages() {
  return collection('pages', pageSchema)
}

export function getPage(slug: string) {
  return getPages().find((p) => p.slug === slug)
}
