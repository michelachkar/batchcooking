import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import styles from './page.module.css'
import { PageHead } from '@/components/layout/page-head'
import { FaqAccordion, type FaqItem } from '@/components/ui/faq-accordion'
import { FaqThemes } from '@/components/blocks/faq-themes'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { CtaButton } from '@/components/blocks/cta-button'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage } from '@/lib/jsonld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({ title: p('faq.title'), description: s('faq'), path: '/faq' })
}

type Theme = {
  id: string
  kicker: string
  tab: string
  title: string
  items: FaqItem[]
  href?: string
  cta?: string
}

// FAQ classée par service : une section par service (puis le paiement), accordéon de la FAQ.
export default async function FaqPage() {
  const p = await getTranslations('pages')
  const f = await getTranslations('faqPage')
  const sections = f.raw('sections') as Theme[]
  const tones = ['white', 'beige'] as const
  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path="/faq"
        title={p('faq.title')}
        description={(await getTranslations('seo'))('faq')}
        crumbs={[{ label: p('faq.crumb') }]}
        extra={[faqPage(sections.flatMap((s) => s.items))]}
      />
      <PageHead
        title={p('faq.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('faq.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.faq}
        description={p('heads.faq')}
      />
      <FaqThemes
        label={f('themesLabel')}
        intro={f('intro')}
        themes={sections.map((s) => ({ id: s.id, label: s.tab, count: s.items.length }))}
      />
      {sections.map((s, i) => (
        <div key={s.id} id={s.id} className={styles.section}>
          <Section name={`faq-${s.id}`} tone={tones[i % 2]}>
            <SectionHeading kicker={s.kicker} title={s.title} />
            <div className={styles.accordion} data-reveal="up">
              <FaqAccordion items={s.items} name={`faq-${s.id}`} openFirst={i === 0} />
            </div>
            {s.href && s.cta ? (
              <div className={styles.more}>
                <CtaButton href={s.href} label={s.cta} />
              </div>
            ) : null}
          </Section>
        </div>
      ))}
    </main>
  )
}
