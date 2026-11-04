import type { TeamMember } from '@/components/blocks/team'
import type { Entry } from '@/lib/content'
import type { TeamMemberData } from '@/lib/content/schemas'
import { vr } from '@/lib/flags'

/** Carte d'équipe (accueil, page équipe, « autres membres ») à partir d'une fiche. */
export function toTeamCard({ slug, data }: Entry<TeamMemberData>): TeamMember {
  const social: NonNullable<TeamMember['social']> = []
  const linkedin = data.social.find((s) => s.type === 'linkedin')
  if (linkedin) social.push({ label: 'LinkedIn', href: linkedin.href, type: 'linkedin' })
  if (data.email) social.push({ label: data.email, href: `mailto:${data.email}`, type: 'mail' })
  return {
    name: data.name,
    role: data.role,
    image: { ...data.image, unoptimized: vr },
    alt: data.image.alt,
    href: `/equipe/${slug}`,
    social: social.length > 0 ? social : undefined,
  }
}
