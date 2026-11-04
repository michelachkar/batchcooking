import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  /** Fil d'Ariane : tous les niveaux sauf le dernier portent un lien ; le dernier est la page courante. */
  crumbs: { label: string; href?: string }[]
  navLabel: string
  /** Photo d'arrière-plan (facultative) : le bandeau reste sombre sans elle. */
  background?: { src: string; unoptimized?: boolean }
  /** Marge de 10 px de chaque côté en mobile (gabarits service, blog, réalisations). */
  inset?: boolean
  /** Bandeau seul, sans fil d'Ariane ni titre (page 404, dont le titre est dans le corps). */
  bare?: boolean
}

// Bandeau de titre des pages intérieures : photo voilée de vert, pastille de fil d'Ariane et titre (modèle « savrio-pagehead »).
export function PageHead({ title, crumbs, navLabel, background, inset, bare }: Props) {
  return (
    <section
      data-section="head"
      className={cn(
        'page-head relative isolate flex min-h-[340px] flex-col overflow-hidden bg-[#1b1f1d] px-16 leading-normal max-lg:min-h-[280px] max-lg:px-9 max-md:min-h-[220px] max-md:px-[22px]',
        inset && 'max-md:mx-[10px]',
      )}
    >
      {background && (
        <Image
          src={background.src}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized={background.unoptimized}
          className="-z-10 object-cover object-[100%_50%]"
        />
      )}
      <div className="relative z-[1] mx-auto flex w-full max-w-[1320px] grow flex-col justify-center py-20 max-lg:py-[60px] max-md:py-11">
        {!bare && (
          <div className="mtm-ph-in px-[30px] py-[90px]">
            <nav
              aria-label={navLabel}
              className="before:bg-sage inline-flex flex-wrap items-center gap-[10px] rounded-full border border-[rgba(169,196,162,0.32)] bg-[rgba(244,243,239,0.07)] py-[9px] pr-[18px] pl-[14px] text-xs leading-[18px] font-semibold tracking-[1.8px] uppercase backdrop-blur-[10px] before:size-[7px] before:rounded-full before:shadow-[0_0_0_4px_rgba(169,196,162,0.2)] before:content-[''] max-md:gap-2 max-md:py-[7px] max-md:pr-[14px] max-md:pl-3 max-md:text-sm max-md:leading-[21px]"
            >
              <ol className="contents">
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1
                  return (
                    <li key={c.label} className="contents">
                      {i > 0 && (
                        <span
                          aria-hidden
                          className="flex items-center justify-center text-[15px] leading-none text-[rgba(169,196,162,0.7)] opacity-60"
                        >
                          ›
                        </span>
                      )}
                      {last || !c.href ? (
                        <span aria-current="page" className="text-sage">
                          {c.label}
                        </span>
                      ) : (
                        <Link
                          href={c.href}
                          className="hover:text-cream text-[rgba(244,243,239,0.78)] transition-colors duration-300 ease-[ease]"
                        >
                          {c.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
            <h1 className="font-display text-cream mt-[22px] mb-0 max-w-[16ch] text-[68px] leading-[71.4px] font-semibold tracking-[-0.02em] text-balance max-lg:text-[54px] max-lg:leading-[64px]">
              {title}
            </h1>
          </div>
        )}
      </div>
    </section>
  )
}
