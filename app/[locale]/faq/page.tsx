import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { EventsSection } from '@/components/sections/events-section'
import { FaqSection } from '@/components/sections/faq-section'
import { ReviewsSection } from '@/components/sections/reviews-section'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage } from '@/lib/jsonld'
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
    title: p('faq.title'),
    description: s('faq'),
    path: '/faq',
  })
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  return (
    <main id="contenu">
      <PageJsonLd
        path="/faq"
        title={p('faq.title')}
        description={(await getTranslations('seo'))('faq')}
        crumbs={[{ label: p('faq.crumb') }]}
        extra={[
          faqPage(
            (await getTranslations('faq')).raw('items') as { question: string; answer: string }[],
          ),
          ...(await getReviewNodes()),
        ]}
      />
      <PageHead
        title={p('faq.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('faq.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.faq}
      />
      <FaqSection />
      <ReviewsSection variant="inset-proof" initial={0} tight />
      <EventsSection topSpacer={50} bottomGap={80} smallTitleMobile />
    </main>
  )
}
