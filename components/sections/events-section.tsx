import { getTranslations } from 'next-intl/server'
import { EventsShowcase } from '@/components/blocks/events-showcase'
import { mediaOf, type Landing } from '@/lib/media'

// « Réalisations récentes » : mêmes textes partout (home.events), seuls les espaces autour changent selon la page.
export async function EventsSection({
  topSpacer,
  bottomGap,
  smallTitleMobile,
  ns = 'home',
}: {
  topSpacer?: number
  bottomGap?: number
  smallTitleMobile?: boolean
  ns?: Landing
}) {
  const m = mediaOf(ns)
  const ev = await getTranslations(`${ns}.events`)
  const projects = (
    ev.raw('projects') as { alt: string; type: string; title: string; href: string }[]
  ).map((p, i) => ({ ...p, image: m.events[i] }))
  if (projects.length === 0) return null
  const phone = (
    <a
      href={`tel:${ev('phone').replace(/\D/g, '')}`}
      className="bg-sage text-ink rounded-lg px-2 py-[2px]"
    >
      <strong>{ev('phone')}</strong>
    </a>
  )
  return (
    <EventsShowcase
      kicker={ev('kicker')}
      title={ev('title')}
      highlight={ev('highlight')}
      description={ev('description')}
      projects={projects}
      carouselLabels={{ prev: ev('prev'), next: ev('next'), navigation: ev('navigation') }}
      faces={m.faces}
      proof={{
        long: (
          <>
            {ev('proofLong')} {phone}
          </>
        ),
        short: (
          <>
            {ev('proofShort')} {phone}
          </>
        ),
      }}
      topSpacer={topSpacer}
      bottomGap={bottomGap}
      smallTitleMobile={smallTitleMobile}
    />
  )
}
