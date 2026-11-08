import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from '@/lib/i18n'
import styles from './page.module.css'
import { PageHead } from '@/components/layout/page-head'
import { Mdx } from '@/components/mdx'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { getPage, getPages } from '@/lib/content/pages'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return getPages().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getPage(slug)
  if (!page) return {}
  return pageMetadata({
    title: page.data.title,
    description: page.data.description,
    path: `/${slug}`,
  })
}

// Page de texte (MDX) : conditions de réservation, offrir un repas, mentions légales...
export default async function TextPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getPage(slug)
  if (!page) notFound()
  const p = await getTranslations('pages')
  const { title, description, updated } = page.data
  return (
    <main id="contenu">
      <PageJsonLd
        path={`/${slug}`}
        title={title}
        description={description}
        modified={updated.toISOString()}
        crumbs={[{ label: title }]}
      />
      <PageHead
        title={title}
        crumbs={[{ label: p('home'), href: '/' }, { label: title }]}
        navLabel={p('navLabel')}
        background={media.heads.page}
        inset
      />
      <div data-section="body" className={styles.body}>
        <div className="container-x">
          <div className={styles.content}>
            <Mdx source={page.body} />
          </div>
        </div>
      </div>
    </main>
  )
}
