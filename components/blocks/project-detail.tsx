import { Calendar, ExternalLink, FolderOpen, MapPin, User } from 'lucide-react'
import Image from 'next/image'
import { CptAnim } from '@/components/blocks/cpt-anim'

type Img = { src: string; width: number; height: number; alt: string; unoptimized?: boolean }

type Props = {
  /** Corps MDX déjà rendu. */
  children: React.ReactNode
  image: Img
  gallery: Img[]
  galleryTitle: string
  detailsTitle: string
  details: {
    key: 'client' | 'date' | 'location' | 'url' | 'category'
    label: string
    value: string
    href?: string
  }[]
}

const icons = {
  client: User,
  date: Calendar,
  location: MapPin,
  url: ExternalLink,
  category: FolderOpen,
}

// Page d'une réalisation : photo, texte, galerie ; colonne latérale « détails du projet ».
export function ProjectDetail({
  children,
  image,
  gallery,
  galleryTitle,
  detailsTitle,
  details,
}: Props) {
  return (
    <div className="py-[110px] leading-normal max-md:py-[70px]">
      <CptAnim />
      <div className="container-x">
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 md:w-2/3">
            <div
              data-cm-section="fade-in"
              data-cm-dist="0"
              className="bg-cream mb-7 overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                unoptimized={image.unoptimized}
                priority
                sizes="(min-width: 1025px) 883px, 100vw"
                className="block h-auto w-full max-w-none"
              />
            </div>
            <div
              data-cm-section="fade-up"
              className="mb-10 leading-7 [&_p]:mt-0 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-8"
            >
              {children}
            </div>
            {gallery.length > 0 && (
              <div
                data-cm-section="fade-up"
                data-cm-children
                data-cm-stagger="0.08"
                className="mt-10"
              >
                <h3 className="font-display m-0 mb-5 text-[22px] leading-[26.4px] font-bold tracking-[-0.02em] max-lg:mb-7">
                  {galleryTitle}
                </h3>
                <ul className="m-0 grid list-none grid-cols-3 gap-3 p-0 max-md:grid-cols-1">
                  {gallery.map((g) => (
                    <li
                      key={g.src}
                      data-cm-child
                      className="group aspect-[4/3] overflow-hidden rounded-lg"
                    >
                      <Image
                        src={g.src}
                        alt={g.alt}
                        width={g.width}
                        height={g.height}
                        unoptimized={g.unoptimized}
                        sizes="(min-width: 1025px) 286px, 50vw"
                        className="size-full max-w-none object-cover transition-[scale] duration-300 ease-[ease] group-hover:scale-105"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="w-full px-3 md:w-1/3">
            <aside className="sticky top-[30px] max-lg:mt-[30px]">
              <div
                data-cm-section="fade-left"
                data-cm-children
                data-cm-stagger="0.08"
                className="rounded-xl border border-[rgba(27,31,29,0.12)] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"
              >
                <h3 className="font-display m-0 mb-5 pb-[18px] text-[23px] leading-[27.6px] font-bold tracking-[-0.02em] max-lg:text-[28px] max-lg:leading-[35px]">
                  {detailsTitle}
                </h3>
                {details.map(({ key, label, value, href }, i) => {
                  const Icon = icons[key]
                  return (
                    <div
                      key={key}
                      data-cm-child
                      className={`flex items-start gap-[14px] pt-[14px] ${i < details.length - 1 ? 'pb-[15px]' : ''}`}
                    >
                      <span className="bg-cream flex size-9 shrink-0 items-center justify-center rounded-lg">
                        <Icon className="size-[14px]" aria-hidden />
                      </span>
                      <div className="min-w-0 grow">
                        <span className="mb-[2px] block text-[15px] leading-[22.5px] font-semibold tracking-[0.5px] text-[rgba(27,31,29,0.62)] uppercase">
                          {label}
                        </span>
                        {href ? (
                          <a
                            href={href}
                            data-vr-mask
                            className="block text-sm leading-[21px] font-medium break-all text-[#234a3a] hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          <span
                            data-vr-mask={key === 'date' ? '' : undefined}
                            className="block text-sm leading-[21px] font-medium"
                          >
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
