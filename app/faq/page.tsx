import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import styles from './page.module.css'
import { PageHead } from '@/components/blocks/page-head'
import { FaqAccordion, type FaqItem } from '@/components/blocks/faq-accordion'
import { FaqThemes } from '@/components/blocks/faq-themes'
import { Heading, Shell } from '@/components/blocks/home-v2'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage } from '@/lib/jsonld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({ title: p('faq.title'), description: s('faq'), path: '/faq' })
}

type Section = { id: string; kicker: string; title: string; items: FaqItem[] }

// FAQ classée par thème : une section par thème (titre comme sur les autres pages), accordéon de la FAQ.
export default async function FaqPage() {
  const p = await getTranslations('pages')
  const f = await getTranslations('faqPage')
  const sections = f.raw('sections') as Section[]
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
      />
      <FaqThemes
        label={f('themesLabel')}
        intro={f('intro')}
        themes={sections.map((s) => ({ id: s.id, label: s.kicker }))}
      />
      {sections.map((s, i) => (
        <div key={s.id} id={s.id} className={styles.section}>
          <Shell name={`faq-${s.id}`} tone={tones[i % 2]}>
            <Heading kicker={s.kicker} title={s.title} />
            <div className={styles.accordion} data-reveal="up">
              <FaqAccordion items={s.items} name={`faq-${s.id}`} openFirst={i === 0} />
            </div>
          </Shell>
        </div>
      ))}
    </main>
  )
}
