import { CptAnim } from '@/components/blocks/cpt-anim'
import { PortfolioGrid, type ProjectCard } from '@/components/blocks/portfolio-grid'

// « Projets similaires » : trois cartes sous la navigation précédent / suivant.
export function RelatedProjects({ title, items }: { title: string; items: ProjectCard[] }) {
  if (items.length === 0) return null
  return (
    <section className="bg-cream py-[60px] leading-normal">
      <div className="container-x">
        <CptAnim />
        <h2
          data-cm-section="fade-up"
          className="font-display mb-8 text-center text-[52px] leading-[70px] font-bold tracking-[-0.02em] text-[#262c29] max-lg:text-[45px] max-lg:leading-[56px]"
        >
          {title}
        </h2>
        <PortfolioGrid items={items} />
      </div>
    </section>
  )
}
