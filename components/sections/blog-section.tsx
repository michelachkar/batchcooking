import { getTranslations } from '@/lib/i18n'
import { BlogList, type BlogCardData, type SidebarData } from '@/components/blocks/blog-list'
import { getArchives, getCategories, getPosts, getTags } from '@/lib/content/blog'
import type { Entry } from '@/lib/content'
import type { Post } from '@/lib/content/schemas'

/** Cartes de la liste à partir des articles. */
export function toCards(posts: Entry<Post>[]): BlogCardData[] {
  return posts.map((p) => ({
    title: p.data.title,
    excerpt: p.data.excerpt,
    href: `/blog/${p.slug}`,
    image: p.data.image && p.data.image,
  }))
}

/** Colonne latérale à partir des articles (undefined tant qu'il n'y en a pas). */
export async function getBlogSidebar(): Promise<SidebarData | undefined> {
  const all = getPosts()
  if (all.length === 0) return undefined
  const t = await getTranslations('blog')
  const locale = 'fr'
  const month = (ym: string) =>
    new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
      new Date(`${ym}-01T00:00:00Z`),
    )
  const comments = t.raw('comments') as {
    title: string
    on: string
    items: { author: string; postTitle: string; href: string }[]
  }
  return {
    searchLabel: t('search'),
    searchAction: '/recherche',
    recentTitle: t('recent'),
    recent: all.slice(0, 5).map((p) => {
      const img = p.data.thumbnail ?? p.data.image
      return {
        title: p.data.title,
        href: `/blog/${p.slug}`,
        image: img && img,
      }
    }),
    comments: comments.items.length > 0 ? comments : undefined,
    archivesTitle: t('archives'),
    archives: getArchives().map((ym) => ({ label: month(ym), href: `/blog/archives/${ym}` })),
    categoriesTitle: t('categories'),
    categories: getCategories().map((c) => ({ label: c.name, href: `/blog/categorie/${c.slug}` })),
    tagsTitle: t('tagsTitle'),
    tags: getTags().map((tag) => ({
      label: tag.name,
      href: `/blog/etiquette/${tag.slug}`,
      count: tag.count,
    })),
  }
}

// Liste du blog : uniquement de vrais articles (content/blog) ; rien tant qu'il n'y en a pas.
export async function BlogSection({
  posts,
}: {
  /** Articles à lister (tous par défaut). */
  posts?: Entry<Post>[]
}) {
  const all = getPosts()
  if (all.length === 0) return null
  const t = await getTranslations('blog')
  return (
    <BlogList
      posts={toCards(posts ?? all)}
      readMore={t('readMore')}
      sidebar={await getBlogSidebar()}
    />
  )
}
