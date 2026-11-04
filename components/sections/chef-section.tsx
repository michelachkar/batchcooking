import { getTranslations } from 'next-intl/server'
import { ChefIntro } from '@/components/blocks/chef-intro'
import type { IconName } from '@/components/ui/icon'
import { mediaOf, type Landing } from '@/lib/media'

// Présentation de la cheffe ou du chef : même bloc sur l'accueil et sur la page À propos (messages home.chef).
export async function ChefSection({ ns = 'home' }: { ns?: Landing }) {
  const m = mediaOf(ns)
  const c = await getTranslations(`${ns}.chef`)
  return (
    <ChefIntro
      kicker={c('kicker')}
      title={c('title')}
      subtitle={c('subtitle')}
      paragraphs={c.raw('paragraphs') as string[]}
      stats={c.raw('stats') as { icon: IconName; value: string; label: string }[]}
      quote={c.raw('quote') as { text: string; author: string }}
      listTitle={c('listTitle')}
      listStyle="line"
      items={c.raw('items') as string[]}
      link={{ label: c('link'), href: '/equipe' }}
      caption={c('caption')}
      badge={{ icon: 'award', value: c('badgeValue'), text: c('badgeText') }}
      image={{ ...m.chef, alt: c('imageAlt') }}
      inset={{ ...m.chefInset, alt: c('insetAlt') }}
    />
  )
}
