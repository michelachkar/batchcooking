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
    title: p('blogLeft.title'),
    description: s('blog'),
    path: '/blog/sidebar-gauche',
    noindex: true,
  })
}

export default async function BlogLeftPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  return (
    <main id="contenu">
      <PageJsonLd
        path="/blog/sidebar-gauche"
        title={p('blogLeft.title')}
        description={(await getTranslations('seo'))('blog')}
        crumbs={[{ label: p('blogLeft.crumb') }]}
      />
      <PageHead
        title={p('blogLeft.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('blogLeft.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.blog}
        inset
      />
      <div data-section="body">
        <BlogSection side="left" />
      </div>
    </main>
  )
}
