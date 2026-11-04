import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { ServiceGrid, type ServiceItem } from '@/components/blocks/service-grid'
import { StackedPhotos } from '@/components/blocks/stacked-photos'
import { PostsSections } from '@/components/sections/posts-sections'
import { ReviewsSection } from '@/components/sections/reviews-section'
import { media } from '@/lib/media'
import { getServices } from '@/lib/content/services'
import { vr } from '@/lib/flags'
import { PageJsonLd } from '@/components/seo/page-json-ld'
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
    title: p('services.title'),
    description: s('services'),
    path: '/services',
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const s = await getTranslations('services')
  const ev = await getTranslations('home.events')
  const phone = (
    <a
      href={`tel:${ev('phone').replace(/\D/g, '')}`}
      className="bg-sage text-ink rounded-lg px-2 py-[2px]"
    >
      <strong>{ev('phone')}</strong>
    </a>
  )
  const thumbs = new Map(getServices().map((e) => [`/services/${e.slug}`, e.data.image]))
  const services = (s.raw('items') as ServiceItem[]).map((it) => ({
    ...it,
    image: { ...thumbs.get(it.href)!, unoptimized: vr },
  }))
  return (
    <main id="contenu">
      <PageJsonLd
        path="/services"
        title={p('services.title')}
        description={(await getTranslations('seo'))('services')}
        crumbs={[{ label: p('services.crumb') }]}
      />
      <PageHead
        title={p('services.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('services.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.services}
      />
      <section data-section="services" className="leading-normal">
        <div className="mx-auto flex max-w-[1350px] flex-col gap-5">
          <div className="h-[50px]" aria-hidden />
          <ServiceGrid services={services} cta={s('cta')} />
          <div className="mt-[-15px] mb-[5px] flex flex-wrap items-center justify-center gap-x-[10px]">
            <StackedPhotos photos={media.faces} />
            <p className="font-display m-0 text-[15px] leading-[22px] font-medium tracking-[-0.02em] text-[#3f3f3f] max-lg:hidden">
              {ev('proofLong')} {phone}
            </p>
            <p className="font-display m-0 text-[15px] leading-[22px] font-medium tracking-[-0.02em] text-[#3f3f3f] lg:hidden">
              {ev('proofShort')} {phone}
            </p>
          </div>
          <div className="h-20" aria-hidden />
        </div>
      </section>
      <ReviewsSection variant="inset" />
      <PostsSections />
    </main>
  )
}
