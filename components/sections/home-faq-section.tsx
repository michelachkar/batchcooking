import { getTranslations } from '@/lib/i18n'
import { FaqAccordion, type FaqItem } from '@/components/ui/faq-accordion'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { CtaButton } from '@/components/blocks/cta-button'
import styles from './faq-section.module.css'

// Questions fréquentes de l'accueil (messages home.faq), avec lien vers la FAQ complète.
export async function HomeFaqSection() {
  const f = await getTranslations('home.faq')
  const items = f.raw('items') as FaqItem[]
  if (items.length === 0) return null
  return (
    <Section name="home-faq" tone="white">
      <SectionHeading kicker={f('kicker')} title={f('title')} />
      <div className={styles.faq} data-reveal="up">
        <FaqAccordion items={items} name="home-faq" openFirst />
      </div>
      <div className={styles.more}>
        <CtaButton href={f('ctaHref')} label={f('cta')} />
      </div>
    </Section>
  )
}
