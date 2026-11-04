import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Mdx } from '@/components/mdx'
import { PageHead } from '@/components/blocks/page-head'
import { PostNav } from '@/components/blocks/post-nav'
import { RelatedServices } from '@/components/blocks/related-services'
import { ServiceDetail } from '@/components/blocks/service-detail'
import type { IconName } from '@/components/ui/icon'
import { getService, getServices } from '@/lib/content/services'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'
import * as ld from '@/lib/jsonld'
import { vr } from '@/lib/flags'

export const dynamicParams = false

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const found = getService(slug)
  if (!found) return {}
  const { title, excerpt } = found.entry.data
  return pageMetadata({ title, description: excerpt, path: `/services/${slug}` })
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const found = getService(slug)
  if (!found) notFound()
  const { entry, prev, next, others } = found
  const p = await getTranslations('pages')
  const t = await getTranslations('service')
  const nav = (e: typeof prev, label: string) =>
    e && { label, title: e.data.title, href: `/services/${e.slug}` }
  return (
    <main id="contenu">
      <PageJsonLd
        path={`/services/${slug}`}
        title={entry.data.title}
        description={entry.data.excerpt}
        crumbs={[{ label: p('services.crumb'), path: '/services' }, { label: entry.data.title }]}
        extra={[
          ld.serviceNode({
            path: `/services/${slug}`,
            name: entry.data.title,
            description: entry.data.excerpt,
            image: entry.data.image.src,
          }),
          ld.faqPage(entry.data.faq),
        ]}
      />
      <PageHead
        title={entry.data.title}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: p('services.crumb'), href: '/services' },
          { label: entry.data.title },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.service}
        inset
      />
      <div data-section="body">
        <ServiceDetail
          included={entry.data.included}
          benefits={entry.data.benefits}
          faq={entry.data.faq}
          price={entry.data.price}
          turnaround={entry.data.turnaround}
          cta={{ href: '/contact' }}
          categories={t.raw('categoryItems') as { name: string; href: string }[]}
          labels={{
            included: t('included'),
            benefits: t('benefits'),
            faq: t('faq'),
            price: t('price'),
            turnaround: t('turnaround'),
            cta: t('cta'),
            categories: t('categories'),
          }}
        >
          <Mdx source={entry.body} />
        </ServiceDetail>
        <PostNav prev={nav(prev, t('prev'))} next={nav(next, t('next'))} />
        <RelatedServices
          title={t('related')}
          items={others.map((s) => ({
            title: s.data.title,
            excerpt: s.data.excerpt,
            href: `/services/${s.slug}`,
            icon: s.data.icon as IconName,
            image: { ...s.data.image, unoptimized: vr },
          }))}
        />
      </div>
    </main>
  )
}
