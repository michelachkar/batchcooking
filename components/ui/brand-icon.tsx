import { cn } from '@/lib/utils'

// Logos de réseaux (lucide ne les fournit plus) : tracés pleins sur une grille de 24.
const paths = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.222 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z',
  facebook: 'M14 8V6a1 1 0 0 1 1-1h2V2h-3a4 4 0 0 0-4 4v2H7v3h3v11h4V11h3l1-3h-4Z',
  instagram:
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm5.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z',
} as const

export type BrandName = keyof typeof paths

export function BrandIcon({ name, className }: { name: BrandName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn('size-6', className)}>
      <path d={paths[name]} fillRule="evenodd" />
    </svg>
  )
}
