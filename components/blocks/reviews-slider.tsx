'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type Review = { name: string; text: string; role: string; image: Img; alt: string }

type Props = {
  reviews: Review[]
  labels: { prev: string; next: string; navigation: string }
  /** Marge basse du curseur (en plus des 16 px de base), en px. */
  className?: string
  /** Avis actif au chargement (par défaut celui du milieu). */
  initial?: number
}

// Curseur d'avis : slide actif centré (carte sombre, les autres réduites), boucle infinie, glisser ou flèches clavier.
// Trois copies de la liste évitent tout vide dans la boucle ; seule la copie centrale est exposée aux lecteurs d'écran.
export function ReviewsSlider({ reviews, labels, className, initial }: Props) {
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
      className={cn(
        'overflow-x-hidden',
        className,
        // Variables du widget d'origine (marges de carte, avatar, texte) selon les paliers 992 et 768 px.
        '[--rv-gap:16px] min-[768px]:[--rv-gap:20px] min-[1024px]:[--rv-gap:24px]',
        '[--rv-av:90px] [@media(max-width:768px)]:[--rv-av:75px] [@media(min-width:769px)_and_(max-width:992px)]:[--rv-av:80px]',
        '[--rv-cpb:2.5rem] [--rv-cpt:3.5rem] [--rv-cpx:2.5rem] [@media(max-width:768px)]:[--rv-cpb:1.5rem] [@media(max-width:768px)]:[--rv-cpt:3rem] [@media(max-width:768px)]:[--rv-cpx:1.25rem] [@media(min-width:769px)_and_(max-width:992px)]:[--rv-cpb:2rem] [@media(min-width:769px)_and_(max-width:992px)]:[--rv-cpt:3rem] [@media(min-width:769px)_and_(max-width:992px)]:[--rv-cpx:1.5rem]',
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="cursor-grab touch-pan-y pt-[max(4rem,calc(2rem+var(--rv-av)*0.5))] pr-[clamp(0.85rem,2vw,1.6rem)] pb-4 pl-[clamp(0.85rem,2vw,1.6rem)] [@media(max-width:768px)]:mb-[2.6rem] [@media(max-width:768px)]:px-3 [@media(max-width:768px)]:pt-[max(3.2rem,calc(1.75rem+var(--rv-av)*0.5))]"
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
        <div className="[container-type:inline-size] [--rv-w:100cqw] min-[1024px]:[--rv-w:calc((100cqw-2*var(--rv-gap))/3)]">
          <ul
            ref={listRef}
            className={cn(
              'relative m-0 flex list-none p-0',
              animate &&
                'transition-transform duration-[600ms] ease-[ease] motion-reduce:transition-none',
            )}
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
                    className="flex w-(--rv-w) flex-none justify-center"
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
      <button type="button" className="sr-only" onClick={() => go(-1)}>
        {labels.prev}
      </button>
      <button type="button" className="sr-only" onClick={() => go(1)}>
        {labels.next}
      </button>
    </div>
  )
}

function ReviewCard({ review: r, active }: { review: Review; active: boolean }) {
  return (
    <article
      className={cn(
        'relative isolate flex w-full flex-col pt-(--rv-cpt) pr-(--rv-cpx) pb-(--rv-cpb) pl-(--rv-cpx) transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] motion-reduce:transition-none',
        !active && 'scale-[0.88]',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 z-0 overflow-hidden rounded-[24px] border transition-[box-shadow,border-color,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.3,1)]',
          'review-mark',
          active
            ? 'border-[rgba(47,43,38,0.08)] bg-[#B04A2A]'
            : 'bg-cream border-transparent opacity-[0.88] shadow-[0_24px_48px_rgba(47,43,38,0.05),0_4px_12px_rgba(47,43,38,0.02)]',
        )}
      />
      <div className="absolute top-0 left-1/2 z-10 size-(--rv-av) -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-[#F0EBE3] shadow-[0_8px_20px_rgba(47,43,38,0.07),0_2px_6px_rgba(47,43,38,0.04)] [@media(max-width:768px)]:border-[3px]">
        <Image
          src={r.image.src}
          alt={r.alt}
          width={r.image.width}
          height={r.image.height}
          unoptimized={r.image.unoptimized}
          sizes="90px"
          className="block size-full object-cover"
        />
      </div>
      <div className="relative z-[1] flex grow flex-col text-center">
        <h3
          className={cn(
            'm-0 mb-4 text-[clamp(1.1rem,1.4vw,1.35rem)] leading-[1.2] font-semibold tracking-[-0.02em] max-lg:text-[28px] max-lg:leading-[35px] [@media(max-width:768px)]:mb-3',
            active ? 'text-white' : 'text-ink',
          )}
        >
          {r.name}
        </h3>
        <p
          className={cn(
            'm-0 mb-[15.4px] grow text-[clamp(0.9rem,1.5vw,1rem)] leading-[1.62] [@media(max-width:768px)]:mb-[3.4px]',
            active ? 'text-[#fbfbfb]' : 'text-body',
          )}
        >
          {r.text}
        </p>
        <div className="flex flex-col items-center gap-2 border-t border-dashed border-[rgba(58,53,46,0.2)] pt-[31px] [@media(max-width:768px)]:pt-[28.6px]">
          <div className="text-base leading-6">
            <span
              className={cn('text-[13.6px] leading-[20.4px]', active ? 'text-white' : 'text-body')}
            >
              {r.role}
            </span>
          </div>
          <span
            className="relative inline-block text-[20px] leading-none tracking-[3px]"
            role="img"
            aria-label="5/5"
          >
            <span className="text-[rgba(78,67,61,0.22)]" aria-hidden>
              ★★★★★
            </span>
            <span
              className={cn(
                'absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap',
                active ? 'text-sage' : 'text-[#4E433D]',
              )}
              aria-hidden
            >
              ★★★★★
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}
