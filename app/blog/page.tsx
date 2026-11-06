import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { BlogGrid } from '@/components/blocks/blog-grid'
import { PageHead } from '@/components/blocks/page-head'
import { getPosts } from '@/lib/content/blog'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({
    title: p('blog.title'),
    description: s('blog'),
    path: '/blog',
  })
}

export default async function BlogPage() {
  const p = await getTranslations('pages')
  const fmt = new Intl.DateTimeFormat('fr', {
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
