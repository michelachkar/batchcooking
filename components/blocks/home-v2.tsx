import Link from 'next/link'
import {
  BadgePercent,
  Clock,
  Feather,
  ChefHat,
  Sparkles,
  MapPin,
  Star,
  ShieldCheck,
  Mail,
} from 'lucide-react'
import { RevealObserver } from '@/components/blocks/reveal-observer'
import { FaqAccordion } from '@/components/blocks/faq-accordion'
import { LeadTrigger } from '@/components/lead/lead-trigger'
import { ArrowIcon } from '@/components/ui/icon'

// Sections de la page d'accueil « v2 » (comparaison avec l'accueil actuel). Palette du hero : terracotta, beige, brun-gris.
const ACCENT = 'text-[#B04A2A]'
export const INK = 'text-[rgba(85,80,68,1)]'
export const SOFT = 'text-[rgba(85,80,68,0.88)]'

const ICONS = {
  time: Clock,
  mind: Feather,
  homemade: ChefHat,
  clean: Sparkles,
  tax: BadgePercent,
  pin: MapPin,
  star: Star,
  secure: ShieldCheck,
  mail: Mail,
} as const
export type V2Icon = keyof typeof ICONS

export function Shell({
  name,
  tone = 'white',
  children,
}: {
  name: string
  tone?: 'white' | 'beige' | 'terracotta'
  children: React.ReactNode
}) {
  const bg =
    tone === 'beige'
      ? 'bg-[rgba(240,235,227,1)]'
      : tone === 'terracotta'
        ? 'bg-[#B04A2A]'
        : 'bg-white'
  return (
    <section data-section={name} className={`${bg} px-10 max-lg:px-[26px] max-md:px-4`}>
      <RevealObserver />
      <div className="max-w-site mx-auto py-[64px] max-lg:py-[52px] max-md:py-10">{children}</div>
    </section>
  )
}

export function Heading({
  kicker,
  title,
  intro,
  light,
}: {
  kicker: string
  title: string
  intro?: string
  light?: boolean
}) {
  return (
    <header className="mb-11 max-w-[46rem] max-md:mb-8" data-reveal="up">
      <p
        className={`mb-4 inline-flex items-center gap-3 text-[13px] font-bold tracking-[0.16em] uppercase before:h-px before:w-[34px] before:bg-current before:content-[''] ${light ? 'text-white/80' : ACCENT}`}
      >
        {kicker}
      </p>
      <h2
        className={`font-display text-[clamp(30px,3.2vw,46px)] leading-[1.1] font-semibold tracking-[-0.02em] ${light ? 'text-white' : INK}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-[17px] leading-[1.65] ${light ? 'text-white/85' : SOFT}`}>
          {intro}
        </p>
      )}
    </header>
  )
}

// Bouton principal. Avec `lead`, il ouvre le modal de demande de rappel (href sert de repli sans JavaScript).
export function Cta({
  href,
  label,
  light,
  lead,
  attrs,
}: {
  href: string
  label: string
  light?: boolean
  lead?: boolean
  /** Attributs data-* ajoutés au lien (ex. pré-remplissage du formulaire de devis). */
  attrs?: Record<`data-${string}`, string>
}) {
  const cls = `group rounded-pill inline-flex items-center gap-3 px-[30px] py-[18px] text-base leading-none font-semibold [transition:background-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.2)] ${light ? 'bg-white text-[#B04A2A]' : 'bg-[#B04A2A] text-white hover:bg-[#8F3B20]'}`
  const inner = (
    <>
      {label}
      <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[5px]" />
    </>
  )
  return lead ? (
    <LeadTrigger fallbackHref={href} className={cls}>
      {inner}
    </LeadTrigger>
  ) : (
    <Link href={href} className={cls} {...attrs}>
      {inner}
    </Link>
  )
}

