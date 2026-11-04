import Image from 'next/image'
import Link from 'next/link'
import { MenuDialog } from '@/components/blocks/menu-dialog'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'

export type SampleMenu = {
  image: { src: string; width: number; height: number; unoptimized?: boolean; alt: string }
  icon: IconName
  label: string
  title: string
  meta: string
  tags: string[]
  courses: [string, string][]
  price: string
  priceNote: string
}

type Props = {
  kicker: string
  title: string
  intro: string
  note: string
  menus: SampleMenu[]
  /** Nombre de plats montrés sur la carte. */
  preview?: number
  labels: {
    open: string
    close: string
    panelKicker: string
    cta: string
    more: (count: number) => string
  }
  ctaHref: string
}

// Section « menus types » : trois cartes avec photo, aperçu des plats, prix et fenêtre « menu complet » (widget sample-menus).
export function SampleMenus({
  kicker,
  title,
  intro,
  note,
  menus,
  preview = 4,
  labels,
  ctaHref,
}: Props) {
  return (
    <section data-section="menus" className="bg-cream pt-[22px] max-lg:pt-[18px] max-md:pt-3">
      <div className="rounded-[20px] bg-[#ECE7DC] px-10 max-lg:px-[26px] max-md:px-4">
        <div className="max-w-site mx-auto pt-[100px] pb-[100px] leading-normal max-lg:pt-[72px] max-lg:pb-[72px] max-md:pt-14 max-md:pb-14">
          <header className="mx-auto mb-12 max-w-[46rem] text-center">
            <p className="text-forest-mid mb-4 text-xs leading-normal font-bold tracking-[0.16em] uppercase">
              {kicker}
            </p>
            <h2 className="font-display text-ink text-[clamp(36px,3.7vw,58px)] leading-[1.06] font-semibold tracking-[-0.02em] max-lg:text-[45px] max-lg:leading-[56px]">
              {title}
            </h2>
            <p className="text-body mx-auto mt-[18px] text-[17px] leading-[1.65]">{intro}</p>
          </header>
          <div className="mx-auto grid grid-cols-3 gap-[22px] max-lg:max-w-[640px] max-lg:grid-cols-[minmax(0,1fr)]">
            {menus.map((m) => {
              const shown = m.courses.slice(0, preview)
              const rest = m.courses.length - shown.length
              return (
                <article
                  key={m.title}
                  className="group flex flex-col overflow-hidden rounded-[18px] border border-[#E0DDD4] bg-[#FBFAF7] px-8 pb-[30px] [transition:translate_0.45s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.45s_ease,border-color_0.45s_ease] focus-within:-translate-y-2 focus-within:border-[#C5D7BF] focus-within:shadow-[0_30px_60px_rgba(27,31,29,0.12)] hover:-translate-y-2 hover:border-[#C5D7BF] hover:shadow-[0_30px_60px_rgba(27,31,29,0.12)] max-md:px-[22px] max-md:pb-6"
                >
                  <div className="relative -mx-8 mb-[26px] aspect-[16/10] overflow-hidden bg-[#E6E4DD] after:pointer-events-none after:absolute after:inset-x-0 after:top-[55%] after:bottom-0 after:bg-gradient-to-b after:from-[rgba(17,20,18,0)] after:to-[rgba(17,20,18,0.35)] after:content-[''] max-md:-mx-[22px]">
                    <Image
                      src={m.image.src}
                      alt={m.image.alt}
                      width={m.image.width}
                      height={m.image.height}
                      unoptimized={m.image.unoptimized}
                      sizes="(min-width: 1025px) 33vw, 640px"
                      className="block h-auto w-full [transition:scale_1s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
                    />
                    <span className="absolute right-[22px] -bottom-[26px] z-[2] inline-flex size-14 items-center justify-center rounded-full border-4 border-[#FBFAF7] bg-[#234A3A] text-[#C3D6BD] [transition:scale_0.5s_cubic-bezier(0.2,0.7,0.2,1),rotate_0.5s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] group-hover:-rotate-12">
                      <Icon name={m.icon} className="size-[25px]" />
                    </span>
                  </div>
                  <span className="text-forest-mid rounded-pill group-hover:bg-forest-mid mt-1 mr-[76px] mb-[18px] self-start bg-[#E3EBDF] px-3 py-[6px] text-[11px] leading-normal font-bold tracking-[0.12em] uppercase [transition:background-color_0.35s_ease,color_0.35s_ease] group-hover:text-[#FBFAF7]">
                    {m.label}
                  </span>
                  <h3 className="font-display text-ink text-[30px] leading-[1.12] font-semibold tracking-[-0.02em] max-lg:text-[28px] max-lg:leading-[35px] max-md:text-[27px] max-md:leading-[1.15]">
                    {m.title}
                  </h3>
                  <p className="text-body mt-2 flex items-center gap-[7px] text-sm leading-normal">
                    <Icon name="clock" className="text-forest-mid size-4" />
                    {m.meta}
                  </p>
                  <ul className="m-0 mt-[14px] flex list-none flex-wrap gap-[6px] p-0">
                    {m.tags.map((t) => (
                      <li
                        key={t}
                        className="text-forest-mid rounded-pill flex items-center gap-[5px] border border-[#E0DDD4] px-[10px] py-[5px] text-xs leading-normal font-semibold"
                      >
                        <Icon name="leaf" className="size-[13px]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <ol className="m-0 mt-6 grid list-none gap-[14px] border-t border-[#E0DDD4] p-0 pt-[22px]">
                    {shown.map(([course, desc]) => (
                      <li
                        key={course}
                        className="[transition:translate_0.3s_cubic-bezier(0.2,0.7,0.2,1)] hover:translate-x-[5px]"
                      >
                        <span className="font-display text-ink block text-[19px] leading-[1.25] tracking-[-0.02em]">
                          {course}
                        </span>
                        {desc && (
                          <span className="text-body mt-[2px] block text-sm leading-normal">
                            {desc}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                  {rest > 0 && (
                    <p className="text-forest-mid mt-[14px] text-[13px] leading-normal font-semibold">
                      {labels.more(rest)}
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-[26px]">
                    <div className="flex flex-col gap-[3px]">
                      <strong className="text-ink text-[17px] leading-normal font-bold">
                        {m.price}
                      </strong>
                      <span className="text-body text-[13px] leading-normal">{m.priceNote}</span>
                    </div>
                    <MenuDialog label={labels.open} closeLabel={labels.close} title={m.title}>
                      <p className="text-forest-mid mb-4 text-xs leading-normal font-bold tracking-[0.16em] uppercase">
                        {labels.panelKicker}
                      </p>
                      <h3 className="font-display text-ink m-0 text-[38px] leading-[1.1] font-semibold tracking-[-0.02em] max-md:pr-10 max-md:text-[30px] max-md:leading-[1.12]">
                        {m.title}
                      </h3>
                      <p className="text-body mt-[10px] text-[15px]">
                        {m.meta} · {m.price}
                      </p>
                      <ol className="m-0 mt-7 list-none border-t border-[#E0DDD4] p-0">
                        {m.courses.map(([course, desc], k) => (
                          <li
                            key={course}
                            className="hover:bg-sage/15 flex gap-[18px] border-b border-[#E0DDD4] py-4 [transition:background-color_0.3s_ease,padding_0.3s_cubic-bezier(0.2,0.7,0.2,1)] hover:pl-[10px]"
                          >
                            <span className="text-forest-mid flex-[0_0_28px] pt-[3px] text-xs font-bold tracking-[0.1em]">
                              {String(k + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <span className="font-display text-ink block text-[19px] leading-[1.25] tracking-[-0.02em]">
                                {course}
                              </span>
                              {desc && (
                                <span className="text-body mt-[2px] block text-sm leading-normal">
                                  {desc}
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                      <p className="text-body mt-[18px] text-sm leading-[1.6]">{m.priceNote}</p>
                      <p className="text-body mt-[18px] text-sm leading-[1.6]">{note}</p>
                      <div className="mt-7 flex flex-wrap items-center gap-x-[26px] gap-y-4">
                        <Link
                          href={ctaHref}
                          className="group/cta rounded-pill inline-flex items-center gap-[10px] bg-[#234A3A] px-[26px] py-4 text-[15px] font-semibold text-[#FBFAF7] hover:bg-[#1A382C]"
                        >
                          {labels.cta}
                          <ArrowIcon className="size-[17px] [transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover/cta:translate-x-[5px]" />
                        </Link>
                      </div>
                    </MenuDialog>
                  </div>
                </article>
              )
            })}
          </div>
          <p className="text-body mx-auto mt-[34px] max-w-[44rem] text-center text-sm leading-[1.6]">
            {note}
          </p>
        </div>
      </div>
    </section>
  )
}
