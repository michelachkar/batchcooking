import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/content/blog'
import { renderOg } from '@/lib/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Image de partage de l’article'

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = getPost(slug)
  if (!found) notFound()
  return renderOg(found.entry.data.title, found.entry.data.categories[0])
}
