import { DualHeader } from '@/components/blocks/dual-header'
import { ReviewsSlider, type Review } from '@/components/blocks/reviews-slider'
import { TrustedStrip } from '@/components/blocks/trusted-by'
import type { Logo } from '@/components/blocks/client-carousel'

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  reviews: Review[]
  labels: { prev: string; next: string; navigation: string }
  /** Références sous les avis ; la bande est omise sans vraies références. */
  trusted?: { title: string; logos: Logo[] }
}

// Variante « encart » des avis (page services) : bloc gris arrondi, curseur d'avis puis bande de références.
export function ReviewsInset({
  kicker,
  title,
  highlight,
  description,
  reviews,
  labels,
  trusted,
}: Props) {
  return (
    <section data-section="reviews" className="flex flex-col gap-5 px-[15px] leading-normal">
      <div className="flex flex-col gap-5 rounded-[30px] bg-[#E6E4DD]">
        <div className="h-[90px]" aria-hidden />
        <DualHeader
          size="compact"
          kicker={kicker}
          title={title}
          highlight={highlight}
          description={description}
          className="max-md:px-[10px]"
        />
        <ReviewsSlider reviews={reviews} labels={labels} className="pt-px pb-5" initial={0} />
        {trusted && (
          <TrustedStrip
            title={trusted.title}
            logos={trusted.logos}
            borderColor="rgba(199,199,199,0.88)"
          />
        )}
        <div className="h-[70px]" aria-hidden />
      </div>
    </section>
  )
}
