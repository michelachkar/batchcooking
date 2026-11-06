'use client'

import { useEffect, useState } from 'react'

export type HeroReview = { quote: string; name: string }

// Carrousel d'avis du hero : fondu automatique toutes les 6 s, pause au survol/focus, points de navigation.
// Tous les avis sont empilés dans la même cellule de grille : la hauteur est celle du plus long, sans saut de mise en page.
export function HeroReviews({ reviews, label }: { reviews: HeroReview[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reviews.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 6000)
    return () => clearInterval(id)
  }, [paused, reviews.length])

  if (reviews.length === 0) return null

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      data-reveal="up"
      data-d="6"
      className="border-ink/15 bg-ink/[0.06] min-w-0 flex-1 basis-[260px] rounded-[18px] border px-5 py-3.5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid" aria-live={paused ? 'polite' : 'off'}>
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            aria-hidden={i !== index}
            className={`col-start-1 row-start-1 m-0 flex flex-col gap-1.5 transition-opacity duration-500 ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <blockquote className="m-0 text-[14px] leading-[1.45] text-[rgba(85,80,68,1)] italic">
              « {r.quote} »
            </blockquote>
            <figcaption className="text-[13px] leading-none font-semibold text-[#B04A2A]">
              {r.name}
            </figcaption>
          </figure>
        ))}
      </div>
      {reviews.length > 1 && (
        <div className="mt-2.5 flex gap-1.5">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              aria-label={`${r.name} (${i + 1}/${reviews.length})`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-[#B04A2A]' : 'bg-ink/30 hover:bg-ink/50 w-1.5'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
