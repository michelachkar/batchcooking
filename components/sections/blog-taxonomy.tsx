import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { BlogSection } from '@/components/sections/blog-section'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import type { Entry } from '@/lib/content'
import type { Post } from '@/lib/content/schemas'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

/** Métadonnées d'une page de classement du blog : indexation refusée (doublon de la liste), liens suivis. */
export async function taxonomyMetadata(
  locale: string,
  title: string,
  path: string,
): Promise<Metadata> {
  const s = await getTranslations({ locale, namespace: 'seo' })
  return pageMetadata({ title, description: s('blog'), path, noindex: true })
}

// Liste des articles d'une catégorie, d'un mois ou d'un mot-clé : même mise en page que le blog.
export async function BlogTaxonomy({
  title,
  path,
  posts,
}: {
  title: string
  path: string
  posts: Entry<Post>[]
}) {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return (
    <main id="contenu">
      <PageJsonLd
        path={path}
        title={title}
        description={s('blog')}
        crumbs={[{ label: p('blog.crumb'), path: '/blog' }, { label: title }]}
      />
      <PageHead
        title={title}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: p('blog.crumb'), href: '/blog' },
          { label: title },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.blog}
        inset
      />
      <div data-section="body">
        <BlogSection posts={posts} />
      </div>
    </main>
  )
}
