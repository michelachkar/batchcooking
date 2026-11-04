import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { BlogTaxonomy, taxonomyMetadata } from '@/components/sections/blog-taxonomy'
import { getPosts, getTags } from '@/lib/content/blog'

export const dynamicParams = false

export function generateStaticParams() {
  return getTags().map((t) => ({ slug: t.slug }))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const tag = getTags().find((x) => x.slug === slug)
  if (!tag) return {}
  const p = await getTranslations({ locale, namespace: 'pages' })
  return taxonomyMetadata(locale, p('blogTag', { name: tag.name }), `/blog/etiquette/${slug}`)
}

export default async function TagPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const tag = getTags().find((x) => x.slug === slug)
  if (!tag) notFound()
  const p = await getTranslations('pages')
  return (
    <BlogTaxonomy
      title={p('blogTag', { name: tag.name })}
      path={`/blog/etiquette/${slug}`}
      posts={getPosts().filter((x) => x.data.tags.includes(tag.name))}
    />
  )
}
