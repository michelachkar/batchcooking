import { getTranslations } from '@/lib/i18n'
import { ChefIntro } from '@/components/blocks/chef-intro'
import type { IconName } from '@/components/ui/icon'
import { media } from '@/lib/media'

// Présentation de la cheffe ou du chef : accueil (messages home.chef).
export async function ChefSection() {
  const c = await getTranslations('home.chef')
  return (
    <ChefIntro
      kicker={c('kicker')}
      title={c('title')}
      subtitle={c('subtitle')}
      paragraphs={c.raw('paragraphs') as string[]}
      stats={c.raw('stats') as { icon: IconName; value: string; label: string }[]}
      quote={c.raw('quote') as { text: string; author: string }}
      caption={c('caption')}
      badge={{ icon: 'award', value: c('badgeValue'), text: c('badgeText') }}
      image={{ ...media.chef, alt: c('imageAlt') }}
      inset={{ ...media.chefInset, alt: c('insetAlt') }}
    />
  )
}
