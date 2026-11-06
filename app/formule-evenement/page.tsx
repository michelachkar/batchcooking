import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { Landing } from '@/components/sections/landing'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { getReviewNodes } from '@/lib/seo-reviews'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({
    title: p('bar.title'),
    description: s('bar'),
    path: '/formule-evenement',
  })
}

// Formule événement (« Mobile Bar & Cocktails ») : mêmes sections que l'accueil, textes et photos de l'espace `bar`, palette prune et menthe.
export default async function BarPage() {
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
