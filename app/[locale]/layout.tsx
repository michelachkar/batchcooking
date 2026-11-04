import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SiteHeader } from '@/components/blocks/site-header'
import { SiteFooter } from '@/components/blocks/site-footer'
import { BackToTop } from '@/components/blocks/back-to-top'
import { Analytics } from '@/components/seo/analytics'
import { site } from '@/lib/site'
import { siteUrl } from '@/lib/seo'
import '../globals.css'

// Une famille variable par rôle (corps / titres), sous-ensemble latin.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const s = await getTranslations({ locale, namespace: 'seo' })
  return {
    metadataBase: new URL(siteUrl),
    title: { default: site.name, template: `%s | ${site.name}` },
    description: s('default'),
    alternates: { types: { 'application/rss+xml': '/feed.xml' } },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('site')

  return (
    <html lang={locale} className={`${jakarta.variable} ${outfit.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <BackToTop label={t('backToTop')} />
        <Analytics />
      </body>
    </html>
  )
}
