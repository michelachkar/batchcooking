import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from '@/lib/i18n'
import { BlogTaxonomy, taxonomyMetadata } from '@/components/sections/blog-taxonomy'
import { getCategories, getPosts } from '@/lib/content/blog'

export const dynamicParams = false

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getCategories().find((x) => x.slug === slug)
  if (!c) return {}
  const p = await getTranslations('pages')
  return taxonomyMetadata(p('blogCategory', { name: c.name }), `/blog/categorie/${slug}`)
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const c = getCategories().find((x) => x.slug === slug)
  if (!c) notFound()
  const p = await getTranslations('pages')
  return (
    <BlogTaxonomy
      title={p('blogCategory', { name: c.name })}
      path={`/blog/categorie/${slug}`}
      posts={getPosts().filter((x) => x.data.categories.includes(c.name))}
    />
  )
}
