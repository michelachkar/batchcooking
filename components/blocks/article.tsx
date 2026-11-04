import Image from 'next/image'
import Link from 'next/link'
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

const meta =
  'mr-[15px] inline-table py-0 pr-[15px] pl-0 align-middle max-md:hidden [&>a]:inline-table [&>a]:px-[5px] [&>a]:text-[13px] [&>a]:leading-[26px] [&>a]:font-semibold [&>a]:tracking-[1px] [&>a]:text-[#777] [&>a]:uppercase'

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
    <article className="bg-cream py-[110px] leading-normal max-md:py-[70px]">
      <div className="container-x max-md:pr-3 max-md:pl-[15px]">
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 lg:w-2/3">
            <header>
              {image && (
                <div className="block overflow-hidden rounded-[30px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    unoptimized={image.unoptimized}
                    priority
                    sizes="(min-width: 1025px) 883px, 100vw"
                    className="block h-auto w-full max-w-none"
                  />
                </div>
              )}
              <div className="mt-[30px] mb-[25px] pb-[25px]">
                {author && (
                  <div className={`${meta} border-r border-[#5a605c]`}>
                    <span className="text-[13px] font-semibold tracking-[1px] text-[#777] uppercase">
                      {author}
                    </span>
                  </div>
                )}
                {categories.length > 0 && (
                  <div className={`${meta} border-r border-[#5a605c]`}>
                    {categories.map((c, i) => (
                      <span key={c.href}>
                        {i > 0 && ', '}
                        <Link
                          href={c.href}
                          className="px-[5px] text-[13px] leading-[26px] font-semibold tracking-[1px] text-[#777] uppercase"
                        >
                          {c.name}
                        </Link>
                      </span>
                    ))}
                  </div>
                )}
                <div
                  data-vr-mask
                  className="mr-[15px] inline-table px-[5px] align-middle text-[13px] leading-[19.5px] font-semibold tracking-[1px] text-[#777] uppercase max-md:mb-[18px]"
                >
                  {date}
                </div>
                <h2 className="font-display mt-[10px] mb-2 text-[45px] leading-[58.5px] font-semibold tracking-[-0.9px] text-[#242424]">
                  {title}
                </h2>
              </div>
            </header>
            <div className="mb-5 text-base leading-6 text-[#5a605c] [&_blockquote]:relative [&_blockquote]:mt-[10px] [&_blockquote]:mb-5 [&_blockquote]:rounded-[0] [&_blockquote]:bg-[rgba(169,196,162,0.2)] [&_blockquote]:py-[30px] [&_blockquote]:pr-[30px] [&_blockquote]:pl-[35px] [&_blockquote_p]:m-0 [&_blockquote_p]:text-base [&_blockquote_p]:text-[#0a0a0a] [&_img]:h-auto [&_img]:max-w-full [&_li]:leading-6 [&_p]:mt-0 [&_p]:mb-4 [&_ul]:mt-0 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-8">
              {children}
            </div>
            {tags.length > 0 && (
              <footer className="py-[35px]">
                <div className="flex flex-wrap items-baseline">
                  <span className="mr-[10px] font-semibold text-[#222]">{tagsLabel}</span>
                  {tags.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="mr-[5px] mb-[10px] rounded-lg bg-[rgba(169,196,162,0.2)] px-[15px] py-[5px] text-[13px] leading-[19.5px] font-medium tracking-[1px] text-[#222] uppercase"
                    >
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
