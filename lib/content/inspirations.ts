import { collection } from '@/lib/content'
import { inspirationSchema } from '@/lib/content/schemas'

/** Photos de la galerie d'inspiration (`content/inspirations/*.mdx`), publiées, triées par rang. */
export function getInspirations() {
  return collection('inspirations', inspirationSchema)
    .filter((e) => e.data.published)
    .sort((a, b) => a.data.order - b.data.order || a.slug.localeCompare(b.slug))
}
