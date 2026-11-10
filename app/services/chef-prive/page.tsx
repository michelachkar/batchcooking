import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { ServiceIntro } from '@/components/blocks/service-intro'
import { CallbackInquiry } from '@/components/features/lead/callback-inquiry'
import { PackageCards, type Package } from '@/components/blocks/package-cards'
import { ProcessSection } from '@/components/sections/process-section'
import { PracticalInfo } from '@/components/blocks/practical-info'
import { FaqSection } from '@/components/sections/faq-section'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage, serviceNode } from '@/lib/jsonld'
import { ServiceInspirationsSection } from '@/components/sections/service-inspirations-section'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'
import styles from './page.module.css'

const PATH = '/services/chef-prive'
type IconCard = { icon: string; title: string; text: string; tag?: string }

export async function generateMetadata(): Promise<Metadata> {
  const c = await getTranslations('chefPage.seo')
  return pageMetadata({ title: c('title'), description: c('description'), path: PATH })
}

// Page du service « Chef privé & expériences » (priorité sur le gabarit /services/[slug]).
export default async function ChefPrivePage() {
  const p = await getTranslations('pages')
  const c = await getTranslations('chefPage')
  const faqItems = c.raw('faq.items') as { question: string; answer: string }[]
  const quote = `${PATH}#devis`
  const q = await getTranslations('chefPage.inquiry')

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
          faqPage(faqItems),
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
        description={p('heads.chef')}
        cta={{ label: c('intro.primary'), href: quote }}
      />
      <ProcessSection
        ns="chefPage.process"
        photos={media.chefSteps}
        extraButton={{ href: '#tarifs' }}
      />
      <CallbackInquiry
        kicker={q('kicker')}
        title={q('title')}
        action="/contact#inquiry"
        dateLabel={q('dateLabel')}
        button={q('button')}
        pattern
        serviceLabel={q('serviceLabel')}
        servicePlaceholder={q('servicePlaceholder')}
        serviceOptions={q.raw('serviceOptions') as { value: string; label: string }[]}
        phoneLabel={q('phoneLabel')}
        phonePlaceholder={q('phonePlaceholder')}
      />
      <div id="tarifs" className={styles.anchor} />
      <PackageCards
        name="packages"
        tone="terracotta"
        columns={3}
        kicker={c('packages.kicker')}
        title={c('packages.title')}
        intro={c('packages.intro')}
        labels={
          c.raw('packages.labels') as Record<
            'duration' | 'group' | 'level' | 'menu' | 'included' | 'ideal' | 'from',
            string
          >
        }
        items={c.raw('packages.items') as Package[]}
        cta={{ label: c('packages.button'), href: quote }}
      />
      <ServiceInspirationsSection service="chef" />
      <ServiceIntro
        kicker={c('intro.kicker')}
        title={c('intro.title')}
        paragraphs={c.raw('intro.paragraphs') as string[]}
        highlights={c.raw('intro.highlights') as string[]}
        primary={{ label: c('intro.primary'), href: quote }}
        secondary={{ label: c('intro.secondary'), href: '#tarifs' }}
        image={{ src: '/assets/hero/chef.jpg', alt: c('intro.imageAlt') }}
        lead={false}
      />
      <PracticalInfo
        tone="beige"
        kicker={c('practical.kicker')}
        title={c('practical.title')}
        cols={c.raw('practical.cols') as { icon: string; title: string; items: string[] }[]}
      />
      <FaqSection tone="white" kicker={c('faq.kicker')} title={c('faq.title')} items={faqItems} />
    </main>
  )
}
