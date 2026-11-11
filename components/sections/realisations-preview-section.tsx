import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from '@/lib/i18n'
import { CtaButton } from '@/components/blocks/cta-button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { getProjects } from '@/lib/content/projects'
import styles from './realisations-preview-section.module.css'

type ServiceId = 'batch' | 'chef' | 'cours'

const MAX = 5

/** Une réalisation de chaque liste à tour de rôle. */
function interleave<T>(lists: T[][]): T[] {
  const rows = Math.max(0, ...lists.map((l) => l.length))
  return Array.from({ length: rows }, (_, k) => lists.map((l) => l[k]))
    .flat()
    .filter(Boolean)
}

// Aperçu des réalisations : une mosaïque de photos (une grande, quatre petites), chacune menant à sa fiche,
// puis un bouton vers toutes les réalisations. Sans `service`, mélange les trois services (messages inspirations.*).
export async function RealisationsPreviewSection({
  service,
  tone = 'beige',
  offset = 0,
}: {
  service?: ServiceId
  tone?: 'white' | 'beige'
  /** Décale la sélection pour que deux pages ne montrent pas les mêmes projets. */
  offset?: number
}) {
  const t = await getTranslations('inspirations')
  const r = await getTranslations('realisationsPage')
  const labels = r.raw('services') as Record<string, string>
  const all = getProjects().filter((e) => !service || e.data.service === service)
  // Sans service précisé, on alterne les services pour varier les photos.
  const items = service
    ? all
    : interleave(['batch', 'chef', 'cours'].map((s) => all.filter((e) => e.data.service === s)))
  const start = items.length > 0 ? offset % items.length : 0
  const shown = [...items.slice(start), ...items.slice(0, start)].slice(0, MAX)
  if (shown.length === 0) return null
  const key = service ?? 'generic'
  return (
    <Section name={`realisations-${key}`} tone={tone}>
      <SectionHeading kicker={t('kicker')} title={t(`${key}.title`)} intro={t(`${key}.intro`)} />
      <ul className={styles.mosaic} data-reveal="up">
        {shown.map((e) => {
          const img = e.data.thumbnail ?? e.data.image
          return (
            <li key={e.slug} className={styles.tile}>
              <Link href={`/realisations/${e.slug}`} className={styles.link}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1025px) 25vw, 50vw"
                  className={styles.photo}
                />
                <span className={styles.caption}>
                  <span className={styles.service}>{labels[e.data.service]}</span>
                  <span className={styles.title}>{e.data.title}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className={styles.more}>
        <CtaButton href="/realisations" label={t('cta')} />
      </div>
    </Section>
  )
}
