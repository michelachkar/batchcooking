import Image from 'next/image'
import Link from 'next/link'
import { CptAnim } from '@/components/blocks/cpt-anim'
import { Icon, type IconName } from '@/components/ui/icon'

export type RelatedService = {
  title: string
  excerpt: string
  href: string
  icon: IconName
  image: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
}

// « Autres services » : cartes à pastille d'icône en haut à droite et photo 16/9 (widget « services core »).
export function RelatedServices({ title, items }: { title: string; items: RelatedService[] }) {
  if (items.length === 0) return null
  return (
    <section className="py-[60px] leading-normal">
      <div className="container-x">
        <CptAnim />
        <h2
          data-cm-section="fade-up"
          className="font-display mb-8 text-center text-[52px] leading-[70px] font-bold tracking-[-0.02em] text-[#262c29] max-lg:text-[45px] max-lg:leading-[56px]"
        >
          {title}
        </h2>
        <div className="py-[21.6px] max-lg:py-16">
          <div className="rounded-3xl py-[35.2px] max-lg:py-[23.04px] max-md:py-[19.2px]">
            <ul data-cm-grid className="m-0 flex list-none flex-wrap px-4 py-0">
              {items.map((s) => (
                <li
                  key={s.href}
                  data-cm-item
                  className="mb-[30px] flex w-full px-3 md:w-1/2 lg:w-1/3"
                >
                  <article className="mtm-rs relative flex w-full flex-col">
                    <span
                      aria-hidden
                      className="absolute top-0 right-0 z-[1] size-16 rounded-bl-3xl bg-[#f4f3ef]"
                    />
                    <span
                      aria-hidden
                      className="mtm-rs-circle absolute top-0 right-0 z-[2] grid size-[58px] place-items-center rounded-full border border-[rgba(169,196,162,0.7)] bg-[linear-gradient(155deg,rgba(27,31,29,0.94)_0%,rgba(38,44,41,0.9)_100%)] text-[#f4f3ef]"
                    >
                      <Icon name={s.icon} className="size-6" />
                    </span>
                    <div className="mtm-rs-card flex grow flex-col gap-[12.8px] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.68)_100%)] px-[14.4px] pt-[40.4px]">
                      <div className="flex grow flex-col items-start justify-center gap-[10.24px] pl-5">
                        <h3 className="font-display m-0 pr-[63.6px] text-[20.16px] leading-[24.192px] font-semibold tracking-[-0.02em] text-[#1b1f1d] max-lg:text-[28px] max-lg:leading-[35px]">
                          {s.title}
                        </h3>
                        <p className="m-0 pr-[62px] text-[14.72px] leading-[23.2576px] text-[#5a605c] max-lg:text-[13.12px] max-lg:leading-[20.7296px] max-md:text-[12.48px] max-md:leading-[19.7184px]">
                          {s.excerpt}
                        </p>
                      </div>
                      <figure className="mx-[10px] mt-[12.8px] mb-[30px] aspect-video w-full overflow-hidden rounded-2xl bg-white/40">
                        <Image
                          src={s.image.src}
                          alt={s.image.alt}
                          width={s.image.width}
                          height={s.image.height}
                          unoptimized={s.image.unoptimized}
                          sizes="(min-width: 1025px) 382px, 100vw"
                          className="mtm-rs-img size-full max-w-none object-cover object-[50%_30%]"
                        />
                      </figure>
                    </div>
                    <Link
                      href={s.href}
                      aria-label={s.title}
                      className="focus-visible:outline-sage absolute inset-0 z-[3] rounded-3xl focus-visible:outline-2"
                    />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
