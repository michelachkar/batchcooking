import Image from 'next/image'
import { AnimatedProgress } from '@/components/blocks/animated-progress'
import { CtaBar } from '@/components/blocks/cta-bar'
import { cn } from '@/lib/utils'
import { FaqAccordion, type FaqItem } from '@/components/blocks/faq-accordion'

export type { FaqItem }

type Img = { src: string; width: number; height: number; unoptimized?: boolean }

type Props = {
  items: FaqItem[]
  /** Deux photos en forme (facultatives) : affichées à droite sur grand écran seulement. */
  photos?: { image: Img; alt: string }[]
  /** Carte de progression posée sur les photos. */
  stats?: { label: string; value: number }[]
  cta?: { title: string; text: string; button: { label: string; href: string } }
}

// Questions fréquentes : accordéon natif (<details name>, sans JS), photos arrondies avec carte de chiffres, barre d'appel.
export function Faq({ items, photos = [], stats = [], cta }: Props) {
  return (
    <section
      data-section="faq"
      className="mt-[75px] mb-[100px] flex flex-col leading-normal max-lg:mt-[70px] max-lg:mb-0"
    >
      <div className="mx-auto w-full max-w-[1350px]">
        <div className="mt-5 flex gap-10 max-lg:mt-0 max-lg:flex-col max-md:gap-0">
          <div className="flex flex-col gap-5 lg:flex-[661_1_0%]">
            <div className="rounded-[14px] max-lg:px-5 max-md:px-[10px]">
              <FaqAccordion items={items} name="faq" />
            </div>
          </div>
          <div className="relative max-md:my-[2px] lg:mb-[185px] lg:flex-[649_1_0%]">
            <div className="max-lg:hidden" aria-hidden={photos.length === 0 || undefined}>
              {photos.map((p, i) => (
                <div
                  key={p.image.src}
                  data-vr-mask
                  className={cn(
                    'absolute w-[calc((100%-40px)/2)] overflow-hidden',
                    i === 0
                      ? 'top-[15px] left-[10px] rounded-[40%_3.25%_3.25%_3.25%/32%_2.6%_2.6%_2.6%]'
                      : 'top-[89px] right-[10px] rounded-[3.25%_40%_3.25%_3.25%/2.6%_32%_2.6%_2.6%]',
                  )}
                  style={{ height: 500 }}
                >
                  <Image
                    src={p.image.src}
                    alt={p.alt}
                    width={p.image.width}
                    height={p.image.height}
                    unoptimized={p.image.unoptimized}
                    sizes="305px"
                    className="size-full max-w-none object-cover"
                  />
                </div>
              ))}
              {stats.length > 0 && (
                <div className="absolute top-[-36px] right-[2px] z-[2344] w-[350px] p-[10px]">
                  <AnimatedProgress
                    stats={stats}
                    className="m-0 flex list-none flex-col gap-7 rounded-[20px] bg-white p-[30px_20px] shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {cta && <CtaBar {...cta} className="mt-10 mb-[25px] max-lg:mt-0 max-lg:mb-[90px]" />}
      </div>
    </section>
  )
}
