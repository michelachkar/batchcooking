import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { renderOg } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Image de partage'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const s = await getTranslations({ locale, namespace: 'seo' })
  return renderOg(s('homeTitle'))
}
