import type { ProjectCard } from '@/components/blocks/portfolio-grid'
import type { Entry } from '@/lib/content'
import type { Project } from '@/lib/content/schemas'
import { vr } from '@/lib/flags'

/** Carte de la grille à partir d'une réalisation. */
export function toProjectCard(e: Entry<Project>): ProjectCard {
  return {
    title: e.data.title,
    href: `/realisations/${e.slug}`,
    categories: e.data.categories,
    image: { ...(e.data.thumbnail ?? e.data.image), unoptimized: vr },
  }
}
