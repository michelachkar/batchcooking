import Image from 'next/image'
import { cn } from '@/lib/utils'

export type Logo = {
  src: string
  width: number
  height: number
  unoptimized?: boolean
  alt: string
}

type Props = {
  logos: Logo[]
  /** Hauteur d'affichage des logos, en px. */
  height?: number
  grayscale?: boolean
  className?: string
}

// Bandeau de logos partenaires en défilement continu (CSS seul, en pause au survol). À n'afficher qu'avec de vrais partenaires.
// Chaque moitié de la piste répète la liste jusqu'à dépasser la largeur d'écran ; la piste glisse de 50 % en boucle.
export function ClientCarousel({ logos, height = 54, grayscale = false, className }: Props) {
  if (logos.length === 0) return null
  const reps = Math.max(1, Math.ceil(1920 / (logos.length * 256)))
  // Savrio : 30 s pour parcourir un jeu de logos ; la piste en répète `reps`, d'où la durée proportionnelle.
  const half = Array.from({ length: reps }, () => logos).flat()
  return (
    <div className={cn('group/cc relative overflow-hidden', className)}>
      <div
        style={{ animationDuration: `${30 * reps}s` }}
        className="flex w-max items-center group-hover/cc:[animation-play-state:paused] motion-safe:animate-[cc-scroll_30s_linear_infinite]"
      >
        {[0, 1].flatMap((copy) =>
          half.map((l, i) => (
            <div
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 || i >= logos.length || undefined}
              className={cn(
                'group/item flex items-center justify-center px-12',
                copy === 1 && 'motion-reduce:hidden',
              )}
            >
              <Image
                src={l.src}
                alt={copy === 1 || i >= logos.length ? '' : l.alt}
                width={l.width}
                height={l.height}
                unoptimized={l.unoptimized}
                style={{ height }}
                className={cn(
                  'block w-auto max-w-[160px] object-contain opacity-60 transition-[opacity,filter] duration-300 ease-[ease] group-hover/item:opacity-100',
                  grayscale && 'grayscale group-hover/item:filter-none',
                )}
              />
            </div>
          )),
        )}
      </div>
    </div>
  )
}
