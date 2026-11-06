import Image from 'next/image'
import Link from 'next/link'
import { DualHeader } from '@/components/blocks/dual-header'
import { cn } from '@/lib/utils'

type Img = { src: string; width: number; height: number; unoptimized?: boolean }
export type TeamMember = {
  name: string
  role: string
  /** Portrait détouré (PNG/WebP transparent) : il dépasse de la forme sombre. */
  image: Img
  alt: string
  href: string
  social?: { label: string; href: string; type: 'linkedin' | 'mail' }[]
}

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  /** Mot décoratif, très pâle, écrit à la verticale dans la forme sombre. */
  vertical: string
  members: TeamMember[]
  profileLabel: (name: string) => string
  /** Hauteur de l'espace au-dessus du titre (85 px par défaut, 95 px sur la page équipe). */
  spacer?: number
  /** Hauteur de l'espace sous la grille (15 px par défaut, aucun sur la page équipe). */
  tail?: number
  /** Marge haute de la grille en tablette (60 px par défaut, 50 px sur la page À propos). */
  tabletTop?: number
  /** false : pas de titre, la grille remonte sur l'espace du haut (page équipe). */
  header?: boolean
}

// Cartes d'équipe : forme sombre, portrait détouré qui dépasse, nom et fonction ; réseaux au survol (widget « savrio-our-team »).
// La grille remonte de 83 px sous le titre pour que les têtes chevauchent le texte d'introduction.
export function Team({
  kicker,
  title,
  highlight,
  description,
  vertical,
  members,
  profileLabel,
  spacer = 85,
  tail = 15,
  tabletTop = 60,
  header = true,
}: Props) {
  return (
    <section data-section="team" className="leading-normal">
      <div className="mx-auto flex max-w-[1350px] flex-col gap-5 py-[10px]">
        <div
          style={{ height: spacer }}
          className={header ? undefined : 'max-lg:!h-24'}
          aria-hidden
        />
        {header && (
          <DualHeader
            size="compact"
            kicker={kicker}
            title={title}
            highlight={highlight}
            description={description}
            className="max-md:px-[10px]"
          />
        )}
        <div
          style={{ '--tt': `${tabletTop}px` } as React.CSSProperties}
          className={
            header
              ? 'max-lg:px-5 max-md:px-[10px] max-md:pt-[60px] md:max-lg:pt-(--tt)'
              : 'max-lg:px-[15px] max-md:px-[10px]'
          }
        >
          <TeamGrid
            members={members}
            vertical={vertical}
            profileLabel={profileLabel}
            className="-mt-[83px]"
          />
        </div>
        {tail > 0 && <div style={{ height: tail }} aria-hidden />}
      </div>
    </section>
  )
}

