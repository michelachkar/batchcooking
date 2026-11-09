import { getTranslations } from '@/lib/i18n'
import { RealisationCard } from '@/components/blocks/realisation-card'
import { CtaButton } from '@/components/blocks/cta-button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { toRealisationCard } from '@/lib/content/project-card'
import { getProjects } from '@/lib/content/projects'
import styles from './service-inspirations-section.module.css'

type ServiceId = 'batch' | 'chef' | 'cours'

// Inspirations d'une page service : les réalisations du service (messages inspirations.*), avec lien vers toutes les réalisations.
export async function ServiceInspirationsSection({ service }: { service: ServiceId }) {
  const t = await getTranslations('inspirations')
  const r = await getTranslations('realisationsPage')
  const labels = r.raw('services') as Record<string, string>
  const items = getProjects()
    .filter((e) => e.data.service === service)
    .map((e) => toRealisationCard(e, labels))
  if (items.length === 0) return null
  return (
    <Section name={`inspirations-${service}`} tone="beige">
      <SectionHeading
        kicker={t('kicker')}
        title={t(`${service}.title`)}
        intro={t(`${service}.intro`)}
      />
      <ul className={styles.list} data-reveal="up">
        {items.map((r) => (
          <RealisationCard key={r.href} r={r} />
        ))}
      </ul>
      <div className={styles.more}>
        <CtaButton href="/realisations" label={t('cta')} />
      </div>
    </Section>
  )
}
