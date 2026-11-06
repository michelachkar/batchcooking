import { getTranslations } from '@/lib/i18n'
import { reviewNodes } from '@/lib/jsonld'

/** Avis réels (messages home.reviews) en données structurées ; liste vide tant qu'il n'y en a pas. */
export async function getReviewNodes() {
  const t = await getTranslations('home.reviews')
  const reviews = t.raw('reviews') as { name: string; text: string }[]
  return reviewNodes(reviews.map((r) => ({ author: r.name, text: r.text })))
}
