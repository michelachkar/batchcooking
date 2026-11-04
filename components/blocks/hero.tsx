import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon } from '@/components/ui/icon'

type Cta = { label: string; href: string }

type Props = {
  label: string
  headline: string
  accent: string
  description: string
  primary: Cta
  secondary: Cta
  meta: { text: string; stars?: boolean }
  image: { src: string; width: number; height: number; alt: string }
  caption: { kicker: string; title: string; text: string }
}

// Hero éditorial en deux colonnes (texte / photo), repris du widget « dining-hero » de Savrio.
// Server Component : aucun JS client. La photo est l'image LCP (priority + fetchPriority="high").
export function Hero({
  label,
  headline,
  accent,
  description,
  primary,
  secondary,
  meta,
  image,
  caption,
}: Props) {
  return (
    <section data-section="hero" className="bg-white pt-9 md:px-5 md:pt-0 lg:px-0">
      <div className="bg-ink relative grid min-h-[777px] grid-cols-[45%_minmax(0,1fr)] overflow-hidden max-lg:min-h-0 max-lg:grid-cols-1">
        <div className="flex min-w-0 flex-col justify-center pt-[120px] pr-[clamp(28px,4.4vw,72px)] pb-16 pl-[clamp(24px,3.6vw,58px)] max-lg:px-8 max-lg:pt-16 max-lg:pb-12 max-md:px-6 max-md:pt-10 max-md:pb-9">
          <p className="text-sage inline-flex items-center gap-3 text-[13px] leading-[1.4] font-semibold tracking-[0.16em] uppercase before:h-px before:w-[34px] before:flex-none before:bg-current before:content-['']">
            {label}
          </p>
          <h1 className="font-display text-cream mt-7 mb-[26px] text-[clamp(48px,5.3vw,88px)] leading-[1.02] font-semibold tracking-[-0.01em] [font-synthesis:none] max-lg:text-[54px] max-lg:leading-[64px] max-md:mt-[22px] max-md:mb-5">
            {headline}
            <em className="text-sage block text-[length:inherit] italic">{accent}</em>
          </h1>
          <p className="text-cream/76 max-w-[34rem] text-lg leading-[1.65] max-md:text-base">
            {description}
          </p>
          <div className="mt-[42px] flex flex-wrap items-center gap-x-8 gap-y-[18px] max-md:mt-8 max-md:flex-col max-md:items-start">
            <Link
              href={primary.href}
              className="group/btn rounded-pill border-sage/45 bg-forest text-ivory hover:border-sage hover:bg-forest-mid focus-visible:outline-sage inline-flex items-center gap-3 border px-[30px] py-[18px] text-base leading-none font-semibold [transition:background-color_0.25s_ease,border-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {primary.label}
              <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover/btn:translate-x-[5px]" />
            </Link>
            <Link
              href={secondary.href}
              className="group/link border-cream/35 text-cream hover:border-sage hover:text-sage focus-visible:outline-sage inline-flex items-center gap-[10px] border-b py-1 text-base font-semibold [transition:border-color_0.25s_ease,color_0.25s_ease] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {secondary.label}
              <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover/link:translate-x-[5px]" />
            </Link>
          </div>
          <p className="border-cream/12 text-cream/76 mt-14 flex flex-wrap items-center gap-x-[14px] gap-y-[6px] border-t pt-[26px] text-sm leading-normal max-md:mt-9">
            {meta.stars && (
              <span aria-hidden className="text-sage text-[15px] tracking-[3px]">
                ★★★★★
              </span>
            )}
            {meta.text}
          </p>
        </div>

        <div
          data-vr-mask
          className="group/media bg-surface-dark before:from-ink/55 relative min-h-full overflow-hidden before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-[30%] before:bg-gradient-to-b before:to-transparent before:content-[''] max-lg:min-h-[480px] max-md:min-h-[340px]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            fetchPriority="high"
            sizes="(min-width: 1025px) 55vw, 100vw"
            className="absolute inset-0 size-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/media:scale-[1.045]"
          />
          <div className="bg-cream/95 text-ink absolute bottom-6 left-6 z-[2] flex max-w-[min(320px,calc(100%-48px))] flex-col gap-1 rounded-[14px] px-5 py-4 shadow-[0_18px_40px_rgba(17,20,18,0.18)] [transition:translate_0.45s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.45s_ease] group-hover/media:-translate-y-1.5 group-hover/media:shadow-[0_26px_50px_rgba(17,20,18,0.28)] max-md:right-[14px] max-md:bottom-[14px] max-md:left-[14px] max-md:max-w-none">
            <span className="text-forest-mid text-[11px] font-bold tracking-[0.14em] uppercase">
              {caption.kicker}
            </span>
            <strong className="font-display text-[21px] leading-[1.2] font-semibold tracking-[-0.02em]">
              {caption.title}
            </strong>
            <span className="text-body text-[13px] leading-[1.45]">{caption.text}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
