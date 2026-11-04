import { ArrowRight, Award, ChevronDown, CircleCheck, Clock, PackageOpen, Star } from 'lucide-react'
import Link from 'next/link'
import { CptAnim } from '@/components/blocks/cpt-anim'

type Props = {
  /** Corps MDX déjà rendu. */
  children: React.ReactNode
  included: string[]
  benefits: string[]
  faq: { question: string; answer: string }[]
  price?: string
  turnaround?: string
  labels: {
    included: string
    benefits: string
    faq: string
    price: string
    turnaround: string
    cta: string
    categories: string
  }
  cta: { href: string }
  categories: { name: string; href: string }[]
}

const card =
  'rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]'

// Page d'un service : texte, deux encadrés (inclus / atouts), questions fréquentes, colonne latérale (prix, catégories).
export function ServiceDetail({
  children,
  included,
  benefits,
  faq,
  price,
  turnaround,
  labels,
  cta,
  categories,
}: Props) {
  return (
    <div className="py-[110px] leading-normal max-md:py-[70px]">
      <div className="container-x">
        <CptAnim />
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 md:w-2/3">
            <div
              data-cm-section="fade-up"
              className="mb-8 text-base leading-7 text-[#262c29] [&_li]:leading-7 [&_p]:mt-0 [&_p]:mb-4 [&_strong]:font-bold [&_ul]:mt-0 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-8"
            >
              {children}
            </div>
            {(included.length > 0 || benefits.length > 0) && (
              <div
                data-cm-section="fade-up"
                data-cm-children
                data-cm-stagger="0.15"
                className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2"
              >
                {[
                  {
                    title: labels.included,
                    items: included,
                    Icon: PackageOpen,
                    Bullet: CircleCheck,
                  },
                  { title: labels.benefits, items: benefits, Icon: Award, Bullet: Star },
                ].map(
                  ({ title, items, Icon, Bullet }) =>
                    items.length > 0 && (
                      <div
                        key={title}
                        data-cm-child
                        className={`${card} px-6 py-7 transition-[translate,box-shadow] duration-300 ease-[ease] hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]`}
                      >
                        <div className="mb-5 flex items-center gap-[14px] border-b border-[#e5e7eb] pb-4">
                          <span className="flex size-[42px] items-center justify-center rounded-[10px] bg-[#262c29] text-white">
                            <Icon className="size-[18px]" aria-hidden />
                          </span>
                          <h2 className="font-display m-0 text-lg leading-[23.4px] font-bold tracking-[-0.02em] text-[#262c29] max-lg:leading-[56px]">
                            {title}
                          </h2>
                        </div>
                        <ul className="m-0 list-none p-0">
                          {items.map((it) => (
                            <li
                              key={it}
                              className="flex items-start gap-3 border-b border-white py-[9px] text-[#262c29] last:border-b-0 last:pb-0"
                            >
                              <Bullet
                                className={`mt-[2px] size-[14px] shrink-0 ${Bullet === Star ? 'fill-current text-[#5a605c]' : ''}`}
                                aria-hidden
                              />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                )}
              </div>
            )}
            {faq.length > 0 && (
              <div data-cm-section="fade-up" className="mb-10">
                <h2 className="font-display mb-8 border-b-2 border-[#e5e7eb] pb-6 text-[28px] leading-[1.2] font-bold tracking-[-0.03em] text-[#262c29]">
                  {labels.faq}
                </h2>
                <div className="overflow-hidden rounded-[20px] border border-[#e5e7eb]">
                  {faq.map((f, i) => (
                    <details
                      key={f.question}
                      name="service-faq"
                      open={i === 0}
                      className="group border-b border-[#e5e7eb] bg-[#f4f3ef] last:border-b-0 open:bg-white"
                    >
                      <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-3 px-[22px] py-[34px] text-[18px] leading-6 font-medium tracking-[-0.01em] text-[#262c29] transition-colors duration-300 ease-[ease] group-open:pt-[30px] group-open:pb-[22px] hover:bg-white [&::-webkit-details-marker]:hidden">
                        <span>{f.question}</span>
                        <ChevronDown
                          className="size-4 shrink-0 transition-[rotate] duration-300 ease-[ease] group-open:rotate-180"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                      </summary>
                      <p className="m-0 px-[22px] pt-4 pb-8 text-[18px] leading-[1.9] text-[#6b6f6c]">
                        {f.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full px-3 max-md:mt-0 md:w-1/3">
            <aside
              data-cm-section="fade-left"
              data-cm-children
              data-cm-stagger="0.12"
              className="max-lg:mt-[30px] md:sticky md:top-28"
            >
              {(price || turnaround) && (
                <div data-cm-child className={`${card} mb-6 p-6 text-center`}>
                  {price && (
                    <div className="mb-4">
                      <span className="mb-1 block text-[13px] leading-[19.5px] font-medium tracking-[0.5px] text-[#5a605c] uppercase">
                        {labels.price}
                      </span>
                      <span className="block text-[28px] leading-[33.6px] font-bold text-[#262c29]">
                        {price}
                      </span>
                    </div>
                  )}
                  {turnaround && (
                    <div className="mb-5 border-t border-[#e5e7eb] pt-4">
                      <span className="mb-1 block text-[13px] leading-[19.5px] font-medium text-[#5a605c]">
                        <Clock className="mr-1 inline size-[13px] fill-current" aria-hidden />
                        {labels.turnaround}
                      </span>
                      <span className="block font-semibold text-[#262c29]">{turnaround}</span>
                    </div>
                  )}
                  <Link
                    href={cta.href}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#234a3a] px-8 py-[18px] leading-6 font-medium tracking-[0.5px] text-[#fbfaf7] capitalize transition-[background-color,color,translate] duration-300 ease-[ease] hover:-translate-y-px hover:bg-[#1b3a2d]"
                  >
                    {labels.cta}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              )}
              {categories.length > 0 && (
                <div data-cm-child className={`${card} mb-6 p-6`}>
                  <h3 className="font-display -mx-6 -mt-6 mb-5 rounded-t-xl bg-[#262c29] px-6 py-[18px] text-[17px] leading-[20.4px] font-bold tracking-[-0.02em] text-white max-lg:text-[28px] max-lg:leading-[35px]">
                    {labels.categories}
                  </h3>
                  <ul className="m-0 list-none p-0">
                    {categories.map((c) => (
                      <li key={c.name}>
                        <Link
                          href={c.href}
                          className="group/cat flex items-center justify-between border-b border-[#e5e7eb] py-[14px] text-[15px] leading-[22.5px] font-semibold text-[#262c29] transition-colors duration-300 ease-[ease] hover:text-[#234a3a] hover:underline [li:last-child_&]:border-b-0"
                        >
                          {c.name}
                          <ArrowRight
                            className="size-[14px] transition-[translate] duration-300 ease-[ease] group-hover/cat:translate-x-[3px]"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
