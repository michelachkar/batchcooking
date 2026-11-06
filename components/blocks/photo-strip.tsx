import Image from 'next/image'
import Link from 'next/link'
import { Icon, type IconName } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

export type StripPhoto = {
  src: string
  width: number
  height: number
  unoptimized?: boolean
  caption: string
  icon: IconName
}

type Props = {
  kicker: string
  title: string
  handle: { label: string; href: string }
  photos: StripPhoto[]
  galleryLabel: string
}

function Tile({ photo, hidden }: { photo: StripPhoto; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className={cn(
        'group relative h-(--ps-h) w-[calc(var(--ps-h)*0.82)] flex-none overflow-hidden rounded-[18px] bg-[#E3D9CC]',
        'even:mt-[34px] even:h-[calc(var(--ps-h)-34px)] max-md:even:mt-5 max-md:even:h-[calc(var(--ps-h)-20px)]',
        hidden && 'motion-reduce:hidden',
      )}
    >
      <Image
        src={photo.src}
        alt={hidden ? '' : photo.caption}
        width={photo.width}
        height={photo.height}
        unoptimized={photo.unoptimized}
        sizes="280px"
        className="absolute inset-0 block size-full max-w-none object-cover [transition:scale_0.9s_cubic-bezier(0.2,0.7,0.2,1),filter_0.5s_ease] group-hover:scale-[1.07]"
      />
      <span className="text-ink absolute right-[14px] bottom-[14px] left-[14px] inline-flex translate-y-[10px] items-center gap-2 rounded-xl bg-[rgba(251,250,247,0.94)] px-[14px] py-[10px] text-[14px] leading-[1.3] font-semibold opacity-0 [transition:opacity_0.4s_ease,translate_0.4s_cubic-bezier(0.2,0.7,0.2,1)] group-focus-within/strip:translate-y-0 group-focus-within/strip:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        <Icon name={photo.icon} className="text-forest-mid size-[18px] flex-none" />
        {photo.caption}
      </span>
    </li>
  )
}

// Bande photo « From our table » : titre + compte, puis défilement lent des photos (CSS seul, en pause au survol).
// Sans animation (préférence système), la bande devient un défilement horizontal manuel sans doublons.
export function PhotoStrip({ kicker, title, handle, photos, galleryLabel }: Props) {
  return (
    <section
      data-section="photos"
      className="pt-[68px] pb-[64px] leading-normal max-lg:pt-14 max-lg:pb-0 max-md:pt-10"
    >
      <div className="[--ps-h:340px]">
        <header className="mx-auto mb-9 flex max-w-[1290px] flex-wrap items-end justify-between gap-x-8 gap-y-[18px] px-[15px]">
          <div>
            <p className="text-forest-mid mb-[15px] inline-flex items-center gap-3 text-[13px] font-bold tracking-[0.16em] uppercase before:h-px before:w-[34px] before:bg-current before:content-['']">
              {kicker}
            </p>
            <h2 className="font-display text-ink text-[clamp(34px,3.4vw,52px)] leading-[1.08] font-semibold tracking-[-0.02em] max-lg:text-[45px] max-lg:leading-[56px]">
              {title}
            </h2>
          </div>
          <Link
            href={handle.href}
            className="text-ink hover:border-forest-mid hover:text-forest-mid rounded-pill inline-flex items-center gap-[10px] border border-[#E3D9CC] bg-white px-5 py-3 text-[16px] leading-normal font-semibold [transition:border-color_0.3s_ease,color_0.3s_ease,translate_0.3s_ease] hover:-translate-y-0.5"
          >
            <Icon name="instagram" className="size-5" />
            {handle.label}
          </Link>
        </header>
        <div
          tabIndex={0}
          aria-label={galleryLabel}
          className="group/strip overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,#000_6%,#000_94%,transparent_100%)] motion-reduce:overflow-x-auto"
        >
          <ul className="m-0 flex w-max list-none gap-4 p-0 group-focus-within/strip:[animation-play-state:paused] group-hover/strip:[animation-play-state:paused] motion-safe:animate-[ps-scroll_60s_linear_infinite]">
            {photos.map((p) => (
              <Tile key={p.src} photo={p} />
            ))}
            {photos.map((p) => (
              <Tile key={'d' + p.src} photo={p} hidden />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
