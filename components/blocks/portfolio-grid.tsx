import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export type ProjectCard = {
  title: string
  href: string
  categories: string[]
  image: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
}

// Grille de cartes « réalisation » : photo portrait sous un dégradé, catégories, titre et flèche en bas ; 3 colonnes, 2 en tablette, 1 en mobile.
export function PortfolioGrid({ items, className }: { items: ProjectCard[]; className?: string }) {
  return (
    <ul data-cm-grid className={`m-0 -mx-3 flex list-none flex-wrap p-0 ${className ?? ''}`}>
      {items.map((p) => (
        <li key={p.href} data-cm-item className="mb-[30px] w-full px-3 md:w-1/2 lg:w-1/3">
          <article className="group relative aspect-[3/4] overflow-hidden rounded-[20px]">
            <Link
              href={p.href}
              tabIndex={-1}
              aria-hidden
              className="relative block size-full overflow-hidden rounded-[20px] after:pointer-events-none after:absolute after:inset-0 after:z-[1] after:rounded-[20px] after:bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.75)_10%,transparent_60%)] after:content-['']"
            >
              <Image
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.width}
                height={p.image.height}
                unoptimized={p.image.unoptimized}
                sizes="(min-width: 1025px) 429px, (min-width: 768px) 336px, 351px"
                className="size-full max-w-none rounded-[20px] object-cover transition-[transform,scale,filter] duration-[400ms] ease-[ease] group-hover:scale-[1.04] group-hover:brightness-[1.08]"
              />
            </Link>
            <div className="absolute inset-x-0 bottom-0 z-[2] grid grid-cols-[1fr_auto] items-end gap-x-3 px-6 py-5">
              <div className="col-start-1 row-start-1 mb-[6px] flex flex-wrap gap-[6px]">
                {p.categories.map((c) => (
                  <span
                    key={c}
                    className="inline-block rounded-[50px] border border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.18)] px-3 py-1 text-[11px] leading-[16.5px] font-medium tracking-[0.4px] text-white uppercase backdrop-blur-[6px]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <h3 className="font-display col-start-1 row-start-2 m-0 text-[23px] leading-[1.3] font-semibold tracking-[-0.02em] max-lg:text-[28px] max-lg:leading-[35px]">
                <Link href={p.href} className="text-white">
                  {p.title}
                </Link>
              </h3>
              <Link
                href={p.href}
                aria-label={p.title}
                tabIndex={-1}
                className="col-start-2 row-span-2 row-start-1 flex size-11 -rotate-45 items-center justify-center self-end rounded-full border border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.18)] text-sm text-white backdrop-blur-[6px] transition-[background-color,rotate] duration-300 ease-[ease] group-hover:rotate-0 group-hover:bg-[rgba(255,255,255,0.32)]"
              >
                <ArrowRight className="size-[14px]" aria-hidden />
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
