import { getTranslations } from '@/lib/i18n'
import { EventsShowcase } from '@/components/blocks/events-showcase'
import { media } from '@/lib/media'
import { recipes } from '@/lib/recipes'

// Recettes de l'accueil (messages home.events) : mêmes fiches que la page Recettes.
export async function EventsSection() {
  const ev = await getTranslations('home.events')
  const cards = recipes.map((r, i) => ({ ...r, image: media.events[i % media.events.length] }))
  if (cards.length === 0) return null
  return (
    <EventsShowcase
      kicker={ev('kicker')}
      title={ev('title')}
      highlight={ev('highlight')}
      description={ev('description')}
      recipes={cards}
      cta={{ label: ev('cta'), href: ev('ctaHref') }}
      carouselLabels={{ prev: ev('prev'), next: ev('next'), navigation: ev('navigation') }}
    />
  )
}
