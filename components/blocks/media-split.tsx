import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

type Img = {
  src: string
  width: number
  height: number
  unoptimized?: boolean
  position?: string
}

export type MediaSplitProps = {
  name: string
  tone?: 'dark' | 'light'
  imageSide?: 'left' | 'right'
  /** Largeur de la colonne image (défaut 46 %). */
  imageWidth?: number
  image: Img & { alt: string }
  inset?: Img & { alt: string }
  caption?: string
  badge?: { icon?: IconName; value: string; text: string }
  kicker?: string
  title: string
  subtitle?: string
  paragraphs?: string[]
  stats?: { icon?: IconName; value: string; label: string }[]
  quote?: { text: string; author?: string }
  listTitle?: string
  listStyle?: 'line' | 'check'
  items?: (string | { icon: IconName; text: string })[]
  columns?: 1 | 2
  extras?: { title: string; items: { icon: IconName; label: string; value: string }[] }
  note?: string
  linkStyle?: 'underline' | 'button'
  link?: { label: string; href: string }
}

// Widget « media-split » : photo (avec photo incrustée, pastille, légende) + récit (chiffres, citation, liste).
// Les variables --ms-* reprennent celles du widget ; le ton sombre est celui de la section « présentation du chef ».
const tones = {
  dark: '[--ms-title:#F0EBE3] [--ms-accent:#E8A98E] [--ms-text:rgba(244,243,239,0.76)] [--ms-line:rgba(244,243,239,0.16)] [--ms-stat-bg:rgba(255,255,255,0.05)] [--ms-inset-border:#413833]',
  light:
    '[--ms-title:#555044] [--ms-accent:#B04A2A] [--ms-text:#625C50] [--ms-line:#E3D9CC] [--ms-stat-bg:rgba(255,255,255,0.04)] [--ms-inset-border:#FFFFFF]',
}

function Photo({
  img,
  className,
  sizes,
}: {
  img: Img & { alt: string }
  className?: string
  sizes: string
}) {
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      unoptimized={img.unoptimized}
      sizes={sizes}
      className={className}
      style={img.position ? { objectPosition: img.position } : undefined}
    />
  )
}

