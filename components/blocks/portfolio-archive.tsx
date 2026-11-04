import { CptAnim } from '@/components/blocks/cpt-anim'
import { PortfolioGrid, type ProjectCard } from '@/components/blocks/portfolio-grid'

// Page « réalisations » : la grille de cartes dans le conteneur de page.
export function PortfolioArchive({ items }: { items: ProjectCard[] }) {
  return (
    <div className="py-[110px] leading-normal max-md:py-[70px]">
      <div className="container-x">
        <CptAnim />
        <PortfolioGrid items={items} className="mb-5" />
      </div>
    </div>
  )
}
