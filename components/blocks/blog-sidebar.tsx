import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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

const heading =
  'font-display m-0 mb-[15px] pb-[10px] text-[22px] leading-[26px] font-semibold tracking-[-0.02em] text-black max-lg:leading-[56px] max-md:text-[45px]'
const listLink = 'text-[#234a3a] hover:underline'

// Colonne latérale du blog : recherche, derniers articles, archives, catégories.
export function BlogSidebar({
  sidebar,
  side = 'right',
}: {
  sidebar: SidebarData
  side?: 'left' | 'right'
}) {
  return (
    <aside
      className={cn(
        'w-full max-lg:order-2 max-lg:mt-[70px] max-lg:pr-3 max-md:mx-3 max-md:flex max-md:w-auto max-md:flex-col max-md:items-start max-md:px-[15px] max-md:py-[50px] lg:text-base',
        side === 'right'
          ? 'lg:mr-0 lg:ml-[10px] lg:w-[calc(33.333%-86px)] lg:pr-3 lg:pl-[50px]'
          : 'lg:mr-[10px] lg:w-[calc(33.333%-45px)] lg:pr-20 lg:pl-3',
      )}
    >
      <form role="search" action={sidebar.searchAction} className="mb-[60px]">
        <input
          type="search"
          name="s"
          required
          aria-label={sidebar.searchLabel}
          className="h-[47px] w-full rounded-[30px] border border-[#c4c4c4] bg-transparent px-5 text-base text-[#222] outline-none focus:border-[#234a3a]"
        />
      </form>
      <section className="mb-[60px]">
        <h2 className={heading}>{sidebar.recentTitle}</h2>
        <ul className="m-0 list-none p-0">
          {sidebar.recent.map((r) => (
            <li key={r.href} className="flex items-center gap-3 py-[5px] leading-[22.4px]">
              {r.image && (
                <Image
                  src={r.image.src}
                  width={r.image.width}
                  height={r.image.height}
                  unoptimized={r.image.unoptimized}
                  alt=""
                  className="h-[60px] w-[60px] shrink-0 rounded-[10px] object-cover"
                />
              )}
              <Link href={r.href} className={listLink}>
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {sidebar.comments && sidebar.comments.items.length > 0 && (
        <section className="mb-[60px]">
          <h2 className={heading}>{sidebar.comments.title}</h2>
          <ol className="m-0 list-none p-0">
            {sidebar.comments.items.map((c) => (
              <li key={c.href} className="py-[5px] leading-[22.4px]">
                <span className="text-[#234a3a]">{c.author}</span> {sidebar.comments?.on}{' '}
                <Link href={c.href} className={listLink}>
                  {c.postTitle}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}
      {sidebar.archives.length > 0 && (
        <section className="mb-[60px]">
          <h2 className={heading}>{sidebar.archivesTitle}</h2>
          <ul className="m-0 list-none p-0">
            {sidebar.archives.map((a) => (
              <li key={a.href} className="py-[5px] leading-[22.4px]">
                <Link href={a.href} className={listLink}>
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {sidebar.categories.length > 0 && (
        <section className="mb-[60px]">
          <h2 className={heading}>{sidebar.categoriesTitle}</h2>
          <ul className="m-0 list-none p-0">
            {sidebar.categories.map((c) => (
              <li key={c.href} className="py-[5px] leading-[22.4px]">
                <Link href={c.href} className={listLink}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {sidebar.tags.length > 0 && (
        <section className="mb-[5px] max-lg:mb-0">
          <h2 className={heading}>{sidebar.tagsTitle}</h2>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {sidebar.tags.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="rounded-full border border-[#c4c4c4] px-3 py-1 text-sm text-[#222] transition-colors hover:border-[#234a3a] hover:text-[#234a3a]"
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
