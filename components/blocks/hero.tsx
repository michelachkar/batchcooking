import Image from 'next/image'
import Link from 'next/link'
import { Clock, Feather, ChefHat, Sparkles } from 'lucide-react'
import { LeadTrigger } from '@/components/lead/lead-trigger'
import { ArrowIcon } from '@/components/ui/icon'
import { RevealObserver } from '@/components/blocks/reveal-observer'
import { HeroReviews, type HeroReview } from '@/components/blocks/hero-reviews'

const BADGE_ICONS = {
  mind: Feather,
  time: Clock,
  homemade: ChefHat,
  clean: Sparkles,
} as const

export type HeroBadge = { icon: keyof typeof BADGE_ICONS; title: string; text?: string }

// CTA principal : lien classique, ou déclencheur du modal de demande de rappel.
function PrimaryTag({
  lead,
  href,
  ...rest
}: { lead?: boolean; href: string } & Omit<React.ComponentProps<typeof Link>, 'href'>) {
  return lead ? <LeadTrigger fallbackHref={href} {...rest} /> : <Link href={href} {...rest} />
}

type Cta = { label: string; href: string }

type Props = {
  label: string
  headline: string
  accent: string
  description: string
  badges?: HeroBadge[]
  googleReviews?: string
  heroReviews?: { label: string; items: HeroReview[] }
  /** `lead` : le CTA ouvre le modal de demande de rappel (href sert de repli sans JavaScript). */
  primary: Cta & { lead?: boolean }
  secondary: Cta
  meta: { text: string }
  image: { src: string; width: number; height: number; alt: string }
  caption: { kicker: string; title: string; text?: string }
}

