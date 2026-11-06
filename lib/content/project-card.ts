import type { RealisationCardData } from '@/components/blocks/realisation-card'
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

/** Carte de la galerie des réalisations : service, lieu et durée en plus de la photo. */
export function toRealisationCard(
  e: Entry<Project>,
  serviceLabels: Record<string, string>,
): RealisationCardData {
  const img = e.data.thumbnail ?? e.data.image
  return {
    title: e.data.title,
    href: `/realisations/${e.slug}`,
    excerpt: e.data.excerpt,
    service: e.data.service,
    serviceLabel: serviceLabels[e.data.service],
    location: e.data.location,
    duration: e.data.duration,
    guests: e.data.guests,
    occasion: e.data.occasion,
    city: e.data.city,
    group:
      e.data.guestCount === undefined
        ? undefined
        : e.data.guestCount <= 4
          ? 'small'
          : e.data.guestCount <= 10
            ? 'medium'
            : 'large',
    diets: e.data.diets,
    tags: e.data.tags,
    image: { ...img, unoptimized: vr },
  }
}
