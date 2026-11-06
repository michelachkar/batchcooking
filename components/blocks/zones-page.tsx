import { CalendarClock, Car, ChefHat, CookingPot, GraduationCap, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Cta, Heading, INK, SOFT, Shell } from '@/components/blocks/home-v2'
import { center, communes, KM, offMap, project, view, type Commune, type ZoneId } from '@/lib/zones'

const ZONE_COLOR: Record<ZoneId, string> = {
  z1: '#B04A2A',
  z2: '#C9894A',
  z3: '#8A8174',
}

const SERVICE_ICON = { batch: CookingPot, chef: ChefHat, cours: GraduationCap } as const

type MapText = { label: string; legend: Record<ZoneId, string>; sea: string; note: string }

// Carte schématique : deux cercles autour de Montpellier (zones 1 et 2), communes positionnées d'après leurs coordonnées.
export function ZonesMap({
  text,
  heading,
  link,
}: {
  text: MapText
  /** Titre au-dessus de la carte (page contact). */
  heading?: { kicker: string; title: string; intro: string }
  /** Lien sous la légende (page contact). */
  link?: { label: string; href: string }
}) {
  const dot = (c: Commune) => ({ ...project(c.lat, c.lon), c })
  return (
    <Shell name="map">
      {heading && <Heading kicker={heading.kicker} title={heading.title} intro={heading.intro} />}
      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center gap-10 max-lg:grid-cols-1">
        <figure
          data-reveal="up"
          className="m-0 overflow-hidden rounded-[18px] bg-[rgba(240,235,227,1)] p-3 shadow-[0_10px_30px_rgba(85,80,68,0.08)]"
        >
          <svg
            viewBox={`0 0 ${view.width} ${view.height}`}
            role="img"
            aria-label={text.label}
            className="block h-auto w-full"
          >
            <defs>
              <linearGradient id="zones-sea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ECDFD9" stopOpacity="0" />
                <stop offset="1" stopColor="#ECDFD9" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <rect width={view.width} height={view.height} fill="#F5F1EA" />
            <rect y={view.height - 150} width={view.width} height="150" fill="url(#zones-sea)" />
            <text
              x={view.width - 24}
              y={view.height - 18}
              textAnchor="end"
              fontSize="15"
              fontStyle="italic"
              fill="#BB6A42"
            >
              {text.sea}
            </text>
            {/* Zone 2 puis zone 1 : deux cercles concentriques autour de Montpellier. */}
            <circle
              cx={center.x}
              cy={center.y}
              r={22 * KM}
              fill={ZONE_COLOR.z2}
              fillOpacity="0.1"
              stroke={ZONE_COLOR.z2}
              strokeOpacity="0.55"
              strokeDasharray="6 6"
            />
            <circle
              cx={center.x}
              cy={center.y}
              r={8.5 * KM}
              fill={ZONE_COLOR.z1}
              fillOpacity="0.14"
              stroke={ZONE_COLOR.z1}
              strokeOpacity="0.7"
            />
            {communes.map(dot).map(({ x, y, c }) => {
              const side = c.label ?? 'right'
              const lx = side === 'left' ? -9 : side === 'right' ? 9 : 0
              const ly = side === 'top' ? -10 : side === 'bottom' ? 20 : 5
              const anchor = side === 'left' ? 'end' : side === 'right' ? 'start' : 'middle'
              const main = c.name === 'Montpellier'
              return (
                <g key={c.name}>
                  <circle
                    cx={x}
                    cy={y}
                    r={main ? 8 : 5.5}
                    fill={ZONE_COLOR[c.zone]}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    x={x + lx}
                    y={y + ly}
                    textAnchor={anchor}
                    fontSize={main ? 21 : 15}
                    fontWeight={main ? 700 : 500}
                    fill="#555044"
                    stroke="#F5F1EA"
                    strokeWidth="4"
                    paintOrder="stroke"
                  >
                    {c.name}
                  </text>
                </g>
              )
            })}
            {offMap.map((o) => (
              <text
                key={o.name}
                x={o.x}
                y={o.y}
                fontSize="15"
                fontWeight={500}
                fill={ZONE_COLOR.z3}
                stroke="#ECDFD9"
                strokeWidth="4"
                paintOrder="stroke"
              >
                {`${o.arrow} ${o.name} · ${o.km} km`}
              </text>
            ))}
          </svg>
        </figure>
        <div data-reveal="up" data-d="2">
          <ul className="mb-6 flex flex-col gap-3">
            {(['z1', 'z2', 'z3'] as const).map((z) => (
              <li key={z} className={`flex items-center gap-3 text-[16px] ${INK}`}>
                <span
                  aria-hidden
                  className="size-4 flex-none rounded-full"
                  style={{ background: ZONE_COLOR[z] }}
                />
                {text.legend[z]}
              </li>
            ))}
          </ul>
          <p className={`text-[15px] leading-[1.6] ${SOFT}`}>{text.note}</p>
          {link && (
            <p className="mt-5">
              <Link href={link.href} className="font-semibold text-[#B04A2A] underline">
                {link.label}
              </Link>
            </p>
          )}
        </div>
      </div>
    </Shell>
  )
}

