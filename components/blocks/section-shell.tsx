import { cn } from '@/lib/utils'

type Props = {
  name: string
  /** Fond et arrondi du bloc, pleine largeur avec 40/26/16 px de marge de chaque côté. */
  className?: string
  children: React.ReactNode
}

// Enveloppe commune des sections « bloc coloré » : fine bande de fond de page au-dessus, puis le bloc (padding vertical 100/72/56 px, contenu 1320 px).
export function SectionShell({ name, className, children }: Props) {
  return (
    <section data-section={name} className="bg-cream pt-[22px] max-lg:pt-[18px] max-md:pt-3">
      <div className={cn('px-10 max-lg:px-[26px] max-md:px-4', className)}>
        <div className="max-w-site mx-auto py-[100px] max-lg:py-[72px] max-md:py-14">
          {children}
        </div>
      </div>
    </section>
  )
}
