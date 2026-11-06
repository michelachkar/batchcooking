import { getTranslations } from '@/lib/i18n'
import { Occasions } from '@/components/blocks/occasions'
import { mediaOf, type Landing } from '@/lib/media'

// « Occasions » : même bloc partout, seul l'espace au-dessus change (80 px sur l'accueil, 15 px sur la page équipe).
export async function OccasionsSection({
  topSpacer,
  wideHeader,
  ns = 'home',
  source,
  href = '/services',
}: {
  topSpacer?: number
  wideHeader?: boolean
  ns?: Landing
  /** Espace de messages des textes (par défaut `${ns}.occasions`) : photos de `ns`, textes d'une autre page. */
  source?: string
  /** Destination des cartes et du bouton. */
  href?: string
}) {
  const m = mediaOf(ns)
  const oc = await getTranslations(source ?? `${ns}.occasions`)
  const items = (oc.raw('occasions') as { name: string; description: string }[]).map((o, i) => ({
    ...o,
    href,
    ...m.occasions[i],
  }))
  return (
    <Occasions
      kicker={oc('kicker')}
      title={oc('title')}
      highlight={oc('highlight')}
      description={oc('description')}
      occasions={items}
      button={{ label: oc('button'), href }}
      topSpacer={topSpacer}
      wideHeader={wideHeader}
    />
  )
}
