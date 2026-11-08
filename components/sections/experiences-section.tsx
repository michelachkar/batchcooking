import { getTranslations } from '@/lib/i18n'
import { ExperienceCards, type ExperienceCard } from '@/components/blocks/experience-cards'
import { media } from '@/lib/media'

// Liens des trois cartes de l'accueil : une page par service.
const HOME_LINKS = ['/services/batch-cooking', '/services/chef-prive', '/services/cours-de-cuisine']

type CardText = {
  title: string
  text: string
  meta: string
  tag?: string
  icon: string
  linkText: string
  alt: string
}

// « Nos services » : trois grandes cartes photo, accueil et page Services (messages home.experiences).
export async function ExperiencesSection({ tone }: { tone?: 'white' | 'cream' }) {
  const x = await getTranslations('home.experiences')
  const cards: ExperienceCard[] = (x.raw('cards') as CardText[]).map((c, i) => ({
    title: c.title,
    text: c.text,
    meta: c.meta,
    tag: c.tag,
    icon: (c.icon || undefined) as ExperienceCard['icon'],
    linkText: c.linkText,
    href: HOME_LINKS[i],
    image: media.cards[i],
    alt: c.alt,
  }))
  return (
    <ExperienceCards
      kicker={x('kicker')}
      title={x('title')}
      intro={x('intro')}
      cards={cards}
      tone={tone}
    />
  )
}
