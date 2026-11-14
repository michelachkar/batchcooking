'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import styles from './photo-wall.module.css'

export type WallPhoto = {
  src: string
  width: number
  height: number
  alt: string
  unoptimized?: boolean
  title: string
  /** Lien du diaporama (réalisation, page de service...) ; sans lien, le bouton est masqué. */
  href?: string
  service: string
  serviceLabel: string
  location?: string
  excerpt?: string
  guests?: string
  duration?: string
}

type Labels = {
  all: string
  filter: string
  empty: string
  open: string
  close: string
  prev: string
  next: string
  viewProject: string
  counter: string
  dialog: string
}

// Mosaïque de photos : onglets par service, tuiles de tailles variées, puis diaporama plein écran
// (clavier, flèches, balayage) avec un lien vers la réalisation d'origine.
export function PhotoWall({
  photos,
  services,
  labels,
}: {
  photos: WallPhoto[]
  services: { id: string; label: string }[]
  labels: Labels
}) {
  const [service, setService] = useState<string | null>(null)
  const [index, setIndex] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)

  const tabs = services.filter((s) => photos.some((p) => p.service === s.id))
  const shown = photos.filter((p) => !service || p.service === service)
  const open = index !== null
  const current = index !== null ? shown[index] : undefined

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + shown.length) % shown.length)),
    [shown.length],
  )

  // Ouvre / ferme le <dialog> modal (focus piégé, Échap natif) et fige le défilement de la page.
  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  return (
    <div>
      <div role="group" aria-label={labels.filter} className={styles.tabs}>
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

      {shown.length === 0 ? (
        <p className={styles.empty}>{labels.empty}</p>
      ) : (
        <ul className={styles.wall}>
          {shown.map((p, i) => (
            <li
              key={`${p.src}-${i}`}
              className={`${styles.tile} ${i % 7 === 0 ? styles.big : p.height > p.width ? styles.tall : ''}`}
            >
              <button
                type="button"
                className={styles.tileButton}
                onClick={() => setIndex(i)}
                aria-label={`${labels.open} : ${p.title}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  unoptimized={p.unoptimized}
                  sizes="(min-width: 1025px) 25vw, 50vw"
                  className={styles.photo}
                />
                <span aria-hidden className={styles.hover}>
                  <span className={styles.hoverService}>{p.serviceLabel}</span>
                  <span className={styles.hoverTitle}>{p.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-label={labels.dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
      >
        {current && (
          <div
            className={styles.stage}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              touchX.current = null
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            }}
          >
            <button
              type="button"
              className={styles.close}
              onClick={() => setIndex(null)}
              aria-label={labels.close}
            >
              <X aria-hidden />
            </button>
            <div className={styles.frame}>
              <Image
                key={current.src + index}
                src={current.src}
                alt={current.alt}
                fill
                unoptimized={current.unoptimized}
                sizes="100vw"
                priority
                className={styles.full}
              />
            </div>
            {shown.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.nav} ${styles.navPrev}`}
                  onClick={() => go(-1)}
                  aria-label={labels.prev}
                >
                  <ChevronLeft aria-hidden />
                </button>
                <button
                  type="button"
                  className={`${styles.nav} ${styles.navNext}`}
                  onClick={() => go(1)}
                  aria-label={labels.next}
                >
                  <ChevronRight aria-hidden />
                </button>
              </>
            )}
            <div className={styles.caption} aria-live="polite">
              <div className={styles.captionText}>
                <span className={styles.captionService}>
                  {current.serviceLabel}
                  {current.location ? ` · ${current.location}` : ''}
                </span>
                <span className={styles.captionTitle}>{current.title}</span>
                {current.excerpt && (
                  <span className={styles.captionExcerpt}>{current.excerpt}</span>
                )}
                {(current.guests || current.duration) && (
                  <span className={styles.captionFacts}>
                    {[current.guests, current.duration].filter(Boolean).join(' · ')}
                  </span>
                )}
              </div>
              <span className={styles.counter}>
                {labels.counter
                  .replace('{n}', String((index ?? 0) + 1))
                  .replace('{total}', String(shown.length))}
              </span>
              {current.href && (
                <Link href={current.href} className={styles.project}>
                  {labels.viewProject}
                  <ArrowRight aria-hidden />
                </Link>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
