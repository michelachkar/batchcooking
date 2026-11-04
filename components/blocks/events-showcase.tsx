import { DualHeader } from '@/components/blocks/dual-header'
import { ProjectsCarousel, type Project } from '@/components/blocks/projects-carousel'
import { StackedPhotos } from '@/components/blocks/stacked-photos'

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  projects: Project[]
  carouselLabels: { prev: string; next: string; navigation: string }
  faces: { src: string; width: number; height: number; unoptimized?: boolean }[]
  proof: { long: React.ReactNode; short: React.ReactNode }
  /** Espace au-dessus du titre (70 px sur l'accueil, 50 px sur la FAQ). */
  topSpacer?: number
  /** Marge sous la ligne de preuve (68 px sur l'accueil, 90 px sur la FAQ). */
  bottomGap?: number
  /** Titres des cartes à 24 px en mobile (FAQ). */
  smallTitleMobile?: boolean
}

// Réalisations récentes : titre, carrousel et ligne de preuve (visages + appel). Deux phrases, selon la largeur.
export function EventsShowcase({
  kicker,
  title,
  highlight,
  description,
  projects,
  carouselLabels,
  faces,
  proof,
  topSpacer = 70,
  bottomGap = 68,
  smallTitleMobile,
}: Props) {
  return (
    <section data-section="events" className="flex flex-col gap-5 py-[10px] leading-normal">
      <div style={{ height: topSpacer }} aria-hidden />
      <DualHeader
        kicker={kicker}
        title={title}
        highlight={highlight}
        description={description}
        className="max-md:px-[10px]"
      />
      <ProjectsCarousel
        projects={projects}
        labels={carouselLabels}
        smallTitleMobile={smallTitleMobile}
      />
      <div
        style={{ marginBottom: bottomGap }}
        className="flex flex-wrap items-center justify-center gap-x-[10px]"
      >
        <StackedPhotos photos={faces} />
        <p className="font-display m-0 text-[15px] leading-[22px] font-medium tracking-[-0.02em] text-[#3f3f3f] max-lg:hidden">
          {proof.long}
        </p>
        <p className="font-display m-0 text-[15px] leading-[22px] font-medium tracking-[-0.02em] text-[#3f3f3f] lg:hidden">
          {proof.short}
        </p>
      </div>
    </section>
  )
}