export function MediaSplit(p: MediaSplitProps) {
  const right = p.imageSide === 'right'
  const w = p.imageWidth ?? 46
  const inset = Boolean(p.inset)
  return (
    <div
      className={cn(
        'mtfe-ms relative grid grid-cols-[var(--ms-cols)] items-center gap-[clamp(40px,6vw,96px)] leading-normal max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-10',
        tones[p.tone ?? 'light'],
      )}
      style={{
        ['--ms-cols' as string]: right ? `minmax(0,1fr) ${w}%` : `${w}% minmax(0,1fr)`,
        ['--ms-img-w' as string]: `${w}%`,
      }}
    >
      <figure
        className={cn(
          'group/media relative mx-0 mt-0 mb-[30px] aspect-[4/5] overflow-hidden rounded-[18px] bg-[#E3D9CC] max-lg:max-w-[560px]',
          right && 'order-2 max-lg:order-none',
        )}
      >
        <Photo
          img={p.image}
          sizes="(min-width: 1025px) 44vw, 100vw"
          className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/media:scale-105"
        />
        {p.caption && (
          <figcaption
            className={cn(
              'rounded-pill text-ink absolute bottom-5 left-5 bg-[rgba(244,243,239,0.94)] px-[14px] py-[9px] text-[14px] leading-[1.3] font-semibold transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover/media:-translate-y-[5px]',
              inset && 'max-lg:hidden',
            )}
          >
            {p.caption}
          </figcaption>
        )}
        {p.badge && (
          <span className="text-ink absolute top-5 right-5 z-[2] inline-flex items-center gap-3 rounded-2xl bg-[rgba(251,250,247,0.96)] py-3 pr-[18px] pl-3 shadow-[0_16px_34px_rgba(47,43,38,0.2)] motion-safe:animate-[float_5s_ease-in-out_infinite] max-md:top-3 max-md:right-3">
            {p.badge.icon && (
              <span className="inline-flex size-[42px] items-center justify-center rounded-xl bg-[#B04A2A] text-[#F0C8B8]">
                <Icon name={p.badge.icon} className="size-[22px]" />
              </span>
            )}
            <span>
              <strong className="block text-[19px] leading-[1.1] font-extrabold">
                {p.badge.value}
              </strong>
              <small className="text-body block text-[13px] leading-[1.3]">{p.badge.text}</small>
            </span>
          </span>
        )}
      </figure>
      {p.inset && (
        <span
          className={cn(
            'absolute bottom-0 z-[2] aspect-square w-[230px] overflow-hidden rounded-[18px] border-[6px] border-[color:var(--ms-inset-border)] shadow-[0_24px_50px_rgba(47,43,38,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.04] hover:-rotate-3',
            'max-lg:relative max-lg:mt-[-120px] max-lg:mr-3 max-lg:mb-0 max-lg:ml-auto max-lg:w-[46%] max-lg:max-w-[260px] lg:[right:var(--ms-inset-r)] lg:[left:var(--ms-inset-l)]',
          )}
          style={{
            ['--ms-inset-l' as string]: right ? 'auto' : `calc(${w}% - 230px)`,
            ['--ms-inset-r' as string]: right ? `calc(${w}% - 230px)` : 'auto',
          }}
        >
          <Photo img={p.inset} sizes="230px" className="block size-full object-cover" />
        </span>
      )}
      <div className="min-w-0">
        {p.kicker && (
          <p className="mb-[19px] inline-flex items-center gap-3 text-[13px] font-bold tracking-[0.16em] text-[color:var(--ms-accent)] uppercase before:h-px before:w-[34px] before:bg-current before:content-['']">
            {p.kicker}
          </p>
        )}
        <h2 className="font-display text-[clamp(36px,3.7vw,58px)] leading-[1.06] font-semibold tracking-[-0.02em] text-[color:var(--ms-title)] max-lg:text-[45px] max-lg:leading-[56px]">
          {p.title}
        </h2>
        {p.subtitle && (
          <p className="font-display mt-[10px] text-[21px] tracking-[-0.02em] text-[color:var(--ms-accent)] italic">
            {p.subtitle}
          </p>
        )}
        {p.paragraphs?.map((t, i) => (
          <p
            key={i}
            className={cn(
              'max-w-[36rem] text-[17px] leading-[1.7] text-[color:var(--ms-text)] max-md:text-base',
              i === 0 ? 'mt-5' : 'mt-[14px]',
            )}
          >
            {t}
          </p>
        ))}
        {p.stats && (
          <div className="mt-[30px] grid grid-cols-3 gap-3 max-md:gap-2">
            {p.stats.map((s) => (
              <div
                key={s.value}
                className="flex flex-col gap-1 rounded-2xl border border-[color:var(--ms-line)] bg-[color:var(--ms-stat-bg)] px-4 py-[18px] transition-[translate,border-color] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1 hover:border-[color:var(--ms-accent)] max-md:px-[10px] max-md:py-[14px]"
              >
                {s.icon && (
                  <span className="mb-[6px] text-[color:var(--ms-accent)] [&_svg]:inline">
                    <Icon name={s.icon} className="size-[26px]" />
                  </span>
                )}
                <strong className="font-display text-[30px] leading-none font-semibold tracking-[-0.02em] text-[color:var(--ms-title)] max-md:text-2xl">
                  {s.value}
                </strong>
                <span className="text-[14px] leading-[1.35] text-[color:var(--ms-text)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}
        {p.quote && (
          <blockquote className="relative mt-7 rounded-r-[14px] border-0 border-l-[3px] border-[color:var(--ms-accent)] bg-[color:var(--ms-stat-bg)] py-[22px] pr-6 pl-16">
            <Icon
              name="quote"
              className="absolute top-[22px] left-5 size-7 text-[color:var(--ms-accent)]"
            />
            <p className="font-display text-[21px] leading-[1.4] tracking-[-0.02em] text-[color:var(--ms-title)] italic max-md:text-lg">
              {p.quote.text}
            </p>
            {p.quote.author && (
              <cite className="mt-2 block text-[14px] font-semibold text-[color:var(--ms-text)] not-italic">
                {p.quote.author}
              </cite>
            )}
          </blockquote>
        )}
        {p.items && (
          <>
            {p.listTitle && <ListTitle>{p.listTitle}</ListTitle>}
            <ul
              className={cn(
                'm-0 grid list-none p-0',
                p.listStyle === 'line' ? 'gap-0' : 'gap-3',
                p.columns === 2 && 'grid-cols-2 gap-x-7 gap-y-3 max-md:grid-cols-1',
              )}
            >
              {p.items.map((it) => {
                const text = typeof it === 'string' ? it : it.text
                const icon = typeof it === 'string' ? undefined : it.icon
                return (
                  <li
                    key={text}
                    className={cn(
                      'group flex gap-3 text-base leading-[1.5] text-[color:var(--ms-title)] transition-[translate] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:translate-x-1.5',
                      icon ? 'items-center' : 'items-start',
                      p.listStyle === 'line' &&
                        'border-t border-[color:var(--ms-line)] py-[14px] last:border-b hover:text-[color:var(--ms-accent)]',
                    )}
                  >
                    {icon ? (
                      <Icon
                        name={icon}
                        className="size-[34px] flex-none rounded-[10px] bg-[#EEE2DC] p-[7px] text-[color:var(--ms-accent)] [transition:background-color_0.3s_ease,color_0.3s_ease,rotate_0.4s_cubic-bezier(0.2,0.7,0.2,1),scale_0.4s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:-rotate-[8deg] group-hover:bg-[color:var(--ms-accent)] group-hover:text-white"
                      />
                    ) : (
                      p.listStyle !== 'line' && (
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden
                          className="size-6 flex-none rounded-full bg-[#EEE2DC] p-1 text-[color:var(--ms-accent)] [transition:background-color_0.3s_ease,color_0.3s_ease,rotate_0.4s_cubic-bezier(0.2,0.7,0.2,1),scale_0.4s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.08] group-hover:-rotate-[8deg] group-hover:bg-[color:var(--ms-accent)] group-hover:text-white"
                        >
                          <path
                            d="M5 12.5l4.2 4.2L19 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )
                    )}
                    <span>{text}</span>
                  </li>
                )
              })}
            </ul>
          </>
        )}
        {p.extras && (
          <div className="mt-[6px]">
            <ListTitle>{p.extras.title}</ListTitle>
            <dl className="m-0 border-t border-[color:var(--ms-line)]">
              {p.extras.items.map((x) => (
                <div
                  key={x.label}
                  className="hover:bg-sage/15 flex justify-between gap-5 border-b border-[color:var(--ms-line)] py-3 text-[16px] transition-[background-color,padding] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:px-[10px]"
                >
                  <dt className="inline-flex items-center gap-[10px] font-medium text-[color:var(--ms-title)]">
                    <Icon name={x.icon} className="size-5 text-[color:var(--ms-accent)]" />
                    {x.label}
                  </dt>
                  <dd className="m-0 text-right whitespace-nowrap text-[color:var(--ms-text)]">
                    {x.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {p.note && (
          <p className="mt-4 text-[14px] leading-[1.55] text-[color:var(--ms-text)]">{p.note}</p>
        )}
        {p.link && (
          <Link
            href={p.link.href}
            className={cn(
              'group mt-[34px] inline-flex items-center gap-[10px] text-base font-semibold',
              p.linkStyle === 'button'
                ? 'rounded-pill bg-[#B04A2A] px-7 py-[17px] text-[#FAF7F2] [transition:background-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 hover:bg-[#8F3B20] hover:shadow-[0_12px_24px_rgba(176,74,42,0.3)]'
                : 'border-b border-[color:var(--ms-accent)] pb-1 text-[color:var(--ms-title)] transition-colors hover:text-[color:var(--ms-accent)]',
            )}
          >
            {p.link.label}
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  )
}

function ListTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-[34px] mb-[14px] text-[13px] leading-[1.2] font-bold tracking-[0.14em] text-[color:var(--ms-title)] uppercase max-lg:text-[28px] max-lg:leading-[35px] max-md:text-[13px] max-md:leading-[1.3]">
      {children}
    </h3>
  )
}
