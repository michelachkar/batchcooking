import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { BlogTaxonomy, taxonomyMetadata } from '@/components/sections/blog-taxonomy'
import { getArchives, getPosts } from '@/lib/content/blog'
import { vr } from '@/lib/flags'

export const dynamicParams = false

export function generateStaticParams() {
  return getArchives().map((ym) => ({ ym }))
}

type Props = { params: Promise<{ locale: string; ym: string }> }

async function monthLabel(ym: string, locale: string) {
  return new Intl.DateTimeFormat(vr ? 'en-US' : locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${ym}-01T00:00:00Z`))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, ym } = await params
  if (!getArchives().includes(ym)) return {}
  const p = await getTranslations({ locale, namespace: 'pages' })
  return taxonomyMetadata(
    locale,
    p('blogArchive', { month: await monthLabel(ym, locale) }),
    `/blog/archives/${ym}`,
  )
}

export default async function ArchivePage({ params }: Props) {
  const { locale, ym } = await params
  setRequestLocale(locale)
  if (!getArchives().includes(ym)) notFound()
  const p = await getTranslations('pages')
  return (
    <BlogTaxonomy
      title={p('blogArchive', { month: await monthLabel(ym, locale) })}
      path={`/blog/archives/${ym}`}
      posts={getPosts().filter((x) => x.data.date.toISOString().startsWith(ym))}
    />
  )
}
