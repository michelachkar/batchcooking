import Image from 'next/image'
import Link from 'next/link'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type PricingPlan = {
  badge: string
  title: string
  features: string[]
  from: string
  price: string
  cta: string
  href: string
  image: Img
  alt: string
}

// Formules et tarifs : trois cartes photo avec pastille, liste d'inclus, prix « à partir de » et bouton (widget « service-pricing »).
// La coche des lignes est réservée mais vide, comme dans la démo où la police d'icônes ne se charge pas.
export function ServicePricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section data-section="pricing" className="mt-[90px] mb-5 leading-normal">
      <div className="mx-auto flow-root max-w-[1350px] max-lg:px-5 max-md:px-[10px]">
        <ul className="m-0 mb-[90px] grid list-none grid-cols-3 gap-6 p-0 max-lg:grid-cols-1">
          {plans.map((p) => (
            <li key={p.title}>
              <article className="group/media h-full overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-[translate,box-shadow] duration-300 ease-[ease] hover:-translate-y-[6px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
                <div data-vr-mask className="relative aspect-[100/65] overflow-hidden rounded-t-xl">
                  <Image
                    src={p.image.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1025px) 434px, 100vw"
                    unoptimized={p.image.unoptimized}
                    className="object-cover transition-[scale] duration-[400ms] ease-[ease] group-hover/media:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-lg bg-white px-3 py-[6px] text-sm leading-[16.8px] font-semibold text-black transition-[opacity,scale] duration-[250ms] ease-[ease] hover:scale-[1.02] hover:opacity-90">
                    {p.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display m-0 mb-[14px] text-[22px] leading-[28.6px] font-semibold tracking-[-0.02em] text-black max-lg:text-[28px] max-lg:leading-[35px]">
                    {p.title}
                  </h3>
                  <ul className="m-0 mb-4 list-none p-0">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="mb-2 pl-[10px] text-[15px] leading-[22.5px] text-[#234a3a] last:mb-0"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="my-4 h-px bg-[#e5e5e5]" />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-baseline gap-[6px]">
                      <span className="text-sm leading-[21px] text-[#6b7a75]">{p.from}</span>
                      <span className="text-[27px] leading-[40.5px] font-bold text-black">
                        {p.price}
                      </span>
                    </div>
                    <Link
                      href={p.href}
                      className="rounded-[10px] bg-[#234a3a] px-5 py-[10px] text-[15px] leading-[22.5px] font-medium text-white transition-[opacity,background-color,color,translate] duration-[250ms] ease-[ease] hover:-translate-y-[2px] hover:bg-[#1a382c] hover:opacity-[0.92]"
                    >
                      {p.cta}
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
