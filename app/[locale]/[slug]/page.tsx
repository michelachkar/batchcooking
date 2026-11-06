import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
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
  params: Promise<{ locale: string; slug: string }>
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
export default async function TextPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
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
      <div data-section="body" className="py-[110px] leading-normal max-md:py-[70px]">
        <div className="container-x">
          <div className="[&_h2]:font-display max-w-[800px] text-base leading-7 text-[#3A352E] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-[32px] [&_h2]:leading-10 [&_h2]:font-semibold [&_li]:leading-7 [&_p]:mt-0 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-8">
            <Mdx source={page.body} />
          </div>
        </div>
      </div>
    </main>
  )
}
