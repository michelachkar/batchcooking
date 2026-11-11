'use client'

import { useState } from 'react'
import clsx from 'clsx'
import styles from './realisations-gallery.module.css'
import { ProjectCard } from '@/components/blocks/project-card'
import type { RealisationCardData } from '@/components/blocks/realisation-card'

type Labels = {
  all: string
  filter: string
  empty: string
  count: string
  reset: string
  tags: string
  /** Lien de chaque carte. */
  viewProject: string
  /** Bouton « voir plus » et compteur « {shown} sur {total} ». */
  more: string
  progress: string
  groups: Record<'small' | 'medium' | 'large', string>
}

type RealisationsGalleryProps = {
  items: RealisationCardData[]
  /** Services à proposer en onglet, dans l'ordre (seuls ceux qui ont des réalisations sont affichés). */
  services: { id: string; label: string }[]
  labels: Labels
  /** Nombre de réalisations affichées d'abord ; le bouton « voir plus » en révèle autant à chaque clic. */
  pageSize?: number
  /** Les filtres par tag n'apparaissent qu'à partir de ce nombre de réalisations (inutiles sur une petite liste). */
  tagFilterFrom?: number
}

const toggle = <T,>(list: T[], v: T) =>
  list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
const uniq = (xs: (string | undefined)[]) =>
  [...new Set(xs.filter((x): x is string => Boolean(x)))].sort((a, b) => a.localeCompare(b, 'fr'))

// Galerie des réalisations en cartes verticales : onglets par service, puis filtres par occasion, commune, taille du groupe et régime.
export function RealisationsGallery({
  items,
  services,
  labels,
  pageSize = 12,
  tagFilterFrom = 12,
}: RealisationsGalleryProps) {
  const [service, setService] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [visible, setVisible] = useState(pageSize)

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
    setVisible(pageSize)
  }
  // Un changement de filtre repart de la première page.
  const pickService = (id: string | null) => {
    setService(id)
    setVisible(pageSize)
  }
  const pickTag = (t: string) => {
    setTags((list) => toggle(list, t))
    setVisible(pageSize)
  }
  const showTags = items.length >= tagFilterFrom && allTags.length > 0

  return (
    <div>
      <div className={styles.filters}>
        <div role="group" aria-label={labels.filter} className={styles.group}>
          {[{ id: null, label: labels.all }, ...tabs].map((t) => (
            <button
              key={t.id ?? 'all'}
              type="button"
              aria-pressed={service === t.id}
              onClick={() => pickService(t.id)}
              className={styles.pill}
            >
              {t.label}
            </button>
          ))}
        </div>

        {showTags && (
          <div role="group" aria-label={labels.tags} className={styles.group}>
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tags.includes(t)}
                onClick={() => pickTag(t)}
                className={clsx(styles.pill, styles.tagPill)}
              >
                {t}
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
        <>
          <ul className={styles.list}>
            {/* Toutes les fiches restent dans le HTML (liens explorables) ; les suivantes sont masquées jusqu'au clic. */}
            {shown.map((r, i) => (
              <ProjectCard
                key={r.href}
                project={r}
                cta={labels.viewProject}
                as="h3"
                hidden={i >= visible}
              />
            ))}
          </ul>
          {shown.length > visible && (
            <div className={styles.more}>
              <p className={styles.progress}>
                {labels.progress
                  .replace('{shown}', String(visible))
                  .replace('{total}', String(shown.length))}
              </p>
              <button
                type="button"
                onClick={() => setVisible((v) => v + pageSize)}
                className={styles.moreButton}
              >
                {labels.more}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
