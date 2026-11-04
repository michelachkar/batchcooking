import Image from 'next/image'

type Props = { photos: { src: string; width: number; height: number; unoptimized?: boolean }[] }

// Pile de petits portraits qui se chevauchent (widget « stacked-photos »), décoratifs : le texte voisin porte l'information.
export function StackedPhotos({ photos }: Props) {
  return (
    <div className="inline-flex">
      {photos.map((p) => (
        <Image
          key={p.src}
          src={p.src}
          alt=""
          width={p.width}
          height={p.height}
          unoptimized={p.unoptimized}
          sizes="30px"
          className="block size-[30px] flex-none rounded-[31%] border-2 border-white object-cover not-first:-ml-[16.33px]"
        />
      ))}
    </div>
  )
}
