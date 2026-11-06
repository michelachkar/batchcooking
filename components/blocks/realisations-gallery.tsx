'use client'

import { useState } from 'react'
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

  const pill = (on: boolean) =>
    `rounded-full border px-4 py-1.5 text-[14px] font-semibold [transition:color_0.2s_ease,background-color_0.2s_ease,border-color_0.2s_ease] ${on ? 'border-[#B04A2A] bg-[#B04A2A] text-white' : 'border-[#e3d9cc] bg-white text-[rgba(85,80,68,0.92)] hover:border-[#B04A2A] hover:text-[#B04A2A]'}`

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
          {[{ id: null, label: labels.all }, ...tabs].map((t) => (
            <button
              key={t.id ?? 'all'}
              type="button"
              aria-pressed={service === t.id}
              onClick={() => setService(t.id)}
              className={pill(service === t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {allTags.length > 0 && (
          <div role="group" aria-label={labels.tags} className="flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tags.includes(t)}
                onClick={() => setTags(toggle(tags, t))}
                className={`${pill(tags.includes(t))} !py-1 !text-[13px] !font-medium`}
              >
                # {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <p aria-live="polite" className="mb-6 text-[15px] text-[rgba(85,80,68,0.88)]">
        {labels.count.replace('{n}', String(shown.length))}
        {active && (
          <button
            type="button"
            onClick={reset}
            className="ml-3 font-semibold text-[#B04A2A] underline"
          >
            {labels.reset}
          </button>
        )}
      </p>

      {shown.length === 0 ? (
        <p className="rounded-[18px] border border-[#e3d9cc] p-8 text-center text-[17px] text-[rgba(85,80,68,0.88)]">
          {labels.empty}
        </p>
      ) : (
        <ul className="columns-3 gap-6 max-lg:columns-2 max-md:columns-1">
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
