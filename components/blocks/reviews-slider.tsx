'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from './reviews-slider.module.css'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type Review = { name: string; text: string; role: string; image: Img; alt: string }

type ReviewsSliderProps = {
  reviews: Review[]
  labels: { prev: string; next: string; navigation: string }
  /** Marge basse du curseur (en plus des 16 px de base), en px. */
  className?: string
  /** Avis actif au chargement (par défaut celui du milieu). */
  initial?: number
}

// Curseur d'avis : slide actif centré (carte sombre, les autres réduites), boucle infinie, glisser ou flèches clavier.
// Trois copies de la liste évitent tout vide dans la boucle ; seule la copie centrale est exposée aux lecteurs d'écran.
export function ReviewsSlider({ reviews, labels, className, initial }: ReviewsSliderProps) {
  const n = reviews.length
  const [pos, setPos] = useState(n + (initial ?? Math.floor((n - 1) / 2)))
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const [drag, setDrag] = useState(0)
  const startX = useRef<number | null>(null)
  const startT = useRef(0)
  const listRef = useRef<HTMLUListElement>(null)

  const go = (d: number) => {
    setAnimate(true)
    setPos((p) => p + d)
  }
  // Fin de glissement : retour invisible dans la copie centrale.
  const settle = () => {
    if (pos >= n && pos < 2 * n) return
    setAnimate(false)
    setPos((p) => (p < n ? p + n : p - n))
  }
  const active = pos % n

  // Défilement automatique (Swiper : delay 4000, pauseOnMouseEnter) : 4 s après chaque changement de slide, sauf survol,
  // glissement en cours ou préférence « réduire les animations ».
  useEffect(() => {
    if (paused || n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => {
      setAnimate(true)
      setPos((p) => p + 1)
    }, 4000)
    return () => clearTimeout(id)
  }, [paused, n, pos])

  // Fin de glissement façon Swiper : balayage court (< 300 ms, > 5 px) ou plus de la moitié d'une slide = une slide.
  const release = (dx: number) => {
    const li = listRef.current?.children[0] as HTMLElement | undefined
    const step = li ? li.offsetWidth + parseFloat(getComputedStyle(li).marginRight) : 1
    const quick = performance.now() - startT.current < 300 && Math.abs(dx) > 5
    setAnimate(true)
    setDrag(0)
    if (quick || Math.abs(dx) > step / 2) setPos((p) => p + (dx < 0 ? 1 : -1))
  }

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label={labels.navigation}
      className={clsx(styles.root, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={styles.viewport}
        onPointerDown={(e) => {
          startX.current = e.clientX
          startT.current = performance.now()
          e.currentTarget.setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (startX.current !== null) {
            setAnimate(false)
            setDrag(e.clientX - startX.current)
          }
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return
          release(e.clientX - startX.current)
          startX.current = null
        }}
        onPointerCancel={() => {
          if (startX.current === null) return
          release(0)
          startX.current = null
        }}
      >
        <div className={styles.measure}>
          <ul
            ref={listRef}
            className={clsx(styles.track, animate && styles.animate)}
            style={{
              left: '50%',
              transform: `translateX(calc(-1 * (${pos} * (var(--rv-w) + var(--rv-gap)) + var(--rv-w) / 2) + ${drag}px))`,
            }}
            onTransitionEnd={(e) => {
              // Ignore les transitions des cartes (bulles) : seule celle de la piste referme la boucle.
              if (e.target === e.currentTarget) settle()
            }}
          >
            {[0, 1, 2].flatMap((copy) =>
              reviews.map((r, i) => {
                const isActive = copy === 1 && i === active
                return (
                  <li
                    key={`${copy}-${r.name}`}
                    inert={copy !== 1}
                    aria-hidden={copy !== 1 || undefined}
                    className={styles.slide}
                    style={{ marginRight: 'var(--rv-gap)' }}
                  >
                    <ReviewCard review={r} active={isActive} />
                  </li>
                )
              }),
            )}
          </ul>
        </div>
      </div>
      <button type="button" className={styles.srOnly} onClick={() => go(-1)}>
        {labels.prev}
      </button>
      <button type="button" className={styles.srOnly} onClick={() => go(1)}>
        {labels.next}
      </button>
    </div>
  )
}

function ReviewCard({ review: r, active }: { review: Review; active: boolean }) {
  return (
    <article className={clsx(styles.card, active && styles.active)}>
      <div aria-hidden className={styles.cardBg} />
      <div className={styles.avatar}>
        <Image
          src={r.image.src}
          alt={r.alt}
          width={r.image.width}
          height={r.image.height}
          unoptimized={r.image.unoptimized}
          sizes="90px"
          className={styles.avatarImg}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{r.name}</h3>
        <p className={styles.text}>{r.text}</p>
        <div className={styles.footer}>
          <div className={styles.roleWrap}>
            <span className={styles.role}>{r.role}</span>
          </div>
          <span className={styles.rating} role="img" aria-label="5/5">
            <span className={styles.starsBase} aria-hidden>
              ★★★★★
            </span>
            <span className={styles.starsFill} aria-hidden>
              ★★★★★
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}
