import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DualHeader } from '@/components/blocks/dual-header'
import { AnimatedButton } from '@/components/ui/animated-button'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type Occasion = { href: string; image: Img; popup?: Img; name: string; description: string }

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  occasions: Occasion[]
  button: { label: string; href: string }
  /** Espace au-dessus du titre, en px (80 sur l'accueil). */
  topSpacer?: number
  /** Titre sur toute la largeur en tablette (page équipe) au lieu de 476 px (accueil). */
  wideHeader?: boolean
}

// Section « occasions » : titre, quatre cartes photo (une image découpée surgit au survol) et bouton.
export function Occasions({
  kicker,
  title,
  highlight,
  description,
  occasions,
  button,
  topSpacer = 80,
  wideHeader = false,
}: Props) {
  return (
    <section data-section="occasions" className="leading-normal">
      <div className="mx-auto flex max-w-[1350px] flex-col gap-5 max-lg:max-w-none">
        <div style={{ height: topSpacer }} aria-hidden />
        <DualHeader
          size="compact"
          kicker={kicker}
          title={title}
          highlight={highlight}
          description={description}
          className={cn(
            'mx-auto max-w-[837px] max-md:px-[10px]',
            wideHeader ? 'max-lg:max-w-none' : 'max-lg:max-w-[476px]',
          )}
        />
        <div className="h-[15px]" aria-hidden />
        <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-lg:px-5 max-md:grid-cols-1 max-md:px-[10px]">
          {occasions.map((o) => (
            <Link key={o.name} href={o.href} className="group relative block cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#111] transition-shadow duration-[400ms] ease-[ease] group-hover:shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
                <Image
                  src={o.image.src}
                  alt=""
                  width={o.image.width}
                  height={o.image.height}
                  unoptimized={o.image.unoptimized}
                  sizes="(min-width: 1025px) 25vw, 50vw"
                  className="block size-full object-cover [transition:scale_0.7s_ease,filter_0.5s_ease] group-hover:scale-[1.06] group-hover:brightness-75"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.1)_60%,transparent_100%)] opacity-60 transition-[opacity,background] duration-[400ms] ease-[ease] group-hover:bg-black group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-end p-6 text-center transition-[opacity,translate] duration-[350ms] ease-[ease] group-hover:-translate-y-[10px] group-hover:opacity-0">
                  <h3 className="font-display m-0 mb-2 text-[30px] leading-[36px] font-bold text-white capitalize max-lg:text-[45px] max-lg:leading-[56px]">
                    {o.name}
                  </h3>
                  <p className="m-0 tracking-[0.05em] text-white/90">{o.description}</p>
                </div>
              </div>
              {o.popup && (
                <Image
                  src={o.popup.src}
                  alt=""
                  width={o.popup.width}
                  height={o.popup.height}
                  unoptimized={o.popup.unoptimized}
                  sizes="25vw"
                  className="pointer-events-none absolute bottom-[55px] left-1/2 z-10 h-auto w-3/4 max-w-none origin-bottom -translate-x-1/2 translate-y-[12%] scale-[0.8] object-contain opacity-0 [transition:opacity_0.42s_ease,translate_0.48s_cubic-bezier(0.34,1.56,0.64,1),scale_0.48s_cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-[6%] group-hover:scale-100 group-hover:opacity-100"
                />
              )}
            </Link>
          ))}
        </div>
        <div className="h-[25px]" aria-hidden />
        <div className="flex justify-center">
          <AnimatedButton href={button.href}>{button.label}</AnimatedButton>
        </div>
        <div className="h-[100px]" aria-hidden />
      </div>
    </section>
  )
}
