'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { RevealObserver } from '@/components/blocks/reveal-observer'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type DropdownProject = {
  title: string
  text: string
  tags: string[]
  image: Img
  alt: string
}

type Props = {
  projects: DropdownProject[]
  labels: { expand: string; collapse: string }
  /** Ligne ouverte au chargement ; -1 pour aucune. */
  defaultOpen?: number
}

// Liste de réalisations en accordéon : numéro, titre, description et bouton ; une ligne ouverte à la fois montre sa grande photo
// et ses étiquettes. Au survol d'une ligne fermée, une vignette flotte à droite (widget « projects-dropdown »).
export function ProjectsDropdown({ projects, labels, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section data-section="dropdown" className="mt-[37px] leading-normal">
      <RevealObserver />
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <div className="mx-auto flex max-w-[1350px] flex-col gap-5">
        <div className="pt-10 max-lg:px-5">
          <ul className="m-0 list-none p-0">
            {projects.map((p, i) => {
              const isOpen = open === i
              return (
                <li
                  key={p.title}
                  // Révélation du widget : fondu montant 0,9 s, décalage 0,10 / 0,25 / 0,40 / 0,55 s selon la ligne (styles/motion-projects.css).
                  data-reveal="up"
                  data-pdd={Math.min(i + 1, 4)}
                  className="group relative grid grid-cols-[60px_1fr_1.05fr_80px] items-start gap-x-10 gap-y-10 border-b border-[rgba(38,44,41,0.12)] py-9 last:border-b-0 max-lg:grid-cols-[60px_1fr_80px] max-lg:gap-y-6 max-md:grid-cols-[40px_1fr_56px] max-md:gap-y-4"
                >
                  <span className="pt-1 text-[18px] leading-none font-medium tracking-[0.02em] text-[#262c29]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display m-0 max-w-[460px] text-4xl leading-[1.18] font-semibold tracking-[-0.01em] text-[#262c29] [transition:color_0.3s_ease,translate_0.4s_ease] group-hover:translate-x-1 group-hover:text-[#2a5a52] max-lg:text-[45px] max-lg:leading-[56px] max-md:max-w-none max-md:text-xl max-md:leading-[1.2]">
                    {p.title}
                  </h2>
                  <p className="m-0 max-w-[460px] pt-2 text-base leading-[1.55] text-[#5a605c] max-lg:hidden">
                    {p.text}
                  </p>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? labels.collapse : labels.expand}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={cn(
                      'hover:border-sage group/btn flex size-14 cursor-pointer items-center justify-center justify-self-end rounded-full border-[1.5px] [transition:scale_0.4s_cubic-bezier(0.34,1.56,0.64,1),background-color_0.3s_ease,border-color_0.3s_ease,color_0.3s_ease,box-shadow_0.4s_ease] hover:scale-[1.08] hover:bg-[#234a3a] hover:text-[#fbfaf7] hover:shadow-[0_10px_24px_rgba(169,196,162,0.35)]',
                      isOpen
                        ? 'border-sage bg-[#234a3a] text-[#fbfaf7] motion-safe:animate-[au-pulse-ring_2.4s_ease-out_infinite]'
                        : 'border-[rgba(38,44,41,0.35)] text-[#262c29]',
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className={cn(
                        'pointer-events-none size-[22px] transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                        // Flèche : descend de 2 px au survol ; ouverte, elle tourne de -45° (translation dans le repère tourné).
                        isOpen
                          ? '[transform:rotate(-45deg)_translateY(-1px)] group-hover/btn:[transform:rotate(-45deg)_translate(2px,-3px)]'
                          : 'group-hover/btn:[transform:translateY(2px)]',
                      )}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="6 13 12 19 18 13" />
                    </svg>
                  </button>
                  <div
                    aria-hidden
                    data-vr-mask
                    className={cn(
                      'pointer-events-none absolute top-1/2 right-[90px] z-10 h-[110px] w-[180px] [transform:translate(20px,-50%)_scale(0.92)] overflow-hidden rounded-[14px] bg-[#b8d4e8] opacity-0 shadow-[0_14px_30px_rgba(38,44,41,0.18)] [transition:opacity_0.4s_ease,transform_0.5s_cubic-bezier(0.34,1.56,0.64,1)] max-lg:hidden',
                      isOpen
                        ? 'invisible'
                        : 'group-hover:[transform:translate(0,-50%)_scale(1)] group-hover:opacity-100',
                    )}
                  >
                    <Image
                      src={p.image.src}
                      alt=""
                      width={p.image.width}
                      height={p.image.height}
                      unoptimized={p.image.unoptimized}
                      sizes="180px"
                      className="block size-full object-cover"
                    />
                  </div>
                  {isOpen && (
                    <div className="project-expand col-span-full mt-1 mb-2 overflow-hidden">
                      <div
                        data-vr-mask
                        className="relative h-[460px] overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#b8d4e8_0%,#7aa8c8_40%,#4a7a98_100%)] [transition:scale_0.6s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.5s_ease] hover:scale-[1.005] hover:shadow-[0_24px_60px_rgba(38,44,41,0.18)]"
                      >
                        <Image
                          src={p.image.src}
                          alt={p.alt}
                          fill
                          sizes="(min-width: 1025px) 1350px, 100vw"
                          unoptimized={p.image.unoptimized}
                          className="object-cover"
                        />
                        <ul className="absolute right-9 bottom-8 left-9 z-[2] m-0 flex list-none flex-wrap gap-3 p-0 max-md:right-5 max-md:bottom-5 max-md:left-5">
                          {p.tags.map((t) => (
                            <li
                              key={t}
                              className="cursor-default rounded-full bg-white/90 px-[22px] py-[10px] text-[15px] font-medium text-[#262c29] backdrop-blur-[6px] [transition:translate_0.3s_ease,background-color_0.3s_ease,box-shadow_0.3s_ease] hover:-translate-y-[3px] hover:bg-white hover:shadow-[0_8px_20px_rgba(38,44,41,0.15)] max-md:px-[14px] max-md:py-2 max-md:text-[13px]"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="h-[99px]" aria-hidden />
      </div>
    </section>
  )
}
