import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'

export type ServiceItem = {
  title: string
  text: string
  icon: IconName
  href: string
  /** Vignette révélée au survol (fond de carte v4). */
  image?: { src: string; width: number; height: number; unoptimized?: boolean }
}

type Props = { services: ServiceItem[]; cta: string }

// Grille des services : cartes blanches numérotées, pastille d'icône, lien « voir le programme » (widget « mt_service_grid », carte v4).
export function ServiceGrid({ services, cta }: Props) {
  return (
    <ul className="m-0 -mx-3 flex list-none flex-wrap p-0">
      {services.map((s, i) => (
        <li key={s.href} className="mb-[30px] w-full max-w-full px-3 md:w-1/2 lg:w-1/3">
          <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E3D9CC] bg-white px-7 py-8 text-left transition-[border-color] duration-[400ms] ease-[ease] hover:border-transparent">
            {s.image && (
              <Image
                src={s.image.src}
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw"
                unoptimized={s.image.unoptimized}
                className="-z-10 object-cover opacity-0 transition-opacity duration-[400ms] ease-[ease] group-hover:opacity-100"
              />
            )}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(47,43,38,0.55),rgba(143,59,32,0.9))] opacity-0 transition-opacity duration-[400ms] ease-[ease] group-hover:opacity-100"
            />
            <span className="text-cream mb-6 flex size-14 items-center justify-center rounded-full bg-[#B04A2A] transition-[background-color,color] duration-300 ease-[ease] group-hover:bg-[#E8A98E] group-hover:text-[#2F2B26]">
              <Icon name={s.icon} className="size-6" />
            </span>
            {/* Numéro purement décoratif : écrit en contenu de pseudo-élément pour ne pas compter comme texte. */}
            <span
              aria-hidden
              data-n={`${String(i + 1).padStart(2, '0')}.`}
              className="absolute top-8 right-7 text-[28px] leading-7 font-extrabold text-[#DDC5B9] transition-colors duration-[400ms] ease-[ease] group-hover:text-white before:content-[attr(data-n)]"
            />
            <h2 className="font-display m-0 mb-[10px] text-xl leading-[26px] font-bold tracking-[-0.02em] max-lg:text-[28px] max-lg:leading-[35px]">
              <Link
                href={s.href}
                className="text-[#3A352E] transition-colors duration-[400ms] ease-[ease] group-hover:text-white after:absolute after:inset-0 after:content-['']"
              >
                {s.title}
              </Link>
            </h2>
            <p className="m-0 mb-6 text-base leading-[26.4px] text-[#625C50] transition-colors duration-[400ms] ease-[ease] group-hover:text-white/75">
              {s.text}
            </p>
            <span className="mt-auto flex items-center gap-3 border-t border-black/[0.08] pt-5 text-[15px] leading-[22.5px] font-semibold text-[#3A352E] transition-[color,border-color] duration-[400ms] ease-[ease] group-hover:border-white/15 group-hover:text-white">
              {cta}
              <span
                aria-hidden
                className="text-cream flex size-8 rotate-[-45deg] items-center justify-center rounded-full bg-[#B04A2A] transition-[rotate,background-color] duration-[400ms] ease-[ease] group-hover:rotate-0 group-hover:bg-[#E8A98E]"
              >
                <ArrowIcon className="size-3" />
              </span>
            </span>
          </article>
        </li>
      ))}
    </ul>
  )
}
