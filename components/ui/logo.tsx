import Link from 'next/link'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

// Logo provisoire : le nom en texte, dans la police d'affichage. À remplacer par le SVG une fois la marque décidée.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={site.name}
      data-vr-mask
      className={cn(
        'font-display inline-block h-[41px] w-[150px] text-[34px] leading-[41px] font-semibold tracking-tight',
        className,
      )}
    >
      {site.name}
    </Link>
  )
}
