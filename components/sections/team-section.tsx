import { getTranslations } from '@/lib/i18n'
import { Team, type TeamMember } from '@/components/blocks/team'
import { getTeam } from '@/lib/content/team'
import type { Landing } from '@/lib/media'
import { toTeamCard } from '@/lib/content/team-card'

// Équipe : rien n'est affiché tant qu'aucun vrai membre n'est renseigné (content/team).
export async function TeamSection({
  spacer,
  tail,
  show,
  tabletTop,
  header,
  ns = 'home',
}: {
  spacer?: number
  tail?: number
  /** Fiches à afficher, par adresse (ex. « julien-marchetti »), dans cet ordre ; toutes par défaut. */
  show?: string[]
  tabletTop?: number
  header?: boolean
  ns?: Landing
}) {
  const tm = await getTranslations(`${ns}.team`)
  const members: TeamMember[] = getTeam().map(toTeamCard)
  const shown = show
    ? show.flatMap((k) => members.filter((m) => m.href.endsWith(`/${k}`)))
    : members
  if (shown.length === 0) return null
  return (
    <Team
      kicker={tm('kicker')}
      title={tm('title')}
      highlight={tm('highlight')}
      description={tm('description')}
      vertical={tm('vertical')}
      members={shown}
      profileLabel={(name) => tm('profile', { name })}
      spacer={spacer}
      tail={tail}
      tabletTop={tabletTop}
      header={header}
    />
  )
}
