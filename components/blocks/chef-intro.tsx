import { MediaSplit, type MediaSplitProps } from '@/components/blocks/media-split'

// Section « présentation de la cheffe ou du chef » : fond dégradé sombre, media-split ton sombre.
export function ChefIntro(props: Omit<MediaSplitProps, 'name' | 'tone'>) {
  return (
    <section data-section="chef" className="bg-cream max-lg:pt-[18px] max-md:pt-3">
      <div className="bg-[linear-gradient(135deg,#1B1F1D_0%,#21352B_100%)] px-10 max-lg:px-[26px] max-md:px-4">
        <div className="max-w-site mx-auto py-[100px] max-lg:py-[72px] max-md:py-14">
          <MediaSplit {...props} name="chef" tone="dark" imageWidth={44} />
        </div>
      </div>
    </section>
  )
}
