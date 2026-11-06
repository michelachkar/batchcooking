import Link from 'next/link'
import { DualHeader } from '@/components/blocks/dual-header'
import { ProjectsCarousel, type Project } from '@/components/blocks/projects-carousel'
import { ArrowIcon } from '@/components/ui/icon'
import { StackedPhotos } from '@/components/blocks/stacked-photos'

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  projects: Project[]
  /** Bouton sous le carrousel (facultatif). */
  cta?: { label: string; href: string }
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
  cta,
  faces,
  proof,
  topSpacer = 70,
  bottomGap = 68,
  smallTitleMobile,
}: Props) {
  return (
    <section
      data-section="events"
      className="flex flex-col gap-5 bg-white py-[10px] leading-normal"
    >
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
      {cta && (
        <div className="flex justify-center">
          <Link
            href={cta.href}
            className="rounded-pill inline-flex items-center gap-3 bg-[#B04A2A] px-[30px] py-[16px] text-base leading-none font-semibold text-white [transition:background-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 hover:bg-[#8F3B20] hover:shadow-[0_14px_28px_rgba(176,74,42,0.3)]"
          >
            {cta.label}
            <ArrowIcon />
          </Link>
        </div>
      )}
      <div
        style={{ marginBottom: bottomGap }}
        className="flex flex-wrap items-center justify-center gap-x-[10px]"
      >
        <StackedPhotos photos={faces} />
        <p className="font-display m-0 text-[16px] leading-[22px] font-medium tracking-[-0.02em] text-[#3f3f3f] max-lg:hidden">
          {proof.long}
        </p>
        <p className="font-display m-0 text-[16px] leading-[22px] font-medium tracking-[-0.02em] text-[#3f3f3f] lg:hidden">
          {proof.short}
        </p>
      </div>
    </section>
  )
}
