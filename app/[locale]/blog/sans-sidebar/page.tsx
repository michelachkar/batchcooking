import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { BlogSection } from '@/components/sections/blog-section'
import { media } from '@/lib/media'
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
    title: p('blogWide.title'),
    description: s('blog'),
    path: '/blog/sans-sidebar',
    noindex: true,
  })
}

export default async function BlogWidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  return (
    <main id="contenu">
      <PageJsonLd
        path="/blog/sans-sidebar"
        title={p('blogWide.title')}
        description={(await getTranslations('seo'))('blog')}
        crumbs={[{ label: p('blogWide.crumb') }]}
      />
      <PageHead
        title={p('blogWide.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('blogWide.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.blog}
        inset
      />
      <div data-section="body">
        <BlogSection withSidebar={false} />
      </div>
    </main>
  )
}
