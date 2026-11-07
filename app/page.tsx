import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { getReviewNodes } from '@/lib/seo-reviews'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getTranslations('seo')
  return {
    ...pageMetadata({ title: s('homeTitle'), description: s('default'), path: '/' }),
    title: { absolute: s('homeTitle') },
  }
}

import { Landing } from '@/components/sections/landing'

// Accueil : voir components/sections/landing.tsx.
export default async function HomePage() {
  return (
    <main id="contenu">
      <PageJsonLd
        path="/"
        title={(await getTranslations('seo'))('homeTitle')}
        description={(await getTranslations('seo'))('default')}
        extra={await getReviewNodes()}
      />
      <Landing ns="home" />
    </main>
  )
}
