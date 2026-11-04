import Link from 'next/link'
import { cn } from '@/lib/utils'

// Bouton « solar » du widget animated-button : pilule verte, reflet qui balaie au survol, flèche qui s'envole.
export function AnimatedButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group rounded-pill relative inline-flex items-center gap-[14px] overflow-hidden border border-transparent bg-[#234A3A] px-9 py-[18px] text-base leading-none font-semibold whitespace-nowrap text-[#FBFAF7] transition-[translate,box-shadow] duration-300 ease-[ease] before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.55)_50%,transparent_70%)] before:transition-[translate] before:duration-700 before:ease-[ease] before:content-[""] hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(169,196,162,0.45)] hover:before:translate-x-full active:translate-y-0',
        className,
      )}
    >
      <span className="relative z-[1]">{children}</span>
      <span
        aria-hidden
        className="relative z-[1] inline-flex size-[22px] flex-none items-center justify-center transition-[translate,rotate] duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block size-full"
        >
          <line x1="6" y1="18" x2="18" y2="6" />
          <polyline points="9 6 18 6 18 15" />
        </svg>
      </span>
    </Link>
  )
}
