import { MediaSplit, type MediaSplitProps } from '@/components/blocks/media-split'

// Section « ce qui est inclus » : fond blanc, photo à droite avec photo incrustée, liste à icônes et options.
export function Included({
  flush,
  ...props
}: Omit<MediaSplitProps, 'name' | 'tone' | 'imageSide'> & {
  /** Collé aux sections voisines : pas de bande crème au-dessus. */
  flush?: boolean
}) {
  return (
    <section
      data-section="included"
      className={flush ? 'bg-white' : 'bg-cream pt-[22px] max-lg:pt-[18px] max-md:pt-3'}
    >
      <div className="bg-white px-10 max-lg:px-[26px] max-md:px-4">
        <div className="max-w-site mx-auto py-[68px] max-lg:py-14 max-md:py-10">
          <MediaSplit {...props} name="included" tone="light" imageSide="right" imageWidth={44} />
        </div>
      </div>
    </section>
  )
}
