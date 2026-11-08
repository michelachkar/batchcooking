import { getTranslations } from '@/lib/i18n'
import { EventsShowcase } from '@/components/blocks/events-showcase'
import { media } from '@/lib/media'

// Recettes de l'accueil (messages home.events).
export async function EventsSection() {
  const ev = await getTranslations('home.events')
  const projects = (
    ev.raw('projects') as { alt: string; type: string; title: string; href: string }[]
  ).map((p, i) => ({ ...p, image: media.events[i] }))
  if (projects.length === 0) return null
  return (
    <EventsShowcase
      kicker={ev('kicker')}
      title={ev('title')}
      highlight={ev('highlight')}
      description={ev('description')}
      projects={projects}
      cta={{ label: ev('cta'), href: ev('ctaHref') }}
      carouselLabels={{ prev: ev('prev'), next: ev('next'), navigation: ev('navigation') }}
    />
  )
}
