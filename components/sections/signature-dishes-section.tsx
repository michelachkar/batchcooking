import Image from 'next/image'
import { getTranslations } from '@/lib/i18n'
import { CtaButton } from '@/components/blocks/cta-button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { DISH_TYPES, recipes } from '@/lib/recipes'
import { media } from '@/lib/media'
import styles from './signature-dishes-section.module.css'

// Plats signature de la cheffe : les recettes de la série « Signature » (lib/recipes.ts), textes dans messages `signature`.
export async function SignatureDishesSection() {
  const t = await getTranslations('signature')
  const dishes = recipes
    .map((r, i) => ({ ...r, image: media.events[i % media.events.length] }))
    .filter((r) => r.pack === 'signature')
  if (dishes.length === 0) return null
  return (
    <Section name="signature" tone="beige">
      <SectionHeading kicker={t('kicker')} title={t('title')} intro={t('intro')} />
      <ul className={styles.list} data-reveal="up">
        {dishes.map((d) => (
          <li key={d.title} className={styles.card}>
            <div className={styles.media}>
              <Image
                src={d.image.src}
                alt={d.alt}
                fill
                sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={styles.image}
              />
            </div>
            <div className={styles.body}>
              <p className={styles.type}>
                {DISH_TYPES[d.type]} · {d.cuisine}
              </p>
              <h3 className={styles.title}>{d.title}</h3>
              <p className={styles.description}>{d.description}</p>
              <p className={styles.ingredients}>{d.ingredients.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.more}>
        <CtaButton href="/recettes?formule=signature" label={t('cta')} />
      </div>
    </Section>
  )
}
