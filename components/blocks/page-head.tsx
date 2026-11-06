import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Cta } from '@/components/blocks/home-v2'

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
  /** Bouton d'appel à l'action sous le titre ; `lead` ouvre le modal de rappel (href sert de repli sans JavaScript). */
  cta?: { label: string; href: string; lead?: boolean }
}

// Bandeau de titre des pages intérieures : photo voilée de vert, pastille de fil d'Ariane et titre (modèle « savrio-pagehead »).
export function PageHead({ title, crumbs, navLabel, background, inset, bare, cta }: Props) {
  return (
    <section
      data-section="head"
      className={cn(
        'page-head bg-cream relative isolate flex min-h-[200px] flex-col overflow-hidden px-16 leading-normal max-lg:min-h-[180px] max-lg:px-9 max-md:min-h-[160px] max-md:px-[22px]',
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
      <div className="relative z-[1] mx-auto flex w-full max-w-[1320px] grow flex-col justify-center py-10 max-lg:py-8 max-md:py-6">
        {!bare && (
          <div className="mtm-ph-in px-[30px] py-[24px] max-md:px-0">
            <nav
              aria-label={navLabel}
              className="before:bg-forest border-sand inline-flex flex-wrap items-center gap-[10px] rounded-full border bg-white py-[9px] pr-[18px] pl-[14px] text-[13px] leading-[18px] font-semibold tracking-[1.8px] uppercase backdrop-blur-[10px] before:size-[7px] before:rounded-full before:shadow-[0_0_0_4px_rgba(176,74,42,0.15)] before:content-[''] max-md:gap-2 max-md:py-[7px] max-md:pr-[14px] max-md:pl-3 max-md:text-sm max-md:leading-[21px]"
            >
              <ol className="contents">
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1
                  return (
                    <li key={c.label} className="contents">
                      {i > 0 && (
                        <span
                          aria-hidden
                          className="text-forest/70 flex items-center justify-center text-[16px] leading-none"
                        >
                          ›
                        </span>
                      )}
                      {last || !c.href ? (
                        <span aria-current="page" className="text-forest">
                          {c.label}
                        </span>
                      ) : (
                        <Link
                          href={c.href}
                          className="hover:text-forest text-ink transition-colors duration-300 ease-[ease]"
                        >
                          {c.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
            <h1 className="font-display text-ink mt-[22px] mb-0 max-w-[16ch] text-[68px] leading-[71.4px] font-semibold tracking-[-0.02em] text-balance max-lg:text-[54px] max-lg:leading-[64px]">
              {title}
            </h1>
            {cta && (
              <div className="mt-8">
                <Cta href={cta.href} label={cta.label} lead={cta.lead} light />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
