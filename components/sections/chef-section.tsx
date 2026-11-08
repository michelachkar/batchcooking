import { getTranslations } from '@/lib/i18n'
import { ChefIntro } from '@/components/blocks/chef-intro'
import type { IconName } from '@/components/ui/icon'
import { media } from '@/lib/media'

// Pages des trois services, dans l'ordre des chiffres de home.chef.
const SERVICE_LINKS = [
  '/services/batch-cooking',
  '/services/chef-prive',
  '/services/cours-de-cuisine',
]

// Présentation de la cheffe ou du chef : accueil (messages home.chef).
export async function ChefSection() {
  const c = await getTranslations('home.chef')
  const h = await getTranslations('home.hero')
  return (
    <ChefIntro
      kicker={c('kicker')}
      title={c('title')}
      subtitle={c('subtitle')}
      paragraphs={c.raw('paragraphs') as string[]}
      stats={(c.raw('stats') as { icon: IconName; value: string; label: string }[]).map(
        (st, i) => ({
          ...st,
          href: SERVICE_LINKS[i],
        }),
      )}
      quote={c.raw('quote') as { text: string; author: string }}
      caption={c('caption')}
      trustBar={{ googleReviews: h('googleReviews') }}
      image={{ ...media.chef, alt: c('imageAlt') }}
      inset={{ ...media.chefInset, alt: c('insetAlt') }}
    />
  )
}
