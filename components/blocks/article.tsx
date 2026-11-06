import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import styles from './article.module.css'
import { BlogSidebar, type SidebarData } from '@/components/blocks/blog-sidebar'

type Props = {
  /** Corps MDX déjà rendu. */
  children: React.ReactNode
  image?: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
  title: string
  author?: string
  categories: { name: string; href: string }[]
  /** Date déjà mise en forme (le contenu choisit la langue). */
  date: string
  tags: { name: string; href: string }[]
  tagsLabel: string
  sidebar?: SidebarData
}

// Page d'un article : image, ligne de métadonnées, titre, corps, mots-clés ; colonne latérale du blog à droite.
export function Article({
  children,
  image,
  title,
  author,
  categories,
  date,
  tags,
  tagsLabel,
  sidebar,
}: Props) {
  return (
    <article className={styles.root}>
      <div className={clsx('container-x', styles.container)}>
        <div className={styles.row}>
          <div className={styles.main}>
            <header>
              {image && (
                <div className={styles.media}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    unoptimized={image.unoptimized}
                    priority
                    sizes="(min-width: 1025px) 883px, 100vw"
                    className={styles.image}
                  />
                </div>
              )}
              <div className={styles.head}>
                {author && (
                  <div className={styles.meta}>
                    <span className={styles.author}>{author}</span>
                  </div>
                )}
                {categories.length > 0 && (
                  <div className={styles.meta}>
                    {categories.map((c, i) => (
                      <span key={c.href}>
                        {i > 0 && ', '}
                        <Link href={c.href} className={styles.category}>
                          {c.name}
                        </Link>
                      </span>
                    ))}
                  </div>
                )}
                <div className={styles.date}>{date}</div>
                <h2 className={styles.title}>{title}</h2>
              </div>
            </header>
            <div className={styles.body}>{children}</div>
            {tags.length > 0 && (
              <footer className={styles.footer}>
                <div className={styles.tags}>
                  <span className={styles.tagsLabel}>{tagsLabel}</span>
                  {tags.map((t) => (
                    <Link key={t.href} href={t.href} className={styles.tag}>
                      {t.name}
                    </Link>
                  ))}
                </div>
              </footer>
            )}
          </div>
          {sidebar && <BlogSidebar sidebar={sidebar} side="right" />}
        </div>
      </div>
    </article>
  )
}
