import { getTranslations } from 'next-intl/server'
import { AboutUs } from '@/components/blocks/about-us'
import { Icon } from '@/components/ui/icon'
import { VrSolarPanel } from '@/tests/visual/fixtures/vr-icons'
import { vr } from '@/lib/flags'
import { mediaOf, type Landing } from '@/lib/media'

// « À propos » : même bloc sur l'accueil et sur la page À propos, textes dans messages (home.about).
export async function AboutSection({ ns = 'home' }: { ns?: Landing }) {
  const m = mediaOf(ns)
  const a = await getTranslations(`${ns}.about`)
  const aboutIcon = vr ? (
    <VrSolarPanel className="w-[25px]" />
  ) : (
    <Icon name="chef-hat" className="size-[25px]" />
  )
  return (
    <AboutUs
      label={a('label')}
      title={a('title')}
      intro={a.has('intro') ? a('intro') : undefined}
      images={
        (a.raw('images') as string[]).map((alt, i) => ({
          ...m.about[i],
          alt,
        })) as React.ComponentProps<typeof AboutUs>['images']
      }
      badge={{
        icon: aboutIcon,
        value: a('badgeValue'),
        text: a('badgeText'),
        accent: a.has('badgeAccent'),
      }}
      quality={
        a.has('qualityTitle')
          ? {
              icon: aboutIcon,
              title: a('qualityTitle'),
              text: a('qualityText'),
              note: a('qualityNote'),
            }
          : undefined
      }
      question={a.has('question') ? a('question') : undefined}
      steps={a.has('steps') ? (a.raw('steps') as { title: string; text: string }[]) : undefined}
      stepsTitle={a.has('stepsTitle') ? a('stepsTitle') : undefined}
      features={a.raw('features') as string[]}
      secondaryButton={
        a.has('secondaryButton')
          ? { label: a('secondaryButton'), href: a('secondaryButtonHref') }
          : undefined
      }
      button={{ label: a('button'), href: a.has('buttonHref') ? a('buttonHref') : '/contact' }}
    />
  )
}
