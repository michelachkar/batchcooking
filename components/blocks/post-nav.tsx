import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CptAnim } from '@/components/blocks/cpt-anim'

type Item = { label: string; title: string; href: string }

const arrow =
  'flex size-[52px] max-md:size-11 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#262c29] [transition:all_0.35s_cubic-bezier(0.4,0,0.2,1)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] group-hover:border-[#262c29] group-hover:bg-[#262c29] group-hover:text-white group-focus-visible:border-[#262c29] group-focus-visible:bg-[#262c29] group-focus-visible:text-white'
const link =
  'group flex grow items-center gap-5 rounded-2xl border border-transparent bg-[#f4f3ef] px-7 py-6 text-[#234a3a] [transition:all_0.35s_cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:border-[#e5e7eb] hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-visible:border-[#e5e7eb] focus-visible:shadow-[0_8px_30px_rgba(0,0,0,0.08)] max-md:px-5 max-md:py-[18px]'

// Navigation « précédent / suivant » sous un contenu (services, membres, articles, réalisations).
export function PostNav({ prev, next }: { prev?: Item; next?: Item }) {
  if (!prev && !next) return null
  return (
    <nav>
      <div className="container-x">
        <CptAnim />
        <div
          data-cm-section="fade-up"
          className="flex gap-6 border-t border-[#e5e7eb] py-10 max-md:flex-col max-md:gap-3 max-md:py-6"
        >
          {prev && (
            <Link href={prev.href} className={link}>
              <span className={`${arrow} group-hover:-translate-x-1`}>
                <ArrowLeft className="size-4" aria-hidden />
              </span>
              <span className="flex min-w-0 grow flex-col gap-[6px]">
                <span className="text-xs leading-[18px] font-semibold tracking-[0.96px] text-[#9ca3af] uppercase">
                  {prev.label}
                </span>
                <span className="truncate leading-[22.4px] font-semibold text-black max-md:text-sm max-md:leading-5">
                  {prev.title}
                </span>
              </span>
            </Link>
          )}
          {next && (
            <Link href={next.href} className={`${link} text-right`}>
              <span className="flex min-w-0 grow flex-col gap-[6px]">
                <span className="text-xs leading-[18px] font-semibold tracking-[0.96px] text-[#9ca3af] uppercase">
                  {next.label}
                </span>
                <span className="truncate leading-[22.4px] font-semibold text-black max-md:text-sm max-md:leading-5">
                  {next.title}
                </span>
              </span>
              <span className={`${arrow} group-hover:translate-x-1`}>
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
