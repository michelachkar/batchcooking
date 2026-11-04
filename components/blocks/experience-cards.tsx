import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'

export type ExperienceCard = {
  title: string
  text: string
  meta: string
  icon?: IconName
  linkText: string
  href: string
  image: { src: string; width: number; height: number; unoptimized?: boolean }
  alt: string
}

type Props = { kicker: string; title: string; intro: string; cards: ExperienceCard[] }

// Cartes d'expériences : grandes cartes photo (3 colonnes, 2 en tablette, 1 en mobile), reprises du widget « experience-cards ».
// Chaque carte est cliquable en entier via le lien (zone étirée).
export function ExperienceCards({ kicker, title, intro, cards }: Props) {
  return (
    <section data-section="experiences" className="bg-cream pt-[22px] max-lg:pt-[18px] max-md:pt-3">
      <div className="bg-white px-10 max-lg:px-[26px] max-md:px-4">
        <div className="max-w-site mx-auto pt-[101px] pb-[100px] max-lg:pt-[74px] max-lg:pb-[72px] max-md:pt-[57px] max-md:pb-14">
          <header className="mb-11 grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-end gap-x-16 gap-y-6 max-lg:grid-cols-1 max-md:mb-7">
            <div>
              <p className="text-forest-mid mb-4 inline-flex items-center gap-3 text-xs font-bold tracking-[0.16em] uppercase before:h-px before:w-[34px] before:bg-current before:content-['']">
                {kicker}
              </p>
              <h2 className="font-display text-ink text-[clamp(36px,3.6vw,56px)] leading-[1.08] font-semibold tracking-[-0.02em] max-lg:text-[45px] max-lg:leading-[56px]">
                {title}
              </h2>
            </div>
            <p className="text-body max-w-[30rem] text-[17px] leading-[1.65]">{intro}</p>
          </header>
          <div className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-md:grid-cols-1">
            {cards.map((c, i) => (
              <article
                key={c.title}
                className="group bg-surface-dark focus-within:outline-sage relative isolate min-h-[560px] overflow-hidden rounded-[18px] [transition:translate_0.5s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.5s_ease] after:pointer-events-none after:absolute after:inset-x-0 after:top-[40%] after:bottom-0 after:z-[1] after:bg-gradient-to-b after:from-[rgba(17,20,18,0)] after:to-[rgba(17,20,18,0.86)] after:content-[''] focus-within:outline-2 focus-within:outline-offset-[3px] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(17,20,18,0.22)] max-lg:min-h-[500px] max-md:min-h-[440px]"
              >
                <Image
                  src={c.image.src}
                  alt={c.alt}
                  width={c.image.width}
                  height={c.image.height}
                  unoptimized={c.image.unoptimized}
                  sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="absolute inset-x-0 top-0 h-auto w-full [transition:scale_0.8s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
                />
                {c.icon && (
                  <span className="border-cream/35 bg-ink/45 text-cream group-hover:bg-forest absolute top-[22px] left-[22px] z-[2] inline-flex size-[54px] items-center justify-center rounded-full border backdrop-blur-[8px] [transition:background-color_0.4s_ease,scale_0.5s_cubic-bezier(0.2,0.7,0.2,1),rotate_0.5s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] group-hover:-rotate-[10deg]">
                    <Icon name={c.icon} className="size-[25px]" />
                  </span>
                )}
                <span className="rounded-pill bg-cream/92 text-ink absolute top-[31px] right-[22px] z-[2] px-[14px] py-2 text-xs font-bold tracking-[0.02em]">
                  {c.meta}
                </span>
                <div className="text-cream absolute inset-0 z-[2] flex flex-col justify-end gap-[10px] px-[30px] pt-[30px] pb-[31px] [transition:translate_0.5s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-1.5 max-lg:pb-[32px] max-md:gap-[9px] max-md:px-[22px] max-md:pt-6 max-md:pb-[26px]">
                  <span className="text-sage text-[13px] font-bold tracking-[0.14em] [transition:letter-spacing_0.45s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:tracking-[0.3em] lg:-mb-px">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-cream text-[clamp(28px,2.4vw,36px)] leading-[1.1] font-semibold tracking-[-0.02em] max-md:text-[28px] max-md:leading-[1.12]">
                    {c.title}
                  </h3>
                  <p className="text-cream/84 max-w-[24rem] text-[15px] leading-[1.6]">{c.text}</p>
                  <Link
                    href={c.href}
                    className="border-sage text-cream group-hover:text-sage mt-[10px] inline-flex items-center gap-[10px] self-start border-b pb-[3px] text-[15px] font-semibold transition-colors duration-300 focus-visible:outline-none"
                  >
                    {c.linkText}
                    <ArrowIcon className="size-[17px] [transition:translate_0.3s_ease] group-hover:translate-x-1" />
                    <span aria-hidden className="absolute inset-0 z-[3]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