// Hero éditorial en deux colonnes (texte / photo), repris du widget « dining-hero » de Savrio.
// Server Component : aucun JS client. La photo est l'image LCP (priority + fetchPriority="high").
export function Hero({
  label,
  headline,
  accent,
  description,
  badges,
  googleReviews,
  heroReviews,
  primary,
  secondary,
  meta,
  image,
  caption,
}: Props) {
  return (
    <section data-section="hero" className="bg-white pt-9 md:px-5 md:pt-0 lg:px-0">
      <RevealObserver />
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <div className="relative grid min-h-[777px] grid-cols-[45%_minmax(0,1fr)] overflow-hidden bg-[rgba(240,235,227,1)] max-lg:min-h-0 max-lg:grid-cols-1">
        <div className="flex min-w-0 flex-col justify-center pt-[120px] pr-[clamp(28px,4.4vw,72px)] pb-16 pl-[clamp(24px,3.6vw,58px)] max-lg:px-8 max-lg:pt-16 max-lg:pb-12 max-md:px-6 max-md:pt-10 max-md:pb-9">
          <p className="inline-flex items-center gap-3 text-[13px] leading-[1.4] font-semibold tracking-[0.14em] text-[#B04A2A] uppercase before:h-px before:w-[34px] before:flex-none before:bg-current before:content-['']">
            {label}
          </p>
          <h1 className="font-display mt-7 mb-[26px] text-[40px] leading-[1.02] font-semibold tracking-[-0.01em] text-[rgba(85,80,68,1)] [font-synthesis:none] max-lg:text-[46px] max-lg:leading-[56px] max-md:mt-[22px] max-md:mb-5">
            <em className="mb-2 block font-[family-name:var(--font-caveat)] text-[28px] leading-[1.1] font-semibold tracking-normal text-[#B04A2A] not-italic max-md:text-[24px]">
              {accent}
            </em>
            {headline}
          </h1>
          {badges?.length ? (
            <ul className="grid grid-cols-4 gap-2.5 max-md:gap-2">
              {badges.map(({ icon, title, text }, i) => {
                const Icon = BADGE_ICONS[icon]
                return (
                  <li
                    key={icon}
                    data-reveal="up"
                    data-d={i + 1}
                    className="border-ink/12 bg-ink/[0.04] hover:bg-ink/[0.07] flex flex-col items-center gap-2.5 rounded-[14px] border px-2 py-3.5 text-center [transition:background-color_0.25s_ease,border-color_0.25s_ease] hover:border-[#B04A2A]/50"
                  >
                    <span className="flex size-10 flex-none items-center justify-center rounded-full bg-[#B04A2A]/10 text-[#B04A2A]">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <strong className="text-[13px] leading-[1.3] font-semibold text-[rgba(85,80,68,1)] max-md:text-[13px]">
                        {title}
                      </strong>
                      {text && (
                        <span className="text-[13px] leading-[1.35] text-[rgba(85,80,68,0.78)]">
                          {text}
                        </span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="max-w-[34rem] text-lg leading-[1.65] text-[rgba(85,80,68,0.88)] max-md:text-base">
              {description}
            </p>
          )}
          <div className="mt-[42px] flex flex-wrap items-center gap-x-8 gap-y-[18px] max-md:mt-8 max-md:flex-col max-md:items-start">
            <PrimaryTag
              href={primary.href}
              lead={primary.lead}
              className="group/btn rounded-pill text-ivory inline-flex items-center gap-3 border border-[#B04A2A]/45 bg-[#B04A2A] px-[30px] py-[18px] text-base leading-none font-semibold [transition:background-color_0.25s_ease,border-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 hover:border-[#B04A2A] hover:bg-[#8F3B20] hover:shadow-[0_14px_28px_rgba(0,0,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B04A2A]"
            >
              {primary.label}
              <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover/btn:translate-x-[5px]" />
            </PrimaryTag>
            <Link
              href={secondary.href}
              className="group/link border-ink/35 inline-flex items-center gap-[10px] border-b py-1 text-base font-semibold text-[rgba(85,80,68,1)] [transition:border-color_0.25s_ease,color_0.25s_ease] hover:border-[#B04A2A] hover:text-[#B04A2A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B04A2A]"
            >
              {secondary.label}
              <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover/link:translate-x-[5px]" />
            </Link>
          </div>
          {googleReviews ? (
            <div className="border-ink/12 mt-14 flex flex-wrap items-center gap-4 border-t pt-[26px] max-md:mt-9">
              <div
                data-reveal="up"
                data-d="5"
                className="bg-ink/[0.06] border-ink/15 inline-flex items-center gap-3 rounded-full border py-2 pr-5 pl-2"
              >
                <span className="flex size-9 flex-none items-center justify-center rounded-full bg-white">
                  <svg aria-hidden viewBox="0 0 24 24" className="size-5">
                    <path
                      fill="#4285F4"
                      d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.1A12 12 0 0 0 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.28a12 12 0 0 0 0 10.8l4.01-3.1Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.76c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.6l4.01 3.1C6.23 6.87 8.88 4.76 12 4.76Z"
                    />
                  </svg>
                </span>
                <span className="flex flex-col gap-0.5">
                  <span
                    aria-hidden
                    className="text-[16px] leading-none tracking-[3px] text-[#FBBC05]"
                  >
                    ★★★★★
                  </span>
                  <span className="text-[14px] leading-none font-semibold text-[rgba(85,80,68,1)]">
                    {googleReviews}
                  </span>
                </span>
              </div>
              {heroReviews && <HeroReviews reviews={heroReviews.items} label={heroReviews.label} />}
            </div>
          ) : (
            <p className="border-ink/12 mt-14 flex flex-wrap items-center gap-x-[14px] gap-y-[6px] border-t pt-[26px] text-[15px] leading-normal text-[rgba(85,80,68,0.88)] max-md:mt-9">
              {meta.text}
            </p>
          )}
        </div>

        <div className="group/media bg-surface-dark before:from-ink/0 relative min-h-full overflow-hidden before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-[30%] before:bg-gradient-to-b before:to-transparent before:content-[''] max-lg:min-h-[480px] max-md:min-h-[340px]">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            fetchPriority="high"
            sizes="(min-width: 1025px) 55vw, 100vw"
            className="absolute inset-0 size-full object-cover object-[68%_center] transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/media:scale-[1.045]"
          />
          <div className="bg-cream/95 absolute bottom-6 left-6 z-[2] flex max-w-[min(320px,calc(100%-48px))] flex-col gap-1 rounded-[14px] px-5 py-4 text-[rgba(85,80,68,1)] shadow-[0_18px_40px_rgba(47,43,38,0.18)] [transition:translate_0.45s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.45s_ease] group-hover/media:-translate-y-1.5 group-hover/media:shadow-[0_26px_50px_rgba(47,43,38,0.28)] max-md:right-[14px] max-md:bottom-[14px] max-md:left-[14px] max-md:max-w-none">
            <span className="text-[13px] font-bold tracking-[0.14em] text-[#B04A2A] uppercase">
              {caption.kicker}
            </span>
            <strong className="font-display text-[21px] leading-[1.2] font-semibold tracking-[-0.02em]">
              {caption.title}
            </strong>
            <span className="text-body text-[14px] leading-[1.45]">{caption.text}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
