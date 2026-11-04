import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { vr } from '@/lib/flags'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { getReviewNodes } from '@/lib/seo-reviews'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const s = await getTranslations({ locale, namespace: 'seo' })
  return {
    ...pageMetadata({ title: s('homeTitle'), description: s('default'), path: '/' }),
    title: { absolute: s('homeTitle') },
  }
}

import { Landing } from '@/components/sections/landing'

// Accueil : le même ensemble de sections que la page « Mobile Bar & Cocktails » (voir components/sections/landing.tsx).
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
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
