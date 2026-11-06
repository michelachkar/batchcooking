import type { Metadata } from 'next'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import { BlogGrid } from '@/components/blocks/blog-grid'
import { PageHead } from '@/components/blocks/page-head'
import { getPosts } from '@/lib/content/blog'
import { vr } from '@/lib/flags'
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
    title: p('blog.title'),
    description: s('blog'),
    path: '/blog',
  })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const fmt = new Intl.DateTimeFormat(vr ? 'en-US' : await getLocale(), {
    dateStyle: 'medium',
    timeZone: 'UTC',
  })
  const posts = getPosts().map((e) => ({
    title: e.data.title,
    href: `/blog/${e.slug}`,
    date: fmt.format(e.data.date),
    category: e.data.categories[0],
    image: (e.data.thumbnail ?? e.data.image) && {
      ...(e.data.thumbnail ?? e.data.image)!,
      unoptimized: vr,
    },
  }))
  return (
    <main id="contenu">
      <PageJsonLd
        path="/blog"
        title={p('blog.title')}
        description={(await getTranslations('seo'))('blog')}
        crumbs={[{ label: p('blog.crumb') }]}
      />
      <PageHead
        title={p('blog.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('blog.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.blog}
        inset
      />
      <div data-section="body">{posts.length > 0 && <BlogGrid posts={posts} />}</div>
    </main>
  )
}
