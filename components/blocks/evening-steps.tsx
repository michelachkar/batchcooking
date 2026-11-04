import Link from 'next/link'
import { SectionShell } from '@/components/blocks/section-shell'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'

type Props = {
  kicker: string
  title: string
  button: { label: string; href: string }
  steps: { icon: IconName; title: string; text: string }[]
}

// Section « comment ça marche » : fond vert, quatre étapes reliées par un filet (colonne unique et filet vertical en mobile).
export function EveningSteps({ kicker, title, button, steps }: Props) {
  return (
    <SectionShell name="steps" className="bg-[var(--skin-deep,#234A3A)]">
      <div className="[--es-accent:var(--color-sage)]">
        <header className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 max-md:mb-9">
          <div>
            <p className="text-sage mb-4 inline-flex items-center gap-3 text-xs leading-normal font-bold tracking-[0.16em] uppercase before:h-px before:w-[34px] before:bg-current before:content-['']">
              {kicker}
            </p>
            <h2 className="font-display text-cream text-[clamp(36px,3.7vw,58px)] leading-[1.06] font-semibold tracking-[-0.02em] max-lg:text-[45px] max-lg:leading-[56px]">
              {title}
            </h2>
          </div>
          <Link
            href={button.href}
            className="group rounded-pill bg-sage text-ink flex items-center gap-[10px] px-7 py-[17px] font-semibold [transition:background-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
          >
            {button.label}
            <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[5px]" />
          </Link>
        </header>
        <ol className="max-md:before:bg-sage relative m-0 grid list-none grid-cols-4 gap-8 p-0 before:absolute before:top-[37px] before:right-[38px] before:left-[38px] before:h-px before:bg-[linear-gradient(90deg,var(--color-sage)_0_55%,transparent)] before:content-[''] max-lg:grid-cols-2 max-lg:gap-x-8 max-lg:gap-y-10 max-lg:before:hidden max-md:grid-cols-1 max-md:gap-0 max-md:before:top-[38px] max-md:before:right-auto max-md:before:bottom-[38px] max-md:before:left-[37px] max-md:before:block max-md:before:h-auto max-md:before:w-px max-md:before:opacity-40">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative m-0 pr-3 max-md:grid max-md:grid-cols-[76px_minmax(0,1fr)] max-md:gap-x-[18px] max-md:p-0 max-md:pb-[30px]"
            >
              <span
                aria-hidden
                className="border-sage text-sage group-hover:bg-sage relative z-[1] inline-flex size-[76px] items-center justify-center rounded-full border bg-[var(--skin-dot,#234A3A)] text-[15px] leading-normal font-bold tracking-[0.06em] [transition:background-color_0.35s_ease,color_0.35s_ease,scale_0.45s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.35s_ease] group-hover:scale-110 group-hover:text-[color:var(--skin-deep,#234A3A)] group-hover:shadow-[0_0_0_8px_rgba(169,196,162,0.16)] max-md:row-span-2"
              >
                <Icon name={s.icon} className="size-8" />
                <em className="rounded-pill bg-sage group-hover:bg-cream group-hover:text-sage absolute -top-[6px] -right-2 inline-flex h-[30px] min-w-[30px] items-center justify-center px-[6px] text-[11px] leading-normal font-extrabold text-[color:var(--skin-deep,#234A3A)] not-italic">
                  {String(i + 1).padStart(2, '0')}
                </em>
              </span>
              <h3 className="font-display text-cream mt-[26px] mb-[10px] text-[25px] leading-[1.15] font-semibold tracking-[-0.02em] [transition:translate_0.4s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-1 max-lg:text-[28px] max-lg:leading-[35px] max-md:mt-[14px] max-md:mb-[6px] max-md:text-[23px] max-md:leading-[1.2]">
                {s.title}
              </h3>
              <p className="text-cream/78 m-0 text-[15px] leading-[1.65]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  )
}
