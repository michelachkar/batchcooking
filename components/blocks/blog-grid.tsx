import Image from 'next/image'
import Link from 'next/link'
import styles from './blog-grid.module.css'

export type GridCard = {
  title: string
  href: string
  /** Date déjà mise en forme. */
  date: string
  category?: string
  image?: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
}

// Articles en grille : image 16/9 avec pastille de catégorie, titre, date. 3 colonnes, 2 en tablette, 1 en mobile.
export function BlogGrid({ posts }: { posts: GridCard[] }) {
  return (
    <div className={styles.root}>
      <div className={styles.spacer} aria-hidden />
      <div className={styles.inner}>
        <ul className={styles.list}>
          {posts.map((p) => (
            <li key={p.href}>
              <article className={styles.card}>
                {p.image && (
                  <Link href={p.href} className={styles.media}>
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      unoptimized={p.image.unoptimized}
                      sizes="(min-width: 1025px) 429px, (min-width: 768px) 353px, 355px"
                      className={styles.image}
                    />
                    {p.category && <span className={styles.badge}>{p.category}</span>}
                  </Link>
                )}
                <div className={styles.body}>
                  <h3 className={styles.title}>
                    <Link href={p.href} className={styles.titleLink}>
                      {p.title}
                    </Link>
                  </h3>
                  <div className={styles.meta}>
                    <span aria-hidden className={styles.rule} />
                    <time>{p.date}</time>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.spacer} aria-hidden />
    </div>
  )
}
