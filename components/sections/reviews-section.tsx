import { getTranslations } from '@/lib/i18n'
import { Reviews, type Review } from '@/components/blocks/reviews'
import { media } from '@/lib/media'

// Avis de l'accueil (messages home.reviews) ; rien tant qu'il n'y en a pas.
export async function ReviewsSection() {
  const rv = await getTranslations('home.reviews')
  const reviews = (rv.raw('reviews') as Omit<Review, 'image'>[]).map((r, i) => ({
    ...r,
    image: media.reviews[i % media.reviews.length],
  }))
  if (reviews.length === 0) return null
  return (
    <Reviews
      kicker={rv('kicker')}
      title={rv('title')}
      highlight={rv('highlight')}
      description={rv('description')}
      reviews={reviews}
      labels={{ prev: rv('prev'), next: rv('next'), navigation: rv('navigation') }}
    />
  )
}
