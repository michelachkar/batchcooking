import Image from 'next/image'
import Link from 'next/link'
import { Icon, type IconName } from '@/components/ui/icon'
import { ProposalForm, type ProposalField } from '@/components/blocks/proposal-form'
import type { ProposalState } from '@/lib/proposal-schema'

type Props = {
  /** Photo d'arrière-plan (facultative), voilée de bordeaux. */
  background?: { src: string; unoptimized?: boolean }

  kicker: string
  title: string
  text: string
  points: { icon: IconName; text: string; href?: string }[]
  formTitle: string
  formIntro: string
  fields: ProposalField[]
  note: string
  submit: string
  messages: Record<Exclude<ProposalState['status'], 'idle'>, string>
}

// « Demander un devis » : cadre bordeaux, argumentaire à gauche, carte ivoire avec le formulaire à droite (ancre #proposal).
export function Proposal(p: Props) {
  return (
    <section
      id="proposal"
      data-section="proposal"
      className="flex flex-col gap-5 px-0 py-[22px] leading-normal max-md:py-3"
    >
      <div className="proposal-frame relative isolate overflow-hidden rounded-[20px] bg-[#3f1420] px-14 max-lg:px-7 max-md:px-[14px]">
        {p.background && (
          <Image
            src={p.background.src}
            alt=""
            fill
            sizes="100vw"
            unoptimized={p.background.unoptimized}
            className="-z-10 object-cover"
          />
        )}
        <div className="relative z-[1] mx-auto flex max-w-[1320px] flex-row items-center gap-x-14 gap-y-9 py-[90px] max-lg:flex-col max-lg:py-16 max-md:py-11">
          <div className="flex flex-col gap-5 py-5 pr-6 pl-4 max-lg:w-full max-lg:basis-auto max-md:p-[8px_4px] lg:basis-[calc((100%-56px)*0.3995)]">
            <p className="m-0 text-xs leading-none font-bold tracking-[2px] text-[#e8c4cc] uppercase">
              {p.kicker}
            </p>
            <h2 className="font-display m-0 text-[54px] leading-[1.05] font-semibold tracking-[-0.02em] text-[#f6f1e7] max-lg:text-[45px] max-lg:leading-[56px]">
              {p.title}
            </h2>
            <div className="text-[17px] leading-[1.65] text-[rgba(246,241,231,0.82)]">
              <p className="m-0 mb-4 text-base leading-[28.05px]">{p.text}</p>
            </div>
            <ul className="m-0 list-none p-0">
              {p.points.map((pt) => {
                const inner = (
                  <>
                    <span className="flex">
                      <Icon name={pt.icon} className="mr-1 size-4" />
                    </span>
                    <span className="pl-[5px]">{pt.text}</span>
                  </>
                )
                return (
                  <li
                    key={pt.text}
                    className="flex items-center text-[15px] leading-[22.5px] text-[#f6f1e7] not-first:mt-[7px] not-last:pb-[7px]"
                  >
                    {pt.href ? (
                      <Link href={pt.href} className="flex items-center">
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-5 rounded-[14px] bg-[#f6f1e7] p-[44px_44px_40px] shadow-[0_30px_60px_-20px_rgba(20,4,10,0.55)] max-lg:w-full max-md:p-[26px_18px] lg:basis-[calc((100%-56px)*0.6005)]">
            <h3 className="font-display m-0 mb-1 text-[26px] leading-[26px] font-semibold tracking-[-0.01em] text-[#5a1e2b] max-lg:text-[28px] max-lg:leading-[35px]">
              {p.formTitle}
            </h3>
            <div className="m-0 mb-[18px] text-sm leading-[21px] text-[#6e5a5f]">
              <p className="m-0 mb-4 text-base leading-6">{p.formIntro}</p>
            </div>
            <ProposalForm fields={p.fields} note={p.note} submit={p.submit} messages={p.messages} />
          </div>
        </div>
      </div>
    </section>
  )
}
