import { getTranslations } from '@/lib/i18n'
import { renderOg } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Image de partage'

export default async function Image() {
  const s = await getTranslations('seo')
  return renderOg(s('homeTitle'))
}
