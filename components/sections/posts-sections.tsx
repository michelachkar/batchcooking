import { getTranslations } from '@/lib/i18n'
import { PostsGrid, PostsIntro, type PostCard } from '@/components/blocks/posts-section'
import { mediaOf, type Landing } from '@/lib/media'

// Derniers articles (titre puis grille) : rien tant qu'aucun article n'est publié (messages home.posts, puis MDX à l'étape 5).
export async function PostsSections({ ns = 'home' }: { ns?: Landing }) {
  const m = mediaOf(ns)
  const po = await getTranslations(`${ns}.posts`)
  const posts = (po.raw('posts') as Omit<PostCard, 'image'>[]).map((x, i) => ({
    ...x,
    image: m.posts[i % m.posts.length],
  }))
  if (posts.length === 0) return null
  return (
    <>
      <PostsIntro
        kicker={po('intro.kicker')}
        title={po('intro.title')}
        highlight={po('intro.highlight')}
        description={po('intro.description')}
      />
      <PostsGrid posts={posts} button={{ label: po('button'), href: '/blog' }} />
    </>
  )
}
