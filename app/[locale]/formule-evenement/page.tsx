import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Landing } from '@/components/sections/landing'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { getReviewNodes } from '@/lib/seo-reviews'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const p = await getTranslations({ locale, namespace: 'pages' })
  const s = await getTranslations({ locale, namespace: 'seo' })
  return pageMetadata({
    title: p('bar.title'),
    description: s('bar'),
    path: '/formule-evenement',
  })
}

// Formule événement (« Mobile Bar & Cocktails ») : mêmes sections que l'accueil, textes et photos de l'espace `bar`, palette prune et menthe.
export default async function BarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  return (
    <main id="contenu" data-skin="bar" className="bg-cream">
      <PageJsonLd
        path="/formule-evenement"
        title={p('bar.title')}
        description={(await getTranslations('seo'))('bar')}
        crumbs={[{ label: p('bar.crumb') }]}
        extra={await getReviewNodes()}
      />
      <Landing ns="bar" />
    </main>
  )
}
