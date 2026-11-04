import { getTranslations } from 'next-intl/server'
import { Occasions } from '@/components/blocks/occasions'
import { mediaOf, type Landing } from '@/lib/media'

// « Occasions » : même bloc partout, seul l'espace au-dessus change (80 px sur l'accueil, 15 px sur la page équipe).
export async function OccasionsSection({
  topSpacer,
  wideHeader,
  ns = 'home',
}: {
  topSpacer?: number
  wideHeader?: boolean
  ns?: Landing
}) {
  const m = mediaOf(ns)
  const oc = await getTranslations(`${ns}.occasions`)
  const items = (oc.raw('occasions') as { name: string; description: string }[]).map((o, i) => ({
    ...o,
    href: '/services',
    ...m.occasions[i],
  }))
  return (
    <Occasions
      kicker={oc('kicker')}
      title={oc('title')}
      highlight={oc('highlight')}
      description={oc('description')}
      occasions={items}
      button={{ label: oc('button'), href: '/services' }}
      topSpacer={topSpacer}
      wideHeader={wideHeader}
    />
  )
}
