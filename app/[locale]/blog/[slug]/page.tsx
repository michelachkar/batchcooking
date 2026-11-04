import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import { Article } from '@/components/blocks/article'
import { PageHead } from '@/components/blocks/page-head'
import { Mdx } from '@/components/mdx'
import { getBlogSidebar } from '@/components/sections/blog-section'
import { getPost, getPosts, slugify } from '@/lib/content/blog'
import { vr } from '@/lib/flags'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'
import * as ld from '@/lib/jsonld'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const found = getPost(slug)
  if (!found) return {}
  const { title, excerpt, date, updated } = found.entry.data
  return pageMetadata({
    title,
    description: excerpt,
    path: `/blog/${slug}`,
    type: 'article',
    image: `/blog/${slug}/opengraph-image`,
    published: date.toISOString(),
    modified: (updated ?? date).toISOString(),
  })
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const found = getPost(slug)
  if (!found) notFound()
  const { data, body } = found.entry
  const p = await getTranslations('pages')
  const t = await getTranslations('blog')
  const date = new Intl.DateTimeFormat(vr ? 'en-US' : await getLocale(), {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(data.date)
  const category = (name: string) => ({ name, href: `/blog/categorie/${slugify(name)}` })
  return (
    <main id="contenu">
      <PageJsonLd
        path={`/blog/${slug}`}
        title={data.title}
        description={data.excerpt}
        type="WebPage"
        modified={(data.updated ?? data.date).toISOString()}
        crumbs={[{ label: p('blog.crumb'), path: '/blog' }, { label: data.title }]}
        extra={[
          ld.articleNode({
            path: `/blog/${slug}`,
            title: data.title,
            description: data.excerpt,
            published: data.date.toISOString(),
            modified: (data.updated ?? data.date).toISOString(),
            author: data.author,
            image: data.image?.src,
          }),
        ]}
      />
      <PageHead
        title={data.title}
        crumbs={[
          { label: p('home'), href: '/' },
          ...data.categories.slice(0, 1).map((c) => ({ label: c, href: category(c).href })),
          { label: data.title },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.blog}
        inset
      />
      <div data-section="body">
        <Article
          title={data.title}
          image={data.image && { ...data.image, unoptimized: vr }}
          author={data.author}
          categories={data.categories.map(category)}
          date={date}
          tags={data.tags.map((name) => ({ name, href: `/blog/etiquette/${slugify(name)}` }))}
          tagsLabel={t('tags')}
          sidebar={await getBlogSidebar()}
        >
          <Mdx source={body} />
        </Article>
      </div>
    </main>
  )
}
