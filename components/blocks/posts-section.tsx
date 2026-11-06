import Image from 'next/image'
import Link from 'next/link'
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
    <section data-section="posts-intro" className="leading-normal">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-5 py-[10px] max-lg:max-w-[1024px] max-md:max-w-none">
        <div className="h-[90px]" aria-hidden />
        <DualHeader
          {...p}
          animation="up"
          className="max-md:px-[10px] [&>p:first-child]:mb-0 [&>p:last-child]:mt-[15px] [&>p:last-child]:text-[16px]"
        />
      </div>
    </section>
  )
}

type GridProps = { posts: PostCard[]; button: { label: string; href: string } }

// Grille des derniers articles : image 3/2 avec pastille de catégorie, titre et ligne de méta, puis bouton « tous les articles ».
export function PostsGrid({ posts, button }: GridProps) {
  return (
    <section data-section="posts" className="leading-normal">
      <div className="mx-auto flex max-w-[1350px] flex-col gap-5 py-[10px]">
        <div className="h-[10px]" aria-hidden />
        <div className="max-lg:px-5 max-md:px-[10px]">
          <ul className="m-0 grid list-none grid-cols-3 gap-x-8 gap-y-12 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
            {posts.map((post) => (
              <li key={post.href}>
                <article className="group relative">
                  <Link
                    href={post.href}
                    tabIndex={-1}
                    aria-hidden
                    className="group/media relative mb-[15px] block aspect-[3/2] overflow-hidden rounded-[20px]"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-[20px]">
                      <Image
                        src={post.image.src}
                        alt=""
                        width={post.image.width}
                        height={post.image.height}
                        unoptimized={post.image.unoptimized}
                        sizes="(min-width: 1025px) 429px, (min-width: 768px) 348px, 355px"
                        className="block h-auto w-full max-w-full transition-[transform,scale] duration-700 ease-[ease] group-hover/media:scale-[1.08]"
                      />
                    </span>
                    <span className="absolute top-4 left-4 rounded-lg bg-white/80 p-[10px] text-[10px] leading-[10px] font-extrabold tracking-[1.8px] text-[#18181b] uppercase shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
                      {post.category}
                    </span>
                  </Link>
                  <div className="px-1">
                    <Link
                      href={post.href}
                      className="text-ink block text-[22px] leading-[26.4px] font-bold transition-colors duration-300 group-hover:text-[#52525b]"
                    >
                      {post.title}
                    </Link>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="h-px w-8 bg-[#625C50] transition-[width] duration-500 ease-[ease] group-hover:w-12" />
                      <div className="flex items-center text-[13px] leading-[18px] font-medium tracking-[-0.01em] text-[#625C50]">
                        {post.meta.map((m, i) => (
                          <span key={m} className="flex items-center">
                            {i > 0 && (
                              <span aria-hidden className="mx-2 opacity-30">
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
        <div className="h-[10px]" aria-hidden />
        <div className="flex justify-center">
          <AnimatedButton href={button.href}>{button.label}</AnimatedButton>
        </div>
        <div className="h-[70px]" aria-hidden />
      </div>
    </section>
  )
}
