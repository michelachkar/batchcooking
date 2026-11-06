import Image from 'next/image'
import Link from 'next/link'
import styles from './blog-sidebar.module.css'
import clsx from 'clsx'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }

export type SidebarData = {
  searchLabel: string
  searchAction: string
  recent: { title: string; href: string; image?: Img }[]
  recentTitle: string
  comments?: {
    title: string
    on: string
    items: { author: string; postTitle: string; href: string }[]
  }
  archivesTitle: string
  archives: { label: string; href: string }[]
  categoriesTitle: string
  categories: { label: string; href: string }[]
  tagsTitle: string
  tags: { label: string; href: string; count: number }[]
}

// Colonne latérale du blog : recherche, derniers articles, archives, catégories.
export function BlogSidebar({
  sidebar,
  side = 'right',
}: {
  sidebar: SidebarData
  side?: 'left' | 'right'
}) {
  return (
    <aside className={clsx(styles.root, side === 'right' ? styles.right : styles.left)}>
      <form role="search" action={sidebar.searchAction} className={styles.search}>
        <input
          type="search"
          name="s"
          required
          aria-label={sidebar.searchLabel}
          className={styles.searchInput}
        />
      </form>
      <section className={styles.section}>
        <h2 className={styles.heading}>{sidebar.recentTitle}</h2>
        <ul className={styles.list}>
          {sidebar.recent.map((r) => (
            <li key={r.href} className={styles.recentItem}>
              {r.image && (
                <Image
                  src={r.image.src}
                  width={r.image.width}
                  height={r.image.height}
                  unoptimized={r.image.unoptimized}
                  alt=""
                  className={styles.thumb}
                />
              )}
              <Link href={r.href} className={styles.link}>
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {sidebar.comments && sidebar.comments.items.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.heading}>{sidebar.comments.title}</h2>
          <ol className={styles.list}>
            {sidebar.comments.items.map((c) => (
              <li key={c.href} className={styles.item}>
                <span className={styles.author}>{c.author}</span> {sidebar.comments?.on}{' '}
                <Link href={c.href} className={styles.link}>
                  {c.postTitle}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}
      {sidebar.archives.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.heading}>{sidebar.archivesTitle}</h2>
          <ul className={styles.list}>
            {sidebar.archives.map((a) => (
              <li key={a.href} className={styles.item}>
                <Link href={a.href} className={styles.link}>
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {sidebar.categories.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.heading}>{sidebar.categoriesTitle}</h2>
          <ul className={styles.list}>
            {sidebar.categories.map((c) => (
              <li key={c.href} className={styles.item}>
                <Link href={c.href} className={styles.link}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {sidebar.tags.length > 0 && (
        <section className={styles.sectionLast}>
          <h2 className={styles.heading}>{sidebar.tagsTitle}</h2>
          <ul className={styles.tags}>
            {sidebar.tags.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={styles.tag}
                  style={{ fontSize: `${Math.min(16, 12 + t.count)}px` }}
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  )
}
