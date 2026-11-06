import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from '@/lib/i18n'
import { BlogTaxonomy, taxonomyMetadata } from '@/components/sections/blog-taxonomy'
import { getArchives, getPosts } from '@/lib/content/blog'

export const dynamicParams = false

export function generateStaticParams() {
  return getArchives().map((ym) => ({ ym }))
}

type Props = { params: Promise<{ ym: string }> }

async function monthLabel(ym: string) {
  return new Intl.DateTimeFormat('fr', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${ym}-01T00:00:00Z`))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ym } = await params
  if (!getArchives().includes(ym)) return {}
  const p = await getTranslations('pages')
  return taxonomyMetadata(p('blogArchive', { month: await monthLabel(ym) }), `/blog/archives/${ym}`)
}

export default async function ArchivePage({ params }: Props) {
  const { ym } = await params
  if (!getArchives().includes(ym)) notFound()
  const p = await getTranslations('pages')
  return (
    <BlogTaxonomy
      title={p('blogArchive', { month: await monthLabel(ym) })}
      path={`/blog/archives/${ym}`}
      posts={getPosts().filter((x) => x.data.date.toISOString().startsWith(ym))}
    />
  )
}
