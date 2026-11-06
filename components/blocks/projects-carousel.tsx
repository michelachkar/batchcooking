'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type Project = {
  image: { src: string; width: number; height: number; unoptimized?: boolean }
  alt: string
  type: string
  title: string
  href: string
}

type Props = {
  projects: Project[]
  labels: { prev: string; next: string; navigation: string }
  /** Titres à 24 px en mobile au lieu de 28 px (page FAQ). */
  smallTitleMobile?: boolean
}

// Carrousel « réalisations » : slide actif centré (le central au chargement), boucle infinie, compteur et flèches.
// Trois copies de la liste sont rendues pour que la boucle ne montre jamais de vide ; seule la copie centrale est interactive.
export function ProjectsCarousel({ projects, labels, smallTitleMobile }: Props) {
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
    <div className="overflow-x-clip [--pp-gap:16px] [--pp-w:min(72vw,288px)] min-[480px]:[--pp-w:min(68vw,320px)] min-[640px]:[--pp-gap:18px] min-[640px]:[--pp-w:clamp(280px,42vw,320px)] min-[1024px]:[--pp-gap:20px] min-[1024px]:[--pp-w:clamp(300px,30vw,440px)] min-[1400px]:[--pp-gap:22px] min-[1400px]:[--pp-w:clamp(320px,26vw,480px)]">
      <div className="px-[clamp(1.2rem,2.4vw,2.2rem)] pb-[clamp(1.2rem,2.4vw,2.2rem)] max-lg:px-4 max-lg:pb-4">
        <div
          className="relative cursor-grab touch-pan-y pt-5"
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
          <div className="relative z-[1]">
            <ul
              ref={listRef}
              className={cn(
                'relative m-0 flex list-none p-0',
                animate &&
                  'transition-transform duration-[640ms] ease-[ease] motion-reduce:transition-none',
              )}
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
                      key={`${copy}-${p.href}`}
                      inert={copy !== 1}
                      aria-hidden={copy !== 1 || undefined}
                      className={cn(
                        'relative w-(--pp-w) flex-none overflow-hidden',
                        isActive && 'z-[2]',
                      )}
                      style={{ marginRight: 'var(--pp-gap)' }}
                    >
                      <article
                        className={cn(
                          // Savrio : 520 ms cubic-bezier(.25,1,.5,1) sur échelle, opacité, ombre et filtre ; slides inactifs réduits et estompés.
                          'group relative min-h-[450px] overflow-hidden rounded-[clamp(1rem,1.3vw,1.2rem)] bg-[rgba(20,17,16,0.98)] [transition:scale_520ms_cubic-bezier(0.25,1,0.5,1),opacity_520ms_cubic-bezier(0.25,1,0.5,1),box-shadow_520ms_cubic-bezier(0.25,1,0.5,1),filter_520ms_cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none max-lg:min-h-[clamp(330px,78vw,460px)]',
                          isActive
                            ? 'shadow-[0_22px_44px_rgba(0,0,0,0.32),0_0_0_1px_rgba(232,169,142,0.42)]'
                            : 'motion-safe:scale-90 motion-safe:opacity-[0.68] motion-safe:[filter:saturate(0.88)_brightness(0.94)]',
                        )}
                      >
                        <Image
                          src={p.image.src}
                          alt={p.alt}
                          width={p.image.width}
                          height={p.image.height}
                          unoptimized={p.image.unoptimized}
                          sizes="(min-width: 1400px) 26vw, (min-width: 1024px) 30vw, 320px"
                          className="absolute inset-0 size-full max-w-none object-cover transition-[filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        />
                        <div className="absolute inset-x-0 bottom-0 z-[2] bg-[linear-gradient(180deg,rgba(47,43,38,0)_0%,rgba(47,43,38,0.68)_26%,rgba(47,43,38,0.92)_100%)] px-[30px] pt-3 pb-[30px]">
                          <p className="text-sage mb-0 inline-flex rounded-full border border-[rgba(232,169,142,0.35)] bg-[rgba(47,43,38,0.55)] px-[6.72px] py-[2.88px] text-[13px] leading-[17px] font-bold tracking-[0.17em] uppercase transition-[filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                            {p.type}
                          </p>
                          <h3
                            className={cn(
                              'text-cream mt-[4.8px] text-2xl leading-[1.4] font-medium tracking-[-0.02em] transition-[filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] max-lg:text-[28px] max-lg:leading-[35px]',
                              smallTitleMobile && 'max-md:text-2xl max-md:leading-[1.4]',
                            )}
                          >
                            {p.title}
                          </h3>
                        </div>
                        <Link
                          href={p.href}
                          aria-label={p.title}
                          className="focus-visible:outline-sage absolute inset-0 z-[3] rounded-[inherit] focus-visible:outline-2"
                        />
                      </article>
                    </li>
                  )
                }),
              )}
            </ul>
          </div>
        </div>
        <div
          className="mt-10 flex items-center justify-center gap-[8.8px] max-lg:mt-4 max-md:mt-[11.2px]"
          role="group"
          aria-label={labels.navigation}
        >
          <NavButton label={labels.prev} onClick={() => go(-1)} d="M15 18l-6-6 6-6" />
          <p
            className="text-body m-0 flex min-w-[3.25rem] items-baseline justify-center gap-[0.2rem] text-[0.9rem] leading-[1.5] font-semibold tracking-[0.04em] tabular-nums select-none"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-ink font-bold">{active + 1}</span>
            <span className="mx-[0.05rem] font-medium opacity-[0.42]" aria-hidden>
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
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="text-ink hover:text-cream focus-visible:text-cream inline-flex size-[2.8rem] cursor-pointer items-center justify-center rounded-full border border-[rgba(47,43,38,0.2)] bg-[rgba(47,43,38,0.04)] p-[1px_6px] transition-[translate,border-color,background-color,color] duration-[220ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-px hover:border-[rgba(47,43,38,0.45)] hover:bg-[linear-gradient(145deg,#2F2B26_0%,#3A352E_52%,#1B1816_100%)] focus-visible:-translate-y-px focus-visible:bg-[linear-gradient(145deg,#2F2B26_0%,#3A352E_52%,#1B1816_100%)] focus-visible:outline-none"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-4 -translate-y-[1.5px]"
      >
        <path d={d} />
      </svg>
    </button>
  )
}
