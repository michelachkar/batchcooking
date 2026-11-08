import { getTranslations } from '@/lib/i18n'
import { AboutUs } from '@/components/blocks/about-us'
import { Icon } from '@/components/ui/icon'
import styles from './about-section.module.css'
import { media } from '@/lib/media'

// « À propos » de l'accueil (messages home.about).
export async function AboutSection() {
  const a = await getTranslations('home.about')
  const aboutIcon = <Icon name="chef-hat" className={styles.icon} />
  return (
    <AboutUs
      label={a('label')}
      title={a('title')}
      intro={a.has('intro') ? a('intro') : undefined}
      images={
        (a.raw('images') as string[]).map((alt, i) => ({
          ...media.about[i],
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
