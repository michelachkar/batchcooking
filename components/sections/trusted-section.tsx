import { getTranslations } from '@/lib/i18n'
import { TrustedBy } from '@/components/blocks/trusted-by'
import { mediaOf, type Landing } from '@/lib/media'

// « Ils nous font confiance » : rien tant qu'il n'y a pas de vraies références.
export async function TrustedSection({
  topGap,
  tail,
  logoHeight,
  bottomGap,
  ns = 'home',
}: {
  topGap?: number
  tail?: number
  logoHeight?: number
  bottomGap?: number
  ns?: Landing
}) {
  const m = mediaOf(ns)
  const tr = await getTranslations(`${ns}.trusted`)
  if (m.partners.length === 0) return null
  return (
    <TrustedBy
      title={tr('title')}
      logos={m.partners}
      topGap={topGap}
      tail={tail}
      logoHeight={logoHeight}
      bottomGap={bottomGap}
    />
  )
}
