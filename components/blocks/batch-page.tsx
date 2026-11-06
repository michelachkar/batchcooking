import Image from 'next/image'
import {
  Baby,
  Calendar,
  CalendarCheck,
  CalendarDays,
  Check,
  Microwave,
  Refrigerator,
  Snowflake,
  WheatOff,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import { rich } from '@/components/ui/rich-text'
import { Cta, Heading, INK, Shell, SOFT } from '@/components/blocks/home-v2'

const ICONS: Record<string, LucideIcon> = {
  fridge: Refrigerator,
  freezer: Snowflake,
  reheat: Microwave,
  once: Calendar,
  weekly: CalendarCheck,
  monthly: CalendarDays,
  gluten: WheatOff,
  veg: Sprout,
  kids: Baby,
}

// 1. Définition + appel à l'action, avec photo.
export function BatchIntro(p: {
  kicker: string
  title: string
  paragraphs: string[]
  highlights: string[]
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  image: { src: string; alt: string }
  /** Le bouton principal ouvre le modal de rappel (batch cooking) ; false : simple lien. */
  lead?: boolean
}) {
  return (
    <Shell name="batch-intro">
      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-14 max-lg:grid-cols-1 max-lg:gap-8">
        <div>
          <Heading kicker={p.kicker} title={p.title} />
          <div className="mb-6 flex flex-col gap-4" data-reveal="up" data-d="2">
            {p.paragraphs.map((t, i) => (
              <p key={i} className={`text-[17px] leading-[1.7] ${SOFT}`}>
                {rich(t)}
              </p>
            ))}
          </div>
          <ul className="mb-8 flex flex-col gap-2.5" data-reveal="up" data-d="3">
            {p.highlights.map((h) => (
              <li key={h} className={`flex items-center gap-3 text-[16px] font-medium ${INK}`}>
                <span className="flex size-6 flex-none items-center justify-center rounded-full bg-[#B04A2A] text-white">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal="up" data-d="4">
            <Cta href={p.primary.href} label={p.primary.label} lead={p.lead ?? true} />
            <a
              href={p.secondary.href}
              className={`border-b border-[#B04A2A] pb-1 text-[16px] font-semibold text-[#B04A2A]`}
            >
              {p.secondary.label}
            </a>
          </div>
        </div>
        <figure
          data-reveal="right"
          className="relative m-0 aspect-[4/5] overflow-hidden rounded-[18px] bg-[rgba(240,235,227,1)] max-lg:max-w-[460px]"
        >
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            priority
            sizes="(min-width: 1025px) 40vw, 100vw"
            className="object-cover object-[68%_center]"
          />
        </figure>
      </div>
    </Shell>
  )
}

// 3. Déroulé, de la première prise de contact à la dernière boîte rangée.
export function Timeline(p: {
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  intro: string
  steps: { title: string; text: string }[]
}) {
  return (
    <Shell name="timeline" tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
      <ol className="relative m-0 flex max-w-[52rem] list-none flex-col gap-4 p-0 before:absolute before:top-4 before:bottom-4 before:left-[21px] before:w-px before:bg-[#e3d9cc] before:content-['']">
        {p.steps.map((s, i) => (
          <li
            key={s.title}
            data-reveal="up"
            data-d={Math.min(i + 1, 6)}
            className="relative flex gap-5"
          >
            <span className="font-display relative z-[1] flex size-11 flex-none items-center justify-center rounded-full bg-[#B04A2A] text-[17px] font-semibold text-white shadow-[0_8px_18px_rgba(176,74,42,0.3)]">
              {i + 1}
            </span>
            <div className="flex-1 rounded-[18px] border border-[#e3d9cc] bg-white px-6 py-4 shadow-[0_8px_24px_rgba(85,80,68,0.05)]">
              <h3 className={`font-display mb-1 text-[19px] leading-[1.25] font-semibold ${INK}`}>
                {s.title}
              </h3>
              <p className={`text-[16px] leading-[1.6] ${SOFT}`}>{rich(s.text)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Shell>
  )
}

// 4. Ce qui est inclus.
export function Included(p: {
  kicker: string
  title: string
  listTitle: string
  items: string[]
  asideTitle: string
  asideText: string
  cta: { label: string; href: string }
  lead?: boolean
}) {
  return (
    <Shell name="batch-included" tone="white">
      <Heading kicker={p.kicker} title={p.title} />
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-6 max-lg:grid-cols-1">
        <div
          data-reveal="up"
          className="rounded-[18px] border border-[#e3d9cc] bg-white p-8 shadow-[0_10px_30px_rgba(85,80,68,0.08)]"
        >
          <h3 className="mb-5 text-[13px] font-bold tracking-[0.14em] text-[#B04A2A] uppercase">
            {p.listTitle}
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 max-md:grid-cols-1">
            {p.items.map((it) => (
              <li key={it} className={`flex items-start gap-3 text-[16px] leading-[1.4] ${INK}`}>
                <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-[#B04A2A]/10 text-[#B04A2A]">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                {rich(it)}
              </li>
            ))}
          </ul>
        </div>
        <div
          data-reveal="up"
          data-d="2"
          className="flex flex-col justify-between gap-6 rounded-[18px] border border-[#e3d9cc] bg-[rgba(240,235,227,0.6)] p-8"
        >
          <div>
            <h3 className={`font-display mb-3 text-[22px] leading-[1.2] font-semibold ${INK}`}>
              {p.asideTitle}
            </h3>
            <p className={`text-[16px] leading-[1.65] ${SOFT}`}>{p.asideText}</p>
          </div>
          <div>
            <Cta href={p.cta.href} label={p.cta.label} lead={p.lead ?? true} />
          </div>
        </div>
      </div>
    </Shell>
  )
}

type IconCard = { icon: string; title: string; text: string }

function IconCards({ items }: { items: IconCard[] }) {
  return (
    <ul className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
      {items.map(({ icon, title, text }, i) => {
        const Icon = ICONS[icon] ?? Check
        return (
          <li
            key={title}
            data-reveal="up"
            data-d={i + 1}
            className="group rounded-[18px] bg-white p-7 shadow-[0_10px_30px_rgba(85,80,68,0.08)] [transition:translate_0.4s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.4s_ease] hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(176,74,42,0.16)]"
          >
            <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-[#B04A2A]/10 text-[#B04A2A] [transition:background-color_0.3s_ease,color_0.3s_ease] group-hover:bg-[#B04A2A] group-hover:text-white">
              <Icon aria-hidden className="size-6" strokeWidth={1.7} />
            </span>
            <h3 className={`font-display mb-2 text-[21px] leading-[1.2] font-semibold ${INK}`}>
              {title}
            </h3>
            <p className={`text-[16px] leading-[1.6] ${SOFT}`}>{text}</p>
          </li>
        )
      })}
    </ul>
  )
}

// 5-7. Section de trois cartes à pictogramme (régimes, conservation, fréquence).
export function IconSection(p: {
  name: string
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  intro?: string
  items: IconCard[]
  note?: string
}) {
  return (
    <Shell name={p.name} tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
      <IconCards items={p.items} />
      {p.note && (
        <p className={`mt-6 text-[15px] ${SOFT}`} data-reveal="up">
          {p.note}
        </p>
      )}
    </Shell>
  )
}
