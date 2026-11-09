'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import styles from './projects-carousel.module.css'

export type Project = {
  image: { src: string; width: number; height: number; unoptimized?: boolean }
  alt: string
  type: string
  title: string
  href: string
}

type ProjectsCarouselProps = {
  projects: Project[]
  labels: { prev: string; next: string; navigation: string }
}

// Carrousel « réalisations » : slide actif centré (le central au chargement), boucle infinie, compteur et flèches.
// Trois copies de la liste sont rendues pour que la boucle ne montre jamais de vide ; seule la copie centrale est interactive.
export function ProjectsCarousel({ projects, labels }: ProjectsCarouselProps) {
  const n = projects.length
  const [pos, setPos] = useState(n + Math.floor((n - 1) / 2))
  const [animate, setAnimate] = useState(true)
  const [drag, setDrag] = useState(0)
  const startX = useRef<number | null>(null)
  const startT = useRef(0)
  const listRef = useRef<HTMLUListElement>(null)

  const go = (d: number) => {
    setAnimate(true)
    setPos((p) => p + d)
  }
  // Fin de glissement : on revient dans la copie centrale sans animation, de façon invisible.
  const settle = () => {
    if (pos >= n && pos < 2 * n) return
    setAnimate(false)
    setPos((p) => (p < n ? p + n : p - n))
  }
  const active = pos % n

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
    <div className={styles.root}>
      <div className={styles.inner}>
        <div
          className={styles.viewport}
          onPointerDown={(e) => {
            startX.current = e.clientX
            startT.current = performance.now()
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            if (startX.current === null) return
            const dx = e.clientX - startX.current
            // Sous 5 px, c'est un clic : on ne déclenche pas de glissement (le lien reste cliquable).
            if (Math.abs(dx) < 5 && drag === 0) return
            setAnimate(false)
            setDrag(dx)
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
          <div className={styles.stage}>
            <ul
              ref={listRef}
              className={clsx(styles.track, animate && styles.trackAnimated)}
              style={{
                left: '50%',
                transform: `translateX(calc(-1 * (${pos} * (var(--pp-w) + var(--pp-gap)) + var(--pp-w) / 2) + ${drag}px))`,
              }}
              onTransitionEnd={(e) => {
                // Les transitions des cartes remontent : seule celle de la piste referme la boucle.
                if (e.target === e.currentTarget) settle()
              }}
            >
              {[0, 1, 2].flatMap((copy) =>
                projects.map((p, i) => {
                  const isActive = copy === 1 && i === active
                  return (
                    <li
                      key={`${copy}-${i}`}
                      inert={copy !== 1}
                      aria-hidden={copy !== 1 || undefined}
                      className={clsx(styles.slide, isActive && styles.slideActive)}
                      style={{ marginRight: 'var(--pp-gap)' }}
                    >
                      <article
                        className={clsx(
                          styles.card,
                          isActive ? styles.cardActive : styles.cardInactive,
                        )}
                      >
                        <Image
                          src={p.image.src}
                          alt={p.alt}
                          width={p.image.width}
                          height={p.image.height}
                          unoptimized={p.image.unoptimized}
                          sizes="(min-width: 1400px) 26vw, (min-width: 1024px) 30vw, 320px"
                          className={styles.image}
                        />
                        <div className={styles.caption}>
                          <p className={styles.type}>{p.type}</p>
                          <h3 className={styles.title}>{p.title}</h3>
                        </div>
                        <Link href={p.href} aria-label={p.title} className={styles.link} />
                      </article>
                    </li>
                  )
                }),
              )}
            </ul>
          </div>
        </div>
        <div className={styles.nav} role="group" aria-label={labels.navigation}>
          <NavButton label={labels.prev} onClick={() => go(-1)} d="M15 18l-6-6 6-6" />
          <p className={styles.counter} aria-live="polite" aria-atomic="true">
            <span className={styles.current}>{active + 1}</span>
            <span className={styles.separator} aria-hidden>
              /
            </span>
            <span>{n}</span>
          </p>
          <NavButton label={labels.next} onClick={() => go(1)} d="M9 18l6-6-6-6" />
        </div>
      </div>
    </div>
  )
}

function NavButton({ label, onClick, d }: { label: string; onClick: () => void; d: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={styles.navButton}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={styles.navIcon}
      >
        <path d={d} />
      </svg>
    </button>
  )
}
