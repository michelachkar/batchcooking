import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { ServiceIntro } from '@/components/blocks/service-intro'
import { CallbackInquiry } from '@/components/features/lead/callback-inquiry'
import { FormulaCards } from '@/components/blocks/formula-cards'
import { PracticalInfo } from '@/components/blocks/practical-info'
import { PackageCards, type Package } from '@/components/blocks/package-cards'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { serviceNode } from '@/lib/jsonld'
import { ServiceInspirationsSection } from '@/components/sections/service-inspirations-section'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'
import styles from './page.module.css'

const PATH = '/services/cours-de-cuisine'
type IconCard = { icon: string; title: string; text: string }
type Cols = { icon: string; title: string; items: string[] }[]

export async function generateMetadata(): Promise<Metadata> {
  const c = await getTranslations('coursPage.seo')
  return pageMetadata({ title: c('title'), description: c('description'), path: PATH })
}

// Page du service « Cours de cuisine à domicile » (priorité sur le gabarit /services/[slug]).
export default async function CoursDeCuisinePage() {
  const p = await getTranslations('pages')
  const c = await getTranslations('coursPage')
  const book = `${PATH}#devis`
  const q = await getTranslations('coursPage.inquiry')
  const ideas = c.raw('ideas.items') as (Package & { value: string })[]

  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path={PATH}
        title={c('seo.title')}
        description={c('seo.description')}
        crumbs={[{ label: p('services.crumb'), path: '/services' }, { label: c('crumb') }]}
        extra={[
          serviceNode({
            path: PATH,
            name: c('seo.title'),
            description: c('seo.description'),
            image: '/assets/hero/chef.jpg',
          }),
        ]}
      />
      <PageHead
        title={c('intro.kicker')}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: p('services.crumb'), href: '/services' },
          { label: c('crumb') },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.service}
        cta={{ label: c('intro.primary'), href: book }}
      />
      <ServiceIntro
        kicker={c('intro.kicker')}
        title={c('intro.title')}
        paragraphs={c.raw('intro.paragraphs') as string[]}
        highlights={c.raw('intro.highlights') as string[]}
        primary={{ label: c('intro.primary'), href: book }}
        secondary={{ label: c('intro.secondary'), href: '#tarifs' }}
        image={{ src: '/assets/hero/chef.jpg', alt: c('intro.imageAlt') }}
        lead={false}
      />
      <CallbackInquiry
        kicker={q('kicker')}
        title={q('title')}
        action="/contact#inquiry"
        dateLabel={q('dateLabel')}
        button={q('button')}
        pattern
        source="course-form"
        selectKey="choice"
        fixedService="cours"
        serviceLabel={q('serviceLabel')}
        servicePlaceholder={q('servicePlaceholder')}
        serviceOptions={ideas.map((i) => ({ value: i.value, label: i.title }))}
        phoneLabel={q('phoneLabel')}
        phonePlaceholder={q('phonePlaceholder')}
      />
      <div id="tarifs" className={styles.anchor} />
      <PackageCards
        name="course-ideas"
        tone="terracotta"
        columns={3}
        kicker={c('ideas.kicker')}
        title={c('ideas.title')}
        intro={c('ideas.intro')}
        labels={
          c.raw('ideas.labels') as Record<
            'duration' | 'group' | 'level' | 'menu' | 'included' | 'ideal' | 'from',
            string
          >
        }
        items={ideas}
        cta={{ label: c('ideas.button'), href: book }}
      />
      <ServiceInspirationsSection service="cours" />
      <PracticalInfo
        tone="beige"
        columns={2}
        kicker={c('provided.kicker')}
        title={c('provided.title')}
        cols={c.raw('provided.cols') as Cols}
      />
      <FormulaCards
        name="formats"
        tone="white"
        columns={3}
        kicker={c('formats.kicker')}
        title={c('formats.title')}
        intro={c('formats.intro')}
        items={c.raw('formats.items') as IconCard[]}
      />
      <FormulaCards
        name="themes"
        tone="beige"
        columns={3}
        kicker={c('themes.kicker')}
        title={c('themes.title')}
        intro={c('themes.intro')}
        items={c.raw('themes.items') as IconCard[]}
      />
    </main>
  )
}
