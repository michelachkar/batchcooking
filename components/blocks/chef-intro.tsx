import { MediaSplit, type MediaSplitProps } from '@/components/blocks/media-split'

// Section « présentation de la cheffe ou du chef » : fond blanc, media-split ton clair.
export function ChefIntro(props: Omit<MediaSplitProps, 'name' | 'tone'>) {
  return (
    <section data-section="chef" className="bg-cream max-lg:pt-[18px] max-md:pt-3">
      <div className="bg-white px-10 max-lg:px-[26px] max-md:px-4">
        <div className="max-w-site mx-auto py-[68px] max-lg:py-14 max-md:py-10">
          <MediaSplit {...props} name="chef" tone="light" imageWidth={44} />
        </div>
      </div>
    </section>
  )
}
