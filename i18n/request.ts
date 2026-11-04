import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale
  // Build de test visuel : textes de la référence (voir tests/visual/fixtures). Branche supprimée du build normal.
  const messages =
    process.env.NEXT_PUBLIC_VR === '1'
      ? (await import('../tests/visual/fixtures/vr-messages.json')).default
      : (await import(`../messages/${locale}.json`)).default
  return { locale, messages }
})
