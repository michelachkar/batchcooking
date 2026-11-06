import { Check, Clock, GraduationCap, Users } from 'lucide-react'
import { Cta, Heading, INK, Shell, SOFT } from '@/components/blocks/home-v2'

export type Package = {
  emoji: string
  title: string
  subtitle: string
  text: string
  duration: string
  group: string
  level: string
  price: string
  priceNote: string
  menu: string[]
  included: string[]
  ideal: string
  /** Prix ferme : n'affiche pas « À partir de ». */
  fixed?: boolean
  /** Valeur de la formule dans le formulaire de devis. */
  value: string
}

// Cartes de formules (cours, formules du chef privé…) : durée, participants, menu, inclus, prix, pour décider sans appeler.
// Le bouton ouvre le formulaire de devis du service, avec la formule déjà choisie (data-quote-choice).
export function PackageCards(p: {
  name: string
  /** Fond de la section (beige par défaut). */
  tone?: 'white' | 'beige' | 'terracotta'
  /** Masque kicker, titre et introduction (un titre de catégorie précède déjà le bloc). */
  hideHeader?: boolean
  /** 4 : une ligne de quatre cartes sur grand écran (contenu empilé) ; 2 par défaut. */
  columns?: 2 | 3 | 4
  kicker: string
  title: string
  intro: string
  labels: Record<'duration' | 'group' | 'level' | 'menu' | 'included' | 'ideal' | 'from', string>
  items: Package[]
  cta: { label: string; href: string }
}) {
  const four = (p.columns ?? 2) >= 3
  const dark = p.tone === 'terracotta'
  const facts = (c: Package) =>
    [
      { Icon: Clock, label: p.labels.duration, value: c.duration },
      { Icon: Users, label: p.labels.group, value: c.group },
      { Icon: GraduationCap, label: p.labels.level, value: c.level },
    ] as const
  return (
    <Shell name={p.name} tone={p.tone ?? 'beige'}>
      {!p.hideHeader && <Heading kicker={p.kicker} title={p.title} intro={p.intro} light={dark} />}
      <ul
        className={`grid gap-6 ${p.hideHeader ? '-mt-10 max-md:-mt-6' : ''} ${p.columns === 3 ? 'grid-cols-3 max-lg:grid-cols-1' : four ? 'grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1' : 'grid-cols-2 max-lg:grid-cols-1'}`}
      >
        {p.items.map((c, i) => (
          <li
            key={c.title}
            data-reveal="up"
            data-d={Math.min(i + 1, 6)}
            className={`flex flex-col rounded-[18px] bg-white max-md:p-6 ${dark ? 'shadow-[0_10px_30px_rgba(0,0,0,0.12)]' : 'border border-[#e3d9cc] shadow-[0_10px_30px_rgba(85,80,68,0.08)]'} ${four ? 'p-6' : 'p-8'}`}
          >
            <div className="flex items-start gap-4">
              <span aria-hidden className="text-[40px] leading-none">
                {c.emoji}
              </span>
              <div>
                <h3 className={`font-display text-[26px] leading-[1.15] font-semibold ${INK}`}>
                  {c.title}
                </h3>
                <p className="mt-1 text-[16px] font-semibold text-[#B04A2A]">{c.subtitle}</p>
              </div>
            </div>
            <p className={`mt-4 text-[16px] leading-[1.65] ${SOFT}`}>{c.text}</p>
            <dl
              className={`mt-5 grid gap-3 border-y border-[#e3d9cc] py-4 max-md:grid-cols-1 ${four ? 'grid-cols-1' : 'grid-cols-3'}`}
            >
              {facts(c).map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon aria-hidden className="mt-0.5 size-[18px] flex-none text-[#B04A2A]" />
                  <div>
                    <dt className="text-[13px] font-bold tracking-[0.12em] text-[#B04A2A] uppercase">
                      {label}
                    </dt>
                    <dd className={`text-[15px] leading-[1.4] font-medium ${INK}`}>{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div
              className={`mt-5 grid gap-6 max-md:grid-cols-1 ${four ? 'grid-cols-1' : 'grid-cols-2'}`}
            >
              <div>
                <h4 className="mb-2 text-[13px] font-bold tracking-[0.12em] text-[#B04A2A] uppercase">
                  {p.labels.menu}
                </h4>
                <ul className="flex flex-col gap-1.5">
                  {c.menu.map((m) => (
                    <li key={m} className={`text-[15px] leading-[1.45] ${INK}`}>
                      · {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-[13px] font-bold tracking-[0.12em] text-[#B04A2A] uppercase">
                  {p.labels.included}
                </h4>
                <ul className="flex flex-col gap-1.5">
                  {c.included.map((m) => (
                    <li
                      key={m}
                      className={`flex items-start gap-2 text-[15px] leading-[1.45] ${INK}`}
                    >
                      <Check
                        aria-hidden
                        className="mt-1 size-3.5 flex-none text-[#B04A2A]"
                        strokeWidth={3}
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={`mt-5 text-[15px] leading-[1.5] ${SOFT}`}>
              <strong className={INK}>{p.labels.ideal} :</strong> {c.ideal}
            </p>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
              <p className="flex flex-col">
                {!c.fixed && <span className={`text-[14px] ${SOFT}`}>{p.labels.from}</span>}
                <strong className="text-[28px] leading-[1.1] text-[#B04A2A]">
                  {c.price} <span className={`text-[15px] font-normal ${SOFT}`}>{c.priceNote}</span>
                </strong>
              </p>
              <Cta href={p.cta.href} label={p.cta.label} attrs={{ 'data-quote-choice': c.value }} />
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  )
}
