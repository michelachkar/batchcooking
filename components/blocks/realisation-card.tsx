import Image from 'next/image'

export type RealisationCardData = {
  title: string
  href: string
  excerpt: string
  service: string
  serviceLabel: string
  location?: string
  duration?: string
  guests?: string
  /** Filtres. */
  occasion?: string
  city?: string
  group?: 'small' | 'medium' | 'large'
  diets?: string[]
  /** Tags libres du projet. */
  tags?: string[]
  image: { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
}

// Vignette photo d'une réalisation : image pleine, 3 tags maximum (service en premier) et titre en surimpression (pas de lien).
export function RealisationCard({
  r,
  tags = r.tags ?? [],
}: {
  r: RealisationCardData
  tags?: string[]
}) {
  return (
    <li className="relative mb-6 block break-inside-avoid overflow-hidden rounded-[18px] bg-[#2F2B26]">
      <Image
        src={r.image.src}
        alt={r.image.alt}
        width={r.image.width}
        height={r.image.height}
        unoptimized={r.image.unoptimized}
        sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="h-auto w-full"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5">
        <ul className="flex flex-wrap gap-1.5">
          {[r.serviceLabel, ...tags].slice(0, 3).map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/40 bg-black/25 px-2.5 py-0.5 text-[11px] font-medium tracking-[0.05em] text-white uppercase backdrop-blur-sm"
            >
              {t}
            </li>
          ))}
        </ul>
        <h3 className="font-display text-[21px] leading-[1.2] font-semibold text-white">
          {r.title}
        </h3>
      </div>
    </li>
  )
}
