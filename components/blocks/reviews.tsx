import { cn } from '@/lib/utils'
import { DualHeader } from '@/components/blocks/dual-header'
import { ReviewsSlider, type Review } from '@/components/blocks/reviews-slider'
import { StackedPhotos } from '@/components/blocks/stacked-photos'

export type { Review }
type Img = { src: string; width: number; height: number; unoptimized?: boolean }

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  reviews: Review[]
  labels: { prev: string; next: string; navigation: string }
  faces: Img[]
  proof: { long: React.ReactNode; short: React.ReactNode }
  /** Encart arrondi dans la page (pages tarifs et FAQ) au lieu du bandeau pleine largeur de l'accueil. */
  inset?: boolean
  /** Avis actif au chargement. */
  initial?: number
  /** Encart serré en mobile (10 px de marge et de remplissage au lieu de 15 px et 0), comme sur la FAQ. */
  tight?: boolean
}

// Avis clients : bandeau gris avec titre, curseur d'avis et ligne de preuve (visages + appel).
export function Reviews({
  kicker,
  title,
  highlight,
  description,
  reviews,
  labels,
  faces,
  proof,
  inset = false,
  initial,
  tight = false,
}: Props) {
  return (
    <section
      data-section="reviews"
      className={
        inset
          ? cn('flex flex-col gap-5 px-[15px] leading-normal', tight && 'max-md:px-[10px]')
          : 'flex flex-col gap-5 bg-[#E6E4DD] p-[10px] leading-normal max-md:mx-[10px]'
      }
    >
      <div
        className={
          inset
            ? cn(
                'flex flex-col gap-5 rounded-[30px] bg-[#E6E4DD] p-[10px]',
                tight ? 'max-md:p-[10px]' : 'max-md:p-0',
              )
            : 'contents'
        }
      >
        <div className="h-[90px]" aria-hidden />
        <DualHeader
          size="compact"
          kicker={kicker}
          title={title}
          highlight={highlight}
          description={description}
        />
        <ReviewsSlider reviews={reviews} labels={labels} initial={initial} />
        <div className="flex flex-wrap items-center justify-center gap-x-[10px] pt-[10px]">
          <StackedPhotos photos={faces} />
          <p className="font-display m-0 text-[15px] leading-[22px] font-medium tracking-[-0.02em] text-[#3f3f3f] max-lg:hidden">
            {proof.long}
          </p>
          <p className="font-display m-0 text-[15px] leading-[22px] font-medium tracking-[-0.02em] text-[#3f3f3f] lg:hidden">
            {proof.short}
          </p>
        </div>
        <div className="h-[90px]" aria-hidden />
      </div>
    </section>
  )
}
