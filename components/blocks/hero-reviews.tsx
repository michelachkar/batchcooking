'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './hero-reviews.module.css'

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
      className={styles.root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.stack} aria-live={paused ? 'polite' : 'off'}>
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            aria-hidden={i !== index}
            className={clsx(styles.review, i === index && styles.active)}
          >
            <blockquote className={styles.quote}>« {r.quote} »</blockquote>
            <figcaption className={styles.author}>{r.name}</figcaption>
          </figure>
        ))}
      </div>
      {reviews.length > 1 && (
        <div className={styles.dots}>
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              aria-label={`${r.name} (${i + 1}/${reviews.length})`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={clsx(styles.dot, i === index && styles.dotActive)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
