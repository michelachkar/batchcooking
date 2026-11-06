import Image from 'next/image'
import Link from 'next/link'

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
    <div className="mx-auto max-w-[1350px] py-[10px] leading-normal max-lg:px-[15px] max-md:px-0 max-md:py-0 min-[1351px]:px-0 lg:max-[1440px]:px-[45px]">
      <div className="h-[95px]" aria-hidden />
      <div className="my-5 max-md:px-[10px]">
        <ul className="m-0 grid list-none grid-cols-3 gap-x-8 gap-y-12 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
          {posts.map((p) => (
            <li key={p.href}>
              <article className="group relative">
                {p.image && (
                  <Link
                    href={p.href}
                    className="group/media relative mb-6 block aspect-video overflow-hidden rounded-lg"
                  >
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      unoptimized={p.image.unoptimized}
                      sizes="(min-width: 1025px) 429px, (min-width: 768px) 353px, 355px"
                      className="size-full max-w-none object-cover transition-[transform,scale] duration-700 ease-[ease] group-hover/media:scale-[1.08]"
                    />
                    {p.category && (
                      <span className="absolute top-4 left-4 z-[2] rounded-lg bg-[rgba(255,255,255,0.79)] p-[10px] text-[10px] leading-[10px] font-extrabold tracking-[1.8px] text-[#18181b] uppercase shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
                        {p.category}
                      </span>
                    )}
                  </Link>
                )}
                <div className="px-1">
                  <h3 className="m-0 text-[22px] leading-[26.4px] font-bold">
                    <Link
                      href={p.href}
                      className="text-ink transition-colors duration-300 group-hover:text-[#52525b]"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <div className="mt-4 flex items-center gap-4 text-xs leading-[18px] font-medium tracking-[-0.12px] text-[#625C50]">
                    <span
                      aria-hidden
                      className="h-px w-8 bg-[#625C50] transition-[width] duration-500 ease-[ease] group-hover:w-12"
                    />
                    <time>{p.date}</time>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[95px]" aria-hidden />
    </div>
  )
}
