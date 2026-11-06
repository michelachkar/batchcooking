import Image from 'next/image'
import { CalendarDays, Clock, MapPin, Quote, Users, UtensilsCrossed } from 'lucide-react'
import { Cta, Heading, INK, SOFT, Shell } from '@/components/blocks/home-v2'

type Img = { src: string; width: number; height: number; alt: string; unoptimized?: boolean }

export type Fact = {
  icon: 'service' | 'date' | 'place' | 'duration' | 'guests'
  label: string
  value: string
}

const ICONS = {
  service: UtensilsCrossed,
  date: CalendarDays,
  place: MapPin,
  duration: Clock,
  guests: Users,
} as const

// Contexte de la réalisation (texte de la fiche) et carte « En bref ».
export function Context(p: {
  kicker: string
  title: string
  factsTitle: string
  facts: Fact[]
  children: React.ReactNode
}) {
  return (
    <Shell name="real-context">
      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-12 max-lg:grid-cols-1">
        <div>
          <Heading kicker={p.kicker} title={p.title} />
          <div
            data-reveal="up"
            className={`flex max-w-[44rem] flex-col gap-4 text-[17px] leading-[1.7] ${SOFT}`}
          >
            {p.children}
          </div>
        </div>
        <aside
          data-reveal="up"
          data-d="2"
          className="h-fit rounded-[18px] border border-[#e3d9cc] bg-[rgba(240,235,227,1)] p-7"
        >
          <h3 className="mb-5 text-xs font-bold tracking-[0.16em] text-[#B04A2A] uppercase">
            {p.factsTitle}
          </h3>
          <dl className="flex flex-col gap-4">
            {p.facts.map((f) => {
              const Icon = ICONS[f.icon]
              return (
                <div key={f.label} className="flex items-start gap-3">
                  <Icon
                    aria-hidden
                    className="mt-0.5 size-5 flex-none text-[#B04A2A]"
                    strokeWidth={1.7}
                  />
                  <div>
                    <dt className={`text-[13px] font-semibold uppercase ${SOFT}`}>{f.label}</dt>
                    <dd className={`text-[16px] leading-[1.45] ${INK}`}>{f.value}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </aside>
      </div>
    </Shell>
  )
}

// Menu servi, dîners préparés ou programme du cours.
export function MenuList(p: { kicker: string; title: string; items: string[] }) {
  if (p.items.length === 0) return null
  return (
    <Shell name="real-menu" tone="beige">
      <Heading kicker={p.kicker} title={p.title} />
      <ol className="grid max-w-[52rem] gap-3" data-reveal="up">
        {p.items.map((m, i) => (
          <li
            key={m}
            className={`flex items-center gap-4 rounded-[14px] bg-white px-6 py-4 text-[17px] shadow-[0_6px_20px_rgba(85,80,68,0.06)] ${INK}`}
          >
            <span className="font-display flex size-9 flex-none items-center justify-center rounded-full bg-[#B04A2A]/10 text-[16px] font-semibold text-[#B04A2A]">
              {i + 1}
            </span>
            {m}
          </li>
        ))}
      </ol>
    </Shell>
  )
}

// Photos de la réalisation.
export function Photos(p: { kicker: string; title: string; photos: Img[] }) {
  if (p.photos.length === 0) return null
  return (
    <Shell name="real-photos">
      <Heading kicker={p.kicker} title={p.title} />
      <ul className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
        {p.photos.map((ph, i) => (
          <li
            key={ph.src + i}
            data-reveal="up"
            data-d={(i % 3) + 1}
            className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#2F2B26]"
          >
            <Image
              src={ph.src}
              alt={ph.alt}
              fill
              unoptimized={ph.unoptimized}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </Shell>
  )
}

// Avis du client.
export function ClientReview(p: { kicker: string; title: string; quote: string; author: string }) {
  return (
    <Shell name="real-review" tone="beige">
      <Heading kicker={p.kicker} title={p.title} />
      <figure
        data-reveal="up"
        className="m-0 max-w-[52rem] rounded-[18px] bg-white p-8 shadow-[0_10px_30px_rgba(85,80,68,0.08)] max-md:p-6"
      >
        <Quote aria-hidden className="mb-4 size-9 text-[#B04A2A]/40" strokeWidth={1.5} />
        <blockquote
          className={`font-display m-0 text-[24px] leading-[1.4] font-medium max-md:text-[20px] ${INK}`}
        >
          {p.quote}
        </blockquote>
        <figcaption className="mt-5 text-[15px] font-semibold text-[#B04A2A]">
          {p.author}
        </figcaption>
      </figure>
    </Shell>
  )
}

// Appel à l'action vers le devis du service concerné.
export function QuoteCta(p: {
  kicker: string
  title: string
  text: string
  button: string
  href: string
}) {
  return (
    <Shell name="real-cta">
      <div className="mx-auto max-w-[44rem] text-center" data-reveal="up">
        <Heading kicker={p.kicker} title={p.title} intro={p.text} />
        <Cta href={p.href} label={p.button} />
      </div>
    </Shell>
  )
}