// Grille de cartes membres (partagée avec « Autres membres » des fiches).
export function TeamGrid({
  members,
  vertical,
  profileLabel,
  className,
  tall,
  animate,
}: {
  members: TeamMember[]
  vertical: string
  profileLabel: (name: string) => string
  className?: string
  /** Cartes de 620 px au lieu de 605 px (bloc « autres membres »). */
  tall?: boolean
  /** Révélation en cascade au défilement (script des pages CPT) : « autres membres » des fiches. */
  animate?: boolean
}) {
  return (
    <ul
      data-cm-grid={animate ? '' : undefined}
      className={cn(
        'grid list-none grid-cols-4 gap-7 p-0 max-lg:grid-cols-2 max-lg:gap-5 max-md:grid-cols-1',
        className,
      )}
    >
      {members.map((m) => (
        <li key={m.name} className="contents">
          <article
            data-cm-item={animate ? '' : undefined}
            className={cn(
              'group relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-[4rem_1rem_1rem_1rem] max-lg:h-[390px]',
              tall ? 'h-[620px]' : 'h-[605px]',
            )}
          >
            <Link
              href={m.href}
              aria-label={profileLabel(m.name)}
              className="focus-visible:outline-sage absolute inset-0 z-40 rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-2"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-0 z-[1] h-4/5 w-full overflow-hidden rounded-[4rem_0.75rem_0.75rem_0.75rem] bg-[#2F2B26] transition-[background-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:bg-[#3A352E] group-focus-within:shadow-[0_25px_50px_-12px_rgba(47,43,38,0.4)] group-hover:bg-[#3A352E] group-hover:shadow-[0_25px_50px_-12px_rgba(47,43,38,0.4)]"
            >
              <span className="text-cream pointer-events-none absolute top-8 left-2 origin-top-left [transform:rotate(-90deg)_translateX(-100%)] text-[5rem] leading-[1.5] font-black tracking-[0.15em] whitespace-nowrap uppercase opacity-20 transition-opacity duration-500 ease-[ease] group-focus-within:opacity-40 group-hover:opacity-40">
                {vertical}
              </span>
            </div>
            <Image
              src={m.image.src}
              alt={m.alt}
              width={m.image.width}
              height={m.image.height}
              unoptimized={m.image.unoptimized}
              sizes="(min-width: 1024px) 285px, 320px"
              className="absolute bottom-0 left-1/2 z-10 h-[95%] w-[90%] max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_top,transparent_0%,black_50%)] object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:-translate-y-[10px] group-focus-within:scale-[1.04] group-hover:-translate-y-[10px] group-hover:scale-[1.04]"
            />
            <div className="relative z-20 rounded-b-xl bg-[linear-gradient(to_top,#2F2B26_10%,rgba(47,43,38,0.8)_50%,transparent_100%)] p-6 pt-20">
              <h3 className="text-cream m-0 mb-1 text-[clamp(1.1rem,1.4vw,1.35rem)] leading-[1.2] font-semibold tracking-[0.02em] max-lg:text-[28px] max-lg:leading-[35px]">
                {m.name}
              </h3>
              <p className="text-sage m-0 text-[0.85rem] leading-[1.5] font-semibold tracking-[0.1em] uppercase opacity-90">
                {m.role}
              </p>
            </div>
            {m.social && m.social.length > 0 && (
              <div className="pointer-events-none absolute bottom-0 left-0 z-30 flex h-4/5 w-full items-end justify-center gap-4 rounded-[4rem_0.75rem_0.75rem_0.75rem] bg-[rgba(47,43,38,0.55)] pb-9 opacity-0 backdrop-blur-[6px] transition-opacity duration-[400ms] ease-[ease] group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                {m.social.map((s, i) => (
                  <a
                    key={s.type}
                    href={s.href}
                    aria-label={s.label}
                    className={cn(
                      // Savrio : entrée 400 ms (rebond) décalée de 100/150 ms au survol de la carte ; couleurs 250 ms ease ; survol de la pastille x1,1.
                      'hover:border-sage group/s relative z-50 flex size-14 translate-y-10 items-center justify-center rounded-full border border-[rgba(244,243,239,0.2)] bg-[rgba(244,243,239,0.1)] text-white opacity-0 [transition:translate_400ms_cubic-bezier(0.175,0.885,0.32,1.275),scale_400ms_cubic-bezier(0.175,0.885,0.32,1.275),opacity_400ms_cubic-bezier(0.175,0.885,0.32,1.275),background-color_250ms_ease,border-color_250ms_ease,box-shadow_250ms_ease,color_250ms_ease] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 hover:bg-[#B04A2A] hover:text-[#2F2B26]',
                      i === 0
                        ? 'group-focus-within:delay-100 group-hover:delay-100'
                        : 'group-focus-within:delay-150 group-hover:delay-150',
                    )}
                  >
                    <SocialIcon type={s.type} />
                  </a>
                ))}
              </div>
            )}
          </article>
        </li>
      ))}
    </ul>
  )
}

function SocialIcon({ type }: { type: 'linkedin' | 'mail' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6 shrink-0">
      {type === 'linkedin' ? (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.222 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      ) : (
        <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.6 7H4v.4l8 5.6 8-5.6V7h-.6L12 12.2z" />
      )}
    </svg>
  )
}
