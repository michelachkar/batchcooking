import { CptAnim } from '@/components/blocks/cpt-anim'
import { TeamGrid, type TeamMember } from '@/components/blocks/team'
import styles from './related-team.module.css'

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
    <section className={styles.root}>
      <div className="container-x">
        <CptAnim />
        <h2 data-cm-section="fade-up" className={styles.title}>
          {title}
        </h2>
        <div className={styles.body}>
          <TeamGrid
            members={members}
            vertical={vertical}
            profileLabel={profileLabel}
            className={styles.grid}
            animate
            tall
          />
        </div>
      </div>
    </section>
  )
}
