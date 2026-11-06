import { Space_Grotesk } from 'next/font/google'
import { AnimatedButton } from '@/components/ui/animated-button'
import { cn } from '@/lib/utils'

// Titre de la barre d'appel : seul usage de cette famille (graisse 700), chargée uniquement sur les pages qui l'importent.
const grotesk = Space_Grotesk({ subsets: ['latin'], weight: '700', display: 'swap' })

type Props = {
  title: string
  text: string
  button: { label: string; href: string }
  className?: string
}

// Barre sombre « menu personnalisé » : titre vert tendre, phrase, bouton à droite (sous le texte en mobile).
export function CtaBar({ title, text, button, className }: Props) {
  return (
    <div className={cn('rounded-[15px] max-lg:px-[10px]', className)}>
      <div className="flex flex-wrap items-center rounded-[15px] bg-[#3A352E] max-md:px-[30px] max-md:pb-[50px]">
        <div className="flex flex-col gap-5 pl-10 max-lg:basis-[48.4%] max-md:basis-full max-md:pr-[17px] max-md:pl-0 lg:basis-[calc(50%-12px)]">
          <div className="h-[25px]" aria-hidden />
          <h3
            className={cn(
              grotesk.className,
              'm-0 text-[35px] leading-[35px] font-bold tracking-[-0.02em] text-[#E8A98E] max-lg:text-[28px]',
            )}
          >
            {title}
          </h3>
          <div className="-mt-[10px] text-white">
            <p className="m-0 mb-4 text-base leading-6">{text}</p>
          </div>
          <div className="h-[15px]" aria-hidden />
        </div>
        <div className="flex flex-col gap-5 pr-[45px] pl-10 max-lg:flex-1 max-md:basis-full max-md:flex-row max-md:p-0 lg:flex-1">
          <div className="flex justify-end max-md:justify-start">
            <AnimatedButton
              href={button.href}
              className="gap-0 border-0 px-10 [&>span:first-child]:font-medium [&>span:last-child]:-my-[2.5px]"
            >
              {button.label}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}
