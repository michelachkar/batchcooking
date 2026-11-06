'use client'

import { useState } from 'react'
import clsx from 'clsx'
import styles from './realisations-gallery.module.css'
import { RealisationCard, type RealisationCardData } from '@/components/blocks/realisation-card'

type Labels = {
  all: string
  filter: string
  empty: string
  count: string
  reset: string
  tags: string
  groups: Record<'small' | 'medium' | 'large', string>
}

type Props = {
  items: RealisationCardData[]
  /** Services à proposer en onglet, dans l'ordre (seuls ceux qui ont des réalisations sont affichés). */
  services: { id: string; label: string }[]
  labels: Labels
}

const toggle = <T,>(list: T[], v: T) =>
  list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
const uniq = (xs: (string | undefined)[]) =>
  [...new Set(xs.filter((x): x is string => Boolean(x)))].sort((a, b) => a.localeCompare(b, 'fr'))

// Galerie des réalisations : onglets par service, puis filtres par occasion, commune, taille du groupe et régime.
export function RealisationsGallery({ items, services, labels }: Props) {
  const [service, setService] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])

  const tabs = services.filter((s) => items.some((i) => i.service === s.id))
  // Tags secondaires : occasion, commune, taille du groupe, régime — regroupés dans une seule rangée de pastilles.
  const tagsOf = (i: RealisationCardData) =>
    [
      i.occasion,
      i.city,
      i.group && labels.groups[i.group],
      ...(i.diets ?? []),
      ...(i.tags ?? []),
    ].filter((x): x is string => Boolean(x))
  const allTags = uniq(items.flatMap(tagsOf))

  const shown = items.filter(
    (i) => (!service || i.service === service) && tags.every((t) => tagsOf(i).includes(t)),
  )
  const active = service !== null || tags.length > 0
  const reset = () => {
    setService(null)
    setTags([])
  }

  return (
    <div>
      <div className={styles.filters}>
        <div role="group" aria-label={labels.filter} className={styles.group}>
          {[{ id: null, label: labels.all }, ...tabs].map((t) => (
            <button
              key={t.id ?? 'all'}
              type="button"
              aria-pressed={service === t.id}
              onClick={() => setService(t.id)}
              className={styles.pill}
            >
              {t.label}
            </button>
          ))}
        </div>
        {allTags.length > 0 && (
          <div role="group" aria-label={labels.tags} className={styles.group}>
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tags.includes(t)}
                onClick={() => setTags(toggle(tags, t))}
                className={clsx(styles.pill, styles.tagPill)}
              >
                # {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <p aria-live="polite" className={styles.count}>
        {labels.count.replace('{n}', String(shown.length))}
        {active && (
          <button type="button" onClick={reset} className={styles.reset}>
            {labels.reset}
          </button>
        )}
      </p>

      {shown.length === 0 ? (
        <p className={styles.empty}>{labels.empty}</p>
      ) : (
        <ul className={styles.list}>
          {shown.map((r) => (
            <RealisationCard
              key={r.href}
              r={r}
              tags={[...(r.tags ?? []), ...tagsOf(r)].filter((t, k, a) => a.indexOf(t) === k)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
