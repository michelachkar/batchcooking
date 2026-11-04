import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
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
  /** Côté de la colonne latérale ; sans colonne latérale, la liste prend toute la largeur. */
  side?: 'left' | 'right'
  /** Réserve la place de la pagination sous la liste (variante à colonne de droite de la démo). */
  paginationSpace?: boolean
}

// Liste d'articles : cartes blanches à image arrondie, colonne latérale facultative (recherche, derniers articles, archives, catégories).
export function BlogList({ posts, readMore, sidebar, side = 'right', paginationSpace }: Props) {
  const list = (
    <div className={cn('w-full px-3', !sidebar ? 'lg:w-full' : 'lg:w-2/3')}>
      <div className="-mx-3 flex flex-wrap">
        {posts.map((p) => (
          <article key={p.href} className="w-full px-3">
            <div className="mb-10">
              {p.image && (
                <Link href={p.href} className="block overflow-hidden rounded-t-[30px]">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    width={p.image.width}
                    height={p.image.height}
                    unoptimized={p.image.unoptimized}
                    sizes="(min-width: 1025px) 883px, 100vw"
                    className="block h-auto w-full max-w-none"
                  />
                </Link>
              )}
              <div className={cn('bg-white p-10', p.image ? 'rounded-b-[30px]' : 'rounded-[30px]')}>
                <h3 className="font-display m-0 mb-2 text-[35px] leading-[42px] font-semibold tracking-[-0.02em] max-lg:text-[28px] max-lg:leading-[35px] max-lg:tracking-[-0.56px]">
                  <Link href={p.href} className="text-black max-lg:text-[35px]">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-5 mb-0 text-base leading-6 text-[#5a605c]">{p.excerpt}</p>
                <Link
                  href={p.href}
                  className="mt-[25px] inline-block rounded-full bg-[#234a3a] px-8 py-[18px] leading-4 font-medium tracking-[0.5px] text-[#fbfaf7] capitalize transition-colors hover:bg-[#1b3a2d]"
                >
                  {readMore}
                </Link>
              </div>
            </div>
          </article>
        ))}
        {/* Emplacement de la pagination (10 px + 5 px de marge, comme la démo). */}
        {paginationSpace && <div aria-hidden className="mb-[5px] h-[10px] w-full" />}
      </div>
    </div>
  )
  const aside = sidebar && <BlogSidebar sidebar={sidebar} side={side} />
  return (
    <div className="py-[110px] leading-normal max-md:py-[70px]">
      <div className="container-x pb-[50px] max-md:px-[15px]">
        <div className="-mx-3 flex flex-wrap">
          {side === 'left' && aside}
          {list}
          {side === 'right' && aside}
        </div>
      </div>
    </div>
  )
}
