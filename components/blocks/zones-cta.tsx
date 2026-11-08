import { CtaButton } from '@/components/blocks/cta-button'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import styles from './zones-cta.module.css'

export function ZonesCta(p: {
  kicker: string
  title: string
  text: string
  button: string
  tone?: 'white' | 'beige'
}) {
  return (
    <Section name="zones-cta" tone={p.tone ?? 'beige'}>
      <div className={styles.cta} data-reveal="up">
        <SectionHeading kicker={p.kicker} title={p.title} intro={p.text} />
        <CtaButton href="/contact#devis" label={p.button} lead />
      </div>
    </Section>
  )
}
