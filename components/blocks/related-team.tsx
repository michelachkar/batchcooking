import { CptAnim } from '@/components/blocks/cpt-anim'
import { TeamGrid, type TeamMember } from '@/components/blocks/team'

// « Autres membres » : titre puis grille de cartes, qui remonte sur le titre comme sur la page équipe.
export function RelatedTeam({
  title,
  members,
  vertical,
  profileLabel,
}: {
  title: string
  members: TeamMember[]
  vertical: string
  profileLabel: (name: string) => string
}) {
  if (members.length === 0) return null
  return (
    <section className="bg-[#F0EBE3] pb-[60px] leading-normal">
      <div className="container-x">
        <CptAnim />
        <h2
          data-cm-section="fade-up"
          className="font-display m-0 text-center text-[52px] leading-[70px] font-bold tracking-[-0.02em] text-[#3A352E] max-lg:text-[45px] max-lg:leading-[56px]"
        >
          {title}
        </h2>
        <div className="py-[64.8px]">
          <TeamGrid
            members={members}
            vertical={vertical}
            profileLabel={profileLabel}
            className="-mt-[140px]"
            animate
            tall
          />
        </div>
      </div>
    </section>
  )
}
