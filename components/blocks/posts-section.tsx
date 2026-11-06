import Image from 'next/image'
import Link from 'next/link'
import styles from './posts-section.module.css'
import { DualHeader } from '@/components/blocks/dual-header'
import { AnimatedButton } from '@/components/ui/animated-button'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type PostCard = {
  category: string
  title: string
  href: string
  image: Img
  /** Éléments de la ligne de méta (date, commentaires…), séparés par « / ». */
  meta: string[]
}

type IntroProps = { kicker: string; title: string; highlight: string; description: string }

// Titre de la section « derniers articles ».
export function PostsIntro(p: IntroProps) {
  return (
    <section data-section="posts-intro" className={styles.intro}>
      <div className={styles.introInner}>
        <div className={styles.introSpacer} aria-hidden />
        <DualHeader {...p} animation="up" className={styles.introHeader} />
      </div>
    </section>
  )
}

type GridProps = { posts: PostCard[]; button: { label: string; href: string } }

// Grille des derniers articles : image 3/2 avec pastille de catégorie, titre et ligne de méta, puis bouton « tous les articles ».
export function PostsGrid({ posts, button }: GridProps) {
  return (
    <section data-section="posts" className={styles.posts}>
      <div className={styles.postsInner}>
        <div className={styles.spacer} aria-hidden />
        <div className={styles.gridWrap}>
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post.href}>
                <article className={styles.card}>
                  <Link href={post.href} tabIndex={-1} aria-hidden className={styles.media}>
                    <span className={styles.frame}>
                      <Image
                        src={post.image.src}
                        alt=""
                        width={post.image.width}
                        height={post.image.height}
                        unoptimized={post.image.unoptimized}
                        sizes="(min-width: 1025px) 429px, (min-width: 768px) 348px, 355px"
                        className={styles.image}
                      />
                    </span>
                    <span className={styles.badge}>{post.category}</span>
                  </Link>
                  <div className={styles.body}>
                    <Link href={post.href} className={styles.title}>
                      {post.title}
                    </Link>
                    <div className={styles.metaRow}>
                      <div className={styles.rule} />
                      <div className={styles.meta}>
                        {post.meta.map((m, i) => (
                          <span key={m} className={styles.metaItem}>
                            {i > 0 && (
                              <span aria-hidden className={styles.separator}>
                                /
                              </span>
                            )}
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.spacer} aria-hidden />
        <div className={styles.more}>
          <AnimatedButton href={button.href}>{button.label}</AnimatedButton>
        </div>
        <div className={styles.spacerBottom} aria-hidden />
      </div>
    </section>
  )
}
