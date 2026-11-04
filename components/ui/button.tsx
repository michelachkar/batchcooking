import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Deux familles de boutons dans Savrio : le bouton du header (pilule verte, 16/600) et ceux du bandeau du footer (15/700).
const button = cva(
  'inline-flex items-center justify-center rounded-pill border border-transparent transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage',
  {
    variants: {
      variant: {
        primary:
          'h-[50px] gap-[14px] bg-forest px-[26px] text-base leading-4 font-semibold text-ivory hover:bg-forest-dark',
        light:
          'gap-3 bg-cream px-8 py-5 text-[15px] leading-[15px] font-bold tracking-[0.2px] text-ink hover:bg-white',
        outline:
          'gap-3 border-white/45 px-8 py-5 text-[15px] leading-[15px] font-bold tracking-[0.2px] text-white hover:bg-white/10',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

type Props = React.ComponentProps<typeof Link> & VariantProps<typeof button>

export function ButtonLink({ variant, className, ...props }: Props) {
  return <Link className={cn(button({ variant }), className)} {...props} />
}