// 6. Pour qui.
export function Audience(p: {
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  items: { title: string; text: string }[]
}) {
  return (
    <Shell name="audience" tone={p.tone ?? 'beige'}>
      <Heading kicker={p.kicker} title={p.title} />
      <ul className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
        {p.items.map(({ title, text }, i) => (
          <li
            key={title}
            data-reveal="up"
            data-d={(i % 3) + 1}
            className="rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(85,80,68,0.07)]"
          >
            <h3 className={`font-display mb-2 text-[20px] leading-[1.2] font-semibold ${INK}`}>
              {title}
            </h3>
            <p className={`text-[16px] leading-[1.6] ${SOFT}`}>{text}</p>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

// 8. Exemple de semaine type.
export function WeekExample(p: {
  kicker: string
  title: string
  intro: string
  days: { day: string; dish: string }[]
  note: string
  cta: { label: string; href: string }
  tone?: 'white' | 'beige'
}) {
  return (
    <Shell name="week" tone={p.tone}>
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-8">
        <div data-reveal="left">
          <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
          <p className={`mb-7 text-[15px] leading-[1.5] italic ${SOFT}`}>{p.note}</p>
          <Cta href={p.cta.href} label={p.cta.label} lead />
        </div>
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {p.days.map(({ day, dish }, i) => (
            <li
              key={day}
              data-reveal="up"
              data-d={Math.min(i + 1, 6)}
              className="flex items-center gap-5 rounded-[14px] border border-[#e3d9cc] bg-[rgba(240,235,227,0.5)] px-5 py-4"
            >
              <span className="w-24 flex-none text-[13px] font-bold tracking-[0.14em] text-[#B04A2A] uppercase">
                {day}
              </span>
              <span className={`text-[16px] leading-[1.4] font-medium ${INK}`}>{dish}</span>
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  )
}

// 12. Zones couvertes.
export function Zones(p: {
  kicker: string
  title: string
  intro: string
  areas: { name: string; text: string }[]
  note: string
  link?: { label: string; href: string }
  tone?: 'white' | 'beige'
}) {
  return (
    <Shell name="zones" tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
      <ul className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
        {p.areas.map(({ name, text }, i) => (
          <li
            key={name}
            data-reveal="up"
            data-d={i + 1}
            className="group flex items-center gap-4 rounded-[18px] border border-transparent bg-white p-6 shadow-[0_10px_30px_rgba(85,80,68,0.08)] [transition:translate_0.4s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.4s_ease,border-color_0.3s_ease] hover:-translate-y-1.5 hover:border-[#B04A2A]/30 hover:shadow-[0_22px_44px_rgba(176,74,42,0.18)]"
          >
            <span className="flex size-12 flex-none items-center justify-center rounded-full bg-[#B04A2A]/10 text-[#B04A2A] [transition:background-color_0.3s_ease,color_0.3s_ease,scale_0.4s_cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:bg-[#B04A2A] group-hover:text-white">
              <MapPin
                aria-hidden
                className="size-6 [transition:translate_0.4s_cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5"
                strokeWidth={1.7}
              />
            </span>
            <span>
              <h3 className={`font-display mb-1 text-[20px] leading-[1.2] font-semibold ${INK}`}>
                {name}
              </h3>
              <p className={`text-[16px] leading-[1.55] ${SOFT}`}>{text}</p>
            </span>
          </li>
        ))}
      </ul>
      <p className={`mt-6 text-[15px] ${SOFT}`} data-reveal="up">
        {p.note}
      </p>
      {p.link && (
        <div className="mt-8" data-reveal="up">
          <Cta href={p.link.href} label={p.link.label} />
        </div>
      )}
    </Shell>
  )
}

// 13. Questions fréquentes (accordéon natif).
export function FaqList(p: {
  /** Identifiant de l'accordéon (un par section pour que leurs ouvertures soient indépendantes). */
  name?: string
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  items: { question: string; answer: string }[]
}) {
  return (
    <Shell name={p.name ?? 'faq-v2'} tone={p.tone ?? 'white'}>
      <Heading kicker={p.kicker} title={p.title} />
      <div className="max-w-[56rem]" data-reveal="up">
        <FaqAccordion items={p.items} name={p.name ?? 'faq-v2'} />
      </div>
    </Shell>
  )
}
