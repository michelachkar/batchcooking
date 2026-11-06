import type { Metadata } from 'next'
import { Caveat, Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SiteHeader } from '@/components/blocks/site-header'
import { SiteFooter } from '@/components/blocks/site-footer'
import { BackToTop } from '@/components/blocks/back-to-top'
import { LeadProvider } from '@/components/lead/lead-provider'
import type { LeadPack, LeadTexts } from '@/components/lead/lead-modal'
import { QuoteProvider, type QuoteTexts } from '@/components/quote/quote-provider'
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
// Police manuscrite, réservée à la phrase d'accroche du hero.
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', display: 'swap' })
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
  const all = await getTranslations()
  const { packs, ...leadTexts } = all.raw('lead') as LeadTexts & { packs: LeadPack[] }

  // Formules du formulaire de devis : lues dans les cartes de la page (une seule source pour titres et prix).
  const formTexts = (ns: 'chefPage' | 'coursPage', items: 'packages' | 'ideas') => {
    const form = all.raw(`${ns}.form`) as { options: { value: string; label: string }[] }
    const from = (all.raw(`${ns}.${items}.labels`) as { from: string }).from
    const cards = all.raw(`${ns}.${items}.items`) as {
      value: string
      title: string
      subtitle: string
      price: string
      priceNote: string
      fixed?: boolean
    }[]
    const other = form.options.filter((o) => o.value === 'autre')
    return {
      ...form,
      options: [
        ...cards.map((c) => ({
          value: c.value,
          label: c.title,
          text: c.subtitle,
          price: `${c.fixed ? '' : `${from} `}${c.price} ${c.priceNote}`,
        })),
        ...other,
      ],
    } as never
  }

  return (
    <html lang={locale} className={`${jakarta.variable} ${outfit.variable} ${caveat.variable}`}>
      <body>
        <LeadProvider texts={leadTexts as LeadTexts} packs={packs}>
          <QuoteProvider
            texts={all.raw('quote') as QuoteTexts}
            chef={formTexts('chefPage', 'packages')}
            cours={formTexts('coursPage', 'ideas')}
          >
            <SiteHeader />
            {children}
            <SiteFooter />
            <BackToTop label={t('backToTop')} />
          </QuoteProvider>
        </LeadProvider>
        <Analytics />
      </body>
    </html>
  )
}
