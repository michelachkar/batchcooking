import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { PostNav } from '@/components/blocks/post-nav'
import { ProjectDetail } from '@/components/blocks/project-detail'
import { RelatedProjects } from '@/components/blocks/related-projects'
import { Mdx } from '@/components/mdx'
import { toProjectCard } from '@/lib/content/project-card'
import { getProject, getProjects } from '@/lib/content/projects'
import { vr } from '@/lib/flags'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'
import * as ld from '@/lib/jsonld'

export const dynamicParams = false

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const found = getProject(slug)
  if (!found) return {}
  const { title, excerpt } = found.entry.data
  return pageMetadata({ title, description: excerpt, path: `/realisations/${slug}` })
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const found = getProject(slug)
  if (!found) notFound()
  const { entry, prev, next, related } = found
  const { data } = entry
  const p = await getTranslations('pages')
  const t = await getTranslations('project')
  const date = new Intl.DateTimeFormat(vr ? 'en-US' : await getLocale(), {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(data.date)
  const nav = (e: typeof prev, label: string) =>
    e && { label, title: e.data.title, href: `/realisations/${e.slug}` }
  const rows = [
    data.client && { key: 'client' as const, label: t('client'), value: data.client },
    { key: 'date' as const, label: t('date'), value: date },
    data.location && { key: 'location' as const, label: t('location'), value: data.location },
    data.url && { key: 'url' as const, label: t('url'), value: data.url, href: data.url },
    data.categories.length > 0 && {
      key: 'category' as const,
      label: t('category'),
      value: data.categories.join(', '),
    },
  ].filter((r) => typeof r === 'object')
  return (
    <main id="contenu">
      <PageJsonLd
        path={`/realisations/${slug}`}
        title={data.title}
        description={data.excerpt}
        crumbs={[{ label: p('portfolio.crumb'), path: '/realisations' }, { label: data.title }]}
        extra={[
          ld.projectNode({
            path: `/realisations/${slug}`,
            name: data.title,
            description: data.excerpt,
            created: data.date.toISOString(),
            image: data.image.src,
          }),
        ]}
      />
      <PageHead
        title={data.title}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: p('portfolio.crumb'), href: '/realisations' },
          { label: data.title },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.portfolio}
        inset
      />
      <div data-section="body">
        <ProjectDetail
          image={{ ...data.image, unoptimized: vr }}
          gallery={data.gallery.map((g) => ({ ...g, unoptimized: vr }))}
          galleryTitle={t('gallery')}
          detailsTitle={t('details')}
          details={rows}
        >
          <Mdx source={entry.body} />
        </ProjectDetail>
        <PostNav prev={nav(prev, t('prev'))} next={nav(next, t('next'))} />
        <RelatedProjects title={t('related')} items={related.map(toProjectCard)} />
      </div>
    </main>
  )
}
