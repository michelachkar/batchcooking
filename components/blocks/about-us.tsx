import Image from 'next/image'
import Link from 'next/link'
import { LeadTrigger } from '@/components/lead/lead-trigger'
import { cn } from '@/lib/utils'
import { RevealObserver } from '@/components/blocks/reveal-observer'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }

type Props = {
  label: string
  title: string
  intro?: string
  images: [Img & { alt: string }, Img & { alt: string }, Img & { alt: string }]
  badge: { icon: React.ReactNode; value: string; text: string; accent?: boolean }
  quality?: { icon: React.ReactNode; title: string; text: string; note: string }
  question?: string
  steps?: { title: string; text: string }[]
  stepsTitle?: string
  features: string[]
  button: { label: string; href: string }
  secondaryButton?: { label: string; href: string }
}

const sageDisc = 'flex flex-none items-center justify-center rounded-full bg-sage text-[#3A352E]'

function Cover({
  img,
  sizes,
  className,
}: {
  img: Img & { alt: string }
  sizes: string
  className?: string
}) {
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      unoptimized={img.unoptimized}
      sizes={sizes}
      className={cn('object-cover', className)}
    />
  )
}

// Section « À propos » : deux photos superposées avec pastille d'ancienneté, carte qualité, liste de points, bouton et photo d'ambiance.
// Reprise du widget « about-us » ; le texte alternatif de chaque photo est porté par l'image.
export function AboutUs({
  label,
  title,
  intro,
  images,
  badge,
  quality,
  question,
  steps,
  stepsTitle,
  features,
  button,
  secondaryButton,
}: Props) {
  return (
    <section data-section="about" className="max-md:mt-[50px] max-md:mb-10">
      <RevealObserver />
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <div className="mx-auto max-w-[1350px] pt-[60px] pb-20 max-md:pt-[30px] max-md:pb-0">
        <div className="p-[10px]">
          <div className="grid grid-cols-2 items-center gap-[60px] max-lg:grid-cols-1 max-lg:px-5">
            <div className="relative min-h-[600px] max-lg:min-h-[300px]">
              <div
                data-reveal="left"
                data-d="1"
                className="absolute top-0 left-0 h-[86%] w-[68%] overflow-hidden rounded-[28px] bg-[#ccc] max-md:h-[82%] max-md:w-[72%]"
              >
                <Cover img={images[0]} sizes="(min-width: 1025px) 30vw, 70vw" />
              </div>
              <div
                data-reveal="left"
                data-d="3"
                className="border-cream absolute right-0 bottom-0 z-[1] h-[57%] w-[55%] overflow-hidden rounded-[28px] border-[6px] bg-[#ccc] max-md:h-[52%] max-md:w-[58%]"
              >
                <Cover img={images[1]} sizes="(min-width: 1025px) 25vw, 55vw" />
              </div>
              <div
                data-reveal="badge"
                className={cn(
                  'group/badge absolute top-[15%] left-[36%] z-[3] inline-flex cursor-default items-center gap-4 rounded-[18px] py-[18px] pr-7 pl-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-[translate,scale,box-shadow] duration-[400ms] ease-[ease] hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_14px_36px_rgba(0,0,0,0.12)] max-md:top-auto max-md:bottom-0 max-md:left-1/2 max-md:-translate-x-1/2',
                  badge.accent
                    ? 'max-w-[340px] bg-[#B04A2A] text-white shadow-[0_14px_30px_rgba(176,74,42,0.35)]'
                    : 'bg-white whitespace-nowrap',
                )}
              >
                {!badge.accent && (
                  <div
                    className={cn(
                      sageDisc,
                      'size-14 text-[22px] transition-[rotate] duration-500 ease-[ease] group-hover/badge:rotate-[360deg] motion-safe:animate-[au-pulse-ring_2.4s_ease-out_infinite]',
                    )}
                  >
                    {badge.icon}
                  </div>
                )}
                <div className="flex flex-col">
                  <div
                    className={cn(
                      'leading-[1.1] font-bold',
                      badge.accent
                        ? 'font-display mb-2 text-[44px] tracking-[-0.03em]'
                        : 'text-[28px] text-[#3A352E]',
                    )}
                  >
                    {badge.value}
                  </div>
                  <div
                    className={cn(
                      'mt-[2px] text-[15px] leading-[1.5]',
                      badge.accent ? 'font-semibold text-white' : 'text-body',
                    )}
                  >
                    {badge.text}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-[30px] max-lg:pt-0">
              <div
                data-reveal="up"
                data-d="1"
                className="rounded-pill before:bg-sage mb-[26px] inline-flex cursor-default items-center gap-2 bg-white py-[9px] pr-[18px] pl-[14px] text-[14px] leading-normal font-medium text-[#3A352E] uppercase transition-[translate] duration-300 ease-[ease] before:size-2 before:rounded-full before:content-[''] hover:translate-x-1 motion-safe:before:animate-[au-pulse-ring_2s_ease-out_infinite]"
              >
                {label}
              </div>
              <h2
                data-reveal="up"
                data-d="2"
                className="font-display mb-[22px] text-[clamp(26px,3.6vw,52px)] leading-[1.12] font-bold tracking-[-0.02em] text-[#3A352E] max-lg:text-[45px] max-lg:leading-[56px]"
              >
                {title}
              </h2>
              {question && (
                <p
                  data-reveal="up"
                  data-d="3"
                  className="font-display mb-3 text-[22px] leading-[1.3] font-semibold text-[#3A352E]"
                >
                  {question}
                </p>
              )}
              {intro && (
                <p data-reveal="up" data-d="3" className="text-body mb-8 text-base leading-[1.65]">
                  {intro}
                </p>
              )}
              {steps && steps.length > 0 && (
                <div className="mb-[34px]">
                  {stepsTitle && (
                    <h3
                      data-reveal="up"
                      data-d="4"
                      className="font-display mb-4 text-xl leading-[26px] font-bold tracking-[-0.02em] text-[#3A352E]"
                    >
                      {stepsTitle}
                    </h3>
                  )}
                  <ol className="m-0 flex list-none flex-col gap-3 p-0">
                    {steps.map((st, i) => (
                      <li
                        key={st.title}
                        data-reveal="up"
                        data-d={Math.min(i + 1, 6)}
                        className="flex gap-4 rounded-[18px] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                      >
                        <span className={cn(sageDisc, 'size-9 text-[16px] font-bold')} aria-hidden>
                          {i + 1}
                        </span>
                        <span className="flex flex-col gap-0.5">
                          <strong className="text-[16px] leading-[1.3] font-semibold text-[#3A352E]">
                            {st.title}
                          </strong>
                          <span className="text-body text-[15px] leading-[1.5]">{st.text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {quality && (
                <div
                  data-reveal="up"
                  data-d="4"
                  className="group/quality mb-[34px] rounded-[22px] bg-white px-[34px] py-[30px] transition-[translate,box-shadow] duration-[400ms] ease-[ease] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-[18px] flex items-center gap-[22px]">
                    <div
                      className={cn(
                        sageDisc,
                        'size-14 text-[22px] transition-[rotate,scale] duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/quality:scale-110 group-hover/quality:rotate-[360deg]',
                      )}
                    >
                      {quality.icon}
                    </div>
                    <h3 className="font-display text-xl leading-[26px] font-bold tracking-[-0.02em] text-[#3A352E] max-lg:text-[28px] max-lg:leading-[35px]">
                      {quality.title}
                    </h3>
                  </div>
                  <p className="text-body mb-[22px] ml-[78px] text-[16px] max-md:ml-0">
                    {quality.text}
                  </p>
                  <hr className="border-0 border-t border-[#ececec] opacity-25" />
                  <div className="text-body before:bg-sage flex items-center gap-3 pt-0 text-[16px] leading-[1.5] font-medium before:size-[7px] before:flex-none before:rounded-full before:content-['']">
                    {quality.note}
                  </div>
                </div>
              )}
              <div
                className={cn(
                  'grid items-center gap-[30px] max-md:grid-cols-1 max-md:gap-5',
                  secondaryButton ? 'grid-cols-1' : 'grid-cols-[1fr_280px]',
                )}
              >
                <div>
                  <div className="mb-2 flex flex-col gap-4">
                    {(steps?.length ? [] : features).map((f, i) => (
                      <div
                        key={f}
                        data-reveal="up"
                        data-d={Math.min(i + 1, 6)}
                        className="group/feature flex cursor-default items-center gap-[14px] text-[17px] leading-normal font-semibold text-[#3A352E] transition-[translate] duration-300 ease-[ease] hover:translate-x-1.5"
                      >
                        <span
                          className="bg-sage flex size-6 flex-none items-center justify-center rounded-full [transition:rotate_0.5s_cubic-bezier(0.34,1.56,0.64,1),scale_0.5s_cubic-bezier(0.34,1.56,0.64,1),background-color_0.3s_ease] group-hover/feature:scale-[1.2] group-hover/feature:rotate-[360deg] group-hover/feature:bg-[#ffd166]"
                          aria-hidden
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-[13px]"
                          >
                            <polyline points="5 12 10 17 19 7" />
                          </svg>
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4">
                    <Link
                      href={button.href}
                      data-reveal="up"
                      data-d="4"
                      className="group rounded-pill bg-sage relative mt-[22px] inline-flex items-center gap-[14px] overflow-hidden px-8 py-[18px] font-semibold text-[#3A352E] transition-[translate,box-shadow,background-color] duration-300 ease-[ease] before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.55)_50%,transparent_70%)] before:bg-[length:200%_100%] before:transition-transform before:duration-700 before:ease-[ease] before:content-[''] hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(232,169,142,0.45)] hover:before:translate-x-full active:translate-y-0"
                    >
                      {button.label}
                      <span
                        className="flex size-[22px] items-center justify-center transition-[translate,rotate] duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45"
                        aria-hidden
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-[22px]"
                        >
                          <line x1="6" y1="18" x2="18" y2="6" />
                          <polyline points="9 6 18 6 18 15" />
                        </svg>
                      </span>
                    </Link>
                    {secondaryButton && (
                      <LeadTrigger
                        fallbackHref={secondaryButton.href}
                        data-reveal="up"
                        data-d="5"
                        className="group rounded-pill relative mt-[22px] inline-flex items-center gap-[14px] bg-[#B04A2A] px-8 py-[18px] font-semibold text-white transition-[translate,box-shadow,background-color] duration-300 ease-[ease] hover:-translate-y-0.5 hover:bg-[#8F3B20] hover:shadow-[0_14px_28px_rgba(176,74,42,0.3)]"
                      >
                        {secondaryButton.label}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                          className="size-[18px] transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </LeadTrigger>
                    )}
                  </div>
                </div>
                {!secondaryButton && (
                  <div
                    data-reveal="right"
                    data-d="5"
                    className="relative h-[210px] overflow-hidden rounded-[22px] bg-[#d0d0d0] [transition:scale_0.6s_cubic-bezier(0.2,0.7,0.2,1),rotate_0.6s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.5s_ease] hover:scale-105 hover:-rotate-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                  >
                    <Cover img={images[2]} sizes="(min-width: 1025px) 280px, 100vw" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
