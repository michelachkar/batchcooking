import Link from 'next/link'
import { ChefHat, CookingPot, GraduationCap } from 'lucide-react'
import { INK, SOFT } from '@/components/blocks/home-v2'
import { RevealObserver } from '@/components/blocks/reveal-observer'
import { ArrowIcon } from '@/components/ui/icon'

const ICONS = { batch: CookingPot, chef: ChefHat, cours: GraduationCap } as const

// Bandeau de catégorie de la page Tarifs : nomme le service auquel se rapportent les tarifs qui suivent.
export function TarifCategory(p: {
  id: string
  icon: keyof typeof ICONS
  tone: 'white' | 'beige' | 'sand'
  label: string
  title: string
  text: string
  link: { label: string; href: string }
}) {
  const Icon = ICONS[p.icon]
  return (
    <section
      id={p.id}
      data-section={`tarifs-${p.id}`}
      className={`scroll-mt-24 px-10 max-lg:px-[26px] max-md:px-4 ${p.tone === 'beige' ? 'bg-[rgba(240,235,227,1)]' : p.tone === 'sand' ? 'bg-[#F0EBE3]' : 'bg-white'}`}
    >
      <RevealObserver />
      <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-x-10 gap-y-5 pt-[72px] max-md:pt-12">
        <div className="flex items-center gap-5" data-reveal="up">
          <span className="flex size-16 flex-none items-center justify-center rounded-full bg-[#B04A2A]/10 text-[#B04A2A] max-md:size-14">
            <Icon aria-hidden className="size-8" strokeWidth={1.6} />
          </span>
          <div>
            <p className="mb-1 text-[13px] font-bold tracking-[0.16em] text-[#B04A2A] uppercase">
              {p.label}
            </p>
            <h2
              className={`font-display text-[clamp(30px,3.6vw,48px)] leading-[1.08] font-semibold tracking-[-0.02em] ${INK}`}
            >
              {p.title}
            </h2>
            <p className={`mt-2 text-[16px] leading-[1.5] ${SOFT}`}>{p.text}</p>
          </div>
        </div>
        <Link
          href={p.link.href}
          className="group inline-flex items-center gap-2 text-[16px] font-semibold text-[#B04A2A] hover:underline"
          data-reveal="up"
        >
          {p.link.label}
          <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[5px]" />
        </Link>
      </div>
    </section>
  )
}
