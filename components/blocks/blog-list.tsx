import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './blog-list.module.css'
import { BlogSidebar, type SidebarData } from '@/components/blocks/blog-sidebar'

export type { SidebarData }
export type BlogCardData = {
  title: string
  excerpt: string
  href: string
  image?: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
}

type Props = {
  posts: BlogCardData[]
  readMore: string
  sidebar?: SidebarData
}

// Liste d'articles : cartes blanches à image arrondie, colonne latérale facultative (recherche, derniers articles, archives, catégories).
export function BlogList({ posts, readMore, sidebar }: Props) {
  const list = (
    <div className={clsx(styles.column, sidebar ? styles.columnWithSidebar : styles.columnFull)}>
      <div className={styles.row}>
        {posts.map((p) => (
          <article key={p.href} className={styles.post}>
            <div className={styles.card}>
              {p.image && (
                <Link href={p.href} className={styles.media}>
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    width={p.image.width}
                    height={p.image.height}
                    unoptimized={p.image.unoptimized}
                    sizes="(min-width: 1025px) 883px, 100vw"
                    className={styles.image}
                  />
                </Link>
              )}
              <div
                className={clsx(
                  styles.content,
                  p.image ? styles.contentWithImage : styles.contentStandalone,
                )}
              >
                <h3 className={styles.title}>
                  <Link href={p.href} className={styles.titleLink}>
                    {p.title}
                  </Link>
                </h3>
                <p className={styles.excerpt}>{p.excerpt}</p>
                <Link href={p.href} className={styles.readMore}>
                  {readMore}
                </Link>
              </div>
            </div>
          </article>
        ))}
        {/* Emplacement de la pagination (10 px + 5 px de marge, comme la démo). */}
        {sidebar && <div aria-hidden className={styles.pagination} />}
      </div>
    </div>
  )
  return (
    <div className={styles.root}>
      <div className={clsx('container-x', styles.container)}>
        <div className={styles.row}>
          {list}
          {sidebar && <BlogSidebar sidebar={sidebar} side="right" />}
        </div>
      </div>
    </div>
  )
}
