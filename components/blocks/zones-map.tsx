import Link from 'next/link'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import {
  center,
  communes,
  KM,
  offMap,
  project,
  view,
  type Commune,
  type ZoneId,
  ZONE_COLOR,
} from '@/lib/zones'
import styles from './zones-map.module.css'

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
    <Section name="map">
      {heading && (
        <SectionHeading kicker={heading.kicker} title={heading.title} intro={heading.intro} />
      )}
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
    </Section>
  )
}
