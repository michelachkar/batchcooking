import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { ServiceIntro } from '@/components/blocks/service-intro'
import { IconSection } from '@/components/blocks/icon-section'
import { AudienceSection } from '@/components/sections/audience-section'
import { FaqSection } from '@/components/sections/faq-section'
import { WeekExampleSection } from '@/components/sections/week-example-section'
import { MealPlanInquiry } from '@/components/features/lead/meal-plan-inquiry'
import { BatchPackages, type PackageCard } from '@/components/blocks/batch-packages'
import { AboutSection } from '@/components/sections/about-section'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage } from '@/lib/jsonld'
import { ServiceInspirationsSection } from '@/components/sections/service-inspirations-section'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'
import styles from './page.module.css'

type IconCard = { icon: string; title: string; text: string }

export async function generateMetadata(): Promise<Metadata> {
  const b = await getTranslations('batchPage.seo')
  return pageMetadata({
    title: b('title'),
    description: b('description'),
    path: '/services/batch-cooking',
  })
}

// Page du service « Batch cooking à domicile » (priorité sur le gabarit /services/[slug]).
export default async function BatchCookingPage() {
  const p = await getTranslations('pages')
  const b = await getTranslations('batchPage')
  const faqItems = b.raw('faq.items') as { question: string; answer: string }[]
  const quote = '/contact#inquiry'
  const q = await getTranslations('home.inquiry')
  const pk = await getTranslations('batchPage.packages')
  const leadPacks = (await getTranslations('lead')).raw('packs') as {
    id: string
    title: string
    label: string
  }[]
  // Nom et accroche de chaque formule : définis une seule fois dans `lead.packs`.
  const packages = (pk.raw('cards') as Omit<PackageCard, 'title' | 'label'>[]).map((c) => {
    const { title, label } = leadPacks.find((p) => p.id === c.id)!
    return { ...c, title, label }
  })

  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path="/services/batch-cooking"
        title={b('seo.title')}
        description={b('seo.description')}
        crumbs={[{ label: p('services.crumb'), path: '/services' }, { label: b('crumb') }]}
        extra={[faqPage(faqItems)]}
      />
      <PageHead
        title={b('intro.kicker')}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: p('services.crumb'), href: '/services' },
          { label: b('crumb') },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.service}
        description={p('heads.batch')}
        cta={{ label: b('intro.primary'), href: quote, lead: true }}
      />
      <AboutSection showLearnMore={false} extra="pricing" />
      <MealPlanInquiry
        kicker={q('kicker')}
        title={q('title')}
        action={quote}
        householdLabel={q('householdLabel')}
        householdPlaceholder={q('householdPlaceholder')}
        householdOptions={q.raw('householdOptions') as { value: string; label: string }[]}
        mealsLabel={q('mealsLabel')}
        mealsPlaceholder={q('mealsPlaceholder')}
        mealsOptions={q.raw('mealsOptions') as { value: string; label: string }[]}
        phoneLabel={q('phoneLabel')}
        phonePlaceholder={q('phonePlaceholder')}
        button={q('button')}
      />
      <div id="tarifs" className={styles.anchor} />
      <BatchPackages
        flushTop
        tone="terracotta"
        kicker={pk('kicker')}
        title={pk('title')}
        intro={pk('intro')}
        note={pk('note')}
        cards={packages}
        toggle={pk.raw('toggle') as { label: string; week: string; month: string }}
        dinners={pk.raw('dinners') as { label: string; unit: string }}
        priceLine={pk.raw('priceLine') as string}
        priceNote={pk.raw('priceNote') as string}
        perDinner={pk.raw('perDinner') as string}
        moreTemplate={{ one: '+ {count} autre inclus', other: '+ {count} autres inclus' }}
        labels={{
          open: pk('open'),
          close: pk('close'),
          panelKicker: pk('panelKicker'),
          cta: pk('cta'),
        }}
        ctaHref={quote}
        cardCta={pk('plan')}
      />
      <ServiceInspirationsSection service="batch" />
      <ServiceIntro
        kicker={b('intro.kicker')}
        title={b('intro.title')}
        paragraphs={b.raw('intro.paragraphs') as string[]}
        highlights={b.raw('intro.highlights') as string[]}
        primary={{ label: b('intro.primary'), href: quote }}
        secondary={{ label: b('intro.secondary'), href: '#tarifs' }}
        image={{ src: '/assets/hero/chef.jpg', alt: b('intro.imageAlt') }}
      />
      <AudienceSection
        tone="beige"
        kicker={b('audience.kicker')}
        title={b('audience.title')}
        items={b.raw('audience.items') as { title: string; text: string }[]}
      />
      <FaqSection tone="white" kicker={b('faq.kicker')} title={b('faq.title')} items={faqItems} />
    </main>
  )
}
