import { getTranslations } from '@/lib/i18n'
import { ExperienceCards, type ExperienceCard } from '@/components/blocks/experience-cards'
import { mediaOf, type Landing } from '@/lib/media'

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

// « Nos services » : trois grandes cartes photo, même bloc sur l'accueil et sur la page Services (messages home.experiences).
export async function ExperiencesSection({ ns = 'home' }: { ns?: Landing }) {
  const media = mediaOf(ns)
  const x = await getTranslations(`${ns}.experiences`)
  const cards: ExperienceCard[] = (x.raw('cards') as CardText[]).map((c, i) => ({
    title: c.title,
    text: c.text,
    meta: c.meta,
    tag: c.tag,
    icon: (c.icon || undefined) as ExperienceCard['icon'],
    linkText: c.linkText,
    href: ns === 'home' ? HOME_LINKS[i] : '/services',
    image: media.cards[i],
    alt: c.alt,
  }))
  return (
    <ExperienceCards kicker={x('kicker')} title={x('title')} intro={x('intro')} cards={cards} />
  )
}
