import { getTranslations } from 'next-intl/server'
import { Reviews, type Review } from '@/components/blocks/reviews'
import { ReviewsInset } from '@/components/blocks/reviews-inset'
import { mediaOf, type Landing } from '@/lib/media'

// Avis : uniquement de vrais avis (messages home.reviews) ; rien tant qu'il n'y en a pas.
export async function ReviewsSection({
  variant = 'band',
  initial,
  tight,
  ns = 'home',
}: {
  variant?: 'band' | 'inset' | 'inset-proof'
  initial?: number
  tight?: boolean
  ns?: Landing
}) {
  const m = mediaOf(ns)
  const rv = await getTranslations(`${ns}.reviews`)
  const tr = await getTranslations(`${ns}.trusted`)
  const reviews = (rv.raw('reviews') as Omit<Review, 'image'>[]).map((r, i) => ({
    ...r,
    image: m.reviews[i % m.reviews.length],
  }))
  if (reviews.length === 0) return null
  const common = {
    kicker: rv('kicker'),
    title: rv('title'),
    highlight: rv('highlight'),
    description: rv('description'),
    reviews,
    labels: { prev: rv('prev'), next: rv('next'), navigation: rv('navigation') },
  }
  if (variant === 'inset') {
    return (
      <ReviewsInset
        {...common}
        trusted={m.partners.length > 0 ? { title: tr('title'), logos: m.partners } : undefined}
      />
    )
  }
  const phone = (
    <a
      href={`tel:${rv('phone').replace(/\D/g, '')}`}
      className="bg-sage text-ink rounded-lg px-2 py-[2px]"
    >
      <strong>{rv('phone')}</strong>
    </a>
  )
  return (
    <Reviews
      {...common}
      inset={variant === 'inset-proof'}
      initial={initial}
      tight={tight}
      faces={m.faces}
      proof={{
        long: (
          <>
            {rv('proofLong')} {phone}
          </>
        ),
        short: (
          <>
            {rv('proofShort')} {phone}
          </>
        ),
      }}
    />
  )
}
