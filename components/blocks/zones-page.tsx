import { CalendarClock, Car, ChefHat, CookingPot, GraduationCap, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Cta, Heading, Shell } from '@/components/blocks/home-v2'
import styles from './zones-page.module.css'
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
      <div className={styles.mapLayout}>
        <figure data-reveal="up" className={styles.mapFigure}>
          <svg
            viewBox={`0 0 ${view.width} ${view.height}`}
            role="img"
            aria-label={text.label}
            className={styles.mapSvg}
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
          <ul className={styles.legend}>
            {(['z1', 'z2', 'z3'] as const).map((z) => (
              <li key={z} className={styles.legendItem}>
                <span
                  aria-hidden
                  className={styles.legendDot}
                  style={{ background: ZONE_COLOR[z] }}
                />
                {text.legend[z]}
              </li>
            ))}
          </ul>
          <p className={styles.note}>{text.note}</p>
          {link && (
            <p className={styles.linkRow}>
              <Link href={link.href} className={styles.link}>
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
      <ul className={styles.cityList}>
        {p.hubs.map((h, i) => (
          <li key={h.title} data-reveal="up" data-d={(i % 2) + 1} className={styles.cityCard}>
            <h3 className={styles.cityTitle}>
              <MapPin aria-hidden className={styles.cityIcon} strokeWidth={1.7} />
              {h.title}
            </h3>
            <p className={styles.cityText}>{h.text}</p>
            <ul className={styles.communes}>
              {h.communes.map((c) => (
                <li key={c.name} className={styles.commune}>
                  <span
                    aria-hidden
                    className={styles.communeDot}
                    style={{ background: ZONE_COLOR[c.zone] }}
                  />
                  {c.name}
                  <span className={styles.srOnly}> ({p.zoneLabels[c.zone]})</span>
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
      <ul className={styles.zoneList}>
        {p.zones.map((z, i) => (
          <li
            key={z.id}
            data-reveal="up"
            data-d={i + 1}
            className={styles.zoneCard}
            style={{ borderTopColor: ZONE_COLOR[z.id] }}
          >
            <p className={styles.zoneBadge} style={{ color: ZONE_COLOR[z.id] }}>
              {z.badge}
            </p>
            <h3 className={styles.zoneTitle}>{z.title}</h3>
            <ul className={styles.services}>
              {z.services.map((s) => {
                const Icon = SERVICE_ICON[s.id]
                return (
                  <li key={s.id} className={styles.service}>
                    <Icon aria-hidden className={styles.serviceIcon} strokeWidth={1.7} />
                    <span>
                      <strong className={styles.serviceLabel}>{s.label}</strong>
                      <span className={styles.serviceStatus}> · {s.status}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <dl className={styles.details}>
              <div className={styles.detail}>
                <Car aria-hidden className={styles.serviceIcon} strokeWidth={1.7} />
                <div>
                  <dt className={styles.detailLabel}>{p.travelLabel}</dt>
                  <dd className={styles.detailValue}>{z.travel}</dd>
                </div>
              </div>
              <div className={styles.detail}>
                <CalendarClock aria-hidden className={styles.serviceIcon} strokeWidth={1.7} />
                <div>
                  <dt className={styles.detailLabel}>{p.delayLabel}</dt>
                  <dd className={styles.detailValue}>{z.delay}</dd>
                </div>
              </div>
            </dl>
            {z.note && <p className={styles.zoneNote}>{z.note}</p>}
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
      <div className={styles.cta} data-reveal="up">
        <Heading kicker={p.kicker} title={p.title} intro={p.text} />
        <Cta href="/contact#devis" label={p.button} lead />
      </div>
    </Shell>
  )
}