type Hub = {
  title: string
  text: string
  communes: { name: string; zone: ZoneId }[]
}

// Une section par ville principale : la ville, ses quartiers ou communes proches, avec la zone de chacune.
export function CityHubs(p: {
  kicker: string
  title: string
  intro: string
  zoneLabels: Record<ZoneId, string>
  hubs: Hub[]
}) {
  return (
    <Shell name="cities" tone="beige">
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
      <ul className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        {p.hubs.map((h, i) => (
          <li
            key={h.title}
            data-reveal="up"
            data-d={(i % 2) + 1}
            className="rounded-[18px] bg-white p-7 shadow-[0_10px_30px_rgba(85,80,68,0.08)]"
          >
            <h3
              className={`font-display mb-2 flex items-center gap-3 text-[24px] leading-[1.2] font-semibold ${INK}`}
            >
              <MapPin aria-hidden className="size-6 text-[#B04A2A]" strokeWidth={1.7} />
              {h.title}
            </h3>
            <p className={`mb-5 text-[16px] leading-[1.6] ${SOFT}`}>{h.text}</p>
            <ul className="flex flex-wrap gap-2">
              {h.communes.map((c) => (
                <li
                  key={c.name}
                  className={`inline-flex items-center gap-2 rounded-full border border-[rgba(85,80,68,0.14)] px-3.5 py-1.5 text-[15px] ${INK}`}
                >
                  <span
                    aria-hidden
                    className="size-2.5 rounded-full"
                    style={{ background: ZONE_COLOR[c.zone] }}
                  />
                  {c.name}
                  <span className="sr-only"> ({p.zoneLabels[c.zone]})</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Shell>
  )
}

type ZoneCard = {
  id: ZoneId
  title: string
  badge: string
  travel: string
  delay: string
  services: { id: keyof typeof SERVICE_ICON; label: string; status: string }[]
  note?: string
}

// Services disponibles, délai de réservation et déplacement pour chaque zone.
export function ZoneServices(p: {
  tone?: 'white' | 'beige'
  kicker: string
  title: string
  intro: string
  travelLabel: string
  delayLabel: string
  zones: ZoneCard[]
}) {
  return (
    <Shell name="zone-services" tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} />
      <ul className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
        {p.zones.map((z, i) => (
          <li
            key={z.id}
            data-reveal="up"
            data-d={i + 1}
            className="flex flex-col rounded-[18px] border-t-[5px] bg-white p-7 shadow-[0_10px_30px_rgba(85,80,68,0.08)]"
            style={{ borderTopColor: ZONE_COLOR[z.id] }}
          >
            <p
              className="mb-2 text-[13px] font-bold tracking-[0.16em] uppercase"
              style={{ color: ZONE_COLOR[z.id] }}
            >
              {z.badge}
            </p>
            <h3 className={`font-display mb-5 text-[24px] leading-[1.2] font-semibold ${INK}`}>
              {z.title}
            </h3>
            <ul className="mb-6 flex flex-col gap-3">
              {z.services.map((s) => {
                const Icon = SERVICE_ICON[s.id]
                return (
                  <li key={s.id} className={`flex items-start gap-3 text-[16px] ${INK}`}>
                    <Icon
                      aria-hidden
                      className="mt-0.5 size-5 flex-none text-[#B04A2A]"
                      strokeWidth={1.7}
                    />
                    <span>
                      <strong className="font-semibold">{s.label}</strong>
                      <span className={SOFT}> · {s.status}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <dl className="mt-auto flex flex-col gap-4 border-t border-[rgba(85,80,68,0.12)] pt-5">
              <div className="flex items-start gap-3">
                <Car
                  aria-hidden
                  className="mt-0.5 size-5 flex-none text-[#B04A2A]"
                  strokeWidth={1.7}
                />
                <div>
                  <dt className={`text-[14px] font-semibold uppercase ${SOFT}`}>{p.travelLabel}</dt>
                  <dd className={`text-[16px] leading-[1.5] ${INK}`}>{z.travel}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarClock
                  aria-hidden
                  className="mt-0.5 size-5 flex-none text-[#B04A2A]"
                  strokeWidth={1.7}
                />
                <div>
                  <dt className={`text-[14px] font-semibold uppercase ${SOFT}`}>{p.delayLabel}</dt>
                  <dd className={`text-[16px] leading-[1.5] ${INK}`}>{z.delay}</dd>
                </div>
              </div>
            </dl>
            {z.note && <p className={`mt-4 text-[15px] leading-[1.55] ${SOFT}`}>{z.note}</p>}
          </li>
        ))}
      </ul>
    </Shell>
  )
}

export function ZonesCta(p: {
  kicker: string
  title: string
  text: string
  button: string
  tone?: 'white' | 'beige'
}) {
  return (
    <Shell name="zones-cta" tone={p.tone ?? 'beige'}>
      <div className="mx-auto max-w-[44rem] text-center" data-reveal="up">
        <Heading kicker={p.kicker} title={p.title} intro={p.text} />
        <Cta href="/contact#devis" label={p.button} lead />
      </div>
    </Shell>
  )
}
