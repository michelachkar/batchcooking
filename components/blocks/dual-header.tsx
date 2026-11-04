import { DhObserve } from '@/components/blocks/dh-observe'
import { cn } from '@/lib/utils'

type Props = {
  /** Étiquette au-dessus du titre. */
  kicker: string
  /** Début du titre ; le mot mis en avant est affiché en gras à la suite. */
  title: string
  highlight: string
  description?: string
  /** Variante à étiquette 14 px et texte 16 px (section « occasions »). */
  size?: 'default' | 'compact'
  /** Alignement du bloc (centré par défaut ; à gauche sur la page contact). */
  align?: 'center' | 'left'
  /** Entrée : rideau « ltr » (défaut du widget) ou « up » (fade-up 150 ms, réglage de « derniers articles »). */
  animation?: 'ltr' | 'up'
  className?: string
}

// Titre de section « mot normal + mot mis en avant » avec pastille d'étiquette (widget « dual-header »).
export function DualHeader({
  kicker,
  title,
  highlight,
  description,
  size = 'default',
  align = 'center',
  animation = 'ltr',
  className,
}: Props) {
  const compact = size === 'compact'
  return (
    <div
      data-dh={animation}
      className={cn(align === 'left' ? 'text-left' : 'text-center', className)}
    >
      <DhObserve />
      <p
        data-dh-t="kicker"
        className={cn(
          compact ? 'text-sm' : 'text-xs',
          "before:bg-forest-dark mb-2 inline-flex items-center gap-2 rounded-[50px] bg-white px-5 py-[10px] leading-none font-semibold tracking-[2px] text-[#393939] uppercase shadow-[0_2px_12px_rgba(38,44,41,0.07)] before:mr-[5px] before:size-[7px] before:rounded-full before:content-['']",
        )}
      >
        {kicker}
      </p>
      <h2
        data-dh-t="title"
        className="font-display m-0 text-[52px] leading-[1.2] font-medium tracking-[-0.02em] text-black max-lg:text-[45px] max-lg:leading-[56px]"
      >
        {title} <span className="inline-block font-extrabold">{highlight}</span>
      </h2>
      {description && (
        <p
          className={cn(
            compact ? 'text-base' : 'text-[17px]',
            'text-body mt-[14px] max-w-[min(700px,100%)] leading-[1.6]',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
