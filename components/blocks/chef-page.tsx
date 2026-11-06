import {
  Baby,
  Briefcase,
  Cake,
  CalendarHeart,
  ChefHat,
  Clock,
  Gift,
  Globe,
  GraduationCap,
  Heart,
  Leaf,
  Mail,
  PartyPopper,
  Refrigerator,
  ShoppingBasket,
  Ticket,
  User,
  UsersRound,
  Check,
  GlassWater,
  Home,
  ListChecks,
  Martini,
  Sparkles,
  Users,
  UtensilsCrossed,
  Wine,
  Wrench,
  Soup,
  type LucideIcon,
} from 'lucide-react'
import { Cta, Heading, INK, Shell, SOFT } from '@/components/blocks/home-v2'

const ICONS: Record<string, LucideIcon> = {
  menu: UtensilsCrossed,
  tasting: Sparkles,
  buffet: Soup,
  cocktail: Martini,
  wine: Wine,
  list: ListChecks,
  sans: GlassWater,
  users: Users,
  tools: Wrench,
  home: Home,
  solo: User,
  couple: Heart,
  friends: UsersRound,
  kids: Baby,
  team: Briefcase,
  party: PartyPopper,
  bases: ChefHat,
  season: Leaf,
  pastry: Cake,
  world: Globe,
  batch: Refrigerator,
  level: GraduationCap,
  clock: Clock,
  basket: ShoppingBasket,
  gift: Gift,
  ticket: Ticket,
  mail: Mail,
}

type IconCard = { icon: string; title: string; text: string; tag?: string }

// Formules (menu sur mesure, dégustation, buffet, cocktail) et accords mets-vins : cartes à pictogramme.
export function FormulaCards(p: {
  name: string
  tone?: 'white' | 'beige' | 'terracotta'
  kicker: string
  title: string
  intro?: string
  items: IconCard[]
  columns?: 2 | 3 | 4
  /** Contenu sous les cartes (bouton, remarque…). */
  footer?: React.ReactNode
}) {
  const cols =
    p.columns === 3
      ? 'grid-cols-3 max-lg:grid-cols-1'
      : 'grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1'
  return (
    <Shell name={p.name} tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} light={p.tone === 'terracotta'} />
      <ul className={`grid gap-5 ${cols}`}>
        {p.items.map(({ icon, title, text, tag }, i) => {
          const Icon = ICONS[icon] ?? Check
          return (
            <li
              key={title}
              data-reveal="up"
              data-d={Math.min(i + 1, 6)}
              className="group relative rounded-[18px] bg-white p-7 shadow-[0_10px_30px_rgba(85,80,68,0.08)] [transition:translate_0.4s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.4s_ease] hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(176,74,42,0.16)]"
            >
              {tag && (
                <span className="absolute top-6 right-6 rounded-full bg-[#B04A2A]/10 px-3 py-1 text-[13px] font-bold tracking-[0.1em] text-[#B04A2A] uppercase">
                  {tag}
                </span>
              )}
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
      {p.footer && (
        <div className="mt-10" data-reveal="up">
          {p.footer}
        </div>
      )}
    </Shell>
  )
}

// Informations pratiques : invités, matériel, attentes envers l'hôte.
export function Practical(p: {
  tone?: 'white' | 'beige'
  /** Nombre de colonnes (3 par défaut). */
  columns?: 2 | 3
  kicker: string
  title: string
  cols: { icon: string; title: string; items: string[] }[]
}) {
  return (
    <Shell name="practical" tone={p.tone ?? 'beige'}>
      <Heading kicker={p.kicker} title={p.title} />
      <div
        className={`grid gap-5 max-lg:grid-cols-1 ${p.columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
      >
        {p.cols.map(({ icon, title, items }, i) => {
          const Icon = ICONS[icon] ?? CalendarHeart
          return (
            <div
              key={title}
              data-reveal="up"
              data-d={i + 1}
              className="rounded-[18px] border border-[#e3d9cc] bg-white p-7 shadow-[0_10px_30px_rgba(85,80,68,0.06)]"
            >
              <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#B04A2A]/10 text-[#B04A2A]">
                <Icon aria-hidden className="size-6" strokeWidth={1.7} />
              </span>
              <h3 className={`font-display mb-4 text-[21px] leading-[1.2] font-semibold ${INK}`}>
                {title}
              </h3>
              <ul className="flex flex-col gap-3">
                {items.map((it) => (
                  <li
                    key={it}
                    className={`flex items-start gap-3 text-[16px] leading-[1.5] ${INK}`}
                  >
                    <Check
                      aria-hidden
                      className="mt-1 size-4 flex-none text-[#B04A2A]"
                      strokeWidth={3}
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Shell>
  )
}

// Tarifs par personne et acompte.
export function ChefPricing(p: {
  tone?: 'white' | 'beige' | 'terracotta'
  kicker: string
  title: string
  intro: string
  rows: { name: string; price: string; text: string }[]
  notes: string[]
  deposit: { label: string; value: string; text: string }
  cta: { label: string; href: string }
}) {
  return (
    <Shell name="chef-pricing" tone={p.tone ?? 'beige'}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} light={p.tone === 'terracotta'} />
      <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-6 max-lg:grid-cols-1">
        <div
          data-reveal="up"
          className="rounded-[18px] border border-[#e3d9cc] bg-white p-8 shadow-[0_10px_30px_rgba(85,80,68,0.08)]"
        >
          <ul className="mb-6 divide-y divide-[#e3d9cc]">
            {p.rows.map((r) => (
              <li key={r.name} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className={`font-display block text-[20px] font-semibold ${INK}`}>
                    {r.name}
                  </span>
                  <span className={`text-[15px] ${SOFT}`}>{r.text}</span>
                </span>
                <strong className="text-[24px] whitespace-nowrap text-[#B04A2A]">{r.price}</strong>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2.5">
            {p.notes.map((n) => (
              <li key={n} className={`flex items-start gap-3 text-[15px] leading-[1.5] ${SOFT}`}>
                <Check
                  aria-hidden
                  className="mt-0.5 size-4 flex-none text-[#B04A2A]"
                  strokeWidth={3}
                />
                {n}
              </li>
            ))}
          </ul>
        </div>
        <div
          data-reveal="up"
          data-d="2"
          className="flex flex-col justify-between gap-6 rounded-[18px] border border-[#e3d9cc] bg-[rgba(240,235,227,1)] p-8"
        >
          <div>
            <p className="mb-2 text-[13px] font-bold tracking-[0.16em] text-[#B04A2A] uppercase">
              {p.deposit.label}
            </p>
            <p className="font-display text-[56px] leading-none font-semibold text-[#B04A2A]">
              {p.deposit.value}
            </p>
            <p className={`mt-3 text-[16px] leading-[1.6] ${SOFT}`}>{p.deposit.text}</p>
          </div>
          <div>
            <Cta href={p.cta.href} label={p.cta.label} />
          </div>
        </div>
      </div>
    </Shell>
  )
}
