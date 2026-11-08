import { getTranslations } from '@/lib/i18n'
import { StoryBlock } from '@/components/blocks/story-block'
import { Icon } from '@/components/ui/icon'
import styles from './about-section.module.css'
import { media } from '@/lib/media'

// « À propos » de l'accueil (messages home.about).
export async function AboutSection({
  showLearnMore = true,
  extra,
}: {
  showLearnMore?: boolean
  /** Bouton supplémentaire : les tarifs de la page (#tarifs). */
  extra?: 'pricing'
} = {}) {
  const a = await getTranslations('home.about')
  const aboutIcon = <Icon name="chef-hat" className={styles.icon} />
  return (
    <StoryBlock
      label={a('label')}
      title={a('title')}
      intro={a.has('intro') ? a('intro') : undefined}
      images={
        (a.raw('images') as string[]).map((alt, i) => ({
          ...media.about[i],
          alt,
        })) as React.ComponentProps<typeof StoryBlock>['images']
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
      stepCards={
        a.has('steps')
          ? (a.raw('steps') as { icon: string; title: string; text: string; alt: string }[]).map(
              ({ alt, ...st }, i) => ({ ...st, image: { ...media.batchSteps[i], alt } }),
            )
          : undefined
      }
      features={a.raw('features') as string[]}
      extraButton={extra === 'pricing' ? { label: a('pricingButton'), href: '#tarifs' } : undefined}
      secondaryButton={
        a.has('secondaryButton')
          ? { label: a('secondaryButton'), href: a('secondaryButtonHref') }
          : undefined
      }
      button={
        showLearnMore
          ? { label: a('button'), href: a.has('buttonHref') ? a('buttonHref') : '/contact' }
          : undefined
      }
    />
  )
}
